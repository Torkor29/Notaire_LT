import { cache } from "react";
import { actes, categoriesActes } from "@/lib/actes";
import { pagesProjets } from "@/lib/projets";
import { questionsFaq } from "@/lib/faq";
import { listerArticles } from "@/lib/articles";
import { navigation, liensOutils } from "@/lib/site";
import type { EntreeRecherche } from "@/lib/recherche-types";

const PAGES_STATIQUES: EntreeRecherche[] = [
  {
    titre: "L’étude",
    href: "/etude",
    type: "Page",
    extrait:
      "Le droit est technique, la relation ne devrait pas l’être : écouter, expliquer, sécuriser, accompagner.",
    motsCles: "notaire combrit office etude marine le treut philosophie equipe",
  },
  {
    titre: "Actes & expertises",
    href: "/actes",
    type: "Page",
    extrait: "Les actes reçus par l’étude, expliqués un par un.",
    motsCles: "actes expertises fiches immobilier famille transmission entreprise",
  },
  {
    titre: "Biens proposés par l’étude",
    href: "/immobilier",
    type: "Page",
    extrait: "Les biens vendus par la négociation notariale de l’étude.",
    motsCles: "immobilier vente annonces biens maison appartement terrain combrit",
  },
  {
    titre: "Contact",
    href: "/contact",
    type: "Page",
    extrait:
      "1 impasse Saint-Tudy, 29120 Combrit. Écrire, appeler, prendre rendez-vous.",
    motsCles: "contact adresse telephone email rendez vous combrit acces plan",
  },
  ...liensOutils.map((l) => ({
    titre: l.libelle,
    href: l.href,
    type: "Page" as const,
    extrait: l.description ?? "",
    motsCles: "outil parcours checklist documents orientation questions",
  })),
];

/** Index unique, partagé par l’overlay de recherche et la page /recherche. */
export const construireIndexRecherche = cache(
  async (): Promise<EntreeRecherche[]> => {
    const articles = await listerArticles();

    const entreesArticles: EntreeRecherche[] = articles.map((a) => ({
      titre: a.titre,
      href: `/conseils/${a.slug}`,
      type: "Article",
      categorie: a.categorie,
      extrait: a.chapo,
      motsCles: a.motsCles,
    }));

    const entreesActes: EntreeRecherche[] = actes.map((a) => ({
      titre: a.titre,
      href: `/actes/${a.slug}`,
      type: "Acte",
      categorie: categoriesActes.find((c) => c.slug === a.categorie)?.titre,
      extrait: a.resume,
      motsCles: a.motsCles,
    }));

    const entreesProjets: EntreeRecherche[] = pagesProjets.map((p) => ({
      titre: `Vos projets — ${p.libelle}`,
      href: `/vos-projets/${p.slug}`,
      type: "Projet",
      extrait: p.chapo,
      motsCles: `${p.surtitre} ${p.situations.map((s) => s.titre).join(" ")}`,
    }));

    const entreesFaq: EntreeRecherche[] = questionsFaq.map((q) => ({
      titre: q.question,
      href: `/faq#${q.id}`,
      type: "Question",
      categorie: q.categorie,
      extrait: q.reponse[0],
      motsCles: q.categorie,
    }));

    const entreesNav: EntreeRecherche[] = navigation
      .filter((l) => l.description && l.href !== "/")
      .map((l) => ({
        titre: l.libelle,
        href: l.href,
        type: "Page" as const,
        extrait: l.description ?? "",
      }));

    const toutes = [
      ...entreesProjets,
      ...entreesActes,
      ...entreesArticles,
      ...entreesFaq,
      ...PAGES_STATIQUES,
      ...entreesNav,
    ];

    /* Déduplication par URL — les pages de navigation recoupent les autres. */
    const vues = new Set<string>();
    return toutes.filter((e) => {
      if (vues.has(e.href)) return false;
      vues.add(e.href);
      return true;
    });
  },
);
