# Office notarial Marine Le Treut — site web

Site institutionnel de l'office notarial de **Maître Marine Le Treut**
— 1 impasse Saint-Tudy, 29120 Combrit (Finistère Sud).

Next.js 16 (App Router, React 19), TypeScript, Tailwind CSS v4.
Aucune dépendance d'animation : le mouvement repose sur un moteur maison
d'environ 2 ko qui respecte `prefers-reduced-motion`.

---

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm start          # sert le build
npm run typecheck  # vérification TypeScript
```

Copier `.env.example` vers `.env.local` et renseigner les variables utiles.

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique, sans slash final. Utilisée par les métadonnées, le sitemap et les données structurées. |
| `NEXT_PUBLIC_DEMO_LISTINGS` | `true` affiche deux annonces immobilières de **démonstration**, explicitement étiquetées comme fictives et exclues de l'indexation. Doit rester absente en production. |
| `CONTACT_WEBHOOK_URL` | Destination des demandes du formulaire de contact (voir plus bas). |
| `CONTACT_TO_EMAIL` | Adresse de réception indiquée dans la charge utile envoyée au webhook. |

---

## Ce qui reste à fournir par l'étude

Le site a été construit **sans inventer aucune information** sur l'office.
Les éléments suivants n'ont pas été communiqués et sont donc absents,
signalés dans l'interface par un encadré « À compléter avant mise en ligne » :

- horaires d'ouverture ;
- numéro CRPCEN, SIREN, TVA intracommunautaire ;
- chambre départementale et conseil régional de rattachement ;
- assurance de responsabilité civile professionnelle ;
- identité de l'hébergeur du site ;
- délégué à la protection des données ;
- portrait photographique de Maître Le Treut ;
- composition de l'équipe ;
- logo de l'étude.

Ces informations se renseignent dans **`lib/site.ts`** (bloc `aCompleter`) et
dans les pages `app/mentions-legales/`, `app/confidentialite/` et
`app/accessibilite/`.

> **Avant mise en ligne** : l'ensemble des contenus juridiques doit être relu
> et validé par l'étude. Ils ont été rédigés comme des contenus pédagogiques
> généraux, jamais comme des consultations, et chaque page porte un
> avertissement en ce sens.

---

## Ajouter un article (le « CMS »)

Les articles sont de simples fichiers Markdown dans `content/conseils/`.
Créer un fichier `mon-article.md` : il sera automatiquement publié à
l'adresse `/conseils/mon-article`, ajouté au magazine, au sitemap, à la
recherche et au maillage interne.

```markdown
---
titre: "Titre de l'article"
chapo: "Une ou deux phrases d'accroche."
description: "Meta description, 150 à 160 caractères."
categorie: "Immobilier"      # Immobilier · Couple · Séparation · Famille · Succession · Patrimoine · Entreprise
publication: "2026-09-15"
miseAJour: "2026-09-15"
visuel: "facade"             # horizon · dune · facade · granit · maree · seuil · voile · bocage
aLaUne: false                # true pour la mise en avant du magazine
motsCles: "mots du langage courant pour la recherche interne"
actes: ["vente-immobiliere"] # fiches liées (slugs de lib/actes.ts)
articles: ["sci-dans-quels-cas-utile"]
faq:
  - q: "Une question fréquente ?"
    r: "Sa réponse."
---

Le corps de l'article, en Markdown.

## Un intitulé de section

Les titres de niveau 2 alimentent automatiquement le sommaire collant.

