import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const SPONGE_FLAVORS = ["Vanille", "Chocolat", "Red Velvet", "Citron"];
const FILLINGS = ["Chocolat", "Caramel", "Lotus", "Fraise", "Nutella"];

export default function FillingSelector({ onNext, onBack, layers = 2 }) {

  const [selectedSponge, setSelectedSponge] = useState("Vanille");

  const [fillingsByLayer, setFillingsByLayer] = useState([]);

  // ✅ IMPORTANT : reset quand layers change
  useEffect(() => {
    setFillingsByLayer(Array(layers).fill("Chocolat"));
  }, [layers]);

  const handleFillingChange = (layerIndex, filling) => {
    const updated = [...fillingsByLayer];
    updated[layerIndex] = filling;
    setFillingsByLayer(updated);
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>Génoise & Garniture</h2>
      <p style={styles.subtitle}>
        Choisissez une garniture pour chaque couche ({layers} couches)
      </p>

      {/* Génoise */}
      <div style={styles.section}>
        <p style={styles.label}>Saveur de la génoise</p>

        <div style={styles.options}>
          {SPONGE_FLAVORS.map((flavor) => (
            <button
              key={flavor}
              onClick={() => setSelectedSponge(flavor)}
              style={{
                ...styles.option,
                ...(selectedSponge === flavor ? styles.selected : {}),
              }}
            >
              {flavor}
            </button>
          ))}
        </div>
      </div>

      {/* Garnitures par couche */}
      {fillingsByLayer.map((selected, index) => (
        <div key={index} style={styles.section}>
          <p style={styles.label}>Couche {index + 1}</p>

          <div style={styles.options}>
            {FILLINGS.map((filling) => (
              <button
                key={filling}
                onClick={() => handleFillingChange(index, filling)}
                style={{
                  ...styles.option,
                  ...(selected === filling ? styles.selected : {}),
                }}
              >
                {filling}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div style={styles.footer}>
        <button style={styles.backBtn} onClick={onBack}>
          Retour
        </button>

        <button
          style={styles.continueBtn}
          onClick={() =>
     onNext({
  selectedSponge,
  fillingsByLayer,
})
          }
        >
          Continuer <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}

/* ─── STYLES ─── */

const styles = {
  container: {
    background: "#fff",
    borderRadius: 20,
    padding: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#777",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    marginBottom: 10,
    fontWeight: 500,
  },
  options: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  option: {
    padding: "8px 14px",
    borderRadius: 20,
    border: "1px solid #ddd",
    background: "#eee",
    cursor: "pointer",
    fontSize: 13,
  },
  selected: {
    background: "#f4c27a",
    border: "1px solid #e0a95c",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
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