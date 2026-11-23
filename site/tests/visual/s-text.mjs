// node tests/visual/s-text.mjs <url> <largeur> <début du texte>
import { chromium } from '@playwright/test';
const [url, l, t] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage();
await p.route('**/*', async (r) => {
  if (r.request().resourceType() !== 'document') return r.continue();
  const rep = await r.fetch();
  return r.fulfill({
    response: rep,
    headers: { ...rep.headers(), 'content-type': 'text/html; charset=utf-8' },
  });
});
await p.setViewportSize({ width: +l, height: 900 });
await p.goto(url, { waitUntil: 'networkidle' });
const r = await p.evaluate((t) => {
  const n = (s) => s.replace(/[  ]/g, ' ').replace(/\s+/g, ' ').trim();
  const e = [...document.querySelectorAll('p,h1,h2,h3,li,dd,span,a,div')].find((e) =>
    n(e.textContent).startsWith(t),
  );
  if (!e) return null;
  const c = getComputedStyle(e);
  const b = e.getBoundingClientRect();
  const pc = getComputedStyle(e.parentElement);
  return {
    tag: e.tagName,
    cls: e.className,
    w: b.width,
    h: b.height,
    fs: c.fontSize,
    lh: c.lineHeight,
    mw: c.maxWidth,
    pad: c.padding,
    ls: c.letterSpacing,
    ff: c.fontFamily,
    parentW: e.parentElement.getBoundingClientRect().width,
    parentPad: pc.padding,
    html: e.innerHTML.slice(0, 400),
  };
}, t);
console.log(JSON.stringify(r, null, 1));
await b.close();
