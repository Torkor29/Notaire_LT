import type { VarianteVisuel } from "@/components/Visuel";

/**
 * BIENS PROPOSÉS PAR L’ÉTUDE
 * --------------------------
 * Aucun bien n’est inventé. Le site est livré avec une liste vide : la page
 * `/immobilier` affiche alors un état vide soigné et propose d’être prévenu.
 *
 * Deux façons d’alimenter cette page :
 *
 * 1. Localement — ajouter des objets `Bien` dans `biensDeLEtude` ci-dessous,
 *    avec les photographies déposées dans `public/images/biens/`.
 *
 * 2. Via une source externe — l’étude peut être reliée à un flux d’annonces
 *    (immonot, une passerelle notariale, un logiciel de rédaction). Il suffit
 *    d’implémenter `SourceBiens` et de la brancher dans `sourceActive`, sans
 *    toucher aux pages.
 *
 * `NEXT_PUBLIC_DEMO_LISTINGS=true` active des annonces de DÉMONSTRATION,
 * explicitement étiquetées comme fictives, pour visualiser l’interface en
 * développement. Cette variable doit rester absente en production.
 */

export type TypeBien =
  | "Maison"
  | "Appartement"
  | "Terrain"
  | "Local professionnel"
  | "Autre";

export type ClasseDpe = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export interface PhotoBien {
  /** Chemin dans `public/`, ou undefined pour utiliser une plaque graphique. */
  src?: string;
  variante?: VarianteVisuel;
  legende?: string;
}

export interface Bien {
  slug: string;
  reference: string;
  titre: string;
  type: TypeBien;
  commune: string;
  codePostal: string;
  /** Prix de vente affiché, honoraires inclus, en euros. */
  prix: number;
  /** Honoraires de négociation : à la charge du vendeur ou de l’acquéreur. */
  honoraires: "vendeur" | "acquereur";
  /** Montant des honoraires TTC lorsqu’ils sont à la charge de l’acquéreur. */
  honorairesMontant?: number;
  /** Prix hors honoraires, obligatoire si les honoraires sont à la charge de l’acquéreur. */
  prixHorsHonoraires?: number;
  surface: number;
  terrain?: number;
  pieces: number;
  chambres: number;
  dpe?: { classe: ClasseDpe; ges: ClasseDpe; coutMin?: number; coutMax?: number; anneeReference?: string };
  /** Copropriété : mentions obligatoires des annonces. */
  copropriete?: {
    lots: number;
    chargesAnnuelles: number;
    procedureEnCours: boolean;
  };
  description: string[];
  atouts: string[];
  photos: PhotoBien[];
  latitude?: number;
  longitude?: number;
  /** Annonce de démonstration : jamais affichée en production. */
  demonstration?: boolean;
}

/** Biens réellement proposés par l’étude. Vide tant qu’aucun mandat n’est publié. */
export const biensDeLEtude: Bien[] = [];

/* -------------------------------------------------------------------------- */
/*  Jeu de démonstration — visible uniquement si NEXT_PUBLIC_DEMO_LISTINGS      */
/* -------------------------------------------------------------------------- */

const biensDemonstration: Bien[] = [
  {
    slug: "exemple-maison-bourg",
    reference: "EXEMPLE-001",
    titre: "Exemple de fiche — maison de bourg",
    type: "Maison",
    commune: "Commune d’exemple",
    codePostal: "29120",
    prix: 100000,
    honoraires: "vendeur",
    surface: 100,
    terrain: 500,
    pieces: 4,
    chambres: 3,
    dpe: { classe: "D", ges: "B" },
    description: [
      "Cette annonce est un exemple de démonstration. Elle ne correspond à aucun bien réel et n’est affichée que pour visualiser la mise en page de la fiche détaillée.",
      "Les chiffres, la localisation et le descriptif sont volontairement neutres. Toute annonce réelle publiée par l’étude comportera les mentions obligatoires exactes.",
    ],
    atouts: [
      "Exemple d’atout affiché en liste",
      "Exemple d’atout affiché en liste",
      "Exemple d’atout affiché en liste",
    ],
    photos: [
      { variante: "facade", legende: "Visuel de démonstration" },
      { variante: "granit", legende: "Visuel de démonstration" },
      { variante: "dune", legende: "Visuel de démonstration" },
    ],
    demonstration: true,
  },
  {
    slug: "exemple-appartement-littoral",
    reference: "EXEMPLE-002",
    titre: "Exemple de fiche — appartement en copropriété",
    type: "Appartement",
    commune: "Commune d’exemple",
    codePostal: "29120",
    prix: 100000,
    prixHorsHonoraires: 95000,
    honoraires: "acquereur",
    honorairesMontant: 5000,
    surface: 60,
    pieces: 3,
    chambres: 2,
    dpe: { classe: "C", ges: "A" },
    copropriete: { lots: 20, chargesAnnuelles: 1200, procedureEnCours: false },
    description: [
      "Cette annonce est un exemple de démonstration. Elle ne correspond à aucun bien réel et sert uniquement à illustrer l’affichage des mentions obligatoires propres à la copropriété.",
    ],
    atouts: ["Exemple d’atout", "Exemple d’atout"],
    photos: [
      { variante: "horizon", legende: "Visuel de démonstration" },
      { variante: "seuil", legende: "Visuel de démonstration" },
    ],
    demonstration: true,
  },
];

/* -------------------------------------------------------------------------- */
/*  Source de données                                                          */
/* -------------------------------------------------------------------------- */

export interface SourceBiens {
  lister(): Promise<Bien[]>;
  parSlug(slug: string): Promise<Bien | null>;
}

export const demonstrationActive =
  process.env.NEXT_PUBLIC_DEMO_LISTINGS === "true";

const sourceLocale: SourceBiens = {
  async lister() {
    return demonstrationActive
      ? [...biensDeLEtude, ...biensDemonstration]
      : biensDeLEtude;
  },
  async parSlug(slug) {
    const tous = await this.lister();
    return tous.find((b) => b.slug === slug) ?? null;
  },
};

/**
 * Point de branchement unique. Pour connecter un flux externe, remplacer
 * `sourceLocale` par une implémentation qui interroge l’API concernée.
 */
export const sourceActive: SourceBiens = sourceLocale;

export async function listerBiens(): Promise<Bien[]> {
  return sourceActive.lister();
}

export async function bienParSlug(slug: string): Promise<Bien | null> {
  return sourceActive.parSlug(slug);
}

/* -------------------------------------------------------------------------- */
/*  Filtres                                                                    */
/* -------------------------------------------------------------------------- */

export interface FiltresBiens {
  type?: TypeBien | "tous";
  commune?: string | "toutes";
  budgetMax?: number;
  surfaceMin?: number;
  chambresMin?: number;
}

export function filtrer(biens: Bien[], filtres: FiltresBiens): Bien[] {
  return biens.filter((b) => {
    if (filtres.type && filtres.type !== "tous" && b.type !== filtres.type)
      return false;
    if (
      filtres.commune &&
      filtres.commune !== "toutes" &&
      b.commune !== filtres.commune
    )
      return false;
    if (filtres.budgetMax && b.prix > filtres.budgetMax) return false;
    if (filtres.surfaceMin && b.surface < filtres.surfaceMin) return false;
    if (filtres.chambresMin && b.chambres < filtres.chambresMin) return false;
    return true;
  });
}

export const typesBien: TypeBien[] = [
  "Maison",
  "Appartement",
  "Terrain",
  "Local professionnel",
  "Autre",
];

export const classesDpe: ClasseDpe[] = ["A", "B", "C", "D", "E", "F", "G"];
