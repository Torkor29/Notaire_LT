"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation, site } from "@/lib/site";
import { Logotype } from "@/components/Logotype";
import { Bouton, Chevron, Fleche } from "@/components/ui";
import { useRecherche } from "@/components/RechercheProvider";

function estActif(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Entete() {
  const pathname = usePathname();
  const [defile, setDefile] = useState(false);
  const [heroSombre, setHeroSombre] = useState(false);
  const [surHero, setSurHero] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const { ouvrir: ouvrirRecherche } = useRecherche();
  const refMenu = useRef<HTMLDivElement>(null);
  const refBoutonMenu = useRef<HTMLButtonElement>(null);

  /* --- État au scroll + détection d’un hero plein écran ------------------ */
  useEffect(() => {
    const sentinelle = document.querySelector<HTMLElement>(
      "[data-hero-sentinelle]",
    );
    setHeroSombre(sentinelle?.dataset.heroTon === "sombre");
    setSurHero(Boolean(sentinelle));

    const surScroll = () => setDefile(window.scrollY > 16);
    surScroll();
    window.addEventListener("scroll", surScroll, { passive: true });

    let observateur: IntersectionObserver | null = null;
    if (sentinelle) {
      observateur = new IntersectionObserver(
        ([e]) => setSurHero(e.isIntersecting),
        { threshold: 0 },
      );
      observateur.observe(sentinelle);
    }

    return () => {
      window.removeEventListener("scroll", surScroll);
      observateur?.disconnect();
    };
  }, [pathname]);

  /* --- Fermeture du menu à la navigation --------------------------------- */
  useEffect(() => {
    setMenuOuvert(false);
  }, [pathname]);

  /* --- Verrou du défilement + échappement + piège à focus ---------------- */
  useEffect(() => {
    if (!menuOuvert) return;
    const { style } = document.body;
    const precedent = style.overflow;
    style.overflow = "hidden";

    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOuvert(false);
        refBoutonMenu.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !refMenu.current) return;
      const focusables = refMenu.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const premier = focusables[0];
      const dernier = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      }
    };

    document.addEventListener("keydown", surTouche);
    const premierLien = refMenu.current?.querySelector<HTMLElement>("a, button");
    premierLien?.focus();

    return () => {
      style.overflow = precedent;
      document.removeEventListener("keydown", surTouche);
    };
  }, [menuOuvert]);

  const basculer = useCallback(() => setMenuOuvert((v) => !v), []);

  const transparent = surHero && !defile && !menuOuvert;
  const clair = transparent && heroSombre;

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-vert focus:px-5 focus:py-3 focus:text-sm focus:text-ivoire"
      >
        Aller au contenu principal
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-60 transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-soft",
          transparent
            ? "bg-transparent"
            : "verre shadow-[0_1px_0_0_rgba(219,209,192,0.6)]",
        )}
        data-entete-clair={clair ? "" : undefined}
      >
        <div className="contenu">
          <div
            className="flex items-center justify-between gap-6"
            style={{ height: "var(--entete-hauteur)" }}
          >
            <Link
              href="/"
              className="-m-2 shrink-0 rounded-sm p-2 transition-opacity duration-500 hover:opacity-70"
              aria-label={`${site.nom} — retour à l’accueil`}
            >
              <Logotype ton={clair ? "ivoire" : "encre"} />
            </Link>

            {/* --- Navigation bureau --- */}
            <nav
              aria-label="Navigation principale"
              className="hidden lg:block"
            >
              <ul className="flex items-center gap-1">
                {navigation
                  .filter((l) => l.href !== "/")
                  .map((lien) => {
                    const actif = estActif(pathname, lien.href);
                    return (
                      <li key={lien.href} className="group/nav relative">
                        <Link
                          href={lien.href}
                          className={cn(
                            "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.875rem] transition-colors duration-400",
                            clair
                              ? "text-ivoire/85 hover:text-ivoire"
                              : "text-ardoise hover:text-vert",
                            actif && (clair ? "text-ivoire" : "text-vert"),
                          )}
                          aria-current={actif ? "page" : undefined}
                        >
                          {lien.libelle}
                          {lien.enfants ? (
                            <Chevron className="h-3 w-3 opacity-50 transition-transform duration-400 group-hover/nav:rotate-180" />
                          ) : null}
                          <span
                            aria-hidden="true"
                            className={cn(
                              "absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 transition-transform duration-500 ease-soft group-hover/nav:scale-x-100",
                              clair ? "bg-ivoire/50" : "bg-champagne",
                              actif && "scale-x-100",
                            )}
                          />
                        </Link>

                        {lien.enfants ? (
                          <div className="invisible absolute left-0 top-full w-72 pt-3 opacity-0 transition-[opacity,transform] duration-400 ease-soft group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:opacity-100 translate-y-1 group-hover/nav:translate-y-0">
                            <ul className="overflow-hidden rounded-lg border border-pierre/60 bg-ivoire-pur p-2 shadow-relief">
                              {lien.enfants.map((enfant) => (
                                <li key={enfant.href}>
                                  <Link
                                    href={enfant.href}
                                    className="flex items-center justify-between gap-3 rounded-md px-3.5 py-2.5 text-[0.875rem] text-ardoise transition-colors duration-300 hover:bg-craie hover:text-vert"
                                  >
                                    {enfant.libelle}
                                    <Fleche className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-400 group-hover/nav:opacity-100 hover:translate-x-0" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5 md:gap-3">
              <button
                type="button"
                onClick={ouvrirRecherche}
                aria-label="Rechercher sur le site"
                className={cn(
                  "rounded-full p-2.5 transition-colors duration-400",
                  clair
                    ? "text-ivoire/85 hover:bg-ivoire/10 hover:text-ivoire"
                    : "text-ardoise hover:bg-craie hover:text-vert",
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  className="h-[1.15rem] w-[1.15rem]"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>

              <Bouton
                href="/contact#rendez-vous"
                variante={clair ? "clair" : "primaire"}
                taille="sm"
                className="hidden md:inline-flex"
              >
                Prendre rendez-vous
              </Bouton>

              <button
                ref={refBoutonMenu}
                type="button"
                onClick={basculer}
                aria-expanded={menuOuvert}
                aria-controls="menu-mobile"
                className={cn(
                  "-mr-2 flex items-center gap-2.5 rounded-full px-2 py-2.5 lg:hidden",
                  clair ? "text-ivoire" : "text-encre",
                )}
              >
                <span className="text-[0.8125rem] uppercase tracking-[0.14em]">
                  {menuOuvert ? "Fermer" : "Menu"}
                </span>
                <span className="relative block h-3 w-5" aria-hidden="true">
                  <span
                    className={cn(
                      "absolute left-0 block h-px w-5 bg-current transition-transform duration-500 ease-soft",
                      menuOuvert ? "top-1.5 rotate-45" : "top-0.5",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 block h-px w-5 bg-current transition-transform duration-500 ease-soft",
                      menuOuvert ? "top-1.5 -rotate-45" : "top-2.5",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Menu mobile plein écran --- */}
      <div
        id="menu-mobile"
        ref={refMenu}
        hidden={!menuOuvert}
        className="fixed inset-0 z-55 overflow-y-auto overscroll-contain bg-ivoire lg:hidden"
      >
        <div
          className="contenu flex min-h-full flex-col pb-12"
          style={{ paddingTop: "calc(var(--entete-hauteur) + 1.5rem)" }}
        >
          <nav aria-label="Navigation principale (mobile)">
            <ul className="divide-y divide-pierre/50 border-y border-pierre/50">
              {navigation.map((lien, i) => (
                <li
                  key={lien.href}
                  style={{
                    animation: menuOuvert
                      ? `voile 700ms var(--ease-soft) ${80 + i * 45}ms both`
                      : undefined,
                  }}
                >
                  <Link
                    href={lien.href}
                    className="flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="font-display text-[1.65rem] leading-tight tracking-[-0.02em]">
                      {lien.libelle}
                    </span>
                    <Fleche className="h-4 w-4 shrink-0 self-center text-brume" />
                  </Link>
                  {lien.enfants ? (
                    <ul className="-mt-1 flex flex-wrap gap-x-2 gap-y-2 pb-4">
                      {lien.enfants.map((enfant) => (
                        <li key={enfant.href}>
                          <Link
                            href={enfant.href}
                            className="inline-flex rounded-full border border-pierre/70 px-3.5 py-1.5 text-[0.8125rem] text-gris"
                          >
                            {enfant.libelle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 grid gap-3">
            <Bouton href="/contact#rendez-vous" taille="lg" fleche>
              Prendre rendez-vous
            </Bouton>
            <Bouton href={`tel:${site.telephoneLien}`} variante="secondaire" taille="lg">
              Appeler le {site.telephone}
            </Bouton>
          </div>

          <div className="mt-auto pt-10 text-[0.8125rem] leading-relaxed text-gris">
            <p className="text-encre">{site.nom}</p>
            <p>{site.adresse.rue}</p>
            <p>
              {site.adresse.codePostal} {site.adresse.ville}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-block underline underline-offset-4"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
