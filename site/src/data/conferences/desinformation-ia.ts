// Contenus de la conférence III « Vrai ou faux ? » (kit/maquette/Conf-desinformation-ia.dc.html).
// Forme : voir ./types.ts (collection Directus `conferences`, phase 3).
//
// Notes de production de la maquette (commentaire SEO) :
// - Neutralité politique stricte : mécanismes seulement, source officielle citée, aucun exemple partisan.
// - [À DÉCIDER n° 10 de 05 : dire ou non sur scène l'attribution officielle de Storm-1516 ; ici, le titre
//   officiel de la source est cité tel quel dans « Sources ».]
//
// Champs facultatifs du type Conference propres à cette page (./types.ts) : `mentionEnTete`
// (« Strictement neutre »), `demonstration.visuel` (publication virale), `jeu[].visuel`
// (bloc « [Photo : …] »), `chiffres.note` ([À VÉRIFIER …]), `methode` (section « La méthode »).
// Toute la conférence tient dans l'objet exporté (sérialisable en JSON).

import { routes } from '../routes';
import type { Conference } from './types';

export const desinformationIa: Conference = {
  slug: 'desinformation-ia',
  numero: 'III',
  disponibilite: 'catalogue',
  titre: 'Vrai ou faux ?',
  seo: {
    title: 'Conférence fausses infos et IA : vrai ou faux ? | M42',
    description:
      "Images truquées, fausses vidéos, faux sites d'info générés par IA : une méthode de vérification en 4 étapes et le jeu « Vrai ou IA ? ». Strictement neutre.",
  },
  surTitre: 'Conférence III · Fausses informations et intelligence artificielle',
  sousTitre:
    "Fausses images, fausses vidéos, faux sites d'information : une méthode pour vérifier en quatre étapes.",
  promesse:
    'Vous repartez avec une méthode courte pour vérifier une information avant de la croire ou de la partager.',
  ctaSecondaire: { label: 'Jouer à « Vrai ou IA ? »', href: '#jeu' },
  mentionEnTete: 'Strictement neutre : des mécanismes, jamais de contenu partisan.',
  miseAJour: '[À COMPLÉTER : date]',
  fiche: [
    {
      label: 'Pour qui',
      valeur:
        'Grand public, médiathèques, lycées et universités, associations, élus et agents, journalistes locaux',
    },
    {
      label: 'Formats',
      valeur: 'Keynote 45 min à 1 h · Conférence 1 h 30 · Atelier 2 h · Cycle de 4 rendez-vous',
    },
    { label: 'Participants', valeur: 'Selon la salle · 15 en atelier' },
    { label: 'Où', valeur: 'Partout en France, en présentiel ou à distance · en français' },
  ],

  demonstration: {
    label: 'Démonstration : une image virale passée à la méthode en 4 étapes',
    surTitre: 'Démonstration · Une image qui circule',
    k: 3.2,
    etapes: [
      {
        kicker: 'Exemple',
        titre: 'Une image qui circule.',
        texte:
          "Douze mille partages en une matinée. Elle surprend, elle émeut : c'est exactement pour cela qu'elle circule.",
      },
      {
        kicker: "Étape 1 · Je m'arrête",
        titre: "L'émotion est un signal.",
        texte:
          "« Incroyable », « partagez avant que ce soit supprimé » : la surprise et l'urgence poussent à partager sans réfléchir. Je m'arrête.",
      },
      {
        kicker: "Étape 2 · Je cherche la source d'origine",
        titre: "Qui l'a publiée en premier ?",
        texte:
          "Un compte créé il y a trois jours. La recherche d'image inversée ne trouve aucune photo antérieure, aucun photographe.",
      },
      {
        kicker: 'Étape 3 · Je vérifie ailleurs',
        titre: "Personne d'autre n'en parle.",
        texte:
          "Ni la presse locale, ni la mairie, ni la préfecture. Et en regardant de près, l'image trahit des incohérences : les ombres, le panneau, les vagues.",
      },
      {
        kicker: 'Étape 4 · Dans le doute, je ne partage pas',
        titre: 'Une image générée par IA.',
        texte:
          'Les défauts visibles disparaissent peu à peu avec les nouveaux outils. Le meilleur indice reste la source : sans source fiable, pas de partage.',
      },
    ],
    visuel: {
      type: 'publication-virale',
      compte: 'Info_Littoral_24',
      anciennete: 'Compte créé il y a 3 jours',
      date: 'il y a 2 h',
      message: {
        accroche: 'INCROYABLE',
        texte: ': une baleine géante échouée ce matin sur la grande plage.',
        appel: 'Partagez avant que ce soit supprimé !',
      },
      image: {
        description:
          'Illustration : une baleine échouée sur une plage, deux promeneurs, un panneau. Les repères numérotés signalent les incohérences.',
        bandeau: 'Image générée par IA',
      },
      indices: [
        'Ombres dans deux directions',
        'Panneau au texte illisible',
        'Vagues identiques, répétées',
      ],
      verifications: [
        { label: "Recherche d'image inversée", resultat: 'Aucune photo antérieure' },
        { label: 'Presse locale, mairie, préfecture', resultat: 'Aucune mention' },
      ],
      partages: '12 400 partages',
      partager: 'Partager',
      legende:
        'Exemple fictif construit pour la démonstration. [À REMPLACER par un cas réel documenté, neutre et sourcé]',
    },
  },

  enClair:
    "Un contenu faux circule souvent plus vite qu'un contenu vrai, parce qu'il joue sur l'émotion, l'urgence et ce que l'on pense déjà. Avant de croire ou de partager : je m'arrête, je cherche la source d'origine, je vérifie ailleurs, et dans le doute, je ne partage pas.",
  objectifs: {
    titre: 'Ce que vos participants sauront faire',
    items: [
      "À la fin, vous saurez pourquoi un contenu faux circule plus vite qu'un contenu vrai : émotion, urgence, confirmation de ce qu'on pense déjà.",
      'À la fin, vous saurez appliquer une méthode de vérification en quatre étapes, sur votre téléphone, en quelques minutes.',
      "À la fin, vous saurez reconnaître les signes d'un faux site d'information.",
    ],
  },

  chiffres: {
    label: 'Les fausses informations en chiffres',
    note: '[À VÉRIFIER : périmètre exact des deux chiffres du Reuters Institute (France ou ensemble des pays étudiés) avant publication]',
    items: [
      {
        valeur: '62 %',
        texte:
          "des personnes interrogées s'inquiètent des fausses informations en ligne, 4 points de plus en un an.",
        source: 'Source : Reuters Institute, Digital News Report 2026 (juin 2026)',
      },
      {
        valeur: '100',
        texte:
          "Plus d'une centaine de noms de domaine imitent des journaux locaux français ; leurs contenus sont générés par IA.",
        source:
          "Source : Viginum (SGDSN), bulletin du 27 février 2026, d'après Banque des Territoires (mars 2026)",
        accent: true,
      },
      {
        valeur: '20 %',
        texte:
          "C'est la confiance accordée aux réponses des assistants d'IA, selon la même enquête.",
        source: 'Source : Reuters Institute, Digital News Report 2026 (juin 2026)',
      },
    ],
  },

  programme: {
    surTitre: 'Programme · conférence de 1 h 30',
    titre: "Ce que l'on voit ensemble",
    chapo:
      'Des cas documentés, un jeu avec la salle, et une méthode que chacun peut appliquer sur son téléphone.',
    blocs: [
      {
        titre: "Le faux s'est industrialisé",
        duree: '15 min',
        texte:
          "Exemple documenté par Viginum : plus d'une centaine de noms de domaine imitant des journaux locaux français, remplis de contenus générés par IA (opération Storm-1516). Uniquement le mécanisme, jamais de contenu partisan.",
      },
      {
        titre: 'Pourquoi ça marche sur nous tous',
        duree: '15 min',
        texte:
          "L'émotion, l'urgence, les bulles. Personne n'est immunisé, quel que soit son niveau d'études.",
      },
      {
        titre: 'Le jeu « Vrai ou IA ? »',
        duree: '20 min',
        texte: 'Images, voix, vidéos, articles. La salle vote, puis on montre les indices.',
      },
      {
        titre: 'La méthode en 4 étapes',
        duree: '25 min',
        texte:
          "Je m'arrête. Je cherche la source d'origine. Je vérifie ailleurs. Je ne partage pas en cas de doute. Démonstration avec des outils gratuits.",
      },
      {
        titre: 'Questions et cas de la salle',
        duree: '15 min',
        texte:
          'Vérification en direct de contenus apportés par le public, avec un filtre préalable pour rester neutre.',
      },
    ],
  },

  tempsFort: {
    id: 'jeu',
    titre: 'Le jeu « Vrai ou IA ? »',
    chapo:
      'Pendant la conférence, la salle vote sur des images, des voix et des articles, puis on montre les indices. Essayez avec quatre exemples.',
    note: 'Exemples fictifs et neutres, décrits en texte pour la maquette. En conférence, la salle voit les vrais contenus.',
  },

  // Jeu « Vrai ou IA ? » : `de` = nature du contenu, `arnaque` = faux ou généré par IA,
  // `visuel` = bloc de remplacement (« [Photo : …] ») en attendant le vrai contenu.
  jeu: [
    {
      de: 'Photo · réseau social',
      visuel:
        '[Photo : une foule à un concert, bras levés. Au premier plan, une main à six doigts ; la banderole du fond est illisible.]',
      texte: 'Une photo de concert partagée des milliers de fois, sans nom de photographe.',
      arnaque: true,
      explication:
        "Mains, textes et reflets restent des points faibles des images générées. Mais ces défauts disparaissent peu à peu : le meilleur indice reste la source d'origine.",
    },
    {
      de: "Article · site d'information local",
      visuel:
        "[Capture : la page d'accueil de « L'Écho du Littoral », quarante articles publiés aujourd'hui, tous signés « La rédaction ».]",
      texte: "Pas de mentions légales, pas d'adresse, un nom de domaine créé il y a deux mois.",
      arnaque: true,
      explication:
        "C'est le mécanisme documenté par Viginum : des sites qui imitent la presse locale, remplis de contenus générés par IA. On vérifie les mentions légales, l'ancienneté du site et la signature des articles.",
    },
    {
      de: 'Photo · compte officiel',
      visuel:
        '[Photo : une rue inondée après un orage, publiée par le compte officiel de la préfecture.]',
      texte:
        "Reprise par deux journaux locaux, avec le nom du photographe et l'heure de la prise de vue.",
      arnaque: false,
      explication:
        "Source d'origine identifiée, reprise par des médias reconnus, auteur nommé : la méthode conclut que l'image est fiable. Douter de tout n'est pas la solution ; vérifier, si.",
    },
    {
      de: 'Message vocal · messagerie',
      visuel:
        "[Audio : 20 secondes, la voix d'un présentateur connu annonce une « alerte à ne pas manquer » et renvoie vers un lien.]",
      texte: "Le message circule de groupe en groupe ; aucune chaîne ne l'a diffusé.",
      arnaque: true,
      explication:
        'Une voix peut être imitée par une IA à partir de quelques enregistrements. Une annonce importante passe par les canaux officiels : on vérifie sur le site de la source citée, jamais par le lien du message.',
    },
  ],

  methode: {
    surTitre: 'La méthode',
    titre: 'Vérifier en quatre étapes, sur son téléphone',
    etapes: [
      {
        titre: "Je m'arrête",
        texte:
          "L'émotion est un signal. Colère, peur, émerveillement : c'est le moment de ralentir.",
      },
      {
        titre: "Je cherche la source d'origine",
        texte: "Qui l'a publiée en premier ? Depuis quand ce compte, ce site existent-ils ?",
      },
      {
        titre: 'Je vérifie ailleurs',
        texte:
          'Un média reconnu, une source officielle en parlent-ils ? Une seule source ne suffit pas.',
      },
      {
        titre: 'Dans le doute, je ne partage pas',
        texte: "Ne pas partager, c'est déjà agir : un faux contenu vit de ses partages.",
      },
    ],
    note: "Démonstration avec des outils gratuits, comme la recherche d'image inversée [À COMPLÉTER : liste des outils montrés]. Fiche méthode à emporter [À PRODUIRE].",
    regle: {
      titre: 'La règle : la neutralité',
      texte:
        "Aucun exemple partisan. Aucun parti ni candidat cité comme cible ou bénéficiaire. La conférence montre comment un faux contenu est fabriqué et pourquoi il circule, cite la source officielle qui l'a documenté, et s'arrête là. Les contenus apportés par la salle sont filtrés avant d'être vérifiés en direct.",
    },
  },

  formats: {
    titre: 'Quatre façons de la programmer',
    items: [
      {
        duree: '45 min à 1 h',
        titre: 'Keynote ou intervention plénière',
        texte:
          'Le faux industrialisé, le jeu « Vrai ou IA ? » en version courte, et la méthode en quatre étapes.',
      },
      {
        duree: '1 h 30',
        titre: 'Conférence',
        texte:
          'Le programme complet en cinq parties, avec la vérification en direct de cas apportés par la salle. Jauge selon la salle [À VALIDER : jauge maximale testée].',
      },
      {
        duree: '2 h',
        titre: 'Atelier pratique',
        texte:
          '15 personnes. Vérification en petits groupes sur de vrais cas ; chaque groupe présente sa démarche.',
      },
      {
        duree: '4 rendez-vous',
        titre: 'Cycle',
        texte:
          'Le programme réparti sur quatre séances, pour un groupe stable : classe, médiathèque, association [À VALIDER : rythme et déroulé].',
      },
    ],
  },

  publics: {
    titre: "Personne n'est immunisé",
    chapo: "Quel que soit son âge ou son niveau d'études. Les exemples s'adaptent à votre public.",
    items: [
      {
        titre: 'Lycées, universités & enseignants',
        href: routes['Education.dc.html'],
        texte:
          "Apprendre à vérifier avant de croire ou de partager : une intervention d'éducation aux médias et à l'information.",
      },
      {
        titre: 'Collectivités, médiathèques & élus',
        href: routes['Collectivites.dc.html'],
        texte:
          'Pour les habitants, et pour les élus et les agents confrontés aux rumeurs et aux faux contenus.',
      },
      {
        titre: 'Événements & salons',
        href: routes['Evenements.dc.html'],
        texte: "Le jeu « Vrai ou IA ? » comme temps fort d'une plénière ou d'un congrès.",
      },
    ],
  },

  declinaisonEntreprise: {
    titre: 'Rumeurs, faux contenus et réputation',
    texte:
      "Pour les directions de la communication, les RH et les comités de direction. Faux avis, fausse vidéo d'un dirigeant, faux communiqué, rumeur interne. On prépare la procédure : qui vérifie, qui décide, qui répond, en combien de temps.",
    lien: {
      label: 'Préparer vos équipes aux faux contenus',
      href: routes['Entreprises.dc.html'],
    },
  },

  faq: {
    titre: 'Avant de programmer cette conférence',
    items: [
      {
        question: 'Comment la conférence reste-t-elle neutre sur un sujet aussi sensible ?',
        reponse:
          "<p>Elle ne montre que des mécanismes : comment un faux contenu est fabriqué, pourquoi il circule, comment le vérifier. Aucun exemple partisan, aucun parti ni candidat cité comme cible ou bénéficiaire. Les cas documentés sont présentés avec leur source officielle. Les contenus apportés par la salle sont filtrés avant d'être vérifiés en direct, pour rester sur la méthode.</p>",
      },
      {
        question: "Qu'est-ce qu'un deepfake ?",
        reponse:
          "<p>C'est une image, une vidéo ou un enregistrement de voix fabriqué ou modifié par une IA, pour faire croire qu'une personne a dit ou fait quelque chose. On le repère de moins en moins à l'œil nu. Le réflexe le plus sûr : chercher la source d'origine, et vérifier si des médias reconnus ou des sources officielles confirment l'information.</p>",
      },
      {
        question: 'Faut-il des outils particuliers pour vérifier une image ?',
        reponse:
          "<p>Non. La méthode tient sur un téléphone : s'arrêter, chercher la source d'origine, vérifier ailleurs, ne pas partager dans le doute. Pendant la conférence, des outils gratuits sont montrés, comme la recherche d'image inversée. Mais l'essentiel reste le raisonnement, qui fonctionne même quand les outils se trompent.</p>",
      },
      {
        question: "Peut-on l'organiser pour des lycéens ou des étudiants ?",
        reponse:
          "<p>Oui. Le programme s'adapte aux lycées et à l'enseignement supérieur : exemples tirés des réseaux sociaux des élèves, jeu « Vrai ou IA ? », vérification en petits groupes en atelier. C'est une intervention d'éducation aux médias et à l'information, qui peut s'inscrire dans un projet d'établissement ou une semaine thématique.</p>",
      },
      {
        question: 'Existe-t-il une version pour les entreprises ?',
        reponse:
          "<p>Oui : « Rumeurs, faux contenus et réputation », pour les directions de la communication, les RH et les comités de direction. Faux avis, fausse vidéo d'un dirigeant, faux communiqué, rumeur interne : on prépare ensemble la procédure, c'est-à-dire qui vérifie, qui décide, qui répond, et en combien de temps.</p>",
      },
    ],
    sources: [
      {
        avant: 'SGDSN / Viginum, ',
        titre: 'Analyse du mode opératoire informationnel russe Storm-1516',
        apres: ', juin 2025. 77 opérations documentées.',
        url: 'https://www.defense.gouv.fr/desinformation/aller-plus-loin/analyses-sgdsn/sgdsn-viginum-analyse-du-mode-operatoire-informationnel-russe-storm',
      },
      {
        avant: 'Banque des Territoires, ',
        titre:
          "Viginum confirme deux ingérences numériques étrangères à l'approche des municipales",
        apres: ", mars 2026 (d'après le bulletin n° 5 du SGDSN du 27 février 2026).",
        url: 'https://www.banquedesterritoires.fr/viginum-confirme-deux-ingerences-numeriques-etrangeres-lapproche-des-municipales',
      },
      {
        avant: "Reuters Institute (Université d'Oxford), ",
        titre: 'Digital News Report 2026',
        apres: ', juin 2026.',
        url: 'https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/dnr-executive-summary',
      },
    ],
  },

  contact: {
    titre: 'Programmer « Vrai ou faux ? » pour votre public',
    chapo:
      'Médiathèque, établissement, collectivité ou événement : dites-nous qui sera dans la salle, quand, et le format qui vous intéresse. Nous vous répondons sous 48 h.',
    cta: 'Organiser cette conférence',
  },

  service: {
    name: "Conférence « Vrai ou faux ? » : fausses images, fausses vidéos, faux sites d'information",
    serviceType: 'Conférence de sensibilisation',
    description:
      "Repérer les images truquées, les fausses vidéos et les faux sites d'information générés par IA, avec une méthode de vérification en quatre étapes. Strictement neutre : des mécanismes, jamais de contenu partisan. Formats : intervention plénière de 45 min à 1 h, conférence de 1 h 30, atelier de 2 h, cycle de 4 rendez-vous.",
    audiences: [
      'Grand public',
      'Médiathèques',
      'Lycées et universités',
      'Associations',
      'Élus et agents des collectivités',
      'Journalistes locaux',
    ],
    about: ['Désinformation', 'Deepfake', "Éducation aux médias et à l'information"],
  },
};
