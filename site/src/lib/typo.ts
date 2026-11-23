// Typographie française appliquée au HTML rendu : espaces insécables
// avant « : » (U+00A0), avant « ; ? ! » et dans les guillemets « » (U+202F, fine insécable).
// Ne touche qu'au texte : ni balises, ni attributs, ni <script>, <style>, <pre>, <code>, <textarea>.

const NBSP = ' ';
const NNBSP = ' ';

export function frenchTypography(text: string): string {
  return text
    .replace(/[   ]+:(?=\s|$|<)/g, `${NBSP}:`)
    .replace(/[   ]+([;?!])/g, `${NNBSP}$1`)
    .replace(/«[   ]*/g, `«${NNBSP}`)
    .replace(/[   ]*»/g, `${NNBSP}»`);
}

const RAW = /(<(script|style|pre|code|textarea)\b[\s\S]*?<\/\2>|<!--[\s\S]*?-->|<[^>]+>)/gi;

export function frenchTypographyHtml(html: string): string {
  // split() avec deux groupes capturants renvoie [texte, balise, nomDeBalise, texte, …].
  return html
    .split(RAW)
    .map((part, i) => (i % 3 === 0 ? frenchTypography(part) : i % 3 === 1 ? part : ''))
    .join('');
}
