import type { VarianteVisuel } from "@/components/Visuel";

/** Les six portes d’entrée de la page d’accueil : « Qu’est-ce qui vous amène ? » */
export interface CarteProjet {
  titre: string;
  href: string;
  description: string;
  visuel: VarianteVisuel;
}

export const cartesProjets: CarteProjet[] = [
  {
    titre: "J’achète ou je vends",
    href: "/vos-projets/immobilier",
    description:
      "Achat immobilier, vente, avant-contrat, financement, propriété.",
    visuel: "facade",
  },
  {
    titre: "Je me marie ou je me pacse",
    href: "/vos-projets/couple-famille",
    description:
      "Choix du régime, contrat de mariage, PACS, protection du conjoint.",
    visuel: "voile",
  },
  {
    titre: "Nous nous séparons",
    href: "/vos-projets/separation",
    description:
      "Divorce, séparation, liquidation du patrimoine, partage des biens.",
    visuel: "horizon",
  },
  {
    titre: "Je souhaite transmettre",
    href: "/vos-projets/transmission-succession",
    description:
      "Donation, succession, testament, anticipation patrimoniale.",
    visuel: "bocage",
  },
  {
    titre: "J’entreprends",
    href: "/vos-projets/entreprise",
    description:
      "Création, acquisition, transmission d’entreprise, immobilier professionnel.",
    visuel: "granit",
  },
  {
    titre: "J’organise mon patrimoine",
    href: "/vos-projets/transmission-succession#organiser",
    description:
      "Conseil, détention immobilière, SCI, transmission familiale.",
    visuel: "maree",
  },
];

export interface SectionProjet {
  id?: string;
  titre: string;
  paragraphes: string[];
  liste?: { titre: string; texte: string }[];
}

export interface PageProjet {
  slug: string;
  libelle: string;
  surtitre: string;
  titreLignes: string[];
  chapo: string;
  metaTitre: string;
  metaDescription: string;
  visuel: VarianteVisuel;
  visuelSecondaire: VarianteVisuel;
  situations: { titre: string; texte: string }[];
  sections: SectionProjet[];
  questions: { q: string; r: string }[];
  actes: string[];
  articles: string[];
}

