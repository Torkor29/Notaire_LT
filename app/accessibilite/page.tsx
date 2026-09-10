import type { Metadata } from "next";
import { site, url } from "@/lib/site";
import { PageLegale, ACompleter } from "@/components/PageLegale";

export const metadata: Metadata = {
  title: "Accessibilité",
  description:
    "Déclaration d’accessibilité du site de l’office notarial Marine Le Treut : dispositions prises, limites connues, contact.",
  alternates: { canonical: "/accessibilite" },
  openGraph: { title: "Accessibilité", url: url("/accessibilite") },
};

export default function PageAccessibilite() {
  return (
    <PageLegale
      surtitre="Accessibilité"
      titreLignes={["Accessibilité", "du site."]}
      chapo="Un site de notaire doit pouvoir être consulté par tout le monde, y compris avec un lecteur d’écran, au clavier seul, ou avec une sensibilité au mouvement."
      miettes={[{ libelle: "Accessibilité", href: "/accessibilite" }]}
      miseAJour="septembre 2026"
    >
      <h2>Ce qui a été mis en place</h2>
      <ul>
        <li>
          <strong>Navigation au clavier</strong>&nbsp;: tous les éléments
          interactifs sont atteignables et activables au clavier, avec un
          indicateur de focus visible. Un lien d’évitement permet
          d’accéder directement au contenu principal.
        </li>
        <li>
          <strong>Structure sémantique</strong>&nbsp;: titres hiérarchisés,
          repères de page (bandeau, navigation, contenu, pied de page), listes
          et tableaux correctement balisés.
        </li>
        <li>
          <strong>Mouvement</strong>&nbsp;: la préférence système « réduire les
          animations » est respectée. Lorsqu’elle est active, les
          apparitions au défilement, le parallax et les compteurs sont
          désactivés.
        </li>
        <li>
          <strong>Contrastes</strong>&nbsp;: les couleurs de texte ont été
          choisies pour respecter un rapport de contraste d’au moins 4,5:1
          sur le texte courant.
        </li>
        <li>
          <strong>Contenus non textuels</strong>&nbsp;: les illustrations
          décoratives sont masquées aux technologies d’assistance ; les
          schémas pédagogiques sont doublés d’une description textuelle.
        </li>
        <li>
          <strong>Sans JavaScript</strong>&nbsp;: le contenu reste entièrement
          lisible si les scripts sont désactivés ou échouent à se charger.
        </li>
        <li>
          <strong>Formulaires</strong>&nbsp;: chaque champ possède une étiquette
          visible, les erreurs sont annoncées et associées au champ concerné.
        </li>
      </ul>

      <h2>Limites connues</h2>
      <ul>
        <li>
          La carte interactive fournie par OpenStreetMap est un service tiers
          dont l’accessibilité ne dépend pas de l’étude. L’adresse
          complète et un lien d’itinéraire sont systématiquement fournis en
          texte à côté de la carte.
        </li>
        <li>
          Les documents éventuellement mis à disposition en téléchargement ne
          font pas encore l’objet d’une vérification
          d’accessibilité systématique.
        </li>
      </ul>

      <ACompleter>
        <p>
          Une déclaration d’accessibilité formelle suppose un audit selon
          le référentiel général d’amélioration de l’accessibilité
          (RGAA). Avant mise en ligne, il conviendra de faire réaliser cet audit
          et d’indiquer ici le taux de conformité obtenu, la date de
          l’audit et le plan d’action retenu.
        </p>
      </ACompleter>

      <h2>Signaler une difficulté</h2>
      <p>
        Si vous rencontrez un obstacle pour accéder à un contenu de ce site,
        écrivez à <a href={`mailto:${site.email}`}>{site.email}</a> ou appelez
        le {site.telephone} en précisant la page concernée. L’information
        recherchée vous sera communiquée par un autre moyen, et le défaut
        corrigé.
      </p>
    </PageLegale>
  );
}
