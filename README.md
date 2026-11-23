# M42.guide

Site de M42.guide (Clara Peron & Paul Loustaunau) : conférences, ateliers et repères pour « se repérer dans l'IA ».

```
site/   Astro (sortie statique)
cms/    Directus + Postgres (Docker)
kit/    maquette, docs, logos (lecture seule)
```

## Lancer en local

**CMS** (Docker requis) :

```sh
cd cms
cp .env.example .env    # puis remplacer chaque « a-remplacer »
docker compose up -d    # http://localhost:8055 (ou DIRECTUS_PORT)
```

Le compte administrateur est créé au premier démarrage avec `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

Première installation du contenu (depuis `site/`, après `npm install`) :

```sh
npm run cms:schema   # collections, champs, relations ; met à jour cms/schema/snapshot.json
npm run cms:seed     # contenu de la maquette (src/data) → Directus
npm run cms:roles    # rôles Éditeur et Site (build), comptes Clara et build, jeton dans site/.env
```

**Site** (Node ≥ 22.23.4, 26 LTS conseillé) :

```sh
cd site
npm install
npm run dev             # http://localhost:4321
```

Le build lit Directus (`site/.env` : `DIRECTUS_URL`, `DIRECTUS_TOKEN`). Sans Directus : `M42_CONTENU=local npm run build` (contenu de `src/data`).

Page de démonstration des composants : http://localhost:4321/_kit/ (non indexée).

## Commandes du site

| Commande | Rôle |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` | vérification TypeScript puis build dans `dist/` |
| `npm run preview` | sert `dist/` |
| `npm run lint` / `npm run format:check` | ESLint / Prettier |
| `npm run verif` | build, lint, format, règles, axe-core, liens internes |
| `npm run cms:schema` / `cms:seed` / `cms:roles` | schéma, contenu initial, rôles et comptes Directus |
| `node scripts/comparer-dist.mjs <réf> dist` | compare deux builds octet pour octet |
| `npm run visuel` | captures maquette / site côte à côte (390, 768, 1440) |
| `node scripts/marqueurs.mjs` | régénère la liste des marqueurs `[À …]` dans `TODO_CONTENU.md` |

## Publier un contenu

1. Se connecter à Directus (Clara : compte Éditeur).
2. Modifier un texte : **Conférences**, **Pour qui**, **Pages**, **Intervenants**, **Repères**, **FAQ**, **Sources** ou **Réglages du site**. Dans les champs JSON (sections, contenu des pages), ne modifier que les textes entre guillemets, sans toucher aux clés.
3. Statut : **Publié** pour mettre en ligne, **Brouillon** pour retirer. Une conférence, une page « Pour qui » ou une page satellite en brouillon n'est pas générée ; une question de FAQ ou une source en brouillon est masquée. Si une page retirée est citée ailleurs (liens dans d'autres pages), `/verif` le signale : corriger ces liens aussi.
4. Relancer le build du site (local : `npm run build` ; production : phase 5, déclenchement depuis Coolify).

Les pages à adresse fixe (accueil, Conférences, À propos, Organisateurs, Contact, Repères, pages légales) ne peuvent pas passer en brouillon : le build s'arrête avec un message.

## Déployer

À écrire en phase 5 (Coolify).
