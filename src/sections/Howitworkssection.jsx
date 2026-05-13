import { useState } from "react";
import { Cake, Palette, ShoppingCart, Truck } from "lucide-react";

const features = [
  {
    icon: Cake,
    title: "Créer votre gâteau",
    desc: "Choisissez la base de votre gâteau et commencez votre création.",
  },
  {
    icon: Palette,
    title: "Personnalisation 3D",
    desc: "Visualisez et modifiez votre gâteau en temps réel en 3D.",
  },
  {
    icon: ShoppingCart,
    title: "Commande facile",
    desc: "Validez votre commande en quelques clics simplement.",
  },
  {
    icon: Truck,
    title: "Livraison locale",
    desc: "Recevez votre gâteau directement chez vous en toute sécurité.",
  },
];

function FeatureCard({ item }) {
  const Icon = item.icon;

  return (
    <div style={styles.card}>
      <div style={styles.iconBox}>
        <Icon size={24} color="#C8194A" />
      </div>

      <h3 style={styles.title}>{item.title}</h3>

      <p style={styles.desc}>{item.desc}</p>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.mainTitle}>Comment ça marche</h2>
          <p style={styles.subtitle}>
            Une expérience simple pour créer votre gâteau parfait
          </p>
        </div>

        <div className="grid" style={styles.grid}>
          {features.map((item, i) => (
            <FeatureCard key={i} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 600px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
        }

        .grid div:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(200,25,74,0.15);
          transition: 0.3s ease;
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