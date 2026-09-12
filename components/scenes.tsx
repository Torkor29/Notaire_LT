import type { ReactElement } from "react";

/**
 * SCÈNES ILLUSTRÉES
 * -----------------
 * Chaque scène est une composition vectorielle en plusieurs plans de
 * profondeur (`<g data-plan="1..5">`). Les plans sont décalés indépendamment
 * au défilement, ce qui donne une vraie perspective atmosphérique.
 *
 * Sujets : le littoral de Combrit et de Sainte-Marine, l'anse du Pouldon,
 * l'architecture bretonne, les pinèdes du bord de mer, le granit.
 * Ce sont des illustrations assumées — jamais de fausses photographies.
 */

/* --- Palette d'illustration, plus contrastée que l'interface ------------- */
export const p = {
  cielHaut: "#bfd0d1",
  cielBas: "#f0e0c0",
  cielNuit: "#12241f",
  cielCrepuscule: "#345048",
  soleil: "#f0cf94",
  soleilVif: "#dfae62",
  or: "#c8a468",
  orSombre: "#96773f",

  merLoin: "#7d9a92",
  merMoyen: "#4b7065",
  merProche: "#2c5047",
  merNuit: "#1a352f",
  ecume: "#f3efe6",

  terreLoin: "#83958c",
  terreMoyen: "#516b60",
  terreProche: "#2e443c",
  terreNuit: "#15251f",

  sable: "#dcc8a4",
  sableOmbre: "#bda578",
  sableFonce: "#ab9a76",
  roche: "#4b4740",
  rocheClaire: "#7a7368",

  murClair: "#f6efdf",
  murOmbre: "#d6c8ab",
  ardoise: "#3c4245",
  ardoiseClaire: "#5d6468",
  bois: "#7b5f3e",
  volet: "#25453d",
  vitre: "#2a3d3c",
  vitreLumiere: "#e8c88a",

  feuillage: "#2c4a3c",
  feuillageClair: "#456854",
  herbe: "#6b8055",
};

/* -------------------------------------------------------------------------- */
/*  Utilitaires de dessin                                                      */
/* -------------------------------------------------------------------------- */

function Plan({
  n,
  children,
  opacity,
}: {
  n: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
  opacity?: number;
}) {
  return (
    <g
      data-plan={n}
      opacity={opacity}
      style={{ transform: `translate3d(0, var(--plan-${n}, 0px), 0)` }}
    >
      {children}
    </g>
  );
}

/** Bandes de lumière sur l'eau. */
function Reflets({
  y,
  h,
  couleur,
  nb = 9,
  largeurMax = 1300,
  cx = 800,
}: {
  y: number;
  h: number;
  couleur: string;
  nb?: number;
  largeurMax?: number;
  cx?: number;
}) {
  const traits = [];
  for (let i = 0; i < nb; i++) {
    const t = i / (nb - 1);
    const yy = y + t * h;
    const l = largeurMax * (0.18 + 0.82 * Math.pow(t, 1.6));
    const o = 0.5 - 0.34 * t;
    traits.push(
      <rect
        key={i}
        x={cx - l / 2 + (i % 2 ? 26 : -34)}
        y={yy}
        width={l}
        height={2 + t * 3}
        rx={2}
        fill={couleur}
        opacity={o}
      />,
    );
  }
  return <g>{traits}</g>;
}

