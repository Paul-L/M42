/**
 * Image de partage (Open Graph, 1200 × 630) : logo validé « horizontal + baseline », en couleur,
 * centré sur fond papier, avec une marge large (règle du logo : marge ≥ hauteur du « 4 »).
 * Le logo n'est ni redessiné ni déformé (kit/logo). Usage : node scripts/og.mjs
 */
import sharp from 'sharp';
import { join } from 'node:path';

const racine = join(import.meta.dirname, '..');
const logo = await sharp(
  join(racine, '..', 'kit', 'logo', 'png', 'M42_logo_horizontal_baseline_couleur_2000.png'),
)
  .resize({ width: 760 })
  .toBuffer();
const { height } = await sharp(logo).metadata();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#F2EEE6' } })
  .composite([{ input: logo, left: 220, top: Math.round((630 - height) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile(join(racine, 'public', 'og-m42.png'));
console.log('public/og-m42.png');
