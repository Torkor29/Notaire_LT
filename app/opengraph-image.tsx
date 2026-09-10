import { ImageResponse } from "next/og";
import { site, adressePostale } from "@/lib/site";

export const alt =
  "Office notarial Marine Le Treut — notaire à Combrit, Finistère Sud";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #2c4a40 0%, #14251f 100%)",
          padding: "72px 80px",
          color: "#fbf9f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 2, background: "#b99b62" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(251,249,245,0.65)",
            }}
          >
            {`Office notarial — ${site.adresse.ville}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 940,
            }}
          >
            {"Vos projets méritent plus qu’une signature."}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 30,
              color: "rgba(251,249,245,0.7)",
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            {`Maître ${site.nomCourt} — notaire en Finistère Sud`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(251,249,245,0.18)",
            paddingTop: 28,
            fontSize: 24,
            color: "rgba(251,249,245,0.6)",
          }}
        >
          <div style={{ display: "flex" }}>{adressePostale}</div>
          <div style={{ display: "flex" }}>{site.telephone}</div>
        </div>
      </div>
    ),
    size,
  );
}
