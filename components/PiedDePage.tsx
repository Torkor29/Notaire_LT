import Link from "next/link";
import {
  site,
  navigation,
  liensLegaux,
  liensOutils,
  mentionProfessionnelle,
} from "@/lib/site";
import { Logotype } from "@/components/Logotype";
import { Bouton, Fleche } from "@/components/ui";

const colonneProjets = navigation.find((l) => l.href === "/vos-projets");

export function PiedDePage() {
  const annee = new Date().getFullYear();

  return (
    <footer className="bg-vert-nuit text-ivoire">
      <div className="contenu">
        {/* --- Appel à l’action --- */}
        <div className="grid gap-10 border-b border-ivoire/10 py-16 md:grid-cols-[1.2fr_1fr] md:items-end md:py-20">
          <div>
            <h2
              className="text-display-3 text-ivoire"
              data-reveal
              style={{ "--reveal-y": "1rem" } as React.CSSProperties}
            >
              Une question&nbsp;? Une première prise de contact suffit.
            </h2>
            <p className="mt-5 max-w-lg text-ivoire/65 pretty">
              L’étude reçoit sur rendez-vous à Combrit. Vous pouvez aussi
              écrire, appeler, ou décrire votre projet en quelques lignes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Bouton href="/contact#rendez-vous" variante="clair" fleche>
              Prendre rendez-vous
            </Bouton>
            <Bouton
              href={`tel:${site.telephoneLien}`}
              variante="secondaire"
              className="border-ivoire/25 text-ivoire hover:border-ivoire hover:bg-ivoire hover:text-vert-sombre"
            >
              {site.telephone}
            </Bouton>
          </div>
        </div>

        {/* --- Colonnes --- */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
          <div>
            <Logotype ton="ivoire" taille="lg" />
            <address className="mt-7 space-y-1 text-[0.9375rem] not-italic leading-relaxed text-ivoire/65">
              <p>{site.adresse.rue}</p>
              <p>
                {site.adresse.codePostal} {site.adresse.ville}
              </p>
              <p className="pt-3">
                <a
                  href={`tel:${site.telephoneLien}`}
                  className="transition-colors duration-300 hover:text-ivoire"
                >
                  {site.telephone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors duration-300 hover:text-ivoire"
                >
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="Pages du site">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ivoire/60">
              Le site
            </p>
            <ul className="mt-5 space-y-3 text-[0.9375rem] text-ivoire/70">
              {navigation.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-ivoire"
                  >
                    {lien.libelle}
                    <Fleche className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-400 group-hover:translate-x-0 group-hover:opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Vos projets">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ivoire/60">
              Vos projets
            </p>
            <ul className="mt-5 space-y-3 text-[0.9375rem] text-ivoire/70">
              {colonneProjets?.enfants?.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="transition-colors duration-300 hover:text-ivoire"
                  >
                    {lien.libelle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Outils">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ivoire/60">
              Outils
            </p>
            <ul className="mt-5 space-y-3 text-[0.9375rem] text-ivoire/70">
              {liensOutils.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="transition-colors duration-300 hover:text-ivoire"
                  >
                    {lien.libelle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* --- Mention professionnelle --- */}
        <div className="border-t border-ivoire/10 py-8">
          <p className="max-w-4xl text-[0.8125rem] leading-relaxed text-ivoire/60 pretty">
            {mentionProfessionnelle}
          </p>
        </div>

        <div className="flex flex-col gap-5 border-t border-ivoire/10 py-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-ivoire/55">
            {liensLegaux.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="underline-offset-4 transition-colors duration-300 hover:text-ivoire hover:underline"
                >
                  {lien.libelle}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-[0.8125rem] text-ivoire/60">
            © {annee} {site.nom}
          </p>
        </div>
      </div>
      <div className="h-[env(safe-area-inset-bottom)] md:hidden" />
    </footer>
  );
}
