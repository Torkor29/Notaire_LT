"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { envoyerDemande } from "@/app/contact/actions";
import { etatInitial, OBJETS, type EtatContact } from "@/lib/contact";
import { Fleche } from "@/components/ui";

function Champ({
  id,
  label,
  erreur,
  children,
  className,
  requis = false,
}: {
  id: string;
  label: string;
  erreur?: string;
  children: React.ReactNode;
  className?: string;
  requis?: boolean;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-[0.8125rem] font-medium text-ardoise"
      >
        {label}
        {requis ? (
          <span className="text-champagne-sombre" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="ml-1.5 text-[0.75rem] font-normal text-gris">
            (facultatif)
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {erreur ? (
        <p id={`${id}-erreur`} role="alert" className="mt-2 text-[0.8125rem] text-[#a6412f]">
          {erreur}
        </p>
      ) : null}
    </div>
  );
}

const classesChamp =
  "w-full rounded-md border bg-ivoire-pur px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-300 placeholder:text-gris focus:border-vert";

function BoutonEnvoi() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group/btn inline-flex items-center justify-center gap-2.5 rounded-full bg-vert px-8 py-4 text-base font-medium text-ivoire shadow-douce transition-[background-color,box-shadow,transform] duration-500 ease-soft hover:bg-vert-sombre hover:shadow-relief active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60"
    >
      {pending ? "Envoi en cours…" : "Envoyer ma demande"}
      {!pending ? (
        <Fleche className="transition-transform duration-500 ease-soft group-hover/btn:translate-x-1" />
      ) : null}
    </button>
  );
}

