/**
 * Source unique des informations vérifiées de l’étude.
 *
 * RÈGLE : ne rien ajouter ici qui n’ait pas été communiqué par l’office.
 * Les champs laissés à `null` (horaires, SIREN, CRPCEN, équipe…) sont
 * volontairement absents du site tant qu’ils n’ont pas été fournis.
 */

export const site = {
  nom: "Office notarial Marine Le Treut",
  nomCourt: "Marine Le Treut",
  titulaire: "Maître Marine Le Treut",
  fonction: "Notaire",
  baseline: "Notaire — Combrit",
  adresse: {
    rue: "1 impasse Saint-Tudy",
    codePostal: "29120",
    ville: "Combrit",
    departement: "Finistère",
    region: "Bretagne",
    pays: "France",
    /** Centre approximatif du bourg de Combrit, utilisé uniquement pour cadrer la carte. */
    latitude: 47.8967,
    longitude: -4.1602,
  },
  telephone: "02 79 40 02 12",
  telephoneLien: "+33279400212",
  email: "marine.letreut@notaires.fr",

  /** Informations non communiquées à ce jour — à compléter avant mise en ligne. */
  aCompleter: {
    horaires: null as string[] | null,
    crpcen: null as string | null,
    siren: null as string | null,
    tva: null as string | null,
    assurance: null as string | null,
    hebergeur: null as { nom: string; adresse: string; telephone: string } | null,
  },
} as const;

export const adressePostale = `${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}`;

export const urlSite = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://notaire-letreut-combrit.fr"
).replace(/\/$/, "");

export function url(chemin = "/"): string {
  return `${urlSite}${chemin === "/" ? "" : chemin}`;
}

export type LienNav = {
  libelle: string;
  href: string;
  description?: string;
  enfants?: LienNav[];
};

export const navigation: LienNav[] = [
  { libelle: "Accueil", href: "/" },
  {
    libelle: "L’étude",
    href: "/etude",
    description: "Notre façon de travailler, à Combrit.",
  },
  {
    libelle: "Vos projets",
    href: "/vos-projets",
    description: "Six situations de vie, expliquées simplement.",
    enfants: [
      { libelle: "Immobilier", href: "/vos-projets/immobilier" },
      { libelle: "Couple & famille", href: "/vos-projets/couple-famille" },
      { libelle: "Séparation", href: "/vos-projets/separation" },
      {
        libelle: "Transmission & succession",
        href: "/vos-projets/transmission-succession",
      },
      { libelle: "Entreprise", href: "/vos-projets/entreprise" },
    ],
  },
  {
    libelle: "Actes & expertises",
    href: "/actes",
    description: "Le détail des actes reçus par l’étude.",
  },
  {
    libelle: "Immobilier",
    href: "/immobilier",
    description: "Les biens proposés à la vente par l’étude.",
  },
  {
    libelle: "Conseils & articles",
    href: "/conseils",
    description: "Comprendre avant de décider.",
  },
  {
    libelle: "Contact",
    href: "/contact",
    description: "Parlons de votre projet.",
  },
];

export const liensLegaux: LienNav[] = [
  { libelle: "Mentions légales", href: "/mentions-legales" },
  { libelle: "Politique de confidentialité", href: "/confidentialite" },
  { libelle: "Gestion des cookies", href: "/cookies" },
  { libelle: "Accessibilité", href: "/accessibilite" },
  { libelle: "Plan du site", href: "/plan-du-site" },
];

export const liensOutils: LienNav[] = [
  {
    libelle: "Préparer mon rendez-vous",
    href: "/preparer-mon-rendez-vous",
    description: "La liste des documents à réunir, selon votre projet.",
  },
  {
    libelle: "Mon projet en 60 secondes",
    href: "/mon-projet-en-60-secondes",
    description: "Quelques questions pour trouver la bonne page.",
  },
  {
    libelle: "Questions fréquentes",
    href: "/faq",
    description: "Les réponses aux questions posées le plus souvent.",
  },
];

/** Avertissement affiché partout où un contenu pédagogique pourrait être pris pour un conseil. */
export const avertissementPedagogique =
  "Ces informations sont générales et données à titre pédagogique. Elles ne constituent ni une consultation juridique, ni un conseil adapté à votre situation : seul un rendez-vous permet d’examiner vos actes, vos documents et vos objectifs.";

export const mentionProfessionnelle =
  "Le notaire est un officier public nommé par le garde des Sceaux, ministre de la Justice. Il confère l’authenticité aux actes qu’il reçoit et en assure la conservation. Sa profession est régie par l’ordonnance n° 45-2590 du 2 novembre 1945 et le décret n° 45-0117 du 19 décembre 1945, sous le contrôle du Conseil supérieur du notariat et de la chambre départementale des notaires du Finistère.";
