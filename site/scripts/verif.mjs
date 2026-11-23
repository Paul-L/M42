// Contrôles avant commit (appelé par `npm run verif`, après build, lint et format) :
// 1. règles : termes interdits, motifs de prix, marqueurs [À …] (TODO_CONTENU.md) ;
// 2. accessibilité : axe-core sur chaque page de dist/, à 390 et 1440 px ;
// 3. liens internes : aucun lien cassé dans dist/ ;
// 4. SEO : title, H1 unique, description, canonique, Open Graph, JSON-LD, robots.txt, sitemap.
import { createServer } from 'node:http';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const site = join(import.meta.dirname, '..');
const root = join(site, '..');
const dist = join(site, 'dist');
const results = [];
const report = (name, ok, detail) => results.push({ name, ok, detail });

const walk = (dir, skip = []) =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((n) => {
        const p = join(dir, n);
        if (skip.includes(n)) return [];
        return statSync(p).isDirectory() ? walk(p, skip) : [p];
      })
    : [];
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// ---------- 1. Règles ----------
const listPath = join(root, '.claude', 'regles-interdites.local.txt');
const terms = existsSync(listPath)
  ? readFileSync(listPath, 'utf8')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'))
  : [];
const scanned = [
  ...walk(join(site, 'src')),
  ...walk(join(site, 'public')),
  ...walk(dist).filter((p) => /\.(html|xml|txt|json)$/.test(p)),
  ...walk(join(root, 'cms'), ['node_modules', 'data']).filter((p) => !p.endsWith('.env')),
];
const termHits = [];
const priceHits = [];
const priceRe = /€|\beuros?\b|\bHT\b|\bTTC\b/;
const allowedPrices = readFileSync(join(site, 'scripts', 'prix-autorises.txt'), 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'));
for (const p of scanned) {
  if (/\.(png|jpe?g|webp|avif|woff2?|ico)$/.test(p)) continue;
  const text = readFileSync(p, 'utf8');
  const n = norm(text);
  terms.forEach(
    (t, i) => n.includes(norm(t)) && termHits.push(`${relative(root, p)} (terme n° ${i + 1})`),
  );
  if (!/contact/i.test(p) && !p.startsWith(join(root, 'cms'))) {
    text.split('\n').forEach((line, i) => {
      // Chaque occurrence est examinée avec son contexte : autorisée si elle fait partie d'un extrait listé.
      const norm = line.replace(/[\u00a0\u202f]/g, ' ').replace(/&#39;|&#x27;|&apos;/g, "'");
      for (const m of norm.matchAll(new RegExp(priceRe.source, 'g'))) {
        const ctx = norm.slice(Math.max(0, m.index - 40), m.index + 40);
        if (!allowedPrices.some((a) => ctx.includes(a))) {
          priceHits.push(`${relative(root, p)}:${i + 1}`);
          break;
        }
      }
    });
  }
}
report(
  'Termes interdits',
  terms.length > 0 && termHits.length === 0,
  terms.length ? termHits.join(', ') || `${scanned.length} fichiers, aucun` : 'liste absente',
);
report('Prix (€, euros, HT, TTC)', priceHits.length === 0, priceHits.join(', ') || 'aucun');
try {
  const out = execFileSync('node', [join(site, 'scripts', 'marqueurs.mjs')], { encoding: 'utf8' });
  report('Marqueurs [À …] → TODO_CONTENU.md', true, out.trim());
} catch (e) {
  report('Marqueurs [À …] → TODO_CONTENU.md', false, String(e.stderr || e.message).trim());
}

// ---------- Serveur statique sur dist/ ----------
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
const server = createServer((req, res) => {
  let p = join(dist, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!p.startsWith(dist) || !existsSync(p)) {
    res.writeHead(404).end('404');
    return;
  }
  res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' });
  res.end(readFileSync(p));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const pages = walk(dist)
  .filter((p) => p.endsWith('index.html'))
  .map((p) => '/' + relative(dist, p).replace(/index\.html$/, ''));

// ---------- 2. Accessibilité ----------
const browser = await chromium.launch();
const axeIssues = [];
const cibles = new Set();
for (const width of [390, 1440]) {
  // État stable (DECISIONS.md 26) : mouvement réduit, contenu entièrement affiché.
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  for (const path of pages) {
    await page.goto(base + path);
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    for (const v of violations.filter(
      // /_kit montre plusieurs fois les mêmes composants : doublons de repères attendus (DECISIONS.md 27).
      (x) => !(path === '/_kit/' && x.id === 'landmark-unique'),
    ))
      axeIssues.push(`${path} @${width} : ${v.id} (${v.impact}, ${v.nodes.length} élément(s))`);
    // Cibles tactiles ≥ 44 px sur mobile (hors liens dans une phrase, hors /_kit/).
    if (width === 390 && path !== '/_kit/') {
      const petites = await page.evaluate(() => {
        const out = [];
        for (const el of document.querySelectorAll(
          'a[href], button, input:not([type=hidden]), select, textarea, summary',
        )) {
          const cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || el.closest('[aria-hidden="true"]')) continue;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height || r.height >= 44) continue;
          // Lien dans une phrase (exception WCAG 2.5.8) : texte autour, dans le même parent.
          const texteAutour = [...(el.parentElement?.childNodes ?? [])].some(
            (n) => n.nodeType === 3 && n.textContent.trim(),
          );
          if (el.tagName === 'A' && cs.display === 'inline' && texteAutour) continue;
          // Zone agrandie par un pseudo-élément (.m42-cible, liens étirés sur une carte).
          const avant = getComputedStyle(el, '::before');
          const apres = getComputedStyle(el, '::after');
          if (
            parseFloat(avant.height) >= 44 ||
            (apres.position === 'absolute' &&
              apres.content !== 'none' &&
              parseFloat(apres.height) >= 44)
          )
            continue;
          // Case à cocher : son libellé fait partie de la cible.
          const label = el.id && document.querySelector(`label[for="${el.id}"]`);
          if (label && label.getBoundingClientRect().height >= 44) continue;
          out.push(
            `${el.tagName.toLowerCase()} « ${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24)} » ${Math.round(r.height)} px`,
          );
        }
        return out;
      });
      petites.forEach((x) => cibles.add(`${path} : ${x}`));
    }
  }
  await context.close();
}
await browser.close();
report(
  `axe-core (${pages.length} page(s) × 390/1440)`,
  axeIssues.length === 0,
  axeIssues.join(' ; ') || 'aucune violation',
);
report(
  'Cibles tactiles ≥ 44 px (390 px)',
  cibles.size === 0,
  [...cibles].slice(0, 12).join(' ; ') || 'toutes conformes',
);

// ---------- 3. Liens internes ----------
// Toutes les pages du plan sont intégrées : tout lien vers une page absente est une erreur
// (cas typique : une conférence passée en brouillon dans Directus mais encore citée ailleurs).
const broken = [];
for (const file of walk(dist).filter((p) => p.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    let p = join(dist, decodeURIComponent(href));
    if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
    if (!existsSync(p)) broken.push(`${relative(dist, file)} → ${href}`);
  }
}
server.close();
const uniqueBroken = [...new Set(broken)];
report('Liens internes', uniqueBroken.length === 0, uniqueBroken.join(', ') || 'aucun lien cassé');

// ---------- 4. SEO ----------
// Pages sans description voulue : aucune.
const SANS_DESCRIPTION = new Set();
const seoIssues = [];
const typesParPage = new Map();
const attr = (html, re) => html.match(re)?.[1];
for (const file of walk(dist).filter((p) => p.endsWith('.html'))) {
  const chemin = '/' + relative(dist, file).replace(/index\.html$/, '');
  const html = readFileSync(file, 'utf8');
  const noindex = /<meta name="robots" content="noindex/.test(html);
  if (!attr(html, /<title>([^<]+)<\/title>/)) seoIssues.push(`${chemin} : title absent`);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  // /_kit/ : démonstration des composants (plusieurs en-têtes de page), non indexée.
  if (h1 !== 1 && chemin !== '/_kit/') seoIssues.push(`${chemin} : ${h1} H1`);
  if (noindex) continue;
  if (!SANS_DESCRIPTION.has(chemin) && !/<meta name="description" content="[^"]+"/.test(html))
    seoIssues.push(`${chemin} : description absente`);
  const canon = attr(html, /<link rel="canonical" href="([^"]+)"/);
  if (canon !== `https://m42.guide${chemin}`)
    seoIssues.push(`${chemin} : canonique ${canon ?? 'absente'}`);
  for (const og of ['og:title', 'og:url', 'og:image'])
    if (!new RegExp(`<meta property="${og}" content="[^"]+"`).test(html))
      seoIssues.push(`${chemin} : ${og} absent`);
  const types = new Set();
  const collecter = (n) => {
    if (Array.isArray(n)) return n.forEach(collecter);
    if (!n || typeof n !== 'object') return;
    if (n['@type']) [].concat(n['@type']).forEach((t) => types.add(t));
    Object.values(n).forEach(collecter);
  };
  for (const [, json] of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    try {
      collecter(JSON.parse(json));
    } catch {
      seoIssues.push(`${chemin} : JSON-LD illisible`);
    }
  }
  typesParPage.set(chemin, types);
  if (chemin !== '/' && !types.has('BreadcrumbList'))
    seoIssues.push(`${chemin} : BreadcrumbList absent`);
}
const exiger = (chemin, type) => {
  if (!typesParPage.get(chemin)?.has(type)) seoIssues.push(`${chemin} : ${type} absent`);
};
exiger('/', 'Organization');
exiger('/', 'WebSite');
exiger('/a-propos/', 'Person');
for (const c of ['ia-au-quotidien', 'arnaques-ia', 'desinformation-ia', 'parents-ados-ia'])
  exiger(`/conferences/${c}/`, 'Service');
const robots = existsSync(join(dist, 'robots.txt'))
  ? readFileSync(join(dist, 'robots.txt'), 'utf8')
  : '';
if (!/OAI-SearchBot/.test(robots) || !/Sitemap: /.test(robots))
  seoIssues.push('robots.txt incomplet');
const plan = walk(dist)
  .filter((p) => /sitemap-\d+\.xml$/.test(p))
  .map((p) => readFileSync(p, 'utf8'))
  .join('');
if (!plan) seoIssues.push('sitemap absent');
if (/\/_kit\/|\/lettre\//.test(plan)) seoIssues.push('sitemap : page non indexable listée');
report(
  'SEO (title, H1, canonique, OG, JSON-LD, robots, sitemap)',
  seoIssues.length === 0,
  seoIssues.join(' ; ') || `${typesParPage.size} pages indexables conformes`,
);

// ---------- Rapport ----------
console.log('\n| Contrôle | Résultat | Détail |\n|---|---|---|');
for (const r of results) console.log(`| ${r.name} | ${r.ok ? 'OK' : 'KO'} | ${r.detail} |`);
process.exit(results.every((r) => r.ok) ? 0 : 1);
