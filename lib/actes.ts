import type { VarianteVisuel } from "@/components/Visuel";

export type CategorieActe =
  | "immobilier"
  | "couple-famille"
  | "transmission"
  | "entreprise";

export interface CategorieActeInfo {
  slug: CategorieActe;
  titre: string;
  intro: string;
  visuel: VarianteVisuel;
}

export const categoriesActes: CategorieActeInfo[] = [
  {
    slug: "immobilier",
    titre: "Immobilier",
    intro:
      "De la première visite à la remise des clés : sécuriser ce que l’on achète, ce que l’on vend, et la façon dont on le détient.",
    visuel: "facade",
  },
  {
    slug: "couple-famille",
    titre: "Couple & famille",
    intro:
      "Ce que la vie à deux change au patrimoine de chacun — au moment de s’unir comme au moment de se séparer.",
    visuel: "voile",
  },
  {
    slug: "transmission",
    titre: "Transmission",
    intro:
      "Donner, léguer, régler une succession : organiser le passage d’une génération à la suivante sans fragiliser les liens.",
    visuel: "bocage",
  },
  {
    slug: "entreprise",
    titre: "Entreprise",
    intro:
      "Créer, acheter, céder, transmettre : les décisions d’un dirigeant engagent aussi son patrimoine personnel.",
    visuel: "granit",
  },
];

export interface Acte {
  slug: string;
  titre: string;
  categorie: CategorieActe;
  resume: string;
  motsCles: string;
  quoi: string[];
  quand: string[];
  pourquoi: string[];
  deroule: string[];
  documents: string[];
  articles?: string[];
  projet?: string;
}

const POURQUOI_COMMUN_VENTE = [
  "Le notaire vérifie que le vendeur est bien propriétaire, que le bien est libre de toute inscription qui n’aurait pas été purgée, et que rien ne s’oppose au transfert.",
  "Il interroge les administrations : urbanisme, cadastre, servitudes, droit de préemption de la commune, situation de copropriété le cas échéant.",
  "Il donne à l’acte sa force authentique : date certaine, force probante et force exécutoire, avec conservation de l’original par l’étude.",
];

