# M42.guide : direction artistique v2

> Base : brief commun, arbitrages, maquette `Main.dc.html`. Le logo, ses quatre couleurs et la baseline ne changent pas. Tout le reste est proposé ici.

## 1. Ce que dit la recherche (2025-2026)

À retenir, parce que ça sert la crédibilité :
- **Un système visuel qui n'appartient qu'à vous.** Les marques sortent du « joli gabarit » pour des effets et motifs propres [1][2]. Pour M42, ce motif existe déjà : la carte du ciel (graduations, repères, anneau pointillé).
- **Peu de texte, beaucoup de place.** « La brièveté montre qu'on a pris le temps d'éditer » [1]. Un résumé en tête de page, puis le détail [1][2].
- **Serif raffiné + sans-serif net + palette neutre** : la combinaison type des marques premium, à condition que le parcours reste simple [3].
- **Ce qu'un organisateur cherche** : une vidéo visible tout de suite, une photo sur scène, une page par conférence, un document à télécharger, un contact facile, des témoignages nommés [4][5].
- **Accessibilité et vitesse comptent comme critères de qualité**, y compris dans les achats publics. « Un beau site lent reste un mauvais site » [2].
- **Mouvement sobre et natif** (transitions CSS, animations liées au défilement), jamais au détriment de la lecture [2].

À écarter, parce que ça vieillit vite : couleurs néon, néomorphisme, rétrofuturisme, néobrutalisme, 3D immersive, navigation expérimentale [6]. Et pour un sujet IA : cerveaux bleus, robots, dégradés violets.

## 2. Concept

**Une phrase** : un atlas du ciel tenu à la main : la précision d'une carte, la chaleur de deux voix.

