// Navigation commune (kit/maquette/22_gabarit.html et 21_plan_pages.md).

export type NavKey =
  'conferences' | 'entreprises' | 'collectivites' | 'education' | 'reperes' | 'contact';

export interface NavLink {
  label: string;
  href: string;
}

/** En-tête : liens texte (le lien Contact est un bouton, à part). */
export const headerLinks: (NavLink & { key: Exclude<NavKey, 'contact'> })[] = [
  { key: 'conferences', label: 'Conférences', href: '/conferences/' },
  { key: 'entreprises', label: 'Entreprises', href: '/entreprises/' },
  { key: 'collectivites', label: 'Collectivités', href: '/collectivites/' },
  { key: 'education', label: 'Écoles', href: '/education/' },
  { key: 'reperes', label: 'Repères', href: '/reperes/' },
];

export const headerContact: NavLink = { label: 'Contact', href: '/contact/' };

/** Pied de page : quatre colonnes. */
export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: 'Conférences',
    links: [
      { label: "L'IA au quotidien", href: '/conferences/ia-au-quotidien/' },
      { label: 'Arnaques et IA', href: '/conferences/arnaques-ia/' },
      { label: 'Vrai ou faux ?', href: '/conferences/desinformation-ia/' },
      { label: 'Parents, ados et IA', href: '/conferences/parents-ados-ia/' },
    ],
  },
  {
    title: 'Pour qui',
    links: [
      { label: 'Entreprises', href: '/entreprises/' },
      { label: 'Événements & congrès', href: '/evenements/' },
      { label: 'Collectivités', href: '/collectivites/' },
      { label: 'Écoles & familles', href: '/education/' },
      { label: 'Associations', href: '/associations/' },
    ],
  },
  {
    title: 'M42',
    links: [
      { label: 'Repères', href: '/reperes/' },
      { label: 'À propos', href: '/a-propos/' },
      { label: 'Espace organisateurs', href: '/organisateurs/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Mentions légales', href: '/mentions-legales/' },
      { label: 'Confidentialité', href: '/confidentialite/' },
    ],
  },
];
