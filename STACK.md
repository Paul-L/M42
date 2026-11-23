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
| @directus/sdk | 27.2.0 | 27.2.0 | Lecture de Directus au build (jeton statique en lecture seule). |
| tsx | 4.23.15 | 4.23.15 | Lance les scripts TypeScript de `cms/scripts/` (schéma, rôles, seed). |
| Lighthouse | 13.6.0 (dev) | 13.6.0 | Mesure mobile des 21 pages (`tests/perf/lighthouse.mjs`). |
| Mailpit | 1.34.0 (`axllent/mailpit:v1.34.0`, local) | 1.34.0 | Boîte de test des e-mails de Directus en local. |
| Node (image de build) | `node:26.13.1-alpine` | 26.13.1 | Build du site dans Coolify (Node 26 LTS). |
| Caddy | `caddy:2.11.9-alpine` | 2.11.9 | Sert le site statique : compression, cache, en-têtes de sécurité, 404, redirection www, mot de passe de la préproduction. |
| PostgreSQL | 18.7 (`postgres:18.7-alpine`) | 19.0 | La 19.0 vient de sortir : on attend une version corrective et la confirmation de compatibilité Directus. |

## Choix techniques

- **Astro en statique** (`output: 'static'`, `trailingSlash: 'always'`, URL en dossiers) : pages rapides, aucun serveur applicatif à maintenir. Les contenus Directus sont lus au moment du build (phase 3).
- **CSS natif** : tokens de la DA dans `site/src/styles/tokens.css`, feuille globale `global.css` (base, focus, apparition au défilement, mouvement réduit), styles scopés par composant. Variables de contexte (`--fg`, `--fg-2`, `--rule`…) qui basculent seules dans une section nuit (`.m42-night`).
- **Pas d'attribut `style` dans le HTML produit** : préparation de la CSP stricte (phase 5).
- **Menu mobile sans JavaScript** (case à cocher + label), comme la maquette.
- **Directus + Postgres en Docker** : volumes nommés pour la base, les fichiers et les extensions. Schéma prévu pour tenir dans la version sans clé (≤ 25 collections, ≤ 5 flows, 3 comptes).

## Contenu : Directus au build (phase 3)

- **Schéma en code** : `cms/scripts/schema.ts` crée ou complète les collections (idempotent) et exporte le snapshot versionné `cms/schema/snapshot.json`. 10 collections sur 25 : `settings` (singleton), `intervenants`, `conferences`, `publics`, `ressources`, `pages`, `faq`, `sources`, `demandes_contact`, `inscriptions_lettre`. Aucun flow.
- **Modèle** (`site/src/lib/cms/modele.ts`, `forme.ts`, `plat.ts`) : chaque page ou élément est un objet de contenu sérialisable en JSON, mis « à plat » dans Directus : un champ par texte (chemin `a__b__c`), une section repliable par objet de premier niveau, une liste répétable par liste (listes imbriquées comprises), JSON seulement pour les rares structures irrégulières (5 champs). Les pages partagent la collection `pages` : champs préfixés par page, affichés seulement pour elle (conditions). Forme déduite du contenu initial ; conversion réversible (build Directus identique au build local). Les FAQ et les sources sont des collections reliées.
- **Seed** (`cms/scripts/seed.ts`) : remplit Directus depuis `site/src/data` (contenu de la maquette) ; ne touche pas aux éléments déjà présents, sauf `--remplacer`.
- **Rôles** (`cms/scripts/roles.ts`) : Administrateur (Paul), Éditeur (Clara), Site (build, lecture seule, jeton statique écrit dans `site/.env`). 3 comptes.
- **Lecture au build** (`site/src/lib/cms/contenu.ts`) : `M42_CONTENU=cms` (Directus, défaut si `DIRECTUS_URL` est défini) ou `local` (`src/data`). Seuls les contenus publiés sont lus ; `getStaticPaths` génère les conférences, les pages « Pour qui » et les satellites publiés.
- **Contrôle d'équivalence** : `node scripts/comparer-dist.mjs <build A> <build B>` compare deux builds octet pour octet. Le build depuis Directus est identique au build depuis `src/data`.

## Formulaires et e-mails (phase 4)

- Envoi depuis le navigateur vers Directus (`/items/demandes_contact`, `/items/inscriptions_lettre`), rôle public limité à la création.
- 3 flows sur 5 (`cms/scripts/flows.ts`) : contrôle bloquant (piège, délai, validation, nettoyage), e-mails (notification à Clara et Paul, confirmation de la lettre), webhook de confirmation (double opt-in).
- Limite de débit Directus (`RATE_LIMITER_*`), e-mails par SMTP (`EMAIL_*`, Mailpit en local).
- Variables publiques du site : `PUBLIC_DIRECTUS_URL`, `PUBLIC_FLOW_CONFIRMATION` (écrites dans `site/.env` par `npm run cms:flows`).

## Déploiement (phase 5)

- **Site** : image Docker en deux étapes (build Astro depuis Directus, puis Caddy). Le build impose `M42_CONTENU=cms`.
- **En-têtes** (`site/deploy/securite.caddy`) : CSP stricte sans `unsafe-inline` (aucun script ni style en ligne : `inlineStylesheets: 'never'`, aucun attribut `style`), HSTS, Referrer-Policy, Permissions-Policy, X-Content-Type-Options, X-Frame-Options, COOP ; cache d'un an pour `/_astro/*`, revalidation pour les pages ; compression zstd/gzip.
- **Préproduction** : même image avec `M42_ENV=preprod` (robots.txt bloquant, `noindex` partout), mot de passe et `X-Robots-Tag` posés par Caddy.
- **Directus en production** : `cms/docker-compose.prod.yml` (sans Mailpit, SMTP réel, CORS limité au site et à la préproduction) et service de sauvegarde quotidienne (pg_dump + fichiers, 14 jours).
- **Publication automatique** : flow « Site : publication » (anti-rebond de 60 s) → webhook de déploiement Coolify.
- Détails pas à pas : `DEPLOIEMENT.md`.

## Interface Directus (`cms/scripts/apparence.ts`)

- Identité M42 : logo, encre / papier / or, titres en Cormorant (police servie par Directus), page de connexion, favicon, interface en français.
- Dossiers « Site » et « Formulaires », colonnes utiles dans chaque liste, menus déroulants pour les valeurs connues.
- Aperçu à côté du formulaire (Live Preview) : `npm run apercu` en local (instantané, brouillons compris), préproduction en ligne (`CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC` côté Directus, `FRAME_ANCESTORS` côté préproduction).

## Licence Directus

Depuis la v12, Directus est gratuit en production avec la clé « Open Innovation Grant » (structure < 5 M$ de CA et < 50 salariés). Sans clé : version de base (3 comptes, 25 collections, 5 flows), et pas de règle personnalisée dans les permissions (filtre, champs restreints) : le compte du build lit toutes les lignes, le filtre « publiés » est fait par les requêtes du site.
**Où mettre la clé** : variable `LICENSE_KEY` dans `cms/.env` en local, et dans les variables d'environnement du service Directus sur Coolify en production. Redémarrer Directus après l'avoir ajoutée.

## Ports locaux

- Site (Astro) : http://localhost:4321
- Directus : http://localhost:8056 sur ce poste (`DIRECTUS_PORT` dans `cms/.env` ; 8055 par défaut, déjà pris ici par un autre projet).