/** Volée d'oiseaux, minuscule, pour l'échelle. */
function Oiseaux({ x, y, echelle = 1 }: { x: number; y: number; echelle?: number }) {
  const o = [
    [0, 0, 1],
    [26, -12, 0.85],
    [48, 6, 0.7],
    [72, -6, 0.6],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${echelle})`} opacity="0.5">
      {o.map(([dx, dy, s], i) => (
        <path
          key={i}
          d={`M${dx} ${dy}q5 -4 9 0q4 -4 9 0`}
          fill="none"
          stroke={p.terreNuit}
          strokeWidth={1.6 / (s as number)}
          strokeLinecap="round"
          transform={`scale(${s})`}
        />
      ))}
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*  1. Le phare — crépuscule sur le littoral                                   */
/* -------------------------------------------------------------------------- */

export function ScenePhare(): ReactElement {
  return (
    <>
      <defs>
        <linearGradient id="sc-phare-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.cielNuit} />
          <stop offset="46%" stopColor={p.cielCrepuscule} />
          <stop offset="72%" stopColor="#8e9a85" />
          <stop offset="100%" stopColor={p.soleil} />
        </linearGradient>
        <radialGradient id="sc-phare-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={p.soleilVif} stopOpacity="0.85" />
          <stop offset="60%" stopColor={p.soleil} stopOpacity="0.25" />
          <stop offset="100%" stopColor={p.soleil} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sc-phare-faisceau" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.soleil} stopOpacity="0.5" />
          <stop offset="100%" stopColor={p.soleil} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ciel */}
      <rect width="1600" height="1200" fill="url(#sc-phare-ciel)" />
      <circle cx="1080" cy="742" r="300" fill="url(#sc-phare-halo)" />
      <circle cx="1080" cy="748" r="74" fill={p.soleilVif} opacity="0.9" />

      {/* Nuages lointains */}
      <Plan n={1} opacity={0.35}>
        <path d="M0 300q180 -46 360 -8t420 -18 400 14 420 -30v54q-220 40 -430 14t-410 20 -380 8 -380 -26Z" fill={p.cielHaut} />
        <path d="M180 430q220 -34 430 -2t420 -22 570 8v40q-260 28 -560 6t-430 20 -430 -12Z" fill={p.cielHaut} opacity="0.6" />
      </Plan>

      <Oiseaux x={330} y={352} echelle={1.35} />

      {/* Presqu'île lointaine */}
      <Plan n={2}>
        <path
          d="M0 792q150 -28 300 -18t260 22 300 -12 330 16 410 -14v40H0Z"
          fill={p.terreLoin}
          opacity="0.8"
        />
      </Plan>

      {/* Mer */}
      <Plan n={3}>
        <rect y="820" width="1600" height="380" fill={p.merMoyen} />
        <rect y="820" width="1600" height="2" fill={p.ecume} opacity="0.5" />
        <Reflets y={834} h={330} couleur={p.soleil} nb={11} largeurMax={1500} cx={1080} />
        <path
          d="M0 1046q200 -22 400 6t400 -10 400 12 400 -14v160H0Z"
          fill={p.merProche}
          opacity="0.85"
        />
      </Plan>

      {/* Phare et jetée */}
      <Plan n={4}>
        <path d="M0 1090q260 -18 520 4t560 -10 520 12v106H0Z" fill={p.terreProche} />
        <g>
          <path d="M1232 1100V684h68v416Z" fill={p.murClair} />
          <path d="M1266 1100V684h34v416Z" fill={p.murOmbre} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="1232" y={758 + i * 92} width="68" height="26" fill={p.merProche} opacity="0.75" />
          ))}
          <path d="M1224 684h84l-10 -34h-64Z" fill={p.ardoise} />
          <rect x="1240" y="612" width="52" height="40" rx="4" fill={p.vitreLumiere} />
          <path d="M1230 612h72l-36 -44Z" fill={p.ardoise} />
          <rect x="1262" y="546" width="8" height="24" rx="4" fill={p.ardoise} />
          {/* Faisceau */}
          <path d="M1292 632 1600 560v148Z" fill="url(#sc-phare-faisceau)" />
        </g>
      </Plan>

      {/* Rochers au premier plan */}
      <Plan n={5}>
        <path
          d="M0 1200v-92q92 -34 178 -6t150 44 190 -16 220 40 240 -26 300 34 322 -18v40Z"
          fill={p.terreNuit}
        />
        <path d="M96 1114q46 -30 96 -8t86 40 -36 26 -110 -12 -36 -46Z" fill={p.terreNuit} />
        <path d="M1002 1132q54 -34 112 -8t92 38 -44 26 -128 -10 -32 -46Z" fill={p.terreNuit} />
      </Plan>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. L'estuaire — l'anse, les mâts, la cale                                   */
/* -------------------------------------------------------------------------- */

export function SceneEstuaire(): ReactElement {
  const mats = [
    [520, 690, 210],
    [572, 706, 164],
    [628, 680, 246],
    [686, 712, 150],
    [742, 694, 196],
    [806, 704, 172],
    [864, 686, 222],
    [926, 710, 142],
  ];
  return (
    <>
      <defs>
        <linearGradient id="sc-est-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9d6d4" />
          <stop offset="58%" stopColor="#eae2d0" />
          <stop offset="100%" stopColor={p.cielBas} />
        </linearGradient>
      </defs>

      <rect width="1600" height="1200" fill="url(#sc-est-ciel)" />
      <circle cx="330" cy="300" r="118" fill={p.soleil} opacity="0.5" />

      <Plan n={1} opacity={0.3}>
        <path d="M0 250q240 -40 470 -6t470 -20 660 10v46q-300 30 -640 6t-480 18 -480 -12Z" fill="#ffffff" />
      </Plan>

      <Oiseaux x={1180} y={286} echelle={1.2} />
      <Oiseaux x={230} y={430} echelle={0.85} />

      {/* Rive lointaine boisée */}
      <Plan n={2}>
        <path d="M0 686q170 -18 330 -6t300 -14 340 10 330 -18 300 12v38H0Z" fill={p.terreLoin} opacity="0.85" />
        <g fill={p.feuillage} opacity="0.32">
          {Array.from({ length: 26 }).map((_, i) => (
            <path
              key={i}
              d={`M${40 + i * 62} 688q10 -30 22 -2Z`}
              transform={`scale(1 ${1 + (i % 3) * 0.5}) translate(0 ${-(i % 3) * 4})`}
            />
          ))}
        </g>
      </Plan>

      {/* Maisons blanches sur la rive */}
      <Plan n={2}>
        <g>
          {[
            [180, 646, 74, 46],
            [268, 652, 56, 40],
            [1090, 648, 68, 44],
            [1172, 656, 50, 36],
            [1240, 644, 80, 48],
          ].map(([x, y, w, h], i) => (
            <g key={i} opacity="0.85">
              <rect x={x} y={y} width={w} height={h} fill={p.murClair} />
              <path d={`M${x - 6} ${y}h${w + 12}l-${w / 2 + 6} -22Z`} fill={p.ardoise} />
            </g>
          ))}
        </g>
      </Plan>

      {/* Eau */}
      <Plan n={3}>
        <rect y="690" width="1600" height="510" fill={p.merLoin} />
        <rect y="690" width="1600" height="2" fill={p.ecume} opacity="0.6" />
        <rect y="760" width="1600" height="440" fill={p.merMoyen} opacity="0.75" />
        <Reflets y={706} h={420} couleur={p.ecume} nb={13} largeurMax={1560} cx={430} />
      </Plan>

      {/* Bateaux et mâts */}
      <Plan n={4}>
        {mats.map(([x, y, h], i) => (
          <g key={i}>
            <rect x={x} y={y - h} width="3" height={h} fill={p.roche} opacity="0.8" />
            <path
              d={`M${x - 34} ${y}q34 18 70 0q-10 16 -35 16t-35 -16Z`}
              fill={i % 2 ? p.murClair : p.or}
              opacity="0.95"
            />
            <rect x={x - 3} y={y - h} width="3" height={h * 0.9} fill={p.ecume} opacity="0.25" />
          </g>
        ))}
        {/* Reflets des coques */}
        <g opacity="0.28">
          {mats.map(([x, y], i) => (
            <rect key={i} x={x - 30} y={y + 18} width="62" height="30" rx="14" fill={p.merNuit} />
          ))}
        </g>
      </Plan>

      {/* Cale et bitte d'amarrage */}
      <Plan n={5}>
        <path d="M0 1200v-150l520 72v78Z" fill={p.rocheClaire} />
        <path d="M0 1050l520 72v22L0 1076Z" fill={p.sableOmbre} />
        <g>
          <rect x="130" y="1022" width="30" height="54" rx="12" fill={p.terreNuit} />
          <rect x="120" y="1012" width="50" height="16" rx="8" fill={p.terreNuit} />
          <path
            d="M160 1030q120 34 210 -8"
            fill="none"
            stroke={p.roche}
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
        <path d="M1600 1200v-118q-180 30 -340 76t-260 42h600Z" fill={p.terreNuit} opacity="0.9" />
      </Plan>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. La maison bretonne                                                      */
/* -------------------------------------------------------------------------- */

export function SceneMaison(): ReactElement {
  return (
    <>
      <defs>
        <linearGradient id="sc-mai-ciel" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#cfdad9" />
          <stop offset="70%" stopColor="#ece3d2" />
          <stop offset="100%" stopColor="#f4ecdc" />
        </linearGradient>
        <linearGradient id="sc-mai-toit" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#5b6165" />
          <stop offset="100%" stopColor={p.ardoise} />
        </linearGradient>
      </defs>

      <rect width="1600" height="1200" fill="url(#sc-mai-ciel)" />
      <circle cx="1300" cy="260" r="150" fill={p.soleil} opacity="0.42" />
      <Oiseaux x={240} y={240} echelle={1.1} />

      {/* Arbres derrière */}
      <Plan n={1} opacity={0.45}>
        {[
          [130, 700, 120, 210],
          [1380, 690, 150, 250],
          [1500, 720, 100, 180],
        ].map(([x, y, w, h], i) => (
          <g key={i}>
            <rect x={x + w / 2 - 6} y={y - 40} width="12" height="60" fill={p.roche} />
            <ellipse cx={x + w / 2} cy={y - h / 2 - 30} rx={w / 2} ry={h / 2} fill={p.feuillage} />
          </g>
        ))}
      </Plan>

      {/* Muret de pierre */}
      <Plan n={2}>
        <rect y="860" width="1600" height="60" fill={p.rocheClaire} opacity="0.5" />
      </Plan>

      {/* Corps de la maison */}
      <Plan n={3}>
        {/* Aile gauche */}
        <g>
          <rect x="212" y="690" width="240" height="252" fill={p.murOmbre} />
          <path d="M196 690h272l-136 -104Z" fill="url(#sc-mai-toit)" />
          <rect x="272" y="742" width="56" height="78" fill={p.vitre} />
          <rect x="356" y="742" width="56" height="78" fill={p.vitre} />
          <rect x="272" y="742" width="56" height="78" fill="none" stroke={p.murClair} strokeWidth="5" />
          <rect x="356" y="742" width="56" height="78" fill="none" stroke={p.murClair} strokeWidth="5" />
        </g>

        {/* Corps principal */}
        <g>
          <rect x="440" y="602" width="620" height="340" fill={p.murClair} />
          <path d="M416 602h668l-334 -158Z" fill="url(#sc-mai-toit)" />
          <path d="M416 602h668l-18 -8H434Z" fill={p.ardoiseClaire} />
          {/* Lignes d'ardoise */}
          <g stroke={p.ardoiseClaire} strokeWidth="2" opacity="0.35">
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M${440 + i * 26} ${580 - i * 6}L${1060 - i * 26} ${580 - i * 6}`} />
            ))}
          </g>
          {/* Cheminée */}
          <rect x="880" y="428" width="62" height="108" fill={p.murOmbre} />
          <rect x="870" y="416" width="82" height="20" rx="3" fill={p.ardoise} />

          {/* Fenêtres à petits bois */}
          {[
            [506, 668],
            [676, 668],
            [846, 668],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="88" height="118" fill={p.vitre} />
              <rect x={x} y={y} width="88" height="118" fill={p.vitreLumiere} opacity={i === 1 ? 0.6 : 0.18} />
              <g stroke={p.murClair} strokeWidth="6">
                <path d={`M${x + 44} ${y}v118M${x} ${y + 59}h88`} />
              </g>
              <rect x={x} y={y} width="88" height="118" fill="none" stroke={p.murClair} strokeWidth="8" />
              {/* Volets */}
              <rect x={x - 26} y={y} width="24" height="118" fill={p.volet} />
              <rect x={x + 90} y={y} width="24" height="118" fill={p.volet} />
            </g>
          ))}

          {/* Porte */}
          <g>
            <rect x="686" y="812" width="108" height="130" fill={p.volet} />
            <rect x="686" y="812" width="108" height="130" fill="none" stroke={p.murOmbre} strokeWidth="6" />
            <circle cx="770" cy="880" r="5" fill={p.or} />
            <path d="M676 812h128l-64 -30Z" fill={p.ardoise} />
          </g>
        </g>

        {/* Aile droite basse */}
        <g>
          <rect x="1048" y="766" width="200" height="176" fill={p.murOmbre} />
          <path d="M1032 766h232l-116 -76Z" fill="url(#sc-mai-toit)" />
          <rect x="1108" y="820" width="70" height="62" fill={p.vitre} />
          <rect x="1108" y="820" width="70" height="62" fill="none" stroke={p.murClair} strokeWidth="6" />
        </g>
      </Plan>

      {/* Hortensias et sol */}
      <Plan n={4}>
        <rect y="938" width="1600" height="262" fill={p.herbe} opacity="0.55" />
        <rect y="938" width="1600" height="6" fill={p.sableOmbre} opacity="0.6" />
        <path d="M600 1200q60 -140 280 -140t280 140Z" fill={p.sable} opacity="0.5" />
        {[
          [250, 952, 46],
          [318, 962, 34],
          [1288, 950, 50],
          [1358, 964, 36],
          [1420, 954, 42],
        ].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill={i % 2 ? "#8fa4b8" : "#a8b0c4"} opacity="0.85" />
            <circle cx={x - r * 0.4} cy={y + r * 0.3} r={r * 0.6} fill={p.feuillageClair} opacity="0.7" />
          </g>
        ))}
      </Plan>

      {/* Ombre portée au premier plan */}
      <Plan n={5} opacity={0.16}>
        <path d="M0 1200v-120q300 -60 700 -30t900 -46v196Z" fill={p.terreNuit} />
      </Plan>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. L'estran — la marée basse                                               */
