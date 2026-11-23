# Intégrer une page de la maquette

Conventions communes à toutes les pages (phase 2). À lire avant d'intégrer une page.

## Où mettre quoi

- Page : `src/pages/<url>/index.astro` (URL dans `src/data/routes.ts`, issue du commentaire `<!-- SEO: … -->` de la maquette). L'accueil : `src/pages/index.astro`.
- Liens `href="Xxx.dc.html"` → URL de `src/data/routes.ts` (ancres `#…` conservées).
- Composants partagés (`src/components/*.astro`) : **ne pas les modifier** pendant une intégration en parallèle. S'il manque une option, écrire un composant propre à la page et le signaler dans le rapport (je consolide ensuite).
- Composants propres à une page ou à une famille de pages : `src/components/<famille>/` (ex. `conferences/`, `publics/`, `legal/`, `contact/`). Nom en PascalCase.
- Îlots (logique interactive) : `<script>` Astro en TypeScript vanilla dans le composant concerné. Preact seulement si l'état devient vraiment complexe.
- Données de contenu longues (listes, FAQ, programmes) : en tête du fichier de page ou dans `src/data/<page>.ts`, pour faciliter la bascule vers Directus en phase 3.
- Ne pas toucher à `src/pages/[kit].astro`, `src/styles/`, `src/layouts/`, `src/middleware.ts`, `scripts/` : je m'en occupe.

## Gabarit de page

```astro
<BaseLayout title="…" description="…" current="entreprises" jsonLd={{ … }}>
```

- `title` et `description` : ceux du commentaire SEO (pas la balise `<title>` de la maquette).
- `current` : uniquement si la maquette met `aria-current="page"` sur un lien d'en-tête (voir `DECISIONS.md`, point 3).
- `section` : rubrique parente marquée `aria-current="true"` (les 4 conférences → `conferences`, Événements → `entreprises`, Associations → `collectivites`).
- `footerCurrent` : si la maquette met `aria-current="page"` sur le lien de la page dans le pied de page (À propos, Organisateurs, Contact, pages légales).
- `jsonLd` : celui du commentaire SEO ou de `kit/docs/11_architecture_seo.md`. Jamais de nom d'employeur ni de structure de facturation.

## Composants utiles

- `Eyebrow` : `rule={false}` et `as="span"` pour le sur-titre placé dans un H1 (sans filet).
- `legal/LegalProse` : mise en page des textes longs à sommaire collant (pages légales).

## Styles

- Styles scopés dans le composant ou la page. Utiliser les tokens (`var(--ink)`, `var(--fs-h2)`, `var(--s-5)`…) dès qu'une valeur existe ; garder les valeurs exactes de la maquette sinon.
- **Aucun attribut `style`** dans le HTML produit (CSP stricte en phase 5) : tout passe par des classes. Les valeurs dynamiques passent par des classes ou des attributs `data-*` (ou `element.style` en JS dans un îlot, toléré).
- Pas de `box-sizing` global : reprendre ceux de la maquette.
- Sections nuit : classe `m42-night` (ou `<Section tone="night">`) ; les variables `--fg`, `--fg-2`, `--fg-3`, `--rule` basculent seules.
- Apparition au défilement : classe globale `m42-reveal`, jamais au-dessus de la ligne de flottaison.
- `prefers-reduced-motion` : respecter la version « à plat » prévue par la maquette.

## Textes

- Texte **exact** de la maquette. Espaces normales : le middleware ajoute les insécables au rendu (`DECISIONS.md`, point 11).
- Garder tous les marqueurs `[À …]` tels quels.
- Les valeurs `{{…}}` calculées par `renderVals()` : reprendre la valeur affichée par défaut (état initial), et porter la logique dans l'îlot.

## Vérifications avant de rendre la main

- `npx astro check` : zéro erreur.
- Build dans un dossier à part pour ne pas gêner les autres intégrations : `npx astro build --outDir <dossier temporaire>`.
- Pas de `npm install` sans le signaler.

## Phase 3 : sortir le texte des pages (préparation Directus)

But : tout le texte d'une page vit dans son module de données, prêt à être chargé dans Directus. La page `.astro` ne garde que la structure.

- Un module par page : le module existant (`src/data/<page>.ts`, `src/data/<famille>/<page>.ts`) ou un nouveau au même endroit.
- Va dans le module : SEO (`seo: { title, description }`), fil d'Ariane, sur-titres, titres, paragraphes, listes, libellés et liens des boutons, textes des emplacements photo, `alt` et `aria-label` porteurs de contenu, valeurs du JSON-LD qui viennent du texte.
- Reste dans le code : la structure, les classes, le micro-texte d'interface des composants partagés (en-tête, pied de page, libellés de formulaire, messages d'erreur, « Copier »), la construction du JSON-LD (qui lit ses valeurs dans le module).
- Exports de contenu = **données sérialisables en JSON** : chaînes, nombres, booléens, tableaux, objets simples. Pas de fonction, pas d'import d'image ou de composant, pas de valeur calculée depuis un autre module (garder ces calculs dans la page ou dans une fonction à part, hors des exports de contenu). `routes['X.dc.html']` est permis (c'est une chaîne).
- Texte en ligne avec balises (`<em>`, `<a>`, `<strong>`) : reprendre la façon de faire déjà en place dans la famille (chaîne HTML rendue avec `set:html`, ou segments). Le HTML produit doit rester **identique**.
- Contrôle obligatoire : `npm run build` puis `node scripts/comparer-dist.mjs <build de référence> dist` doit répondre « aucun écart ». Plus `npx eslint` et `npx prettier --check` sur les fichiers touchés.
