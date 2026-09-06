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
admin/                Interface de gestion en ligne (Decap CMS)
gestion-hors-ligne.html Même saisie, sans connexion, avec export du fichier
merci.html · 404.html Confirmation d'envoi et page d'erreur
assets/css/style.css  Feuille de styles unique
assets/js/admin.js    La saisie hors ligne
assets/js/main.js     Menu mobile, accordéon, annonces et filtres, offres, formulaire
assets/data/annonces.json Les biens à vendre
assets/data/offres.json   Les offres d'emploi
netlify.toml · _headers · _redirects   Configuration d'hébergement
robots.txt · sitemap.xml · favicon.svg Référencement
```

## Consulter le site en local

Les contenus sont chargés depuis des fichiers JSON : il faut un petit serveur
web, un double-clic sur `index.html` ne suffit plus.

```sh
python3 -m http.server 8000
# puis http://localhost:8000
```

## Modifier le contenu

**En ligne, au quotidien : `/admin/`.** Interface Decap CMS — connexion par
courriel et mot de passe, saisie par formulaire, publication en un clic. Chaque
enregistrement écrit dans le dépôt Git et déclenche une nouvelle mise en ligne ;
l'historique est conservé et toute erreur est réversible. L'activation des
comptes est décrite dans `DEPLOIEMENT.md`.

**Hors connexion, ou en secours : `gestion-hors-ligne.html`.** Même saisie, avec
aperçu de la fiche telle qu'elle apparaîtra. Les modifications restent dans le
navigateur, puis le bouton produit un `annonces.json` à déposer dans
`assets/data/` chez l'hébergeur.

**À la main :** les deux fichiers de `assets/data/` sont du JSON lisible.

## Publier un bien à vendre

Le plus simple est de passer par `/admin/`. Structure d'un bien dans
`assets/data/annonces.json` :

```json
{
  "ref": "2026-025",
  "titre": "Maison de bourg rénovée",
  "commune": "Combrit",
  "type": "Maison",
  "statut": "Disponible",
  "prix": 295000,
  "honoraires": "Honoraires de négociation inclus, à la charge de l'acquéreur : 4,5 % TTC du prix hors honoraires",
  "surface": 110, "terrain": 450, "pieces": 5, "chambres": 3,
  "dpe": "D", "ges": "B",
  "description": "Deux ou trois phrases de présentation.",
  "photo": "assets/img/2026-025.jpg",
  "date": "2026-10-01",
  "visible": true
}
```

`type` : Maison, Appartement, Terrain, Local ou Autre. `statut` : Disponible,
Sous compromis ou Vendu. `dpe` et `ges` : de A à G, ou `NS` pour un bien non
soumis au diagnostic.

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

Même principe, dans `assets/data/offres.json` :

```json
{
  "titre": "Formaliste",
  "contrat": "CDI",
  "lieu": "Combrit Sainte-Marine",
  "temps": "Temps plein",
  "date": "2026-10-01",
  "resume": "Une phrase ou deux de présentation du poste.",
  "missions": ["Première mission", "Deuxième mission"],
  "profil": "Le profil recherché.",
  "visible": true
}
```

Les offres s'affichent de la plus récente à la plus ancienne. Pour retirer une
offre sans la perdre, passer `visible: false`. Si aucune offre n'est visible, la
page affiche automatiquement une invitation aux candidatures spontanées.

## Formulaire de contact

Configuré pour Netlify Forms : les demandes arrivent dans le tableau de bord de
l'hébergeur, avec notification par courriel, et le visiteur est redirigé vers
`merci.html`. Un champ piège invisible filtre les robots. Sur un hébergement
sans service de formulaire, remplacer la ligne `<form name="contact" …>` de
`contact.html` par `<form data-contact-fallback>` : le message est alors préparé
dans le logiciel de messagerie du visiteur.

## Mise en ligne

Voir **`DEPLOIEMENT.md`** : hébergement Netlify pas à pas, activation des
comptes de l'interface de gestion, nom de domaine, et variantes Cloudflare
Pages ou hébergement mutualisé classique.

## À compléter avant la mise en ligne

- Mentions légales : forme juridique, SIREN, TVA, hébergeur (marqués en italique).
- Vérifier les horaires d'ouverture (`contact.html` et le pied de page).
- Ajuster les coordonnées du marqueur de la carte dans `contact.html` si besoin
  (paramètres `bbox` et `marker` de l'iframe OpenStreetMap).
- Ajouter, si souhaité, un portrait et une photo des locaux.
