import type { ReactElement } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * SYSTÈME VISUEL
 * --------------
 * Tant que les photographies de l’étude, de Combrit et de Sainte-Marine ne
 * sont pas fournies, le site s’appuie sur des compositions vectorielles
 * dessinées pour ce projet : littoral, dunes, granit, architecture bretonne,
 * seuils, marées. Elles sont volontairement abstraites — jamais de fausses
 * photographies, jamais d’image générique du secteur juridique.
 *
 * Dès qu’une photographie réelle est disponible, il suffit de la déposer dans
 * `public/images/` et de passer `src="/images/mon-fichier.jpg"` : le composant
 * bascule sur next/image (AVIF/WebP, tailles responsives, lazy loading).
 */

export type VarianteVisuel =
  | "horizon"
  | "dune"
  | "facade"
  | "granit"
  | "maree"
  | "seuil"
  | "voile"
  | "bocage"
  | "portrait";

const c = {
  ivoire: "var(--color-ivoire, #fbf9f5)",
  ivoirePur: "var(--color-ivoire-pur, #fffefb)",
  craie: "var(--color-craie, #f5f1ea)",
  sable: "var(--color-sable, #ebe3d6)",
  pierre: "var(--color-pierre, #dbd1c0)",
  lin: "var(--color-lin, #c8bda8)",
  vert: "var(--color-vert, #2c4a40)",
  vertClair: "var(--color-vert-clair, #3e6357)",
  vertPale: "var(--color-vert-pale, #e4ebe6)",
  vertSombre: "var(--color-vert-sombre, #1c332c)",
  vertNuit: "var(--color-vert-nuit, #14251f)",
  champagne: "var(--color-champagne, #b99b62)",
  brume: "var(--color-brume, #a49c90)",
};

/* -------------------------------------------------------------------------- */
/*  Plaques                                                                    */
/* -------------------------------------------------------------------------- */

function Horizon(): ReactElement {
  return (
    <>
      <defs>
        <linearGradient id="vz-horizon-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.craie} />
          <stop offset="62%" stopColor={c.ivoire} />
        </linearGradient>
        <linearGradient id="vz-horizon-mer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.vertPale} />
          <stop offset="100%" stopColor={c.pierre} />
        </linearGradient>
      </defs>
      <rect width="1200" height="640" fill="url(#vz-horizon-ciel)" />
      <circle cx="838" cy="512" r="164" fill={c.sable} opacity="0.5" />
      <circle
        cx="838"
        cy="512"
        r="164"
        fill="none"
        stroke={c.champagne}
        strokeWidth="1"
        opacity="0.45"
      />
      <rect y="640" width="1200" height="560" fill="url(#vz-horizon-mer)" />
      <rect
        y="639"
        width="1200"
        height="1.5"
        fill={c.champagne}
        opacity="0.55"
      />
      <g stroke={c.ivoire} strokeWidth="1.5" fill="none">
        <path d="M120 706H1080" opacity="0.55" />
        <path d="M60 768H900" opacity="0.42" />
        <path d="M240 838H1140" opacity="0.34" />
        <path d="M0 918H820" opacity="0.26" />
        <path d="M300 1004H1200" opacity="0.2" />
      </g>
      <path
        d="M0 1096C180 1074 316 1112 512 1104C742 1094 880 1130 1200 1112V1200H0Z"
        fill={c.sable}
        opacity="0.85"
      />
    </>
  );
}

function Dune(): ReactElement {
  return (
    <>
      <defs>
        <linearGradient id="vz-dune-fond" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={c.ivoire} />
          <stop offset="100%" stopColor={c.craie} />
        </linearGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#vz-dune-fond)" />
      <path
        d="M0 742C214 640 402 726 610 700C818 674 986 566 1200 610V1200H0Z"
        fill={c.sable}
      />
      <path
        d="M0 742C214 640 402 726 610 700C818 674 986 566 1200 610"
        fill="none"
        stroke={c.champagne}
        strokeWidth="1.2"
        opacity="0.5"
      />
      <path
        d="M0 916C230 834 386 908 600 886C830 862 1010 794 1200 828V1200H0Z"
        fill={c.pierre}
        opacity="0.9"
      />
      <path
        d="M0 916C230 834 386 908 600 886C830 862 1010 794 1200 828"
        fill="none"
        stroke={c.ivoire}
        strokeWidth="1.4"
        opacity="0.7"
      />
      <path
        d="M0 1064C232 1010 442 1074 664 1052C886 1030 1024 986 1200 1006V1200H0Z"
        fill={c.lin}
        opacity="0.75"
      />
      <g stroke={c.brume} strokeWidth="1" opacity="0.28" fill="none">
        <path d="M120 802C300 764 470 806 660 786" />
        <path d="M262 966C440 934 604 972 786 950" />
      </g>
    </>
  );
}

