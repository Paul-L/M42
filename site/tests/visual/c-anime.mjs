#!/usr/bin/env node
// Contrôle du mode animé (site seul) : node c-anime.mjs <base-url> <largeur>x<hauteur> <chemin>...
// Captures fenêtre à 3 positions (dans la section ScrollStory si présente, sinon haut/milieu/bas)
// et mesures : mode, ajustement, zoom, étape, éléments visibles hors de la zone utile, reveals restés masqués.
import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ici = path.dirname(fileURLToPath(import.meta.url));
const [base, dim, ...chemins] = process.argv.slice(2);
const [W, H] = dim.split('x').map(Number);
const b = await chromium.launch();
const ctx = await b.newContext({
  reducedMotion: 'no-preference',
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
});
for (const ch of chemins) {
  const p = await ctx.newPage();
  await p.goto(base + ch, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const nom = ch === '/' ? 'accueil' : ch.split('/').filter(Boolean).pop();
  // défilement progressif pour déclencher les reveals
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += Math.round(H / 2)) {
    await p.evaluate((y) => scrollTo(0, y), y);
    await p.waitForTimeout(60);
  }
  await p.waitForTimeout(800);
  const reveals = await p.evaluate(() =>
    [...document.querySelectorAll('.m42-reveal')]
      .filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99)
      .map((e) => (e.textContent || '').trim().slice(0, 40)),
  );
  const st = await p.evaluate(() => {
    const s = document.querySelector('[data-story]');
    if (!s) return null;
    const r = s.getBoundingClientRect();
    return {
      top: r.top + scrollY,
      h: r.height,
      mode: s.dataset.mode,
      fit: s.dataset.fit,
      zoom:
        s.querySelector('[data-story-visual]')?.style.zoom ||
        getComputedStyle(s.querySelector('[data-story-visual]')).zoom,
    };
  });
  const pos =
    st && st.mode === 'anim'
      ? [0.04, 0.5, 0.98].map((f) => Math.round(st.top + f * (st.h - H)))
      : st
        ? [
            Math.round(st.top - 80),
            Math.round(st.top + st.h / 2 - H / 2),
            Math.round(st.top + st.h - H + 40),
          ]
        : [0, Math.round(total / 2 - H / 2), total - H];
  const res = [];
  for (const [i, y] of pos.entries()) {
    await p.evaluate((y) => scrollTo(0, y), y);
    await p.waitForTimeout(900);
    const f = path.join(ici, 'sorties', `c-anime-${nom}-${W}-${i + 1}.png`);
    await p.screenshot({ path: f });
    const m = await p.evaluate(() => {
      const hdr = document.querySelector('header');
      const hb = hdr ? Math.max(0, hdr.getBoundingClientRect().bottom) : 0;
      const s = document.querySelector('[data-story]');
      const out = {
        step: s?.dataset.step,
        mode: s?.dataset.mode,
        hdrBottom: Math.round(hb),
        horsZone: [],
      };
      if (s && s.dataset.mode === 'anim') {
        const sticky = s.querySelector('[data-story-sticky]');
        const sr = sticky.getBoundingClientRect();
        out.sticky = [Math.round(sr.top), Math.round(sr.bottom)];
        const vis = (e) => {
          let n = e;
          while (n && n !== sticky) {
            const c = getComputedStyle(n);
            if (c.opacity === '0' || c.visibility === 'hidden' || c.display === 'none' || n.hidden)
              return false;
            n = n.parentElement;
          }
          return true;
        };
        for (const e of sticky.querySelectorAll('*')) {
          if (!vis(e) || e.children.length) continue;
          const r = e.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          if (r.top < hb - 1 || r.bottom > innerHeight + 1)
            out.horsZone.push(
              `${(e.textContent || e.tagName).trim().slice(0, 30)} [${Math.round(r.top)},${Math.round(r.bottom)}]`,
            );
        }
      }
      out.debord = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      return out;
    });
    res.push({ y, fichier: f, ...m, horsZone: m.horsZone.slice(0, 8), nHors: m.horsZone.length });
  }
  console.log(
    JSON.stringify({ page: ch, W, H, story: st, revealsMasques: reveals, captures: res }),
  );
  await p.close();
}
await b.close();
