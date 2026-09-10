/**
 * Constantes et types du formulaire de contact.
 * Un module « use server » ne peut exporter que des fonctions asynchrones :
 * tout ce qui n’en est pas une vit ici.
 */

export const OBJETS = [
  "Achat / Vente",
  "Famille",
  "Séparation",
  "Succession",
  "Donation",
  "Entreprise",
  "Autre",
] as const;

export type ObjetDemande = (typeof OBJETS)[number];

export interface EtatContact {
  statut: "vide" | "erreur" | "envoye" | "manuel";
  erreurs?: Partial<Record<string, string>>;
  message?: string;
  /** Lien mailto pré-rempli, lorsque l’envoi automatique n’est pas configuré. */
  mailto?: string;
}

export const etatInitial: EtatContact = { statut: "vide" };
