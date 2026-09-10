import { construireIndexRecherche } from "@/lib/index-recherche";

/** Index statique, généré au build et servi comme un fichier. */
export const dynamic = "force-static";

export async function GET() {
  const index = await construireIndexRecherche();
  return Response.json(index, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
