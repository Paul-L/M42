// Données structurées des pages satellites (kit/docs/11_architecture_seo.md, § 3.3).
// - Pages « événement » et « secteur » : WebPage + BreadcrumbList + FAQPage.
// - Page « guide » : Article (auteurs Person ×2, Clara puis Paul) + BreadcrumbList + FAQPage.
// Règles (DECISIONS.md, points 19) : aucune valeur contenant un marqueur [À …] n'est émise ;
// FAQPage limitée aux questions sans marqueur ; un marqueur restant fait échouer le build.
// Jamais de nom d'employeur : les auteurs viennent de personSchema() (memberOf M42 seulement).

import { intervenants, personSchema } from '../intervenants';
import type { Crumb, FaqItem } from './types';

const SITE = 'https://m42.guide';

/** Motif d'un marqueur de relecture (« [À COMPLÉTER] », « [À VÉRIFIER : …] »…). */
export const MARKER_PATTERN = /\[À [^\]]*\]/;

/** Texte brut d'une réponse HTML (balises retirées, entités courantes décodées). */
export function plainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>\s*<p[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

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

function breadcrumbNode(url: string, crumbs: Crumb[]): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#ariane`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE}${c.href}` } : {}),
    })),
  };
}

function faqNode(url: string, items: FaqItem[]): Record<string, unknown> | undefined {
  const questions = items.filter(
    (i) => i.jsonLd !== false && !MARKER_PATTERN.test(i.question) && !MARKER_PATTERN.test(i.answer),
  );
  if (questions.length === 0) return undefined;
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: plainText(q.answer) },
    })),
  };
}

interface PageOptions {
  /** Chemin de la page (« /conference-ia-seminaire-entreprise/ »). */
  path: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  faq: FaqItem[];
}

function finish(graph: (Record<string, unknown> | undefined)[]) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph.filter((n): n is Record<string, unknown> => n !== undefined),
  };
  assertNoMarker(jsonLd);
  return jsonLd;
}

/** Satellites « événement » et « secteur » : WebPage + BreadcrumbList + FAQPage. */
export function satellitePageJsonLd({ path, title, description, crumbs, faq }: PageOptions) {
  const url = `${SITE}${path}`;
  return finish([
    {
      '@type': 'WebPage',
      '@id': `${url}#page`,
      url,
      name: title,
      description,
      isPartOf: { '@id': `${SITE}/#site` },
      about: { '@id': `${SITE}/#organisation` },
      breadcrumb: { '@id': `${url}#ariane` },
      inLanguage: 'fr-FR',
    },
    breadcrumbNode(url, crumbs),
    faqNode(url, faq),
  ]);
}

interface ArticleOptions extends PageOptions {
  /** Titre de l'article (H1). */
  headline: string;
  /** Date de mise à jour réelle (AAAA-MM-JJ) : absente tant qu'elle est « [À COMPLÉTER] ». */
  dateModified?: string | undefined;
}

/** Satellite « guide » : Article (auteurs Clara puis Paul) + WebPage + BreadcrumbList + FAQPage. */
export function satelliteArticleJsonLd({
  path,
  title,
  description,
  crumbs,
  faq,
  headline,
  dateModified,
}: ArticleOptions) {
  const url = `${SITE}${path}`;
  return finish([
    {
      '@type': 'WebPage',
      '@id': `${url}#page`,
      url,
      name: title,
      description,
      isPartOf: { '@id': `${SITE}/#site` },
      breadcrumb: { '@id': `${url}#ariane` },
      mainEntity: { '@id': `${url}#article` },
      inLanguage: 'fr-FR',
    },
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline,
      description,
      url,
      mainEntityOfPage: { '@id': `${url}#page` },
      // Toujours dans cet ordre : Clara, puis Paul.
      author: intervenants.map((i) => personSchema(i)),
      publisher: { '@id': `${SITE}/#organisation` },
      ...(dateModified ? { dateModified } : {}),
      inLanguage: 'fr-FR',
    },
    breadcrumbNode(url, crumbs),
    faqNode(url, faq),
  ]);
}
