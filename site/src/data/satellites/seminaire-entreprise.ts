// Satellite « événement » (kit/maquette/Sat-seminaire-entreprise.dc.html).
// Texte exact de la maquette, marqueurs [À …] conservés. Liens : URL de src/data/routes.ts.
// L'ancre #cinq-questions est appelée depuis la page Repères : ne pas la renommer.
// Toute la page tient dans l'objet `page` (sérialisable en JSON : un enregistrement Directus).

import { routes } from '../routes';
import type { SatLink, SatPage } from './types';

/** En-tête de la page séminaire : photo en colonne droite. */
export interface SeminaireHero {
  eyebrow: string;
  title: string;
  lead: string;
  note: string;
  primary: SatLink;
  secondary: SatLink;
  /** Texte de l'emplacement photo (3:2). */
  photo: string;
}

export const page: SatPage<SeminaireHero> = {
  seo: {
    path: routes['Sat-seminaire-entreprise.dc.html'],
    title: "Conférence IA pour séminaire d'entreprise | M42.guide",
    description:
      "Keynote de 45 min ou conférence de 1 h 30 sur l'IA pour votre séminaire ou votre convention. Démonstrations en direct, jeu avec la salle. Devis sous 48 h.",
  },

  crumbs: [
    { label: 'Accueil', href: routes['Main.dc.html'] },
    { label: 'Événements', href: routes['Evenements.dc.html'] },
    { label: 'Séminaires et conventions' },
  ],

  hero: {
    eyebrow: 'Séminaires et conventions',
    title: "Une conférence sur l'IA pour votre séminaire ou votre convention",
    lead: "Vos collaborateurs ont tous entendu parler d'IA. Peu savent quand lui faire confiance. Offrez-leur un temps fort clair et vivant : des démonstrations en direct, un jeu avec la salle, et trois règles que chacun applique dès le lendemain.",
    note: 'Keynote de 45 min à 1 h · Conférence de 1 h 30 · Conférence à deux voix · Atelier de 2 h après la plénière',
    primary: { label: 'Proposer une date', href: routes['Contact.dc.html'] },
    secondary: { label: 'Les 5 questions pour choisir un conférencier', href: '#cinq-questions' },
    photo:
      '[Photo : plénière de séminaire, démonstration en direct sur grand écran, public en amorce floue, 3:2]',
  },

  toc: [
    { href: '#pourquoi', label: 'Pourquoi en parler' },
    { href: '#keynote', label: "La keynote « Voir clair dans l'IA »" },
    { href: '#sujets', label: 'Choisir le sujet' },
    { href: '#cinq-questions', label: '5 questions avant de choisir' },
    { href: '#organisation', label: 'Côté organisation' },
    { href: '#faq', label: 'Questions fréquentes' },
  ],

  sections: [
    {
      id: 'pourquoi',
      eyebrow: 'Le contexte',
      title: "Pourquoi parler d'IA à votre séminaire",
      blocks: [
        {
          type: 'text',
          text: "L'IA est déjà dans vos équipes, souvent sans règles communes. En France, 48 % des personnes l'utilisent et 52 % s'en méfient (Baromètre du numérique, 2026). Dans les entreprises, l'écart se voit aussi : selon une enquête internationale du BCG (2026), seuls 36 % des salariés s'estiment suffisamment formés.",
        },
        {
          type: 'figures',
          items: [
            {
              value: '48 %',
              label: "des personnes utilisent l'IA en France.",
              source: 'Source : Arcep, CREDOC, Baromètre du numérique 2026',
            },
            {
              value: '52 %',
              label: "s'en méfient.",
              source: 'Source : Arcep, CREDOC, Baromètre du numérique 2026',
            },
            {
              value: '36 %',
              label: "des salariés s'estiment suffisamment formés.",
              source:
                'Source : BCG, « AI at Work », juin 2026 (enquête internationale, déclarative)',
            },
          ],
        },
        {
          type: 'box',
          label: 'Un cas signalé par la DGSI',
          paragraphs: [
            {
              text: "Les risques ont changé d'échelle. En décembre 2025, la DGSI a rapporté le cas d'un directeur de site appelé en visioconférence par un faux dirigeant du groupe, visage et voix imités par IA, qui lui demandait un virement. Il a raccroché et vérifié : c'était une tentative d'escroquerie par hypertrucage.",
            },
            {
              variant: 'source',
              text: 'Source : La Banque Postale, « IA, fraude et entreprise : la DGSI alerte », février 2026.',
            },
          ],
        },
        {
          type: 'quote',
          text: 'Un séminaire est le bon moment : tout le monde est là, disponible, et le sujet concerne chaque métier.',
        },
      ],
    },
    {
      id: 'keynote',
      eyebrow: 'La keynote',
      title: "« Voir clair dans l'IA » (45 min)",
      blocks: [
        { type: 'text', text: 'Une keynote pensée pour ouvrir ou clore un séminaire.' },
        {
          type: 'numbered',
          items: [
            {
              title: "L'erreur sûre d'elle",
              html: "Une question piège est posée à une IA, en direct. Elle répond avec aplomb et cite une source qui n'existe pas. La salle comprend en deux minutes pourquoi il faut vérifier.",
            },
            {
              title: "Ce qu'elle fait très bien",
              html: 'Deux usages utiles, tirés des métiers présents dans la salle.',
            },
            {
              title: 'Vrai ou IA ?',
              html: 'La salle vote sur quatre contenus : photos, voix, article. Les indices sont révélés après chaque vote.',
            },
            {
              title: 'Les méthodes des pros',
              html: 'Les équipes qui font travailler des agents IA ne leur font jamais confiance aveuglément. Leurs garde-fous, traduits en règles que chacun peut appliquer.',
            },
          ],
        },
        {
          type: 'note',
          label: 'À retenir',
          text: "Chacun repart avec trois règles, dont : « Je réfléchis d'abord, l'IA ensuite. »",
        },
        {
          type: 'more',
          label: "La conférence complète : L'IA au quotidien",
          href: routes['Conf-ia-au-quotidien.dc.html'],
        },
      ],
    },
    {
      id: 'sujets',
      eyebrow: 'Selon votre public',
      title: 'Choisir le sujet selon votre public',
      blocks: [
        { type: 'text', text: 'Le bon sujet dépend de qui sera dans la salle.' },
        {
          type: 'table',
          table: {
            caption: 'Sujets proposés, par public',
            columns: ['Votre public', 'Sujet proposé'],
            rows: [
              {
                head: 'Tous les collaborateurs',
                cells: [
                  "<strong>Garder la main</strong> : l'IA au travail, sans perdre son métier",
                ],
              },
              {
                head: 'Comité de direction',
                cells: [
                  '<strong>Déléguer sans abdiquer</strong> : confier des tâches à des agents IA sans perdre le contrôle',
                ],
              },
              {
                head: 'Cadres et dirigeants',
                cells: [
                  '<strong>Le doute utile</strong> : décider mieux face à une réponse convaincante',
                ],
              },
              {
                head: 'Managers et RH',
                cells: [
                  "<strong>L'équipe et la machine</strong> : conduire le changement quand l'IA arrive",
                ],
              },
              {
                head: 'Finance, comptabilité, achats',
                cells: [
                  '<strong>Fraude au président, version 2026</strong> : les réflexes qui protègent',
                ],
              },
            ],
          },
        },
        {
          type: 'more',
          label: 'Tous les sujets pour les entreprises',
          href: routes['Entreprises.dc.html'],
        },
      ],
    },
    {
      id: 'cinq-questions',
      eyebrow: 'Avant de choisir',
      title: 'Cinq questions à poser avant de choisir un conférencier IA',
      blocks: [
        { type: 'text', text: "Posez-les à tout intervenant, quel qu'il soit." },
        {
          type: 'numbered',
          items: [
            {
              title: "Montre-t-il l'IA en direct ?",
              html: "Une démonstration convainc plus qu'une diapositive. Demandez aussi s'il a prévu une vidéo de secours.",
            },
            {
              title: 'Ses chiffres sont-ils sourcés et datés ?',
              html: "Sur l'IA, une donnée de plus d'un an est souvent périmée.",
            },
            {
              title: 'Vend-il un outil ?',
              html: 'Un intervenant qui représente un éditeur parlera de son produit.',
            },
            {
              title: 'Adapte-t-il ses exemples à votre public ?',
              html: 'Exigez un échange de préparation.',
            },
            {
              title: 'Promet-il des gains chiffrés ?',
              html: "« +30 % de productivité » sans source précise est un signal d'alerte.",
            },
          ],
        },
        {
          type: 'note',
          label: 'Ce que vous pouvez exiger',
          text: "Démonstrations en direct avec vidéos de secours, sources citées, aucun outil à vendre, un échange de cadrage de 30 minutes avant l'intervention, aucune promesse chiffrée.",
        },
      ],
    },
    {
      id: 'organisation',
      eyebrow: 'Côté organisation',
      title: "Ce qu'il faut prévoir",
      blocks: [
        {
          type: 'definitions',
          items: [
            {
              term: 'Formats',
              html: 'Keynote de 45 min à 1 h, conférence de 1 h 30, conférence à deux voix, atelier de 2 h après la plénière.',
            },
            {
              term: 'Technique',
              html: `Deux micros sans fil, vidéoprojecteur HDMI, écran, connexion internet, 30 minutes d'installation. Fiche technique dans l'<a href="${routes['Organisateurs.dc.html']}" class="sat-inline">Espace organisateurs</a>.`,
            },
            {
              term: 'Communication',
              html: 'Titre, résumé, biographies et photos fournis pour votre programme.',
            },
            { term: 'Captation', html: 'Possible, selon les conditions prévues au contrat.' },
          ],
        },
        {
          type: 'video',
          label:
            '[À COMPLÉTER : vidéo de démonstration de 60 à 90 s, 16:9, sans lecture automatique]',
        },
        {
          type: 'draft',
          text: "[À COMPLÉTER : témoignages d'organisateurs, avec accord écrit. Bloc absent tant qu'il n'y en a pas de vrai.]",
        },
      ],
    },
    {
      id: 'faq',
      eyebrow: 'Questions fréquentes',
      title: "Vos questions d'organisateur",
      blocks: [
        {
          type: 'faq',
          items: [
            {
              question: "Combien coûte une conférence sur l'IA pour un séminaire ?",
              answer:
                "<p>Chaque intervention fait l'objet d'un devis. Le prix dépend du format, de la durée, de la préparation sur mesure, du déplacement et de la captation éventuelle. Envoyez-nous votre date et votre public : réponse sous 48 h.</p>",
            },
            {
              question: 'Pouvez-vous adapter la conférence à notre secteur ?',
              answer:
                "<p>Oui. Après un échange de cadrage de 30 minutes, nous reprenons les exemples de vos métiers. Nous n'avons besoin d'aucun accès à vos outils : nous travaillons sur des cas fictifs ou anonymisés.</p>",
            },
            {
              question: 'Intervenez-vous partout en France ?',
              answer:
                "<p>Oui. Basés dans le Sud-Ouest, nous intervenons partout en France, en présentiel ou à distance. Les frais de déplacement et d'hébergement sont indiqués dès le devis.</p>",
            },
          ],
        },
      ],
    },
    {
      id: 'plus-loin',
      eyebrow: 'Pour aller plus loin',
      title: 'Pages liées',
      blocks: [
        {
          type: 'links',
          items: [
            {
              label: 'Événements, salons et congrès',
              href: routes['Evenements.dc.html'],
              description: 'Keynote, table ronde, animation : la page pour les organisateurs.',
            },
            {
              label: 'Conférences et ateliers pour les entreprises',
              href: routes['Entreprises.dc.html'],
              description: "Formats, sujets et déroulé d'une intervention en entreprise.",
            },
            {
              label: "L'IA au quotidien, la conférence signature",
              href: routes['Conf-ia-au-quotidien.dc.html'],
              description: "La version complète de « Voir clair dans l'IA ».",
            },
            {
              label: 'Espace organisateurs',
              href: routes['Organisateurs.dc.html'],
              description: "Fiche technique, biographies, photos et texte d'annonce.",
            },
            {
              label: "Comment sensibiliser vos équipes à l'IA",
              href: routes['Sat-sensibiliser-equipes-ia.dc.html'],
              description: 'La méthode en 5 étapes, pour prolonger le séminaire.',
            },
            {
              label: "L'IA en cabinet d'expertise comptable",
              href: routes['Sat-experts-comptables.dc.html'],
              description: 'Un exemple de déclinaison par secteur.',
            },
          ],
        },
      ],
    },
  ],

  sources: {
    items: [
      'Arcep, CREDOC, Baromètre du numérique 2026.',
      'BCG, « AI at Work », juin 2026 (enquête déclarative).',
      'La Banque Postale, « IA, fraude et entreprise : la DGSI alerte », février 2026.',
    ],
  },

  cta: {
    eyebrow: 'Votre date',
    title: 'Vérifions notre disponibilité pour votre date.',
    lead: 'Indiquez-nous la date, le lieu et le public attendu. Réponse sous 48 h.',
    primary: { label: 'Proposer une date', href: routes['Contact.dc.html'] },
    secondary: { label: 'Voir la page Événements', href: routes['Evenements.dc.html'] },
  },
};
