# M42.guide

Site de M42.guide (Clara Peron & Paul Loustaunau) : conférences, ateliers et repères pour « se repérer dans l'IA ».

```
site/   Astro (sortie statique)
cms/    Directus + Postgres (Docker) ; docker-compose.prod.yml pour Coolify
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
npm run cms:flows    # formulaires publics et flows (contrôle, e-mails, confirmation de la lettre)
npm run cms:apparence  # logo, couleurs, police, menus « Site » / « Formulaires », colonnes, aperçu
```

E-mails en local : http://localhost:8025 (Mailpit).

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
| `npm run verif` | build, lint, format, règles, axe-core, cibles tactiles, liens internes, SEO |
| `npm run apercu` | site en aperçu instantané (Directus relu à chaque page, brouillons compris) |
| `npm run cms:schema` / `cms:seed` / `cms:roles` / `cms:flows` / `cms:apparence` | schéma, contenu initial, rôles et comptes Directus |
| `node scripts/comparer-dist.mjs <réf> dist` | compare deux builds octet pour octet |
| `npm run test:formulaires` | formulaires de bout en bout (site servi sur :4321, Directus, Mailpit) |
| `node tests/perf/lighthouse.mjs` | Lighthouse mobile sur toutes les pages → `tests/perf/RESULTATS.md` |
| `npm run visuel` | captures maquette / site côte à côte (390, 768, 1440) |
| `node scripts/marqueurs.mjs` | régénère la liste des marqueurs `[À …]` dans `TODO_CONTENU.md` |

## Publier un contenu

1. Se connecter à Directus (Clara : compte Éditeur). Tout est dans le dossier **Site** : Pages, Conférences, Pour qui, Repères, Intervenants, FAQ, Sources, Réglages du site.
2. Ouvrir l'élément : chaque texte de la page a son champ, rangé par section repliable (En-tête, Programme, Formats…). Les listes (blocs du programme, formats, étapes…) se complètent avec **Ajouter**, se réordonnent par glisser-déposer et se suppriment avec la corbeille. Les rares champs « Structure particulière » sont en JSON : n'y modifier que les textes entre guillemets. Les textes notés « HTML » gardent leurs balises (`<em>`, `<a>`).
3. **Aperçu** (icône en forme d'œil, en haut) : la page s'affiche à côté du formulaire et se recharge à chaque enregistrement.
4. Statut : **Publié** pour mettre en ligne, **Brouillon** pour retirer. Une conférence, une page « Pour qui » ou une page satellite en brouillon n'est pas générée ; une question de FAQ ou une source en brouillon est masquée. Si une page retirée est citée ailleurs (liens dans d'autres pages), `/verif` le signale : corriger ces liens aussi.
5. Le site se reconstruit seul 60 s après la dernière modification (flow « Site : publication », en production).

Les pages à adresse fixe (accueil, Conférences, À propos, Organisateurs, Contact, Repères, pages légales) ne peuvent pas passer en brouillon : le build s'arrête avec un message.

**Modifier directement sur la page** (module « Éditeur visuel » de Directus, icône crayon dans la barre de gauche) : la page du site s'affiche ; au survol, chaque texte s'entoure d'un cadre avec un crayon ; un clic ouvre son champ dans une bulle (ou un panneau pour une liste). « Enregistrer » écrit dans Directus et la page se recharge avec le nouveau texte. Fonctionne avec l'aperçu local ci-dessous.

**Aperçu instantané en local** : `npm run apercu` (dans `site/`) lance le site sur http://localhost:4321 en relisant Directus à chaque page, brouillons compris ; l'aperçu de Directus l'affiche à côté du formulaire. Ce mode est refusé pour un build publié.

## Formulaires reçus

Les demandes de contact et les inscriptions arrivent dans Directus (**Demandes de contact**, **Inscriptions et demandes**). Clara et Paul reçoivent un e-mail à chaque demande de contact, de fiche ou de kit. Une inscription à la lettre n'est valable qu'une fois l'adresse confirmée (case « Adresse confirmée »).

## Déployer

Voir [`DEPLOIEMENT.md`](DEPLOIEMENT.md) : Coolify (Directus, site, préproduction), variables, DNS, publication automatique, sauvegardes et restauration, mise à jour de Directus.

Image du site testable en local (contenu lu dans le Directus local) :

```sh
cd site
docker build -t m42-site --build-arg DIRECTUS_URL=http://host.docker.internal:8056 \
  --build-arg DIRECTUS_TOKEN=… --build-arg PUBLIC_DIRECTUS_URL=http://localhost:8056 \
  --build-arg PUBLIC_FLOW_CONFIRMATION=… .
docker run --rm -p 4321:80 -e CMS_ORIGIN=http://localhost:8056 m42-site
```
