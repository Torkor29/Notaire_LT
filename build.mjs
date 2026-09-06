/*
 * Rassemble les fiches de content/ en deux fichiers que le site sait lire.
 *
 *   content/annonces/*.json  ->  assets/data/annonces.json
 *   content/offres/*.json    ->  assets/data/offres.json
 *
 * L'interface de gestion écrit une fiche par fichier, ce qui lui permet de
 * proposer l'ajout, la modification et la suppression bien par bien. Le site
 * public, lui, n'a qu'un seul fichier à charger.
 *
 * Lancé automatiquement à chaque mise en ligne (voir netlify.toml).
 * En local : node build.mjs
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = dirname(fileURLToPath(import.meta.url));

const collections = [
  { nom: 'annonces', source: 'content/annonces', cible: 'assets/data/annonces.json' },
  { nom: 'offres', source: 'content/offres', cible: 'assets/data/offres.json' }
];

for (const { nom, source, cible } of collections) {
  const dossier = join(racine, source);
  let fichiers = [];

  try {
    fichiers = (await readdir(dossier)).filter((f) => f.endsWith('.json')).sort();
  } catch {
    console.warn(`· ${source} absent, ${nom} sera vide`);
  }

  const fiches = [];
  for (const fichier of fichiers) {
    const brut = await readFile(join(dossier, fichier), 'utf8');
    try {
      fiches.push(nettoyer(JSON.parse(brut)));
    } catch (e) {
      throw new Error(`${source}/${fichier} : JSON invalide — ${e.message}`);
    }
  }

  await mkdir(join(racine, 'assets/data'), { recursive: true });
  await writeFile(
    join(racine, cible),
    JSON.stringify({ [nom]: fiches }, null, 2) + '\n',
    'utf8'
  );
  console.log(`✓ ${cible} — ${fiches.length} fiche(s)`);
}

/* Retire les champs vides pour garder des fichiers lisibles, et normalise le
   chemin des photos écrit par l'interface de gestion (/assets/img/x.jpg). */
function nettoyer(fiche) {
  const propre = {};
  for (const [cle, valeur] of Object.entries(fiche)) {
    if (valeur === '' || valeur === null || valeur === undefined) continue;
    if (Array.isArray(valeur) && valeur.length === 0) continue;
    propre[cle] = cle === 'photo' && typeof valeur === 'string'
      ? valeur.replace(/^\//, '')
      : valeur;
  }
  return propre;
}
