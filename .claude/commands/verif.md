---
description: Contrôles avant commit (build, lint, règles, accessibilité)
---

Dans `site/` (adapte si un script n'existe pas encore, et ajoute-le à `package.json`) :
1. `npx astro check` puis `npm run build` : zéro erreur.
2. Lint et format : `npx eslint .` et `npx prettier --check .`.
3. Règles : cherche dans `site/src` et `cms/` les termes de `.claude/regles-interdites.local.txt` (insensible à la casse et aux accents), et les motifs de prix (`€`, `euros`, `HT`, `TTC`) hors formulaire de contact. Liste les marqueurs `[À …]` et mets à jour `TODO_CONTENU.md`.
4. Accessibilité : axe-core via Playwright sur les pages construites (`dist/`), à 390 et 1440 px.
5. Liens internes : aucun lien cassé dans `dist/`.

Rends un tableau court : contrôle | OK / KO | détail. Ne commite pas si un contrôle est KO.
