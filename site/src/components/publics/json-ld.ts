// Données structurées des pages « Pour qui » : WebPage + BreadcrumbList + Service + FAQPage.
// Règle (DECISIONS.md, point 19) : aucune valeur contenant un marqueur [À …] n'est émise.
// - FAQPage : seules les questions dont la réponse ne contient aucun marqueur sont balisées
//   (la FAQ visible, elle, garde toutes les questions et leurs marqueurs) ;
// - tout le reste est contrôlé au build : un marqueur restant fait échouer la génération.

import type { PublicFaqItem } from '../../data/publics/types';
import { MARKER_PATTERN, hasMarker, richTextToPlain } from './rich-text';

const SITE = 'https://m42.guide';

export interface PublicJsonLdOptions {
  /** Chemin de la page (« /entreprises/ »). */
  path: string;
  /** Title et meta description de la page. */
  title: string;
  description: string;
  /** Libellé de la page dans le fil d'Ariane. */
  crumb: string;
  /** Propriétés propres du Service (name, serviceType, description, audience, about…). */
  service: Record<string, unknown>;
  /** FAQ visible de la page. */
  faq: PublicFaqItem[];
}

/** Questions balisables : réponse sans marqueur de relecture. */
export const faqForJsonLd = (items: PublicFaqItem[]) =>
  items.filter((i) => !hasMarker(i.answer) && !MARKER_PATTERN.test(i.question));

/** Lève une erreur si une valeur du JSON-LD contient encore un marqueur [À …]. */
export function assertNoMarker(value: unknown, where = 'jsonLd'): void {
  if (typeof value === 'string') {
    if (MARKER_PATTERN.test(value)) {
      throw new Error(`JSON-LD : marqueur de relecture dans ${where} : « ${value} »`);
    }
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => assertNoMarker(v, `${where}[${i}]`));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) assertNoMarker(v, `${where}.${k}`);
  }
}

export function publicPageJsonLd({
  path,
  title,
  description,
  crumb,
  service,
  faq,
}: PublicJsonLdOptions) {
  const url = `${SITE}${path}`;
  const questions = faqForJsonLd(faq);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${url}#page`,
      url,
      name: title,
      description,
      isPartOf: { '@id': `${SITE}/#site` },
      about: { '@id': `${SITE}/#organisation` },
      breadcrumb: { '@id': `${url}#ariane` },
      mainEntity: { '@id': `${url}#service` },
      inLanguage: 'fr-FR',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#ariane`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: crumb },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      ...service,
      provider: { '@id': `${SITE}/#organisation` },
      areaServed: { '@type': 'Country', name: 'France' },
      availableLanguage: 'fr',
    },
  ];
  if (questions.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: questions.map((i) => ({
        '@type': 'Question',
        name: i.question,
        acceptedAnswer: { '@type': 'Answer', text: richTextToPlain(i.answer) },
      })),
    });
  }
  const jsonLd = { '@context': 'https://schema.org', '@graph': graph };
  assertNoMarker(jsonLd);
  return jsonLd;
}
