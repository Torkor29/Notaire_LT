"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Moteur d'animation du site — sans dépendance.
 *
 * 1. Révélations au scroll (`data-reveal`) via un IntersectionObserver unique.
 * 2. Parallax de scène (`data-scene`) : cinq plans de profondeur décalés
 *    indépendamment, plus un léger zoom, pour donner du relief aux
 *    illustrations.
 * 3. Progression de lecture (barre en haut de page).
 * 4. Boutons magnétiques (`data-magnetique`) sur pointeur fin.
 *
 * Tout s'annule sous `prefers-reduced-motion`.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)");

    let observateur: IntersectionObserver | null = null;
    let mutations: MutationObserver | null = null;
    let rafId = 0;
    const nettoyages: Array<() => void> = [];

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

      /* ------------------------- Révélations ------------------------- */
      observateur = new IntersectionObserver(
        (entrees) => {
          for (const entree of entrees) {
            if (!entree.isIntersecting) continue;
            entree.target.classList.add("est-visible");
            observateur?.unobserve(entree.target);
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
      );

      const observer = (racine: ParentNode) => {
        racine
          .querySelectorAll?.("[data-reveal]:not(.est-visible)")
          .forEach((el) => observateur?.observe(el));
      };
      observer(document);

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

      /* --------------------- Scroll : scènes + barre ------------------ */
      const barre = document.getElementById("progression-lecture");
      const bureau = window.matchMedia("(min-width: 768px)");

      const scenes = () =>
        Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
      let cibles = scenes();
      let enAttente = false;

      /* Amplitudes relatives des cinq plans : le lointain bouge peu,
         le premier plan beaucoup. */
      const AMPLITUDES = [-0.02, 0.015, 0.05, 0.1, 0.17];

      const peindre = () => {
        enAttente = false;
        const hauteur = window.innerHeight;

        if (barre) {
          const total =
            document.documentElement.scrollHeight - hauteur || 1;
          barre.style.setProperty(
            "--progression",
            String(Math.min(1, Math.max(0, window.scrollY / total))),
          );
        }

        if (!bureau.matches) return;

        for (const el of cibles) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -240 || rect.top > hauteur + 240) continue;
          const force = Number(el.dataset.scene || "1");
          const centre = rect.top + rect.height / 2 - hauteur / 2;
          const amplitude = hauteur / 2 + rect.height / 2 || 1;
          const t = Math.max(-1, Math.min(1, centre / amplitude));

          for (let i = 0; i < AMPLITUDES.length; i++) {
            el.style.setProperty(
              `--plan-${i + 1}`,
              `${(t * AMPLITUDES[i] * force * rect.height).toFixed(2)}px`,
            );
          }
          el.style.setProperty(
            "--scene-zoom",
            (1.08 + Math.abs(t) * 0.03 * force).toFixed(4),
          );
        }
      };

      const planifier = () => {
        if (enAttente) return;
        enAttente = true;
        rafId = window.requestAnimationFrame(peindre);
      };

      window.addEventListener("scroll", planifier, { passive: true });
      window.addEventListener("resize", planifier, { passive: true });
      nettoyages.push(() => {
        window.removeEventListener("scroll", planifier);
        window.removeEventListener("resize", planifier);
      });

      /* Les scènes peuvent apparaître après coup (filtres, onglets) */
      const rafraichir = new MutationObserver(() => {
        cibles = scenes();
        planifier();
      });
      rafraichir.observe(document.body, { childList: true, subtree: true });
      nettoyages.push(() => rafraichir.disconnect());

      peindre();

      /* ----------------------- Boutons magnétiques -------------------- */
      if (window.matchMedia("(pointer: fine)").matches) {
        const magnetiques = Array.from(
          document.querySelectorAll<HTMLElement>("[data-magnetique]"),
        );
        for (const el of magnetiques) {
          const force = Number(el.dataset.magnetique || "0.25");
          const bouger = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            el.style.setProperty("--aimant-x", `${dx * force}px`);
            el.style.setProperty("--aimant-y", `${dy * force}px`);
          };
          const relacher = () => {
            el.style.setProperty("--aimant-x", "0px");
            el.style.setProperty("--aimant-y", "0px");
          };
          el.addEventListener("pointermove", bouger);
          el.addEventListener("pointerleave", relacher);
          nettoyages.push(() => {
            el.removeEventListener("pointermove", bouger);
            el.removeEventListener("pointerleave", relacher);
          });
        }
      }
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
      nettoyages.forEach((f) => f());
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
}