**Trois mots-clés** : **Repère** (structure, filets, graduations) · **Clarté** (contraste fort, peu d'éléments) · **Présence** (deux visages, la scène, le vrai).

Répartition des surfaces : environ 60 % papier, 35 % encre (sections « nuit »), 5 % or au maximum.

## 3. Palette (tokens)

Ratios calculés selon la formule WCAG 2.x. Seuils AA : 4,5:1 texte courant, 3:1 grand texte (≥ 24 px, ou ≥ 18,5 px en gras) et éléments d'interface [7][8].

### Clair (par défaut)

| Token | Valeur | Usage | Contraste |
|---|---|---|---|
| `--paper` | #F2EEE6 | fond de page | — |
| `--paper-raised` | #F8F6F1 | cartes, champs | — |
| `--paper-sunk` | #E8E2D7 | section alternée, tags | — |
| `--ink` | #0E0F12 | texte, titres, boutons | 16,56 sur paper · 14,87 sur sunk |
| `--ink-2` | #3A3731 | texte courant secondaire | 10,25 · 9,20 sur sunk |
| `--ink-3` | #5F5A50 | légendes, sur-titres, sources | 5,92 · 5,32 sur sunk · 6,34 sur raised |
| `--line` | #D7D0C3 | filets décoratifs | 1,32 (décoratif uniquement) |
| `--line-strong` | #857E71 | bordures de champs, contrôles | 3,48 · 3,12 sur sunk |
| `--gold` | #B08D57 | étoile, barres, filets d'accent | 2,67 : **jamais pour du texte** |
| `--gold-deep` | #7A5C30 | texte en or (chiffres romains, guillemets) | 5,34 · 5,72 sur raised |
| `--error` | #9B3328 | erreurs de formulaire | 6,26 |
| `--success` | #2E6A4E | confirmation | 5,91 sur raised |
| `--focus` | #0E0F12 | anneau de focus 2 px | 16,56 |

### Sombre (sections « nuit » et mode sombre éventuel)

| Token | Valeur | Usage | Contraste |
|---|---|---|---|
| `--night` | #0E0F12 | fond | — |
| `--night-raised` | #17181C | cartes sur fond nuit | — |
| `--night-line` | #2E2F35 | filets décoratifs | 1,44 (décoratif) |
| `--night-line-strong` | #75767E | bordures de champs | 3,93 sur raised |
| `--on-night` | #F2EEE6 | texte | 16,56 · 15,33 sur raised |
| `--on-night-2` | #CFC8BB | texte secondaire | 11,53 · 10,67 |
| `--on-night-3` | #9A9488 | légendes, sources | 6,36 · 5,88 |
| `--gold-night` | #B08D57 | accent, texte en or permis | 6,20 · 5,74 |
| `--gold-light` | #C9A46A | focus et survol sur fond nuit | 8,22 |
| `--error-night` / `--success-night` | #E58A7E / #7FC3A0 | états | 7,55 / 9,32 |

États : bouton survolé = fond `--gold`, texte `--ink` (6,20). Désactivé = opacité 0,45 et `cursor: not-allowed` (exempté de contraste, mais à éviter : préférer un message).

**Écarts corrigés par rapport à la maquette** : `#6F6A60` tombe à 4,17 sur la section alternée (échec) ; `#8A6A3C` (chiffres romains, 22 px) fait 4,31 (échec) ; la pierre `#8A8478` fait 3,21 sur papier (échec en texte, réservée au fond nuit où elle fait 5,16).

Mode sombre automatique (`prefers-color-scheme`) : **lot 2**, pas prioritaire. Le papier est la signature ; les sections nuit suffisent à donner du relief.

## 4. Typographie

**Familles (Google Fonts)** :
- **Cormorant** 500, 600, 500 italique : titres d'affichage, chiffres, citations. Règle stricte : **jamais en dessous de 28 px**. C'est une famille d'affichage [9] : fins déliés et petit œil, elle s'effondre aux petites tailles.
- **Inter** 400, 500, 600 (variable) : tout le reste, y compris les titres H3 des pages de contenu, la navigation et les formulaires.

Pas de troisième famille.

| Rôle | Famille, graisse | Taille (clamp, 375 → 1 440 px) | Interligne | Approche |
|---|---|---|---|---|
| Display H1 | Cormorant 600 | `clamp(3rem, 1.6rem + 6vw, 6.5rem)` | 0,95 | −0,02em |
| H2 | Cormorant 600 | `clamp(2.25rem, 1.5rem + 3.2vw, 4rem)` | 1,02 | −0,01em |
| Titre de carte | Cormorant 600 | `clamp(1.75rem, 1.5rem + 1vw, 2rem)` | 1,05 | 0 |
| H3 (contenu) | Inter 600 | `clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)` | 1,25 | −0,01em |
| Chiffre | Cormorant 600, `lining-nums tabular-nums` | `clamp(3rem, 2rem + 4vw, 5rem)` | 1 | −0,01em |
| Citation | Cormorant 500 italique | `clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem)` | 1,2 | 0 |
| Chapô | Inter 400 | `clamp(1.125rem, 1.05rem + 0.4vw, 1.3125rem)` | 1,55 | 0 |
| Texte | Inter 400 | `clamp(1rem, 0.97rem + 0.15vw, 1.0625rem)` | 1,65 | 0 |
| Petit | Inter 400 | 0,875rem | 1,5 | 0 |
| Sur-titre | Inter 500, capitales | 0,75rem | 1,4 | 0,18em (la maquette met 0,33em : trop) |

Longueur de ligne : texte 60 à 70 caractères (`max-width: 68ch`), chapô 52ch, H1 et H2 en 14 à 18ch. Texte aligné à gauche, jamais justifié. Coupures : `hyphens: auto` sur le texte courant uniquement (`lang="fr"`). Espaces insécables gérés dans le CMS, pas à la main.

## 5. Grille, marges, rythme

- Conteneur : `max-width: 1240px` ; marges latérales `clamp(1rem, 4vw, 3rem)`.
- Grille de 12 colonnes, gouttière 24 px (16 px sous 640 px). Points de rupture : 640, 960, 1 240 px.
- Espacements (base 4) : `--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 · `--s-8` 64 · `--s-9` 96 · `--s-10` 128 px.
- Section : `padding-block: clamp(4rem, 9vw, 8rem)`. Entre titre de section et contenu : `--s-7`. Dans une carte : `--s-4`.
- Chaque section ouvre sur un **filet de 1 px `--ink`** pleine largeur du conteneur, avec le sur-titre dessous : c'est la « graduation » de l'atlas.
- Coins droits partout (rayon 0). Ombres interdites, sauf le menu mobile.

## 6. Composants

**En-tête.** Hauteur 72 px (60 px en mobile), collant, fond `--paper` à 92 % avec flou léger, filet `--line` en bas qui n'apparaît qu'après défilement. Logo complet (symbole 32 px + M42 + GUIDE). Navigation Inter 15 px 500 : Conférences · Pour qui (3 portes) · Qui sommes-nous · Organisateurs, puis bouton primaire compact « Parler de votre événement ». Page active : soulignement or 2 px + `aria-current="page"`. Mobile : bouton « Menu » (texte, pas seulement une icône), panneau plein écran `--night`, liens en Cormorant 36 px, bouton contact en bas. Lien d'évitement « Aller au contenu » en premier.

**Boutons.** Hauteur minimale 48 px, padding 14 × 24 px, Inter 16 px 500, rayon 0.
- Primaire : fond `--ink`, texte `--paper` ; survol : fond `--gold`, texte `--ink`.
- Secondaire : transparent, bordure 1 px `--ink` ; survol : fond `--ink` à 6 %.
- Lien : Inter 500, souligné 1 px décalé de 4 px ; survol : soulignement or 2 px, flèche « → » décalée de 3 px.
- Focus (tous) : `outline: 2px solid var(--focus); outline-offset: 3px` ; sur fond nuit : `--gold-light`.
- Un seul bouton primaire par écran.

**Carte de conférence.** Fond `--paper-raised`, bordure 1 px `--line`, padding 32 × 28 px. Ligne du haut : chiffre romain (Cormorant italique 28 px, `--gold-deep`) à gauche, tags de public à droite. Titre Cormorant 600. Résumé Inter 16 px, 3 lignes maximum. Ligne de formats en Inter 13 px `--ink-3` : « Keynote · Conférence · Atelier ». Lien « Voir la conférence → » en bas. Toute la carte est cliquable (pseudo-élément sur le lien, pas de `<a>` englobant). Survol : bordure `--ink`, barre or de 2 px qui s'étend (garder l'idée actuelle). Supprimer le soulèvement et l'ombre. Plus tard : photo 3:2 en tête de carte.

**Bandeau chiffres.** Fond `--night`, 2 ou 3 chiffres au maximum, chacun avec sa phrase (Inter 16 px `--on-night-2`) et **sa source obligatoire** (Inter 12 px `--on-night-3`). Un seul chiffre en or. Pas de compteur animé.

**Citation (témoignage).** Guillemets « » en Cormorant 72 px `--gold-deep`, texte Cormorant italique, puis filet or de 48 px et attribution en Inter 14 px : Prénom Nom, fonction, structure. Tant qu'il n'y a pas de vrai témoignage : bloc masqué, jamais de faux.

**Formulaire.** Libellé au-dessus (Inter 14 px 500), champ encadré (bordure 1 px `--line-strong`, fond `--paper-raised`, hauteur 48 px) plutôt que le simple trait actuel, moins reconnaissable comme champ. Focus : bordure 2 px `--ink`. Astérisque expliqué en tête : « * champs obligatoires ». Erreur : message texte `--error` sous le champ, relié par `aria-describedby`, plus une icône ; jamais la couleur seule. Bouton pleine largeur en mobile. Mention RGPD en 13 px `--ink-3` sous le bouton. Confirmation après envoi : message clair et délai (« Réponse sous 48 h »).

**Pied de page.** Fond `--night`, quatre colonnes : logo inversé + baseline ; Conférences ; Pour qui ; Organisateurs et contact (e-mails visibles). Ligne basse séparée par `--night-line` : Mentions légales · Confidentialité · © 2026 M42.guide. Texte `--on-night-2`.

**Fil d'Ariane.** Pages internes seulement. `<nav aria-label="Fil d'Ariane">`, Inter 13 px `--ink-3`, séparateur « / », page courante en `--ink` 500 avec `aria-current`. Placé au-dessus du sur-titre. En mobile : uniquement le parent (« ← Conférences »).

**Tags de public.** Inter 13 px 500, casse normale (« Entreprises », « Collectivités », « Écoles & familles »), fond `--paper-sunk`, texte `--ink-2` (9,20), padding 4 × 10 px, rayon 2 px. Pas de code couleur par public. Non cliquables sur les cartes ; s'ils deviennent des filtres, ils prennent une bordure et un état actif.

## 7. Photo et iconographie

**Photo : la priorité n° 1.** Couleur, avec un seul étalonnage appliqué à toutes les images : saturation −15 à −20 %, légère chaleur, noirs profonds mais détaillés. Pas de noir et blanc systématique : c'est un cliché de conférencier, et il refroidit la dimension humaine, qui est votre différence.
- **Scène** : lumière de scène latérale, fond sombre (qui prolonge les sections nuit), le public en amorce floue au premier plan, Clara et Paul en action (geste, démonstration, échange avec la salle). Format 3:2 et 16:9.
- **Portraits** : lumière naturelle douce de côté, fond uni papier ou pierre, cadrage poitrine, format 4:5. Un portrait de face, regard caméra, un autre de trois quarts.
- **Duo** : toujours Clara à gauche, Paul à droite (ordre du nom). Une image où ils interagissent, pas côte à côte bras croisés.
- **Interdits** : banque d'images, images générées par IA de vous ou de vos publics (incohérent avec le propos), mains de robot, écrans bleus.

**Iconographie.** Pictos uniquement fonctionnels (télécharger, flèche, lien externe, téléphone, e-mail, validation), trait de 1,5 px sur grille de 24 px, extrémités et jonctions arrondies comme le M du logo. Lucide (licence ISC) en `stroke-width: 1.5` convient.
Motifs propres à la marque, à petite dose : graduations, croix de repère « + », arc pointillé (repris de l'anneau du logo) comme séparateur, étoile d'or à 4 branches comme **marqueur unique** (une par écran au maximum, par exemple devant la conférence signature).

## 8. Mouvement

Principe : le mouvement **oriente**, il ne décore pas. Il confirme une action ou révèle une structure.

| Token | Valeur | Usage |
|---|---|---|
| `--dur-1` | 120 ms | survol, appui |
| `--dur-2` | 200 ms | menus, champs, accordéons |
| `--dur-3` | 320 ms | apparition au défilement |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | entrées |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | déplacements |

Rester sous 400 ms, entrées un peu plus longues que les sorties, jamais de courbe linéaire [10]. Apparition au défilement : opacité + 8 px, une seule fois, décalage entre éléments ≤ 60 ms. Seule exception : la séquence d'ouverture du symbole dans l'en-tête.

**Corrections à faire sur la maquette** :
- Le H1 et le chapô attendent jusqu'à 0,6 s avec une animation de 0,9 s : ils doivent être visibles immédiatement (lecture et performance).
- L'anneau qui tourne et l'étoile qui pulse tournent en continu : au-delà de 5 s, WCAG 2.2.2 (niveau A) impose un moyen de mettre en pause [11]. Arrêter l'animation après la séquence d'ouverture, ou ajouter un bouton pause.

**Interdits** : détournement du défilement, parallaxe, curseur personnalisé, texte animé lettre par lettre, carrousel automatique, compteurs animés, vidéo en lecture automatique avec le son.

**`prefers-reduced-motion: reduce`** : aucune translation, fondus ramenés à 0 ms, canevas figé sur son image finale, vidéo sans lecture automatique.

## 9. Cinq choses à faire, cinq à éviter

**À faire**
1. Mettre la vidéo et une photo de scène en duo dans le premier écran dès qu'elles existent.
2. Utiliser le motif « atlas » (filets, graduations, repères) comme signature, avec retenue.
3. Sourcer chaque chiffre, directement sous le chiffre.
4. Donner à chaque conférence sa page, avec une déclinaison par public.
5. Vérifier chaque couleur de texte avec les tokens ci-dessus avant toute mise en ligne.

**À éviter**
1. L'or en texte sur le papier (2,67:1).
2. Cormorant sous 28 px ou en graisse légère.
3. Les imageries « IA » génériques.
4. Les rubriques vides ou « bientôt » (actualités, boîte à outils, presse).
5. Les ombres, dégradés et coins arrondis qui tirent vers le gabarit SaaS.

## 10. Avis franc : garder le papier crème et Cormorant ?

**Oui pour le papier, oui pour Cormorant, mais pas comme aujourd'hui.**

Le papier est votre meilleur atout de différenciation. Face aux sites IA bleus, violets ou noirs, un fond papier dit « recul, méthode, pédagogie ». C'est exactement la promesse « ni peur, ni emballement ». Il fait aussi partie du logo validé. Le changer coûterait de la cohérence sans rien rapporter.

Le risque est ailleurs. **Cormorant sur crème, utilisé partout, évoque le faire-part, l'institut de beauté ou la chambre d'hôtes**, pas l'expertise. Un responsable événementiel de grand compte peut lire « artisanal » là où vous voulez « référence nationale ». Aujourd'hui, la maquette utilise Cormorant jusqu'aux titres de 24 px et aux intitulés de liens, avec beaucoup de capitales espacées : c'est ce mélange qui fait « boutique ».

Pour basculer vers « grands comptes et congrès » :
1. **Cormorant réservé à l'affichage** (H1, H2, chiffres, citations, titres de cartes ≥ 28 px). Inter partout ailleurs, y compris les H3. Plus de structure, moins d'ornement.
2. **Plus d'encre** : en-tête nuit possible, bandeau chiffres, duo, pied de page. Le contraste papier/nuit donne de la gravité et de la tenue.
3. **De vraies photos de scène.** C'est elles qui feront « conférenciers nationaux », pas la typographie. Sans elles, aucun réglage graphique ne compensera.

Verdict : on garde l'ADN, on serre la discipline. Ce n'est pas une refonte mais une montée en gamme, et elle passe autant par les photos que par le CSS.

## Sources

1. Webflow, *8 web design trends to watch in 2026* : https://webflow.com/blog/web-design-trends-2026
2. Naturaily, *Web Design Trends in 2026: What Drives Leads, Trust, and Visibility* : https://naturaily.com/blog/web-design-trends
3. DesignRush, *Why a Premium Website Can Look Expensive but Still Lose Buyers* : https://news.designrush.com/expensive-looking-websites-still-lose-sales
4. SpeakerHub, *Is your website driving away or attracting event planners?* : https://www.speakerhub.com/skillcamp/your-website-driving-away-or-attracting-event-planners
5. Nanoglobals, *10 Public Speaker Website Examples That Get You Booked (2026)* : https://nanoglobals.com/public-speaking-websites/ ; et Framer, *13 best consulting website design examples* : https://www.framer.com/blog/13-best-consulting-website-design-examples/
6. Figma, *Web design trends* : https://www.figma.com/resource-library/web-design-trends/
7. W3C, *Understanding SC 1.4.3 Contrast (Minimum)* : https://w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
8. W3C, *Understanding SC 1.4.11 Non-text Contrast* : https://w3.org/WAI/WCAG22/Understanding/non-text-contrast
9. Catharsis Fonts, Cormorant (« display type family ») : https://github.com/CatharsisFonts/Cormorant
10. Nielsen Norman Group, *Executing UX Animations: Duration and Motion Characteristics* : https://nngroup.com/articles/animation-duration
11. W3C, *Understanding SC 2.2.2 Pause, Stop, Hide* : https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide
