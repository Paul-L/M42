#!/usr/bin/env node
// Garde-fou déterministe : bloque toute écriture contenant un mot interdit
// (noms à ne jamais publier). La liste est locale et non versionnée :
// .claude/regles-interdites.local.txt — un mot ou une expression par ligne, # pour commenter.
import { readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const listPath = join(root, '.claude', 'regles-interdites.local.txt');

let input = '';
try { input = readFileSync(0, 'utf8'); } catch { process.exit(0); }
let data;
try { data = JSON.parse(input); } catch { process.exit(0); }

const ti = data.tool_input || {};
const file = ti.file_path ? relative(root, ti.file_path) : '';

// Fichiers exemptés : la liste elle-même, la config Claude, le kit (lecture seule de toute façon).
if (file.startsWith('.claude/') || file.startsWith('kit/')) process.exit(0);

if (!existsSync(listPath)) {
  process.stderr.write(`Garde-fou : liste ${relative(root, listPath)} absente. Crée-la avant d'écrire du contenu.\n`);
  process.exit(2);
}

const terms = readFileSync(listPath, 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'));

const texts = [ti.content, ti.new_string, ...(Array.isArray(ti.edits) ? ti.edits.map((e) => e.new_string) : [])]
  .filter((t) => typeof t === 'string');

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const hay = norm(texts.join('\n'));
const hits = terms.filter((t) => hay.includes(norm(t)));

if (hits.length) {
  process.stderr.write(
    `Écriture bloquée dans ${file || 'un fichier'} : ${hits.length} terme(s) interdit(s) détecté(s) ` +
    `(voir .claude/regles-interdites.local.txt). Reformule sans ces noms : règle absolue du projet.\n`
  );
  process.exit(2);
}
process.exit(0);
