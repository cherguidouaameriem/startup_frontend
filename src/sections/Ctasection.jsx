import Icon from "../components/Icon";

function FeatureCard({ feature }) {
  return (
    <div style={styles.card}>
      <div style={styles.iconCircle}>
        <Icon name={feature.icon} size={24} color="#C8194A" />
      </div>
      <h3 style={styles.featureTitle}>{feature.title}</h3>
      <p style={styles.featureDesc}>{feature.description}</p>
    </div>
  );
}

export default function FeaturesSection({ features = [] }) {
  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <h2 style={styles.title}></h2>
        </div>

        <div style={styles.grid}>
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#fff",
    padding: "72px 24px",
    borderTop: "1px solid #f5eaed",
  },
  inner: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: 48,
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(26px, 3.5vw, 38px)",
    fontWeight: 800,
    color: "#1a1a2e",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 32,
    textAlign: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
    padding: "8px 12px",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#fff0f4",
    border: "2px solid #fce4ec",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: "#1a1a2e",
    margin: 0,
  },
  featureDesc: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: "#888",
    lineHeight: 1.6,
    margin: 0,
    maxWidth: 220,
  },
};