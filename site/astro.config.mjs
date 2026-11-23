// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site statique. Les pages internes (préfixe /_) sont exclues du plan du site.
export default defineConfig({
  site: 'https://m42.guide',
  output: 'static',
  trailingSlash: 'always',
  // CSS toujours en fichiers (aucun <style> dans le HTML) : CSP stricte sans 'unsafe-inline'.
  build: { format: 'directory', inlineStylesheets: 'never' },
  integrations: [
    sitemap({
      // Pages non indexées : pages internes (/_…) et confirmation de la lettre.
      filter: (page) => {
        const chemin = new URL(page).pathname;
        return !chemin.startsWith('/_') && !chemin.startsWith('/lettre/');
      },
    }),
  ],
});
