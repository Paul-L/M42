# Stack technique — M42.guide

Versions relevées le 23 novembre 2026 (registre npm, Docker Hub, nodejs.org).

| Brique | Version retenue | Dernière stable | Pourquoi |
|---|---|---|---|
| Node.js | 22.23 en local (≥ 22.23.4 requis), **26 LTS** visé (`.nvmrc`) | 26.13.1 « Lithium » (LTS) | Astro 7 exige Node ≥ 22.23.4. La production et Coolify utiliseront Node 26 LTS. Mettre à jour Node en local quand possible. |
| Astro | 7.4.13 | 7.4.13 | Sortie statique, îlots, `astro:assets`. |
| @astrojs/sitemap | 3.7.6 | 3.7.6 | Plan du site ; les pages `/_…` en sont exclues. |
| @astrojs/check | 0.9.12 | 0.9.12 | Vérification TypeScript des `.astro`. |
| TypeScript | 6.0.3 | 7.0.2 | `@astrojs/check` et `typescript-eslint` n'acceptent pas encore TS 7. À relever dès que possible. |
| Polices | @fontsource/cormorant 5.3.0 (500, 600, 500 italique) · @fontsource-variable/inter 5.3.0 | idem | Auto-hébergées (RGPD) : aucun appel à Google Fonts. Inter en version variable (400 à 600 dans un seul fichier). |
| Prettier | 3.10.1 + prettier-plugin-astro 1.1.2 | idem | Formatage. |
| ESLint | 10.15.0 + eslint-plugin-astro 3.2.1 + typescript-eslint 8.73.0 | idem | `eslint-plugin-jsx-a11y` (6.10.2) n'est pas compatible ESLint 10 : l'accessibilité est contrôlée par axe-core. |
| Playwright | @playwright/test 1.65.1 + @axe-core/playwright 4.14.0 | idem | Captures comparatives et audit d'accessibilité. |
| Directus | 12.7.0 (image `directus/directus:12.7.0`) | 12.7.0 | CMS. |
| PostgreSQL | 18.7 (`postgres:18.7-alpine`) | 19.0 | La 19.0 vient de sortir : on attend une version corrective et la confirmation de compatibilité Directus. |

## Choix techniques

- **Astro en statique** (`output: 'static'`, `trailingSlash: 'always'`, URL en dossiers) : pages rapides, aucun serveur applicatif à maintenir. Les contenus Directus sont lus au moment du build (phase 3).
- **CSS natif** : tokens de la DA dans `site/src/styles/tokens.css`, feuille globale `global.css` (base, focus, apparition au défilement, mouvement réduit), styles scopés par composant. Variables de contexte (`--fg`, `--fg-2`, `--rule`…) qui basculent seules dans une section nuit (`.m42-night`).
- **Pas d'attribut `style` dans le HTML produit** : préparation de la CSP stricte (phase 5).
- **Menu mobile sans JavaScript** (case à cocher + label), comme la maquette.
- **Directus + Postgres en Docker** : volumes nommés pour la base, les fichiers et les extensions. Schéma prévu pour tenir dans la version sans clé (≤ 25 collections, ≤ 5 flows, 3 comptes).

## Licence Directus

Depuis la v12, Directus est gratuit en production avec la clé « Open Innovation Grant » (structure < 5 M$ de CA et < 50 salariés). Sans clé : version de base (3 comptes, 25 collections, 5 flows).
**Où mettre la clé** : variable `LICENSE_KEY` dans `cms/.env` en local, et dans les variables d'environnement du service Directus sur Coolify en production. Redémarrer Directus après l'avoir ajoutée.

## Ports locaux

- Site (Astro) : http://localhost:4321
- Directus : http://localhost:8056 sur ce poste (`DIRECTUS_PORT` dans `cms/.env` ; 8055 par défaut, déjà pris ici par un autre projet).
