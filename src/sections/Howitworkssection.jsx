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
    description: "Choisissez la forme de votre gâteau, même en 3D selon votre thème.",
  },
  {
    id: 2,
    icon: "customize",
    label: "Étape 2",
    title: "Personnaliser",
    description: "Ajoutez vos saveurs, couleurs et personnalisez la décoration selon votre envie.",
  },
  {
    id: 3,
    icon: "order",
    label: "Étape 3",
    title: "Commander",
    description: "Validez votre commande et recevez votre gâteau chez vous.",
  },
];
function StepCard({ step, isLast }) {
  const LucideIcon = iconMap[step.icon];
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.cardWrapper}>
      <div
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
        <div style={styles.connector}>
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
    <section style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <h2 style={styles.title}>Comment ça marche</h2>
          <p style={styles.subtitle}>
            Trois étapes simples pour obtenir votre gâteau parfait
          </p>
        </div>

        <div style={styles.stepsRow}>
          {steps.map((step, i) => (
            <StepCard key={step.id} step={step} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#fafafa",
    padding: "80px 24px",
    borderTop: "1px solid #f0eaec",
  },
  inner: { maxWidth: 1100, margin: "0 auto" },
  header: { textAlign: "center", marginBottom: 56 },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 800,
    color: "#1a1a2e",
    margin: "0 0 12px",
  },
  subtitle: { fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#888", margin: 0 },
  stepsRow: { display: "flex", gap: 0, alignItems: "stretch", justifyContent: "center" },
  cardWrapper: { display: "flex", alignItems: "center", flex: 1 },
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
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
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
  connector: { flexShrink: 0, padding: "0 8px", opacity: 0.7 },
};