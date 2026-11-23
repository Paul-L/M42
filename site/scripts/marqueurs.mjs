// Recense les marqueurs [À …] de la maquette et du site, et régénère la section
// automatique de TODO_CONTENU.md (entre les balises BEGIN/END).
// Usage : node scripts/marqueurs.mjs   (depuis site/)
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = join(import.meta.dirname, '..', '..');
const maquette = join(root, 'kit', 'maquette');
const todoPath = join(root, 'TODO_CONTENU.md');
const BEGIN =
  '<!-- BEGIN marqueurs (généré par site/scripts/marqueurs.mjs, ne pas éditer à la main) -->';
const END = '<!-- END marqueurs -->';

const re = /\[À [A-ZÉÈ]+[^\]]*\]/g;
const clean = (s) => s.replace(/\s+/g, ' ').trim();

// Correspondance fichier de maquette → URL (21_plan_pages.md).
const plan = readFileSync(join(maquette, '21_plan_pages.md'), 'utf8');
const urls = Object.fromEntries(
  [...plan.matchAll(/^\| ([\w-]+\.dc\.html) \| ([^|]+) \|/gm)].map((m) => [m[1], m[2].trim()]),
);

const markers = (text) => [...new Set([...text.matchAll(re)].map((m) => clean(m[0])))];

let out = [BEGIN, '', '## Marqueurs de la maquette, par page', ''];
let total = 0;
for (const f of readdirSync(maquette)
  .filter((f) => f.endsWith('.dc.html'))
  .sort()) {
  const list = markers(readFileSync(join(maquette, f), 'utf8'));
  if (!list.length) continue;
  total += list.length;
  out.push(`### ${f.replace('.dc.html', '')} — \`${urls[f] ?? '?'}\``, '');
  for (const m of list) out.push(`- [ ] ${m}`);
  out.push('');
}

// Marqueurs présents dans le code du site (hors page de démonstration /_kit).
const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const siteSrc = join(root, 'site', 'src');
const siteHits = [];
if (existsSync(siteSrc)) {
  for (const p of walk(siteSrc)) {
    if (p.includes('[kit]')) continue;
    for (const m of markers(readFileSync(p, 'utf8')))
      siteHits.push(`- [ ] \`${relative(root, p)}\` : ${m}`);
  }
}
out.push(
  '## Marqueurs présents dans le code du site',
  '',
  ...(siteHits.length ? siteHits : ['Aucun.']),
  '',
);
out.push(
  `_${total} marqueurs uniques dans la maquette, ${siteHits.length} dans le site._`,
  '',
  END,
);

const body = out.join('\n');
const forbidden = join(root, '.claude', 'regles-interdites.local.txt');
if (existsSync(forbidden)) {
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const terms = readFileSync(forbidden, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
  if (terms.some((t) => norm(body).includes(norm(t)))) {
    console.error('Terme interdit détecté dans les marqueurs : TODO_CONTENU.md non modifié.');
    process.exit(1);
  }
}

let todo = existsSync(todoPath) ? readFileSync(todoPath, 'utf8') : '';
if (todo.includes(BEGIN) && todo.includes(END)) {
  todo = todo.slice(0, todo.indexOf(BEGIN)) + body + todo.slice(todo.indexOf(END) + END.length);
} else {
  todo = `${todo.trimEnd()}\n\n${body}\n`;
}
writeFileSync(todoPath, todo);
console.log(`TODO_CONTENU.md : ${total} marqueurs (maquette), ${siteHits.length} (site).`);
