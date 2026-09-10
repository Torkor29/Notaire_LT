"use server";

import { site } from "@/lib/site";
import { OBJETS, type EtatContact, type ObjetDemande } from "@/lib/contact";

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function texte(valeur: FormDataEntryValue | null): string {
  return typeof valeur === "string" ? valeur.trim() : "";
}

export async function envoyerDemande(
  _precedent: EtatContact,
  formulaire: FormData,
): Promise<EtatContact> {
  /* Piège à robots : ce champ est masqué et doit rester vide. */
  if (texte(formulaire.get("societe"))) {
    return { statut: "envoye", message: "Votre demande a bien été transmise." };
  }

  const donnees = {
    nom: texte(formulaire.get("nom")),
    prenom: texte(formulaire.get("prenom")),
    email: texte(formulaire.get("email")),
    telephone: texte(formulaire.get("telephone")),
    objet: texte(formulaire.get("objet")),
    reference: texte(formulaire.get("reference")),
    message: texte(formulaire.get("message")),
    rgpd: formulaire.get("rgpd") === "on",
  };

  const erreurs: Record<string, string> = {};
  if (donnees.nom.length < 2) erreurs.nom = "Merci d’indiquer votre nom.";
  if (donnees.prenom.length < 2)
    erreurs.prenom = "Merci d’indiquer votre prénom.";
  if (!EMAIL.test(donnees.email))
    erreurs.email = "Cette adresse e-mail semble incomplète.";
  if (donnees.telephone && donnees.telephone.replace(/\D/g, "").length < 9)
    erreurs.telephone = "Ce numéro de téléphone semble incomplet.";
  if (!OBJETS.includes(donnees.objet as ObjetDemande))
    erreurs.objet = "Merci de choisir l’objet de votre demande.";
  if (donnees.message.length < 10)
    erreurs.message =
      "Quelques mots de plus nous aideront à préparer notre réponse.";
  if (!donnees.rgpd)
    erreurs.rgpd =
      "Votre accord est nécessaire pour que nous puissions vous répondre.";

  if (Object.keys(erreurs).length > 0) {
    return {
      statut: "erreur",
      erreurs,
      message: "Le formulaire comporte des informations à corriger.",
    };
  }

  const corps = [
    `Nom : ${donnees.prenom} ${donnees.nom}`,
    `E-mail : ${donnees.email}`,
    donnees.telephone ? `Téléphone : ${donnees.telephone}` : null,
    `Objet : ${donnees.objet}`,
    donnees.reference ? `Référence du bien : ${donnees.reference}` : null,
    "",
    donnees.message,
  ]
    .filter(Boolean)
    .join("\n");

  const destination = process.env.CONTACT_WEBHOOK_URL;

  if (destination) {
    try {
      const reponse = await fetch(destination, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinataire: process.env.CONTACT_TO_EMAIL ?? site.email,
          sujet: `[Site] ${donnees.objet} — ${donnees.prenom} ${donnees.nom}`,
          ...donnees,
        }),
      });
      if (!reponse.ok) throw new Error(`Statut ${reponse.status}`);

      return {
        statut: "envoye",
        message:
          "Votre demande a bien été transmise à l’étude. Vous recevrez une réponse à l’adresse indiquée.",
      };
    } catch {
      return {
        statut: "manuel",
        message:
          "L’envoi automatique n’a pas abouti. Votre message n’est pas perdu : le bouton ci-dessous ouvre votre messagerie avec le texte déjà rempli.",
        mailto: lienMailto(donnees.objet, corps),
      };
    }
  }

  /* Aucune destination configurée : on le dit clairement plutôt que de
     laisser croire à un envoi. */
  return {
    statut: "manuel",
    message:
      "L’envoi automatique n’est pas encore activé sur ce site. Votre message est prêt : le bouton ci-dessous ouvre votre messagerie avec le texte déjà rempli.",
    mailto: lienMailto(donnees.objet, corps),
  };
}

function lienMailto(objet: string, corps: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(
    `Demande depuis le site — ${objet}`,
  )}&body=${encodeURIComponent(corps)}`;
}
