"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Barre d’action mobile : appeler l’étude ou prendre rendez-vous, toujours
 * à portée de pouce. Elle apparaît une fois le hero dépassé pour ne pas
 * masquer la première impression.
 */
export function BarreMobile() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const surScroll = () => setVisible(window.scrollY > 620);
    surScroll();
    window.addEventListener("scroll", surScroll, { passive: true });
    return () => window.removeEventListener("scroll", surScroll);
  }, []);

  return (
    <div
      className={cn(
        "sans-impression fixed inset-x-0 bottom-0 z-50 px-3 pb-3 transition-[transform,opacity] duration-600 ease-soft md:hidden",
        visible ? "translate-y-0 opacity-100" : "translate-y-[130%] opacity-0",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <div className="verre flex items-center gap-2 rounded-full border border-pierre/60 p-1.5 shadow-relief">
        <a
          href={`tel:${site.telephoneLien}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-[0.875rem] font-medium text-encre"
          tabIndex={visible ? 0 : -1}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z"
              strokeLinejoin="round"
            />
          </svg>
          Appeler l’étude
        </a>
        <Link
          href="/contact#rendez-vous"
          className="flex flex-1 items-center justify-center rounded-full bg-vert px-4 py-3 text-[0.875rem] font-medium text-ivoire"
          tabIndex={visible ? 0 : -1}
        >
          Prendre rendez-vous
        </Link>
      </div>
    </div>
  );
}
