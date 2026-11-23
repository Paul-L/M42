/**
 * Outils communs aux scripts d'administration de Directus (schéma, rôles, seed).
 * Lit cms/.env (jamais affiché), se connecte avec le compte administrateur
 * et expose un petit client REST.
 *
 * Variables lues : ADMIN_EMAIL, ADMIN_PASSWORD, DIRECTUS_PORT ; CMS_URL pour viser
 * une autre instance (préproduction, production).
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const CMS_DIR = join(import.meta.dirname, '..');
export const SITE_DIR = join(CMS_DIR, '..', 'site');

const envFile = join(CMS_DIR, '.env');
if (existsSync(envFile)) process.loadEnvFile(envFile);

export const CMS_URL =
  process.env.CMS_URL ?? `http://localhost:${process.env.DIRECTUS_PORT ?? 8055}`;

let jeton: string | undefined;

export async function connecter(): Promise<void> {
  const { ADMIN_EMAIL: email, ADMIN_PASSWORD: password } = process.env;
  if (!email || !password) throw new Error('ADMIN_EMAIL et ADMIN_PASSWORD manquants (cms/.env).');
  const r = await fetch(`${CMS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!r.ok) throw new Error(`Connexion à ${CMS_URL} impossible (${r.status}).`);
  jeton = ((await r.json()) as { data: { access_token: string } }).data.access_token;
}

export class ErreurApi extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

/** Appel REST authentifié ; renvoie `data` (ou null pour une réponse vide). */
export async function api<T = unknown>(
  methode: string,
  chemin: string,
  corps?: unknown,
): Promise<T> {
  if (!jeton) await connecter();
  const r = await fetch(`${CMS_URL}${chemin}`, {
    method: methode,
    headers: {
      authorization: `Bearer ${jeton}`,
      'content-type': 'application/json',
    },
    body: corps === undefined ? undefined : JSON.stringify(corps),
  });
  if (r.status === 204) return null as T;
  const json = (await r.json().catch(() => ({}))) as {
    data?: T;
    errors?: { message: string }[];
  };
  if (!r.ok) {
    const msg = json.errors?.map((e) => e.message).join(' ; ') ?? r.statusText;
    throw new ErreurApi(`${methode} ${chemin} : ${r.status} ${msg}`, r.status);
  }
  return json.data as T;
}

/** GET qui renvoie null au lieu d'une erreur 403/404 (élément absent). */
export async function lire<T = unknown>(chemin: string): Promise<T | null> {
  try {
    return await api<T>('GET', chemin);
  } catch (e) {
    if (e instanceof ErreurApi && (e.status === 403 || e.status === 404)) return null;
    throw e;
  }
}

/** Écrit (ou remplace) une variable dans un fichier .env sans toucher aux autres lignes. */
export function ecrireEnv(fichier: string, cle: string, valeur: string): void {
  const lignes = existsSync(fichier) ? readFileSync(fichier, 'utf8').split('\n') : [];
  const i = lignes.findIndex((l) => l.startsWith(`${cle}=`));
  if (i >= 0) lignes[i] = `${cle}=${valeur}`;
  else {
    if (lignes.length && lignes.at(-1) === '') lignes.pop();
    lignes.push(`${cle}=${valeur}`, '');
  }
  writeFileSync(fichier, lignes.join('\n'));
}
