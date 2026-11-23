// JSON-LD des pages conférences (kit/docs/11_architecture_seo.md, § 3.3, exemple 2) :
// WebPage + BreadcrumbList + Service (+ FAQPage, réponses identiques au texte visible).
// Aucun nom d'employeur ni structure de facturation : le prestataire est l'organisation M42 (@id).
// Pas de bloc `offers` (aucun prix affiché). `dateModified` seulement quand une vraie date est fixée.

import type { Conference, QuestionFaq } from './types';
import { assertNoMarker } from '../../components/publics/json-ld';

/** Marqueurs de relecture : une question qui en contient reste visible mais sort du FAQPage (DECISIONS.md 19). */
const MARQUEUR = /\[(?:À|PDF À|SI) /;

const SITE = 'https://m42.guide';

/** Texte brut d'une réponse HTML (balises retirées, entités courantes décodées). */
export function texteBrut(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>\s*<p[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export function faqJsonLd(items: QuestionFaq[], id: string): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: items
      .filter((q) => !MARQUEUR.test(q.question) && !MARQUEUR.test(q.reponse))
      .map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: { '@type': 'Answer', text: texteBrut(q.reponse) },
      })),
  };
}

export function conferenceJsonLd(conf: Conference): Record<string, unknown> {
  const graph = construireGraphe(conf);
  assertNoMarker(graph, `conférence ${conf.slug}`);
  return graph;
}

function construireGraphe(conf: Conference): Record<string, unknown> {
  const url = `${SITE}/conferences/${conf.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: conf.seo.title,
        description: conf.seo.description,
        isPartOf: { '@id': `${SITE}/#site` },
        breadcrumb: { '@id': `${url}#ariane` },
        mainEntity: { '@id': `${url}#service` },
        ...(conf.dateModified ? { dateModified: conf.dateModified } : {}),
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#ariane`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Conférences', item: `${SITE}/conferences/` },
          { '@type': 'ListItem', position: 3, name: conf.titre },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: conf.service.name,
        serviceType: conf.service.serviceType,
        description: conf.service.description,
        provider: { '@id': `${SITE}/#organisation` },
        areaServed: { '@type': 'Country', name: 'France' },
        availableLanguage: 'fr',
        audience: conf.service.audiences.map((a) => ({ '@type': 'Audience', audienceType: a })),
        about: conf.service.about.map((a) => ({ '@type': 'Thing', name: a })),
      },
      faqJsonLd(conf.faq.items, `${url}#faq`),
    ],
  };
}
