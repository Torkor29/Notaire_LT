# Mise en ligne du site

Le site est entièrement statique : aucun serveur applicatif, aucune base de
données. Les contenus modifiables (biens à vendre, offres d'emploi) sont deux
fichiers JSON dans `assets/data/`, édités depuis l'interface de gestion.

---

## 1. Hébergement recommandé : Netlify

C'est le chemin qui donne à la fois l'interface de gestion en ligne, le
formulaire de contact et le HTTPS, sans rien à administrer.

### Mise en place

1. Créer un compte sur netlify.com, puis **Add new site → Import an existing
   project** et connecter le dépôt GitHub `Torkor29/Notaire_LT`.
2. Réglages de construction : **build command** vide, **publish directory** `.`
   (`netlify.toml` les renseigne déjà, il n'y a normalement rien à saisir).
3. Déployer. Le site est en ligne sur une adresse en `.netlify.app`.

### Nom de domaine

**Domain management → Add a domain**, puis suivre les instructions DNS auprès du
registrar (OVH, Gandi…). Le certificat HTTPS est émis automatiquement dans
l'heure. Prévoir un domaine du type `notaire-combrit.fr`.

> Une fois le domaine connu, remplacer `https://www.notaire-combrit.fr` partout
> dans le projet : `sitemap.xml`, `robots.txt`, et les balises `canonical` /
> `og:url` en tête de chaque page HTML. Une recherche-remplacement suffit.

### Interface de gestion (`/admin/`)

Elle repose sur Decap CMS : Me Le Treut se connecte avec son adresse courriel,
saisit un bien, clique sur *Publier*, et le site se met à jour tout seul en une
minute environ. Aucun fichier à manipuler, aucun compte GitHub nécessaire.

Activation, une seule fois :

1. **Site configuration → Identity → Enable Identity**.
2. **Identity → Services → Git Gateway → Enable Git Gateway**.
3. **Identity → Registration preferences → Invite only** (indispensable : sans
   cela, n'importe qui pourrait créer un compte).
4. **Identity → Invite users** : saisir l'adresse de Me Le Treut. Elle reçoit un
   courriel, choisit son mot de passe, et accède à `votre-domaine.fr/admin/`.

Chaque enregistrement crée un commit dans le dépôt : l'historique des
modifications est conservé, et une erreur de saisie est toujours réversible.

### Formulaire de contact

Il est déjà configuré pour Netlify Forms (`data-netlify="true"` dans
`contact.html`) : rien à faire, les demandes apparaissent dans **Forms** et le
visiteur est redirigé vers `merci.html`. Pour recevoir une alerte à chaque
message : **Forms → Settings → Form notifications → Email notification**, avec
l'adresse de l'office. Un champ piège invisible filtre les robots ; le plan
gratuit couvre 100 soumissions par mois.

---

## 2. Autre hébergement Git : Cloudflare Pages, Vercel

Le déploiement fonctionne à l'identique (aucune commande de construction,
dossier publié : la racine). `_headers` et `_redirects` prennent le relais de
`netlify.toml`. Deux différences :

- **Interface de gestion** : remplacer le bloc `backend` de `admin/config.yml`
  par la variante `github` documentée en commentaire dans le fichier. La
  connexion se fait alors avec un compte GitHub ayant accès au dépôt.
- **Formulaire** : Netlify Forms n'existe pas ailleurs. Utiliser un service
  externe (Formspree, Tally, Web3Forms) en changeant l'attribut `action` du
  formulaire, ou revenir au mode sans serveur décrit ci-dessous.

---

## 3. Hébergement mutualisé classique (OVH, Ionos, o2switch…)

Déposer l'ensemble des fichiers par FTP dans le dossier `www/`. Le site
fonctionne, mais :

- **L'interface `/admin/` ne fonctionne pas** (elle a besoin d'un dépôt Git).
  Utiliser `gestion-hors-ligne.html` : saisie par formulaire, puis
  téléchargement de `annonces.json` à redéposer par FTP dans `assets/data/`.
- **Le formulaire de contact** doit être basculé en mode sans serveur :
  dans `contact.html`, remplacer la ligne `<form name="contact" …>` par
  `<form data-contact-fallback>` (le commentaire juste au-dessus le rappelle).
  Le message est alors préparé dans le logiciel de messagerie du visiteur.
- Vérifier que l'hébergeur sert bien `404.html` en page d'erreur.

---

## À faire avant l'ouverture au public

- [ ] Faire confirmer par l'office l'adresse, le téléphone et les horaires
      (repris d'annuaires en ligne, à vérifier).
- [ ] Compléter les mentions légales : forme juridique et capital, SIREN, TVA
      intracommunautaire, coordonnées de l'hébergeur. Les passages à compléter
      sont en italique dans `mentions-legales.html`.
- [ ] Remplacer les cinq biens et les trois offres d'exemple par les vrais.
- [ ] Ajuster le marqueur de la carte dans `contact.html` (`bbox` et `marker` de
      l'iframe OpenStreetMap) sur l'adresse exacte.
- [ ] Remplacer le domaine d'exemple dans `sitemap.xml`, `robots.txt` et les
      balises `canonical`.
- [ ] Remplacer `favicon.svg` par le monogramme définitif si l'office en a un.
- [ ] Ajouter un portrait et une photo des locaux (`assets/img/`).
- [ ] Déclarer le site sur Google Search Console et créer la fiche
      Google Business Profile de l'office (déterminant en recherche locale).

## Ce que le site ne fait pas, volontairement

Aucun cookie de mesure d'audience, aucun traceur publicitaire : rien à
consentir, pas de bandeau. Si un suivi de fréquentation devient nécessaire,
privilégier Netlify Analytics ou Plausible, qui n'utilisent pas de cookies et
restent conformes sans bandeau de consentement.

Les seules ressources externes chargées par les pages publiques sont les
polices Google Fonts et la carte OpenStreetMap, signalées dans les mentions
légales. Pour supprimer toute dépendance externe, héberger les deux fichiers de
police dans `assets/` et remplacer la carte par une image statique.
