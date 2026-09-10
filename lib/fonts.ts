import localFont from "next/font/local";

/**
 * Polices auto-hébergées (sous-ensemble latin) : aucune requête vers un
 * domaine tiers, aucun accès réseau nécessaire au moment du build.
 */

export const fraunces = localFont({
  src: [
    {
      path: "../public/fonts/fraunces-latin-var.woff2",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
  fallback: [
    "Iowan Old Style",
    "Palatino Linotype",
    "Palatino",
    "Times New Roman",
    "serif",
  ],
  adjustFontFallback: "Times New Roman",
});

export const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter-latin-var.woff2",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  adjustFontFallback: "Arial",
});
