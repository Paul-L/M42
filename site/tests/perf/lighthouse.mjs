/**
 * Lighthouse mobile sur toutes les pages (performance, accessibilité, bonnes pratiques, SEO).
 * Usage (depuis site/, site servi sur http://localhost:4321, par ex. `npx astro preview`) :
 *   node tests/perf/lighthouse.mjs [http://localhost:4321]
 * Sorties : tests/perf/rapports/<page>.html (non versionnés) et tests/perf/RESULTATS.md.
 * Objectif de la feuille de route : ≥ 95 partout.
 */
import { mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { chromium } from '@playwright/test';

const BASE = process.argv[2] ?? 'http://localhost:4321';
const dist = join(import.meta.dirname, '..', '..', 'dist');
const sortie = join(import.meta.dirname, 'rapports');
mkdirSync(sortie, { recursive: true });

const walk = (d) =>
  readdirSync(d).flatMap((n) =>
    statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)],
  );
const pages = walk(dist)
  .filter((p) => p.endsWith('index.html'))
  .map((p) => '/' + relative(dist, p).replace(/index\.html$/, ''))
  .filter((p) => !p.startsWith('/_') && !p.startsWith('/lettre/'))
  .sort();

const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ['--headless=new', '--no-sandbox'],
});
const lignes = [];
const CATS = ['performance', 'accessibility', 'best-practices', 'seo'];
let min = 100;
for (const page of pages) {
  const r = await lighthouse(`${BASE}${page}`, {
    port: chrome.port,
    output: 'html',
    onlyCategories: CATS,
    formFactor: 'mobile',
    screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75 },
  });
  const notes = CATS.map((c) => Math.round((r.lhr.categories[c]?.score ?? 0) * 100));
  min = Math.min(min, ...notes);
  const lcp = r.lhr.audits['largest-contentful-paint']?.displayValue ?? '';
  const cls = r.lhr.audits['cumulative-layout-shift']?.displayValue ?? '';
  lignes.push(`| ${page} | ${notes.join(' | ')} | ${lcp} | ${cls} |`);
  writeFileSync(join(sortie, `${page.replace(/\//g, '_') || 'accueil'}.html`), r.report);
  console.log(page, notes.join(' / '), lcp, cls);
}
await chrome.kill();
const md = `# Lighthouse mobile

Mesuré sur le build local (\`astro preview\`), profil mobile par défaut de Lighthouse (réseau 4G lent simulé, processeur ralenti ×4).
Objectif : ≥ 95 partout. Note minimale : **${min}**.

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
${lignes.join('\n')}
`;
writeFileSync(join(import.meta.dirname, 'RESULTATS.md'), md);
console.log(`\nNote minimale : ${min}`);
