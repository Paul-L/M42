#!/usr/bin/env node
/**
 * Comparaison visuelle maquette | site (captures pleine page, côte à côte).
 *
 * Usage :
 *   node tests/visual/comparer.mjs --maquette <url-maquette> --site <url-site> --nom <nom-sortie>
 *     [--largeurs 390,768,1440] [--menu]   (--menu : capture en plus le menu mobile ouvert à 390 px)
 *     [--masquer "<sélecteur CSS>"]         (éléments du site masqués pour la capture « -comparable »,
 *                                            ex. sections absentes de la maquette ; une capture
 *                                            complète « -site » est toujours produite aussi)
 *
 * Exemple :
 *   node tests/visual/comparer.mjs --maquette http://localhost:8123/22_gabarit.html \
 *        --site http://localhost:4321/_kit/ --nom gabarit --menu
 *
 * Sorties : tests/visual/sorties/<nom>-<largeur>[-menu]-{maquette,site,cote-a-cote}.png
 * Les animations et transitions sont désactivées, les éléments « reveal » forcés visibles.
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ici = path.dirname(fileURLToPath(import.meta.url));
const sorties = path.join(ici, 'sorties');

function args() {
  const a = process.argv.slice(2);
  const o = { largeurs: '390,768,1440', menu: false };
  for (let i = 0; i < a.length; i++) {
    const k = a[i].replace(/^--/, '');
    if (k === 'menu') o.menu = true;
    else o[k] = a[++i];
  }
  if (!o.maquette || !o.site || !o.nom) {
    console.error('Paramètres requis : --maquette <url> --site <url> --nom <nom>');
    process.exit(1);
  }
  o.largeurs = o.largeurs.split(',').map(Number);
  return o;
}

const CSS_STABLE = `
*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}
.m42-reveal{opacity:1!important;transform:none!important}
.m42-hdr,header.hdr{position:relative!important}
`;

async function capturer(page, url, largeur, menu, fichier, masquer) {
  // Les fragments de maquette n'ont pas de <meta charset> et les serveurs statiques simples
  // n'envoient pas de charset : on force l'UTF-8 sur les documents HTML pour éviter le mojibake.
  await page.unrouteAll();
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() !== 'document') return route.continue();
    const rep = await route.fetch();
    const type = rep.headers()['content-type'] || 'text/html';
    if (!/text\/html/.test(type) || /charset/i.test(type)) return route.fulfill({ response: rep });
    return route.fulfill({
      response: rep,
      headers: { ...rep.headers(), 'content-type': 'text/html; charset=utf-8' },
    });
  });
  await page.setViewportSize({ width: largeur, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addStyleTag({
    content: CSS_STABLE + (masquer ? `${masquer}{display:none!important}` : ''),
  });
  await page.evaluate(() => document.fonts.ready);
  if (menu) {
    await page.evaluate(() => {
      const c = document.querySelector('#m42-menu-t');
      if (c) {
        c.checked = true;
        c.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }
  await page.waitForTimeout(200);
  const debord = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  await page.screenshot({ path: fichier, fullPage: true });
  return { debord };
}

async function coteACote(browser, gauche, droite, fichier, titreG, titreD) {
  const page = await browser.newPage({ viewport: { width: 400, height: 400 } });
  const fs = await import('node:fs/promises');
  const b64 = async (f) => 'data:image/png;base64,' + (await fs.readFile(f)).toString('base64');
  const html = `<html><body style="margin:0;background:#888;display:flex;gap:16px;align-items:flex-start;font:600 16px sans-serif">
    <figure style="margin:0"><figcaption style="padding:6px;background:#222;color:#fff">${titreG}</figcaption><img src="${await b64(gauche)}" style="display:block"></figure>
    <figure style="margin:0"><figcaption style="padding:6px;background:#222;color:#fff">${titreD}</figcaption><img src="${await b64(droite)}" style="display:block"></figure>
  </body></html>`;
  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({ path: fichier, fullPage: true });
  await page.close();
}

const o = args();
await mkdir(sorties, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ reducedMotion: 'reduce', deviceScaleFactor: 1 });
const page = await ctx.newPage();
const cas = o.largeurs.map((l) => ({ l, menu: false }));
if (o.menu) cas.push({ l: 390, menu: true });
for (const { l, menu } of cas) {
  const base = path.join(sorties, `${o.nom}-${l}${menu ? '-menu' : ''}`);
  const rm = await capturer(page, o.maquette, l, menu, `${base}-maquette.png`);
  const rs = await capturer(page, o.site, l, menu, `${base}-site.png`);
  let droite = `${base}-site.png`;
  if (o.masquer) {
    droite = `${base}-site-comparable.png`;
    await capturer(page, o.site, l, menu, droite, o.masquer);
  }
  await coteACote(
    browser,
    `${base}-maquette.png`,
    droite,
    `${base}-cote-a-cote.png`,
    `Maquette ${l}px`,
    `Site ${l}px${o.masquer ? ' (sans ' + o.masquer + ')' : ''}`,
  );
  console.log(
    `${l}${menu ? ' menu' : ''} : débordement horizontal maquette=${rm.debord}px site=${rs.debord}px -> ${base}-cote-a-cote.png`,
  );
}
await browser.close();
