export type TypeEntree =
  | "Article"
  | "Acte"
  | "Projet"
  | "Page"
  | "Question";

export interface EntreeRecherche {
  titre: string;
  href: string;
  type: TypeEntree;
  categorie?: string;
  extrait: string;
  /** Termes additionnels (synonymes, mots du langage courant). */
  motsCles?: string;
}

export interface ResultatRecherche extends EntreeRecherche {
  score: number;
}
