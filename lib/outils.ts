/* -------------------------------------------------------------------------- */
/*  « Préparer mon rendez-vous » — Mon projet → Ma situation → Mes documents   */
/* -------------------------------------------------------------------------- */

export interface SituationPreparation {
  id: string;
  titre: string;
  documents: string[];
  remarque?: string;
}

export interface ProjetPreparation {
  id: string;
  titre: string;
  description: string;
  documentsCommuns: string[];
  situations: SituationPreparation[];
  page: string;
}

const IDENTITE = [
  "Pièce d’identité en cours de validité de chaque personne concernée",
  "Livret de famille",
  "Justificatif de domicile de moins de trois mois",
];

export const projetsPreparation: ProjetPreparation[] = [
  {
    id: "achat",
    titre: "J’achète un bien",
    description: "Maison, appartement, terrain, résidence secondaire.",
    page: "/vos-projets/immobilier",
    documentsCommuns: [
      ...IDENTITE,
      "Annonce ou descriptif complet du bien visé",
      "Justificatif de l’origine de votre apport (épargne, donation, vente d’un bien)",
      "Simulation ou accord de principe de votre banque",
    ],
    situations: [
      {
        id: "seul",
        titre: "J’achète seul",
        documents: ["Deux derniers avis d’imposition"],
      },
      {
        id: "couple-marie",
        titre: "Nous sommes mariés",
        documents: [
          "Contrat de mariage, ou attestation d’absence de contrat",
          "Justificatifs des fonds propres à réemployer, le cas échéant",
        ],
        remarque:
          "Si l’un de vous finance l’achat avec des fonds reçus par donation ou succession, signalez-le : une clause de remploi peut être nécessaire.",
      },
      {
        id: "couple-pacse",
        titre: "Nous sommes pacsés",
        documents: [
          "Convention de PACS et attestation d’enregistrement",
          "Justificatifs des apports de chacun",
        ],
      },
      {
        id: "couple-concubins",
        titre: "Nous vivons ensemble sans être mariés ni pacsés",
        documents: [
          "Justificatifs précis des apports de chacun",
          "Le cas échéant, projet de répartition des quotes-parts",
        ],
        remarque:
          "C’est la situation qui demande le plus de précision : la quote-part écrite dans l’acte l’emportera sur les sommes réellement versées.",
      },
      {
        id: "societe",
        titre: "J’achète via une société",
        documents: [
          "Statuts à jour et extrait Kbis",
          "Procès-verbal autorisant l’acquisition",
          "Identité du gérant et des associés",
        ],
      },
    ],
  },
  {
    id: "vente",
    titre: "Je vends un bien",
    description: "Mise en vente, avant-contrat, signature.",
    page: "/vos-projets/immobilier",
    documentsCommuns: [
      ...IDENTITE,
      "Titre de propriété du bien",
      "Dernier avis de taxe foncière",
      "Dossier de diagnostics techniques",
    ],
    situations: [
      {
        id: "maison",
        titre: "Une maison ou un terrain",
        documents: [
          "Autorisations d’urbanisme obtenues (permis, déclaration préalable)",
          "Factures et attestations d’assurance décennale des travaux récents",
          "Contrôle de l’assainissement non collectif s’il y a lieu",
        ],
      },
      {
        id: "copropriete",
        titre: "Un bien en copropriété",
        documents: [
          "Règlement de copropriété et état descriptif de division",
          "Procès-verbaux des trois dernières assemblées générales",
          "Derniers appels de fonds et coordonnées du syndic",
          "Diagnostic de surface habitable (loi Carrez)",
        ],
      },
      {
        id: "herite",
        titre: "Un bien reçu par succession ou donation",
        documents: [
          "Acte de notoriété ou attestation de propriété immobilière",
          "Accord écrit des autres héritiers ou indivisaires",
        ],
        remarque:
          "Si la succession n’est pas encore réglée, prévenez l’étude dès le premier contact : cela conditionne le calendrier.",
      },
      {
        id: "credit",
        titre: "Un bien encore financé par un prêt",
        documents: [
          "Tableau d’amortissement et décompte de remboursement anticipé",
          "Coordonnées de la banque et référence du prêt",
        ],
      },
    ],
  },
  {
    id: "couple",
    titre: "Je me marie ou je me pacse",
    description: "Contrat de mariage, PACS, protection du conjoint.",
    page: "/vos-projets/couple-famille",
    documentsCommuns: [
      ...IDENTITE,
      "Date et lieu prévus pour la célébration ou l’enregistrement",
    ],
    situations: [
      {
        id: "mariage",
        titre: "Nous préparons un contrat de mariage",
        documents: [
          "Liste des biens et dettes de chacun avant l’union",
          "Éléments sur vos activités professionnelles",
          "Titres de propriété des biens détenus",
        ],
      },
      {
        id: "pacs",
        titre: "Nous concluons un PACS",
        documents: [
          "Actes de naissance de moins de trois mois",
          "Le cas échéant, jugement de divorce ou acte de décès du précédent conjoint",
        ],
      },
      {
        id: "changement",
        titre: "Nous voulons changer de régime matrimonial",
        documents: [
          "Contrat de mariage actuel",
          "Titres de propriété et justificatifs des biens propres",
          "Coordonnées de vos enfants majeurs",
        ],
      },
      {
        id: "protection",
        titre: "Nous souhaitons protéger le conjoint survivant",
        documents: [
          "Composition précise de la famille, y compris enfants d’une première union",
          "Contrats d’assurance-vie et clauses bénéficiaires",
        ],
      },
    ],
  },
  {
    id: "separation",
    titre: "Nous nous séparons",
    description: "Divorce, rupture de PACS, fin de vie commune.",
    page: "/vos-projets/separation",
    documentsCommuns: [
      ...IDENTITE,
      "Titre de propriété du ou des biens détenus ensemble",
      "Estimation récente de ces biens",
      "Tableau d’amortissement des prêts en cours",
    ],
    situations: [
      {
        id: "maries",
        titre: "Nous étions mariés",
        documents: [
          "Contrat de mariage, ou attestation d’absence de contrat",
          "Justificatifs des biens reçus par donation ou succession",
          "Relevés d’épargne, contrats d’assurance-vie, parts de société",
          "Coordonnées de vos avocats",
        ],
      },
      {
        id: "pacses",
        titre: "Nous étions pacsés",
        documents: [
          "Convention de PACS",
          "Justificatifs des versements effectués par chacun",
        ],
      },
      {
        id: "concubins",
        titre: "Nous vivions ensemble sans être mariés ni pacsés",
        documents: [
          "Relevés bancaires justifiant les apports et remboursements de chacun",
          "Factures des travaux financés par l’un ou par l’autre",
        ],
        remarque:
          "Rassemblez les preuves de paiement : en l’absence de régime légal, elles sont déterminantes.",
      },
      {
        id: "rachat",
        titre: "L’un de nous rachète la part de l’autre",
        documents: [
          "Accord de principe de la banque sur la reprise du prêt",
          "Estimation du bien par un professionnel",
        ],
      },
    ],
  },
  {
    id: "transmission",
    titre: "Je prépare une transmission",
    description: "Donation, testament, organisation patrimoniale.",
    page: "/vos-projets/transmission-succession",
    documentsCommuns: [
      ...IDENTITE,
      "Contrat de mariage éventuel",
      "Liste et dates des donations déjà consenties",
    ],
    situations: [
      {
        id: "donation",
        titre: "Je souhaite faire une donation",
        documents: [
          "Titre de propriété du bien donné, ou relevé des avoirs concernés",
          "Identité complète du ou des bénéficiaires",
          "Estimation du bien ou éléments de comparaison",
        ],
      },
      {
        id: "testament",
        titre: "Je veux rédiger un testament",
        documents: [
          "Composition de la famille et coordonnées des personnes à gratifier",
          "Inventaire sommaire de votre patrimoine",
          "Testament antérieur s’il en existe un",
        ],
      },
      {
        id: "bilan",
        titre: "Je veux faire le point sur mon patrimoine",
        documents: [
          "Ensemble des titres de propriété",
          "Relevés d’épargne et contrats d’assurance-vie",
          "Statuts et derniers bilans des sociétés détenues",
        ],
      },
    ],
  },
  {
    id: "succession",
    titre: "Un proche est décédé",
    description: "Ouverture et règlement de la succession.",
    page: "/vos-projets/transmission-succession",
    documentsCommuns: [
      "Acte de décès",
      "Livret de famille du défunt",
      "Pièce d’identité de chaque héritier",
      "Coordonnées complètes de tous les héritiers",
    ],
    situations: [
      {
        id: "immobilier",
        titre: "La succession comprend un bien immobilier",
        documents: [
          "Titres de propriété et derniers avis de taxe foncière",
          "Contrat d’assurance habitation en cours",
        ],
      },
      {
        id: "comptes",
        titre: "Il faut débloquer des comptes bancaires",
        documents: [
          "Relevés de comptes et de placements à la date du décès",
          "Contrats d’assurance-vie et clauses bénéficiaires",
          "Factures d’obsèques",
        ],
      },
      {
        id: "dettes",
        titre: "Le patrimoine comporte des dettes",
        documents: [
          "Justificatifs des dettes et échéanciers",
          "Courriers de créanciers reçus depuis le décès",
        ],
        remarque:
          "Ne réglez aucune dette avant d’avoir fait le point : votre option successorale — accepter, accepter à concurrence de l’actif net ou renoncer — doit rester ouverte.",
      },
      {
        id: "entreprise",
        titre: "Le défunt dirigeait une entreprise",
        documents: [
          "Statuts, derniers bilans et organigramme",
          "Pactes d’associés ou engagements de conservation",
        ],
      },
    ],
  },
  {
    id: "entreprise",
    titre: "J’ai un projet d’entreprise",
    description: "Création, reprise, cession, transmission.",
    page: "/vos-projets/entreprise",
    documentsCommuns: [
      ...IDENTITE,
      "Contrat de mariage du dirigeant",
      "Description du projet et calendrier envisagé",
    ],
    situations: [
      {
        id: "creation",
        titre: "Je crée une société",
        documents: [
          "Projet de statuts s’il existe",
          "Prévisionnel et plan de financement",
          "Titres des biens éventuellement apportés",
        ],
      },
      {
        id: "reprise",
        titre: "Je reprends une entreprise",
        documents: [
          "Trois derniers bilans de la cible",
          "Bail commercial et avenants",
          "Extrait Kbis et statuts à jour",
        ],
      },
      {
        id: "cession",
        titre: "Je cède mon entreprise",
        documents: [
          "Statuts, bilans et comptes annuels",
          "Titres de propriété des locaux professionnels",
          "Lettre d’intention du repreneur s’il y en a une",
        ],
      },
      {
        id: "murs",
        titre: "Je m’interroge sur mes murs professionnels",
        documents: [
          "Titre de propriété des locaux",
          "Bail en cours et conditions financières",
          "Engagements de caution personnels",
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  « Mon projet en 60 secondes »                                              */
/* -------------------------------------------------------------------------- */

export interface OptionOrientation {
  id: string;
  libelle: string;
  /** Pages recommandées, dans l’ordre de pertinence. */
  destinations: { titre: string; href: string; raison: string }[];
}

export interface EtapeOrientation {
  id: string;
  question: string;
  aide?: string;
  options: OptionOrientation[];
}

export const etapesOrientation: EtapeOrientation[] = [
  {
    id: "sujet",
    question: "Qu’est-ce qui vous amène aujourd’hui ?",
    aide: "Une seule réponse : vous pourrez recommencer le parcours autant de fois que nécessaire.",
    options: [
      {
        id: "immobilier",
        libelle: "Un projet immobilier",
        destinations: [
          {
            titre: "Vos projets — Immobilier",
            href: "/vos-projets/immobilier",
            raison: "Les étapes, du premier contact à la remise des clés.",
          },
          {
            titre: "Acheter une maison : les étapes",
            href: "/conseils/acheter-maison-etapes-remise-des-cles",
            raison: "Le déroulé complet, avec les délais habituels.",
          },
          {
            titre: "Promesse et compromis de vente",
            href: "/actes/promesse-et-compromis-de-vente",
            raison: "L’acte qui engage réellement les parties.",
          },
        ],
      },
      {
        id: "couple",
        libelle: "Une union : mariage ou PACS",
        destinations: [
          {
            titre: "Vos projets — Couple & famille",
            href: "/vos-projets/couple-famille",
            raison: "Les régimes matrimoniaux expliqués simplement.",
          },
          {
            titre: "Contrat de mariage",
            href: "/actes/contrat-de-mariage",
            raison: "Ce qu’il permet, et quand le signer.",
          },
          {
            titre: "PACS",
            href: "/actes/pacs",
            raison: "Ce que le PACS prévoit — et ce qu’il ne prévoit pas.",
          },
        ],
      },
      {
        id: "separation",
        libelle: "Une séparation",
        destinations: [
          {
            titre: "Dossier séparation",
            href: "/vos-projets/separation",
            raison: "Trois statuts, trois logiques patrimoniales.",
          },
          {
            titre: "Divorce et maison commune",
            href: "/conseils/divorce-maison-commune",
            raison: "Vendre, racheter, ou attendre : les options réelles.",
          },
          {
            titre: "Liquidation et partage",
            href: "/actes/liquidation-et-partage",
            raison: "Comment les comptes entre vous sont établis.",
          },
        ],
      },
      {
        id: "transmission",
        libelle: "Une transmission ou une succession",
        destinations: [
          {
            titre: "Vos projets — Transmission & succession",
            href: "/vos-projets/transmission-succession",
            raison: "Donner, léguer, régler : la vue d’ensemble.",
          },
          {
            titre: "Comment se déroule une succession",
            href: "/conseils/comment-se-deroule-une-succession",
            raison: "Les quatre temps du règlement, et les délais.",
          },
          {
            titre: "Donation-partage",
            href: "/actes/donation-partage",
            raison: "L’outil d’équité entre plusieurs enfants.",
          },
        ],
      },
      {
        id: "entreprise",
        libelle: "Un projet d’entreprise",
        destinations: [
          {
            titre: "Vos projets — Entreprise",
            href: "/vos-projets/entreprise",
            raison: "Ce que l’entreprise change au patrimoine privé.",
          },
          {
            titre: "Organisation patrimoniale du dirigeant",
            href: "/actes/organisation-patrimoniale-du-dirigeant",
            raison: "Cloisonner les risques, préparer la sortie.",
          },
          {
            titre: "SCI : dans quels cas est-elle utile ?",
            href: "/conseils/sci-dans-quels-cas-utile",
            raison: "Un outil pertinent — dans certains cas seulement.",
          },
        ],
      },
    ],
  },
  {
    id: "moment",
    question: "Où en êtes-vous ?",
    options: [
      {
        id: "reflexion",
        libelle: "J’y réfléchis, rien n’est engagé",
        destinations: [
          {
            titre: "Conseils & articles",
            href: "/conseils",
            raison: "Comprendre avant de décider, sans engagement.",
          },
          {
            titre: "Questions fréquentes",
            href: "/faq",
            raison: "Les réponses aux questions les plus posées.",
          },
        ],
      },
      {
        id: "bientot",
        libelle: "C’est pour les prochaines semaines",
        destinations: [
          {
            titre: "Préparer mon rendez-vous",
            href: "/preparer-mon-rendez-vous",
            raison: "La liste des documents à réunir dès maintenant.",
          },
          {
            titre: "Actes & expertises",
            href: "/actes",
            raison: "Le détail de l’acte qui vous concerne.",
          },
        ],
      },
      {
        id: "urgent",
        libelle: "C’est en cours, j’ai besoin d’un interlocuteur",
        destinations: [
          {
            titre: "Contacter l’étude",
            href: "/contact",
            raison: "Décrivez votre situation, l’étude vous rappelle.",
          },
          {
            titre: "Prendre rendez-vous",
            href: "/contact#rendez-vous",
            raison: "Un rendez-vous à Combrit, en visioconférence ou par téléphone.",
          },
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  « Quelle est votre situation ? » — outil pédagogique du dossier séparation  */
/* -------------------------------------------------------------------------- */

export const statutsSeparation = [
  {
    id: "maries",
    libelle: "Mariés",
    detail:
      "Un régime matrimonial s’applique et devra être liquidé, avec ou sans contrat.",
  },
  {
    id: "pacses",
    libelle: "Pacsés",
    detail:
      "La rupture du PACS est simple ; le partage du patrimoine suit ses propres règles.",
  },
  {
    id: "concubins",
    libelle: "Concubins",
    detail:
      "Aucun régime patrimonial n’est prévu par la loi : seuls les actes comptent.",
  },
] as const;

export const patrimoinesSeparation = [
  {
    id: "ensemble",
    libelle: "Propriétaires ensemble",
    detail: "Un logement acheté à deux, quelle que soit la répartition.",
  },
  {
    id: "un-seul",
    libelle: "Un seul propriétaire",
    detail: "Le bien est au nom d’un seul, mais les deux y ont vécu.",
  },
  {
    id: "plusieurs",
    libelle: "Plusieurs biens",
    detail: "Résidence principale, locatif, terrain, parts de société.",
  },
] as const;

export type StatutSeparation = (typeof statutsSeparation)[number]["id"];
export type PatrimoineSeparation = (typeof patrimoinesSeparation)[number]["id"];

export interface ResultatSeparation {
  titre: string;
  sujets: { titre: string; texte: string }[];
  actes: string[];
}

export const resultatsSeparation: Record<
  string,
  ResultatSeparation
> = {
  "maries|ensemble": {
    titre: "Un régime matrimonial à liquider, un logement à partager",
    sujets: [
      {
        titre: "Le régime matrimonial d’abord",
        texte:
          "Avec ou sans contrat, il faut déterminer ce qui est propre à chacun et ce qui est commun. Sans contrat, le logement acheté pendant le mariage est commun, même s’il n’est financé que par l’un.",
      },
      {
        titre: "Les récompenses",
        texte:
          "Si des fonds propres — une donation, un héritage, une épargne antérieure au mariage — ont financé un bien commun, une récompense est due. Elle se calcule sur la valeur actuelle du bien, non sur la somme versée.",
      },
      {
        titre: "Vendre ou racheter",
        texte:
          "Attribuer le logement à l’un suppose de chiffrer une soulte et d’obtenir de la banque la désolidarisation de l’autre. Vendre simplifie les comptes mais impose un calendrier.",
      },
      {
        titre: "L’état liquidatif",
        texte:
          "En cas de divorce par consentement mutuel avec un bien immobilier, l’état liquidatif notarié est annexé à la convention : c’est une étape obligatoire.",
      },
    ],
    actes: ["divorce", "liquidation-et-partage", "propriete-et-indivision"],
  },
  "maries|un-seul": {
    titre: "Un bien au nom d’un seul — ce qui ne règle pas tout",
    sujets: [
      {
        titre: "Propre ou commun ?",
        texte:
          "Un bien acheté pendant le mariage sous le régime légal est commun, même s’il est au nom d’un seul époux. Un bien acquis avant le mariage, ou reçu par donation ou succession, reste propre.",
      },
      {
        titre: "La participation de l’autre",
        texte:
          "Si l’époux non propriétaire a financé des travaux ou remboursé le prêt, une créance peut exister à son profit. Il faut la prouver et la chiffrer.",
      },
      {
        titre: "Le logement de la famille",
        texte:
          "Tant que le mariage dure, le logement familial ne peut être vendu sans l’accord des deux époux, même s’il appartient à un seul.",
      },
      {
        titre: "Le maintien dans les lieux",
        texte:
          "L’attribution provisoire de la jouissance du logement relève du juge ou de l’accord des parties, avec ou sans indemnité d’occupation.",
      },
    ],
    actes: ["divorce", "liquidation-et-partage"],
  },
  "maries|plusieurs": {
    titre: "Plusieurs biens : la liquidation devient une vraie construction",
    sujets: [
      {
        titre: "Un inventaire complet",
        texte:
          "Résidence principale, locatif, terrains, parts de société, épargne, assurance-vie : tout doit être recensé et daté, car la composition des masses est arrêtée à une date précise.",
      },
      {
        titre: "L’équilibre des lots",
        texte:
          "Répartir plusieurs biens permet souvent d’éviter une soulte importante, à condition d’accepter des valeurs discutées et acceptées de part et d’autre.",
      },
      {
        titre: "La fiscalité du partage",
        texte:
          "Le partage donne lieu à un droit proportionnel calculé sur l’actif net partagé, à un taux réduit lorsqu’il suit un divorce. L’étude vous en donne le montant exact.",
      },
      {
        titre: "Les sociétés",
        texte:
          "Les parts détenues par l’un peuvent être communes. Leur évaluation et leur sort demandent un travail spécifique, souvent avec l’expert-comptable.",
      },
    ],
    actes: [
      "divorce",
      "liquidation-et-partage",
      "organisation-patrimoniale-du-dirigeant",
    ],
  },
  "pacses|ensemble": {
    titre: "Une indivision à liquider, sans régime matrimonial",
    sujets: [
      {
        titre: "Ce que dit votre convention",
        texte:
          "Le régime légal du PACS est la séparation des patrimoines : chacun reste propriétaire de ce qu’il acquiert. Si vous aviez opté pour l’indivision, tout ce qui a été acheté pendant le pacte est réputé indivis par moitié.",
      },
      {
        titre: "Les quotes-parts de l’acte",
        texte:
          "Pour le logement, c’est la répartition inscrite dans l’acte d’achat qui fait foi, indépendamment des sommes réellement versées par chacun.",
      },
      {
        titre: "Les comptes entre vous",
        texte:
          "Remboursements de prêt, travaux, charges : ces flux peuvent créer une créance au profit de celui qui a payé davantage, s’il peut l’établir.",
      },
      {
        titre: "Sortir de l’indivision",
        texte:
          "Vente, rachat de la part de l’autre, ou convention d’indivision pour organiser une période transitoire.",
      },
    ],
    actes: ["separation", "propriete-et-indivision", "liquidation-et-partage"],
  },
  "pacses|un-seul": {
    titre: "Un seul propriétaire : la question devient celle de la preuve",
    sujets: [
      {
        titre: "Aucun droit automatique",
        texte:
          "Le partenaire non propriétaire n’acquiert aucun droit sur le logement du seul fait du PACS, quelle que soit la durée de la vie commune.",
      },
      {
        titre: "Les sommes versées",
        texte:
          "Une participation aux remboursements peut, selon les circonstances, être qualifiée de contribution aux charges de la vie commune — donc non remboursable — ou de créance. La distinction est délicate et se prépare avec des preuves.",
      },
      {
        titre: "Le départ du logement",
        texte:
          "Il n’existe pas de protection légale du logement du partenaire non propriétaire. Un délai peut être négocié.",
      },
    ],
    actes: ["separation", "liquidation-et-partage"],
  },
  "pacses|plusieurs": {
    titre: "Plusieurs biens, deux patrimoines à démêler",
    sujets: [
      {
        titre: "Bien par bien",
        texte:
          "Chaque bien doit être examiné séparément : date d’acquisition, régime applicable à ce moment-là, quotes-parts, financement.",
      },
      {
        titre: "L’indivision optée",
        texte:
          "Si votre convention prévoyait l’indivision, la présomption de propriété par moitié s’applique aux biens acquis pendant le pacte, ce qui peut surprendre.",
      },
      {
        titre: "Un partage global",
        texte:
          "Un acte de partage unique permet de solder l’ensemble des comptes, plutôt que de traiter les biens un par un.",
      },
    ],
    actes: ["separation", "liquidation-et-partage", "propriete-et-indivision"],
  },
  "concubins|ensemble": {
    titre: "L’acte d’achat est votre seule règle",
    sujets: [
      {
        titre: "La quote-part écrite l’emporte",
        texte:
          "Si l’acte indique une moitié chacun, chacun détient la moitié — même si l’un a apporté 70 % du prix. C’est la difficulté la plus fréquente de ces dossiers.",
      },
      {
        titre: "Prouver ses apports",
        texte:
          "Une créance peut être reconnue à celui qui a financé au-delà de sa part, à condition de le démontrer par des relevés bancaires précis.",
      },
      {
        titre: "Le crédit commun",
        texte:
          "Tant que la banque n’a pas désolidarisé l’un des emprunteurs, les deux restent tenus, quels que soient vos accords privés.",
      },
      {
        titre: "Sortir de l’indivision",
        texte:
          "Nul n’est tenu de rester dans l’indivision. Le partage amiable, préparé par l’étude, évite une procédure longue et coûteuse.",
      },
    ],
    actes: ["separation", "propriete-et-indivision", "liquidation-et-partage"],
  },
  "concubins|un-seul": {
    titre: "Aucune protection légale — anticiper, sinon prouver",
    sujets: [
      {
        titre: "Le concubinage ne crée aucun droit",
        texte:
          "Le concubin non propriétaire n’a aucun droit sur le logement, ni pendant la vie commune, ni à la rupture, ni au décès.",
      },
      {
        titre: "Les sommes versées",
        texte:
          "Selon leur nature et leur ampleur, elles peuvent constituer une participation aux dépenses courantes ou une créance. La qualification dépend des circonstances et des preuves.",
      },
      {
        titre: "L’enrichissement injustifié",
        texte:
          "Des travaux importants réalisés sur le bien de l’autre peuvent, dans certaines conditions, ouvrir droit à indemnisation. C’est une voie exigeante en preuves.",
      },
    ],
    actes: ["separation", "propriete-et-indivision"],
  },
  "concubins|plusieurs": {
    titre: "Plusieurs biens sans cadre légal commun",
    sujets: [
      {
        titre: "Chaque bien a sa propre histoire",
        texte:
          "Il faut reprendre chaque acquisition : qui figure au titre, dans quelle proportion, avec quel financement.",
      },
      {
        titre: "Les sociétés civiles",
        texte:
          "Si vous déteniez ensemble une SCI, les statuts et la répartition des parts déterminent la sortie. Une cession de parts peut être plus simple qu’un partage.",
      },
      {
        titre: "Un règlement d’ensemble",
        texte:
          "Traiter tous les biens dans un même acte permet des compensations, et donc souvent un meilleur équilibre.",
      },
    ],
    actes: ["separation", "propriete-et-indivision", "sci"],
  },
};
