/**
 * Contrôle visuel de TOUTES les pages : maquette | site, à 390, 768 et 1440 px.
 *
 * Usage (depuis site/, après `npm run build`) :
 *   node tests/visual/toutes.mjs            (toutes les pages de src/data/routes.ts + /_kit)
 *   node tests/visual/toutes.mjs Main Contact   (seulement ces fichiers de maquette)
 *
 * Sert lui-même kit/maquette/ et dist/ sur deux ports libres, appelle comparer.mjs page par page,
 * puis écrit tests/visual/sorties/index.html (galerie des images côte à côte).
 * Le runtime de la maquette (support.js) est absent du kit : les {{…}} s'affichent bruts.
 */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const site = join(import.meta.dirname, '..', '..');
const maquette = join(site, '..', 'kit', 'maquette');
const dist = join(site, 'dist');
const sorties = join(import.meta.dirname, 'sorties');

if (!existsSync(dist)) {
  console.error('dist/ absent : lancez d’abord npm run build.');
  process.exit(1);
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};
const serve = (racine) =>
  new Promise((ok) => {
    const s = createServer((req, res) => {
      let p = join(racine, decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
      if (!p.startsWith(racine) || !existsSync(p)) {
        res.writeHead(404).end('404');
        return;
      }
      res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' });
      res.end(readFileSync(p));
    });
    s.listen(0, '127.0.0.1', () => ok(s));
  });

// Pages : correspondance fichier de maquette → URL (src/data/routes.ts), plus le gabarit ↔ /_kit.
const routes = [
  ...readFileSync(join(site, 'src', 'data', 'routes.ts'), 'utf8').matchAll(
    /'([\w-]+\.dc\.html)': '([^']+)'/g,
  ),
].map((m) => ({ fichier: m[1], url: m[2], nom: m[1].replace('.dc.html', '').toLowerCase() }));
routes.push({ fichier: '22_gabarit.html', url: '/_kit/', nom: 'gabarit' });

const filtre = process.argv.slice(2).map((a) => a.toLowerCase().replace('.dc.html', ''));
const pages = filtre.length ? routes.filter((r) => filtre.includes(r.nom)) : routes;

const sMaq = await serve(maquette);
const sSite = await serve(dist);
const maqBase = `http://127.0.0.1:${sMaq.address().port}`;
const siteBase = `http://127.0.0.1:${sSite.address().port}`;

const echecs = [];
for (const p of pages) {
  const args = [
    join(import.meta.dirname, 'comparer.mjs'),
    '--maquette',
    `${maqBase}/${p.fichier}`,
    '--site',
    `${siteBase}${p.url}`,
    '--nom',
    `toutes-${p.nom}`,
  ];
  if (p.nom === 'main' || p.nom === 'gabarit') args.push('--menu');
  if (p.nom === 'gabarit') args.push('--masquer', 'section[aria-labelledby^="k-"]');
  try {
    console.log(`→ ${p.nom} (${p.url})`);
    // Asynchrone : les deux serveurs tournent dans ce processus et doivent continuer à répondre.
    await new Promise((ok, ko) =>
      spawn('node', args, { stdio: 'inherit' }).on('exit', (code) =>
        code === 0 ? ok() : ko(new Error(`code ${code}`)),
      ),
    );
  } catch {
    echecs.push(p.nom);
  }
}
sMaq.close();
sSite.close();

// Galerie
const images = readdirSync(sorties)
  .filter((f) => f.startsWith('toutes-') && f.endsWith('-cote-a-cote.png'))
  .sort();
const html = `<!doctype html><html lang="fr"><meta charset="utf-8"><title>Contrôle visuel M42</title>
<style>body{font:15px system-ui;margin:24px;background:#F2EEE6;color:#0E0F12}h2{margin:32px 0 8px;font-size:16px}
img{max-width:100%;border:1px solid #D7D0C3;background:#fff}a{color:inherit}</style>
<h1>Maquette | site — ${images.length} images</h1>
<p>Gauche : maquette (sans support.js, valeurs {{…}} brutes). Droite : site. Écarts connus : DECISIONS.md.</p>
${images.map((f) => `<h2 id="${f}">${f.replace('toutes-', '').replace('-cote-a-cote.png', '')}</h2><a href="${f}"><img loading="lazy" src="${f}" alt=""></a>`).join('\n')}
</html>`;
writeFileSync(join(sorties, 'index.html'), html);
console.log(`\nGalerie : ${join(sorties, 'index.html')}`);
if (echecs.length) {
  console.error(`Échecs : ${echecs.join(', ')}`);
  process.exit(1);
}