function Facade(): ReactElement {
  return (
    <>
      <defs>
        <linearGradient id="vz-facade-fond" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.craie} />
          <stop offset="100%" stopColor={c.sable} />
        </linearGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#vz-facade-fond)" />
      <circle cx="248" cy="286" r="118" fill={c.ivoire} opacity="0.75" />

      {/* Volume secondaire */}
      <path d="M138 700L318 566L318 1016H138Z" fill={c.pierre} opacity="0.7" />
      <rect
        x="138"
        y="700"
        width="180"
        height="316"
        fill={c.craie}
        opacity="0.55"
      />

      {/* Corps principal */}
      <path
        d="M296 596L662 320L1028 596Z"
        fill={c.ivoirePur}
        stroke={c.pierre}
        strokeWidth="1.5"
      />
      <rect
        x="368"
        y="592"
        width="588"
        height="424"
        fill={c.ivoirePur}
        stroke={c.pierre}
        strokeWidth="1.5"
      />
      <rect
        x="836"
        y="404"
        width="58"
        height="132"
        fill={c.ivoirePur}
        stroke={c.pierre}
        strokeWidth="1.5"
      />
      <path
        d="M296 596L662 320L1028 596"
        fill="none"
        stroke={c.champagne}
        strokeWidth="1.6"
        opacity="0.6"
      />

      {/* Ouvertures */}
      <g fill={c.vert}>
        <rect x="432" y="672" width="86" height="126" opacity="0.88" />
        <rect x="620" y="672" width="86" height="126" opacity="0.88" />
        <rect x="808" y="672" width="86" height="126" opacity="0.88" />
        <rect x="620" y="856" width="86" height="160" />
      </g>
      <g fill="none" stroke={c.ivoirePur} strokeWidth="1.4" opacity="0.8">
        <path d="M475 672V798M432 735H518" />
        <path d="M663 672V798M620 735H706" />
        <path d="M851 672V798M808 735H894" />
      </g>

      {/* Sol */}
      <rect y="1014" width="1200" height="3" fill={c.brume} opacity="0.5" />
      <rect y="1017" width="1200" height="183" fill={c.lin} opacity="0.35" />
    </>
  );
}

function Granit(): ReactElement {
  const blocs: Array<[string, string, number]> = [
    ["M0 300L292 276L306 520L0 540Z", c.sable, 1],
    ["M292 276L604 258L616 508L306 520Z", c.craie, 1],
    ["M604 258L906 274L914 512L616 508Z", c.pierre, 0.85],
    ["M906 274L1200 250V520L914 512Z", c.sable, 0.7],
    ["M0 540L306 520L318 764L0 778Z", c.pierre, 0.75],
    ["M306 520L616 508L624 756L318 764Z", c.sable, 0.95],
    ["M616 508L914 512L920 752L624 756Z", c.craie, 0.9],
    ["M914 512L1200 520V748L920 752Z", c.lin, 0.55],
    ["M0 778L318 764L330 1010L0 1024Z", c.craie, 0.8],
    ["M318 764L624 756L634 1002L330 1010Z", c.lin, 0.5],
    ["M624 756L920 752L926 998L634 1002Z", c.sable, 0.9],
    ["M920 752L1200 748V994L926 998Z", c.pierre, 0.7],
  ];
  return (
    <>
      <rect width="1200" height="1200" fill={c.craie} />
      <rect y="0" width="1200" height="300" fill={c.ivoire} />
      <g>
        {blocs.map(([d, fill, opacity], i) => (
          <path
            key={i}
            d={d}
            fill={fill}
            opacity={opacity}
            stroke={c.ivoire}
            strokeWidth="2.5"
          />
        ))}
      </g>
      <rect y="1006" width="1200" height="194" fill={c.lin} opacity="0.42" />
      <path
        d="M0 300H1200"
        stroke={c.champagne}
        strokeWidth="1.2"
        opacity="0.45"
      />
    </>
  );
}

