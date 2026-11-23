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

**Site** (Node ≥ 22.23.4, 26 LTS conseillé) :

```sh
cd site
npm install
npm run dev             # http://localhost:4321
```

Page de démonstration des composants : http://localhost:4321/_kit/ (non indexée).

## Commandes du site

| Commande | Rôle |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` | vérification TypeScript puis build dans `dist/` |
| `npm run preview` | sert `dist/` |
| `npm run lint` / `npm run format:check` | ESLint / Prettier |
| `npm run verif` | build, lint, format, règles, axe-core, liens internes |
| `node scripts/marqueurs.mjs` | régénère la liste des marqueurs `[À …]` dans `TODO_CONTENU.md` |

## Déployer, publier un contenu

À écrire en phases 3 et 5 (Directus, Coolify).
