// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site statique. Les pages internes (préfixe /_) sont exclues du plan du site.
/**
 * Aperçu avec édition sur la page (npm run apercu) : script du Visual Editor de Directus injecté
 * dans le serveur de développement seulement, jamais dans un build.
 */
/** @type {import('astro').AstroIntegration} */
const apercu = {
  name: 'm42-apercu',
  hooks: {
    'astro:config:setup': ({ command, injectScript }) => {
      if (command === 'dev' && process.env.M42_APERCU === '1')
        injectScript('page', "import '/src/lib/apercu-client.ts';");
    },
  },
};

export default defineConfig({
  site: 'https://m42.guide',
  output: 'static',
  trailingSlash: 'always',
  // CSS toujours en fichiers (aucun <style> dans le HTML) : CSP stricte sans 'unsafe-inline'.
  build: { format: 'directory', inlineStylesheets: 'never' },
  integrations: [
    apercu,
    sitemap({
      // Pages non indexées : pages internes (/_…) et confirmation de la lettre.
      filter: (page) => {
        const chemin = new URL(page).pathname;
        return !chemin.startsWith('/_') && !chemin.startsWith('/lettre/');
      },
    }),
  ],
});
