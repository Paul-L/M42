/**
 * Test de bout en bout des formulaires (site construit + Directus + Mailpit en local).
 * Usage (depuis site/) : npm run build && npx astro preview (port 4321), puis
 *   node tests/e2e/formulaires.mjs [http://localhost:4321] [http://localhost:8025]
 * Vérifie : contact (envoi, confirmation, e-mail à Clara et Paul), lettre (double opt-in
 * jusqu'au clic sur le lien), fiche de l'outil avec la lettre cochée.
 */
import { chromium } from '@playwright/test';

const SITE = process.argv[2] ?? 'http://localhost:4321';
const MAILPIT = process.argv[3] ?? 'http://localhost:8025';
const id = Date.now().toString(36);
const echecs = [];
const ok = (cond, msg) => {
  console.log(`${cond ? 'OK ' : 'KO '} ${msg}`);
  if (!cond) echecs.push(msg);
};
const messages = async () => (await (await fetch(`${MAILPIT}/api/v1/messages`)).json()).messages;
const attendreMail = async (filtre) => {
  for (let i = 0; i < 30; i++) {
    const m = (await messages()).find(filtre);
    if (m) return m;
    await new Promise((r) => setTimeout(r, 500));
  }
  return null;
};

const browser = await chromium.launch();
const page = await browser.newPage();

// 1. Contact
await page.goto(`${SITE}/contact/`);
await page.fill('#c-nom', 'Test Bout');
await page.fill('#c-structure', `Mairie test ${id}`);
await page.fill('#c-email', `contact-${id}@exemple.fr`);
await page.selectOption('#c-type', { index: 1 });
await page.fill('textarea[name="message"]', 'Message de test automatique.');
await page.waitForTimeout(3200);
await page.click('[data-contact-form] button[type="submit"]');
await page.waitForSelector('[data-done]:not([hidden])', { timeout: 10000 }).catch(() => {});
ok(await page.isVisible('[data-done]'), 'contact : confirmation affichée');
const notif = await attendreMail((m) => m.Subject.includes(`Mairie test ${id}`));
ok(
  !!notif && notif.To.map((t) => t.Address).join(',') === 'clara@m42.guide,paul@m42.guide',
  'contact : e-mail à Clara et Paul',
);

// 2. Robot trop rapide : refusé, message d'échec
await page.goto(`${SITE}/contact/`);
await page.fill('#c-nom', 'Robot');
await page.fill('#c-structure', 'Robot');
await page.fill('#c-email', `robot-${id}@exemple.fr`);
await page.selectOption('#c-type', { index: 1 });
await page.click('[data-contact-form] button[type="submit"]');
await page.waitForSelector('[data-send-error]:not([hidden])', { timeout: 10000 }).catch(() => {});
ok(
  await page.isVisible('[data-send-error]'),
  'contact trop rapide : refusé, message d’échec affiché',
);

// 3. Lettre (Repères) puis confirmation
await page.goto(`${SITE}/reperes/`);
await page.fill('#lettre-mail', `lettre-${id}@exemple.fr`);
await page.waitForTimeout(3200);
await page.click('[data-lettre] button[type="submit"]');
await page
  .waitForSelector('[data-lettre] [data-done]:not([hidden])', { timeout: 10000 })
  .catch(() => {});
ok(await page.isVisible('[data-lettre] [data-done]'), 'lettre : confirmation affichée');
const conf = await attendreMail((m) => m.To[0]?.Address === `lettre-${id}@exemple.fr`);
ok(!!conf, 'lettre : e-mail de confirmation reçu');
if (conf) {
  const texte = (await (await fetch(`${MAILPIT}/api/v1/message/${conf.ID}`)).json()).Text;
  const lien = texte
    .match(/https?:\/\/[^\s)]+\/lettre\/confirmer\/\?[^\s)]+/)?.[0]
    ?.replace(/&amp;/g, '&');
  ok(!!lien, 'lettre : lien de confirmation présent');
  if (lien) {
    await page.goto(lien.replace(/^https?:\/\/[^/]+/, SITE));
    await page
      .waitForFunction(() => !document.querySelector('[data-suite]')?.hidden, null, {
        timeout: 10000,
      })
      .catch(() => {});
    ok(
      (await page.textContent('h1'))?.includes('confirmée'),
      'lettre : inscription confirmée par le lien',
    );
    await page.goto(`${SITE}/lettre/confirmer/?id=1&jeton=faux`);
    await page
      .waitForFunction(() => !document.querySelector('[data-suite]')?.hidden, null, {
        timeout: 10000,
      })
      .catch(() => {});
    ok((await page.textContent('h1'))?.includes('pas pu confirmer'), 'lettre : lien faux refusé');
  }
}

// 4. Fiche de l'outil, lettre cochée
await page.goto(`${SITE}/outils/arnaque-ou-pas/`);
const fiche = page.locator('[data-capture="fiche"]');
await fiche.locator('input[type="email"]').fill(`fiche-${id}@exemple.fr`);
await fiche.locator('[data-letter]').check();
await page.waitForTimeout(3200);
await fiche.locator('button[type="submit"]').click();
await fiche
  .locator('[data-done]:not([hidden])')
  .waitFor({ timeout: 10000 })
  .catch(() => {});
ok(await fiche.locator('[data-done]').isVisible(), 'fiche : confirmation affichée');
ok(
  await fiche.locator('[data-done-note]').isVisible(),
  'fiche : rappel de confirmer l’adresse (lettre cochée)',
);
ok(
  !!(await attendreMail((m) => m.Subject.includes(`fiche-${id}@exemple.fr`))),
  'fiche : Clara et Paul prévenus',
);
ok(
  !!(await attendreMail((m) => m.To[0]?.Address === `fiche-${id}@exemple.fr`)),
  'fiche : e-mail de confirmation de la lettre',
);

await browser.close();
console.log(echecs.length ? `\n${echecs.length} échec(s).` : '\nTous les tests passent.');
process.exit(echecs.length ? 1 : 0);
