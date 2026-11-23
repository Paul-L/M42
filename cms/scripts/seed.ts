/**
 * Remplit Directus avec le contenu de la maquette (src/data du site), sans ressaisie.
 *
 * Usage (depuis site/) :
 *   npm run cms:seed                 crée les éléments absents, ne touche pas aux autres
 *   npm run cms:seed -- --remplacer  réécrit tout depuis src/data (écrase les modifications
 *                                    faites dans Directus : à n'utiliser qu'avant la mise en ligne)
 *
 * Chaque page ou élément du registre (site/src/lib/cms/registre.ts) devient un enregistrement
 * publié ; ses questions de FAQ et ses sources deviennent des lignes reliées.
 */
import { api } from './lib.ts';
import { documents } from '../../site/src/lib/cms/registre.ts';
import { PARENT, versEnregistrement } from '../../site/src/lib/cms/modele.ts';
import { plan } from '../../site/src/lib/cms/plat.ts';

const remplacer = process.argv.includes('--remplacer');
let crees = 0;
let remplaces = 0;
let gardes = 0;

const rang = new Map<string, number>();

for (const doc of documents) {
  const { champs: plats } = plan(doc.collection, doc.collection === 'pages' ? doc.slug : undefined);
  const { champs, faq, sources } = versEnregistrement(doc, plats);
  const n = (rang.get(doc.collection) ?? 0) + 1;
  rang.set(doc.collection, n);

  if (doc.collection === 'settings') {
    const actuel = await api<Record<string, unknown> | null>('GET', '/items/settings');
    const vide =
      !actuel ||
      Object.entries(actuel).every(
        ([k, v]) => k === 'id' || k.startsWith('date_') || k.startsWith('user_') || v === null,
      );
    if (vide || remplacer) {
      const { slug: _s, status: _st, ...reste } = champs;
      await api('PATCH', '/items/settings', reste);
      if (vide) crees++;
      else remplaces++;
    } else gardes++;
    continue;
  }

  const q = encodeURIComponent(JSON.stringify({ slug: { _eq: doc.slug } }));
  const existant = (
    await api<{ id: number }[]>('GET', `/items/${doc.collection}?filter=${q}&fields=id&limit=1`)
  )[0];
  if (existant && !remplacer) {
    gardes++;
    continue;
  }

  const parent = PARENT[doc.collection];
  if (existant && parent) {
    // Pas de sources pour les pages « Pour qui » (pas de relation sources.public).
    for (const enfant of parent === 'public' ? ['faq'] : ['faq', 'sources']) {
      const f = encodeURIComponent(JSON.stringify({ [parent]: { _eq: existant.id } }));
      const lignes = await api<{ id: number }[]>(
        'GET',
        `/items/${enfant}?filter=${f}&fields=id&limit=-1`,
      );
      if (lignes.length)
        await api(
          'DELETE',
          `/items/${enfant}`,
          lignes.map((l) => l.id),
        );
    }
  }

  const corps = {
    ...champs,
    sort: n,
    ...(parent && faq.length ? { questions_faq: faq } : {}),
    ...(parent && sources.length ? { sources_citees: sources } : {}),
  };
  if (!parent && (faq.length || sources.length))
    throw new Error(`${doc.slug} : FAQ ou sources sans relation`);

  if (existant) {
    await api('PATCH', `/items/${doc.collection}/${existant.id}`, corps);
    remplaces++;
  } else {
    await api('POST', `/items/${doc.collection}`, corps);
    crees++;
  }
  console.log(
    `${existant ? '~' : '+'} ${doc.collection}/${doc.slug}${faq.length ? ` · ${faq.length} questions` : ''}${sources.length ? ` · ${sources.length} sources` : ''}`,
  );
}

console.log(
  `\nSeed : ${crees} créé(s), ${remplaces} remplacé(s), ${gardes} déjà présent(s) gardé(s).`,
);
