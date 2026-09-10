import type { Metadata } from "next";
import { site, adressePostale, mentionProfessionnelle, url } from "@/lib/site";
import { PageLegale, ACompleter } from "@/components/PageLegale";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site de l’office notarial de Maître Marine Le Treut, 1 impasse Saint-Tudy, 29120 Combrit.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
  openGraph: { title: "Mentions légales", url: url("/mentions-legales") },
};

export default function PageMentions() {
  return (
    <PageLegale
      surtitre="Informations légales"
      titreLignes={["Mentions", "légales."]}
      miettes={[{ libelle: "Mentions légales", href: "/mentions-legales" }]}
      miseAJour="septembre 2026"
    >
      <h2>Éditeur du site</h2>
      <p>
        {site.nom}
        <br />
        {adressePostale}
        <br />
        Téléphone&nbsp;: {site.telephone}
        <br />
        Courriel&nbsp;: {site.email}
      </p>
      <p>
        Directrice de la publication&nbsp;: {site.titulaire}, notaire.
      </p>

      <ACompleter>
        <p>
          Les informations suivantes doivent être renseignées par l’étude
          avant la mise en ligne, car elles n’ont pas été communiquées et
          ne peuvent pas être devinées&nbsp;:
        </p>
        <ul>
          <li>numéro CRPCEN de l’office ;</li>
          <li>numéro SIREN et numéro de TVA intracommunautaire ;</li>
          <li>
            chambre départementale et conseil régional des notaires de
            rattachement ;
          </li>
          <li>
            assurance de responsabilité civile professionnelle (nom de
            l’assureur, numéro de contrat, couverture géographique) ;
          </li>
          <li>identité et coordonnées de l’hébergeur du site ;</li>
          <li>horaires d’ouverture au public.</li>
        </ul>
      </ACompleter>

      <h2>Profession réglementée</h2>
      <p>{mentionProfessionnelle}</p>
      <p>
        L’autorité de contrôle compétente est le Conseil supérieur du
        notariat, ainsi que la chambre des notaires du département
        d’exercice. Le titre de notaire est protégé et son exercice soumis
        à nomination par le garde des Sceaux, ministre de la Justice.
      </p>

      <h2>Tarifs</h2>
      <p>
        La rémunération du notaire est fixée par un tarif réglementé, identique
        sur l’ensemble du territoire national, défini par le code de
        commerce et par arrêté conjoint des ministres de la Justice et de
        l’Économie. Les prestations de conseil qui ne relèvent pas du
        tarif réglementé font l’objet d’une convention d’honoraires
        préalable.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus de ce site — textes, éléments graphiques,
        illustrations vectorielles, structure et code — est protégé par le droit
        d’auteur. Toute reproduction ou représentation, totale ou
        partielle, sans autorisation écrite préalable est interdite.
      </p>

      <h2>Contenu du site</h2>
      <p>
        Les informations publiées sur ce site sont générales et données à titre
        pédagogique. Elles ne constituent ni une consultation juridique, ni un
        conseil adapté à une situation particulière, et ne sauraient engager la
        responsabilité de l’étude en l’absence d’examen complet
        d’un dossier. Elles sont susceptibles d’évoluer avec la
        législation&nbsp;: la date de mise à jour figure sur chaque article.
      </p>

      <h2>Liens externes</h2>
      <p>
        Ce site peut renvoyer vers des sites tiers, notamment institutionnels.
        L’étude n’exerce aucun contrôle sur leur contenu et décline
        toute responsabilité à leur égard.
      </p>

      <h2>Signalement</h2>
      <p>
        Toute demande relative au contenu de ce site peut être adressée à{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </PageLegale>
  );
}