const actesImmobilier: Acte[] = [
  /* ------------------------------------------------------------------ */
  /*  IMMOBILIER                                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "promesse-et-compromis-de-vente",
    titre: "Promesse et compromis de vente",
    categorie: "immobilier",
    resume:
      "L’avant-contrat fixe le prix, le calendrier et les conditions. C’est lui qui engage, bien avant la signature définitive.",
    motsCles:
      "avant contrat compromis promesse unilaterale sous seing prive condition suspensive pret retractation sru sequestre indemnite immobilisation",
    projet: "immobilier",
    quoi: [
      "L’avant-contrat est le premier acte signé entre le vendeur et l’acquéreur. Il décrit précisément le bien, arrête le prix, la date de signature envisagée et l’ensemble des conditions auxquelles la vente est subordonnée.",
      "Deux formes coexistent. La promesse unilatérale de vente engage le seul vendeur, qui réserve le bien à l’acquéreur pendant un délai déterminé, en contrepartie d’une indemnité d’immobilisation. Le compromis — promesse synallagmatique — engage les deux parties : chacune peut en exiger l’exécution.",
      "Contrairement à une idée répandue, ce n’est pas un simple document préparatoire : l’essentiel du contrat s’y joue.",
    ],
    quand: [
      "Dès qu’un accord est trouvé sur le prix, et avant tout versement de fonds.",
      "Idéalement avant même d’avoir trouvé un acquéreur, côté vendeur : réunir le dossier de diagnostics et vérifier la situation du bien évite des semaines d’attente.",
    ],
    pourquoi: [
      "Signer l’avant-contrat à l’étude ne coûte pas plus cher : la rémunération du notaire est comprise dans les frais d’acquisition réglés à la signature définitive.",
      "Le notaire rédige des conditions suspensives précises — obtention du prêt, montant, taux et durée maximum, obtention d’une autorisation d’urbanisme, purge d’un droit de préemption — pour que l’acquéreur ne reste pas engagé si le projet devient impossible.",
      "Il conserve le dépôt de garantie sur son compte de séquestre, protégé et restituable si la vente n’aboutit pas pour une cause prévue au contrat.",
    ],
    deroule: [
      "Un premier échange permet de comprendre le projet : financement envisagé, calendrier, éventuels travaux, situation familiale des acquéreurs.",
      "L’étude réunit le dossier du bien : titre de propriété, diagnostics, documents de copropriété, situation d’urbanisme.",
      "Le projet d’avant-contrat est adressé à chacun avant la signature, pour être lu tranquillement et discuté.",
      "Après la signature, l’acquéreur non professionnel d’un logement dispose d’un délai de rétractation de dix jours, sans avoir à se justifier.",
    ],
    documents: [
      "Pièce d’identité et livret de famille de chaque partie",
      "Titre de propriété du vendeur",
      "Dossier de diagnostics techniques (DPE, amiante, plomb, électricité, gaz, assainissement…)",
      "Dernier avis de taxe foncière",
      "Pour un lot de copropriété : règlement, procès-verbaux des trois dernières assemblées, dernier appel de fonds",
      "Simulation ou accord de principe bancaire de l’acquéreur",
    ],
    articles: [
      "pourquoi-appeler-notaire-avant-acheteur",
      "acheter-maison-etapes-remise-des-cles",
    ],
  },
  {
    slug: "acte-authentique-de-vente",
    titre: "Acte authentique de vente",
    categorie: "immobilier",
    resume:
      "La signature qui transfère la propriété, publie la vente au fichier immobilier et remet les clés.",
    motsCles:
      "signature definitive acte authentique publicite fonciere service publicite fonciere remise des cles frais de notaire droits de mutation",
    projet: "immobilier",
    quoi: [
      "L’acte authentique constate le transfert de propriété. Il reprend l’avant-contrat, l’actualise et intègre les réponses obtenues depuis : urbanisme, état hypothécaire, renonciation de la commune à son droit de préemption, situation de la copropriété.",
      "Sa signature s’accompagne du paiement du prix et des frais, puis de la remise des clés. L’acte est ensuite publié au service de la publicité foncière : c’est cette publication qui rend la vente opposable à tous.",
    ],
    quand: [
      "En général deux à trois mois après l’avant-contrat, le temps de réunir les réponses des administrations et de finaliser le financement.",
      "Le délai peut être plus long en cas de division, de servitude à régulariser ou de succession non encore réglée côté vendeur.",
    ],
    pourquoi: POURQUOI_COMMUN_VENTE,
    deroule: [
      "Le projet d’acte est adressé aux parties avant le rendez-vous, avec le décompte précis des sommes à verser.",
      "Les fonds — apport et prêt — doivent être reçus sur le compte de l’étude avant la signature.",
      "L’acte est lu et commenté ; chaque partie signe, sur place ou à distance grâce à la signature électronique et à la comparution à distance.",
      "Les clés sont remises, puis l’étude accomplit les formalités : publication, paiement des taxes, remise du titre.",
    ],
    documents: [
      "Pièces d’identité en cours de validité",
      "Justificatif de l’origine des fonds propres",
      "Offre de prêt acceptée et coordonnées de la banque",
      "Attestation d’assurance habitation prenant effet le jour de la signature",
      "Relevé d’identité bancaire",
    ],
    articles: ["acheter-maison-etapes-remise-des-cles"],
  },
  {
    slug: "achat-immobilier",
    titre: "Achat immobilier",
    categorie: "immobilier",
    resume:
      "Acheter, c’est aussi choisir comment on détient : seul, à deux, en indivision, via une société.",
    motsCles:
      "acheter maison appartement residence principale secondaire indivision quote part financement apport pret acquisition combrit sainte marine",
    projet: "immobilier",
    quoi: [
      "L’achat ne se limite pas au prix. La manière dont le bien est acquis — seul, à deux, en indivision à parts inégales, en démembrement, par une société — détermine ce qu’il advient en cas de séparation, de décès ou de revente.",
      "Ces choix se font au moment de l’avant-contrat. Les modifier ensuite suppose un nouvel acte, avec un coût fiscal parfois important.",
    ],
    quand: [
      "Avant de signer une offre d’achat, dès que le projet se précise.",
      "Particulièrement lorsque les apports sont inégaux, lorsque les acquéreurs ne sont ni mariés ni pacsés, ou lorsque des fonds proviennent d’une donation ou d’une succession.",
    ],
    pourquoi: [
      "Le notaire aide à choisir le mode de détention adapté et à traduire fidèlement la réalité des apports dans l’acte.",
      "Il vérifie la conformité urbanistique du bien, l’existence de servitudes, la situation au regard des risques naturels — un point sensible sur le littoral du Finistère Sud.",
      "Il chiffre le coût réel de l’opération : dans l’ancien, les frais d’acquisition représentent en général de 7 à 8 % du prix ; dans le neuf, de 2 à 3 %.",
    ],
    deroule: [
      "Un premier rendez-vous, gratuit et sans engagement, permet de faire le point sur le projet et sur le financement.",
      "L’étude établit un décompte prévisionnel des frais et propose, si nécessaire, une clause d’emploi ou de remploi pour préserver l’origine des fonds.",
      "La suite du parcours est celle de tout achat : avant-contrat, conditions suspensives, acte authentique.",
    ],
    documents: [
      "Pièce d’identité et justificatif de domicile",
      "Contrat de mariage ou convention de PACS le cas échéant",
      "Justificatifs des apports (épargne, donation, prix de vente d’un bien)",
      "Simulation bancaire ou accord de principe",
      "Annonce ou descriptif du bien visé",
    ],
    articles: [
      "acheter-a-deux-sans-etre-maries",
      "acheter-maison-etapes-remise-des-cles",
    ],
  },
  {
    slug: "vente-immobiliere",
    titre: "Vente immobilière",
    categorie: "immobilier",
    resume:
      "Préparer sa vente en amont, c’est éviter les mauvaises surprises et vendre plus vite.",
    motsCles:
      "vendre maison appartement terrain plus value diagnostics mandat estimation negociation notariale",
    projet: "immobilier",
    quoi: [
      "Vendre suppose d’informer complètement l’acquéreur : diagnostics, urbanisme, servitudes, travaux votés en copropriété, sinistres. Une information incomplète peut se retourner contre le vendeur longtemps après la vente.",
      "Le notaire calcule également l’éventuelle plus-value imposable et la prélève lors de la signature, ce qui évite toute régularisation ultérieure.",
    ],
    quand: [
      "Avant même la mise en vente : commander les diagnostics et vérifier le titre de propriété fait gagner plusieurs semaines.",
      "Sans attendre lorsque le bien provient d’une succession, d’une donation, ou lorsqu’il a fait l’objet de travaux soumis à autorisation.",
    ],
    pourquoi: [
      "L’étude peut assurer la négociation immobilière et la rédaction dans la continuité, avec un seul interlocuteur du premier contact à la remise des clés.",
      "Le notaire sécurise le prix : les fonds transitent par la comptabilité de l’étude, contrôlée, et ne sont remis qu’une fois les formalités accomplies.",
      "Il vérifie que rien ne bloquera la vente : hypothèque à mainlever, indivision non réglée, mitoyenneté, empiètement, division parcellaire.",
    ],
    deroule: [
      "Point sur le bien, son origine de propriété et le calendrier souhaité.",
      "Constitution du dossier de vente et estimation, si l’étude est chargée de la négociation.",
      "Avant-contrat, puis acte authentique et versement du prix, déduction faite du remboursement éventuel du prêt en cours.",
    ],
    documents: [
      "Titre de propriété",
      "Dossier de diagnostics techniques complet",
      "Taxe foncière et, en copropriété, les trois derniers procès-verbaux d’assemblée générale",
      "Autorisations d’urbanisme et attestations de travaux (garantie décennale)",
      "Tableau d’amortissement du prêt en cours et coordonnées de la banque",
    ],
    articles: ["pourquoi-appeler-notaire-avant-acheteur"],
  },
  {
    slug: "donation-immobiliere",
    titre: "Donation immobilière",
    categorie: "immobilier",
    resume:
      "Donner un bien de son vivant : en pleine propriété, ou en n’en donnant que la nue-propriété.",
    motsCles:
      "donner maison enfant nue propriete usufruit demembrement abattement droits de donation reserve d usufruit",
    projet: "transmission-succession",
    quoi: [
      "La donation transfère immédiatement et irrévocablement la propriété d’un bien. Portant sur un immeuble, elle est obligatoirement reçue par un notaire et publiée au fichier immobilier.",
      "Elle peut porter sur la pleine propriété, ou seulement sur la nue-propriété : le donateur conserve alors l’usufruit, c’est-à-dire le droit d’habiter le bien ou d’en percevoir les loyers jusqu’à son décès.",
    ],
    quand: [
      "Lorsque l’on souhaite aider un enfant à se loger ou à investir.",
      "Lorsque l’on veut anticiper la transmission d’une maison de famille et éviter qu’elle ne devienne un sujet de discorde.",
      "En gardant à l’esprit que chaque parent peut donner 100 000 € à chacun de ses enfants sans droits de donation, cet abattement se reconstituant tous les quinze ans.",
    ],
    pourquoi: [
      "Le notaire évalue le bien, calcule les droits éventuels et vérifie que la donation ne porte pas atteinte à la réserve des autres héritiers.",
      "Il rédige les clauses qui protègent le donateur : réserve d’usufruit ou de droit d’usage et d’habitation, interdiction d’aliéner, droit de retour si le donataire décède avant lui.",
      "Il explique les conséquences au moment de la succession, notamment la différence entre une donation simple, rapportable et réévaluée, et une donation-partage qui fige les valeurs.",
    ],
    deroule: [
      "Rendez-vous de conseil : objectifs, situation familiale, autres biens, équilibre entre les enfants.",
      "Évaluation du bien et simulation chiffrée des droits, en pleine propriété comme en nue-propriété.",
      "Signature de l’acte de donation, puis publication au service de la publicité foncière.",
    ],
    documents: [
      "Titre de propriété du bien donné",
      "Livret de famille et pièces d’identité du donateur et du ou des donataires",
      "Contrat de mariage éventuel",
      "Dernier avis de taxe foncière et estimation ou éléments de comparaison",
      "Liste des donations déjà consenties",
    ],
    articles: ["donation-ou-succession-pourquoi-anticiper"],
  },
  {
    slug: "sci",
    titre: "Société civile immobilière (SCI)",
    categorie: "immobilier",
    resume:
      "Un outil utile dans certaines situations précises — et inutilement complexe dans beaucoup d’autres.",
    motsCles:
      "sci societe civile immobiliere parts sociales statuts gerant famille location detention immobiliere",
    projet: "transmission-succession",
    quoi: [
      "La SCI est une société qui détient un ou plusieurs biens immobiliers. Les associés ne possèdent plus directement le bien mais des parts sociales, dont la valeur suit celle du patrimoine de la société.",
      "Elle organise la gestion — les décisions relèvent du gérant et des statuts, non de l’unanimité des indivisaires — et facilite la transmission progressive, part par part.",
    ],
    quand: [
      "Lorsque plusieurs personnes achètent ensemble un bien qu’elles souhaitent gérer durablement.",
      "Lorsqu’un patrimoine locatif familial doit être transmis progressivement aux enfants.",
      "Lorsqu’un dirigeant sépare l’immobilier professionnel de l’activité de son entreprise.",
    ],
    pourquoi: [
      "La SCI n’est pas une solution universelle : elle implique une comptabilité, des assemblées, des formalités annuelles, et elle est rarement adaptée à l’achat d’une simple résidence principale.",
      "Le choix du régime fiscal — impôt sur le revenu ou impôt sur les sociétés — a des conséquences durables, notamment lors de la revente.",
      "Le notaire rédige des statuts sur mesure : pouvoirs du gérant, agrément des nouveaux associés, sort des parts en cas de décès ou de divorce.",
    ],
    deroule: [
      "Analyse du projet : nombre d’associés, financement, objectif de transmission, horizon de revente.",
      "Comparaison chiffrée avec les autres modes de détention — indivision, achat en direct, démembrement.",
      "Rédaction des statuts, apports éventuels d’immeubles, immatriculation de la société.",
    ],
    documents: [
      "Identité et situation matrimoniale de chaque associé",
      "Description du ou des biens concernés et titres de propriété",
      "Plan de financement et répartition envisagée du capital",
      "Objectifs de transmission ou de gestion",
    ],
    articles: ["sci-dans-quels-cas-utile"],
  },
  {
    slug: "servitudes",
    titre: "Servitudes",
    categorie: "immobilier",
    resume:
      "Passage, vue, écoulement des eaux, réseaux : ce que le voisin peut exiger, et ce que votre titre doit dire.",
    motsCles:
      "servitude passage droit de vue canalisation enclave voisinage bornage mitoyennete cour commune",
    projet: "immobilier",
    quoi: [
      "Une servitude est une charge pesant sur un terrain au profit d’un autre : droit de passage vers une parcelle enclavée, passage de canalisations, interdiction de construire au-delà d’une certaine hauteur, écoulement des eaux.",
      "Elle suit le bien et s’impose aux propriétaires successifs, qu’ils l’aient ou non remarquée lors de la visite.",
    ],
    quand: [
      "Avant d’acheter un terrain ou une maison desservie par un chemin privé.",
      "Lors d’une division de parcelle, très fréquente sur le littoral, où l’accès de l’un se fait sur le fonds de l’autre.",
      "Lorsqu’un usage ancien s’est installé entre voisins sans avoir jamais été formalisé.",
    ],
    pourquoi: [
      "Le notaire recherche les servitudes dans les titres antérieurs et fait, si nécessaire, régulariser par acte les situations tolérées depuis longtemps.",
      "Il précise l’assiette exacte, l’entretien et la répartition des frais — les points qui font naître les conflits une fois les voisins changés.",
      "Une servitude constituée par acte notarié et publiée devient opposable aux acquéreurs futurs.",
    ],
    deroule: [
      "Examen des titres de propriété et du plan cadastral.",
      "Recours si besoin à un géomètre-expert pour le bornage et le plan d’assiette.",
      "Rédaction de l’acte constitutif, modificatif ou d’extinction, puis publicité foncière.",
    ],
    documents: [
      "Titres de propriété des deux fonds concernés",
      "Plan cadastral et, s’il existe, procès-verbal de bornage",
      "Photographies ou plans des accès et réseaux existants",
      "Échanges éventuels entre voisins",
    ],
  },
  {
    slug: "propriete-et-indivision",
    titre: "Propriété et indivision",
    categorie: "immobilier",
    resume:
      "Posséder à plusieurs : une situation courante, souvent subie, qu’une convention permet d’organiser.",
    motsCles:
      "indivision quote part convention indivision partage vente a plusieurs heritiers concubins majorite unanimite",
    projet: "separation",
    quoi: [
      "L’indivision existe dès que plusieurs personnes sont propriétaires d’un même bien sans que leurs droits soient matériellement divisés : achat à deux, héritage entre frères et sœurs, communauté dissoute par un divorce.",
      "Chacun détient une quote-part exprimée en fraction, qui n’ouvre pas droit à une partie identifiée du bien mais à une part de sa valeur.",
    ],
    quand: [
      "Dès l’achat, pour fixer clairement les quotes-parts en fonction des apports réels.",
      "Après un décès, tant que la succession n’est pas partagée.",
      "Après une séparation, lorsque le logement reste au nom des deux.",
    ],
    pourquoi: [
      "Les décisions importantes — vendre, donner à bail pour une longue durée — exigent l’unanimité : un seul indivisaire peut bloquer la situation.",
      "Une convention d’indivision, reçue par le notaire, organise la gestion, désigne un gérant, répartit les charges et peut être conclue pour une durée déterminée.",
      "Nul n’est contraint de rester dans l’indivision : le notaire prépare le partage amiable et, s’il faut, oriente vers la procédure judiciaire.",
    ],
    deroule: [
      "Recensement des biens indivis, des quotes-parts et des financements réellement supportés par chacun.",
      "Calcul des créances entre indivisaires : remboursements de prêt, travaux, taxe foncière.",
      "Rédaction d’une convention d’indivision ou d’un acte de partage selon la solution retenue.",
    ],
    documents: [
      "Titre de propriété et acte de notoriété si le bien provient d’une succession",
      "Tableau d’amortissement du prêt et justificatifs des règlements effectués",
      "Factures de travaux et d’entretien",
      "Estimation récente du bien",
    ],
    articles: ["acheter-a-deux-sans-etre-maries", "divorce-maison-commune"],
  },
];

const actesCoupleFamille: Acte[] = [
  {
    slug: "contrat-de-mariage",
    titre: "Contrat de mariage",
    categorie: "couple-famille",
    resume:
      "Choisir son régime matrimonial, c’est décider à l’avance qui possède quoi — et qui répond des dettes.",
    motsCles:
      "regime matrimonial separation de biens communaute reduite aux acquets participation aux acquets universelle avant mariage",
    projet: "couple-famille",
    quoi: [
      "À défaut de contrat, les époux sont mariés sous le régime légal de la communauté réduite aux acquêts : tout ce qui est acquis pendant le mariage est commun, ce que chacun possédait avant ou reçoit par donation ou succession lui reste propre.",
      "Le contrat de mariage permet d’adopter un autre régime : séparation de biens, participation aux acquêts, communauté aménagée ou universelle. Il est reçu par le notaire avant la célébration.",
    ],
    quand: [
      "Avant le mariage — le contrat doit être signé avant la cérémonie et son existence est mentionnée à l’état civil.",
      "En cas de projet professionnel indépendant, de patrimoine reçu par famille, d’enfants d’une précédente union, ou de biens situés à l’étranger.",
    ],
    pourquoi: [
      "Le régime matrimonial détermine la répartition des biens, mais aussi l’étendue du gage des créanciers : sous le régime légal, les revenus des deux époux peuvent répondre des dettes de l’un.",
      "La séparation de biens protège, mais peut désavantager l’époux qui a mis sa carrière entre parenthèses : le notaire explique les correctifs possibles, comme une société d’acquêts ou une clause de participation.",
      "Un contrat n’est pas un signe de défiance : c’est la description écrite de ce que le couple décide, à un moment où il peut en parler sereinement.",
    ],
    deroule: [
      "Un rendez-vous de conseil, en couple, pour comprendre les situations professionnelles et patrimoniales.",
      "Présentation comparée des régimes et de leurs effets concrets : achat du logement, dettes, décès, divorce.",
      "Signature du contrat, remise de l’attestation à produire à la mairie avant la célébration.",
    ],
    documents: [
      "Pièces d’identité des deux futurs époux",
      "Justificatif de domicile",
      "Liste des biens et dettes de chacun avant l’union",
      "Éléments sur les activités professionnelles",
      "Date et lieu prévus pour la célébration",
    ],
    articles: [
      "contrat-de-mariage-question-de-patrimoine",
      "separation-de-biens-que-possede-chacun",
    ],
  },
  {
    slug: "changement-de-regime-matrimonial",
    titre: "Changement de régime matrimonial",
    categorie: "couple-famille",
    resume:
      "Un régime choisi il y a vingt ans ne correspond plus forcément à la vie que l’on mène aujourd’hui.",
    motsCles:
      "changer regime matrimonial homologation liquidation communaute universelle attribution integrale enfants mineurs opposition",
    projet: "couple-famille",
    quoi: [
      "Les époux peuvent modifier leur régime matrimonial, ou en changer entièrement, par un acte notarié. Le changement suppose une liquidation du régime précédent lorsque les masses de biens s’en trouvent modifiées.",
      "Les enfants majeurs et les créanciers sont informés et peuvent former opposition ; en présence d’enfants mineurs, le notaire saisit le juge lorsque l’intérêt de la famille l’exige.",
    ],
    quand: [
      "Lorsqu’un des époux se lance dans une activité indépendante et souhaite protéger le patrimoine du couple.",
      "Lorsque l’on souhaite protéger davantage le conjoint survivant, par exemple par une communauté universelle avec attribution intégrale.",
      "Lorsque la situation familiale a changé : recomposition, enfants non communs, patrimoine reçu par héritage.",
    ],
    pourquoi: [
      "Le changement produit des effets patrimoniaux immédiats, et parfois fiscaux : le notaire les chiffre avant toute décision.",
      "Une communauté universelle protège efficacement le conjoint, mais elle peut désavantager les enfants d’un premier lit : il faut le savoir et l’assumer.",
      "L’acte doit être mentionné en marge de l’acte de mariage pour être opposable aux tiers ; l’étude s’en charge.",
    ],
    deroule: [
      "Bilan patrimonial du couple : biens propres, biens communs, dettes, entreprise éventuelle.",
      "Présentation des options et de leurs conséquences pour le conjoint comme pour les enfants.",
      "Signature de l’acte, information des enfants majeurs et des créanciers, publicité légale.",
    ],
    documents: [
      "Livret de famille et contrat de mariage éventuel",
      "Titres de propriété des biens du couple",
      "Justificatifs des biens reçus par donation ou succession",
      "Situation professionnelle et engagements en cours (cautions, prêts)",
      "Coordonnées des enfants majeurs",
    ],
    articles: ["contrat-de-mariage-question-de-patrimoine"],
  },
  {
    slug: "pacs",
    titre: "PACS",
    categorie: "couple-famille",
    resume:
      "Un cadre souple, qui protège moins qu’on ne le croit en cas de décès si rien n’est prévu.",
    motsCles:
      "pacs convention pacte civil solidarite indivision separation des patrimoines partenaire testament succession",
    projet: "couple-famille",
    quoi: [
      "Le PACS est un contrat entre deux personnes majeures qui organise leur vie commune. La convention peut être signée devant notaire, qui procède alors lui-même à l’enregistrement.",
      "À défaut de précision, les partenaires sont soumis au régime de la séparation des patrimoines : chacun reste propriétaire de ce qu’il acquiert. Ils peuvent lui préférer l’indivision, qui rend commun tout ce qui est acheté pendant le pacte.",
    ],
    quand: [
      "Au moment de la conclusion du PACS, en particulier si un achat immobilier est envisagé.",
      "Après coup, pour modifier la convention ou ajouter des clauses de répartition des dépenses.",
    ],
    pourquoi: [
      "Le PACS n’ouvre aucun droit dans la succession du partenaire : sans testament, le survivant n’hérite de rien, même après vingt ans de vie commune.",
      "En revanche, le partenaire désigné par testament est exonéré de droits de succession — un point que beaucoup ignorent.",
      "Le notaire conseille sur la combinaison utile : convention de PACS, mode d’acquisition du logement, testament, clause de rachat.",
    ],
    deroule: [
      "Échange sur la situation de chacun : enfants, biens, projets d’achat.",
      "Rédaction de la convention et choix du régime des biens.",
      "Enregistrement par l’étude et remise du récépissé, puis rédaction éventuelle des testaments.",
    ],
    documents: [
      "Pièces d’identité et actes de naissance de moins de trois mois",
      "Attestation sur l’honneur de résidence commune et d’absence de lien de parenté",
      "Le cas échéant, jugement de divorce ou acte de décès du précédent conjoint",
      "Éléments sur le patrimoine de chacun",
    ],
    articles: ["acheter-a-deux-sans-etre-maries"],
  },
  {
    slug: "donation-entre-epoux",
    titre: "Donation entre époux",
    categorie: "couple-famille",
    resume:
      "Aussi appelée donation au dernier vivant : elle élargit les droits du conjoint survivant.",
    motsCles:
      "donation au dernier vivant conjoint survivant usufruit quotite disponible speciale protection veuf veuve",
    projet: "couple-famille",
    quoi: [
      "La donation entre époux augmente la part que le conjoint recueillera au décès. Elle lui ouvre un choix, au moment venu, entre plusieurs options : la totalité en usufruit, une part en pleine propriété, ou une combinaison des deux.",
      "Elle prend effet au décès et reste, en principe, révocable du vivant des époux.",
    ],
    quand: [
      "Peu après le mariage, ou lorsque le patrimoine du couple s’étoffe.",
      "Tout particulièrement en présence d’enfants d’une première union, où les droits légaux du conjoint sont réduits.",
    ],
    pourquoi: [
      "Sans elle, le conjoint survivant n’a droit, en présence d’enfants non communs, qu’à un quart de la succession en pleine propriété.",
      "L’option en usufruit total permet au survivant de rester dans le logement et de percevoir les revenus du patrimoine, sans en priver définitivement les enfants.",
      "Le notaire explique aussi les autres protections : testament, aménagement du régime matrimonial, assurance-vie.",
    ],
    deroule: [
      "Point sur la composition de la famille et du patrimoine.",
      "Simulation des droits du conjoint avec et sans donation.",
      "Signature de l’acte et inscription au fichier central des dispositions de dernières volontés.",
    ],
    documents: [
      "Livret de famille et pièces d’identité",
      "Contrat de mariage s’il en existe un",
      "Inventaire sommaire du patrimoine du couple",
      "Coordonnées des enfants, y compris ceux d’une précédente union",
    ],
    articles: ["donation-ou-succession-pourquoi-anticiper"],
  },
  {
    slug: "divorce",
    titre: "Divorce",
    categorie: "couple-famille",
    resume:
      "Le notaire intervient dès qu’il y a un bien immobilier, et dépose la convention de divorce par consentement mutuel.",
    motsCles:
      "divorce consentement mutuel avocat convention depot rang des minutes etat liquidatif prestation compensatoire juge",
    projet: "separation",
    quoi: [
      "Le divorce par consentement mutuel se règle en principe sans juge : la convention est rédigée par les avocats des époux, puis déposée au rang des minutes d’un notaire, ce dépôt lui donnant date certaine et force exécutoire.",
      "Lorsque le couple possède un bien immobilier, un état liquidatif notarié doit être annexé à la convention : il décrit le partage du patrimoine.",
    ],
    quand: [
      "Dès que le principe du divorce est acquis, en parallèle du travail des avocats.",
      "Avant de fixer définitivement le sort du logement, car sa valeur et son financement conditionnent l’équilibre général.",
    ],
    pourquoi: [
      "Le notaire liquide le régime matrimonial : il détermine ce qui est propre, ce qui est commun, les récompenses dues à la communauté et les créances entre époux.",
      "Il chiffre précisément la soulte lorsque l’un rachète la part de l’autre, et prépare l’acte de partage.",
      "Il travaille en lien avec les avocats : chacun son rôle, dans un calendrier commun.",
    ],
    deroule: [
      "Réunion des éléments : titres, prêts, comptes, apports d’origine, contrat de mariage.",
      "Projet d’état liquidatif adressé aux époux et à leurs avocats, discuté et ajusté.",
      "Signature de l’état liquidatif et du partage, puis dépôt de la convention de divorce au rang des minutes.",
    ],
    documents: [
      "Livret de famille, contrat de mariage éventuel",
      "Titres de propriété et estimations des biens",
      "Tableaux d’amortissement des prêts en cours",
      "Justificatifs des apports personnels (donation, succession, épargne antérieure)",
      "Relevés d’épargne, contrats d’assurance-vie, parts de société",
    ],
    articles: [
      "divorce-maison-commune",
      "separation-de-biens-que-possede-chacun",
    ],
  },
  {
    slug: "separation",
    titre: "Séparation (PACS, concubinage)",
    categorie: "couple-famille",
    resume:
      "Rompre un PACS ou une vie commune sans mariage : ce que le droit prévoit, et surtout ce qu’il ne prévoit pas.",
    motsCles:
      "rupture pacs concubinage separation sans mariage indivision logement commun creance entre concubins",
    projet: "separation",
    quoi: [
      "La rupture d’un PACS est une formalité simple. Le partage du patrimoine, lui, ne l’est pas toujours : il faut liquider l’indivision créée pendant le pacte et régler les créances entre partenaires.",
      "Pour les concubins, aucun régime n’est prévu par la loi : chacun reprend ce qui lui appartient, et le bien acheté ensemble reste en indivision selon les quotes-parts inscrites dans l’acte d’achat — même si l’un a payé davantage.",
    ],
    quand: [
      "Dès la décision de séparation, avant de quitter le logement ou de cesser de participer aux charges.",
      "Lorsque l’un souhaite conserver le bien et racheter la part de l’autre.",
    ],
    pourquoi: [
      "Le notaire reconstitue les flux financiers réels et détermine si une créance existe entre les ex-partenaires — question centrale lorsque les remboursements de prêt ont été inégaux.",
      "Il prépare le partage ou la vente, et calcule les droits dus.",
      "Il rappelle une réalité souvent découverte trop tard : sans acte, la quote-part inscrite dans le titre de propriété l’emporte sur les paiements effectivement réalisés.",
    ],
    deroule: [
      "Inventaire des biens communs et indivis, et des dettes.",
      "Reconstitution des financements et calcul des comptes entre les parties.",
      "Acte de partage, avec ou sans soulte, ou mise en vente du bien.",
    ],
    documents: [
      "Convention de PACS et attestation d’enregistrement le cas échéant",
      "Titre de propriété du bien acheté ensemble",
      "Relevés de prêt et justificatifs des versements de chacun",
      "Factures de travaux financés par l’un ou par l’autre",
      "Estimation du bien",
    ],
    articles: ["acheter-a-deux-sans-etre-maries", "divorce-maison-commune"],
  },
  {
    slug: "liquidation-et-partage",
    titre: "Liquidation et partage",
    categorie: "couple-famille",
    resume:
      "Établir qui doit quoi à qui, puis répartir : l’opération technique au cœur de toute séparation.",
    motsCles:
      "liquidation partage soulte recompense creance entre epoux masse partageable droit de partage attribution",
    projet: "separation",
    quoi: [
      "La liquidation consiste à dresser le compte : composition des masses de biens, dettes, récompenses dues par un époux à la communauté ou par la communauté à un époux, créances entre indivisaires.",
      "Le partage répartit ensuite ce solde entre les parties. Il peut être fait en nature, par attribution d’un bien à l’un moyennant une soulte versée à l’autre, ou après vente.",
    ],
    quand: [
      "Au moment d’un divorce ou d’une rupture, mais aussi après un décès pour sortir de l’indivision successorale.",
      "Sans attendre : une indivision qui dure crée des tensions et complique les comptes.",
    ],
    pourquoi: [
      "Les récompenses et créances sont calculées selon des règles précises, qui tiennent compte de la valeur actuelle du bien financé et non du seul montant versé.",
      "Un partage mal préparé peut être remis en cause ; établi par acte notarié, il est définitif et opposable.",
      "Le partage donne lieu à un droit proportionnel calculé sur l’actif net partagé, dont le taux est réduit lorsqu’il fait suite à un divorce ou à une rupture de PACS. L’étude vous confirme le montant applicable à votre dossier.",
    ],
    deroule: [
      "Collecte exhaustive des pièces financières et patrimoniales.",
      "Projet d’état liquidatif chiffré, présenté et expliqué à chacun.",
      "Signature de l’acte de partage et, s’il porte sur un immeuble, publicité foncière.",
    ],
    documents: [
      "Contrat de mariage ou convention de PACS",
      "Titres de propriété et estimations",
      "Relevés bancaires et d’épargne à la date retenue",
      "Justificatifs des apports personnels et des donations reçues",
      "Tableaux d’amortissement et justificatifs de travaux",
    ],
    articles: ["divorce-maison-commune"],
  },
];

const actesTransmission: Acte[] = [
  {
    slug: "donation",
    titre: "Donation",
    categorie: "transmission",
    resume:
      "Transmettre de son vivant, en mesurant précisément ce que l’on donne et ce que l’on garde.",
    motsCles:
      "donation don manuel abattement 100000 euros quinze ans droits de donation reserve heritiers rapport",
    projet: "transmission-succession",
    quoi: [
      "La donation est un acte par lequel une personne transfère de son vivant, gratuitement et irrévocablement, un bien à une autre. Elle peut porter sur une somme d’argent, un bien immobilier, des titres de société.",
      "Toute donation d’immeuble passe obligatoirement par un notaire. Les dons d’argent peuvent être manuels, mais leur déclaration et leur inscription dans l’histoire familiale évitent bien des difficultés lors de la succession.",
    ],
    quand: [
      "Lorsque l’on souhaite aider un enfant ou un petit-enfant à un moment où il en a besoin.",
      "Dans une logique d’anticipation : chaque parent peut donner 100 000 € à chaque enfant en franchise de droits, l’abattement se reconstituant tous les quinze ans.",
    ],
    pourquoi: [
      "Une donation faite sans conseil peut créer un déséquilibre entre les enfants, découvert seulement au décès.",
      "Le notaire vérifie le respect de la réserve héréditaire et explique la différence entre donation simple, rapportable à la succession et réévaluée, et donation-partage.",
      "Il conseille les clauses utiles : réserve d’usufruit, droit de retour, clause d’exclusion de communauté pour que le bien donné ne tombe pas dans la communauté du donataire.",
    ],
    deroule: [
      "Rendez-vous de conseil : composition de la famille, patrimoine, objectifs, donations antérieures.",
      "Simulation des droits et comparaison des différentes formules.",
      "Signature de l’acte, puis déclaration fiscale et formalités de publicité s’il s’agit d’un immeuble.",
    ],
    documents: [
      "Livret de famille et pièces d’identité",
      "Titres de propriété ou relevés des avoirs concernés",
      "Contrat de mariage éventuel du donateur et du donataire",
      "Liste et dates des donations déjà consenties",
    ],
    articles: [
      "donation-ou-succession-pourquoi-anticiper",
      "donation-partage-transmettre-aujourd-hui",
    ],
  },
  {
    slug: "donation-partage",
    titre: "Donation-partage",
    categorie: "transmission",
    resume:
      "Donner et répartir en même temps, en figeant les valeurs au jour de l’acte.",
    motsCles:
      "donation partage egalite entre enfants fige les valeurs rapport succession soulte transgenerationnelle",
    projet: "transmission-succession",
    quoi: [
      "La donation-partage réunit deux opérations : elle donne des biens et, dans le même acte, les répartit entre les héritiers présomptifs. Chacun sait ce qu’il reçoit, et l’accepte en signant.",
      "Elle peut être transgénérationnelle, en associant les petits-enfants avec l’accord de leurs parents.",
    ],
    quand: [
      "Lorsque plusieurs enfants sont concernés et que l’on souhaite éviter toute discussion ultérieure.",
      "Lorsque le patrimoine comprend des biens de nature différente — une maison, une entreprise, des liquidités — qu’il faut répartir équitablement.",
    ],
    pourquoi: [
      "C’est son principal atout : les biens sont évalués une fois pour toutes au jour de la donation-partage, à condition que tous les héritiers réservataires y participent et qu’il n’y ait pas de réserve d’usufruit sur une somme d’argent. Une maison qui double de valeur ensuite ne recréera pas de déséquilibre.",
      "Dans une donation simple, au contraire, les biens sont réévalués au jour du partage successoral, ce qui peut bouleverser l’équilibre voulu par les parents.",
      "Le notaire équilibre les lots, prévoit les soultes éventuelles et s’assure du consentement éclairé de chacun.",
    ],
    deroule: [
      "Inventaire du patrimoine à répartir et évaluation des biens.",
      "Construction des lots avec les parents, puis présentation aux enfants.",
      "Signature en présence de tous, ce qui donne à l’acte toute sa portée apaisante.",
    ],
    documents: [
      "Livret de famille et coordonnées de tous les enfants",
      "Titres de propriété, relevés de comptes et de portefeuilles",
      "Statuts et bilans des sociétés éventuelles",
      "Liste des donations antérieures",
    ],
    articles: ["donation-partage-transmettre-aujourd-hui"],
  },
  {
    slug: "testament",
    titre: "Testament",
    categorie: "transmission",
    resume:
      "Écrire ce que l’on veut, dans les limites de ce que la loi réserve à ses héritiers.",
    motsCles:
      "testament olographe authentique legs reserve heritaire quotite disponible fichier central dernieres volontes",
    projet: "transmission-succession",
    quoi: [
      "Le testament exprime les volontés d’une personne pour après son décès. Il peut être olographe, entièrement écrit, daté et signé de la main de son auteur, ou authentique, dicté au notaire en présence de témoins ou d’un second notaire.",
      "Il ne permet pas de déshériter ses enfants : la loi leur réserve une part du patrimoine. Seule la quotité disponible peut être librement attribuée.",
    ],
    quand: [
      "Lorsque la situation familiale sort du schéma le plus simple : couple non marié, famille recomposée, absence d’enfants, proche que l’on souhaite protéger.",
      "Lorsqu’un bien doit revenir à une personne précise, ou qu’une association doit être gratifiée.",
    ],
    pourquoi: [
      "Un testament olographe mal rédigé, ambigu ou introuvable perd tout effet. Déposé chez le notaire, il est conservé et inscrit au fichier central des dispositions de dernières volontés, consulté à chaque décès.",
      "Le notaire vérifie que les volontés sont réalisables et compatibles avec les droits des héritiers réservataires.",
      "Il peut aussi conseiller un legs graduel, un legs résiduel, ou l’articulation avec une assurance-vie.",
    ],
    deroule: [
      "Entretien confidentiel sur la situation familiale et les intentions.",
      "Rédaction ou relecture du testament, explication de ses effets et de ses limites.",
      "Dépôt et inscription au fichier central ; le testament reste modifiable à tout moment.",
    ],
    documents: [
      "Pièce d’identité et livret de famille",
      "Liste du patrimoine et de ses origines",
      "Coordonnées des personnes que l’on souhaite gratifier",
      "Testament antérieur s’il en existe un",
    ],
    articles: ["donation-ou-succession-pourquoi-anticiper"],
  },
  {
    slug: "succession",
    titre: "Succession",
    categorie: "transmission",
    resume:
      "Après un décès : identifier les héritiers, recenser le patrimoine, déclarer, puis transmettre.",
    motsCles:
      "succession deces heritier acte de notoriete declaration de succession six mois attestation de propriete option renonciation",
    projet: "transmission-succession",
    quoi: [
      "Régler une succession consiste à établir qui hérite et dans quelle proportion, à dresser l’état du patrimoine du défunt, à accomplir les déclarations fiscales, puis à transférer les biens aux héritiers.",
      "Le recours au notaire est obligatoire dès qu’il existe un bien immobilier, un testament, une donation entre époux, ou lorsque l’actif dépasse un certain seuil.",
    ],
    quand: [
      "Dans les jours qui suivent le décès pour un premier contact, sans précipitation mais sans attendre.",
      "La déclaration de succession doit être déposée dans les six mois du décès survenu en France — un délai qui passe vite lorsqu’il faut retrouver des comptes ou évaluer des biens.",
    ],
    pourquoi: [
      "L’acte de notoriété, établi par le notaire, prouve la qualité d’héritier auprès des banques et des administrations.",
      "Chaque héritier dispose d’une option : accepter purement et simplement, accepter à concurrence de l’actif net, ou renoncer. Le notaire éclaire ce choix, notamment lorsque le passif est incertain.",
      "Il calcule les droits de succession — en rappelant que le conjoint survivant et le partenaire de PACS en sont exonérés — et propose, s’il y a lieu, un paiement différé ou fractionné.",
    ],
    deroule: [
      "Premier rendez-vous : remise des documents, identification des héritiers, interrogation du fichier des dernières volontés.",
      "Recherche des avoirs, évaluation des biens, recensement des dettes et des donations antérieures.",
      "Déclaration de succession, attestation de propriété immobilière, puis partage si les héritiers le souhaitent.",
    ],
    documents: [
      "Acte de décès et livret de famille du défunt",
      "Contrat de mariage, jugement de divorce, testament connu",
      "Titres de propriété et derniers avis de taxe foncière",
      "Relevés bancaires, contrats d’assurance-vie, titres et parts sociales",
      "Factures d’obsèques et justificatifs des dettes",
      "Coordonnées complètes de tous les héritiers",
    ],
    articles: ["comment-se-deroule-une-succession"],
  },
  {
    slug: "partage-successoral",
    titre: "Partage successoral",
    categorie: "transmission",
    resume:
      "Sortir de l’indivision entre héritiers, à l’amiable de préférence.",
    motsCles:
      "partage succession indivision heritiers lot soulte attribution preferentielle vente licitation",
    projet: "transmission-succession",
    quoi: [
      "Tant qu’il n’est pas partagé, le patrimoine du défunt reste indivis entre les héritiers : les décisions importantes exigent l’unanimité.",
      "Le partage attribue à chacun des biens déterminés, en respectant la valeur de ses droits. Une soulte compense les écarts entre les lots.",
    ],
    quand: [
      "Une fois la succession liquidée et la déclaration déposée.",
      "Sans trop attendre : les biens indivis se dégradent, les charges se cumulent et les positions se durcissent.",
    ],
    pourquoi: [
      "Le notaire recherche l’équilibre entre les lots et rappelle les droits particuliers, comme l’attribution préférentielle du logement au conjoint survivant.",
      "Il gère les situations sensibles : héritier mineur ou protégé, héritier absent, désaccord persistant.",
      "Le partage amiable, plus rapide et bien moins coûteux qu’une procédure judiciaire, reste possible tant que le dialogue existe.",
    ],
    deroule: [
      "Évaluation actualisée des biens indivis.",
      "Composition des lots et discussion avec les héritiers.",
      "Signature de l’acte de partage, versement des soultes et publicité foncière.",
    ],
    documents: [
      "Déclaration de succession et acte de notoriété",
      "Estimations récentes des biens",
      "Relevés des comptes de l’indivision et justificatifs des charges réglées",
      "Accords éventuels déjà trouvés entre héritiers",
    ],
    articles: ["comment-se-deroule-une-succession"],
  },
  {
    slug: "anticipation-de-la-transmission",
    titre: "Anticipation de la transmission",
    categorie: "transmission",
    resume:
      "Une stratégie d’ensemble plutôt qu’une série d’actes isolés.",
    motsCles:
      "anticiper transmission strategie patrimoniale demembrement assurance vie mandat protection future bilan patrimonial",
    projet: "transmission-succession",
    quoi: [
      "Anticiper, c’est examiner l’ensemble du patrimoine — immobilier, épargne, entreprise, assurance-vie — et déterminer, dans le temps, ce qui doit être donné, à qui, sous quelle forme et à quel rythme.",
      "Cela suppose aussi de préparer l’éventualité d’une perte d’autonomie : mandat de protection future, habilitation familiale, procurations.",
    ],
    quand: [
      "À partir du moment où le patrimoine est constitué et où les enfants sont autonomes.",
      "Lors des grandes étapes : vente d’une entreprise, départ à la retraite, veuvage, recomposition familiale.",
    ],
    pourquoi: [
      "Une succession non préparée coûte souvent plus cher, en argent comme en relations familiales.",
      "Le notaire dispose d’une vue d’ensemble que peu de professionnels ont : régime matrimonial, donations antérieures, composition de la famille, nature des biens.",
      "Il construit une stratégie progressive, révisable, plutôt qu’une opération unique et irréversible.",
    ],
    deroule: [
      "Bilan patrimonial complet et écoute des objectifs, y compris les non-dits familiaux.",
      "Présentation chiffrée de plusieurs scénarios, avec leurs conséquences civiles et fiscales.",
      "Mise en œuvre échelonnée : donations, testaments, aménagements du régime matrimonial, statuts de société.",
    ],
    documents: [
      "Livret de famille, contrat de mariage, jugements éventuels",
      "Ensemble des titres de propriété",
      "Relevés d’épargne et contrats d’assurance-vie avec clauses bénéficiaires",
      "Statuts et derniers bilans des sociétés",
      "Liste des donations déjà réalisées",
    ],
    articles: [
      "donation-ou-succession-pourquoi-anticiper",
      "donation-partage-transmettre-aujourd-hui",
    ],
  },
];

const actesEntreprise: Acte[] = [
  {
    slug: "creation-d-entreprise",
    titre: "Création d’entreprise",
    categorie: "entreprise",
    resume:
      "Choisir sa forme sociale, c’est aussi décider du sort de son patrimoine personnel.",
    motsCles:
      "creation societe statuts sarl sas apport immeuble entrepreneur individuel protection residence principale",
    projet: "entreprise",
    quoi: [
      "Créer une société, c’est rédiger des statuts, définir la répartition du capital, organiser les pouvoirs et prévoir ce qui se passera en cas de départ, de désaccord ou de décès d’un associé.",
      "Le notaire intervient en particulier lorsque des biens immobiliers sont apportés, lorsque le dirigeant est marié, ou lorsque l’opération s’inscrit dans une stratégie patrimoniale familiale.",
    ],
    quand: [
      "Avant l’immatriculation, au moment où les choix structurants sont encore ouverts.",
      "Dès qu’un associé apporte un bien immobilier ou que le couple souhaite protéger son patrimoine privé.",
    ],
    pourquoi: [
      "Le régime matrimonial du dirigeant a des effets directs sur l’entreprise : sous le régime légal, les parts acquises avec des fonds communs sont communes.",
      "La résidence principale de l’entrepreneur individuel est insaisissable de plein droit ; les autres biens fonciers non professionnels peuvent l’être par une déclaration reçue en la forme notariée.",
      "Le notaire rédige les clauses qui évitent les blocages : agrément, préemption, sortie d’un associé, transmission des parts.",
    ],
    deroule: [
      "Échange sur le projet, les associés et leur situation familiale.",
      "Choix de la forme sociale et des clauses statutaires, en lien avec l’expert-comptable.",
      "Rédaction des statuts, formalités d’apport et d’immatriculation.",
    ],
    documents: [
      "Pièces d’identité et situation matrimoniale de chaque associé",
      "Projet d’activité et prévisionnel",
      "Titres des biens apportés le cas échéant",
      "Baux ou promesses signées pour les locaux",
    ],
  },
  {
    slug: "acquisition-d-entreprise",
    titre: "Acquisition d’entreprise",
    categorie: "entreprise",
    resume:
      "Racheter un fonds de commerce ou des titres : deux opérations très différentes.",
    motsCles:
      "rachat fonds de commerce cession de parts titres audit garantie de passif sequestre bail commercial",
    projet: "entreprise",
    quoi: [
      "Acheter un fonds de commerce, c’est acquérir la clientèle, le nom, le droit au bail et le matériel, sans reprendre les dettes de l’exploitant. Acheter les titres d’une société, c’est reprendre l’entreprise avec l’ensemble de son passé.",
      "Le choix entre les deux détermine le risque, la fiscalité et la garantie à négocier.",
    ],
    quand: [
      "Dès les premières discussions avec le cédant, avant de signer une lettre d’intention.",
      "Avant tout versement d’acompte.",
    ],
    pourquoi: [
      "Le notaire sécurise le prix par séquestre et respecte les délais d’opposition des créanciers du vendeur.",
      "Il vérifie le bail commercial — durée, destination, travaux, indexation —, souvent l’actif le plus déterminant.",
      "Il rédige ou relit la garantie d’actif et de passif dans une cession de titres.",
    ],
    deroule: [
      "Analyse du projet et de la structure de reprise, en lien avec les conseils habituels.",
      "Audit des éléments juridiques : bail, contrats, autorisations, immobilier.",
      "Avant-contrat, purge des droits de préemption, puis acte de cession et formalités.",
    ],
    documents: [
      "Trois derniers bilans et comptes de résultat",
      "Bail commercial et avenants",
      "Extrait Kbis et statuts à jour",
      "Contrats de travail et engagements en cours",
      "Plan de financement de la reprise",
    ],
  },
  {
    slug: "cession-d-entreprise",
    titre: "Cession d’entreprise",
    categorie: "entreprise",
    resume:
      "Vendre son entreprise, c’est aussi préparer ce que l’on fera du prix.",
    motsCles:
      "vendre entreprise cession fonds titres plus value professionnelle remploi apport cession retraite dirigeant",
    projet: "entreprise",
    quoi: [
      "La cession se prépare longtemps à l’avance : forme de l’opération, périmètre cédé, sort de l’immobilier d’exploitation, fiscalité de la plus-value, garantie donnée à l’acquéreur.",
      "Le produit de la vente devient un patrimoine privé qu’il faut à son tour organiser.",
    ],
    quand: [
      "Idéalement deux à trois ans avant l’opération envisagée.",
      "Avant toute réorganisation de la société, car certains dispositifs supposent une antériorité.",
    ],
    pourquoi: [
      "Le notaire fait le lien entre l’entreprise et le patrimoine familial : régime matrimonial, donation avant cession, protection du conjoint, transmission aux enfants.",
      "Il conseille sur le sort des murs professionnels et sur le bail à consentir au repreneur.",
      "Il coordonne son intervention avec l’expert-comptable et l’avocat d’affaires.",
    ],
    deroule: [
      "Bilan préalable : patrimoine professionnel, patrimoine privé, objectifs après cession.",
      "Choix du schéma et calendrier des opérations préparatoires.",
      "Rédaction et signature des actes, séquestre du prix, formalités.",
    ],
    documents: [
      "Statuts, bilans et comptes annuels",
      "Titres de propriété des locaux professionnels",
      "Contrat de mariage du dirigeant",
      "Contrats structurants et baux",
      "Projet de protocole ou lettre d’intention du repreneur",
    ],
  },
  {
    slug: "transmission-d-entreprise",
    titre: "Transmission d’entreprise",
    categorie: "entreprise",
    resume:
      "Passer le relais à un enfant ou à un salarié, sans fragiliser l’entreprise ni la famille.",
    motsCles:
      "transmettre entreprise familiale pacte dutreil donation de titres reprise par un enfant equilibre entre heritiers",
    projet: "entreprise",
    quoi: [
      "Transmettre une entreprise familiale suppose d’articuler deux logiques : celle de l’entreprise, qui a besoin d’un dirigeant clairement désigné, et celle de la famille, qui suppose une équité entre les enfants.",
      "Des dispositifs spécifiques, comme l’engagement collectif de conservation dit pacte Dutreil, permettent, sous conditions strictes de durée et de fonction, une exonération partielle des droits de mutation.",
    ],
    quand: [
      "Plusieurs années avant le passage de relais, car les engagements de conservation s’inscrivent dans la durée.",
      "Lorsque l’un des enfants s’implique dans l’entreprise et que les autres n’y participent pas.",
    ],
    pourquoi: [
      "Le notaire construit l’équilibre entre l’enfant repreneur et les autres héritiers : donation-partage, soulte, attribution d’autres biens, immobilier conservé par les parents.",
      "Il veille au respect scrupuleux des conditions du dispositif fiscal, dont le non-respect entraîne la remise en cause de l’avantage.",
      "Il prépare l’après : revenus des parents, logement, protection du conjoint.",
    ],
    deroule: [
      "Diagnostic patrimonial et familial, entretien avec chacun.",
      "Élaboration du schéma de transmission et de son calendrier.",
      "Signature des engagements et actes de donation, suivi dans le temps des obligations déclaratives.",
    ],
    documents: [
      "Statuts, bilans et organigramme du groupe",
      "Livret de famille et liste des héritiers",
      "Titres de propriété de l’immobilier professionnel et privé",
      "Donations déjà consenties",
      "Évaluation de l’entreprise",
    ],
    articles: ["donation-partage-transmettre-aujourd-hui"],
  },
  {
    slug: "organisation-patrimoniale-du-dirigeant",
    titre: "Organisation patrimoniale du dirigeant",
    categorie: "entreprise",
    resume:
      "Séparer ce qui doit l’être : l’entreprise, l’immobilier, la famille.",
    motsCles:
      "patrimoine dirigeant immobilier professionnel sci bail commercial protection conjoint caution insaisissabilite retraite",
    projet: "entreprise",
    quoi: [
      "Un dirigeant confond souvent, sans le vouloir, son patrimoine professionnel et son patrimoine privé : cautions personnelles, immobilier détenu par la société d’exploitation, régime matrimonial inadapté.",
      "L’organisation consiste à cloisonner les risques, à sécuriser les revenus futurs et à préparer la sortie.",
    ],
    quand: [
      "Dès que l’activité devient significative, et à chaque étape : croissance, emprunt, association, divorce, préparation de la retraite.",
    ],
    pourquoi: [
      "Détenir les murs dans une structure distincte protège l’immobilier des aléas de l’exploitation et facilite la cession de l’entreprise seule.",
      "Le régime matrimonial et les clauses bénéficiaires d’assurance-vie doivent être cohérents avec la situation professionnelle.",
      "Le notaire coordonne l’ensemble : société d’exploitation, société immobilière, contrat de mariage, donation, testament.",
    ],
    deroule: [
      "Cartographie complète du patrimoine et des engagements personnels.",
      "Identification des points de fragilité et propositions hiérarchisées.",
      "Mise en œuvre des actes utiles et point d’étape régulier.",
    ],
    documents: [
      "Statuts et bilans des sociétés",
      "Engagements de caution en cours",
      "Contrat de mariage et titres de propriété",
      "Contrats d’assurance-vie et de prévoyance",
      "Relevés de carrière et projets à moyen terme",
    ],
    articles: ["sci-dans-quels-cas-utile"],
  },
];

export const actes: Acte[] = [
  ...actesImmobilier,
  ...actesCoupleFamille,
  ...actesTransmission,
  ...actesEntreprise,
];

export function acteParSlug(slug: string): Acte | undefined {
  return actes.find((a) => a.slug === slug);
}

export function actesParCategorie(categorie: CategorieActe): Acte[] {
  return actes.filter((a) => a.categorie === categorie);
}

export function categorieParSlug(slug: string): CategorieActeInfo | undefined {
  return categoriesActes.find((c) => c.slug === slug);
}
