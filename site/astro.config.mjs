// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site statique. Les pages internes (préfixe /_) sont exclues du plan du site.
export default defineConfig({
  site: 'https://m42.guide',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith('/_'),
    }),
  ],
});
