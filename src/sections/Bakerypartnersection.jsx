import Icon from "../components/Icon";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
// BakeryPartnerSection — "Faites grandir votre boulangerie avec HalwaTech"
// Props:
//   onBePartner: fn
// ─────────────────────────────────────────────

const PERKS = [
  {
    icon: "trending",
    title: "Plus de clients",
    desc: "Faites découvrir vos gâteaux à plus de personnes",
  },
  {
    icon: "check",
    title: "Gestion simple",
    desc: "Gérez vos commandes facilement",
  },
  {
    icon: "store",
    title: "Inscription gratuite",
    desc: "Commencez sans frais",
  },
];

// Illustration simple de boutique en SVG
function ShopIllustration() {
  return (
    <div style={illustrationStyles.wrapper}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <rect x="20" y="50" width="80" height="55" rx="6" fill="#fff0f4" stroke="#e8c0ce" strokeWidth="2" />
        <rect x="14" y="40" width="92" height="18" rx="5" fill="#fce4ec" stroke="#e8a0b8" strokeWidth="2" />
        <rect x="48" y="76" width="24" height="29" rx="4" fill="#f9d0df" stroke="#e8a0b8" strokeWidth="1.5" />
        <circle cx="69" cy="91" r="2.5" fill="#C8194A" />
        <rect x="24" y="60" width="22" height="18" rx="3" fill="#fce4ec" stroke="#e8a0b8" strokeWidth="1.5" />
        <rect x="74" y="60" width="22" height="18" rx="3" fill="#fce4ec" stroke="#e8a0b8" strokeWidth="1.5" />
        <line x1="35" y1="60" x2="35" y2="78" stroke="#e8a0b8" strokeWidth="1" />
        <line x1="24" y1="69" x2="46" y2="69" stroke="#e8a0b8" strokeWidth="1" />
        <line x1="85" y1="60" x2="85" y2="78" stroke="#e8a0b8" strokeWidth="1" />
        <line x1="74" y1="69" x2="96" y2="69" stroke="#e8a0b8" strokeWidth="1" />
        <path d="M20 44 L28 58" stroke="#e8a0b8" strokeWidth="1.5" opacity="0.5" />
        <path d="M38 40 L46 58" stroke="#e8a0b8" strokeWidth="1.5" opacity="0.5" />
        <path d="M56 40 L64 58" stroke="#e8a0b8" strokeWidth="1.5" opacity="0.5" />
        <path d="M74 40 L82 58" stroke="#e8a0b8" strokeWidth="1.5" opacity="0.5" />
        <path d="M92 44 L100 58" stroke="#e8a0b8" strokeWidth="1.5" opacity="0.5" />
        <rect x="72" y="20" width="10" height="22" rx="2" fill="#fce4ec" stroke="#e8a0b8" strokeWidth="1.5" />
        <circle cx="77" cy="16" r="4" fill="none" stroke="#e8a0b8" strokeWidth="1.5" opacity="0.5" />
        <circle cx="81" cy="10" r="3" fill="none" stroke="#e8a0b8" strokeWidth="1.5" opacity="0.4" />
      </svg>
    </div>
  );
}

const illustrationStyles = {
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #fff5f8 0%, #fce4ec 100%)",
    borderRadius: 16,
    minHeight: 200,
  },
};

export default function BakeryPartnerSection({ onBePartner }) {
  const navigate = useNavigate();

  const handleBePartner = () => {
    navigate("/partner-form"); // Navigue vers PartnerForm.jsx
  };

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.card}>
          {/* Contenu gauche */}
          <div style={styles.content}>
            <span style={styles.badge}>
              <Icon name="store" size={14} color="#C8194A" />
           Pour les pâtissiers
            </span>

            <h2 style={styles.title}>
              Faites grandir votre activité avec{" "}
              <span style={styles.accent}>HalwaTech</span>
            </h2>

            <p style={styles.description}>
             Rejoignez notre plateforme et trouvez plus de clients.
Présentez vos créations, y compris les gâteaux 3D, et gérez vos commandes facilement.
            </p>

            {/* Avantages */}
            <div style={styles.perks}>
              {PERKS.map((perk) => (
                <div key={perk.title} style={styles.perk}>
                  <span style={styles.perkIcon}>
                    <Icon name={perk.icon} size={16} color="#C8194A" />
                  </span>
                  <div>
                    <div style={styles.perkTitle}>{perk.title}</div>
                    <div style={styles.perkDesc}>{perk.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="primary" size="md" onClick={handleBePartner}>
              Devenir partenaire
            </Button>
          </div>

          {/* Illustration droite */}
          <div style={styles.illustrationWrapper}>
            <ShopIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#fdf6f8",
    padding: "60px 24px",
    display: "flex",
    justifyContent: "center",
  },

  inner: {
    maxWidth: 1100,
    width: "100%",
  },

  card: {
    background: "#fff",
    borderRadius: 24,
    padding: "48px 40px",
    border: "1px solid #f0e0e8",
    boxShadow: "0 4px 24px rgba(200,25,74,0.07)",
    display: "grid",
    gridTemplateColumns: "1fr minmax(280px, 340px)",
    gap: 48,
    alignItems: "center",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#fff0f4",
    color: "#C8194A",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    padding: "5px 14px",
    borderRadius: 100,
    border: "1px solid #fce4ec",
    width: "fit-content",
  },

  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(24px, 3vw, 34px)",
    fontWeight: 800,
    color: "#1a1a2e",
    margin: 0,
    lineHeight: 1.2,
  },

  accent: {
    color: "#C8194A",
  },

  description: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    color: "#666",
    lineHeight: 1.7,
    margin: 0,
    maxWidth: 440,
  },

  perks: {
    display: "flex",
    gap: 28,
    flexWrap: "wrap",
  },

  perk: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  },

  perkIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "#fff0f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
  },

  perkTitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "#1a1a2e",
    lineHeight: 1.3,
  },

  perkDesc: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    color: "#999",
    lineHeight: 1.4,
    marginTop: 2,
  },

  illustrationWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    minHeight: 220,
  },
};