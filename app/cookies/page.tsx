import type { Metadata } from "next";
import { site, url } from "@/lib/site";
import { PageLegale } from "@/components/PageLegale";

export const metadata: Metadata = {
  title: "Gestion des cookies",
  description:
    "Ce site ne dépose aucun cookie de mesure d’audience ni de publicité. Détail des traceurs et du stockage local utilisés.",
  alternates: { canonical: "/cookies" },
  openGraph: { title: "Gestion des cookies", url: url("/cookies") },
};

export default function PageCookies() {
  return (
    <PageLegale
      surtitre="Traceurs"
      titreLignes={["Gestion", "des cookies."]}
      chapo="Ce site ne dépose aucun cookie publicitaire ni de mesure d’audience. Il n’y a donc pas de bandeau de consentement : il n’y aurait rien à consentir."
      miettes={[{ libelle: "Gestion des cookies", href: "/cookies" }]}
      miseAJour="septembre 2026"
    >
      <h2>Aucun traceur publicitaire</h2>
      <p>
        Ce site ne recourt ni à Google Analytics, ni à un pixel de réseau
        social, ni à une régie publicitaire. Aucun cookie n’est déposé pour
        suivre votre navigation, ici ou ailleurs.
      </p>

      <h2>Ce qui est réellement stocké</h2>
      <table>
        <thead>
          <tr>
            <th>Élément</th>
            <th>Nature</th>
            <th>Finalité</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>letreut.favoris.biens</code>
            </td>
            <td>Stockage local</td>
            <td>
              Mémoriser les biens immobiliers que vous marquez comme favoris,
              sur votre appareil uniquement.
            </td>
            <td>Jusqu’à effacement par vos soins</td>
          </tr>
        </tbody>
      </table>
      <p>
        Le stockage local n’est pas un cookie&nbsp;: il n’est jamais
        transmis au serveur. Cette donnée reste dans votre navigateur et
        n’est lisible ni par l’étude, ni par un tiers.
      </p>

      <h2>Services tiers, uniquement sur votre demande</h2>
      <p>
        Les cartes de localisation sont fournies par OpenStreetMap. Elles ne
        sont chargées que si vous cliquez sur «&nbsp;Afficher la carte&nbsp;».
        Tant que vous ne le faites pas, aucune requête n’est adressée à ce
        service et votre adresse IP ne lui est pas communiquée.
      </p>

      <h2>Polices de caractères</h2>
      <p>
        Les polices utilisées sur ce site sont hébergées sur le serveur du site
        lui-même. Aucune requête n’est adressée à un service de polices
        distant, ce qui évite toute transmission de données à ce titre.
      </p>

      <h2>Effacer vos données locales</h2>
      <p>
        Vous pouvez à tout moment supprimer les données stockées par ce site
        depuis les réglages de votre navigateur, rubrique « données de sites »
        ou « données de navigation ». Cette suppression n’affecte que vos
        favoris immobiliers.
      </p>

      <h2>Une question ?</h2>
      <p>
        Écrivez à <a href={`mailto:${site.email}`}>{site.email}</a>. Voir aussi
        la <a href="/confidentialite">politique de confidentialité</a>.
      </p>
    </PageLegale>
  );
}
