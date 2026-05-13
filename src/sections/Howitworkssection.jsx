import { useState } from "react";
import { Cake, Palette, ShoppingCart } from "lucide-react";

const iconMap = {
  design: Cake,
  customize: Palette,
  order: ShoppingCart,
};

const steps = [
  {
    id: 1,
    icon: "design",
    label: "Étape 1",
    title: "Créer votre gâteau",
    description:
      "Choisissez la forme de votre gâteau, même en 3D selon votre thème.",
  },
  {
    id: 2,
    icon: "customize",
    label: "Étape 2",
    title: "Personnaliser",
    description:
      "Ajoutez vos saveurs, couleurs et personnalisez la décoration selon votre envie.",
  },
  {
    id: 3,
    icon: "order",
    label: "Étape 3",
    title: "Commander",
    description:
      "Validez votre commande et recevez votre gâteau chez vous.",
  },
];

function StepCard({ step, isLast }) {
  const LucideIcon = iconMap[step.icon];
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.cardWrapper} className="step-card-wrapper">
      <div
        className="step-card"
        style={{
          ...styles.card,
          transform: hover ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hover
            ? "0 12px 24px rgba(200,25,74,0.15)"
            : "0 2px 16px rgba(200,25,74,0.06)",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={styles.iconCircle}>
          {LucideIcon && <LucideIcon size={26} color="#C8194A" />}
        </div>

        <span style={styles.stepLabel}>{step.label}</span>

        <h3 style={styles.stepTitle}>{step.title}</h3>

        <p style={styles.stepDesc}>{step.description}</p>
      </div>

      {!isLast && (
        <div style={styles.connector} className="step-connector">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M8 16 H24 M18 10 L24 16 L18 22"
              stroke="#e0b0bf"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function Howitworkssection() {
  return (
    <section style={styles.section} className="how-section">
      <div style={styles.inner}>
        <div style={styles.header}>
          <h2 style={styles.title}>Comment ça marche</h2>

          <p style={styles.subtitle}>
            Trois étapes simples pour obtenir votre gâteau parfait
          </p>
        </div>

        <div style={styles.stepsRow} className="steps-row">
          {steps.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .step-card {
          min-height: 320px;
          transition: all 0.3s ease;
        }

        /* TABLET */
        @media (max-width: 1024px) {
          .steps-row {
            gap: 18px !important;
          }

          .step-card {
            padding: 32px 24px !important;
          }

          .step-connector {
            display: none !important;
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .how-section {
            padding: 60px 16px !important;
          }

          .steps-row {
            flex-direction: column !important;
            gap: 20px !important;
          }

          .step-card-wrapper {
            width: 100% !important;
          }

          .step-card {
            min-height: unset !important;
            padding: 28px 22px !important;
            border-radius: 16px !important;
          }

          .step-card h3 {
            font-size: 18px !important;
          }

          .step-card p {
            font-size: 14px !important;
            line-height: 1.6 !important;
          }
        }

        /* SMALL MOBILE */
        @media (max-width: 480px) {
          .how-section {
            padding: 48px 12px !important;
          }

          .step-card {
            padding: 24px 18px !important;
          }

          .step-card h3 {
            font-size: 17px !important;
          }

          .step-card p {
            font-size: 13px !important;
          }

          .step-card svg {
            width: 22px;
            height: 22px;
          }
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    background: "#fafafa",
    padding: "80px 24px",
    borderTop: "1px solid #f0eaec",
    width: "100%",
    overflow: "hidden",
  },

  inner: {
    maxWidth: 1100,
    margin: "0 auto",
    width: "100%",
  },

  header: {
    textAlign: "center",
    marginBottom: 56,
  },

  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 800,
    color: "#1a1a2e",
    margin: "0 0 12px",
  },

  subtitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 17,
    color: "#888",
    margin: 0,
  },

  stepsRow: {
    display: "flex",
    gap: 24,
    alignItems: "stretch",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  cardWrapper: {
    display: "flex",
    alignItems: "center",
    flex: "1 1 300px",
    minWidth: 0,
  },

  card: {
    flex: 1,
    background: "#fff",
    borderRadius: 18,
    padding: "40px 32px",
    textAlign: "center",
    border: "1px solid #f0e8ec",
    boxShadow: "0 2px 16px rgba(200,25,74,0.06)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
    width: "100%",
  },

  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: "50%",
    background: "#fff0f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    border: "2px solid #fce4ec",
    flexShrink: 0,
  },

  stepLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    color: "#C8194A",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  stepTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 20,
    fontWeight: 700,
    color: "#1a1a2e",
    margin: 0,
  },

  stepDesc: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: "#777",
    lineHeight: 1.65,
    margin: 0,
  },

  connector: {
    flexShrink: 0,
    padding: "0 8px",
    opacity: 0.7,
  },
};