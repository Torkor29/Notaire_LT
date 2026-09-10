"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Transition inter-pages : un fondu ascendant très court appliqué au <main>
 * à chaque changement de route, et remise du focus en tête de page pour les
 * utilisateurs de lecteurs d’écran et de navigation clavier.
 */
export function TransitionPage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const premierRendu = useRef(true);

  useEffect(() => {
    if (premierRendu.current) {
      premierRendu.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.animation = "none";
      // Force le recalcul afin de rejouer l’animation à chaque navigation.
      void el.offsetHeight;
      el.style.animation = "";
    }

    const titre = document.querySelector<HTMLElement>("main h1");
    titre?.setAttribute("tabindex", "-1");
    titre?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div
      ref={ref}
      key={pathname}
      style={{
        animation: "apparition-page 520ms var(--ease-soft) both",
      }}
    >
      {children}
    </div>
  );
}
