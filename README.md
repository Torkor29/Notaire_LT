# Site de l'office notarial de Combrit — Me Marine Le Treut

Site vitrine statique : aucun serveur applicatif, aucune base de données, aucune
dépendance à installer. Quatre pages publiques et une page de mentions légales.

```
index.html            L'office : présentation, méthode, déroulé d'un dossier
actes.html            Les domaines d'intervention et les actes reçus
annonces.html         Biens à vendre — la négociation notariale
offres.html           Recrutement — les offres d'emploi publiées
contact.html          Coordonnées, horaires, accès et formulaire
mentions-legales.html Éditeur, données personnelles, médiation
admin.html            Espace de gestion — saisie des biens et des offres
assets/css/style.css  Feuille de styles unique
assets/js/admin.js    L'espace de gestion
assets/js/main.js     Menu mobile, accordéon, annonces et filtres, offres, formulaire
assets/data/annonces.js Les biens à vendre — le fichier à modifier pour publier un bien
assets/data/offres.js   Les offres d'emploi
```

## Consulter le site en local

Ouvrir `index.html` dans un navigateur suffit. Pour être au plus près du site
en ligne :

```sh
python3 -m http.server 8000
# puis http://localhost:8000
```

## L'espace de gestion (`admin.html`)

Pour éviter d'avoir à ouvrir un fichier de code, `admin.html` propose un
formulaire : liste des biens à gauche, saisie à droite, aperçu de la fiche telle
qu'elle apparaîtra sur le site. Un second onglet gère les offres d'emploi.

Le fonctionnement est volontairement simple et sans serveur :

1. **Saisir.** Les modifications sont mémorisées dans le navigateur
   (`localStorage`) — on peut fermer l'onglet et reprendre plus tard. Un bandeau
   signale les modifications non publiées.
2. **Télécharger.** Le bouton produit un fichier `annonces.js` (ou `offres.js`)
   complet et correctement formaté.
3. **Publier.** Déposer ce fichier dans `assets/data/` chez l'hébergeur, en
   remplacement de l'ancien. Le site est à jour immédiatement.

Cette page ne peut rien modifier en ligne par elle-même : elle fabrique un
fichier, rien de plus. C'est pourquoi elle n'a pas de mot de passe — il n'y
aurait rien à protéger. Elle porte un `noindex` et n'est pas dans la navigation
principale (seulement un lien discret en pied de page, à retirer si besoin).

Pour une administration en ligne réelle (connexion, modification depuis le
téléphone, publication automatique), il faut passer par un hébergement Git —
Netlify ou Cloudflare Pages avec Decap CMS, par exemple. Le site est déjà
structuré pour : les contenus sont isolés dans `assets/data/`.

## Publier un bien à vendre

Le plus simple est de passer par l'espace de gestion ci-dessus. Pour une
modification directe du fichier `assets/data/annonces.js`, ajouter un bloc dans
la liste :

```js
{
  ref: "2026-025",
  titre: "Maison de bourg rénovée",
  commune: "Combrit",
  type: "Maison",              // Maison | Appartement | Terrain | Local | Autre
  statut: "Disponible",        // Disponible | Sous compromis | Vendu
  prix: 295000,
  honoraires: "Honoraires de négociation inclus, à la charge de l'acquéreur : 4,5 % TTC du prix hors honoraires",
  surface: 110, terrain: 450, pieces: 5, chambres: 3,
  dpe: "D", ges: "B",          // "NS" si le bien n'est pas soumis au DPE
  description: "Deux ou trois phrases de présentation.",
  photo: "assets/img/2026-025.jpg",   // facultatif
  date: "2026-10-01",
  visible: true
}
```

Les biens disponibles s'affichent en premier, puis ceux sous compromis, puis
les biens vendus (utiles pour montrer l'activité de l'office — passer
`visible: false` pour les retirer). Les filtres par type et par commune se
construisent automatiquement à partir des données. Sans photo, une vignette
neutre portant le type du bien est affichée : mettre les images dans
`assets/img/`, au format paysage, redimensionnées à 1200 px de large environ.

Les mentions obligatoires d'une annonce immobilière (prix honoraires inclus et
répartition de la charge, classes DPE et GES, informations de copropriété) sont
prévues par les champs ci-dessus et rappelées en bas de la page `annonces.html`.

## Publier une offre d'emploi

Même principe, dans `assets/data/offres.js` (ou via l'espace de gestion) :

```js
{
  titre: "Formaliste",
  contrat: "CDI",
  lieu: "Combrit Sainte-Marine",
  temps: "Temps plein",
  date: "2026-10-01",
  resume: "Une phrase ou deux de présentation du poste.",
  missions: ["Première mission", "Deuxième mission"],
  profil: "Le profil recherché.",
  visible: true
}
```

Les offres s'affichent de la plus récente à la plus ancienne. Pour retirer une
offre sans la perdre, passer `visible: false`. Si aucune offre n'est visible, la
page affiche automatiquement une invitation aux candidatures spontanées.

## Formulaire de contact

Le formulaire ouvre le logiciel de messagerie du visiteur avec un message
pré-rempli : il fonctionne sans hébergement dynamique. Si l'office préfère
recevoir les demandes par un service de formulaire (Formspree, Tally, ou un
script PHP chez l'hébergeur), il suffit de remplacer l'attribut `action` du
formulaire dans `contact.html` et de retirer le bloc `[data-contact-form]` de
`assets/js/main.js`.

## À compléter avant la mise en ligne

- Mentions légales : forme juridique, SIREN, TVA, hébergeur (marqués en italique).
- Vérifier les horaires d'ouverture (`contact.html` et le pied de page).
- Ajuster les coordonnées du marqueur de la carte dans `contact.html` si besoin
  (paramètres `bbox` et `marker` de l'iframe OpenStreetMap).
- Ajouter, si souhaité, un portrait et une photo des locaux.

## Mise en ligne

Le site étant entièrement statique, il se déploie sur n'importe quel
hébergement mutualisé (dépôt des fichiers par FTP) ou sur GitHub Pages,
Netlify, Cloudflare Pages sans configuration particulière.
