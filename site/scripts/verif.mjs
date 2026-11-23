// Contrôles avant commit (appelé par `npm run verif`, après build, lint et format) :
// 1. règles : termes interdits, motifs de prix, marqueurs [À …] (TODO_CONTENU.md) ;
// 2. accessibilité : axe-core sur chaque page de dist/, à 390 et 1440 px ;
// 3. liens internes : aucun lien cassé dans dist/.
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
  }
  await context.close();
}
await browser.close();
report(
  `axe-core (${pages.length} page(s) × 390/1440)`,
  axeIssues.length === 0,
  axeIssues.join(' ; ') || 'aucune violation',
);

// ---------- 3. Liens internes ----------
// Les liens vers des pages du plan (site/src/data/routes.ts) pas encore intégrées
// sont signalés « à venir » ; tout autre lien manquant est une erreur.
const planned = new Set(
  [...readFileSync(join(site, 'src', 'data', 'routes.ts'), 'utf8').matchAll(/: '(\/[^']*)'/g)].map(
    (m) => m[1],
  ),
);
const upcoming = new Set();
const broken = [];
for (const file of walk(dist).filter((p) => p.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    let p = join(dist, decodeURIComponent(href));
    if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
    if (existsSync(p)) continue;
    if (planned.has(href)) upcoming.add(href);
    else broken.push(`${relative(dist, file)} → ${href}`);
  }
}
server.close();
const uniqueBroken = [...new Set(broken)];
report(
  'Liens internes',
  uniqueBroken.length === 0,
  (uniqueBroken.join(', ') || 'aucun lien cassé') +
    (upcoming.size ? ` ; ${upcoming.size} page(s) du plan pas encore intégrée(s)` : ''),
);

// ---------- Rapport ----------
console.log('\n| Contrôle | Résultat | Détail |\n|---|---|---|');
for (const r of results) console.log(`| ${r.name} | ${r.ok ? 'OK' : 'KO'} | ${r.detail} |`);
process.exit(results.every((r) => r.ok) ? 0 : 1);
