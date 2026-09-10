"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Compteur animé. Les valeurs affichées sont calculées à partir du contenu
 * réel du site : aucun chiffre n’est inventé pour l’effet.
 */
export function Compteur({
  valeur,
  duree = 1400,
  suffixe = "",
}: {
  valeur: number;
  duree?: number;
  suffixe?: string;
}) {
  const [affichage, setAffichage] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const lance = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAffichage(valeur);
      return;
    }

    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (!entree.isIntersecting || lance.current) return;
        lance.current = true;
        const depart = performance.now();

        const pas = (maintenant: number) => {
          const t = Math.min(1, (maintenant - depart) / duree);
          const adouci = 1 - Math.pow(1 - t, 3);
          setAffichage(Math.round(adouci * valeur));
          if (t < 1) requestAnimationFrame(pas);
        };
        requestAnimationFrame(pas);
      },
      { threshold: 0.4 },
    );

    observateur.observe(el);
    return () => observateur.disconnect();
  }, [valeur, duree]);

  return (
    <span ref={ref} className="chiffres tabular-nums">
      {affichage}
      {suffixe}
    </span>
  );
}
