import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Root as MdastRoot, Blockquote, Paragraph } from "mdast";
import "server-only";
import { tempsDeLecture } from "@/lib/utils";
import type {
  ApercuArticle,
  Article,
  EnTeteArticle,
} from "@/lib/articles-types";

export * from "@/lib/articles-types";

const DOSSIER = path.join(process.cwd(), "content", "conseils");

/**
 * Transforme les citations `> [!retenir] Titre facultatif` en encadrés
 * « À retenir ». C’est la seule syntaxe étendue du CMS : elle reste lisible
 * dans le fichier markdown, y compris pour une personne non technicienne.
 */
function encadres() {
  return (arbre: MdastRoot) => {
    visit(arbre, "blockquote", (noeud: Blockquote) => {
      const premier = noeud.children[0];
      if (!premier || premier.type !== "paragraph") return;
      const paragraphe = premier as Paragraph;
      const texte = paragraphe.children[0];
      if (!texte || texte.type !== "text") return;

      const marque = texte.value.match(/^\[!retenir\][ \t]*([^\n]*)\n?/);
      if (!marque) return;

      const titre = marque[1]?.trim() || "À retenir";
      texte.value = texte.value.slice(marque[0].length).replace(/^\s+/, "");
      if (texte.value === "") {
        paragraphe.children.shift();
        if (paragraphe.children.length === 0) noeud.children.shift();
      }

      noeud.data = {
        ...noeud.data,
        hName: "div",
        hProperties: { className: ["encadre"] },
      };
      noeud.children.unshift({
        type: "paragraph",
        children: [{ type: "text", value: titre }],
        data: { hName: "p", hProperties: { className: ["encadre-titre"] } },
      } as Paragraph);
    });
  };
}

const processeur = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(encadres)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeStringify);

function sommaireDepuisHtml(html: string) {
  const sommaire: { id: string; titre: string }[] = [];
  const motif = /<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g;
  let m: RegExpExecArray | null;
  while ((m = motif.exec(html)) !== null) {
    sommaire.push({
      id: m[1],
      titre: m[2].replace(/<[^>]+>/g, "").trim(),
    });
  }
  return sommaire;
}

export const listerSlugsArticles = cache(async (): Promise<string[]> => {
  const fichiers = await readdir(DOSSIER);
  return fichiers
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
});

export const lireArticle = cache(
  async (slug: string): Promise<Article | null> => {
    let brut: string;
    try {
      brut = await readFile(path.join(DOSSIER, `${slug}.md`), "utf8");
    } catch {
      return null;
    }

    const { data, content } = matter(brut);
    const enTete = data as EnTeteArticle;
    const html = String(await processeur.process(content));

    return {
      ...enTete,
      slug,
      html,
      sommaire: sommaireDepuisHtml(html),
      minutes: tempsDeLecture(content),
    };
  },
);

export const listerArticles = cache(async (): Promise<ApercuArticle[]> => {
  const slugs = await listerSlugsArticles();
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const brut = await readFile(path.join(DOSSIER, `${slug}.md`), "utf8");
      const { data, content } = matter(brut);
      const enTete = data as EnTeteArticle;
      return { ...enTete, slug, minutes: tempsDeLecture(content) };
    }),
  );

  return articles.sort((a, b) => b.miseAJour.localeCompare(a.miseAJour));
});

export async function articlesLies(
  slugs: string[] | undefined,
  exclure?: string,
  limite = 3,
): Promise<ApercuArticle[]> {
  const tous = await listerArticles();
  const choisis: ApercuArticle[] = [];

  for (const slug of slugs ?? []) {
    const trouve = tous.find((a) => a.slug === slug && a.slug !== exclure);
    if (trouve && !choisis.some((c) => c.slug === trouve.slug)) {
      choisis.push(trouve);
    }
  }
  for (const article of tous) {
    if (choisis.length >= limite) break;
    if (article.slug === exclure) continue;
    if (!choisis.some((c) => c.slug === article.slug)) choisis.push(article);
  }
  return choisis.slice(0, limite);
}
