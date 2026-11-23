#!/usr/bin/env node
// Contrôles des états interactifs côté site (4330 par défaut) : filtres de Repères, boutons Copier d'Organisateurs.
import { chromium } from '@playwright/test';
const BASE = process.argv[2] || 'http://localhost:4330';
const browser = await chromium.launch();
const ctx = await browser.newContext({
  reducedMotion: 'reduce',
  permissions: ['clipboard-read', 'clipboard-write'],
});
const page = await ctx.newPage();

const etat = () =>
  page.evaluate(() => {
    const vis = (e) => e.getClientRects().length > 0;
    const arts = [...document.querySelectorAll('#bibliotheque article')].filter(vis);
    const resume = [...document.querySelectorAll('#bibliotheque [aria-live]')]
      .map((e) => e.textContent.trim())
      .join(' | ');
    const pressed = [...document.querySelectorAll('#bibliotheque button')]
      .map((x) => x.getAttribute('aria-pressed'))
      .join(',');
    const h2 = [...document.querySelectorAll('#bibliotheque h2')]
      .filter(vis)
      .map((h) => h.textContent.trim());
    const a = document.activeElement;
    const c = getComputedStyle(a);
    const grilles = [...document.querySelectorAll('#bibliotheque *')]
      .filter((e) => getComputedStyle(e).display === 'grid')
      .map((e) => getComputedStyle(e).gridTemplateColumns);
    return {
      n: arts.length,
      resume,
      pressed,
      h2,
      grilles,
      bgActif: c.backgroundColor,
      fgActif: c.color,
      deb: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

for (const l of [390, 768, 1440]) {
  await page.setViewportSize({ width: l, height: 900 });
  await page.goto(BASE + '/reperes/', { waitUntil: 'networkidle' });
  console.log(`\n[reperes ${l}] initial ` + JSON.stringify(await etat()));
  const nb = await page.locator('#bibliotheque button').count();
  for (let i = 0; i < nb; i++) {
    const b = page.locator('#bibliotheque button').nth(i);
    await b.click();
    await page.waitForTimeout(100);
    console.log(
      '  clic «' + (await b.textContent()).trim() + '» -> ' + JSON.stringify(await etat()),
    );
  }
}
await browser.close();
