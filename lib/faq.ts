export type CategorieFaq =
  | "Immobilier"
  | "Couple"
  | "Séparation"
  | "Succession"
  | "L’étude";

export interface QuestionFaq {
  id: string;
  categorie: CategorieFaq;
  question: string;
  reponse: string[];
  lien?: { libelle: string; href: string };
  /** Mise en avant sur la page d’accueil et dans la recherche. */
  vedette?: boolean;
}

export const questionsFaq: QuestionFaq[] = [
  {
    id: "quand-contacter-notaire-achat",
    categorie: "Immobilier",
    question: "Quand dois-je contacter le notaire pour un achat ?",
    reponse: [
      "Le plus tôt possible, et idéalement avant de signer quoi que ce soit. Beaucoup d’acquéreurs appellent une fois l’avant-contrat signé : à ce stade, l’essentiel est déjà arrêté.",
      "Un premier échange avant l’offre permet de vérifier votre capacité juridique à acheter, de choisir le bon mode de détention selon votre situation familiale, d’estimer les frais réels et de repérer les points sensibles du bien — servitude, division, zone à risque, copropriété.",
    ],
    lien: { libelle: "Vos projets immobiliers", href: "/vos-projets/immobilier" },
    vedette: true,
  },
  {
    id: "documents-premier-rendez-vous",
    categorie: "L’étude",
    question: "Quels documents apporter au premier rendez-vous ?",
    reponse: [
      "Pour un premier rendez-vous, l’essentiel tient en peu de choses : une pièce d’identité, votre livret de famille, votre contrat de mariage ou votre convention de PACS s’il en existe un, et les documents relatifs au projet — annonce du bien, titre de propriété, simulation bancaire.",
      "Vous n’avez pas besoin d’un dossier complet pour venir en parler. L’outil « Préparer mon rendez-vous » établit une liste indicative adaptée à votre situation.",
    ],
    lien: {
      libelle: "Préparer mon rendez-vous",
      href: "/preparer-mon-rendez-vous",
    },
    vedette: true,
  },
  {
    id: "acheter-a-deux-sans-etre-maries",
    categorie: "Couple",
    question: "Peut-on acheter à deux sans être mariés ?",
    reponse: [
      "Oui, sans difficulté. Le bien est alors acquis en indivision, chacun détenant la quote-part indiquée dans l’acte : moitié-moitié, ou toute autre répartition correspondant aux apports réels.",
      "C’est cette mention dans l’acte qui fera foi plus tard, et non les virements effectués. Si l’un apporte davantage, il faut le dire au moment de l’achat, et le traduire soit par des quotes-parts inégales, soit par une reconnaissance de dette, soit par une clause adaptée.",
    ],
    lien: {
      libelle: "Acheter à deux sans être mariés",
      href: "/conseils/acheter-a-deux-sans-etre-maries",
    },
    vedette: true,
  },
  {
    id: "maison-en-cas-de-separation",
    categorie: "Séparation",
    question: "À qui appartient la maison en cas de séparation ?",
    reponse: [
      "Tout dépend du statut du couple et de ce que dit le titre de propriété. Mariés sans contrat, le bien acheté pendant le mariage est commun, quels que soient les apports. En séparation de biens, comme pour les pacsés et les concubins, chacun détient la quote-part inscrite dans l’acte d’achat.",
      "Les financements inégaux ne changent pas la propriété : ils peuvent en revanche ouvrir droit à une créance ou à une récompense, qu’il faut calculer et prouver.",
    ],
    lien: { libelle: "Le dossier séparation", href: "/vos-projets/separation" },
    vedette: true,
  },
  {
    id: "qu-est-ce-qu-une-soulte",
    categorie: "Séparation",
    question: "Qu’est-ce qu’une soulte ?",
    reponse: [
      "C’est la somme versée par celui qui conserve un bien détenu à plusieurs à celui qui abandonne ses droits. Elle compense la différence entre la valeur des droits de chacun et ce que chacun reçoit dans le partage.",
      "Elle se calcule sur la valeur actuelle du bien, diminuée du capital restant dû sur le prêt, puis répartie selon les droits respectifs — corrigés des créances éventuelles. Racheter la part de l’autre suppose ensuite que la banque accepte de désolidariser celui qui part.",
    ],
    lien: { libelle: "La soulte, en pratique", href: "/vos-projets/separation#soulte" },
    vedette: true,
  },
  {
    id: "pourquoi-donner-de-son-vivant",
    categorie: "Succession",
    question: "Pourquoi faire une donation de son vivant ?",
    reponse: [
      "Pour aider au bon moment, d’abord : un enfant a souvent davantage besoin d’un coup de pouce à trente-cinq ans qu’à soixante.",
      "Pour transmettre dans de meilleures conditions, ensuite : chaque parent peut donner 100 000 € à chacun de ses enfants sans droits de donation, cet abattement se reconstituant tous les quinze ans.",
      "Pour éviter les conflits, enfin : une donation expliquée et acceptée par tous, en particulier sous forme de donation-partage, prévient bien des désaccords ultérieurs.",
    ],
    lien: {
      libelle: "Donation ou succession : pourquoi anticiper ?",
      href: "/conseils/donation-ou-succession-pourquoi-anticiper",
    },
    vedette: true,
  },
  {
    id: "donation-ou-donation-partage",
    categorie: "Succession",
    question: "Quelle différence entre donation et donation-partage ?",
    reponse: [
      "Une donation simple est rapportable à la succession : au décès, le bien donné est réévalué selon sa valeur au jour du partage. Une maison donnée 150 000 € et qui en vaut 400 000 € vingt ans plus tard sera prise en compte pour 400 000 €.",
      "La donation-partage, elle, fige les valeurs au jour de l’acte, à condition que tous les héritiers réservataires y participent et acceptent leur lot. C’est ce qui en fait l’outil d’équité le plus efficace entre plusieurs enfants.",
    ],
    lien: {
      libelle: "Donation-partage : transmettre aujourd’hui",
      href: "/conseils/donation-partage-transmettre-aujourd-hui",
    },
    vedette: true,
  },
  {
    id: "comment-se-deroule-une-succession",
    categorie: "Succession",
    question: "Comment se déroule une succession ?",
    reponse: [
      "En quatre temps. L’étude identifie d’abord les héritiers et interroge le fichier central des dispositions de dernières volontés, puis établit l’acte de notoriété qui prouve votre qualité d’héritier.",
      "Elle recense ensuite le patrimoine : comptes, biens immobiliers, contrats d’assurance-vie, dettes, donations antérieures. Vient la déclaration de succession, à déposer dans les six mois du décès survenu en France.",
      "Le partage, enfin, met fin à l’indivision entre héritiers. Il peut intervenir plus tard, lorsque chacun est prêt.",
    ],
    lien: {
      libelle: "Comment se déroule une succession",
      href: "/conseils/comment-se-deroule-une-succession",
    },
    vedette: true,
  },
  {
    id: "a-quoi-sert-un-contrat-de-mariage",
    categorie: "Couple",
    question: "À quoi sert un contrat de mariage ?",
    reponse: [
      "À choisir, plutôt qu’à subir. Sans contrat, vous serez mariés sous le régime de la communauté réduite aux acquêts, qui convient à beaucoup de couples mais pas à tous.",
      "Le contrat répond à trois questions concrètes : à qui appartiennent les biens achetés pendant le mariage, qui répond des dettes, et que devient le patrimoine en cas de décès ou de divorce. Il protège autant celui qui entreprend que celui qui met sa carrière entre parenthèses.",
    ],
    lien: {
      libelle: "Contrat de mariage : est-ce uniquement une question de patrimoine ?",
      href: "/conseils/contrat-de-mariage-question-de-patrimoine",
    },
    vedette: true,
  },
  {
    id: "choisir-son-notaire",
    categorie: "L’étude",
    question: "Puis-je choisir mon notaire si le vendeur en a déjà un ?",
    reponse: [
      "Oui, toujours. Chaque partie peut être assistée du notaire de son choix, et cela n’augmente pas le coût de l’opération : les deux études se partagent l’émolument prévu par le tarif national.",
      "Concrètement, l’un des deux rédige l’acte, l’autre vérifie, conseille son client et participe à la signature.",
    ],
  },
  {
    id: "premier-rendez-vous-payant",
    categorie: "L’étude",
    question: "Le premier rendez-vous est-il payant ?",
    reponse: [
      "Un premier échange destiné à situer votre projet et à vous indiquer la marche à suivre ne donne pas lieu à facturation.",
      "Une consultation approfondie, avec étude de documents, simulations chiffrées ou rédaction d’un avis, constitue en revanche une prestation de conseil, dont le tarif vous est indiqué avant d’engager quoi que ce soit.",
    ],
    lien: { libelle: "Contacter l’étude", href: "/contact" },
  },
  {
    id: "frais-de-notaire",
    categorie: "Immobilier",
    question: "À quoi correspondent les « frais de notaire » ?",
    reponse: [
      "Pour l’essentiel, à des taxes. Sur une acquisition dans l’ancien, l’ensemble représente en général de 7 à 8 % du prix, dont la plus grande part revient à l’État et aux collectivités au titre des droits de mutation. Dans le neuf, le total tombe entre 2 et 3 %.",
      "S’y ajoutent les débours — sommes avancées par l’étude pour votre compte, comme les documents d’urbanisme ou l’état hypothécaire — et l’émolument du notaire, fixé par un tarif national identique dans toute la France.",
    ],
  },
  {
    id: "signature-a-distance",
    categorie: "L’étude",
    question: "Peut-on signer un acte à distance ?",
    reponse: [
      "Oui. L’acte authentique électronique et la comparution à distance permettent de signer depuis une autre étude, ou en visioconférence sécurisée dans les cas prévus par la réglementation.",
      "C’est particulièrement utile lorsqu’une partie réside loin du Finistère, ou à l’étranger. L’étude vous indique la solution adaptée à votre dossier.",
    ],
  },
  {
    id: "credit-apres-separation",
    categorie: "Séparation",
    question: "Que devient le crédit immobilier après une séparation ?",
    reponse: [
      "Il ne disparaît pas avec le couple. Tant que la banque n’a pas accepté de désolidariser l’un des emprunteurs, les deux restent tenus de la totalité du prêt, même si l’un a quitté le logement.",
      "La désolidarisation s’obtient généralement à l’occasion du rachat de la part de l’autre, et suppose que celui qui reste présente à lui seul des garanties suffisantes.",
    ],
    lien: { libelle: "Le dossier séparation", href: "/vos-projets/separation" },
  },
  {
    id: "pacs-et-deces",
    categorie: "Couple",
    question: "Le PACS protège-t-il en cas de décès ?",
    reponse: [
      "Pas par lui-même. Le partenaire de PACS n’est pas héritier : sans testament, il ne reçoit rien, quelle que soit la durée de la vie commune.",
      "En revanche, le partenaire désigné par testament est totalement exonéré de droits de succession. Le PACS et le testament forment donc un couple indissociable.",
    ],
    lien: { libelle: "La fiche PACS", href: "/actes/pacs" },
  },
  {
    id: "delai-succession",
    categorie: "Succession",
    question: "Combien de temps faut-il pour régler une succession ?",
    reponse: [
      "La déclaration fiscale doit être déposée dans les six mois du décès survenu en France. Le règlement complet dépend ensuite de la composition du patrimoine et du nombre d’héritiers.",
      "Une succession simple peut être bouclée en quelques mois ; une succession comportant plusieurs biens, des héritiers éloignés ou une entreprise demandera davantage de temps. L’étude vous donne un calendrier réaliste dès le premier rendez-vous.",
    ],
  },
  {
    id: "vendre-un-terrain",
    categorie: "Immobilier",
    question: "Faut-il un notaire pour vendre un terrain ?",
    reponse: [
      "Oui : toute vente d’immeuble, terrain compris, doit être constatée par un acte authentique pour être publiée au fichier immobilier et opposable aux tiers.",
      "Un terrain suppose des vérifications spécifiques : constructibilité, viabilisation, bornage, servitudes de passage, droit de préemption de la commune, et parfois division parcellaire soumise à autorisation.",
    ],
    lien: { libelle: "Les servitudes", href: "/actes/servitudes" },
  },
];

export const categoriesFaq: CategorieFaq[] = [
  "Immobilier",
  "Couple",
  "Séparation",
  "Succession",
  "L’étude",
];

export function faqVedette(limite = 8): QuestionFaq[] {
  return questionsFaq.filter((q) => q.vedette).slice(0, limite);
}
