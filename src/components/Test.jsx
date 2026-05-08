import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   MOCK DATA  (remplace plus tard par API calls)
───────────────────────────────────────────────*/
const WILAYAS = [
  { id: 2, name: "Oran", region: "Ouest", count: 18, emoji: "🌊", active: true },
  { id: 1, name: "Alger", region: "Centre", count: 24, emoji: "🏙️", active: false },
  { id: 3, name: "Constantine", region: "Est", count: 15, emoji: "🌉", active: false },
  { id: 5, name: "Blida", region: "Centre", count: 11, emoji: "🌹", active: false },
  { id: 6, name: "Tlemcen", region: "Ouest", count: 13, emoji: "🕌", active: false },
  { id: 4, name: "Annaba", region: "Est", count: 9, emoji: "🌿", active: false },
  { id: 7, name: "Sétif", region: "Est", count: 10, emoji: "⛰️", active: false },
  { id: 8, name: "Béjaïa", region: "Centre", count: 7, emoji: "🏔️", active: false },
];

const PATISSIERS = {
  1: [
    {
      id: 101,
      name: "Maison Benali",
      avatar: "MB",
      color: "#C8844F",
      rating: 4.9,
      reviews: 312,
      speciality: "Gâteaux de mariage & Baklava",
      address: "12 Rue Didouche Mourad, Alger-Centre",
      phone: "+213 21 63 45 78",
      hours: "08h00 – 21h00",
      since: "1987",
      description:
        "Fondée en 1987, Maison Benali est une institution d'Alger réputée pour ses gâteaux orientaux et ses créations sur mesure. Chaque pièce est fabriquée avec des ingrédients sélectionnés et un savoir-faire transmis de génération en génération.",
      products: [
        { name: "Baklava Royal", price: "850 DA", icon: "🍯" },
        { name: "Makroud au miel", price: "600 DA", icon: "🟤" },
        { name: "Gâteau de mariage", price: "Sur devis", icon: "💍" },
        { name: "Cornes de gazelle", price: "700 DA", icon: "🌙" },
        { name: "Zlabia", price: "400 DA", icon: "🍩" },
      ],
      tags: ["Mariage", "Halal", "Sur commande"],
    },
    {
      id: 102,
      name: "Douceurs d'Orient",
      avatar: "DO",
      color: "#7C6FAD",
      rating: 4.7,
      reviews: 198,
      speciality: "Pâtisserie moderne & Traditionnelle",
      address: "34 Bd Colonel Amirouche, Hussein Dey",
      phone: "+213 21 77 12 34",
      hours: "09h00 – 20h30",
      since: "2003",
      description:
        "Un mélange parfait entre tradition algérienne et modernité pâtissière. Douceurs d'Orient propose une carte raffinée qui ravit aussi bien les amateurs de gâteaux classiques que ceux qui cherchent l'innovation.",
      products: [
        { name: "Entremet au citron", price: "950 DA", icon: "🍋" },
        { name: "Tamina premium", price: "550 DA", icon: "✨" },
        { name: "Box cadeau 12 pcs", price: "1500 DA", icon: "🎁" },
        { name: "Chamia", price: "480 DA", icon: "🍫" },
      ],
      tags: ["Moderne", "Halal", "Livraison"],
    },
    {
      id: 103,
      name: "Atelier Sucrée",
      avatar: "AS",
      color: "#D4776A",
      rating: 4.8,
      reviews: 276,
      speciality: "Gâteaux personnalisés & Wedding Cake",
      address: "8 Rue Ben Mehidi Larbi, Bab El Oued",
      phone: "+213 550 33 44 55",
      hours: "10h00 – 22h00",
      since: "2015",
      description:
        "Atelier Sucrée s'est imposé comme la référence des créations pâtissières personnalisées à Alger. Chaque commande est une œuvre d'art comestible, dessinée et réalisée selon vos désirs.",
      products: [
        { name: "Wedding Cake 3 étages", price: "Sur devis", icon: "🎂" },
        { name: "Cupcakes (boîte 6)", price: "900 DA", icon: "🧁" },
        { name: "Macarons (boîte 12)", price: "1200 DA", icon: "🫧" },
        { name: "Layer Cake personnalisé", price: "2200 DA", icon: "🎨" },
      ],
      tags: ["Personnalisé", "Wedding", "Premium"],
    },
  ],
  2: [
    {
      id: 201,
      name: "Pâtisserie El Waha",
      avatar: "EW",
      color: "#4A9B8E",
      rating: 4.8,
      reviews: 241,
      speciality: "Gâteaux oranais & Créations fusion",
      address: "15 Rue Larbi Ben M'hidi, Oran",
      phone: "+213 41 38 90 12",
      hours: "08h30 – 21h30",
      since: "1995",
      description:
        "El Waha incarne le mélange culturel unique d'Oran. Ancrée dans la tradition oranaise tout en s'ouvrant aux influences méditerranéennes, la maison propose une pâtisserie vivante et savoureuse.",
      products: [
        { name: "Griouech au miel", price: "650 DA", icon: "🍯" },
        { name: "Kalb el louz", price: "750 DA", icon: "🟡" },
        { name: "Dziriettes", price: "900 DA", icon: "💛" },
        { name: "Sablés aux amandes", price: "700 DA", icon: "🌰" },
      ],
      tags: ["Traditionnel", "Halal", "Ramadan"],
    },
    {
      id: 202,
      name: "Sweet Corner Oran",
      avatar: "SC",
      color: "#E07B54",
      rating: 4.6,
      reviews: 154,
      speciality: "Pâtisserie française & Orientale",
      address: "7 Av. Khemisti, Plateau, Oran",
      phone: "+213 558 22 33 44",
      hours: "09h00 – 21h00",
      since: "2012",
      description:
        "Sweet Corner Oran fusionne avec talent la pâtisserie française classique et les saveurs orientales. Un espace cosy où chaque bouchée raconte une histoire.",
      products: [
        { name: "Mille-feuille oriental", price: "850 DA", icon: "📚" },
        { name: "Tarte aux pistaches", price: "950 DA", icon: "🟢" },
        { name: "Éclair au café", price: "600 DA", icon: "☕" },
        { name: "Fondant à la datte", price: "750 DA", icon: "🌴" },
      ],
      tags: ["Fusion", "Moderne", "Sur commande"],
    },
  ],
  3: [
    {
      id: 301,
      name: "Aux Délices Constantinois",
      avatar: "AD",
      color: "#8A6FB5",
      rating: 4.9,
      reviews: 189,
      speciality: "Trésors sucrés de Constantine",
      address: "5 Rue Larbi Ben M'hidi, Constantine",
      phone: "+213 31 92 14 27",
      hours: "08h00 – 20h00",
      since: "1978",
      description:
        "Depuis 1978, Aux Délices Constantinois perpétue les recettes ancestrales de la ville des ponts. Une adresse incontournable pour qui veut goûter l'âme sucrée de Constantine.",
      products: [
        { name: "Mchewek", price: "800 DA", icon: "🌿" },
        { name: "Samsa constantinoise", price: "700 DA", icon: "🔺" },
        { name: "Gâteaux aux arachides", price: "550 DA", icon: "🥜" },
        { name: "Kaâk Warka", price: "650 DA", icon: "🫓" },
      ],
      tags: ["Traditionnel", "Patrimoine", "Halal"],
    },
  ],
};

