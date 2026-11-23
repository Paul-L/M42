/**
 * Envoi des formulaires publics vers Directus (côté navigateur).
 * Directus est hébergé par M42 (cms.m42.guide) : aucune ressource tierce.
 * Le flow « Formulaires : contrôle » vérifie le champ piège (`site_web`), le délai minimal
 * de saisie (`delai_ms`, mesuré depuis l'affichage de la page) et chaque champ ; la limite
 * de débit est celle de Directus.
 */

const CMS = import.meta.env.PUBLIC_DIRECTUS_URL as string | undefined;
const debut = performance.now();

export type CollectionFormulaire = 'demandes_contact' | 'inscriptions_lettre';

/** Message affiché si l'envoi échoue (réseau, refus du serveur). */
export const MESSAGE_ECHEC =
  "L'envoi n'a pas abouti. Réessayez dans un instant, ou écrivez-nous à clara@m42.guide.";

/** Envoie les champs ; lève une erreur si Directus refuse ou ne répond pas. */
export async function envoyer(
  collection: CollectionFormulaire,
  champs: Record<string, unknown>,
): Promise<void> {
  if (!CMS) throw new Error('PUBLIC_DIRECTUS_URL absent du build.');
  const r = await fetch(`${CMS}/items/${collection}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'omit',
    body: JSON.stringify({ ...champs, delai_ms: Math.round(performance.now() - debut) }),
  });
  if (!r.ok) throw new Error(`Envoi refusé (${r.status}).`);
}

/** Champs texte d'un formulaire (FormData → objet). */
export function champs(data: FormData): Record<string, string> {
  const o: Record<string, string> = {};
  for (const [k, v] of data.entries()) if (typeof v === 'string') o[k] = v;
  return o;
}

/** Affiche ou masque le message d'échec ; bloque le bouton pendant l'envoi. */
export function etatEnvoi(form: HTMLFormElement, etat: 'envoi' | 'echec' | 'ok'): void {
  const erreur = form.querySelector<HTMLElement>('[data-send-error]');
  const bouton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (bouton) {
    bouton.disabled = etat === 'envoi';
    bouton.setAttribute('aria-busy', String(etat === 'envoi'));
  }
  if (erreur) erreur.hidden = etat !== 'echec';
}
