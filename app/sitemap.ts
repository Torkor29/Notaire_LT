import type { MetadataRoute } from "next";
import { url } from "@/lib/site";
import { actes } from "@/lib/actes";
import { pagesProjets } from "@/lib/projets";
import { listerArticles } from "@/lib/articles";
import { listerBiens } from "@/lib/biens";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const aujourdhui = new Date();
  const articles = await listerArticles();
  const biens = await listerBiens();

  const statiques: MetadataRoute.Sitemap = ([
    { url: url("/"), priority: 1, changeFrequency: "monthly" },
    { url: url("/etude"), priority: 0.9, changeFrequency: "yearly" },
    { url: url("/vos-projets"), priority: 0.9, changeFrequency: "monthly" },
    { url: url("/actes"), priority: 0.9, changeFrequency: "monthly" },
    { url: url("/conseils"), priority: 0.9, changeFrequency: "weekly" },
    { url: url("/immobilier"), priority: 0.8, changeFrequency: "weekly" },
    { url: url("/contact"), priority: 0.9, changeFrequency: "yearly" },
    { url: url("/faq"), priority: 0.8, changeFrequency: "monthly" },
    {
      url: url("/preparer-mon-rendez-vous"),
      priority: 0.7,
      changeFrequency: "yearly",
    },
    {
      url: url("/mon-projet-en-60-secondes"),
      priority: 0.6,
      changeFrequency: "yearly",
    },
    { url: url("/plan-du-site"), priority: 0.3, changeFrequency: "monthly" },
    { url: url("/mentions-legales"), priority: 0.2, changeFrequency: "yearly" },
    { url: url("/confidentialite"), priority: 0.2, changeFrequency: "yearly" },
    { url: url("/cookies"), priority: 0.2, changeFrequency: "yearly" },
    { url: url("/accessibilite"), priority: 0.2, changeFrequency: "yearly" },
  ] as const satisfies readonly MetadataRoute.Sitemap[number][]).map((e) => ({
    ...e,
    lastModified: aujourdhui,
  }));

  const projets: MetadataRoute.Sitemap = pagesProjets.map((p) => ({
    url: url(`/vos-projets/${p.slug}`),
    lastModified: aujourdhui,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const fiches: MetadataRoute.Sitemap = actes.map((a) => ({
    url: url(`/actes/${a.slug}`),
    lastModified: aujourdhui,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const publications: MetadataRoute.Sitemap = articles.map((a) => ({
    url: url(`/conseils/${a.slug}`),
    lastModified: new Date(`${a.miseAJour}T12:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const annonces: MetadataRoute.Sitemap = biens
    .filter((b) => !b.demonstration)
    .map((b) => ({
      url: url(`/immobilier/${b.slug}`),
      lastModified: aujourdhui,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  return [...statiques, ...projets, ...fiches, ...publications, ...annonces];
}
