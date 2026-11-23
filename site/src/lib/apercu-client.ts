/**
 * Édition sur la page (Visual Editor de Directus), en aperçu seulement (`npm run apercu`).
 * Injecté par l'intégration « m42-apercu » (astro.config.mjs) dans le serveur de développement,
 * jamais dans un build. Retire les marques invisibles posées par le chargement du contenu
 * (cms/marques.ts), rend modifiable l'élément qui contenait chaque texte, puis se connecte au
 * Visual Editor quand la page est ouverte dans Directus. Après un enregistrement, la page se
 * recharge (le serveur d'aperçu relit Directus).
 */
import { apply, setAttr } from '@directus/visual-editing';
import { MARQUE, decoder, type Cible } from './cms/marques';

const DIRECTUS = import.meta.env.PUBLIC_DIRECTUS_URL as string | undefined;

interface Zone {
  collection: string;
  item: string | number;
  champs: Set<string>;
  liste: boolean;
}

function lireMarques(texte: string): { propre: string; cibles: Cible[] } {
  const cibles: Cible[] = [];
  const propre = texte.replace(MARQUE, (_, suite: string) => {
    const c = decoder(suite);
    if (c) cibles.push(c);
    return '';
  });
  return { propre, cibles };
}

function annoter(): HTMLElement[] {
  const zones = new Map<HTMLElement, Zone>();
  const marcheur = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const noeuds: Text[] = [];
  while (marcheur.nextNode()) noeuds.push(marcheur.currentNode as Text);
  for (const n of noeuds) {
    if (!n.data.includes('⁣')) continue;
    const { propre, cibles } = lireMarques(n.data);
    n.data = propre;
    const el = n.parentElement;
    if (!el || !cibles.length || el.closest('script, style')) continue;
    for (const c of cibles) {
      const z = zones.get(el);
      if (!z) zones.set(el, { ...c, champs: new Set([c.champ]), liste: !!c.liste });
      else if (z.collection === c.collection && String(z.item) === String(c.item)) {
        z.champs.add(c.champ);
        z.liste ||= !!c.liste;
      }
    }
  }
  // Marques restées dans les attributs (alt, aria-label, title…) et dans le titre de l'onglet.
  for (const el of document.querySelectorAll<HTMLElement>('*')) {
    for (const a of [...el.attributes])
      if (a.value.includes('⁣')) el.setAttribute(a.name, a.value.replace(MARQUE, ''));
  }
  document.title = document.title.replace(MARQUE, '');

  for (const [el, z] of zones) {
    el.setAttribute(
      'data-directus',
      setAttr({
        collection: z.collection,
        item: z.item,
        fields: [...z.champs],
        mode: z.liste || z.champs.size > 1 ? 'drawer' : 'popover',
      }),
    );
  }
  return [...zones.keys()];
}

const elements = annoter();
if (DIRECTUS && window.parent !== window) {
  void apply({
    directusUrl: DIRECTUS,
    elements,
    customClass: 'm42-editable',
    onSaved: () => window.location.reload(),
  });
}