export function FormulaireContact() {
  const [etat, action] = useActionState<EtatContact, FormData>(
    envoyerDemande,
    etatInitial,
  );
  const parametres = useSearchParams();
  const base = useId();
  const [objet, setObjet] = useState<string>("");

  const reference = parametres.get("bien") ?? "";
  const objetUrl = parametres.get("objet");

  useEffect(() => {
    if (objetUrl === "visite" || objetUrl === "rappel") setObjet("Achat / Vente");
  }, [objetUrl]);

  const id = (nom: string) => `${base}-${nom}`;
  const erreur = (nom: string) => etat.erreurs?.[nom];

  if (etat.statut === "envoye") {
    return (
      <div
        className="rounded-xl border border-vert/30 bg-vert-pale p-8 md:p-10"
        role="status"
        style={{ animation: "voile 600ms var(--ease-soft) both" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-vert"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 3 3 5-6" />
        </svg>
        <h3 className="mt-5 font-display text-[1.5rem] tracking-[-0.02em] text-vert-sombre">
          Merci, votre message est parti.
        </h3>
        <p className="mt-3 leading-relaxed text-ardoise pretty">
          {etat.message}
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-6">
      {/* Piège à robots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("societe")}>Ne pas remplir</label>
        <input id={id("societe")} name="societe" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {reference ? (
        <input type="hidden" name="reference" value={reference} />
      ) : null}

      {etat.statut === "manuel" ? (
        <div
          role="status"
          className="rounded-md border-l-2 border-champagne bg-champagne-pale/60 px-5 py-4"
        >
          <p className="text-[0.9375rem] leading-relaxed text-ardoise">
            {etat.message}
          </p>
          {etat.mailto ? (
            <a
              href={etat.mailto}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-vert px-6 py-3 text-[0.875rem] font-medium text-ivoire transition-colors hover:bg-vert-sombre"
            >
              Ouvrir ma messagerie
              <Fleche className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      ) : null}

      {etat.statut === "erreur" ? (
        <p
          role="alert"
          className="rounded-md border-l-2 border-[#a6412f] bg-[#a6412f]/8 px-5 py-4 text-[0.9375rem] text-ardoise"
        >
          {etat.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Champ id={id("prenom")} label="Prénom" requis erreur={erreur("prenom")}>
          <input
            id={id("prenom")}
            name="prenom"
            type="text"
            autoComplete="given-name"
            required
            aria-invalid={Boolean(erreur("prenom"))}
            aria-describedby={erreur("prenom") ? `${id("prenom")}-erreur` : undefined}
            className={cn(classesChamp, erreur("prenom") ? "border-[#a6412f]" : "border-pierre/70")}
          />
        </Champ>

        <Champ id={id("nom")} label="Nom" requis erreur={erreur("nom")}>
          <input
            id={id("nom")}
            name="nom"
            type="text"
            autoComplete="family-name"
            required
            aria-invalid={Boolean(erreur("nom"))}
            aria-describedby={erreur("nom") ? `${id("nom")}-erreur` : undefined}
            className={cn(classesChamp, erreur("nom") ? "border-[#a6412f]" : "border-pierre/70")}
          />
        </Champ>

        <Champ id={id("email")} label="E-mail" requis erreur={erreur("email")}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(erreur("email"))}
            aria-describedby={erreur("email") ? `${id("email")}-erreur` : undefined}
            className={cn(classesChamp, erreur("email") ? "border-[#a6412f]" : "border-pierre/70")}
          />
        </Champ>

        <Champ id={id("telephone")} label="Téléphone" erreur={erreur("telephone")}>
          <input
            id={id("telephone")}
            name="telephone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(erreur("telephone"))}
            aria-describedby={
              erreur("telephone") ? `${id("telephone")}-erreur` : undefined
            }
            className={cn(
              classesChamp,
              erreur("telephone") ? "border-[#a6412f]" : "border-pierre/70",
            )}
          />
        </Champ>
      </div>

      <Champ
        id={id("objet")}
        label="Objet de la demande"
        requis
        erreur={erreur("objet")}
      >
        <select
          id={id("objet")}
          name="objet"
          required
          value={objet}
          onChange={(e) => setObjet(e.target.value)}
          aria-invalid={Boolean(erreur("objet"))}
          aria-describedby={erreur("objet") ? `${id("objet")}-erreur` : undefined}
          className={cn(
            classesChamp,
            erreur("objet") ? "border-[#a6412f]" : "border-pierre/70",
          )}
        >
          <option value="">Choisir…</option>
          {OBJETS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Champ>

      <Champ id={id("message")} label="Votre message" requis erreur={erreur("message")}>
        <textarea
          id={id("message")}
          name="message"
          rows={7}
          required
          placeholder="Décrivez votre situation en quelques lignes : ce que vous envisagez, votre calendrier, et ce que vous souhaiteriez comprendre."
          aria-invalid={Boolean(erreur("message"))}
          aria-describedby={erreur("message") ? `${id("message")}-erreur` : undefined}
          className={cn(
            classesChamp,
            "resize-y leading-relaxed",
            erreur("message") ? "border-[#a6412f]" : "border-pierre/70",
          )}
        />
      </Champ>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.875rem] leading-relaxed text-ardoise">
          <input
            type="checkbox"
            name="rgpd"
            required
            aria-invalid={Boolean(erreur("rgpd"))}
            aria-describedby={erreur("rgpd") ? `${id("rgpd")}-erreur` : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-vert)]"
          />
          <span>
            J’accepte que les informations transmises soient utilisées par
            l’étude pour traiter ma demande. Elles ne sont ni cédées ni
            utilisées à d’autres fins.{" "}
            <a
              href="/confidentialite"
              className="text-vert underline underline-offset-4"
            >
              Politique de confidentialité
            </a>
            .
            <span className="text-champagne-sombre" aria-hidden="true">
              {" "}
              *
            </span>
          </span>
        </label>
        {erreur("rgpd") ? (
          <p id={`${id("rgpd")}-erreur`} role="alert" className="mt-2 text-[0.8125rem] text-[#a6412f]">
            {erreur("rgpd")}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <BoutonEnvoi />
        <p className="text-[0.8125rem] text-gris">
          Les champs marqués d’un{" "}
          <span className="text-champagne-sombre">*</span> sont obligatoires.
        </p>
      </div>
    </form>
  );
}
