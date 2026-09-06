/*
 * ANNONCES IMMOBILIÈRES DE L'OFFICE (négociation notariale)
 * --------------------------------------------------------
 * Pour publier un bien : ajoutez un bloc { ... } dans la liste ci-dessous.
 * Pour le retirer : supprimez le bloc, ou passez "visible" à false.
 * Aucune autre page n'a besoin d'être modifiée.
 *
 * Champs :
 *   ref          référence interne du mandat, ex. "2026-014"
 *   titre        intitulé du bien, ex. "Maison de bourg rénovée"
 *   commune      commune du bien
 *   type         "Maison" | "Appartement" | "Terrain" | "Local" | "Autre"
 *   statut       "Disponible" | "Sous compromis" | "Vendu"
 *   prix         prix en euros, en nombre (sans espace ni symbole)
 *   honoraires   mention du barème, affichée sous le prix
 *   surface      surface habitable en m² (nombre)
 *   terrain      surface du terrain en m² (nombre, facultatif)
 *   pieces       nombre de pièces (facultatif)
 *   chambres     nombre de chambres (facultatif)
 *   dpe / ges    classes énergétiques "A" à "G", ou "NS" si non soumis
 *   description  un ou deux paragraphes
 *   photo        chemin d'une image, ex. "assets/img/2026-014.jpg" (facultatif)
 *   copropriete  texte des mentions de copropriété (facultatif)
 *   date         date de mise en ligne, format "2026-09-01"
 *   visible      false pour masquer sans supprimer
 *
 * Rappel : les mentions de prix, d'honoraires, de DPE et de copropriété sont
 * obligatoires dans toute annonce immobilière. Vérifiez-les avant publication.
 */

window.ANNONCES = [
  {
    ref: "2026-021",
    titre: "Maison de pêcheur, à deux pas du port",
    commune: "Combrit Sainte-Marine",
    type: "Maison",
    statut: "Disponible",
    prix: 428000,
    honoraires: "Honoraires de négociation inclus, à la charge de l'acquéreur : 4,2 % TTC du prix hors honoraires",
    surface: 96,
    terrain: 310,
    pieces: 5,
    chambres: 3,
    dpe: "D",
    ges: "B",
    description: "Maison en pierre entièrement restaurée, à cent mètres du port de Sainte-Marine. Séjour traversant ouvert sur une courette abritée, cuisine indépendante, trois chambres à l'étage dont une avec vue sur l'estuaire. Chauffage par pompe à chaleur, menuiseries récentes, toiture révisée en 2021.",
    date: "2026-09-02",
    visible: true
  },
  {
    ref: "2026-018",
    titre: "Longère sur un terrain clos et arboré",
    commune: "Combrit",
    type: "Maison",
    statut: "Disponible",
    prix: 356000,
    honoraires: "Honoraires de négociation inclus, à la charge de l'acquéreur : 4,5 % TTC du prix hors honoraires",
    surface: 142,
    terrain: 1840,
    pieces: 6,
    chambres: 4,
    dpe: "E",
    ges: "C",
    description: "À cinq minutes du bourg, longère de caractère conservant ses poutres et sa cheminée d'origine. Vaste pièce de vie, quatre chambres, buanderie et garage attenant. Le terrain, clos et planté, permet une extension sous réserve des règles d'urbanisme.",
    date: "2026-08-26",
    visible: true
  },
  {
    ref: "2026-015",
    titre: "Appartement avec balcon, résidence de 2018",
    commune: "Pont-l'Abbé",
    type: "Appartement",
    statut: "Sous compromis",
    prix: 214000,
    honoraires: "Honoraires de négociation inclus, à la charge du vendeur",
    surface: 63,
    pieces: 3,
    chambres: 2,
    dpe: "B",
    ges: "A",
    description: "Au deuxième étage avec ascenseur, appartement lumineux exposé sud-ouest, balcon de 9 m², place de stationnement privative en sous-sol. Résidence récente, bien tenue, à proximité immédiate des commerces du centre.",
    copropriete: "Copropriété de 34 lots. Charges annuelles prévisionnelles : 1 260 €. Aucune procédure en cours au titre de l'article 29-1 A de la loi du 10 juillet 1965.",
    date: "2026-08-11",
    visible: true
  },
  {
    ref: "2026-009",
    titre: "Terrain à bâtir viabilisé, orienté sud",
    commune: "Île-Tudy",
    type: "Terrain",
    statut: "Disponible",
    prix: 168000,
    honoraires: "Honoraires de négociation inclus, à la charge de l'acquéreur : 5 % TTC du prix hors honoraires",
    terrain: 615,
    dpe: "NS",
    ges: "NS",
    description: "Lot libre de constructeur en zone UH, viabilisé en eau, électricité et assainissement collectif en limite de propriété. Certificat d'urbanisme opérationnel positif obtenu. Plage accessible à pied.",
    date: "2026-07-15",
    visible: true
  },
  {
    ref: "2026-004",
    titre: "Local commercial en centre-bourg",
    commune: "Combrit",
    type: "Local",
    statut: "Vendu",
    prix: 132000,
    honoraires: "Honoraires de négociation inclus, à la charge de l'acquéreur : 5 % TTC du prix hors honoraires",
    surface: 78,
    dpe: "F",
    ges: "D",
    description: "Local en rez-de-chaussée avec vitrine sur la place, réserve et sanitaires. Libre de toute occupation.",
    date: "2026-05-20",
    visible: true
  }
];