function Maree(): ReactElement {
  return (
    <>
      <defs>
        <linearGradient id="vz-maree-fond" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor={c.vertClair} />
          <stop offset="55%" stopColor={c.vertSombre} />
          <stop offset="100%" stopColor={c.vertNuit} />
        </linearGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#vz-maree-fond)" />
      <g fill="none" stroke={c.ivoire}>
        <circle cx="1010" cy="1042" r="240" strokeWidth="1.4" opacity="0.2" />
        <circle cx="1010" cy="1042" r="372" strokeWidth="1.3" opacity="0.17" />
        <circle cx="1010" cy="1042" r="512" strokeWidth="1.2" opacity="0.14" />
        <circle cx="1010" cy="1042" r="666" strokeWidth="1.1" opacity="0.11" />
        <circle cx="1010" cy="1042" r="828" strokeWidth="1" opacity="0.08" />
        <circle cx="1010" cy="1042" r="998" strokeWidth="1" opacity="0.06" />
      </g>
      <circle cx="1010" cy="1042" r="118" fill={c.champagne} opacity="0.28" />
      <path
        d="M0 262C210 222 372 300 566 286C760 272 900 196 1200 232"
        fill="none"
        stroke={c.champagne}
        strokeWidth="1.4"
        opacity="0.5"
      />
      <path
        d="M0 336C210 296 372 374 566 360C760 346 900 270 1200 306"
        fill="none"
        stroke={c.ivoire}
        strokeWidth="1.2"
        opacity="0.18"
      />
    </>
  );
}

function Seuil(): ReactElement {
  return (
    <>
      <defs>
        <linearGradient id="vz-seuil-fond" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={c.vert} />
          <stop offset="100%" stopColor={c.vertNuit} />
        </linearGradient>
        <linearGradient id="vz-seuil-lumiere" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.ivoirePur} />
          <stop offset="100%" stopColor={c.sable} />
        </linearGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#vz-seuil-fond)" />
      <path
        d="M400 1200V546C400 430 490 340 600 340C710 340 800 430 800 546V1200Z"
        fill="url(#vz-seuil-lumiere)"
      />
      <path
        d="M462 1200V556C462 468 524 402 600 402C676 402 738 468 738 556V1200Z"
        fill={c.vertPale}
        opacity="0.55"
      />
      <path
        d="M400 1200V546C400 430 490 340 600 340C710 340 800 430 800 546V1200"
        fill="none"
        stroke={c.champagne}
        strokeWidth="1.6"
        opacity="0.6"
      />
      <g fill="none" stroke={c.ivoire} strokeWidth="1" opacity="0.12">
        <path d="M0 760H400M800 760H1200" />
        <path d="M0 900H400M800 900H1200" />
        <path d="M0 1040H400M800 1040H1200" />
      </g>
      <rect
        x="330"
        y="1176"
        width="540"
        height="4"
        fill={c.champagne}
        opacity="0.35"
      />
    </>
  );
}

function Voile(): ReactElement {
  return (
    <>
      <defs>
        <linearGradient id="vz-voile-fond" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={c.ivoire} />
          <stop offset="100%" stopColor={c.craie} />
        </linearGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#vz-voile-fond)" />
      <path d="M596 156C826 404 906 700 878 1006H596Z" fill={c.sable} />
      <path
        d="M560 214C420 460 372 736 392 1006H560Z"
        fill={c.vert}
        opacity="0.92"
      />
      <path
        d="M596 156C826 404 906 700 878 1006"
        fill="none"
        stroke={c.champagne}
        strokeWidth="1.4"
        opacity="0.65"
      />
      <rect
        x="574"
        y="140"
        width="3"
        height="880"
        fill={c.brume}
        opacity="0.7"
      />
      <rect y="1004" width="1200" height="2" fill={c.brume} opacity="0.55" />
      <path
        d="M0 1006C220 1044 420 1010 640 1042C860 1074 1010 1036 1200 1062V1200H0Z"
        fill={c.pierre}
        opacity="0.6"
      />
    </>
  );
}

function Bocage(): ReactElement {
  const bandes: Array<[number, number, string, number]> = [
    [560, 74, c.vertClair, 0.42],
    [634, 58, c.sable, 1],
    [692, 92, c.vert, 0.24],
    [784, 62, c.craie, 1],
    [846, 106, c.lin, 0.95],
    [952, 70, c.vertClair, 0.3],
    [1022, 118, c.pierre, 1],
  ];
  return (
    <>
      <defs>
        <linearGradient id="vz-bocage-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.craie} />
          <stop offset="100%" stopColor={c.ivoire} />
        </linearGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#vz-bocage-ciel)" />
      <rect y="556" width="1200" height="644" fill={c.sable} opacity="0.55" />
      {bandes.map(([y, h, fill, opacity], i) => (
        <path
          key={i}
          d={`M0 ${y + i * 6}L1200 ${y - 26}L1200 ${y + h - 26}L0 ${y + h + i * 6}Z`}
          fill={fill}
          opacity={opacity}
        />
      ))}
      <rect
        y="554"
        width="1200"
        height="1.6"
        fill={c.champagne}
        opacity="0.5"
      />
      <g fill="none" stroke={c.vert} strokeWidth="2.5" opacity="0.55">
        <path d="M186 496V556" />
        <path d="M246 508V556" />
        <path d="M300 486V556" />
        <path d="M980 500V556" />
        <path d="M1030 490V556" />
      </g>
    </>
  );
}

