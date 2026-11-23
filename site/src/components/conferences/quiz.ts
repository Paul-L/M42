// Moteur des jeux « Arnaque ou pas ? » : état pur, sans DOM.
//
// Utilisé par conferences/ArnaqueOuPasGame.astro (4 messages, « Recommencer » au dernier).
// Prévu pour la page outil /outils/arnaque-ou-pas/ (Sat-test-arnaque-ou-pas.dc.html, 8 situations) :
// même logique (réponse « a » = arnaque / « f » = fiable, résultat par question, score), avec en plus
// un écran de fin (`finished`) et la liste des situations manquées (`missed`).

export type Choice = 'a' | 'f';

export interface QuizState {
  /** Question affichée (0 à total - 1). */
  index: number;
  /** Réponse donnée à la question affichée (null tant qu'on n'a pas répondu). */
  answer: Choice | null;
  /** Résultat de chaque question répondue (true = bonne réponse). */
  results: (boolean | undefined)[];
  /** Écran de fin atteint (test en 8 situations). */
  finished: boolean;
}

export const initialState = (): QuizState => ({
  index: 0,
  answer: null,
  results: [],
  finished: false,
});

/** Bonne réponse ? */
export const isRight = (choice: Choice, scam: boolean): boolean => (choice === 'a') === scam;

/** Enregistre la réponse à la question affichée (ignorée si déjà répondu ou fini). */
export function pick(state: QuizState, choice: Choice, scam: boolean): QuizState {
  if (state.answer !== null || state.finished) return state;
  const results = state.results.slice();
  results[state.index] = isRight(choice, scam);
  return { ...state, answer: choice, results };
}

/** Question suivante ; après la dernière : écran de fin (`finished`). */
export function next(state: QuizState, total: number): QuizState {
  if (state.index >= total - 1) return { ...state, answer: null, finished: true };
  return { ...state, index: state.index + 1, answer: null };
}

/** Nombre de bonnes réponses. */
export const score = (state: QuizState): number => state.results.filter((r) => r === true).length;

/** Indices des questions manquées (dans l'ordre). */
export const missed = (state: QuizState): number[] =>
  state.results.flatMap((r, i) => (r === false ? [i] : []));

/** Dernière question ? */
export const isLast = (state: QuizState, total: number): boolean => state.index === total - 1;
