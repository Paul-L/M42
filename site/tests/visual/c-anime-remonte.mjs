// Mode animé 390x844 : défilement vers le bas puis remontée de 120 px au milieu de la section ScrollStory.
import { chromium } from '@playwright/test';
const b = await chromium.launch();
const ctx = await b.newContext({
  reducedMotion: 'no-preference',
  viewport: { width: 390, height: 844 },
});
for (const ch of ['/conferences/ia-au-quotidien/', '/conferences/arnaques-ia/']) {
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:4332' + ch, { waitUntil: 'networkidle' });
  const st = await p.evaluate(() => {
    const s = document.querySelector('[data-story]');
    const r = s.getBoundingClientRect();
    return { top: r.top + scrollY, h: r.height };
  });
  for (const f of [0.3, 0.7]) {
    const y = Math.round(st.top + f * (st.h - 844));
    await p.mouse.wheel(0, 0);
    await p.evaluate((y) => scrollTo(0, y), y - 600);
    await p.waitForTimeout(200);
    for (let k = 0; k < 6; k++) {
      await p.mouse.wheel(0, 100);
      await p.waitForTimeout(80);
    }
    await p.waitForTimeout(400);
    for (let k = 0; k < 2; k++) {
      await p.mouse.wheel(0, -60);
      await p.waitForTimeout(80);
    }
    await p.waitForTimeout(900);
    const nom = ch.split('/').filter(Boolean).pop();
    await p.screenshot({ path: `tests/visual/sorties/c-anime-${nom}-390-remonte-${f}.png` });
    const m = await p.evaluate(() => {
      const hb = Math.max(0, document.querySelector('header').getBoundingClientRect().bottom);
      const s = document.querySelector('[data-story]');
      const sticky = s.querySelector('[data-story-sticky]');
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
      let minTop = 1e9,
        maxB = 0;
      for (const e of sticky.querySelectorAll('*')) {
        if (!vis(e) || e.children.length) continue;
        const r = e.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        minTop = Math.min(minTop, r.top);
        maxB = Math.max(maxB, r.bottom);
      }
      return {
        hb: Math.round(hb),
        contenu: [Math.round(minTop), Math.round(maxB)],
        step: s.dataset.step,
        scrollY: Math.round(scrollY),
      };
    });
    console.log(ch, f, JSON.stringify(m));
  }
  await p.close();
}
await b.close();
