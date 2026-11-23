/**
 * robots.txt (11_architecture_seo.md, § 3.6). Production : moteurs et robots de recherche des IA
 * autorisés. Préproduction (M42_ENV=preprod) : tout est bloqué (en plus du noindex et du mot de passe).
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const preprod = (import.meta.env.M42_ENV ?? process.env.M42_ENV) === 'preprod';
  const corps = preprod
    ? ['# Préproduction : ne pas indexer.', 'User-agent: *', 'Disallow: /', '']
    : [
        'User-agent: *',
        'Allow: /',
        '',
        '# Robots de recherche des IA : autorisés (visibilité dans les réponses)',
        'User-agent: OAI-SearchBot',
        'Allow: /',
        '',
        'User-agent: PerplexityBot',
        'Allow: /',
        '',
        `Sitemap: ${new URL('/sitemap-index.xml', site)}`,
        '',
      ];
  return new Response(corps.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
