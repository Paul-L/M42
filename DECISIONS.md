# Décisions d'intégration

Choix faits quand la maquette ou les consignes laissaient une ambiguïté (option la plus fidèle).

## Phase 1 — Socle

1. **En-tête sans symbole.** La DA (§ 6) prévoit « symbole 32 px + M42 + GUIDE » ; le gabarit et toutes les pages de la maquette affichent seulement « M42 Guide » en texte. La maquette fait foi : pas de symbole dans l'en-tête.
2. **Navigation de l'en-tête** : celle du gabarit (Conférences · Entreprises · Collectivités · Écoles · Repères · Contact), et non celle décrite dans `21_plan_pages.md` (« Entreprises & événements », « À propos »…), qui est plus ancienne.
3. **Page courante dans l'en-tête** : renseignée page par page comme dans la maquette (Événements → Entreprises, Associations → Collectivités ; aucune sur les pages conférences, l'accueil, À propos…), et non calculée à partir de l'URL.
4. **Pas de `box-sizing: border-box` global** : la maquette garde le modèle par défaut (conteneur de 1 240 px de contenu + marges). Les composants qui en ont besoin le déclarent, comme dans le gabarit.
5. **Polices** : Cormorant (Fontsource, 500/600/500 italique) et Inter **variable** (Fontsource) à la place de Google Fonts (règle RGPD).
6. **Bouton sur fond nuit** : le composant `Button` inverse seul ses couleurs dans une section `.m42-night` (primaire papier sur encre, secondaire bordure papier), comme dans le bandeau CTA et les pages de la maquette.
7. **Page `/_kit`** : Astro ignore les fichiers préfixés par « _ » ; la page passe par une route dynamique (`src/pages/[kit].astro`). Elle est en `noindex`, sans canonical, et exclue du plan du site.
8. **Documents qui citent les noms interdits** (`PROMPT_CLAUDE_CODE.md` et 5 fichiers de `kit/docs/`) : **non versionnés** (`.gitignore`) pour que ces noms n'entrent jamais dans l'historique Git. *À confirmer par Paul.*
9. **TypeScript 6.0.3** au lieu de 7.0.2 : les outils Astro et ESLint ne le prennent pas encore en charge.
10. **Port Directus local 8056** sur ce poste (8055 occupé par un autre projet) ; 8055 reste la valeur par défaut de `.env.example`.
11. **Typographie française appliquée au rendu.** La maquette n'a aucune espace insécable. Les textes restent identiques à la maquette dans le code ; un middleware Astro (`site/src/middleware.ts`, `site/src/lib/typo.ts`) insère au rendu U+00A0 avant « : » et U+202F (fine insécable) avant « ; ? ! » et dans « ». Balises, attributs, `<script>`, `<style>`, `<code>` et `<textarea>` ne sont pas touchés.
12. **`/_kit` en deux parties** : la première reproduit la démo de `22_gabarit.html` (comparable à la maquette) ; la seconde (« Variantes », section nuit) montre des états absents du gabarit, avec des textes de démonstration entre crochets.
13. **Nom accessible des logos** : la maquette met `aria-label="M42 Guide, retour à l'accueil"` sur le lien. axe-core le signale (WCAG 2.5.3, le texte visible « M42Guide » n'est pas inclus dans le nom). Le site met le complément « , retour à l'accueil » en texte masqué : même nom accessible, même rendu.
14. **Gouttière des grilles de cartes : 24 px à toutes les largeurs**, comme le gabarit (le token `--gap` de la DA, 16 px sous 640 px, reste réservé à la future grille 12 colonnes).
15. **Bouton « Contact » du menu mobile : 44 px de haut**, comme le rendu réel de la maquette (le CSS du gabarit vise 52 px, mais le style inline à 44 px l'emporte).
16. **Cibles tactiles < 44 px reprises de la maquette** (liens du pied de page, e-mails du bandeau CTA, lien « Politique de confidentialité ») : espacement conforme au critère WCAG 2.5.8 (24 px), mais sous la règle des 44 px du projet. *À traiter en phase 4 (accessibilité).*
