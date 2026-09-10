"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Moteur d’animation du site — environ 2 ko, aucune dépendance.
 *
 * 1. Révélations au scroll : un unique IntersectionObserver ajoute la classe
 *    `.est-visible` aux éléments porteurs de `data-reveal`. Les composants
 *    serveur n’ont donc qu’un attribut à poser, sans passer côté client.
 * 2. Parallax : une seule boucle requestAnimationFrame met à jour la variable
 *    CSS `--parallax` des éléments `data-parallax` (transform GPU uniquement).
 *
 * Les deux respectent `prefers-reduced-motion` et se désactivent proprement.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const mouvementReduit = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let observateur: IntersectionObserver | null = null;
    let mutations: MutationObserver | null = null;
    let rafId = 0;
    let ecouteScroll: (() => void) | null = null;

    const revelerTout = () => {
      document
        .querySelectorAll("[data-reveal]")
        .forEach((el) => el.classList.add("est-visible"));
    };

    const demarrer = () => {
      if (mouvementReduit.matches) {
        revelerTout();
        return;
      }

      /* ---------------- Révélations ---------------- */
      observateur = new IntersectionObserver(
        (entrees) => {
          for (const entree of entrees) {
            if (!entree.isIntersecting) continue;
            entree.target.classList.add("est-visible");
            observateur?.unobserve(entree.target);
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
      );

      const observer = (racine: ParentNode) => {
        racine
          .querySelectorAll?.("[data-reveal]:not(.est-visible)")
          .forEach((el) => observateur?.observe(el));
      };

      observer(document);

      /* Contenus ajoutés dynamiquement (filtres, accordéons, résultats…) */
      mutations = new MutationObserver((liste) => {
        for (const m of liste) {
          m.addedNodes.forEach((n) => {
            if (n.nodeType !== 1) return;
            const el = n as HTMLElement;
            if (el.matches?.("[data-reveal]:not(.est-visible)")) {
              observateur?.observe(el);
            }
            observer(el);
          });
        }
      });
      mutations.observe(document.body, { childList: true, subtree: true });

      /* ---------------- Parallax ---------------- */
      const bureau = window.matchMedia("(min-width: 768px)");
      if (!bureau.matches) return;

      const cibles = Array.from(
        document.querySelectorAll<HTMLElement>("[data-parallax]"),
      );
      if (cibles.length === 0) return;

      let enAttente = false;

      const peindre = () => {
        enAttente = false;
        const hauteur = window.innerHeight;
        for (const el of cibles) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > hauteur + 200) continue;
          const force = Number(el.dataset.parallax || "0.12");
          const centre = rect.top + rect.height / 2 - hauteur / 2;
          const amplitude = (hauteur / 2 + rect.height / 2) || 1;
          const progression = Math.max(-1, Math.min(1, centre / amplitude));
          el.style.setProperty(
            "--parallax",
            `${(progression * force * rect.height).toFixed(2)}px`,
          );
        }
      };

      const planifier = () => {
        if (enAttente) return;
        enAttente = true;
        rafId = window.requestAnimationFrame(peindre);
      };

      ecouteScroll = planifier;
      window.addEventListener("scroll", planifier, { passive: true });
      window.addEventListener("resize", planifier, { passive: true });
      peindre();
    };

    demarrer();

    const surChangementPreference = () => {
      if (mouvementReduit.matches) revelerTout();
    };
    mouvementReduit.addEventListener("change", surChangementPreference);

    return () => {
      observateur?.disconnect();
      mutations?.disconnect();
      mouvementReduit.removeEventListener("change", surChangementPreference);
      if (ecouteScroll) {
        window.removeEventListener("scroll", ecouteScroll);
        window.removeEventListener("resize", ecouteScroll);
      }
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
}
