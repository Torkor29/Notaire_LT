import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fraunces, inter } from "@/lib/fonts";
import { site, urlSite, url, adressePostale } from "@/lib/site";
import { Entete } from "@/components/Entete";
import { PiedDePage } from "@/components/PiedDePage";
import { BarreMobile } from "@/components/BarreMobile";
import { MotionRoot } from "@/components/MotionRoot";
import { TransitionPage } from "@/components/TransitionPage";
import { RechercheProvider } from "@/components/RechercheProvider";

export const metadata: Metadata = {
  metadataBase: new URL(urlSite),
  title: {
    default:
      "Notaire à Combrit (29) — Office notarial Marine Le Treut, Finistère Sud",
    template: "%s | Marine Le Treut, notaire à Combrit",
  },
  description:
    "Office notarial de Maître Marine Le Treut à Combrit, près de Sainte-Marine et Pont-l’Abbé. Achat et vente immobilière, mariage et PACS, séparation, donation, succession, entreprise.",
  applicationName: site.nom,
  authors: [{ name: site.nom }],
  creator: site.nom,
  publisher: site.nom,
  alternates: { canonical: "/" },
  category: "Notariat",
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.nom,
    url: urlSite,
    title:
      "Office notarial Marine Le Treut — Notaire à Combrit, Finistère Sud",
    description:
      "Vos projets méritent plus qu’une signature. Achat, transmission, union, séparation, entreprise : l’étude vous accompagne à Combrit et en Finistère Sud.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Office notarial Marine Le Treut — Notaire à Combrit",
    description:
      "Achat, transmission, union, séparation, entreprise : l’étude vous accompagne à Combrit et en Finistère Sud.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#14251f" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Données structurées de l’office — uniquement des informations vérifiées. */
const donneesStructurees = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Notary", "LegalService", "LocalBusiness"],
      "@id": url("/#office"),
      name: site.nom,
      alternateName: `Maître ${site.nomCourt}, notaire à ${site.adresse.ville}`,
      url: urlSite,
      telephone: site.telephone,
      email: site.email,
      description:
        "Office notarial à Combrit (Finistère Sud) : immobilier, famille, séparation, transmission, entreprise.",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.adresse.rue,
        postalCode: site.adresse.codePostal,
        addressLocality: site.adresse.ville,
        addressRegion: site.adresse.region,
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.adresse.latitude,
        longitude: site.adresse.longitude,
      },
      areaServed: [
        { "@type": "City", name: "Combrit" },
        { "@type": "Place", name: "Sainte-Marine" },
        { "@type": "City", name: "Pont-l’Abbé" },
        { "@type": "City", name: "Bénodet" },
        { "@type": "AdministrativeArea", name: "Finistère" },
      ],
      knowsLanguage: ["fr-FR"],
      employee: {
        "@type": "Person",
        name: `Maître ${site.nomCourt}`,
        jobTitle: "Notaire",
      },
    },
    {
      "@type": "WebSite",
      "@id": url("/#site"),
      url: urlSite,
      name: site.nom,
      inLanguage: "fr-FR",
      publisher: { "@id": url("/#office") },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: url("/recherche?q={search_term_string}"),
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(donneesStructurees),
          }}
        />
        {/* Sans JavaScript, aucun contenu ne doit rester masqué. */}
        <noscript>
          <style>{`[data-reveal],.masque-contenu{opacity:1!important;transform:none!important;clip-path:none!important;scale:none!important}.ligne-masque>span{transform:none!important}`}</style>
        </noscript>
        <meta name="geo.region" content="FR-29" />
        <meta name="geo.placename" content={`${site.adresse.ville}, ${site.adresse.departement}`} />
        <meta name="geo.position" content={`${site.adresse.latitude};${site.adresse.longitude}`} />
        <meta name="ICBM" content={`${site.adresse.latitude}, ${site.adresse.longitude}`} />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="contact:address" content={adressePostale} />
      </head>
      <body className="min-h-screen antialiased">
        <RechercheProvider>
          <Entete />
          <main id="contenu" tabIndex={-1}>
            <TransitionPage>{children}</TransitionPage>
          </main>
          <PiedDePage />
          <BarreMobile />
          <MotionRoot />
        </RechercheProvider>
      </body>
    </html>
  );
}
