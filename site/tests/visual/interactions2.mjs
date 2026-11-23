#!/usr/bin/env node
// Organisateurs : styles des blocs à copier + clic Copier ; Repères : styles calculés des cartes.
import { chromium } from '@playwright/test';
const BASE = process.argv[2] || 'http://localhost:4330';
const browser = await chromium.launch();
const ctx = await browser.newContext({
  reducedMotion: 'reduce',
  permissions: ['clipboard-read', 'clipboard-write'],
});
const page = await ctx.newPage();
const _st = (sel) =>
  page.evaluate(
    (sel) =>
      [...document.querySelectorAll(sel)].slice(0, 1).map((e) => {
        const c = getComputedStyle(e);
        const r = e.getBoundingClientRect();
        return {
          sel,
          txt: e.textContent.trim().slice(0, 30),
          fs: c.fontSize,
          lh: c.lineHeight,
          fw: c.fontWeight,
          ff: c.fontFamily.split(',')[0],
          ls: c.letterSpacing,
          col: c.color,
          bg: c.backgroundColor,
          p: c.padding,
          m: c.margin,
          gap: c.gap,
          ws: c.whiteSpace,
          mw: c.maxWidth,
          bt: c.borderTop,
          bl: c.borderLeft,
          w: Math.round(r.width),
          h: Math.round(r.height),
          minw: c.minWidth,
        };
      }),
    sel,
  );

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(BASE + '/organisateurs/', { waitUntil: 'networkidle' });
const btn = page.getByRole('button', { name: /Copier/ }).first();
const bloc = await btn.evaluate((b) => {
  let e = b;
  while (e && !e.querySelector('p')) e = e.parentElement;
  const card = e;
  const p = [...card.querySelectorAll('p')].sort(
    (a, b) => b.textContent.length - a.textContent.length,
  )[0];
  const f = (x) => {
    const c = getComputedStyle(x);
    const r = x.getBoundingClientRect();
    return {
      tag: x.tagName,
      cls: x.className,
      fs: c.fontSize,
      lh: c.lineHeight,
      fw: c.fontWeight,
      col: c.color,
      bg: c.backgroundColor,
      p: c.padding,
      m: c.margin,
      gap: c.gap,
      ws: c.whiteSpace,
      mw: c.maxWidth,
      bd: c.border,
      w: Math.round(r.width),
      h: Math.round(r.height),
      minw: c.minWidth,
      ff: c.fontFamily.split(',')[0],
    };
  };
  return { bouton: f(b), carte: f(card), texte: f(p), html: card.outerHTML.slice(0, 1200) };
});
console.log(JSON.stringify(bloc, null, 1));
console.log('avant clic:', await btn.textContent(), await btn.getAttribute('aria-label'));
await btn.click();
await page.waitForTimeout(200);
const apres = await page.evaluate(() => {
  const b = [...document.querySelectorAll('button')].find((x) => /Copi/.test(x.textContent));
  const s = [...document.querySelectorAll('[role=status],[aria-live]')]
    .map((e) => e.textContent.trim())
    .filter(Boolean);
  const r = b.getBoundingClientRect();
  return {
    label: b.textContent.trim(),
    aria: b.getAttribute('aria-label'),
    w: Math.round(r.width),
    statut: s,
  };
});
console.log('après clic:', JSON.stringify(apres));
console.log(
  'presse-papiers:',
  (await page.evaluate(() => navigator.clipboard.readText())).slice(0, 80),
);
await page.waitForTimeout(2800);
console.log(
  'après 3 s:',
  await page.evaluate(() =>
    [...document.querySelectorAll('button')]
      .filter((x) => /Copi/.test(x.textContent))
      .map((x) => x.textContent.trim())
      .slice(0, 2),
  ),
);
const labels = await page.evaluate(() =>
  [...document.querySelectorAll('button')]
    .filter((x) => /Copi/.test(x.textContent))
    .map((x) => {
      const r = x.getBoundingClientRect();
      return x.textContent.trim() + ' ' + Math.round(r.width) + 'x' + Math.round(r.height);
    }),
);
console.log('boutons:', labels.join(' | '));

await page.goto(BASE + '/reperes/', { waitUntil: 'networkidle' });
const carte = await page.evaluate(() => {
  const f = (x) => {
    if (!x) return null;
    const c = getComputedStyle(x);
    return {
      tag: x.tagName,
      cls: x.className,
      fs: c.fontSize,
      lh: c.lineHeight,
      fw: c.fontWeight,
      ls: c.letterSpacing,
      col: c.color,
      bg: c.backgroundColor,
      p: c.padding,
      m: c.margin,
      gap: c.gap,
      bd: c.border,
      ff: c.fontFamily.split(',')[0],
    };
  };
  const arts = [...document.querySelectorAll('#bibliotheque article')];
  const a = arts[0],
    b = arts.find((x) => /Bient/.test(x.textContent));
  return {
    dispo: [a, ...a.querySelectorAll('*')].map(f),
    bientot: [b, ...b.querySelectorAll('*')].map(f),
  };
});
for (const k of ['dispo', 'bientot']) {
  console.log('--', k);
  carte[k].forEach((x) => console.log('  ' + JSON.stringify(x)));
}
await browser.close();
