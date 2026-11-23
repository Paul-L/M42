#!/usr/bin/env node
// Parcours du test « Arnaque ou pas ? » côté site : 8 réponses jusqu'au résultat, 3 largeurs.
// Usage : node tests/visual/s-quiz-arnaque.mjs <url>
import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const sorties = path.join(path.dirname(fileURLToPath(import.meta.url)), 'sorties');
const url = process.argv[2] || 'http://127.0.0.1:4331/outils/arnaque-ou-pas/';
const CSS = `*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}.m42-reveal{opacity:1!important;transform:none!important}.m42-hdr,header.hdr{position:relative!important}`;
const b = await chromium.launch();
const ctx = await b.newContext({ reducedMotion: 'reduce', deviceScaleFactor: 1 });
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
for (const l of [390, 768, 1440]) {
  await p.setViewportSize({ width: l, height: 900 });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.addStyleTag({ content: CSS });
  const t = p.locator('[data-test]');
  const info = [];
  for (let i = 0; i < 8; i++) {
    // alterne : réponses « Arnaque » sauf 2 et 5 pour avoir des erreurs et des réussites
    const pick = i === 2 || i === 5 ? 'f' : 'a';
    await t.locator(`[data-pick="${pick}"]`).click();
    await p.waitForTimeout(80);
    const st = await p.evaluate(() => {
      const r = document.querySelector('[data-test]');
      const fb = r.querySelector('[data-feedback]');
      const foc = document.activeElement;
      const v = r.querySelector('[data-verdict]');
      return {
        verdict: v.textContent.trim().slice(0, 40),
        vColor: getComputedStyle(v).color,
        fbVisible: !fb.hidden,
        choicesHidden:
          r.querySelector('[data-choices]').hidden ||
          getComputedStyle(r.querySelector('[data-choices]')).display === 'none',
        focus: foc ? (foc.dataset && Object.keys(foc.dataset).join(',')) || foc.tagName : null,
        tally: r.querySelector('[data-tally]').textContent.replace(/\s+/g, ' ').trim(),
        dots: [...r.querySelectorAll('[data-dot]')].map((d) => getComputedStyle(d).backgroundColor),
        next: r.querySelector('[data-next]').getBoundingClientRect().height,
        deb: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    info.push(st);
    if (i === 0) {
      await t.screenshot({ path: path.join(sorties, `s-arnaque-quiz-${l}-feedback1.png`) });
    }
    await t.locator('[data-next]').click();
    await p.waitForTimeout(80);
  }
  const res = await p.evaluate(() => {
    const r = document.querySelector('[data-test]');
    const R = r.querySelector('[data-result]');
    const cs = (s) => {
      const e = R.querySelector(s);
      if (!e) return null;
      const c = getComputedStyle(e);
      const b = e.getBoundingClientRect();
      return {
        fs: c.fontSize,
        lh: c.lineHeight,
        fw: c.fontWeight,
        ff: c.fontFamily.split(',')[0],
        c: c.color,
        m: c.margin,
        p: c.padding,
        bt: c.borderTop,
        h: Math.round(b.height),
        w: Math.round(b.width),
        t: e.textContent.replace(/\s+/g, ' ').trim().slice(0, 80),
      };
    };
    const btns = [...R.querySelectorAll('a,button')].map((e) => {
      const b = e.getBoundingClientRect();
      return { t: e.textContent.trim(), w: Math.round(b.width), h: Math.round(b.height) };
    });
    return {
      visible: !R.hidden,
      quizHidden: r.querySelector('[data-quiz]').hidden,
      focus: document.activeElement === R,
      gap: getComputedStyle(R).gap,
      display: getComputedStyle(R).display,
      eyebrow: cs('.result-eyebrow'),
      score: cs('[data-result-score]'),
      title: cs('[data-result-title]'),
      text: cs('[data-result-text]'),
      missed: cs('[data-missed]'),
      missedT: cs('.missed-title'),
      list: cs('[data-missed-list]'),
      li: [...R.querySelectorAll('[data-missed-list] li')].map((x) => x.textContent.trim()),
      actions: cs('.result-actions'),
      btns,
      tally: r.querySelector('[data-tally]').textContent.replace(/\s+/g, ' ').trim(),
      dots: [...r.querySelectorAll('[data-dot]')].map((d) => getComputedStyle(d).backgroundColor),
      deb: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  await t.screenshot({ path: path.join(sorties, `s-arnaque-quiz-${l}-resultat.png`) });
  console.log(`\n=== ${l}px`);
  info.forEach((s, i) => console.log(i + 1, JSON.stringify(s)));
  console.log('RESULTAT', JSON.stringify(res, null, 1));
  // recommencer
  await t.locator('[data-restart]').click();
  await p.waitForTimeout(80);
  console.log(
    'après Recommencer :',
    await p.evaluate(() => {
      const r = document.querySelector('[data-test]');
      return {
        quizVisible: !r.querySelector('[data-quiz]').hidden,
        resultHidden: r.querySelector('[data-result]').hidden,
        counter: r.querySelector('[data-counter]').textContent.trim(),
        focus: document.activeElement?.className,
      };
    }),
  );
}
console.log('erreurs JS :', errs);
await b.close();
