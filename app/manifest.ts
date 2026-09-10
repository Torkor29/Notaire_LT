import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.nom,
    short_name: "M. Le Treut",
    description:
      "Office notarial de Maître Marine Le Treut à Combrit, Finistère Sud.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf9f5",
    theme_color: "#2c4a40",
    lang: "fr-FR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
