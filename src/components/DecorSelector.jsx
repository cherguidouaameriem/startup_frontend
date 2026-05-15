import { useNavigate } from "react-router-dom";

const DECORS = [
  "pouchage 1",
  "Décoration de gâteau",
  "Chocolate",
];

const COLORS = [
  "#C8194A",
  "#f5e6c8",
  "#5a3825",
  "#e89aa4",
  "#d4a64a",
];

export default function DecorSelector({
  decor,
  setDecor,
  onBack,
  selectedCake,
  frostingColor,
  selectedPatisserie,
  totalPrice,   // ✅ ADD THIS
}){
  const navigate = useNavigate();

  const toggleDecor = (item) => {
    const current = decor.types || [];

    let updated;

    if (current.includes(item)) {
      updated = current.filter((d) => d !== item);
    } else {
      if (current.length >= 2) {
        alert("Maximum 2 décorations");
        return;
      }
      updated = [...current, item];
    }

    setDecor({
      ...decor,
      types: updated,
    });
  };

  const handleColorChange = (item, color) => {
    setDecor({
      ...decor,
      colors: {
        ...decor.colors,
        [item]: color,
      },
    });
  };

  const handleNext = () => {
    if (!selectedCake) {
      alert("Veuillez choisir un gâteau");
      return;
    }

    const { component, ...safeCake } = selectedCake;

  navigate("/order-confirmation", {
  state: {
    selectedCake: safeCake,
    frostingColor,
    decor,
    selectedPatisserie,
    totalPrice, // 🔥 ADD THIS
  },
});
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Décorations</h2>
      <p style={styles.subtitle}>
        Ajoutez la touche finale à votre gâteau
      </p>

      {/* DECORS */}
      <div style={styles.options}>
        {DECORS.map((item) => (
          <button
            key={item}
            onClick={() => toggleDecor(item)}
            style={{
              ...styles.option,
              ...(decor.types?.includes(item) ? styles.selected : {}),
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* 🎨 COLORS PER DECOR */}
      {decor.types?.map((item) => (
        <div key={item} style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 12 }}>{item}</p>

          <div style={{ display: "flex", gap: 8 }}>
            {COLORS.map((c) => (
              <div
                key={c}
                onClick={() => handleColorChange(item, c)}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: c,
                  cursor: "pointer",
                  border:
                    decor.colors?.[item] === c
                      ? "3px solid black"
                      : "2px solid #eee",
                }}
              />
            ))}
          </div>
        </div>
      ))}

      {/* TEXT */}
      <div style={styles.inputBox}>
        <label>Texte personnalisé</label>
        <input
          value={decor.text || ""}
          onChange={(e) =>
            setDecor({
              ...decor,
              text: e.target.value,
            })
          }
          placeholder="ex: Joyeux anniversaire !"
          style={styles.input}
        />
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <button onClick={onBack} style={styles.backBtn}>
          Retour
        </button>

        <button onClick={handleNext} style={styles.orderBtn}>
          Suivant
        </button>
      </div>
    </div>
  );
}
const styles = {
  container: {
    background: "#fff",
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },

  title: { fontSize: 22, fontWeight: 600, marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#888", marginBottom: 20 },

  options: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  option: {
    padding: "8px 14px",
    borderRadius: 20,
    border: "1px solid #ddd",
    background: "#f9f9f9",
    cursor: "pointer",
    fontSize: 13,
  },

  selected: {
    background: "#C8194A",
    color: "#fff",
    border: "1px solid #C8194A",
  },

  selectedList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 20,
  },

  selectedItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff0f4",
    padding: "8px 12px",
    borderRadius: 10,
    fontSize: 13,
  },

  deleteBtn: {
    background: "none",
    border: "none",
    color: "#C8194A",
    cursor: "pointer",
    fontWeight: "bold",
  },

  inputBox: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 20,
  },

  input: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    outline: "none",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
  },

  backBtn: {
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    background: "#eee",
    cursor: "pointer",
  },

  orderBtn: {
    padding: "10px 18px",
    borderRadius: 10,
    border: "none",
    background: "#C8194A",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
};