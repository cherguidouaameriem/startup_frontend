import Icon from "../components/Icon";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
// BakeryPartnerSection
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

export default function BakeryPartnerSection({ onBePartner }) {
  const navigate = useNavigate();

  const handleBePartner = () => {
    navigate("/partner-form");
  };

  return (
    <section style={styles.section} className="partner-section">
      <div style={styles.inner}>
        <div style={styles.card} className="partner-card">
          
          {/* LEFT CONTENT */}
          <div style={styles.content} className="partner-content">
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
              Présentez vos créations, y compris les gâteaux 3D,
              et gérez vos commandes facilement.
            </p>

            {/* PERKS */}
            <div style={styles.perks} className="partner-perks">
              {PERKS.map((perk) => (
                <div key={perk.title} style={styles.perk}>
                  <span style={styles.perkIcon}>
                    <Icon
                      name={perk.icon}
                      size={16}
                      color="#C8194A"
                    />
                  </span>

                  <div>
                    <div style={styles.perkTitle}>
                      {perk.title}
                    </div>

                    <div style={styles.perkDesc}>
                      {perk.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="partner-btn">
              <Button
                variant="primary"
                size="md"
                onClick={handleBePartner}
              >
                Devenir partenaire
              </Button>
            </div>
          </div>

          {/* IMAGE RIGHT */}
          <div
            style={styles.imageWrapper}
            className="partner-image-wrapper"
          >
            <img
              src="/images/cakes/bakerybake.jpg"
              alt="Bakery"
              style={styles.image}
              className="partner-image"
            />

            <div style={styles.overlay} />

            <div style={styles.floatingCard}>
              <div style={styles.floatingBadge}>
                <Icon name="store" size={14} color="#fff" />
                +100 pâtissiers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESPONSIVE CSS */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .partner-card {
          transition: all 0.3s ease;
        }

        .partner-image {
          transition: transform 0.5s ease;
        }

        .partner-image-wrapper:hover .partner-image {
          transform: scale(1.05);
        }

        /* TABLET */
        @media (max-width: 1024px) {
          .partner-card {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 36px 28px !important;
          }

          .partner-image-wrapper {
            height: 340px !important;
            order: -1;
          }

          .partner-content {
            align-items: center;
            text-align: center;
          }

          .partner-perks {
            justify-content: center;
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .partner-section {
            padding: 48px 14px !important;
          }

          .partner-card {
            padding: 24px 18px !important;
            border-radius: 20px !important;
            gap: 24px !important;
          }

          .partner-image-wrapper {
            height: 260px !important;
            border-radius: 16px !important;
          }

          .partner-content {
            gap: 16px !important;
          }

          .partner-perks {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
            width: 100%;
          }

          .partner-btn button {
            width: 100% !important;
          }
        }

        /* SMALL MOBILE */
        @media (max-width: 480px) {
          .partner-section {
            padding: 40px 10px !important;
          }

          .partner-card {
            padding: 20px 14px !important;
          }

          .partner-image-wrapper {
            height: 220px !important;
          }

          .partner-content h2 {
            font-size: 28px !important;
          }

          .partner-content p {
            font-size: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    background: "#fdf6f8",
    padding: "70px 24px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },

  inner: {
    maxWidth: 1200,
    width: "100%",
  },

  card: {
    background: "#fff",
    borderRadius: 28,
    padding: "48px 42px",
    border: "1px solid #f0e0e8",
    boxShadow: "0 10px 40px rgba(200,25,74,0.08)",
    display: "grid",
    gridTemplateColumns: "1fr minmax(320px, 460px)",
    gap: 48,
    alignItems: "center",
    overflow: "hidden",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    zIndex: 2,
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
    padding: "6px 14px",
    borderRadius: 999,
    border: "1px solid #fce4ec",
    width: "fit-content",
  },

  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(30px, 4vw, 44px)",
    fontWeight: 800,
    color: "#1a1a2e",
    margin: 0,
    lineHeight: 1.15,
  },

  accent: {
    color: "#C8194A",
  },

  description: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 16,
    color: "#666",
    lineHeight: 1.8,
    margin: 0,
    maxWidth: 520,
  },

  perks: {
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
    marginTop: 6,
  },

  perk: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    minWidth: 180,
  },

  perkIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "#fff0f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
  },

  perkTitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: "#1a1a2e",
    lineHeight: 1.3,
  },

  perkDesc: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: "#888",
    lineHeight: 1.5,
    marginTop: 2,
  },

  imageWrapper: {
    position: "relative",
    borderRadius: 22,
    overflow: "hidden",
    minHeight: 420,
    height: "100%",
    width: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.28), rgba(0,0,0,0.08))",
  },

  floatingCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    zIndex: 3,
  },

  floatingBadge: {
    background: "rgba(200,25,74,0.92)",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    backdropFilter: "blur(8px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
  },
};