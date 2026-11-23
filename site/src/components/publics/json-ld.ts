// Données structurées des pages « Pour qui » : WebPage + BreadcrumbList + Service + FAQPage,
// construites à partir de l'objet de la page (PublicPage, un enregistrement Directus `publics`).
// Règle (DECISIONS.md, point 19) : aucune valeur contenant un marqueur [À …] n'est émise.
// - FAQPage : seules les questions dont la réponse ne contient aucun marqueur sont balisées
//   (la FAQ visible, elle, garde toutes les questions et leurs marqueurs) ;
// - tout le reste est contrôlé au build : un marqueur restant fait échouer la génération.

import type { PublicFaqItem, PublicPage } from '../../data/publics/types';
import { MARKER_PATTERN, hasMarker, richTextToPlain } from './rich-text';

const SITE = 'https://m42.guide';

/** Questions balisables : réponse sans marqueur de relecture. */
export const faqForJsonLd = (items: PublicFaqItem[]) =>
  items.filter((i) => !hasMarker(i.answer) && !MARKER_PATTERN.test(i.question));

/** FAQ affichée : questions de la page, plus la question en attente si elle est publiée. */
export const visibleFaqItems = (page: PublicPage): PublicFaqItem[] =>
  page.faq.pending?.published ? [...page.faq.items, page.faq.pending.item] : page.faq.items;

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

/** Propriétés propres du Service : nom, type, description (texte de l'en-tête), publics, sujets. */
function serviceOf(page: PublicPage): Record<string, unknown> {
  const { name, serviceType, audience, about, descriptionWithFormatsNote } = page.seo.service;
  const parts = [page.hero.lead, ...page.hero.paragraphs];
  if (descriptionWithFormatsNote && page.formats.note) parts.push(page.formats.note);
  const service: Record<string, unknown> = {
    name,
    serviceType,
    description: parts.join(' '),
    audience: audience.map((a) =>
      a.educationalRole
        ? {
            '@type': 'EducationalAudience',
            educationalRole: a.educationalRole,
            audienceType: a.audienceType,
          }
        : { '@type': 'Audience', audienceType: a.audienceType },
    ),
  };
  if (about) service.about = about.map((n) => ({ '@type': 'Thing', name: n }));
  return service;
}

export function publicPageJsonLd(page: PublicPage) {
  const { title, description } = page.seo;
  const url = `${SITE}/${page.slug}/`;
  const questions = faqForJsonLd(visibleFaqItems(page));
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
        { '@type': 'ListItem', position: 1, name: page.labels.home, item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: page.hero.crumb },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      ...serviceOf(page),
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