/* -------------------------------------------------------------------------- */

export function SceneEstran(): ReactElement {
  return (
    <>
      <defs>
        <linearGradient id="sc-est2-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b9c9c9" />
          <stop offset="55%" stopColor="#e6ded0" />
          <stop offset="100%" stopColor="#f5eeE0" />
        </linearGradient>
        <linearGradient id="sc-est2-sable" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#d9cbb0" />
          <stop offset="100%" stopColor="#c0ae8e" />
        </linearGradient>
      </defs>

      <rect width="1600" height="1200" fill="url(#sc-est2-ciel)" />
      <circle cx="800" cy="470" r="96" fill={p.soleil} opacity="0.55" />

      <Plan n={1} opacity={0.34}>
        <path d="M0 330q260 -50 500 -10t520 -22 580 12v52q-300 34 -600 8t-500 20 -500 -14Z" fill="#ffffff" />
        <path d="M300 470q200 -26 400 -4t480 -16v34q-260 24 -500 4t-380 10Z" fill="#ffffff" opacity="0.7" />
      </Plan>

      <Oiseaux x={1120} y={392} echelle={1.3} />
      <Oiseaux x={380} y={470} echelle={0.9} />

      {/* Îles */}
      <Plan n={2}>
        <path d="M0 618q120 -22 240 -6t200 10h-440Z" fill={p.terreLoin} opacity="0.7" />
        <path d="M1120 620q140 -30 280 -8t200 12h-480Z" fill={p.terreLoin} opacity="0.7" />
        <path d="M560 622q90 -18 170 -2t130 6H560Z" fill={p.terreLoin} opacity="0.55" />
      </Plan>

      {/* Mer au loin */}
      <Plan n={3}>
        <rect y="624" width="1600" height="130" fill={p.merLoin} opacity="0.8" />
        <Reflets y={632} h={110} couleur={p.ecume} nb={7} largeurMax={1400} cx={800} />
      </Plan>

      {/* Estran mouillé, réfléchissant */}
      <Plan n={4}>
        <rect y="750" width="1600" height="450" fill="url(#sc-est2-sable)" />
        {/* Flaques */}
        {[
          [180, 830, 300, 26],
          [700, 812, 420, 20],
          [1180, 856, 360, 30],
          [380, 930, 520, 34],
          [980, 980, 460, 38],
          [120, 1060, 640, 44],
          [800, 1108, 700, 48],
        ].map(([x, y, w, h], i) => (
          <ellipse
            key={i}
            cx={x + w / 2}
            cy={y}
            rx={w / 2}
            ry={h / 2}
            fill={p.cielHaut}
            opacity={0.55 - i * 0.03}
          />
        ))}
        {/* Rides de sable */}
        <g stroke={p.sableOmbre} strokeWidth="2.5" fill="none" opacity="0.45">
          {Array.from({ length: 11 }).map((_, i) => (
            <path
              key={i}
              d={`M-40 ${790 + i * 38}q400 ${i % 2 ? -22 : 22} 820 0t860 ${i % 2 ? 18 : -18}`}
            />
          ))}
        </g>
      </Plan>

      {/* Silhouettes : deux promeneurs et leur reflet */}
      <Plan n={5}>
        <g fill={p.terreNuit}>
          <g transform="translate(640 880)">
            <circle cx="0" cy="0" r="9" />
            <path d="M-9 12q9 -6 18 0l6 52-10 2-6-30-6 30-10-2Z" />
            <ellipse cx="0" cy="72" rx="12" ry="4" opacity="0.28" />
          </g>
          <g transform="translate(690 892) scale(0.86)">
            <circle cx="0" cy="0" r="9" />
            <path d="M-9 12q9 -6 18 0l6 52-10 2-6-30-6 30-10-2Z" />
            <ellipse cx="0" cy="72" rx="12" ry="4" opacity="0.28" />
          </g>
        </g>
        {/* Rochers */}
        <path d="M1240 1046q70 -46 150 -14t120 52 -60 32 -172 -14 -38 -56Z" fill={p.roche} />
        <path d="M90 1128q60 -40 130 -12t104 46 -52 28 -150 -12 -32 -50Z" fill={p.roche} opacity="0.85" />
      </Plan>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. La pinède et le sentier                                                 */
/* -------------------------------------------------------------------------- */

export function ScenePinede(): ReactElement {
  const pins = [
    [120, 980, 300, 1],
    [300, 1000, 250, 0.9],
    [1300, 986, 290, 1],
    [1470, 1010, 230, 0.85],
    [470, 940, 200, 0.7],
    [1120, 950, 210, 0.72],
  ];
  return (
    <>
      <defs>
        <linearGradient id="sc-pin-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfdcda" />
          <stop offset="62%" stopColor="#ecE3d1" />
          <stop offset="100%" stopColor="#f6efe0" />
        </linearGradient>
      </defs>

      <rect width="1600" height="1200" fill="url(#sc-pin-ciel)" />
      <circle cx="800" cy="560" r="130" fill={p.soleil} opacity="0.5" />

      {/* Mer au fond, aperçue entre les troncs */}
      <Plan n={2}>
        <rect y="700" width="1600" height="120" fill={p.merLoin} opacity="0.55" />
        <rect y="700" width="1600" height="2" fill={p.ecume} opacity="0.5" />
      </Plan>

      {/* Dune */}
      <Plan n={3}>
        <path d="M0 816q280 -46 560 -8t480 -22 560 14v400H0Z" fill={p.sable} />
        <path
          d="M0 816q280 -46 560 -8t480 -22 560 14"
          fill="none"
          stroke={p.sableOmbre}
          strokeWidth="3"
          opacity="0.6"
        />
        <path d="M0 960q300 -34 600 4t520 -18 480 22v232H0Z" fill={p.sableOmbre} opacity="0.55" />
      </Plan>

      {/* Sentier */}
      <Plan n={4}>
        <path d="M700 1200q40 -220 100 -320t60 -60q-30 66 -40 170t-40 210Z" fill={p.murOmbre} opacity="0.7" />
        <g stroke={p.herbe} strokeWidth="3" opacity="0.55" fill="none">
          {Array.from({ length: 30 }).map((_, i) => {
            const x = 60 + i * 52;
            return <path key={i} d={`M${x} 1050q-8 -34 2 -56M${x + 10} 1050q6 -30 -2 -50`} />;
          })}
        </g>
      </Plan>

      {/* Pins maritimes */}
      <Plan n={5}>
        {pins.map(([x, y, h, s], i) => (
          <g key={i} opacity={0.9}>
            <path
              d={`M${x} ${y}q${-6 * (s as number)} ${-(h as number) * 0.6} ${10 * (s as number)} ${-(h as number)}`}
              fill="none"
              stroke={p.bois}
              strokeWidth={12 * (s as number)}
              strokeLinecap="round"
            />
            {[0, 1, 2].map((k) => (
              <ellipse
                key={k}
                cx={(x as number) + 10 * (s as number) + (k - 1) * 40 * (s as number)}
                cy={(y as number) - (h as number) + 10 + k * 26 * (s as number)}
                rx={92 * (s as number) - k * 12}
                ry={34 * (s as number)}
                fill={k === 1 ? p.feuillage : p.feuillageClair}
                opacity={0.9}
              />
            ))}
          </g>
        ))}
      </Plan>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. Le granit — mur de pierre sèche                                         */
/* -------------------------------------------------------------------------- */

export function SceneGranit(): ReactElement {
  /* Appareillage irrégulier : hauteurs d'assise et largeurs variables,
     comme un mur de pierre sèche du Pays bigouden. */
  const teintes = [
    "#9a9184",
    "#857c6e",
    "#a9a092",
    "#6f685d",
    "#b3a998",
    "#7c7367",
    "#928878",
    "#645d54",
  ];
  const blocs: ReactElement[] = [];
  let graine = 7;
  const alea = () => {
    graine = (graine * 1103515245 + 12345) % 2147483648;
    return graine / 2147483648;
  };

  let y = 646;
  let assise = 0;
  while (y < 1210) {
    const h = 56 + Math.round(alea() * 62);
    let x = -40 - Math.round(alea() * 70);
    while (x < 1620) {
      const w = 90 + Math.round(alea() * 200);
      const t = teintes[Math.floor(alea() * teintes.length)];
      const dy = Math.round((alea() - 0.5) * 7);
      blocs.push(
        <g key={`${assise}-${x}`}>
          <path
            d={`M${x} ${y + dy}h${w - 10}q9 0 9 9v${h - 22}q0 9 -9 9h${-(w - 10)}q-9 0 -9 -9v${-(h - 22)}q0 -9 9 -9Z`}
            fill={t}
          />
          <path
            d={`M${x + 6} ${y + dy + 5}h${w - 22}`}
            stroke="#ffffff"
            strokeWidth="3"
            opacity="0.14"
            strokeLinecap="round"
          />
          <path
            d={`M${x + 8} ${y + dy + h - 14}h${w - 26}`}
            stroke="#000000"
            strokeWidth="4"
            opacity="0.13"
            strokeLinecap="round"
          />
        </g>,
      );
      x += w + 6;
    }
    y += h + 6;
    assise += 1;
  }

  return (
    <>
      <defs>
        <linearGradient id="sc-gra-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8cbcb" />
          <stop offset="100%" stopColor="#e9dcc4" />
        </linearGradient>
      </defs>

      <rect width="1600" height="1200" fill="url(#sc-gra-ciel)" />
      <circle cx="1180" cy="278" r="132" fill={p.soleil} opacity="0.65" />
      <Oiseaux x={300} y={300} echelle={1.2} />

      {/* Lande derrière le mur */}
      <Plan n={2}>
        <path
          d="M0 604q200 -44 400 -10t420 -24 380 16 400 -26v120H0Z"
          fill={p.terreLoin}
          opacity="0.75"
        />
        <path
          d="M0 640q220 -30 440 -4t440 -18 720 12v80H0Z"
          fill={p.feuillage}
          opacity="0.5"
        />
      </Plan>

      {/* Le mur */}
      <Plan n={3}>
        <rect y="640" width="1600" height="560" fill="#5f584e" />
        <g>{blocs}</g>
        {/* Lichen et mousse */}
        <g opacity="0.4">
          {[
            [150, 730, 30, p.herbe],
            [430, 824, 22, "#9aa86a"],
            [880, 902, 34, p.herbe],
            [1255, 998, 26, "#9aa86a"],
            [620, 1092, 30, p.herbe],
            [1425, 762, 20, "#9aa86a"],
            [300, 960, 24, p.herbe],
            [1080, 700, 18, "#9aa86a"],
          ].map(([x, yy, r, c], i) => (
            <circle key={i} cx={x as number} cy={yy as number} r={r as number} fill={c as string} />
          ))}
        </g>
      </Plan>

      {/* Herbes hautes au pied du mur */}
      <Plan n={5}>
        <g stroke={p.herbe} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85">
          {Array.from({ length: 44 }).map((_, i) => {
            const x = 10 + i * 37;
            const h = 46 + (i % 6) * 28;
            return (
              <path
                key={i}
                d={`M${x} 1205q${i % 2 ? 12 : -12} ${-h * 0.6} ${i % 2 ? 5 : -5} ${-h}`}
              />
            );
          })}
        </g>
      </Plan>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  7. Le seuil — porche, lumière intérieure                                   */
/* -------------------------------------------------------------------------- */

export function SceneSeuil(): ReactElement {
  return (
    <>
      <defs>
        <linearGradient id="sc-seu-mur" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={p.cielCrepuscule} />
          <stop offset="100%" stopColor={p.terreNuit} />
        </linearGradient>
        <linearGradient id="sc-seu-lum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.soleil} />
          <stop offset="60%" stopColor={p.soleilVif} />
          <stop offset="100%" stopColor="#d8b072" />
        </linearGradient>
        <radialGradient id="sc-seu-halo" cx="0.5" cy="0.55" r="0.6">
          <stop offset="0%" stopColor={p.soleil} stopOpacity="0.55" />
          <stop offset="100%" stopColor={p.soleil} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="1200" fill="url(#sc-seu-mur)" />

      {/* Appareillage de pierre */}
      <Plan n={1} opacity={0.16}>
        {Array.from({ length: 13 }).map((_, r) =>
          Array.from({ length: 9 }).map((_, i) => (
            <rect
              key={`${r}-${i}`}
              x={-60 + i * 190 + (r % 2 ? 90 : 0)}
              y={r * 94}
              width="176"
              height="82"
              rx="6"
              fill="#ffffff"
              opacity={0.25 + ((r + i) % 3) * 0.12}
            />
          )),
        )}
      </Plan>

      <circle cx="800" cy="700" r="420" fill="url(#sc-seu-halo)" />

      {/* Encadrement */}
      <Plan n={3}>
        <path
          d="M480 1200V592q0-176 160-176h320q160 0 160 176v608Z"
          fill="#2a463f"
        />
        <path
          d="M520 1200V600q0-140 130-140h300q130 0 130 140v600Z"
          fill="url(#sc-seu-lum)"
        />
      </Plan>

      {/* Porte entrouverte */}
      <Plan n={4}>
        <path d="M520 1200V600q0-140 130-140h130v740Z" fill={p.volet} />
        <path d="M780 460v740h30V470Z" fill={p.bois} opacity="0.55" />
        <g stroke="#1f3a33" strokeWidth="5" opacity="0.55" fill="none">
          <rect x="556" y="560" width="80" height="150" rx="4" />
          <rect x="664" y="560" width="80" height="150" rx="4" />
          <rect x="556" y="760" width="80" height="180" rx="4" />
          <rect x="664" y="760" width="80" height="180" rx="4" />
        </g>
        <circle cx="762" cy="860" r="10" fill={p.or} />
      </Plan>

      {/* Rai de lumière sur le sol */}
      <Plan n={5}>
        <path d="M810 460 1600 1200H860Z" fill={p.soleil} opacity="0.2" />
        <rect y="1150" width="1600" height="50" fill={p.terreNuit} />
        <path d="M480 1150h640l120 50H480Z" fill={p.soleilVif} opacity="0.28" />
      </Plan>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  8. Le bourg — toits et clocher                                             */
/* -------------------------------------------------------------------------- */

export function SceneBourg(): ReactElement {
  const maisons = [
    [60, 830, 190, 200],
    [250, 790, 150, 240],
    [400, 856, 170, 174],
    [570, 806, 160, 224],
    [860, 820, 180, 210],
    [1040, 780, 150, 250],
    [1190, 846, 180, 184],
    [1370, 800, 170, 230],
  ];
  return (
    <>
      <defs>
        <linearGradient id="sc-bou-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c3d2d4" />
          <stop offset="50%" stopColor="#e7ddcd" />
          <stop offset="100%" stopColor="#f6eede" />
        </linearGradient>
      </defs>

      <rect width="1600" height="1200" fill="url(#sc-bou-ciel)" />
      <circle cx="420" cy="330" r="126" fill={p.soleil} opacity="0.45" />
      <Plan n={1} opacity={0.3}>
        <path d="M0 380q280 -46 540 -8t540 -20 520 12v50q-300 32 -600 8t-520 18 -480 -12Z" fill="#ffffff" />
      </Plan>
      <Oiseaux x={1120} y={330} echelle={1.25} />

      {/* Collines */}
      <Plan n={2}>
        <path d="M0 790q240 -74 480 -30t460 -44 660 34v90H0Z" fill={p.terreLoin} opacity="0.68" />
      </Plan>

      {/* Clocher */}
      <Plan n={3}>
        <g>
          <rect x="736" y="520" width="128" height="510" fill={p.murClair} />
          <rect x="736" y="520" width="44" height="510" fill={p.murOmbre} />
          <path d="M716 520h168l-84 -150Z" fill={p.ardoise} />
          <path d="M792 370v-46" stroke={p.ardoise} strokeWidth="7" />
          <path d="M776 340h34M792 324v40" stroke={p.or} strokeWidth="6" strokeLinecap="round" />
          <path d="M766 596h68v96a34 34 0 0 0 -68 0Z" fill={p.vitre} opacity="0.8" />
          <circle cx="800" cy="790" r="34" fill={p.murOmbre} />
          <circle cx="800" cy="790" r="27" fill={p.soleil} opacity="0.75" />
          <path d="M800 790v-16M800 790l12 8" stroke={p.ardoise} strokeWidth="4" strokeLinecap="round" />
        </g>
      </Plan>

      {/* Maisons */}
      <Plan n={4}>
        {maisons.map(([x, y, w, h], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill={i % 2 ? p.murClair : p.murOmbre} />
            <path d={`M${x - 14} ${y}h${w + 28}l-${w / 2 + 14} -${58 + (i % 3) * 14}Z`} fill={p.ardoise} />
            <rect x={x + w * 0.55} y={y - 62} width="26" height="52" fill={p.murOmbre} />
            {[0, 1].map((k) => (
              <g key={k}>
                <rect x={x + 26 + k * 74} y={y + 46} width="46" height="62" fill={p.vitre} />
                <rect
                  x={x + 26 + k * 74}
                  y={y + 46}
                  width="46"
                  height="62"
                  fill={p.vitreLumiere}
                  opacity={(i + k) % 3 === 0 ? 0.7 : 0.12}
                />
              </g>
            ))}
          </g>
        ))}
      </Plan>

      {/* Rue au premier plan */}
      <Plan n={5}>
        <rect y="1030" width="1600" height="170" fill={p.rocheClaire} opacity="0.55" />
        <rect y="1030" width="1600" height="8" fill={p.sableOmbre} opacity="0.7" />
        <g stroke={p.roche} strokeWidth="2" opacity="0.22" fill="none">
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} d={`M0 ${1060 + i * 18}h1600`} />
          ))}
        </g>
        <path d="M0 1200v-52q360 -34 800 -6t800 -26v84Z" fill={p.terreNuit} opacity="0.14" />
      </Plan>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  9. Portrait — emplacement réservé                                          */
/* -------------------------------------------------------------------------- */

export function ScenePortrait(): ReactElement {
  return (
    <>
      <defs>
        <linearGradient id="sc-por-fond" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#45635a" />
          <stop offset="55%" stopColor="#33504a" />
          <stop offset="100%" stopColor="#1e3832" />
        </linearGradient>
        <radialGradient id="sc-por-halo" cx="0.5" cy="0.4" r="0.58">
          <stop offset="0%" stopColor={p.soleil} stopOpacity="0.42" />
          <stop offset="100%" stopColor={p.soleil} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="1200" fill="url(#sc-por-fond)" />
      <circle cx="800" cy="520" r="440" fill="url(#sc-por-halo)" />

      <Plan n={2} opacity={0.8}>
        <rect x="150" y="120" width="1300" height="960" fill="none" stroke={p.or} strokeWidth="3" />
        <g fill="none" stroke={p.soleil} strokeWidth="4" strokeLinecap="round">
          <path d="M150 280V120h160" />
          <path d="M1290 120h160v160" />
          <path d="M1450 920v160h-160" />
          <path d="M310 1080H150V920" />
        </g>
      </Plan>

      <Plan n={4}>
        <circle cx="800" cy="520" r="176" fill={p.sable} opacity="0.95" />
        <path
          d="M488 1080q0-208 156-296t312 0 156 296Z"
          fill={p.sable}
          opacity="0.95"
        />
        <path
          d="M488 1080q0-208 156-296t312 0 156 296Z"
          fill={p.murClair}
          opacity="0.3"
        />
      </Plan>
    </>
  );
}

export const scenes = {
  phare: ScenePhare,
  estuaire: SceneEstuaire,
  maison: SceneMaison,
  estran: SceneEstran,
  pinede: ScenePinede,
  granit: SceneGranit,
  seuil: SceneSeuil,
  bourg: SceneBourg,
  portrait: ScenePortrait,
} as const;

export type NomScene = keyof typeof scenes;
