// Typographie française appliquée au HTML rendu : espaces insécables
// avant « : » (U+00A0), avant « ; ? ! » et dans les guillemets « » (U+202F, fine insécable).
// Traite le texte et les attributs lus par les personnes (content, aria-label, alt, title, placeholder) ;
// ne touche ni aux autres attributs, ni à <script>, <style>, <pre>, <code>, <textarea>.

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

const READABLE_ATTR = /(\s(?:content|aria-label|alt|title|placeholder)=")([^"]*)(")/g;

function fixTag(tag: string): string {
  if (
    !tag.startsWith('<') ||
    tag.startsWith('<!--') ||
    /^<(script|style|pre|code|textarea)\b/i.test(tag)
  )
    return tag;
  return tag.replace(
    READABLE_ATTR,
    (_m, a: string, v: string, b: string) => a + frenchTypography(v) + b,
  );
}

export function frenchTypographyHtml(html: string): string {
  // split() avec deux groupes capturants renvoie [texte, balise, nomDeBalise, texte, …].
  return html
    .split(RAW)
    .map((part, i) => (i % 3 === 0 ? frenchTypography(part) : i % 3 === 1 ? fixTag(part) : ''))
    .join('');
}