for (let i = 4; i <= 12; i++) {
  if (!PATISSIERS[i]) {
    PATISSIERS[i] = [
      {
        id: i * 100 + 1,
        name: `Pâtisserie Al Nour`,
        avatar: "AN",
        color: "#5B9BD5",
        rating: 4.5,
        reviews: Math.floor(Math.random() * 150) + 50,
        speciality: "Gâteaux traditionnels & modernes",
        address: `Centre-ville, ${WILAYAS.find((w) => w.id === i)?.name}`,
        phone: `+213 ${Math.floor(Math.random() * 90 + 10)} XX XX XX`,
        hours: "09h00 – 21h00",
        since: "2005",
        description:
          "Une pâtisserie locale réputée pour la qualité de ses produits et l'accueil chaleureux de son équipe.",
        products: [
          { name: "Baklava", price: "800 DA", icon: "🍯" },
          { name: "Makroud", price: "600 DA", icon: "🟤" },
          { name: "Gâteau aux noix", price: "700 DA", icon: "🌰" },
        ],
        tags: ["Traditionnel", "Halal"],
      },
    ];
  }
}

/* ─────────────────────────────────────────────
   SERVICES (structure prête pour API)
───────────────────────────────────────────────*/
const PatisserieService = {
  getWilayas: () => Promise.resolve(WILAYAS),
  getPatissiersByWilaya: (wilayaId) =>
    Promise.resolve(PATISSIERS[wilayaId] || []),
  getPatissierById: (id) => {
    for (const list of Object.values(PATISSIERS)) {
      const found = list.find((p) => p.id === id);
      if (found) return Promise.resolve(found);
    }
    return Promise.reject(new Error("Not found"));
  },
};

