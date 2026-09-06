# Site de l'office notarial de Combrit — Me Marine Le Treut

Site vitrine statique : aucun serveur applicatif, aucune base de données, aucune
dépendance à installer. Quatre pages publiques et une page de mentions légales.

```
index.html            L'office : présentation, méthode, déroulé d'un dossier
actes.html            Les domaines d'intervention et les actes reçus
offres.html           Recrutement — les offres publiées
contact.html          Coordonnées, horaires, accès et formulaire
mentions-legales.html Éditeur, données personnelles, médiation
assets/css/style.css  Feuille de styles unique
assets/js/main.js     Menu mobile, accordéon, affichage des offres, formulaire
assets/data/offres.js Les offres d'emploi — le seul fichier à modifier pour recruter
```

## Consulter le site en local

Ouvrir `index.html` dans un navigateur suffit. Pour être au plus près du site
en ligne :

```sh
python3 -m http.server 8000
# puis http://localhost:8000
```

## Publier une offre d'emploi

Tout se passe dans `assets/data/offres.js`. Ajouter un bloc dans la liste :

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
