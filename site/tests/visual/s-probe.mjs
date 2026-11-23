// Sonde ponctuelle : node tests/visual/s-probe.mjs <url> <largeur> <sélecteur> [props,...]
import { chromium } from '@playwright/test';
const [url, l, sel, props = 'width,height,maxWidth,flexShrink,minWidth,display'] =
  process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage();
await p.setViewportSize({ width: +l, height: 900 });
await p.goto(url, { waitUntil: 'networkidle' });
const r = await p.evaluate(
  ([sel, props]) =>
    [...document.querySelectorAll(sel)].slice(0, 6).map((e) => {
      const c = getComputedStyle(e);
      const bb = e.getBoundingClientRect();
      const o = {
        w: Math.round(bb.width * 10) / 10,
        h: Math.round(bb.height * 10) / 10,
        x: Math.round(bb.left),
        y: Math.round(bb.top + scrollY),
      };
      for (const k of props.split(',')) o[k] = c[k];
      return o;
    }),
  [sel, props],
);
console.log(JSON.stringify(r));
await b.close();