/* ─────────────────────────────────────────────
   STYLES GLOBAUX
───────────────────────────────────────────────*/
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --brand: #C8844F;
    --brand-dark: #A0673C;
    --brand-light: #F5E6D8;
    --accent: #2D2420;
    --gold: #D4A853;
    --text-primary: #1A1210;
    --text-secondary: #6B5B52;
    --text-muted: #9E8E87;
    --bg: #FAF7F4;
    --bg-card: #FFFFFF;
    --bg-surface: #F2EDE8;
    --border: rgba(180,140,110,0.18);
    --border-hover: rgba(180,140,110,0.4);
    --shadow-sm: 0 2px 8px rgba(80,40,20,0.06);
    --shadow-md: 0 8px 24px rgba(80,40,20,0.10);
    --shadow-lg: 0 20px 60px rgba(80,40,20,0.14);
    --radius-sm: 10px;
    --radius-md: 16px;
    --radius-lg: 22px;
    --radius-xl: 32px;
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
    --nav-h: 68px;
    --transition: 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  }

  body { font-family: var(--font-body); background: var(--bg); color: var(--text-primary); min-height: 100vh; }

  .app-root { display: flex; flex-direction: column; min-height: 100vh; }

  /* ── PAGE TRANSITIONS ── */
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .page-enter { animation: fadeSlideUp 0.42s var(--transition) both; }
  .slide-enter { animation: fadeSlideIn 0.38s ease both; }
  .scale-enter { animation: scaleIn 0.28s ease both; }
  
  /* stagger children */
  .stagger > * { opacity: 0; animation: fadeSlideUp 0.4s ease both; }
  .stagger > *:nth-child(1)  { animation-delay: 0.05s; }
  .stagger > *:nth-child(2)  { animation-delay: 0.10s; }
  .stagger > *:nth-child(3)  { animation-delay: 0.15s; }
  .stagger > *:nth-child(4)  { animation-delay: 0.20s; }
  .stagger > *:nth-child(5)  { animation-delay: 0.25s; }
  .stagger > *:nth-child(6)  { animation-delay: 0.30s; }
  .stagger > *:nth-child(7)  { animation-delay: 0.35s; }
  .stagger > *:nth-child(8)  { animation-delay: 0.40s; }
  .stagger > *:nth-child(9)  { animation-delay: 0.45s; }
  .stagger > *:nth-child(10) { animation-delay: 0.50s; }
  .stagger > *:nth-child(11) { animation-delay: 0.55s; }
  .stagger > *:nth-child(12) { animation-delay: 0.60s; }

  /* ── NAVBAR ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: var(--nav-h);
    background: rgba(250,247,244,0.88);
    backdrop-filter: blur(18px) saturate(1.4);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; padding: 0 24px;
    gap: 12px;
  }
  .navbar-logo {
    font-family: var(--font-display); font-size: 1.45rem; font-weight: 700;
    color: var(--brand); letter-spacing: -0.01em; cursor: pointer;
    transition: opacity var(--transition);
  }
  .navbar-logo:hover { opacity: 0.75; }
  .navbar-logo span { color: var(--accent); }
  .navbar-breadcrumb {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.82rem; color: var(--text-muted); flex: 1;
    overflow: hidden; white-space: nowrap;
  }
  .navbar-breadcrumb .crumb {
    transition: color var(--transition); cursor: pointer;
  }
  .navbar-breadcrumb .crumb:hover { color: var(--brand); }
  .navbar-breadcrumb .sep { color: var(--border-hover); }
  .navbar-breadcrumb .crumb.active { color: var(--text-primary); font-weight: 500; }
  .nav-btn {
    background: var(--brand); color: white;
    border: none; border-radius: 50px;
    padding: 8px 18px; font-size: 0.83rem; font-weight: 500;
    cursor: pointer; transition: all var(--transition);
    font-family: var(--font-body); white-space: nowrap;
  }
  .nav-btn:hover { background: var(--brand-dark); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(200,132,79,0.35); }
  .nav-back {
    display: flex; align-items: center; gap: 5px;
    background: transparent; border: 1px solid var(--border);
    border-radius: 50px; padding: 7px 14px;
    font-size: 0.82rem; color: var(--text-secondary);
    cursor: pointer; font-family: var(--font-body);
    transition: all var(--transition);
  }
  .nav-back:hover { border-color: var(--brand); color: var(--brand); background: var(--brand-light); }

  /* ── HERO ── */
  .hero {
    padding: calc(var(--nav-h) + 56px) 24px 56px;
    max-width: 780px; margin: 0 auto; text-align: center;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--brand-light); color: var(--brand-dark);
    border-radius: 50px; padding: 6px 14px;
    font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.04em; text-transform: uppercase;
    margin-bottom: 20px; border: 1px solid rgba(200,132,79,0.2);
  }
  .hero h1 {
    font-family: var(--font-display); font-size: clamp(2.2rem, 5vw, 3.4rem);
    font-weight: 700; line-height: 1.18; letter-spacing: -0.02em;
    color: var(--text-primary); margin-bottom: 16px;
  }
  .hero h1 em { color: var(--brand); font-style: normal; }
  .hero p {
    font-size: 1.05rem; color: var(--text-secondary);
    line-height: 1.65; max-width: 520px; margin: 0 auto 32px;
  }
  .hero-stats {
    display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;
  }
  .hero-stat { text-align: center; }
  .hero-stat .num {
    font-family: var(--font-display); font-size: 1.7rem; font-weight: 700;
    color: var(--brand);
  }
  .hero-stat .lbl { font-size: 0.78rem; color: var(--text-muted); margin-top: 2px; }

  /* ── SEARCH ── */
  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: var(--bg-card); border: 1.5px solid var(--border);
    border-radius: 50px; padding: 8px 8px 8px 18px;
    max-width: 420px; margin: 0 auto 40px; box-shadow: var(--shadow-sm);
    transition: border-color var(--transition), box-shadow var(--transition);
  }
  .search-bar:focus-within {
    border-color: var(--brand); box-shadow: 0 0 0 4px rgba(200,132,79,0.12);
  }
  .search-bar input {
    flex: 1; border: none; outline: none; font-family: var(--font-body);
    font-size: 0.92rem; color: var(--text-primary); background: transparent;
  }
  .search-bar input::placeholder { color: var(--text-muted); }

  /* ── WILAYA GRID ── */
  .section-label {
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--text-muted); margin-bottom: 16px;
  }
  .wilaya-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px; padding: 0 24px; max-width: 960px; margin: 0 auto 80px;
  }
  .wilaya-card {
    background: var(--bg-card); border: 1.5px solid var(--border);
    border-radius: var(--radius-md); padding: 20px 16px;
    cursor: pointer; transition: all var(--transition);
    display: flex; flex-direction: column; gap: 10px;
    position: relative; overflow: hidden;
  }
  .wilaya-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--brand-light) 0%, transparent 60%);
    opacity: 0; transition: opacity var(--transition);
  }
  .wilaya-card:hover {
    border-color: var(--brand); box-shadow: var(--shadow-md);
    transform: translateY(-3px);
  }
  .wilaya-card:hover::before { opacity: 1; }
  .wilaya-card:active { transform: translateY(0) scale(0.98); }
  .wilaya-card.active-wilaya {
    border-color: var(--brand);
    box-shadow: 0 0 0 3px rgba(200,132,79,0.13), var(--shadow-sm);
  }
  .wilaya-card.active-wilaya::before { opacity: 1; }
  .wilaya-card.active-wilaya:hover {
    box-shadow: 0 0 0 3px rgba(200,132,79,0.22), var(--shadow-md);
    transform: translateY(-3px);
  }
  .wilaya-card.coming-soon {
    cursor: default; opacity: 0.52; filter: grayscale(0.4);
  }
  .wilaya-card.coming-soon:hover { transform: none !important; box-shadow: var(--shadow-sm) !important; border-color: var(--border) !important; }
  .cs-badge {
    position: absolute; top: 10px; right: 10px;
    font-size: 0.6rem; font-weight: 600; letter-spacing: 0.05em;
    text-transform: uppercase; background: var(--bg-surface);
    color: var(--text-muted); border: 1px solid var(--border);
    padding: 2px 7px; border-radius: 20px;
  }
  .active-badge {
    position: absolute; top: 10px; right: 10px;
    font-size: 0.6rem; font-weight: 600; letter-spacing: 0.04em;
    text-transform: uppercase; background: var(--brand-light);
    color: var(--brand-dark); border: 1px solid rgba(200,132,79,0.3);
    padding: 2px 7px; border-radius: 20px;
    display: flex; align-items: center; gap: 4px;
  }
  .active-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--brand); display: inline-block;
    animation: pulse 1.8s ease-in-out infinite;
  }
  .wilaya-emoji { font-size: 1.6rem; }
  .wilaya-name { font-weight: 600; font-size: 0.95rem; color: var(--text-primary); }
  .wilaya-meta { display: flex; justify-content: space-between; align-items: center; }
  .wilaya-region { font-size: 0.72rem; color: var(--text-muted); }
  .wilaya-count {
    font-size: 0.72rem; font-weight: 500;
    background: var(--brand-light); color: var(--brand-dark);
    padding: 2px 8px; border-radius: 20px;
  }
  .wilaya-count.muted {
    background: var(--bg-surface); color: var(--text-muted);
  }

  /* ── PAGE HEADER ── */
  .page-header {
    padding: calc(var(--nav-h) + 32px) 24px 24px;
    max-width: 960px; margin: 0 auto;
  }
  .page-header h2 {
    font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary);
  }
  .page-header p { font-size: 0.92rem; color: var(--text-secondary); margin-top: 6px; }

  /* ── PATISSIER CARDS ── */
  .patissier-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px; padding: 0 24px; max-width: 960px; margin: 0 auto 80px;
  }
  .patissier-card {
    background: var(--bg-card); border: 1.5px solid var(--border);
    border-radius: var(--radius-lg); overflow: hidden;
    cursor: pointer; transition: all var(--transition);
    box-shadow: var(--shadow-sm);
    display: flex; flex-direction: column;
  }
  .patissier-card:hover {
    box-shadow: var(--shadow-lg); transform: translateY(-4px);
    border-color: var(--brand);
  }
  .patissier-card-header {
    height: 110px; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .patissier-avatar-big {
    width: 64px; height: 64px; border-radius: 20px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 1.3rem; color: white;
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
    position: relative; z-index: 1;
  }
  .patissier-card-body { padding: 18px; flex: 1; display: flex; flex-direction: column; gap: 10px; }
  .patissier-card-name { font-weight: 600; font-size: 1.05rem; color: var(--text-primary); }
  .patissier-card-spec { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; }
  .patissier-card-rating {
    display: flex; align-items: center; gap: 5px;
    font-size: 0.82rem; font-weight: 500; color: var(--text-primary);
  }
  .star { color: #F5A623; }
  .patissier-card-reviews { color: var(--text-muted); font-weight: 400; }
  .patissier-tags {
    display: flex; gap: 5px; flex-wrap: wrap; margin-top: auto;
  }
  .tag {
    font-size: 0.7rem; font-weight: 500;
    background: var(--bg-surface); color: var(--text-secondary);
    padding: 3px 9px; border-radius: 20px;
    border: 1px solid var(--border);
  }
  .btn-voir-plus {
    margin: 0 18px 18px; background: var(--brand); color: white;
    border: none; border-radius: 50px; padding: 11px;
    font-size: 0.88rem; font-weight: 500; cursor: pointer;
    font-family: var(--font-body); transition: all var(--transition);
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .btn-voir-plus:hover { background: var(--brand-dark); box-shadow: 0 4px 14px rgba(200,132,79,0.4); }

  /* ── DETAIL PAGE ── */
  .detail-page {
    padding: calc(var(--nav-h) + 24px) 24px 80px;
    max-width: 800px; margin: 0 auto;
  }
  .detail-hero {
    background: var(--bg-card); border: 1.5px solid var(--border);
    border-radius: var(--radius-xl); padding: 32px;
    margin-bottom: 24px; box-shadow: var(--shadow-sm);
  }
  .detail-hero-top { display: flex; align-items: flex-start; gap: 20px; flex-wrap: wrap; }
  .detail-avatar {
    width: 80px; height: 80px; border-radius: 22px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 1.5rem; color: white;
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }
  .detail-info { flex: 1; min-width: 200px; }
  .detail-info h1 {
    font-family: var(--font-display); font-size: 1.75rem; font-weight: 700;
    letter-spacing: -0.02em; color: var(--text-primary); margin-bottom: 4px;
  }
  .detail-info .spec { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 10px; }
  .detail-rating {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.88rem; color: var(--text-primary);
  }
  .rating-pill {
    background: #FFF8E7; color: #C47D0E;
    border: 1px solid rgba(196,125,14,0.2);
    padding: 4px 10px; border-radius: 20px;
    font-weight: 600; font-size: 0.88rem;
    display: flex; align-items: center; gap: 4px;
  }
  .detail-meta {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px; margin-top: 24px; padding-top: 24px;
    border-top: 1px solid var(--border);
  }
  .meta-item { display: flex; flex-direction: column; gap: 3px; }
  .meta-label {
    font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em;
    color: var(--text-muted); font-weight: 500;
  }
  .meta-value { font-size: 0.88rem; color: var(--text-primary); font-weight: 500; }
  .meta-icon { font-size: 1rem; margin-right: 5px; }

  .section-card {
    background: var(--bg-card); border: 1.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 24px;
    margin-bottom: 16px; box-shadow: var(--shadow-sm);
  }
  .section-card h3 {
    font-family: var(--font-display); font-size: 1.1rem; font-weight: 600;
    color: var(--text-primary); margin-bottom: 16px;
  }
  .section-card p { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; }

  .products-list { display: flex; flex-direction: column; gap: 10px; }
  .product-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; background: var(--bg-surface);
    border-radius: var(--radius-sm); border: 1px solid var(--border);
    transition: all var(--transition);
  }
  .product-item:hover { border-color: var(--brand); background: var(--brand-light); }
  .product-icon { font-size: 1.4rem; }
  .product-name { flex: 1; font-size: 0.9rem; font-weight: 500; color: var(--text-primary); }
  .product-price {
    font-weight: 600; color: var(--brand-dark); font-size: 0.88rem;
    background: white; padding: 3px 10px; border-radius: 20px;
    border: 1px solid var(--border);
  }

  .btn-create {
    width: 100%; padding: 16px; margin-top: 24px;
    background: linear-gradient(135deg, var(--brand) 0%, #E09060 100%);
    color: white; border: none; border-radius: 50px;
    font-size: 1rem; font-weight: 600; cursor: pointer;
    font-family: var(--font-body); letter-spacing: 0.01em;
    transition: all var(--transition); display: flex;
    align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 4px 18px rgba(200,132,79,0.35);
  }
  .btn-create:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(200,132,79,0.5);
  }
  .btn-create:active { transform: scale(0.99); }

  /* ── CAKE BUILDER ── */
  .cake-page {
    padding: calc(var(--nav-h) + 24px) 24px 80px;
    max-width: 680px; margin: 0 auto;
  }
  .cake-header {
    text-align: center; margin-bottom: 32px;
  }
  .cake-header h2 {
    font-family: var(--font-display); font-size: 2rem; font-weight: 700;
    letter-spacing: -0.02em; margin-bottom: 8px;
  }
  .cake-header p { color: var(--text-secondary); font-size: 0.92rem; }

  .form-card {
    background: var(--bg-card); border: 1.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 24px;
    margin-bottom: 16px; box-shadow: var(--shadow-sm);
  }
  .form-card h3 {
    font-family: var(--font-display); font-size: 1rem; font-weight: 600;
    color: var(--text-primary); margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px;
  }
  .form-group { margin-bottom: 16px; }
  .form-group:last-child { margin-bottom: 0; }
  .form-label {
    display: block; font-size: 0.82rem; font-weight: 500;
    color: var(--text-secondary); margin-bottom: 7px;
  }
  .form-input, .form-select, .form-textarea {
    width: 100%; padding: 11px 14px;
    border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    font-family: var(--font-body); font-size: 0.9rem; color: var(--text-primary);
    background: var(--bg); outline: none;
    transition: border-color var(--transition), box-shadow var(--transition);
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: var(--brand);
    box-shadow: 0 0 0 4px rgba(200,132,79,0.1);
  }
  .form-textarea { resize: vertical; min-height: 90px; }

  .option-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 8px; }
  .option-btn {
    padding: 10px 8px; border-radius: var(--radius-sm);
    border: 1.5px solid var(--border); background: var(--bg);
    cursor: pointer; transition: all var(--transition);
    text-align: center; font-family: var(--font-body); font-size: 0.8rem;
    color: var(--text-secondary); display: flex; flex-direction: column;
    align-items: center; gap: 5px;
  }
  .option-btn.selected {
    border-color: var(--brand); background: var(--brand-light);
    color: var(--brand-dark); font-weight: 500;
  }
  .option-btn:hover { border-color: var(--brand); }
  .option-emoji { font-size: 1.3rem; }

  .summary-box {
    background: linear-gradient(135deg, var(--brand-light) 0%, #FFF5EC 100%);
    border: 1.5px solid rgba(200,132,79,0.25);
    border-radius: var(--radius-lg); padding: 20px 24px;
    margin-bottom: 16px;
  }
  .summary-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 6px 0; font-size: 0.88rem;
  }
  .summary-row .key { color: var(--text-secondary); }
  .summary-row .val { font-weight: 500; color: var(--text-primary); }
  .summary-row.total { border-top: 1px solid rgba(200,132,79,0.2); margin-top: 8px; padding-top: 12px; }
  .summary-row.total .key { font-weight: 600; font-size: 0.95rem; color: var(--text-primary); }
  .summary-row.total .val { font-weight: 700; font-size: 1.1rem; color: var(--brand); }

  .btn-submit {
    width: 100%; padding: 16px;
    background: var(--accent); color: white;
    border: none; border-radius: 50px;
    font-size: 1rem; font-weight: 600; cursor: pointer;
    font-family: var(--font-body); letter-spacing: 0.01em;
    transition: all var(--transition);
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .btn-submit:hover { background: #3D3028; transform: translateY(-2px); box-shadow: var(--shadow-md); }

  /* ── SUCCESS ── */
  .success-page {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; text-align: center;
    padding: calc(var(--nav-h) + 60px) 24px 80px; flex: 1;
  }
  .success-icon {
    width: 90px; height: 90px; border-radius: 50%;
    background: linear-gradient(135deg, var(--brand), #E09060);
    display: flex; align-items: center; justify-content: center;
    font-size: 2.5rem; margin-bottom: 24px;
    box-shadow: 0 8px 32px rgba(200,132,79,0.35);
    animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  .success-page h2 {
    font-family: var(--font-display); font-size: 2rem; font-weight: 700;
    letter-spacing: -0.02em; margin-bottom: 12px;
  }
  .success-page p { color: var(--text-secondary); font-size: 0.95rem; max-width: 380px; line-height: 1.6; }
  .btn-home {
    margin-top: 32px; background: var(--brand); color: white;
    border: none; border-radius: 50px; padding: 13px 30px;
    font-size: 0.95rem; font-weight: 500; cursor: pointer;
    font-family: var(--font-body); transition: all var(--transition);
  }
  .btn-home:hover { background: var(--brand-dark); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(200,132,79,0.4); }

  /* ── LOADING ── */
  .loading-skeleton {
    background: linear-gradient(90deg, var(--bg-surface) 25%, var(--border) 50%, var(--bg-surface) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite; border-radius: var(--radius-sm);
  }
  .spinner {
    width: 36px; height: 36px;
    border: 3px solid var(--border);
    border-top-color: var(--brand);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 60px auto;
  }

  /* ── FOOTER ── */
  .footer {
    background: var(--accent); color: rgba(255,255,255,0.7);
    padding: 32px 24px; text-align: center; margin-top: auto;
  }
  .footer-logo {
    font-family: var(--font-display); font-size: 1.3rem; font-weight: 700;
    color: var(--brand); margin-bottom: 8px;
  }
  .footer p { font-size: 0.8rem; }
  .footer-links {
    display: flex; justify-content: center; gap: 20px;
    margin-top: 12px; flex-wrap: wrap;
  }
  .footer-links a {
    font-size: 0.78rem; color: rgba(255,255,255,0.5);
    text-decoration: none; transition: color var(--transition);
  }
  .footer-links a:hover { color: var(--brand); }

  /* ── RESPONSIVE ── */
  @media (max-width: 600px) {
    .wilaya-grid { grid-template-columns: repeat(2, 1fr); }
    .patissier-grid { grid-template-columns: 1fr; }
    .detail-hero-top { flex-direction: column; }
    .navbar { padding: 0 14px; }
    .hero { padding: calc(var(--nav-h) + 32px) 16px 32px; }
  }
`;

/* ─────────────────────────────────────────────
   COMPOSANTS RÉUTILISABLES
───────────────────────────────────────────────*/

function Navbar({ step, wilaya, patissier, onHome, onBack, onWilaya }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={onHome}>
        Halwa<span>dz</span>
      </div>

      {step > 0 && (
        <div className="navbar-breadcrumb">
          <span className="crumb sep">›</span>
          <span
            className={`crumb ${step === 1 ? "active" : ""}`}
            onClick={step > 1 ? onWilaya : undefined}
          >
            Wilayas
          </span>
          {step >= 2 && (
            <>
              <span className="sep">›</span>
              <span
                className={`crumb ${step === 2 ? "active" : ""}`}
                onClick={step > 2 ? onBack : undefined}
              >
                {wilaya?.name}
              </span>
            </>
          )}
          {step >= 3 && (
            <>
              <span className="sep">›</span>
              <span className={`crumb ${step === 3 ? "active" : ""}`}>
                {patissier?.name}
              </span>
            </>
          )}
          {step === 4 && (
            <>
              <span className="sep">›</span>
              <span className="crumb active">Commande</span>
            </>
          )}
        </div>
      )}

      {step > 0 && (
        <button className="nav-back" onClick={onBack}>
          ← Retour
        </button>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">Halwadz 🍰</div>
      <p>La référence des pâtisseries algériennes en ligne</p>
      <div className="footer-links">
        <a href="#">À propos</a>
        <a href="#">Contact</a>
        <a href="#">CGU</a>
        <a href="#">Politique de confidentialité</a>
      </div>
    </footer>
  );
}

function StarRating({ value }) {
  return (
    <span>
      {"★★★★★".split("").map((s, i) => (
        <span key={i} className="star" style={{ opacity: i < Math.round(value) ? 1 : 0.25 }}>
          ★
        </span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────
   PAGES
───────────────────────────────────────────────*/

function HomePage({ onSelectWilaya }) {
  const [wilayas, setWilayas] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PatisserieService.getWilayas().then((data) => {
      setWilayas(data);
      setLoading(false);
    });
  }, []);

  const filtered = wilayas.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-enter">
      <div className="hero">
        <div className="hero-badge">🚀 Lancement à Oran — d'autres wilayas arrivent bientôt</div>
        <h1>
          Trouvez les meilleurs <em>pâtissiers</em> d'Algérie
        </h1>
        <p>
          Découvrez les artisans du sucre près de chez vous, consultez leurs
          spécialités et commandez votre gâteau sur mesure.
        </p>

        <div className="search-bar">
          <span style={{ color: "var(--text-muted)", fontSize: "1rem" }}>🔍</span>
          <input
            placeholder="Chercher une wilaya…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="num">48</div>
            <div className="lbl">Wilayas couvertes</div>
          </div>
          <div className="hero-stat">
            <div className="num">240+</div>
            <div className="lbl">Pâtissiers référencés</div>
          </div>
          <div className="hero-stat">
            <div className="num">12k+</div>
            <div className="lbl">Commandes passées</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 12px" }}>
        <div className="section-label">Wilayas — Oran disponible maintenant</div>
      </div>

      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="wilaya-grid stagger">
          {filtered.map((w) => (
            <div
              key={w.id}
              className={`wilaya-card ${w.active ? "active-wilaya" : "coming-soon"}`}
              onClick={() => w.active && onSelectWilaya(w)}
            >
              {w.active ? (
                <div className="active-badge">
                  <span className="active-dot" />
                  Disponible
                </div>
              ) : (
                <div className="cs-badge">Bientôt</div>
              )}
              <div className="wilaya-emoji">{w.emoji}</div>
              <div className="wilaya-name">{w.name}</div>
              <div className="wilaya-meta">
                <span className="wilaya-region">{w.region}</span>
                <span className={`wilaya-count ${w.active ? "" : "muted"}`}>
                  {w.active ? `${w.count} pâtissiers` : "—"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PatissiersPage({ wilaya, onSelect }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    PatisserieService.getPatissiersByWilaya(wilaya.id).then((data) => {
      setList(data);
      setLoading(false);
    });
  }, [wilaya.id]);

  return (
    <div className="slide-enter">
      <div className="page-header">
        <h2>
          {wilaya.emoji} Pâtisseries à {wilaya.name}
        </h2>
        <p>
          {list.length} établissement{list.length > 1 ? "s" : ""} référencé
          {list.length > 1 ? "s" : ""} dans cette wilaya
        </p>
      </div>

      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="patissier-grid stagger">
          {list.map((p) => (
            <div key={p.id} className="patissier-card">
              <div
                className="patissier-card-header"
                style={{ background: `${p.color}18` }}
              >
                <div
                  className="patissier-avatar-big"
                  style={{ background: p.color }}
                >
                  {p.avatar}
                </div>
              </div>
              <div className="patissier-card-body">
                <div className="patissier-card-name">{p.name}</div>
                <div className="patissier-card-spec">{p.speciality}</div>
                <div className="patissier-card-rating">
                  <StarRating value={p.rating} />
                  <span>{p.rating}</span>
                  <span className="patissier-card-reviews">
                    ({p.reviews} avis)
                  </span>
                </div>
                <div className="patissier-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button className="btn-voir-plus" onClick={() => onSelect(p)}>
                Voir plus →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DetailPage({ patissier, onCreateCake }) {
  return (
    <div className="detail-page scale-enter">
      <div className="detail-hero">
        <div className="detail-hero-top">
          <div
            className="detail-avatar"
            style={{ background: patissier.color }}
          >
            {patissier.avatar}
          </div>
          <div className="detail-info">
            <h1>{patissier.name}</h1>
            <div className="spec">{patissier.speciality}</div>
            <div className="detail-rating">
              <div className="rating-pill">
                ★ {patissier.rating}
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: "0.84rem" }}>
                {patissier.reviews} avis · Depuis {patissier.since}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-meta">
          <div className="meta-item">
            <span className="meta-label">📍 Adresse</span>
            <span className="meta-value">{patissier.address}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">📞 Téléphone</span>
            <span className="meta-value">{patissier.phone}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">🕐 Horaires</span>
            <span className="meta-value">{patissier.hours}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">🏆 Depuis</span>
            <span className="meta-value">{patissier.since}</span>
          </div>
        </div>
      </div>

      <div className="section-card">
        <h3>À propos</h3>
        <p>{patissier.description}</p>
      </div>

      <div className="section-card">
        <h3>🎂 Nos spécialités</h3>
        <div className="products-list">
          {patissier.products.map((prod, i) => (
            <div key={i} className="product-item">
              <span className="product-icon">{prod.icon}</span>
              <span className="product-name">{prod.name}</span>
              <span className="product-price">{prod.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-card" style={{ marginBottom: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3 style={{ marginBottom: 4 }}>✨ Gâteau sur mesure</h3>
            <p
              style={{
                fontSize: "0.84rem",
                color: "var(--text-secondary)",
                margin: 0,
              }}
            >
              Concevez votre gâteau de A à Z avec {patissier.name}
            </p>
          </div>
        </div>
        <button className="btn-create" onClick={() => onCreateCake(patissier)}>
          🎨 Créer mon gâteau →
        </button>
      </div>
    </div>
  );
}

const FLAVORS = [
  { id: "vanille", label: "Vanille", emoji: "🤍" },
  { id: "chocolat", label: "Chocolat", emoji: "🍫" },
  { id: "pistache", label: "Pistache", emoji: "💚" },
  { id: "citron", label: "Citron", emoji: "🍋" },
  { id: "fraise", label: "Fraise", emoji: "🍓" },
  { id: "datte", label: "Datte", emoji: "🌴" },
];
const SIZES = [
  { id: "s", label: "4–6 pers.", emoji: "🎂" },
  { id: "m", label: "8–12 pers.", emoji: "🎂🎂" },
  { id: "l", label: "15–20 pers.", emoji: "🎂🎂🎂" },
  { id: "xl", label: "25+ pers.", emoji: "🏆" },
];
const OCCASIONS = [
  { id: "mariage", label: "Mariage", emoji: "💍" },
  { id: "anniversaire", label: "Anniversaire", emoji: "🎉" },
  { id: "fiancailles", label: "Fiançailles", emoji: "💌" },
  { id: "naissance", label: "Naissance", emoji: "👶" },
  { id: "autre", label: "Autre", emoji: "🎀" },
];

function CakeBuilderPage({ patissier, onSuccess }) {
  const [flavor, setFlavor] = useState("chocolat");
  const [size, setSize] = useState("m");
  const [occasion, setOccasion] = useState("anniversaire");
  const [form, setForm] = useState({ name: "", date: "", note: "" });
  const [submitting, setSubmitting] = useState(false);

  const sizeLabels = { s: "Petit (4-6p)", m: "Moyen (8-12p)", l: "Grand (15-20p)", xl: "XL (25+)" };
  const basePrice = { s: 2500, m: 4500, l: 7500, xl: 12000 };
  const price = basePrice[size];

  const handleSubmit = () => {
    if (!form.name || !form.date) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSuccess();
    }, 1800);
  };

  return (
    <div className="cake-page slide-enter">
      <div className="cake-header">
        <h2>🎨 Créer votre gâteau</h2>
        <p>
          Chez <strong>{patissier.name}</strong> — configurez votre commande sur
          mesure
        </p>
      </div>

      <div className="form-card">
        <h3>🍰 Saveur principale</h3>
        <div className="option-grid">
          {FLAVORS.map((f) => (
            <button
              key={f.id}
              className={`option-btn ${flavor === f.id ? "selected" : ""}`}
              onClick={() => setFlavor(f.id)}
            >
              <span className="option-emoji">{f.emoji}</span>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-card">
        <h3>📐 Taille du gâteau</h3>
        <div className="option-grid">
          {SIZES.map((s) => (
            <button
              key={s.id}
              className={`option-btn ${size === s.id ? "selected" : ""}`}
              onClick={() => setSize(s.id)}
            >
              <span className="option-emoji">{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-card">
        <h3>🎉 Occasion</h3>
        <div className="option-grid">
          {OCCASIONS.map((o) => (
            <button
              key={o.id}
              className={`option-btn ${occasion === o.id ? "selected" : ""}`}
              onClick={() => setOccasion(o.id)}
            >
              <span className="option-emoji">{o.emoji}</span>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-card">
        <h3>📋 Vos coordonnées</h3>
        <div className="form-group">
          <label className="form-label">Nom & prénom *</label>
          <input
            className="form-input"
            placeholder="Ex: Amina Bensalem"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date souhaitée *</label>
          <input
            className="form-input"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Message personnalisé (optionnel)</label>
          <textarea
            className="form-textarea"
            placeholder="Ex: Inscription 'Joyeux anniversaire Yasmine', fleurs roses…"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
        </div>
      </div>

      <div className="summary-box">
        <div style={{ fontWeight: 600, marginBottom: 12, fontSize: "0.88rem", color: "var(--brand-dark)" }}>
          📝 Récapitulatif
        </div>
        <div className="summary-row">
          <span className="key">Pâtisserie</span>
          <span className="val">{patissier.name}</span>
        </div>
        <div className="summary-row">
          <span className="key">Saveur</span>
          <span className="val">{FLAVORS.find((f) => f.id === flavor)?.label}</span>
        </div>
        <div className="summary-row">
          <span className="key">Taille</span>
          <span className="val">{sizeLabels[size]}</span>
        </div>
        <div className="summary-row">
          <span className="key">Occasion</span>
          <span className="val">{OCCASIONS.find((o) => o.id === occasion)?.label}</span>
        </div>
        {form.date && (
          <div className="summary-row">
            <span className="key">Date</span>
            <span className="val">{new Date(form.date).toLocaleDateString("fr-DZ")}</span>
          </div>
        )}
        <div className="summary-row total">
          <span className="key">Estimation</span>
          <span className="val">{price.toLocaleString("fr-DZ")} DA</span>
        </div>
      </div>

      <button
        className="btn-submit"
        onClick={handleSubmit}
        disabled={!form.name || !form.date || submitting}
        style={{ opacity: !form.name || !form.date ? 0.5 : 1 }}
      >
        {submitting ? (
          <>
            <span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
            Envoi en cours…
          </>
        ) : (
          "🚀 Envoyer ma commande"
        )}
      </button>
    </div>
  );
}

function SuccessPage({ onHome }) {
  return (
    <div className="success-page scale-enter">
      <div className="success-icon">🎂</div>
      <h2>Commande envoyée !</h2>
      <p>
        Votre demande a bien été transmise au pâtissier. Vous serez contacté
        sous 24h pour confirmer les détails et le prix final.
      </p>
      <button className="btn-home" onClick={onHome}>
        ← Retour à l'accueil
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT — Gestion du state & navigation
───────────────────────────────────────────────*/
export default function App() {
  const [step, setStep] = useState(0); // 0=home 1=wilaya 2=detail 3=builder 4=success
  const [selectedWilaya, setSelectedWilaya] = useState(null);
  const [selectedPatissier, setSelectedPatissier] = useState(null);

  const handleSelectWilaya = (w) => { setSelectedWilaya(w); setStep(1); };
  const handleSelectPatissier = (p) => { setSelectedPatissier(p); setStep(2); };
  const handleCreateCake = (p) => { setSelectedPatissier(p); setStep(3); };
  const handleSuccess = () => setStep(4);
  const handleHome = () => { setStep(0); setSelectedWilaya(null); setSelectedPatissier(null); };

  const handleBack = () => {
    if (step === 1) { setSelectedWilaya(null); setStep(0); }
    else if (step === 2) { setSelectedPatissier(null); setStep(1); }
    else if (step === 3) setStep(2);
    else if (step === 4) handleHome();
  };

  const handleWilayaNav = () => { setSelectedPatissier(null); setStep(1); };

  const renderPage = () => {
    switch (step) {
      case 0: return <HomePage onSelectWilaya={handleSelectWilaya} />;
      case 1: return <PatissiersPage wilaya={selectedWilaya} onSelect={handleSelectPatissier} />;
      case 2: return <DetailPage patissier={selectedPatissier} onCreateCake={handleCreateCake} />;
      case 3: return <CakeBuilderPage patissier={selectedPatissier} onSuccess={handleSuccess} />;
      case 4: return <SuccessPage onHome={handleHome} />;
      default: return null;
    }
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="app-root">
        <Navbar
          step={step}
          wilaya={selectedWilaya}
          patissier={selectedPatissier}
          onHome={handleHome}
          onBack={handleBack}
          onWilaya={handleWilayaNav}
        />
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </>
  );
}
