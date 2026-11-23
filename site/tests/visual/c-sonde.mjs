#!/usr/bin/env node
// Sonde : node c-sonde.mjs <url> <largeur> '<expression JS évaluée dans la page, renvoie JSON>' [anime]
import { chromium } from '@playwright/test';
const [url, l, expr, anime] = process.argv.slice(2);
const b = await chromium.launch();
const p = await (
  await b.newContext({
    reducedMotion: anime ? 'no-preference' : 'reduce',
    viewport: { width: +l, height: 900 },
  })
).newPage();
await p.route('**/*', async (r) => {
  if (r.request().resourceType() !== 'document') return r.continue();
  const rep = await r.fetch();
  const t = rep.headers()['content-type'] || 'text/html';
  if (/charset/i.test(t)) return r.fulfill({ response: rep });
  return r.fulfill({
    response: rep,
    headers: { ...rep.headers(), 'content-type': 'text/html; charset=utf-8' },
  });
});
await p.goto(url, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
if (!anime)
  await p.addStyleTag({
    content:
      '*,*::before,*::after{animation:none!important;transition:none!important}.m42-reveal{opacity:1!important;transform:none!important}',
  });
await p.waitForTimeout(200);
console.log(
  JSON.stringify(
    await p.evaluate(
      `(()=>{const S=(e,k)=>{const c=getComputedStyle(e),r=e.getBoundingClientRect();const o={x:Math.round(r.left),y:Math.round(r.top+scrollY),w:Math.round(r.width),h:Math.round(r.height)};for(const q of k)o[q]=c[q];return o};${expr}})()`,
    ),
    null,
    1,
  ),
);
await b.close();
