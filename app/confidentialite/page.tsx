import type { Metadata } from "next";
import { site, adressePostale, url } from "@/lib/site";
import { PageLegale, ACompleter } from "@/components/PageLegale";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Traitement des données personnelles par l’office notarial Marine Le Treut : finalités, durées de conservation, droits des personnes.",
  alternates: { canonical: "/confidentialite" },
  openGraph: {
    title: "Politique de confidentialité",
    url: url("/confidentialite"),
  },
};

export default function PageConfidentialite() {
  return (
    <PageLegale
      surtitre="Données personnelles"
      titreLignes={["Politique de", "confidentialité."]}
      chapo="Ce site collecte le strict nécessaire : ce que vous écrivez dans le formulaire de contact, et rien d’autre. Aucune publicité, aucun profilage, aucune revente de données."
      miettes={[{ libelle: "Politique de confidentialité", href: "/confidentialite" }]}
      miseAJour="septembre 2026"
    >
      <h2>Responsable du traitement</h2>
      <p>
        {site.nom}, {adressePostale} — {site.email}.
      </p>

      <h2>Données collectées par ce site</h2>
      <p>
        Le site ne collecte aucune donnée à votre insu. Deux situations
        seulement donnent lieu à une collecte&nbsp;:
      </p>
      <ul>
        <li>
          <strong>Le formulaire de contact</strong>&nbsp;: nom, prénom, adresse
          électronique, numéro de téléphone si vous le renseignez, objet de la
          demande et contenu de votre message.
        </li>
        <li>
          <strong>L’affichage volontaire d’une carte</strong>&nbsp;:
          si vous cliquez sur «&nbsp;Afficher la carte&nbsp;», votre navigateur
          se connecte alors à OpenStreetMap, qui reçoit votre adresse IP. Tant
          que vous ne cliquez pas, aucune requête n’est émise.
        </li>
      </ul>

      <h2>Finalités et base légale</h2>
      <p>
        Les données transmises par le formulaire servent exclusivement à
        répondre à votre demande et, le cas échéant, à préparer un rendez-vous.
        Le traitement repose sur votre consentement, recueilli par la case à
        cocher du formulaire, et sur l’intérêt légitime de l’étude à
        répondre aux sollicitations qui lui sont adressées.
      </p>

      <h2>Destinataires</h2>
      <p>
        Les données sont destinées à l’office notarial seul. Elles ne sont
        ni cédées, ni louées, ni utilisées à des fins publicitaires. Aucun
        transfert hors de l’Union européenne n’est réalisé du fait de
        ce site.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les demandes n’ayant pas donné suite sont conservées au maximum
        trois ans à compter du dernier échange. Lorsqu’un dossier est
        ouvert, les données rejoignent le dossier client et sont conservées
        selon les obligations légales et déontologiques applicables aux actes
        notariés.
      </p>

      <h2>Stockage local dans votre navigateur</h2>
      <p>
        La fonction «&nbsp;favoris&nbsp;» de la rubrique immobilière enregistre
        la liste des biens que vous avez marqués dans le stockage local de
        votre navigateur. Cette information ne quitte jamais votre appareil et
        n’est accessible ni à l’étude, ni à un tiers. Vous pouvez
        l’effacer à tout moment en vidant les données de site de votre
        navigateur.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d’un droit d’accès, de rectification,
        d’effacement, de limitation, d’opposition et de portabilité
        sur les données vous concernant, ainsi que du droit de définir des
        directives relatives à leur sort après votre décès. Ces droits
        s’exercent par courriel à{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> ou par courrier à
        l’adresse de l’étude.
      </p>
      <p>
        Certaines données ne peuvent toutefois pas être effacées&nbsp;: celles
        contenues dans un acte authentique relèvent d’obligations légales
        de conservation propres au notariat.
      </p>
      <p>
        Vous pouvez également introduire une réclamation auprès de la
        Commission nationale de l’informatique et des libertés (CNIL),
        3 place de Fontenoy, 75007 Paris —{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          cnil.fr
        </a>
        .
      </p>

      <ACompleter>
        <p>
          À renseigner avant mise en ligne&nbsp;: coordonnées du délégué à la
          protection des données désigné par l’étude ou par son groupement,
          identité de l’hébergeur du site, et le cas échéant du prestataire
          d’acheminement des courriels du formulaire.
        </p>
      </ACompleter>
    </PageLegale>
  );
}
