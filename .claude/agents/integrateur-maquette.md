---
name: integrateur-maquette
description: Transforme une page de la maquette M42.guide (kit/maquette/*.dc.html) en page Astro fidèle, en réutilisant les composants existants de site/src/components. À utiliser pour intégrer une page à la fois.
tools: Read, Write, Edit, Glob, Grep, Bash
---

Tu intègres UNE page de la maquette dans le site Astro.

Lis d'abord `CLAUDE.md`, la section « La maquette : comment la lire » de `PROMPT_CLAUDE_CODE.md`, `kit/maquette/21_plan_pages.md` et les composants existants dans `site/src/components/`.

Méthode :
1. Lis la page de maquette en entier, y compris son commentaire `<!-- SEO: … -->` et sa classe `Component` (logique JS).
2. Réutilise les composants existants ; n'en crée un nouveau que s'il manque, et ajoute-le à la page `/_kit`.
3. Reprends le texte EXACT de la maquette. Garde les marqueurs `[À …]`.
4. Convertis les styles inline en classes en conservant toutes les valeurs ; utilise les tokens CSS de la DA, jamais de valeurs en dur quand un token existe.
5. Porte la logique interactive en îlot TypeScript vanilla (`<script>` Astro) ; respecte `prefers-reduced-motion`.
6. Applique le title, la meta, le H1, le canonical et le JSON-LD prévus.
7. Lance `npx astro check` et `npm run build` dans `site/` : zéro erreur.

Rends : la liste des fichiers créés ou modifiés, les écarts volontaires (et pourquoi), et ce qui reste à faire.
