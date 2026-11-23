// Texte avec marqueurs de relecture en ligne (PublicRichText) : conversions partagées par les
// composants des pages « Pour qui » (RichText, PublicFaq) et par le JSON-LD (json-ld.ts).

import type { PublicRichText, PublicSegment } from '../../data/publics/types';

/** Classe globale de l'étiquette de marqueur (draft-marker.css). */
export const MARKER_CLASS = 'm42-draft-marker';

/** Motif d'un marqueur de relecture écrit en clair (« [À COMPLÉTER] », « [PDF À PRODUIRE] », « [SI …] »). */
export const MARKER_PATTERN = /\[(?:PDF )?À [^\]]*\]|\[SI [^\]]*\]/;

export const segmentsOf = (value: PublicRichText): PublicSegment[] =>
  typeof value === 'string' ? [value] : value;

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** HTML d'un paragraphe (réponse de FAQ) : marqueurs en étiquette. */
export const richTextToHtml = (value: PublicRichText): string =>
  `<p>${segmentsOf(value)
    .map((s) =>
      typeof s === 'string'
        ? escapeHtml(s)
        : `<span class="${MARKER_CLASS}">${escapeHtml(s.marker)}</span>`,
    )
    .join('')}</p>`;

/** Texte brut (marqueurs compris), tel que lu à l'écran. */
export const richTextToPlain = (value: PublicRichText): string =>
  segmentsOf(value)
    .map((s) => (typeof s === 'string' ? s : s.marker))
    .join('');

/** Vrai si le texte contient un marqueur (segment `{ marker }` ou « [À …] » écrit en clair). */
export const hasMarker = (value: PublicRichText): boolean =>
  segmentsOf(value).some((s) => typeof s !== 'string' || MARKER_PATTERN.test(s));
