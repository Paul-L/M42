# Déploiement de M42.guide (VPS OVH + Coolify)

Tout est prêt dans le dépôt ; rien n'a encore été fait sur le serveur. Ordre conseillé : DNS, Directus, contenu, site, préproduction, publication automatique, contrôles.

| Service | Adresse | Source dans le dépôt |
|---|---|---|
| Site (production) | https://m42.guide (www redirigé) | `site/Dockerfile`, `site/deploy/Caddyfile.production` |
| Site (préproduction) | https://preprod.m42.guide (mot de passe, `noindex`) | `site/Dockerfile` avec `M42_ENV=preprod`, `site/deploy/Caddyfile.preprod` |
| Directus + Postgres + sauvegarde | https://cms.m42.guide | `cms/docker-compose.prod.yml` |

## 1. Enregistrements DNS

Remplacer `<IPv4 du VPS>` (et `<IPv6 du VPS>` si le VPS en a une).

| Nom | Type | Valeur | Rôle |
|---|---|---|---|
| `m42.guide` | A | `<IPv4 du VPS>` | site |
| `m42.guide` | AAAA | `<IPv6 du VPS>` | site (si IPv6) |
| `www.m42.guide` | CNAME | `m42.guide.` | redirigé vers m42.guide |
| `cms.m42.guide` | A | `<IPv4 du VPS>` | Directus |
| `cms.m42.guide` | AAAA | `<IPv6 du VPS>` | Directus (si IPv6) |
| `preprod.m42.guide` | A | `<IPv4 du VPS>` | préproduction |
| `preprod.m42.guide` | AAAA | `<IPv6 du VPS>` | préproduction (si IPv6) |
| `m42.guide` | CAA | `0 issue "letsencrypt.org"` | certificats (Coolify utilise Let's Encrypt) |

E-mails envoyés par Directus (`bonjour@m42.guide` par défaut), selon le fournisseur SMTP choisi (`TODO_CONTENU.md`, décision 13) :

| Nom | Type | Valeur |
|---|---|---|
| `m42.guide` | TXT | `v=spf1 include:<domaine SPF du fournisseur> ~all` (à fusionner avec un SPF existant : un seul enregistrement SPF) |
| `<sélecteur>._domainkey.m42.guide` | TXT ou CNAME | clé DKIM donnée par le fournisseur |
| `_dmarc.m42.guide` | TXT | `v=DMARC1; p=quarantine; rua=mailto:paul@m42.guide` |

Si les boîtes clara@ et paul@ existent déjà, ne pas toucher à leurs enregistrements MX.

## 2. Directus (service « Docker Compose » dans Coolify)

1. Nouvelle ressource → Docker Compose → dépôt GitHub `Paul-L/M42`, branche `main`, fichier `/cms/docker-compose.prod.yml`.
2. Domaine du service `directus` : `https://cms.m42.guide`, port 8055.
3. Variables (Coolify → Environment Variables) :

| Variable | Valeur |
|---|---|
| `DB_DATABASE`, `DB_USER` | `directus` |
| `DB_PASSWORD`, `SECRET` | chaînes aléatoires longues (`openssl rand -hex 32`) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | compte de Paul (créé au premier démarrage) |
| `LICENSE_KEY` | clé « Open Innovation Grant » (facultative) |
| `EMAIL_FROM` | `bonjour@m42.guide` (à valider) |
| `EMAIL_SMTP_HOST`, `EMAIL_SMTP_PORT`, `EMAIL_SMTP_USER`, `EMAIL_SMTP_PASSWORD`, `EMAIL_SMTP_SECURE` | fournis par l'hébergeur de messagerie |
| `COOLIFY_DEPLOY_URL`, `COOLIFY_TOKEN` | à remplir à l'étape 5 |

4. Déployer. Vérifier https://cms.m42.guide/server/ping (`pong`).

## 3. Contenu, rôles et flows (depuis un poste, une seule fois)

Depuis `site/` sur un poste de développement :

```sh
export CMS_URL=https://cms.m42.guide ADMIN_EMAIL=… ADMIN_PASSWORD=…
npm run cms:schema && npm run cms:seed && npm run cms:roles && npm run cms:flows
SITE_APERCU=https://preprod.m42.guide npm run cms:apparence   # logo, couleurs, menus, aperçu
```

Les variables du build du site (jeton du compte « build », URL publique, identifiant du webhook de confirmation) sont écrites dans `cms/.env.cms.m42.guide` (non versionné) : les recopier à l'étape 4, puis supprimer ce fichier.

Activer ensuite le compte de Clara dans Directus (Paramètres → Utilisateurs → Clara Peron : statut « Actif », mot de passe ou invitation).

## 4. Site (application « Dockerfile » dans Coolify)

1. Nouvelle ressource → Application → dépôt `Paul-L/M42`, branche `main`, build pack **Dockerfile**, Base Directory `/site`.
2. Domaines : `https://m42.guide,https://www.m42.guide` ; port exposé 80. Healthcheck : `/`.
3. Variables, toutes cochées **Build Variable** sauf `CMS_ORIGIN` :

| Variable | Valeur |
|---|---|
| `M42_ENV` | `production` |
| `DIRECTUS_URL` | `https://cms.m42.guide` |
| `DIRECTUS_TOKEN` | jeton du compte « build » (étape 3) |
| `PUBLIC_DIRECTUS_URL` | `https://cms.m42.guide` |
| `PUBLIC_FLOW_CONFIRMATION` | identifiant du flow « Lettre : confirmation » (étape 3) |
| `CMS_ORIGIN` (exécution) | `https://cms.m42.guide` |

4. Déployer. Le build s'arrête si Directus ne répond pas : jamais de site construit avec un contenu périmé.

## 5. Publication sans développeur

1. Coolify → Keys & Tokens → API tokens : créer un jeton avec la permission « deploy » uniquement.
2. Dans les variables de Directus : `COOLIFY_DEPLOY_URL` = `https://coolify.m42.guide/api/v1/deploy?uuid=<uuid de l'application du site>&force=true`
   (`force=true` : build sans cache, sinon Docker réutilise l'étape `astro build` et le contenu ne change pas),
   `COOLIFY_TOKEN` = le jeton. Redémarrer Directus.
3. Ajouter le champ et le flow en production (depuis `site/`, avec `CMS_URL=https://cms.m42.guide`) :
   `npm run cms:schema && npm run cms:flows`.

Ensuite, toute modification de contenu (création, modification, suppression, passage en publié ou en brouillon) déclenche le flow « Site : publication » : il attend 60 secondes sans nouvelle modification (anti-rebond), puis lance un seul build du site. Le site est à jour 2 à 3 minutes après la dernière modification.

## 6. Préproduction

Même procédure que l'étape 4, avec :

- domaine `https://preprod.m42.guide` ;
- `M42_ENV` = `preprod` (build) : robots.txt bloque tout, chaque page est en `noindex`, Caddy ajoute `X-Robots-Tag: noindex` ;
- `PREPROD_USER` (exécution) : identifiant ; `PREPROD_HASH` (exécution, cocher « Is Literal ») : empreinte du mot de passe, à produire avec
  `docker run --rm caddy:2.11.9-alpine caddy hash-password --plaintext '<mot de passe>'` ;
- `FRAME_ANCESTORS` (exécution) = `https://cms.m42.guide` : Directus peut afficher la préproduction à côté du formulaire (aperçu). Le site de production reste interdit d'affichage dans un cadre.

L'aperçu de Directus montre la préproduction, qui est à jour après chaque déploiement. Pour un aperçu instantané (brouillons compris), utiliser `npm run apercu` en local (voir README).

## 7. Sauvegardes

- Le service `sauvegarde` fait chaque nuit à 3 h (`HEURE_SAUVEGARDE`) un export de la base (`base_<date>.dump`) et une archive des fichiers envoyés (`fichiers_<date>.tar.gz`), gardés 14 jours (`RETENTION_JOURS`) dans le volume `sauvegardes`.
- **À décider** : une copie hors du VPS (stockage objet OVH, autre serveur) ; une ressource payante, donc à valider avant de la mettre en place.

**Restaurer la base** (Coolify → terminal du service `sauvegarde`, après avoir arrêté `directus`) :

```sh
ls /sauvegardes
pg_restore --clean --if-exists -d "$PGDATABASE" /sauvegardes/base_<date>.dump
```

**Restaurer les fichiers** (sur le VPS ; le nom des volumes commence par l'identifiant Coolify du service, voir `docker volume ls`) :

```sh
docker run --rm -v <id>_directus_uploads:/uploads -v <id>_sauvegardes:/sauvegardes alpine \
  sh -c 'cd /uploads && tar -xzf /sauvegardes/fichiers_<date>.tar.gz'
```

Puis redémarrer `directus`.

## 8. Mettre à jour Directus

1. Lire les notes de version (https://github.com/directus/directus/releases), surtout les changements majeurs.
2. En local : changer l'étiquette de l'image dans `cms/docker-compose.yml` et `cms/docker-compose.prod.yml`, `docker compose up -d`, puis depuis `site/` : `npm run verif` et `npm run test:formulaires`.
3. Commit, push, puis dans Coolify : lancer une sauvegarde à la main (ou attendre celle de la nuit), redéployer le service. Directus applique ses migrations au démarrage.
4. En cas de problème : remettre l'ancienne étiquette et restaurer la sauvegarde de la base (§ 7).

## 9. Contrôles après la mise en ligne

- `curl -I https://m42.guide/` : en-têtes `Content-Security-Policy`, `Strict-Transport-Security`, `Referrer-Policy`, `Permissions-Policy` présents.
- `https://m42.guide/robots.txt` autorise les moteurs ; `https://preprod.m42.guide/robots.txt` bloque tout (après le mot de passe).
- Envoyer une vraie demande de contact et s'inscrire à la lettre (avec le lien de confirmation).
- Search Console (propriété de domaine) et Bing Webmaster Tools : déclarer `https://m42.guide/sitemap-index.xml`.
- Liste complète : `kit/docs/11_architecture_seo.md`, § 3.9.
