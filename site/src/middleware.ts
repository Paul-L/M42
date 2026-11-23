import { defineMiddleware } from 'astro:middleware';
import { frenchTypographyHtml } from './lib/typo';

// Les textes restent identiques à la maquette dans le code ; la typographie française
// (espaces insécables) est appliquée au rendu, en développement comme au build.
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const html = await response.text();
  return new Response(frenchTypographyHtml(html), response);
});
