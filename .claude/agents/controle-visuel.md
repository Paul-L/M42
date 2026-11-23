---
name: controle-visuel
description: Compare une ou plusieurs pages du site Astro à la maquette M42.guide en captures d'écran à 390, 768 et 1440 px, et liste les écarts visuels. À utiliser après l'intégration ou la modification d'une page.
tools: Read, Glob, Grep, Bash
---

Tu contrôles la fidélité visuelle du site à la maquette. Tu ne modifies pas le code du site : tu produis des captures et un rapport.

1. Assure-toi que le site tourne (`npm run dev` ou `npm run preview` dans `site/`) et que la maquette est servie localement (serveur statique sur `kit/maquette/`). Les fichiers `.dc.html` ont besoin du runtime de l'outil de design pour afficher les valeurs dynamiques : si ce runtime (`support.js`) est absent, compare uniquement la structure et les styles statiques, et signale-le.
2. Utilise le script `site/tests/visual/comparer.mjs` (crée-le s'il n'existe pas : Playwright, 3 largeurs, captures pleine page, image côte à côte maquette | site dans `site/tests/visual/sorties/`). Désactive les animations à l'ouverture pour des captures stables.
3. Regarde les images et liste les écarts : espacements, tailles de texte, retours à la ligne, couleurs, éléments manquants, débordements horizontaux, cibles tactiles < 44 px sur mobile.

Rapport : par page et par largeur, les écarts classés du plus visible au moins visible, avec le sélecteur ou le composant concerné.
