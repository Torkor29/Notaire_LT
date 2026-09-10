"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn, formaterPrix } from "@/lib/utils";
import { filtrer, typesBien, type Bien, type TypeBien } from "@/lib/biens";
import { useFavoris } from "@/lib/favoris";
import { Visuel } from "@/components/Visuel";
import { EtiquetteDpe } from "@/components/Dpe";
import { Bouton, Etiquette, Fleche } from "@/components/ui";

const BUDGETS = [
  { libelle: "Tous budgets", valeur: 0 },
  { libelle: "Jusqu’à 200 000 €", valeur: 200000 },
  { libelle: "Jusqu’à 350 000 €", valeur: 350000 },
  { libelle: "Jusqu’à 500 000 €", valeur: 500000 },
  { libelle: "Jusqu’à 750 000 €", valeur: 750000 },
];

const SURFACES = [
  { libelle: "Toutes surfaces", valeur: 0 },
  { libelle: "40 m² et plus", valeur: 40 },
  { libelle: "70 m² et plus", valeur: 70 },
  { libelle: "100 m² et plus", valeur: 100 },
  { libelle: "150 m² et plus", valeur: 150 },
];

const CHAMBRES = [0, 1, 2, 3, 4];

function BoutonFavori({
  actif,
  onClick,
  titre,
}: {
  actif: boolean;
  onClick: () => void;
  titre: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      className="absolute right-3 top-3 z-4 rounded-full bg-ivoire/90 p-2.5 text-encre shadow-douce transition-[background-color,transform] duration-400 hover:scale-105 hover:bg-ivoire-pur"
    >
      <span className="sr-only">
        {actif
          ? `Retirer ${titre} de mes favoris`
          : `Ajouter ${titre} à mes favoris`}
      </span>
      <svg
        viewBox="0 0 24 24"
        fill={actif ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
        className={cn("h-4 w-4 transition-colors", actif && "text-vert")}
        aria-hidden="true"
      >
        <path
          d="M12 20s-7-4.6-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.4 12 20 12 20Z"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function CarteBien({
  bien,
  favori,
  onFavori,
  index,
}: {
  bien: Bien;
  favori: boolean;
  onFavori: () => void;
  index: number;
}) {
  const photo = bien.photos[0];
  return (
    <article
      className="group relative"
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}
    >
      <BoutonFavori actif={favori} onClick={onFavori} titre={bien.titre} />
      <Link href={`/immobilier/${bien.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg">
          <Visuel
            variante={photo?.variante ?? "facade"}
            src={photo?.src}
            alt={bien.titre}
            ratio="4 / 3"
            parallax={false}
            masque={false}
            arrondi={false}
            className="transition-transform duration-[1100ms] ease-soft group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {bien.demonstration ? (
            <span className="absolute left-3 top-3 z-4 rounded-full bg-champagne-sombre px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-ivoire">
              Exemple — bien fictif
            </span>
          ) : null}
        </div>

        <div className="pt-5">
          <div className="flex flex-wrap items-center gap-2">
            <Etiquette ton="contour">{bien.type}</Etiquette>
            <span className="text-[0.8125rem] text-gris">
              {bien.commune} ({bien.codePostal})
            </span>
          </div>
          <h3 className="mt-3 text-[1.1875rem] leading-snug tracking-[-0.01em]">
            {bien.titre}
          </h3>
          <p className="mt-2 font-display text-[1.5rem] tracking-[-0.02em] text-vert chiffres">
            {formaterPrix(bien.prix)}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-gris">
            <li className="chiffres">{bien.surface} m²</li>
            <li className="chiffres">
              {bien.pieces} pièce{bien.pieces > 1 ? "s" : ""}
            </li>
            <li className="chiffres">
              {bien.chambres} chambre{bien.chambres > 1 ? "s" : ""}
            </li>
            {bien.terrain ? (
              <li className="chiffres">Terrain {bien.terrain} m²</li>
            ) : null}
          </ul>
          {bien.dpe ? (
            <div className="mt-4 flex gap-2">
              <EtiquetteDpe classe={bien.dpe.classe} label="DPE" />
              <EtiquetteDpe classe={bien.dpe.ges} label="GES" />
            </div>
          ) : null}
          <p className="mt-4 flex items-center gap-2 text-[0.8125rem] text-vert">
            Voir le bien
            <Fleche className="h-3.5 w-3.5 transition-transform duration-600 ease-soft group-hover:translate-x-1" />
          </p>
        </div>
      </Link>
    </article>
  );
}

function Selecteur({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[0.6875rem] uppercase tracking-[0.14em] text-gris"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-pierre/70 bg-ivoire-pur px-3.5 py-2.5 text-[0.875rem] outline-none transition-colors duration-300 focus:border-vert"
      >
        {children}
      </select>
    </div>
  );
}

export function ListeBiens({ biens }: { biens: Bien[] }) {
  const { favoris, basculer } = useFavoris();
  const [type, setType] = useState<TypeBien | "tous">("tous");
  const [commune, setCommune] = useState<string>("toutes");
  const [budget, setBudget] = useState(0);
  const [surface, setSurface] = useState(0);
  const [chambres, setChambres] = useState(0);
  const [seulementFavoris, setSeulementFavoris] = useState(false);

  const communes = useMemo(
    () => Array.from(new Set(biens.map((b) => b.commune))).sort(),
    [biens],
  );

  const resultats = useMemo(() => {
    const filtres = filtrer(biens, {
      type,
      commune,
      budgetMax: budget || undefined,
      surfaceMin: surface || undefined,
      chambresMin: chambres || undefined,
    });
    return seulementFavoris
      ? filtres.filter((b) => favoris.includes(b.slug))
      : filtres;
  }, [biens, type, commune, budget, surface, chambres, seulementFavoris, favoris]);

  const reinitialiser = () => {
    setType("tous");
    setCommune("toutes");
    setBudget(0);
    setSurface(0);
    setChambres(0);
    setSeulementFavoris(false);
  };

  /* ---------------- Aucun bien publié ---------------- */
  if (biens.length === 0) {
    return (
      <div className="rounded-xl border border-pierre/60 bg-craie/60 px-8 py-20 text-center md:px-16">
        <span
          aria-hidden="true"
          className="mx-auto mb-8 block h-px w-16 bg-champagne"
        />
        <h2 className="mx-auto max-w-xl font-display text-[1.75rem] leading-snug tracking-[-0.02em] md:text-[2.25rem]">
          Aucun bien n’est proposé à la vente en ce moment.
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-gris pretty">
          L’étude publie ici les biens dont elle assure la négociation.
          Cette page ne présente jamais de bien fictif&nbsp;: quand elle est
          vide, c’est qu’il n’y a rien à vendre à cet instant.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Bouton href="/contact" fleche>
            Être prévenu des prochaines offres
          </Bouton>
          <Bouton href="/vos-projets/immobilier" variante="secondaire">
            Vendre avec l’étude
          </Bouton>
        </div>
      </div>
    );
  }

  /* ---------------- Liste + filtres ---------------- */
  return (
    <div>
      <form
        className="rounded-lg border border-pierre/60 bg-craie/50 p-5 md:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Filtrer les biens"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Selecteur
            id="f-type"
            label="Type de bien"
            value={type}
            onChange={(v) => setType(v as TypeBien | "tous")}
          >
            <option value="tous">Tous les types</option>
            {typesBien.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Selecteur>

          <Selecteur
            id="f-commune"
            label="Localisation"
            value={commune}
            onChange={setCommune}
          >
            <option value="toutes">Toutes les communes</option>
            {communes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Selecteur>

          <Selecteur
            id="f-budget"
            label="Budget"
            value={budget}
            onChange={(v) => setBudget(Number(v))}
          >
            {BUDGETS.map((b) => (
              <option key={b.valeur} value={b.valeur}>
                {b.libelle}
              </option>
            ))}
          </Selecteur>

          <Selecteur
            id="f-surface"
            label="Surface"
            value={surface}
            onChange={(v) => setSurface(Number(v))}
          >
            {SURFACES.map((s) => (
              <option key={s.valeur} value={s.valeur}>
                {s.libelle}
              </option>
            ))}
          </Selecteur>

          <Selecteur
            id="f-chambres"
            label="Chambres"
            value={chambres}
            onChange={(v) => setChambres(Number(v))}
          >
            {CHAMBRES.map((c) => (
              <option key={c} value={c}>
                {c === 0 ? "Peu importe" : `${c} et plus`}
              </option>
            ))}
          </Selecteur>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-pierre/60 pt-5">
          <label className="flex cursor-pointer items-center gap-3 text-[0.875rem] text-ardoise">
            <input
              type="checkbox"
              checked={seulementFavoris}
              onChange={(e) => setSeulementFavoris(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-vert)]"
            />
            Afficher seulement mes favoris
            {favoris.length > 0 ? (
              <span className="chiffres text-gris">({favoris.length})</span>
            ) : null}
          </label>

          <button
            type="button"
            onClick={reinitialiser}
            className="text-[0.875rem] text-gris underline underline-offset-4 transition-colors hover:text-vert"
          >
            Réinitialiser
          </button>
        </div>
      </form>

      <div aria-live="polite" className="mt-10">
        <p className="text-[0.875rem] text-gris">
          {resultats.length} bien{resultats.length > 1 ? "s" : ""} affiché
          {resultats.length > 1 ? "s" : ""} sur {biens.length}
        </p>

        {resultats.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-pierre py-16 text-center">
            <p className="text-ardoise">
              Aucun bien ne correspond à ces critères.
            </p>
            <button
              type="button"
              onClick={reinitialiser}
              className="mt-3 text-[0.9375rem] text-vert underline underline-offset-4"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {resultats.map((bien, i) => (
              <CarteBien
                key={bien.slug}
                bien={bien}
                index={i}
                favori={favoris.includes(bien.slug)}
                onFavori={() => basculer(bien.slug)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
