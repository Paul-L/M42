/**
 * Compare deux builds du site, fichier par fichier (octet pour octet).
 * Sert à vérifier qu'un changement de source du contenu (fichiers locaux ou Directus)
 * ne modifie pas le HTML produit.
 *
 * Usage : node scripts/comparer-dist.mjs <dossier-reference> [<dossier-a-comparer> = dist]
 * Sortie : liste des fichiers absents, en trop ou différents ; code 1 s'il y en a.
 * Pour un HTML différent, affiche le premier écart (contexte de 120 caractères).
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const [ref, cible = 'dist'] = process.argv.slice(2);
if (!ref) {
  console.error('Usage : node scripts/comparer-dist.mjs <dossier-reference> [<dossier>]');
  process.exit(2);
}

const lister = (racine) => {
  const out = [];
  const parcourir = (d) => {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) parcourir(p);
      else out.push(relative(racine, p));
    }
  };
  parcourir(racine);
  return new Set(out);
};

const a = lister(ref);
const b = lister(cible);
const absents = [...a].filter((f) => !b.has(f)).sort();
const enTrop = [...b].filter((f) => !a.has(f)).sort();
const differents = [];
for (const f of [...a].filter((f) => b.has(f)).sort()) {
  const x = readFileSync(join(ref, f));
  const y = readFileSync(join(cible, f));
  if (!x.equals(y)) differents.push(f);
}

for (const f of absents) console.log(`absent      ${f}`);
for (const f of enTrop) console.log(`en trop     ${f}`);
for (const f of differents) {
  console.log(`différent   ${f}`);
  if (f.endsWith('.html') || f.endsWith('.xml') || f.endsWith('.css') || f.endsWith('.js')) {
    const x = readFileSync(join(ref, f), 'utf8');
    const y = readFileSync(join(cible, f), 'utf8');
    let i = 0;
    while (i < x.length && x[i] === y[i]) i++;
    console.log(`  réf.  : …${x.slice(Math.max(0, i - 60), i + 60)}…`);
    console.log(`  build : …${y.slice(Math.max(0, i - 60), i + 60)}…`);
  }
}
const total = absents.length + enTrop.length + differents.length;
console.log(
  total
    ? `\n${total} écart(s) sur ${a.size} fichiers.`
    : `Identiques : ${a.size} fichiers, aucun écart.`,
);
process.exit(total ? 1 : 0);
