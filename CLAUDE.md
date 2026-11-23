# M42.guide — site web

Site de M42.guide : conférences, ateliers et repères pour « se repérer dans l'IA ».
Porteurs : Clara Peron & Paul Loustaunau (toujours dans cet ordre).

## Où trouver quoi
- `PROMPT_CLAUDE_CODE.md` : la feuille de route complète, en 5 phases. **La relire au début de chaque phase.**
- `kit/maquette/` : la maquette validée (21 pages `.dc.html`, gabarit commun, plan des URL). **Source de vérité visuelle et textuelle.** Lecture seule.
- `kit/docs/` : brief, direction artistique (tokens), architecture SEO, arbitrages, contenus, décisions en attente. Lecture seule.
- `kit/logo/` : logos SVG/PNG validés (ne jamais les redessiner).
- `site/` : Astro (sortie statique). `cms/` : Directus + Postgres (Docker). À créer en phase 1.
- `STACK.md`, `DECISIONS.md`, `TODO_CONTENU.md` : à tenir à jour.

## Règles absolues
- Ne jamais écrire le nom de l'employeur de Paul, ni le nom de ses sociétés, ni celui de la holding de facturation — nulle part : code, contenus, JSON-LD, commits. Un hook bloque ces mots (liste locale dans `.claude/regles-interdites.local.txt`, non versionnée).
- Aucun prix affiché. Aucun témoignage, logo client, chiffre ou référence inventés.
- Garder tous les marqueurs `[À COMPLÉTER]`, `[À VALIDER]`, `[À PRODUIRE]`, `[À DÉCIDER]` et les lister dans `TODO_CONTENU.md`.
- Typographie française : espaces insécables avant `: ; ? !` et dans « ». Vouvoiement. Ton « le sujet et vous d'abord » (voir `kit/docs/30_consigne_ton.md`).
- RGPD : aucune ressource tierce chargée par le navigateur (polices auto-hébergées via Fontsource, pas de Google Fonts, pas d'outil de mesure d'audience).
- `kit/` est en lecture seule.

## Stack
- Astro, `output: 'static'`, TypeScript strict, CSS natif avec les tokens de `kit/docs/10_direction_artistique.md`, îlots en TypeScript vanilla (Preact seulement si nécessaire).
- Directus (Docker) + Postgres. Schéma conçu pour tenir dans la version sans clé : ≤ 25 collections, ≤ 5 flows, 3 comptes.
- Déploiement : VPS OVH + Coolify. Production `m42.guide`, CMS `cms.m42.guide`, préproduction `preprod.m42.guide` (mot de passe + noindex).
- Toujours vérifier les dernières versions stables avant d'installer ; les noter dans `STACK.md`.

## Façon de travailler
- Suivre les phases de `PROMPT_CLAUDE_CODE.md` et **s'arrêter à la fin de chacune** pour me montrer le résultat.
- Fidélité à la maquette : comparer à 390, 768 et 1440 px (agent `controle-visuel`).
- Avant chaque commit : lancer `/verif`. Faire relire les contenus par l'agent `relecteur-regles`.
- Petits commits en français, au présent (« Ajoute le composant Header »).
- **Demander avant** : toute action sur le VPS, Coolify, le DNS, `git push`, une ressource payante, une suppression de fichier.
- En cas d'ambiguïté sur la maquette : choisir l'option la plus fidèle et la noter dans `DECISIONS.md`, sans s'arrêter.
- Réponses courtes et simples : ce qui est fait, ce qui reste, ce qu'il me faut.

## Commandes utiles (à compléter au fil des phases)
- `/phase <n>` : démarre ou reprend la phase n de la feuille de route.
- `/verif` : build, lint, contrôles des règles, accessibilité.
- `/comparer <page>` : capture maquette / site côte à côte aux 3 largeurs.