function Portrait(): ReactElement {
  return (
    <>
      <defs>
        <linearGradient id="vz-portrait-fond" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={c.craie} />
          <stop offset="100%" stopColor={c.sable} />
        </linearGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#vz-portrait-fond)" />
      <rect
        x="132"
        y="132"
        width="936"
        height="936"
        fill="none"
        stroke={c.champagne}
        strokeWidth="1.4"
        opacity="0.6"
      />
      <g fill="none" stroke={c.vert} strokeWidth="1.6" opacity="0.5" strokeLinecap="round">
        <path d="M132 264V132H264" />
        <path d="M936 132H1068V264" />
        <path d="M1068 936V1068H936" />
        <path d="M264 1068H132V936" />
      </g>
      <circle cx="600" cy="516" r="152" fill={c.ivoirePur} opacity="0.9" />
      <path
        d="M330 960C330 812 450 700 600 700C750 700 870 812 870 960Z"
        fill={c.ivoirePur}
        opacity="0.9"
      />
    </>
  );
}

const plaques: Record<VarianteVisuel, () => ReactElement> = {
  horizon: Horizon,
  dune: Dune,
  facade: Facade,
  granit: Granit,
  maree: Maree,
  seuil: Seuil,
  voile: Voile,
  bocage: Bocage,
  portrait: Portrait,
};

/* -------------------------------------------------------------------------- */
/*  Composant                                                                  */
/* -------------------------------------------------------------------------- */

export interface VisuelProps {
  variante: VarianteVisuel;
  /** Photographie réelle, si elle est disponible dans `public/images/`. */
  src?: string;
  alt?: string;
  ratio?: string;
  className?: string;
  /** Force du parallax (0.06 → 0.2). `false` désactive. */
  parallax?: number | false;
  /** Révélation par masque au scroll. */
  masque?: "bas" | "gauche" | false;
  legende?: string;
  priority?: boolean;
  sizes?: string;
  arrondi?: boolean;
}

export function Visuel({
  variante,
  src,
  alt,
  ratio = "4 / 5",
  className,
  parallax = 0.09,
  masque = "bas",
  legende,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  arrondi = true,
}: VisuelProps) {
  const Plaque = plaques[variante];
  const attributsMasque =
    masque === false
      ? {}
      : { "data-reveal": masque === "gauche" ? "masque-lateral" : "masque" };

  return (
    <figure
      className={cn(
        "relative overflow-hidden bg-craie grain",
        arrondi && "rounded-lg",
        className,
      )}
      style={{ aspectRatio: ratio }}
      {...attributsMasque}
    >
      <div
        className={cn("absolute inset-0", masque !== false && "masque-contenu")}
      >
        <div
          className="absolute inset-0"
          {...(parallax === false ? {} : { "data-parallax": String(parallax) })}
          style={
            parallax === false
              ? undefined
              : ({ "--parallax-zoom": "1.14" } as React.CSSProperties)
          }
        >
          {src ? (
            <Image
              src={src}
              alt={alt ?? ""}
              fill
              sizes={sizes}
              priority={priority}
              className="h-full w-full object-cover"
            />
          ) : (
            <svg
              viewBox="0 0 1200 1200"
              preserveAspectRatio="xMidYMid slice"
              className="h-full w-full"
              role={alt ? "img" : "presentation"}
              aria-label={alt || undefined}
              aria-hidden={alt ? undefined : true}
              focusable="false"
            >
              {alt ? <title>{alt}</title> : null}
              <Plaque />
            </svg>
          )}
        </div>
      </div>

      {legende ? (
        <figcaption className="absolute bottom-0 left-0 right-0 z-3 bg-linear-to-t from-encre/55 to-transparent px-5 pb-4 pt-14 text-xs leading-snug text-ivoire/90">
          {legende}
        </figcaption>
      ) : null}
    </figure>
  );
}