> [!retenir] À retenir
> Cette syntaxe produit un encadré « À retenir ».
```

Le temps de lecture est calculé automatiquement, ainsi que les données
structurées `Article` et `FAQPage`.

---

## Publier un bien immobilier

La page `/immobilier` fonctionne **sans aucun bien** : elle affiche alors un
état vide soigné. Aucun bien fictif n'est jamais présenté en production.

Deux façons d'alimenter la rubrique, décrites dans `lib/biens.ts` :

1. **En local** — ajouter des objets `Bien` dans le tableau `biensDeLEtude`,
   avec les photographies déposées dans `public/images/biens/`.
2. **Depuis une source externe** — implémenter l'interface `SourceBiens`
   (`lister()` / `parSlug()`) et la brancher sur `sourceActive`. Les pages
   n'ont pas à être modifiées.

Les mentions obligatoires (honoraires, DPE avec son échelle, informations de
copropriété, renvoi à Géorisques) sont générées à partir des champs de
l'objet `Bien`.

---

## Formulaire de contact

Le formulaire valide les saisies côté serveur (action serveur, sans API
publique) et comporte un piège à robots.

- **Avec `CONTACT_WEBHOOK_URL`** : la demande est transmise en JSON au service
  d'acheminement de votre choix (Formspree, Brevo, une fonction interne…).
- **Sans configuration** : le site ne prétend jamais avoir envoyé un message.
  Il affiche un lien `mailto:` pré-rempli avec l'intégralité de la demande, de
  sorte qu'aucun message ne se perde silencieusement.

---

## Photographies

Tant que les photographies de l'étude, de Combrit et de Sainte-Marine ne sont
pas disponibles, le site s'appuie sur **neuf compositions vectorielles**
dessinées pour ce projet (littoral, dunes, granit, architecture bretonne,
seuils, marées). Ce ne sont jamais de fausses photographies.

Pour passer à de vraies images, déposer les fichiers dans `public/images/` et
passer la propriété `src` au composant `Visuel` :

```tsx
<Visuel variante="facade" src="/images/etude-facade.jpg" alt="…" ratio="4 / 5" />
```

Le composant bascule alors sur `next/image` (AVIF/WebP, tailles responsives,
chargement différé) en conservant les animations de révélation et le parallax.

---

## Structure

```
app/
  page.tsx                    Accueil
  etude/                      L'étude
  vos-projets/[slug]/         5 dossiers de situation (dont le dossier séparation)
  actes/[slug]/               26 fiches pédagogiques
  conseils/[slug]/            Magazine (Markdown)
  immobilier/[slug]/          Biens proposés par l'étude
  preparer-mon-rendez-vous/   Checklist de documents
  mon-projet-en-60-secondes/  Questionnaire d'orientation
  faq/ recherche/ contact/
  mentions-legales/ confidentialite/ cookies/ accessibilite/ plan-du-site/
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx

components/                   Design system et composants d'interface
content/conseils/*.md         Articles
lib/
  site.ts                     Source unique des informations de l'étude
  actes.ts projets.ts faq.ts  Contenus structurés
  outils.ts                   Parcours interactifs
  biens.ts                    Couche de données immobilières
  index-recherche.ts          Index de recherche transversal
public/fonts/                 Fraunces et Inter, auto-hébergées
```

---

## Choix techniques

**Typographie** — Fraunces (titres) et Inter (interface), auto-hébergées en
sous-ensemble latin. Aucune requête vers un service de polices tiers, et
aucun accès réseau nécessaire au moment du build.

**Animations** — un unique `IntersectionObserver` révèle les éléments portant
l'attribut `data-reveal` ; une seule boucle `requestAnimationFrame` pilote le
parallax via une variable CSS. Tout est désactivé sous
`prefers-reduced-motion`, et une règle `<noscript>` garantit qu'aucun contenu
ne reste masqué sans JavaScript.

**Confidentialité** — aucun cookie de mesure d'audience ni de publicité. Les
cartes OpenStreetMap ne sont chargées qu'après un clic explicite. Les favoris
immobiliers restent dans le navigateur de l'internaute.

**Accessibilité** — audit `axe-core` (WCAG 2.1 A/AA + bonnes pratiques) sans
violation sur les seize gabarits du site. Navigation clavier complète, lien
d'évitement, accordéons natifs `<details>`, schémas doublés d'une description
textuelle.

**SEO local** — métadonnées uniques par page, URL propres, fil d'Ariane,
sitemap, robots, OpenGraph, et données structurées `Notary` / `LocalBusiness`,
`Article`, `FAQPage`, `BreadcrumbList`, `Service`, `RealEstateListing`.
