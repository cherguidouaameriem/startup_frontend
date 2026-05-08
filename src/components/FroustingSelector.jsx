import { ArrowRight } from "lucide-react";

const COLORS = [
  { name: "Crème", value: "#f5e6c8" },
  { name: "Rose", value: "#e89aa4" },
  { name: "Blanc", value: "#f2f2f2" },
  { name: "Chocolat", value: "#5a3825" },
  { name: "Lavande", value: "#b4a7d6" },
  { name: "Menthe", value: "#8fc7a3" },
  { name: "Or", value: "#d4a64a" },
];

export default function FrostingSelector({
  selectedColor,
  setSelectedColor,
  onNext,
  onBack,
}) {
  return (
    <div style={styles.container}>
      
      <h2 style={styles.title}>Couleur du glaçage</h2>
      <p style={styles.subtitle}>Choisissez la couleur parfaite pour votre gâteau</p>

      <div style={styles.colorsRow}>
        {COLORS.map((color) => (
          <div
            key={color.name}
            onClick={() => setSelectedColor(color.value)}
            style={{
              ...styles.colorItem,
              ...(selectedColor === color.value ? styles.selected : {}),
            }}
          >
            <div
              style={{
                ...styles.circle,
                background: color.value,
              }}
            />
            <span style={styles.label}>{color.name}</span>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <button style={styles.backBtn} onClick={onBack}>
          Retour
        </button>

        <button
          style={styles.continueBtn}
          onClick={() => onNext({ selectedColor })}
        >
          Continuer <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    borderRadius: 20,
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#777",
    marginBottom: 25,
  },
  colorsRow: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
  },
  colorItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    gap: 8,
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "3px solid transparent",
  },
  selected: {
    transform: "scale(1.1)",
  },
  label: {
    fontSize: 12,
    color: "#555",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 30,
  },
  backBtn: {
    padding: "10px 18px",
    borderRadius: 20,
    border: "none",
    background: "#e5e5e5",
    cursor: "pointer",
  },
  continueBtn: {
    padding: "10px 20px",
    borderRadius: 20,
    border: "none",
    background: "#C8194A",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
};