"use client";

import { useCallback, useEffect, useState } from "react";

const CLE = "letreut.favoris.biens";

/**
 * Favoris immobiliers conservés localement, dans le navigateur.
 * Aucune donnée n’est transmise à l’étude ni à un tiers.
 */
export function useFavoris() {
  const [favoris, setFavoris] = useState<string[]>([]);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    try {
      const brut = window.localStorage.getItem(CLE);
      if (brut) setFavoris(JSON.parse(brut));
    } catch {
      /* stockage indisponible : les favoris restent en mémoire */
    }
    setPret(true);
  }, []);

  const enregistrer = useCallback((liste: string[]) => {
    setFavoris(liste);
    try {
      window.localStorage.setItem(CLE, JSON.stringify(liste));
    } catch {
      /* ignoré volontairement */
    }
  }, []);

  const basculer = useCallback(
    (slug: string) => {
      setFavoris((actuels) => {
        const suivant = actuels.includes(slug)
          ? actuels.filter((s) => s !== slug)
          : [...actuels, slug];
        try {
          window.localStorage.setItem(CLE, JSON.stringify(suivant));
        } catch {
          /* ignoré volontairement */
        }
        return suivant;
      });
    },
    [],
  );

  return { favoris, basculer, enregistrer, pret };
}
