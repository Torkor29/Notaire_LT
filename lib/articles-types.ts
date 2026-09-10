import type { VarianteVisuel } from "@/components/Visuel";

/**
 * Types et constantes des articles — sans dépendance au système de fichiers,
 * afin de pouvoir être importés depuis un composant client.
 * La lecture des fichiers markdown vit dans `lib/articles.ts` (serveur seul).
 */

export type CategorieArticle =
  | "Immobilier"
  | "Couple"
  | "Séparation"
  | "Famille"
  | "Succession"
  | "Patrimoine"
  | "Entreprise";

export const categoriesArticles: CategorieArticle[] = [
  "Immobilier",
  "Couple",
  "Séparation",
  "Famille",
  "Succession",
  "Patrimoine",
  "Entreprise",
];

export interface EnTeteArticle {
  titre: string;
  chapo: string;
  description: string;
  categorie: CategorieArticle;
  publication: string;
  miseAJour: string;
  visuel: VarianteVisuel;
  motsCles?: string;
  faq?: { q: string; r: string }[];
  actes?: string[];
  articles?: string[];
  aLaUne?: boolean;
}

export interface Article extends EnTeteArticle {
  slug: string;
  html: string;
  sommaire: { id: string; titre: string }[];
  minutes: number;
}

export interface ApercuArticle extends EnTeteArticle {
  slug: string;
  minutes: number;
}
