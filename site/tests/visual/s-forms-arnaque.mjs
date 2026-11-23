// Soumission à vide des deux formulaires de capture (site) puis capture des cartes, et capture des mêmes cartes côté maquette.
import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const sorties = path.join(path.dirname(fileURLToPath(import.meta.url)), 'sorties');
const [site, maq] = process.argv.slice(2);
const b = await chromium.launch();
const p = await (await b.newContext({ reducedMotion: 'reduce' })).newPage();
await p.route('**/*', async (r) => {
  if (r.request().resourceType() !== 'document') return r.continue();
  const rep = await r.fetch();
  return r.fulfill({
    response: rep,
    headers: { ...rep.headers(), 'content-type': 'text/html; charset=utf-8' },
  });
});
await p.setViewportSize({ width: 390, height: 900 });
await p.goto(site, { waitUntil: 'networkidle' });
for (const t of ['Recevoir la fiche', 'Recevoir le kit'])
  await p.getByRole('button', { name: t }).click();
await p.waitForTimeout(150);
const info = await p.evaluate(() =>
  [...document.querySelectorAll('input:not([type=checkbox]):not([type=hidden]),select')].map(
    (e) => {
      const c = getComputedStyle(e);
      return {
        n: e.name || e.id,
        inv: e.getAttribute('aria-invalid'),
        bd: c.border,
        bg: c.backgroundColor,
        h: e.getBoundingClientRect().height,
        desc: e.getAttribute('aria-describedby'),
      };
    },
  ),
);
console.log('site', JSON.stringify(info));
const errs = await p.evaluate(() =>
  [...document.querySelectorAll('[id*=err],[class*=err]')]
    .filter((e) => e.offsetParent)
    .map((e) => {
      const c = getComputedStyle(e);
      return { t: e.textContent.trim().slice(0, 60), c: c.color, fs: c.fontSize };
    }),
);
console.log('site erreurs', JSON.stringify(errs));
const cards = p.locator('form');
for (let i = 0; i < (await cards.count()); i++)
  await cards
    .nth(i)
    .screenshot({ path: path.join(sorties, `s-arnaque-form${i}-erreurs-site-390.png`) });
await p.goto(maq, { waitUntil: 'networkidle' });
const info2 = await p.evaluate(() =>
  [...document.querySelectorAll('input:not([type=checkbox]):not([type=hidden]),select')].map(
    (e) => {
      const c = getComputedStyle(e);
      return {
        n: e.name || e.id,
        inv: e.getAttribute('aria-invalid'),
        bd: c.border,
        bg: c.backgroundColor,
        h: e.getBoundingClientRect().height,
      };
    },
  ),
);
console.log('maquette', JSON.stringify(info2));
await b.close();
