#!/usr/bin/env node
/**
 * Diff des styles calculés maquette ↔ site, éléments appariés par leur texte propre.
 * Usage : node tests/visual/styles-diff.mjs --maquette <url> --site <url> [--largeurs 390,768,1440] [--json out.json]
 * Sortie : écarts CSS par élément, sauts verticaux cumulés, cibles tactiles < 44 px (site seulement).
 */
import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const a = process.argv.slice(2);
const o = { largeurs: '390,768,1440' };
for (let i = 0; i < a.length; i++) o[a[i].replace(/^--/, '')] = a[++i];
const CSS = `*,*::before,*::after{animation:none!important;transition:none!important}.m42-reveal{opacity:1!important;transform:none!important}.m42-hdr,header.hdr{position:relative!important}`;

async function relever(page, url, l) {
  await page.unrouteAll();
  await page.route('**/*', async (r) => {
    if (r.request().resourceType() !== 'document') return r.continue();
    const rep = await r.fetch();
    const t = rep.headers()['content-type'] || 'text/html';
    if (/charset/i.test(t)) return r.fulfill({ response: rep });
    return r.fulfill({
      response: rep,
      headers: { ...rep.headers(), 'content-type': 'text/html; charset=utf-8' },
    });
  });
  await page.setViewportSize({ width: l, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: CSS });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  return page.evaluate(() => {
    const norm = (s) => s.replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
    const out = [];
    const cibles = [];
    const vis = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
    };
    for (const el of document.body.querySelectorAll('*')) {
      if (['SCRIPT', 'STYLE', 'TEMPLATE', 'NOSCRIPT'].includes(el.tagName)) continue;
      if (!vis(el)) continue;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      let own = '';
      for (const n of el.childNodes) if (n.nodeType === 3) own += n.textContent;
      own = norm(own);
      const inter = el.matches(
        'a[href],button,input:not([type=hidden]),select,textarea,summary,label[for],[role=button]',
      );
      if (inter) {
        const p = el.closest('p,li');
        // lien inline dans un paragraphe : exception WCAG 2.5.8 (inline), signalé à part
        const inline =
          el.tagName === 'A' &&
          cs.display === 'inline' &&
          p &&
          norm(p.textContent) !== norm(el.textContent);
        cibles.push({
          t: norm(el.textContent || el.getAttribute('aria-label') || el.value || '').slice(0, 50),
          tag: el.tagName.toLowerCase(),
          w: Math.round(r.width),
          h: Math.round(r.height),
          inline,
          cls: el.className && el.className.baseVal === undefined ? el.className : '',
        });
      }
      if (!own || /\{\{/.test(own)) continue;
      out.push({
        k: own.slice(0, 80),
        tag: el.tagName.toLowerCase(),
        cls: typeof el.className === 'string' ? el.className : '',
        x: Math.round(r.left),
        y: Math.round(r.top + scrollY),
        w: Math.round(r.width),
        h: Math.round(r.height),
        ff: cs.fontFamily.split(',')[0].replace(/"/g, ''),
        fs: cs.fontSize,
        lh: cs.lineHeight,
        fw: cs.fontWeight,
        fst: cs.fontStyle,
        ls: cs.letterSpacing,
        tt: cs.textTransform,
        c: cs.color,
        bg: cs.backgroundColor,
        m: cs.margin,
        p: cs.padding,
        bd: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}|${cs.borderLeftWidth} ${cs.borderLeftStyle} ${cs.borderLeftColor}|${cs.borderBottomWidth}`,
        td: cs.textDecorationLine,
        ta: cs.textAlign,
        mw: cs.maxWidth,
      });
    }
    return {
      els: out,
      cibles,
      H: document.documentElement.scrollHeight,
      deb: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
}

const PROPS = [
  'tag',
  'ff',
  'fs',
  'lh',
  'fw',
  'fst',
  'ls',
  'tt',
  'c',
  'bg',
  'm',
  'p',
  'bd',
  'td',
  'ta',
  'mw',
];
const browser = await chromium.launch();
const page = await (await browser.newContext({ reducedMotion: 'reduce' })).newPage();
const json = {};
for (const l of o.largeurs.split(',').map(Number)) {
  const M = await relever(page, o.maquette, l);
  const S = await relever(page, o.site, l);
  console.log(
    `\n===== ${l}px  hauteur maquette=${M.H} site=${S.H}  débordement maquette=${M.deb} site=${S.deb}`,
  );
  const idx = (els) => {
    const m = new Map();
    for (const e of els) {
      const n = m.get(e.k) || [];
      n.push(e);
      m.set(e.k, n);
    }
    return m;
  };
  const iM = idx(M.els),
    iS = idx(S.els);
  const paires = [];
  for (const [k, lm] of iM) {
    const ls = iS.get(k) || [];
    lm.forEach((e, i) => {
      if (ls[i]) paires.push([e, ls[i]]);
    });
  }
  const manquantsS = [...iM.keys()].filter((k) => !iS.has(k));
  const enPlus = [...iS.keys()].filter((k) => !iM.has(k));
  console.log(
    `-- appariés: ${paires.length}; textes maquette absents du site: ${manquantsS.length}; textes site absents de la maquette: ${enPlus.length}`,
  );
  manquantsS.forEach((k) => console.log('   [absent site] ' + k));
  enPlus.forEach((k) => console.log('   [en plus site] ' + k));
  console.log('-- écarts de style');
  for (const [m, s] of paires) {
    const d = PROPS.filter(
      (p) =>
        m[p] !== s[p] &&
        !(p === 'ff' && /^Inter/.test(m[p]) && /^Inter/.test(s[p])) &&
        !(
          p === 'bd' &&
          m[p].replace(/rgb\([^)]*\)/g, '') === s[p].replace(/rgb\([^)]*\)/g, '') &&
          m.c !== s.c
        ),
    ).map((p) => `${p}: ${m[p]} -> ${s[p]}`);
    if (Math.abs(m.w - s.w) > 2) d.push(`w: ${m.w} -> ${s.w}`);
    if (Math.abs(m.h - s.h) > 2) d.push(`h: ${m.h} -> ${s.h}`);
    if (Math.abs(m.x - s.x) > 2) d.push(`x: ${m.x} -> ${s.x}`);
    if (d.length)
      console.log(
        `  «${m.k.slice(0, 50)}» <${m.tag}${m.cls ? '.' + m.cls.split(' ')[0] : ''}> y=${m.y}/${s.y}\n     ${d.join('\n     ')}`,
      );
  }
  console.log('-- dérive verticale (dy = y site - y maquette, sauts > 3px)');
  const tri = paires.slice().sort((a, b) => a[0].y - b[0].y);
  let prev = 0;
  for (const [m, s] of tri) {
    const dy = s.y - m.y;
    if (Math.abs(dy - prev) > 3) {
      console.log(`  y≈${m.y} «${m.k.slice(0, 50)}» dy ${prev} -> ${dy}`);
      prev = dy;
    }
  }
  if (l <= 480) {
    const petitM = new Set(M.cibles.filter((c) => c.h < 44 || c.w < 44).map((c) => c.t));
    console.log('-- cibles < 44 px côté site (non présentes en < 44 dans la maquette)');
    for (const c of S.cibles)
      if ((c.h < 44 || c.w < 44) && !petitM.has(c.t))
        console.log(
          `  ${c.inline ? '[inline] ' : ''}<${c.tag}${c.cls ? '.' + String(c.cls).split(' ')[0] : ''}> «${c.t}» ${c.w}x${c.h}`,
        );
    console.log('-- (pour info) cibles < 44 px côté maquette');
    for (const c of M.cibles)
      if (c.h < 44 || c.w < 44)
        console.log(`  ${c.inline ? '[inline] ' : ''}<${c.tag}> «${c.t}» ${c.w}x${c.h}`);
  }
  json[l] = { M, S };
}
if (o.json) await writeFile(o.json, JSON.stringify(json));
await browser.close();
