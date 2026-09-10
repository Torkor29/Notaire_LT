import { normaliser } from "@/lib/utils";
import type { EntreeRecherche, ResultatRecherche } from "@/lib/recherche-types";

/**
 * Moteur de recherche transversal : titres, extraits, synonymes.
 * Volontairement simple (quelques dizaines d’entrées) mais tolérant :
 * accents ignorés, correspondance par préfixe, tous les mots doivent
 * être trouvés quelque part dans la fiche.
 */
export function chercher(
  requete: string,
  index: EntreeRecherche[],
  limite = 12,
): ResultatRecherche[] {
  const q = normaliser(requete);
  if (q.length < 2) return [];

  const termes = q.split(" ").filter((t) => t.length > 1);
  if (termes.length === 0) return [];

  const poidsType: Record<string, number> = {
    Projet: 3,
    Acte: 2,
    Article: 2,
    Question: 1,
    Page: 1,
  };

  const resultats: ResultatRecherche[] = [];

  for (const entree of index) {
    const titre = normaliser(entree.titre);
    const cles = normaliser(
      `${entree.motsCles ?? ""} ${entree.categorie ?? ""}`,
    );
    const extrait = normaliser(entree.extrait);
    const tout = `${titre} ${cles} ${extrait}`;

    let score = 0;
    let tousTrouves = true;

    for (const terme of termes) {
      let pointsTerme = 0;
      if (titre === terme) pointsTerme += 60;
      if (titre.startsWith(terme)) pointsTerme += 26;
      if (new RegExp(`\\b${echapper(terme)}`).test(titre)) pointsTerme += 20;
      else if (titre.includes(terme)) pointsTerme += 10;
      if (new RegExp(`\\b${echapper(terme)}`).test(cles)) pointsTerme += 12;
      else if (cles.includes(terme)) pointsTerme += 6;
      if (extrait.includes(terme)) pointsTerme += 4;

      if (pointsTerme === 0 && !tout.includes(terme)) tousTrouves = false;
      score += pointsTerme;
    }

    if (!tousTrouves || score === 0) continue;
    score += poidsType[entree.type] ?? 0;
    resultats.push({ ...entree, score });
  }

  return resultats.sort((a, b) => b.score - a.score).slice(0, limite);
}

function echapper(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
