import { useState, useEffect } from "react";
import Icon from "../components/Icon";
import Button from "../components/button";
import { API } from "./api";
const CATEGORIES = ["Tous", "Oran", "Alger", "Autre"];

// ─── STAR ─────────────────────────────
function StarRating({ rating }) {
  return (
    <span style={ratingStyles.wrapper}>
      <Icon name="star" size={14} color="#f59e0b" />
      <span style={ratingStyles.text}>{rating || 4.5}</span>
    </span>
  );
}

// ─── CARD ─────────────────────────────
function PastryCard({ pastry, onView }) {
  return (
    <div style={cardStyles.card}>
      <div style={cardStyles.imageArea}>
        {pastry.logoFile ? (
          <img
            src={`${API}/uploads/${pastry.logoFile}`}
            alt={pastry.shopName}
            style={cardStyles.image}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div style={cardStyles.imagePlaceholder}>
            <Icon name="store" size={40} color="#e8a0b8" />
          </div>
        )}
      </div>

      <div style={cardStyles.info}>
        <h3 style={cardStyles.name}>{pastry.shopName}</h3>

        <StarRating rating={pastry.rating} />

        <p style={cardStyles.specialty}>{pastry.description}</p>

        <span style={cardStyles.meta}>{pastry.shopAddress}</span>

        <Button
          variant="secondary"
          size="sm"
          fullWidth
          onClick={() => onView?.(pastry)}
        >
          Voir la pâtisserie
        </Button>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────
export default function PastriesSection({ onViewPastry }) {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [pastries, setPastries] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const url =
          activeCategory === "Tous"
            ? `${API}/api/partners`
            : `${API}/api/partners?wilaya=${activeCategory}`;

        const res = await fetch(url);
        const data = await res.json();

        setPastries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCategory]);

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        {/* HEADER */}
        <h2 style={styles.title}>Nos pâtisseries</h2>

        {/* FILTER */}
        <div style={styles.filterRow}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.filterBtn,
                ...(activeCategory === cat
                  ? styles.filterBtnActive
                  : {}),
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div style={styles.grid}>
          {pastries.slice(0, 4).map((p) => {
  console.log(p);

  return (
    <PastryCard
      key={p._id}
      pastry={p}
      onView={onViewPastry}
    />
  );
})}
          </div>
        )}

        {/* VIEW MORE */}
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <Button variant="primary">Voir plus</Button>
        </div>
      </div>
    </section>
  );
}

// ─── Styles ─────────────────────────────
const styles = {
  section: {
    background: "#fdf6f8",
    padding: "80px 24px",
  },

  inner: {
    maxWidth: 1200,
    margin: "0 auto",
  },

  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 800,
    color: "#1a1a2e",
    margin: "0 0 30px",
    textAlign: "center",
  },

  filterRow: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 40,
  },

  filterBtn: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    padding: "8px 20px",
    borderRadius: 100,
    border: "1.5px solid #e0d0d8",
    background: "#fff",
    color: "#777",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  filterBtnActive: {
    background: "#C8194A",
    color: "#fff",
    border: "1.5px solid #C8194A",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 24,
  },
};

const cardStyles = {
  card: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #f0e8ec",
    overflow: "hidden",
  },

  imageArea: {
    height: 180,
    overflow: "hidden",
    background: "#fafafa",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  imagePlaceholder: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #fff0f4 0%, #fce4ec 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  info: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  name: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 18,
    fontWeight: 700,
    color: "#1a1a2e",
    margin: 0,
  },

  specialty: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: "#888",
    margin: 0,
  },

  meta: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    color: "#999",
  },
};

const ratingStyles = {
  wrapper: {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
  },

  text: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "#1a1a2e",
  },
};