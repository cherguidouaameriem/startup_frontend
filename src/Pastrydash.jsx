import { useState } from "react";
import {
  Store,
  ShoppingBag,
  UtensilsCrossed,
  User,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  X,
  AlertCircle,
  Star,
  MapPin,
  Phone,
  FileText,
  Save,
  Home,
  Layers,
  Users,
  LogIn,
  UserPlus,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  CakeSlice,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ORDERS = [
  {
    id: "DHU-001",
    status: "Reçue",
    client: "Alice M.",
    description: "Ronde Vanille, 2 étages — Glaçage rose, Joyeux Anniversaire",
    date: "2026-03-02",
    price: "3 300 DA",
  },
  {
    id: "DHU-002",
    status: "En Préparation",
    client: "Bob K.",
    description:
      "Cœur Velours Rouge, 3 étages — Glaçage blanc, fleurs comestibles",
    date: "2026-03-05",
    price: "6 200 DA",
  },
  {
    id: "DHU-003",
    status: "Prête",
    client: "Clara J.",
    description: "Carré Chocolat, 2 étages — Glaçage chocolat, feuille d'or",
    date: "2026-03-08",
    price: "5 800 DA",
  },
  {
    id: "DHU-004",
    status: "Livrée",
    client: "David L.",
    description: "Cœur Citron, 1 étage — Glaçage menthe, fruits rouges",
    date: "2026-03-05",
    price: "4 000 DA",
  },
  {
    id: "DHU-005",
    status: "Livrée",
    client: "Sara T.",
    description: "Cœur Vanille, 2 étages — Glaçage rose, macarons dessus",
    date: "2026-03-07",
    price: "7 200 DA",
  },
  {
    id: "DHU-006",
    status: "Livrée",
    client: "Yacine B.",
    description: "Ronde Chocolat, 3 étages — Ganache chocolat noir, baies",
    date: "2026-03-02",
    price: "3 500 DA",
  },
];

const MENU = [
  { name: "Gâteau Vanille Classique", price: "3 500 DA", available: true },
  { name: "Fondant au Chocolat", price: "4 500 DA", available: true },
  { name: "Velours Rouge Deluxe", price: "5 000 DA", available: true },
  { name: "Entremet Framboise", price: "3 000 DA", available: false },
];

const RECENT_ORDERS = [
  { client: "Alice M.", desc: "Ronde Vanille, 2 étages", status: "Reçue", price: "3 300 DA" },
  { client: "Bob K.", desc: "Velours Rouge, 3 étages", status: "En Préparation", price: "6 200 DA" },
  { client: "Clara J.", desc: "Carré Chocolat, 2 étages", status: "Prête", price: "5 800 DA" },
];

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const WEEK_DAYS = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const statusColors = {
  Reçue: { bg: "#fef3c7", text: "#92400e", border: "#fbbf24" },
  "En Préparation": { bg: "#dbeafe", text: "#1e40af", border: "#3b82f6" },
  Prête: { bg: "#d1fae5", text: "#065f46", border: "#10b981" },
  Livrée: { bg: "#f3f4f6", text: "#374151", border: "#9ca3af" },
};

const StatusBadge = ({ status }) => {
  const c = statusColors[status] || statusColors["Livrée"];
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        borderRadius: 20,
        padding: "2px 10px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.3,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

const Navbar = () => (
  <nav
    style={{
      background: "#fff",
      borderBottom: "1px solid #f0e6f0",
      padding: "0 32px",
      height: 52,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 1px 4px rgba(190,30,90,0.06)",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <CakeSlice size={22} color="#be1e5a" strokeWidth={2.2} />
      <span style={{ fontWeight: 800, fontSize: 17, color: "#be1e5a", letterSpacing: -0.5 }}>
        CakeCraft
      </span>
    </div>
    <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
      {["Accueil", "Créer un Gâteau", "Pâtisseries", "Pour les Pâtissiers"].map((item) => (
        <a
          key={item}
          href="#"
          style={{
            fontSize: 13,
            color: "#555",
            textDecoration: "none",
            fontWeight: 500,
            transition: "color .15s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#be1e5a")}
          onMouseLeave={(e) => (e.target.style.color = "#555")}
        >
          {item}
        </a>
      ))}
    </div>
    <div style={{ display: "flex", gap: 10 }}>
      <button
        style={{
          padding: "6px 16px",
          borderRadius: 8,
          border: "1.5px solid #e5e7eb",
          background: "#fff",
          color: "#374151",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Connexion
      </button>
      <button
        style={{
          padding: "6px 16px",
          borderRadius: 8,
          border: "none",
          background: "#be1e5a",
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        S'inscrire
      </button>
    </div>
  </nav>
);

// ─── FOOTER ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer
    style={{
      background: "#be1e5a",
      color: "#fff",
      padding: "32px 48px 20px",
      marginTop: 48,
    }}
  >
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 32 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <CakeSlice size={20} color="#fff" />
          <span style={{ fontWeight: 800, fontSize: 16 }}>CakeCraft</span>
        </div>
        <p style={{ fontSize: 12.5, opacity: 0.85, lineHeight: 1.7, maxWidth: 220 }}>
          Créez le gâteau de vos rêves et connectez-vous aux meilleures pâtisseries près de chez vous.
        </p>
      </div>
      <div>
        <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Plateforme</p>
        {["Créer un Gâteau", "Pour les Pâtisseries"].map((l) => (
          <p key={l} style={{ fontSize: 12.5, opacity: 0.8, marginBottom: 6, cursor: "pointer" }}>{l}</p>
        ))}
      </div>
      <div>
        <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Compte</p>
        {["Connexion", "S'inscrire"].map((l) => (
          <p key={l} style={{ fontSize: 12.5, opacity: 0.8, marginBottom: 6, cursor: "pointer" }}>{l}</p>
        ))}
      </div>
      <div>
        <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Support</p>
        <p style={{ fontSize: 12.5, opacity: 0.8, marginBottom: 6 }}>help@cakecraft.com</p>
        <p style={{ fontSize: 12.5, opacity: 0.8 }}>© 2026 CakeCraft</p>
      </div>
    </div>
  </footer>
);

// ─── MINI CALENDAR ────────────────────────────────────────────────────────────

const MiniCalendar = () => {
  const [month, setMonth] = useState(3); // April
  const [year] = useState(2026);
  const today = 14;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  const monthNames = [
    "Janvier","Février","Mars","Avril","Mai","Juin",
    "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
  ];

  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #f0e6f0", padding: 16, minWidth: 220 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <button
          onClick={() => setMonth((m) => Math.max(0, m - 1))}
          style={{ border: "none", background: "none", cursor: "pointer", color: "#888" }}
        >
          <ChevronLeft size={15} />
        </button>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>
          {monthNames[month]} {year}
        </span>
        <button
          onClick={() => setMonth((m) => Math.min(11, m + 1))}
          style={{ border: "none", background: "none", cursor: "pointer", color: "#888" }}
        >
          <ChevronRight size={15} />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
        {WEEK_DAYS.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "#9ca3af", padding: "2px 0" }}>
            {d}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
        {cells.map((day, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              fontSize: 12,
              padding: "4px 0",
              borderRadius: 6,
              background: day === today ? "#be1e5a" : "transparent",
              color: day === today ? "#fff" : day ? "#374151" : "transparent",
              fontWeight: day === today ? 800 : 400,
              cursor: day ? "pointer" : "default",
            }}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── TABS ─────────────────────────────────────────────────────────────────────

const TAB_LIST = [
  { id: "overview", label: "Aperçu", icon: <Store size={14} /> },
  { id: "orders", label: "Commandes", icon: <ShoppingBag size={14} /> },
  { id: "menu", label: "Menu & Tarifs", icon: <UtensilsCrossed size={14} /> },
  { id: "profile", label: "Profil", icon: <User size={14} /> },
];

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────

const OverviewTab = () => {
  const activeWeekDays = ["Lun", "Mar", "Mer", "Jeu", "Sam", "Dim"];

  return (
    <div style={{ display: "flex", gap: 24 }}>
      {/* Left Column */}
      <div style={{ flex: 1 }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
          {[
            { label: "Total Commandes", value: "6", sub: "Ce mois", icon: <ShoppingBag size={16} color="#be1e5a" /> },
            { label: "Confirmées", value: "5", sub: "Ce mois", icon: <CheckCircle size={16} color="#10b981" /> },
            { label: "En Attente", value: "1", sub: "en attente d'action", icon: <Clock size={16} color="#f59e0b" /> },
            { label: "Revenus", value: "19 700 DA", sub: "delivrées/mois", icon: <Star size={16} color="#6366f1" /> },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff",
                borderRadius: 12,
                border: "1px solid #f0e6f0",
                padding: "14px 16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4, fontWeight: 500 }}>{s.label}</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>{s.value}</p>
                  <p style={{ fontSize: 10.5, color: "#9ca3af", marginTop: 2 }}>{s.sub}</p>
                </div>
                <div style={{ background: "#fdf2f8", borderRadius: 8, padding: 6 }}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Availability */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #f0e6f0",
            padding: "18px 20px",
            marginBottom: 24,
          }}
        >
          <p style={{ fontWeight: 700, fontSize: 13.5, color: "#111827", marginBottom: 14 }}>
            🗓 Disponibilité
          </p>
          <p style={{ fontSize: 11.5, color: "#6b7280", marginBottom: 10 }}>Jours ouverts par semaine</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {DAYS.map((d) => (
              <span
                key={d}
                style={{
                  padding: "5px 12px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  background: activeWeekDays.includes(d) ? "#be1e5a" : "#f3f4f6",
                  color: activeWeekDays.includes(d) ? "#fff" : "#9ca3af",
                  border: `1.5px solid ${activeWeekDays.includes(d) ? "#be1e5a" : "#e5e7eb"}`,
                  cursor: "pointer",
                }}
              >
                {d}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 8 }}>
            Jours fériés fermés. Cliquez sur une date du calendrier pour voir les détails.
          </p>
          <MiniCalendar />
        </div>

        {/* Recent Orders */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #f0e6f0",
            padding: "18px 20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ fontWeight: 700, fontSize: 13.5, color: "#111827" }}>🧾 Commandes Récentes</p>
            <a href="#" style={{ fontSize: 12, color: "#be1e5a", textDecoration: "none", fontWeight: 600 }}>
              Voir tout
            </a>
          </div>
          {RECENT_ORDERS.map((o) => (
            <div
              key={o.client}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #f9f0f5",
              }}
            >
              <div>
                <p style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>{o.client}</p>
                <p style={{ fontSize: 11.5, color: "#9ca3af" }}>{o.desc}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <StatusBadge status={o.status} />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#be1e5a", minWidth: 70, textAlign: "right" }}>
                  {o.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── ORDERS TAB ───────────────────────────────────────────────────────────────

const OrdersTab = () => {
  const actionMap = {
    Reçue: { label: "Accepter", color: "#10b981", bg: "#d1fae5" },
    "En Préparation": { label: "Marquer Prête", color: "#3b82f6", bg: "#dbeafe" },
    Prête: { label: "Marquer Livrée", color: "#6366f1", bg: "#ede9fe" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {ORDERS.map((order) => {
        const action = actionMap[order.status];
        return (
          <div
            key={order.id}
            style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #f0e6f0",
              padding: "16px 20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: 13, color: "#be1e5a" }}>{order.id}</span>
                  <StatusBadge status={order.status} />
                </div>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 3 }}>{order.client}</p>
                <p style={{ fontSize: 12.5, color: "#6b7280" }}>{order.description}</p>
                <p style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 4 }}>{order.date} · {order.price}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: 16 }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    background: "#fff",
                    color: "#374151",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <Eye size={13} /> Détails
                </button>
                {action && (
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "6px 14px",
                      borderRadius: 8,
                      border: `1.5px solid ${action.color}`,
                      background: action.bg,
                      color: action.color,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    <Check size={13} /> {action.label}
                  </button>
                )}
                {order.status === "Reçue" && (
                  <button
                    style={{
                      padding: "6px 8px",
                      borderRadius: 8,
                      border: "1.5px solid #fca5a5",
                      background: "#fef2f2",
                      color: "#ef4444",
                      fontSize: 12,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── MENU TAB ─────────────────────────────────────────────────────────────────

const MenuTab = () => (
  <div
    style={{
      background: "#fff",
      borderRadius: 12,
      border: "1px solid #f0e6f0",
      padding: "20px 24px",
    }}
  >
    <h3 style={{ fontWeight: 800, fontSize: 16, color: "#111827", marginBottom: 18 }}>
      🎂 Votre Menu
    </h3>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {MENU.map((item) => (
        <div
          key={item.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 16px",
            borderRadius: 10,
            border: "1px solid #f0e6f0",
            background: item.available ? "#fff" : "#fafafa",
          }}
        >
          <div>
            <p
              style={{
                fontWeight: 600,
                fontSize: 13.5,
                color: item.available ? "#111827" : "#9ca3af",
                marginBottom: 2,
              }}
            >
              {item.name}
            </p>
            <p style={{ fontSize: 12.5, color: "#be1e5a", fontWeight: 700 }}>{item.price}</p>
          </div>
          <span
            style={{
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 11.5,
              fontWeight: 700,
              background: item.available ? "#d1fae5" : "#f3f4f6",
              color: item.available ? "#065f46" : "#9ca3af",
              border: `1px solid ${item.available ? "#10b981" : "#e5e7eb"}`,
            }}
          >
            {item.available ? "Disponible" : "Indisponible"}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// ─── PROFILE TAB ──────────────────────────────────────────────────────────────

const ProfileTab = () => (
  <div
    style={{
      background: "#fff",
      borderRadius: 12,
      border: "1px solid #f0e6f0",
      padding: "24px 28px",
      maxWidth: 480,
    }}
  >
    <h3 style={{ fontWeight: 800, fontSize: 16, color: "#111827", marginBottom: 20 }}>
      ✏️ Profil de la Boutique
    </h3>
    {[
      { label: "Nom de la boutique", value: "Pâtisserie El Bahia", icon: <Store size={14} /> },
      { label: "Adresse", value: "12 Rue Larbi Ben M'hidi, Oran", icon: <MapPin size={14} /> },
      { label: "Téléphone", value: "+213 555 123 456", icon: <Phone size={14} /> },
    ].map((field) => (
      <div key={field.label} style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 6, display: "block" }}>
          {field.label}
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 14px",
            borderRadius: 9,
            border: "1.5px solid #e5e7eb",
            background: "#fafafa",
            fontSize: 13.5,
            color: "#111827",
          }}
        >
          <span style={{ color: "#be1e5a" }}>{field.icon}</span>
          {field.value}
        </div>
      </div>
    ))}
    <div style={{ marginBottom: 20 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 6, display: "block" }}>
        Note
      </label>
      <textarea
        defaultValue="Pâtisserie artisanale spécialisée dans les gâteaux de célébration sur mesure depuis 2013."
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: 9,
          border: "1.5px solid #e5e7eb",
          background: "#fafafa",
          fontSize: 13,
          color: "#374151",
          resize: "vertical",
          minHeight: 80,
          fontFamily: "inherit",
          boxSizing: "border-box",
        }}
      />
    </div>
    <button
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "9px 20px",
        borderRadius: 9,
        border: "none",
        background: "#be1e5a",
        color: "#fff",
        fontWeight: 700,
        fontSize: 13.5,
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(190,30,90,0.2)",
      }}
    >
      <Save size={15} /> Sauvegarder
    </button>
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{ minHeight: "100vh", background: "#fdf6fb", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />

      {/* Shop Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f0e6f0", padding: "20px 48px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#111827", marginBottom: 4, letterSpacing: -0.5 }}>
              Pâtisserie El Bahia
            </h1>
            <p style={{ fontSize: 13, color: "#9ca3af", display: "flex", alignItems: "center", gap: 5 }}>
              <MapPin size={12} color="#be1e5a" />
              12 Rue Larbi Ben M'hidi, Oran
            </p>
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 14px",
              borderRadius: 20,
              background: "#d1fae5",
              color: "#065f46",
              fontSize: 12.5,
              fontWeight: 700,
              border: "1px solid #10b981",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            Boutique ouverte
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginTop: 20 }}>
          {TAB_LIST.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 18px",
                border: "none",
                background: "transparent",
                borderBottom: activeTab === tab.id ? "2.5px solid #be1e5a" : "2.5px solid transparent",
                color: activeTab === tab.id ? "#be1e5a" : "#6b7280",
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: 13,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 24px" }}>
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "menu" && <MenuTab />}
        {activeTab === "profile" && <ProfileTab />}
      </div>

      <Footer />
    </div>
  );
}