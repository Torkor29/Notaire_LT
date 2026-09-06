# Site de l'office notarial de Combrit — Me Marine Le Treut

> **Variante de style « douce ».** Cette branche propose la même structure et le
> même contenu que la branche principale, avec une direction artistique
> différente : formes arrondies, ombres légères, palette chaude (sauge, sable,
> crème), typographies Fraunces et Plus Jakarta Sans, boutons et filtres en
> pastilles. La branche `claude/notaire-combrit-website-1t789m` porte la version
> sobre et éditoriale (angles droits, filets fins, Newsreader et Inter). Seule
> `assets/css/style.css` et l'appel des polices diffèrent : on peut basculer de
> l'une à l'autre sans toucher au contenu ni à l'interface de gestion.
>
> La page d'accueil de cette branche est par ailleurs une véritable page de
> présentation longue : douze sections (hero illustré, chiffres, engagements,
> domaines, parcours, biens mis en avant, comparatif, témoignages, FAQ,
> recrutement, appel final) avec apparition au défilement.

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
content/annonces/     Une fiche JSON par bien — ce que l'interface écrit
content/offres/       Une fiche JSON par offre d'emploi
build.mjs             Regroupe les fiches dans assets/data/
merci.html · 404.html Confirmation d'envoi et page d'erreur
assets/css/style.css  Feuille de styles unique
assets/js/main.js     Menu mobile, accordéon, annonces et filtres, offres, formulaire
assets/data/*.json    Fichiers regroupés, lus par le site (générés)
assets/vendor/        Bibliothèques de l'interface, servies par le site
netlify.toml · _headers · _redirects   Configuration d'hébergement
robots.txt · sitemap.xml · favicon.svg Référencement
```

## Consulter le site en local

Les contenus sont chargés depuis des fichiers JSON : il faut un petit serveur
web, un double-clic sur `index.html` ne suffit plus.

```sh
npm run serve   # puis http://localhost:8000
```

## Modifier le contenu : `/admin/`

Interface Decap CMS, en français. Connexion par courriel et mot de passe (pas de
compte GitHub à créer), puis pour chaque collection — biens à vendre, offres
d'emploi :

- **Ajouter** : bouton « Créer une entrée » en haut de la liste ;
- **Modifier** : cliquer sur une fiche, corriger, publier ;
- **Supprimer** : bouton « Supprimer l'entrée » dans la fiche ;
- trier et grouper la liste par statut, commune, prix ou date ;
- envoyer les photos directement, sans FTP.

Chaque enregistrement écrit dans le dépôt Git et déclenche une mise en ligne :
l'historique est conservé et toute erreur est réversible.

### Comment c'est organisé

L'interface écrit **une fiche par fichier** dans `content/annonces/` et
`content/offres/` — c'est ce qui permet l'ajout et la suppression fiche par
fiche. Avant chaque mise en ligne, `build.mjs` regroupe ces fiches dans
`assets/data/annonces.json` et `assets/data/offres.json`, les deux seuls
fichiers que le site public charge. C'est automatique côté hébergeur
(`netlify.toml`) ; en local :

```sh
npm run build
```

Les fichiers regroupés sont versionnés : le site reste consultable même sans
lancer la construction.

### Essayer l'interface en local

```sh
npm run cms      # proxy de l'interface, dans un premier terminal
npm run serve    # le site, dans un second
# puis http://localhost:8000/admin/
```

Les modifications s'écrivent alors dans `content/` sur le disque, sans toucher
au dépôt en ligne.

## Publier un bien à vendre

Le plus simple est de passer par `/admin/`. Structure d'une fiche de
`content/annonces/` :

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
les biens vendus (utiles pour montrer l'activité de l'office — décocher
« afficher ce bien » pour les retirer sans les supprimer). Les filtres par type et par commune se
construisent automatiquement à partir des données. Sans photo, une vignette
neutre portant le type du bien est affichée : mettre les images dans
`assets/img/`, au format paysage, redimensionnées à 1200 px de large environ.

Les mentions obligatoires d'une annonce immobilière (prix honoraires inclus et
répartition de la charge, classes DPE et GES, informations de copropriété) sont
prévues par les champs ci-dessus et rappelées en bas de la page `annonces.html`.

## Publier une offre d'emploi

Même principe, dans `content/offres/` :

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