export const pagesProjets: PageProjet[] = [
  {
    slug: "immobilier",
    libelle: "Immobilier",
    surtitre: "Acheter, vendre, détenir",
    titreLignes: [
      "Un projet immobilier",
      "commence bien avant",
      "la signature.",
    ],
    chapo:
      "Le prix se négocie en quelques jours. Ce qui l’entoure — la façon de détenir, le financement, les conditions, l’urbanisme — se prépare, et détermine la tranquillité des années suivantes.",
    metaTitre: "Notaire achat et vente immobilière à Combrit (29)",
    metaDescription:
      "Achat, vente, avant-contrat, financement, indivision, SCI : l’office notarial Marine Le Treut vous accompagne à Combrit, Sainte-Marine et en Finistère Sud.",
    visuel: "facade",
    visuelSecondaire: "granit",
    situations: [
      {
        titre: "Vous achetez",
        texte:
          "Première acquisition, résidence secondaire sur le littoral, investissement locatif : le mode de détention se décide au moment de l’avant-contrat, pas après.",
      },
      {
        titre: "Vous vendez",
        texte:
          "Un dossier préparé en amont — diagnostics, titre, urbanisme — raccourcit les délais et rassure l’acquéreur. L’étude peut aussi assurer la négociation.",
      },
      {
        titre: "Vous construisez ou divisez",
        texte:
          "Terrain à bâtir, division de parcelle, servitude de passage, raccordements : autant de points à régler par acte pour éviter les litiges de voisinage.",
      },
      {
        titre: "Vous détenez à plusieurs",
        texte:
          "Indivision, SCI, démembrement : chaque formule a ses conséquences en cas de revente, de séparation ou de décès.",
      },
    ],
    sections: [
      {
        titre: "Les étapes, dans l’ordre",
        paragraphes: [
          "Un achat immobilier suit un chemin balisé. Le connaître à l’avance évite l’impression de subir un calendrier que l’on ne maîtrise pas.",
        ],
        liste: [
          {
            titre: "L’offre et l’accord",
            texte:
              "Le prix est arrêté. Rien n’est encore engagé tant que l’avant-contrat n’est pas signé, mais tout se prépare déjà.",
          },
          {
            titre: "L’avant-contrat",
            texte:
              "Compromis ou promesse : il fixe le prix, le calendrier et les conditions suspensives. L’acquéreur d’un logement dispose ensuite de dix jours pour se rétracter.",
          },
          {
            titre: "L’instruction du dossier",
            texte:
              "L’étude interroge l’urbanisme, le cadastre, la commune au titre de son droit de préemption, le syndic en copropriété, et vérifie l’état hypothécaire.",
          },
          {
            titre: "Le financement",
            texte:
              "L’offre de prêt est éditée, acceptée après le délai de réflexion légal, puis les fonds sont appelés par l’étude.",
          },
          {
            titre: "La signature et les clés",
            texte:
              "L’acte est lu, signé, le prix versé, les clés remises. L’étude publie ensuite la vente et vous adresse votre titre de propriété.",
          },
        ],
      },
      {
        titre: "Ce que coûte réellement une acquisition",
        paragraphes: [
          "Ce que l’on appelle communément « frais de notaire » se compose en réalité, pour l’essentiel, de taxes reversées à l’État et aux collectivités. Dans l’ancien, l’ensemble représente en général de 7 à 8 % du prix ; dans le neuf, de 2 à 3 %.",
          "La rémunération du notaire, appelée émolument, est fixée par un tarif national : elle est identique dans toutes les études de France. Elle s’y ajoute, avec les débours avancés pour votre compte — documents d’urbanisme, état hypothécaire, géomètre.",
        ],
      },
    ],
    questions: [
      {
        q: "Puis-je choisir mon notaire même si le vendeur en a déjà un ?",
        r: "Oui. Chaque partie peut être assistée de son propre notaire, sans surcoût : les deux études se partagent l’émolument prévu par le tarif. Vous n’avez donc aucune raison financière de renoncer à être conseillé.",
      },
      {
        q: "Combien de temps entre le compromis et la signature ?",
        r: "Deux à trois mois en moyenne. Le délai s’explique par l’obtention du prêt, les réponses des administrations et, le cas échéant, la purge du droit de préemption de la commune.",
      },
      {
        q: "Que se passe-t-il si je n’obtiens pas mon prêt ?",
        r: "Si la condition suspensive de prêt est correctement rédigée et que vous avez déposé vos demandes conformément à ce qu’elle prévoit, l’avant-contrat devient caduc et le dépôt de garantie vous est restitué.",
      },
    ],
    actes: [
      "promesse-et-compromis-de-vente",
      "acte-authentique-de-vente",
      "achat-immobilier",
      "vente-immobiliere",
      "servitudes",
      "propriete-et-indivision",
    ],
    articles: [
      "pourquoi-appeler-notaire-avant-acheteur",
      "acheter-maison-etapes-remise-des-cles",
      "acheter-a-deux-sans-etre-maries",
    ],
  },
  {
    slug: "couple-famille",
    libelle: "Couple & famille",
    surtitre: "S’unir, protéger",
    titreLignes: [
      "Ce que la vie à deux",
      "change, en silence,",
      "au patrimoine de chacun.",
    ],
    chapo:
      "Se marier, se pacser, acheter ensemble : ces décisions produisent des effets juridiques immédiats, que l’on n’a presque jamais l’occasion de choisir en connaissance de cause.",
    metaTitre: "Notaire mariage, PACS et famille à Combrit (29)",
    metaDescription:
      "Contrat de mariage, changement de régime matrimonial, PACS, donation entre époux : comprendre et choisir, avec l’office notarial Marine Le Treut à Combrit.",
    visuel: "voile",
    visuelSecondaire: "dune",
    situations: [
      {
        titre: "Vous vous mariez",
        texte:
          "Sans contrat, c’est le régime légal qui s’applique. Un rendez-vous suffit à comprendre ce qu’il implique et à décider s’il vous convient.",
      },
      {
        titre: "Vous vous pacsez",
        texte:
          "Le PACS organise la vie commune, mais n’ouvre aucun droit dans la succession du partenaire. Un testament change tout.",
      },
      {
        titre: "Vous vivez ensemble sans être mariés",
        texte:
          "Le concubinage n’a pas de régime patrimonial. Ce qui protège, ce sont les actes : titre d’acquisition bien rédigé, convention d’indivision, testament.",
      },
      {
        titre: "Vous souhaitez protéger votre conjoint",
        texte:
          "Donation entre époux, aménagement du régime matrimonial, testament, clause bénéficiaire : plusieurs outils, à combiner selon la famille.",
      },
    ],
    sections: [
      {
        titre: "Les régimes matrimoniaux, en clair",
        paragraphes: [
          "Le régime matrimonial répond à trois questions : à qui appartient ce que nous achetons ? qui répond de nos dettes ? que se passe-t-il si nous nous séparons ou si l’un de nous décède ?",
        ],
        liste: [
          {
            titre: "Communauté réduite aux acquêts",
            texte:
              "Le régime par défaut. Ce qui est acquis pendant le mariage est commun ; ce que chacun possédait avant, ou reçoit par donation ou succession, lui reste propre.",
          },
          {
            titre: "Séparation de biens",
            texte:
              "Chacun reste propriétaire de ce qu’il acquiert. Adapté aux professions indépendantes, mais il faut veiller à ce que l’époux qui investit moins ne soit pas lésé.",
          },
          {
            titre: "Participation aux acquêts",
            texte:
              "Séparation de biens pendant le mariage, partage de l’enrichissement à sa dissolution. Un équilibre souvent méconnu.",
          },
          {
            titre: "Communauté universelle",
            texte:
              "Tous les biens sont communs. Avec attribution intégrale au survivant, elle protège fortement le conjoint — au détriment, parfois, des enfants d’une première union.",
          },
        ],
      },
      {
        titre: "Le logement de la famille",
        paragraphes: [
          "Quel que soit le régime, le logement de la famille bénéficie d’une protection particulière : un époux ne peut ni le vendre, ni le donner à bail sans l’accord de l’autre, même s’il en est le seul propriétaire.",
          "Cette protection cesse avec le mariage. Pour les partenaires de PACS et les concubins, elle n’existe pas : seul un acte peut organiser le maintien dans les lieux.",
        ],
      },
    ],
    questions: [
      {
        q: "Peut-on changer de régime matrimonial après des années de mariage ?",
        r: "Oui, par acte notarié. Les enfants majeurs et les créanciers sont informés et peuvent s’y opposer ; le juge n’intervient que dans certains cas, notamment en présence d’enfants mineurs lorsque l’intérêt de la famille le commande.",
      },
      {
        q: "Mon partenaire de PACS héritera-t-il de moi ?",
        r: "Non, sauf si vous avez rédigé un testament en sa faveur. En revanche, s’il est désigné par testament, il ne paiera aucun droit de succession.",
      },
      {
        q: "Le contrat de mariage doit-il être signé avant la cérémonie ?",
        r: "Oui. Il est reçu par le notaire avant le mariage, et son existence est déclarée à l’officier d’état civil. Après la cérémonie, il faudra recourir à un changement de régime.",
      },
    ],
    actes: [
      "contrat-de-mariage",
      "changement-de-regime-matrimonial",
      "pacs",
      "donation-entre-epoux",
    ],
    articles: [
      "contrat-de-mariage-question-de-patrimoine",
      "acheter-a-deux-sans-etre-maries",
      "separation-de-biens-que-possede-chacun",
    ],
  },
  {
    slug: "separation",
    libelle: "Séparation",
    surtitre: "Dossier",
    titreLignes: [
      "Se séparer sans laisser",
      "le patrimoine devenir",
      "un conflit.",
    ],
    chapo:
      "Une séparation se joue rarement sur le droit. Elle se joue sur ce que chacun croit avoir apporté, sur une maison à laquelle on tient, sur un crédit que l’on continue de payer. Mettre des chiffres et des mots précis là-dessus, c’est déjà apaiser.",
    metaTitre: "Notaire séparation, divorce et partage des biens — Combrit (29)",
    metaDescription:
      "Divorce, rupture de PACS, séparation de concubins : indivision, soulte, rachat du crédit, liquidation et partage expliqués simplement par l’étude de Combrit.",
    visuel: "horizon",
    visuelSecondaire: "maree",
    situations: [
      {
        titre: "Vous étiez mariés",
        texte:
          "Le régime matrimonial doit être liquidé. S’il existe un bien immobilier, un état liquidatif notarié est annexé à la convention de divorce.",
      },
      {
        titre: "Vous étiez pacsés",
        texte:
          "La rupture est simple, le partage l’est moins : il faut liquider l’indivision et régler les comptes entre partenaires.",
      },
      {
        titre: "Vous viviez en concubinage",
        texte:
          "La loi ne prévoit rien. Seuls comptent le titre de propriété et la preuve des financements réellement supportés.",
      },
      {
        titre: "Vous avez acheté ensemble",
        texte:
          "Vendre, ou racheter la part de l’autre : dans les deux cas, il faut chiffrer, puis obtenir l’accord de la banque.",
      },
    ],
    sections: [
      {
        id: "situations",
        titre: "Trois statuts, trois logiques",
        paragraphes: [
          "La question « à qui appartient la maison ? » n’a pas la même réponse selon le statut du couple. C’est le point de départ de toute séparation.",
        ],
        liste: [
          {
            titre: "Mariés sans contrat",
            texte:
              "Le bien acheté pendant le mariage est commun, quels que soient les apports de chacun. Celui qui a financé davantage avec des fonds propres peut avoir droit à une récompense.",
          },
          {
            titre: "Mariés en séparation de biens",
            texte:
              "Chacun possède ce qui est à son nom. Le bien acheté ensemble est indivis selon les proportions indiquées dans l’acte — pas selon ce que chacun a payé.",
          },
          {
            titre: "Pacsés ou concubins",
            texte:
              "Le titre de propriété fait loi. Si l’acte dit « moitié-moitié » alors que l’un a versé les trois quarts, il faudra le démontrer pour obtenir une créance.",
          },
        ],
      },
      {
        id: "soulte",
        titre: "La soulte, en pratique",
        paragraphes: [
          "Racheter la part de l’autre suppose deux opérations distinctes, souvent confondues. La première est le partage : le bien est attribué à l’un, qui verse à l’autre une soulte correspondant à la valeur de ses droits. La seconde est le financement : la banque doit accepter de reprendre seul le crédit celui qui reste, et de désolidariser l’autre.",
          "La soulte se calcule à partir de la valeur actuelle du bien, diminuée du capital restant dû, puis répartie selon les droits de chacun — corrigés des créances et récompenses éventuelles. Un partage donne également lieu à un droit proportionnel, dont le taux est réduit lorsqu’il fait suite à un divorce ou à une rupture de PACS.",
          "Tant que la banque n’a pas donné son accord, l’ancien co-emprunteur reste tenu du prêt, même s’il a quitté le logement et même si le juge a statué.",
        ],
      },
      {
        titre: "Et les enfants ?",
        paragraphes: [
          "Les questions relatives à l’autorité parentale, à la résidence des enfants et à la pension alimentaire relèvent des avocats et, le cas échéant, du juge aux affaires familiales. L’étude intervient sur le patrimoine, en lien avec eux.",
          "Le notaire peut en revanche sécuriser ce qui touche au logement des enfants : maintien dans les lieux, mise à disposition du bien indivis, ou attribution préférentielle.",
        ],
      },
    ],
    questions: [
      {
        q: "Qu’est-ce qu’une soulte ?",
        r: "C’est la somme versée par celui qui conserve un bien indivis à celui qui l’abandonne, pour compenser la valeur de ses droits. Elle se calcule sur la valeur nette du bien, après déduction du capital restant dû.",
      },
      {
        q: "J’ai quitté le logement, dois-je encore payer le crédit ?",
        r: "Vis-à-vis de la banque, oui : tant que vous êtes co-emprunteur, vous restez tenu de la totalité. Une désolidarisation ne peut résulter que d’un accord de l’établissement prêteur.",
      },
      {
        q: "Peut-on rester en indivision après la séparation ?",
        r: "Oui, temporairement, et une convention d’indivision permet de l’organiser pour une durée déterminée. Mais nul ne peut être contraint de rester dans l’indivision : chacun peut en demander la sortie.",
      },
      {
        q: "Faut-il un notaire pour un divorce sans juge ?",
        r: "Le notaire dépose la convention rédigée par les avocats au rang de ses minutes, ce qui lui donne date certaine et force exécutoire. Et dès qu’un bien immobilier est en jeu, l’état liquidatif notarié est obligatoire.",
      },
    ],
    actes: [
      "divorce",
      "separation",
      "liquidation-et-partage",
      "propriete-et-indivision",
    ],
    articles: [
      "divorce-maison-commune",
      "separation-de-biens-que-possede-chacun",
      "acheter-a-deux-sans-etre-maries",
    ],
  },
  {
    slug: "transmission-succession",
    libelle: "Transmission & succession",
    surtitre: "Donner, léguer, régler",
    titreLignes: [
      "Anticiper une transmission,",
      "c’est aussi préserver",
      "les relations familiales.",
    ],
    chapo:
      "Les successions difficiles ne le sont presque jamais pour des raisons juridiques. Elles le deviennent parce que rien n’avait été dit, écrit, ni expliqué. Une transmission préparée est d’abord une transmission comprise par tous.",
    metaTitre: "Notaire donation et succession à Combrit (29) — Finistère",
    metaDescription:
      "Donation, donation-partage, testament, succession, partage : préparer et régler la transmission de votre patrimoine avec l’étude de Maître Marine Le Treut.",
    visuel: "bocage",
    visuelSecondaire: "dune",
    situations: [
      {
        titre: "Vous souhaitez donner",
        texte:
          "Aider un enfant, transmettre une maison de famille, organiser l’équilibre entre plusieurs enfants : la donation se prépare, et se chiffre.",
      },
      {
        titre: "Vous voulez écrire vos volontés",
        texte:
          "Un testament clair, conservé et inscrit au fichier central, vaut mieux qu’une note retrouvée dans un tiroir.",
      },
      {
        titre: "Un proche est décédé",
        texte:
          "L’étude vous accompagne pas à pas : héritiers, actifs, dettes, déclaration fiscale, puis partage si vous le souhaitez.",
      },
      {
        titre: "Vous organisez votre patrimoine",
        texte:
          "Détention immobilière, société civile, démembrement, assurance-vie : des outils à combiner selon votre situation.",
      },
    ],
    sections: [
      {
        titre: "Ce que la loi réserve à vos héritiers",
        paragraphes: [
          "En France, on ne dispose pas librement de la totalité de son patrimoine lorsque l’on a des enfants. Une part, la réserve héréditaire, leur revient : la moitié avec un enfant, les deux tiers avec deux enfants, les trois quarts à partir de trois. Le reste, la quotité disponible, peut être attribué librement.",
          "Cette règle, souvent découverte tardivement, explique la plupart des déceptions au moment d’une succession. Elle peut être anticipée, mais rarement contournée.",
        ],
      },
      {
        id: "organiser",
        titre: "Organiser la détention de son patrimoine",
        paragraphes: [
          "Transmettre ne se résume pas à donner. La façon dont un patrimoine est détenu conditionne la facilité avec laquelle il pourra, plus tard, être partagé.",
          "Le démembrement — donner la nue-propriété en conservant l’usufruit — permet de transmettre progressivement tout en gardant l’usage du bien et ses revenus. La société civile immobilière, lorsqu’elle est justifiée, facilite la transmission par parts et évite les blocages de l’indivision. L’assurance-vie, enfin, obéit à des règles propres qu’il faut articuler avec le reste.",
          "Aucun de ces outils n’est bon en soi : ils le deviennent lorsqu’ils répondent à une situation précise.",
        ],
        liste: [
          {
            titre: "Le démembrement",
            texte:
              "Donner la nue-propriété, conserver l’usufruit : la valeur transmise est réduite, et l’usufruit s’éteint au décès sans nouveaux droits à payer.",
          },
          {
            titre: "La société civile",
            texte:
              "Transmettre des parts plutôt qu’un bien indivis, et organiser la gouvernance familiale dans les statuts.",
          },
          {
            titre: "L’assurance-vie",
            texte:
              "Un régime distinct de la succession, dont la clause bénéficiaire mérite d’être relue régulièrement.",
          },
        ],
      },
      {
        titre: "Le calendrier d’une succession",
        paragraphes: [
          "La déclaration de succession doit être déposée dans les six mois suivant un décès survenu en France, douze mois s’il est survenu à l’étranger. Ce délai conditionne le calcul d’éventuels intérêts de retard.",
          "Il ne faut pas confondre ce délai fiscal avec le partage, qui peut intervenir bien plus tard, une fois les esprits apaisés et les évaluations arrêtées.",
        ],
      },
    ],
    questions: [
      {
        q: "Combien puis-je donner à mes enfants sans droits ?",
        r: "Chaque parent peut donner 100 000 € à chacun de ses enfants en franchise de droits de donation. Cet abattement se reconstitue tous les quinze ans. D’autres abattements existent, notamment pour les petits-enfants.",
      },
      {
        q: "Quelle différence entre donation et donation-partage ?",
        r: "La donation simple sera réévaluée au jour du partage successoral, ce qui peut créer un déséquilibre si un bien prend beaucoup de valeur. La donation-partage fige les valeurs au jour de l’acte, dès lors que tous les héritiers réservataires y participent.",
      },
      {
        q: "Le conjoint survivant paie-t-il des droits de succession ?",
        r: "Non. Le conjoint survivant et le partenaire de PACS désigné par testament sont exonérés de droits de succession. Cela ne les dispense pas d’organiser leur protection : l’exonération fiscale ne règle pas la question civile.",
      },
    ],
    actes: [
      "donation",
      "donation-partage",
      "testament",
      "succession",
      "partage-successoral",
      "anticipation-de-la-transmission",
      "sci",
      "donation-immobiliere",
    ],
    articles: [
      "donation-ou-succession-pourquoi-anticiper",
      "donation-partage-transmettre-aujourd-hui",
      "comment-se-deroule-une-succession",
      "sci-dans-quels-cas-utile",
    ],
  },
  {
    slug: "entreprise",
    libelle: "Entreprise",
    surtitre: "Entreprendre",
    titreLignes: [
      "Derrière chaque entreprise,",
      "il y a un patrimoine",
      "personnel.",
    ],
    chapo:
      "Créer, racheter, céder, transmettre : ces décisions professionnelles engagent presque toujours le patrimoine privé du dirigeant, son couple et sa famille. C’est précisément là que le notaire est utile.",
    metaTitre: "Notaire entreprise et dirigeant à Combrit (29)",
    metaDescription:
      "Création, acquisition, cession et transmission d’entreprise, immobilier professionnel, protection du dirigeant : l’étude de Combrit accompagne vos projets.",
    visuel: "granit",
    visuelSecondaire: "seuil",
    situations: [
      {
        titre: "Vous créez",
        texte:
          "Forme sociale, statuts, apports, protection du patrimoine privé : les choix du départ sont ceux qui durent.",
      },
      {
        titre: "Vous reprenez",
        texte:
          "Fonds de commerce ou titres de société : deux opérations de nature différente, avec des risques différents.",
      },
      {
        titre: "Vous cédez",
        texte:
          "Une cession se prépare deux à trois ans à l’avance, y compris pour ce que l’on fera du prix.",
      },
      {
        titre: "Vous transmettez à vos enfants",
        texte:
          "Concilier la continuité de l’entreprise et l’équité entre les enfants : c’est l’un des exercices les plus délicats.",
      },
    ],
    sections: [
      {
        titre: "Séparer l’immobilier de l’exploitation",
        paragraphes: [
          "Détenir les murs professionnels dans la société d’exploitation paraît simple, mais complique tout le reste : cela alourdit la valeur de l’entreprise au moment de la vendre, expose l’immeuble aux aléas de l’activité, et prive le dirigeant d’un revenu locatif après son départ.",
          "Une structure distincte, avec un bail commercial correctement rédigé, répond généralement mieux à ces trois enjeux. Encore faut-il l’anticiper : rapatrier un immeuble a posteriori a un coût.",
        ],
      },
      {
        titre: "Ce qui protège vraiment le dirigeant",
        paragraphes: [
          "La résidence principale de l’entrepreneur individuel est insaisissable de plein droit par les créanciers professionnels. Les autres biens fonciers non affectés à l’usage professionnel peuvent l’être par une déclaration reçue par le notaire.",
          "Mais la protection la plus efficace reste souvent la moins spectaculaire : un régime matrimonial adapté, des cautions personnelles limitées dans leur montant et leur durée, et une clause bénéficiaire d’assurance-vie cohérente avec la situation familiale.",
        ],
      },
    ],
    questions: [
      {
        q: "Mon conjoint est-il concerné par mon entreprise ?",
        r: "Presque toujours. Sous le régime légal, les parts sociales acquises avec des fonds communs sont communes. Le conjoint doit par ailleurs consentir à certains actes, et il est directement exposé si des cautions ont été données.",
      },
      {
        q: "Faut-il créer une SCI pour les locaux professionnels ?",
        r: "Souvent, mais pas systématiquement. Cela dépend du financement, de la durée de détention envisagée, du régime fiscal choisi et de vos projets de cession. C’est un calcul à faire, pas un réflexe.",
      },
      {
        q: "Qu’est-ce que le pacte Dutreil ?",
        r: "Un engagement collectif puis individuel de conservation des titres qui, sous des conditions strictes de durée et d’exercice d’une fonction de direction, permet une exonération partielle des droits de mutation lors d’une transmission familiale.",
      },
    ],
    actes: [
      "creation-d-entreprise",
      "acquisition-d-entreprise",
      "cession-d-entreprise",
      "transmission-d-entreprise",
      "organisation-patrimoniale-du-dirigeant",
      "sci",
    ],
    articles: ["sci-dans-quels-cas-utile"],
  },
];

export function projetParSlug(slug: string): PageProjet | undefined {
  return pagesProjets.find((p) => p.slug === slug);
}
