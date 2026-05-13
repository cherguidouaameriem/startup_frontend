import React, { useEffect, useState } from "react";
import { MapPin, Star, Clock, ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { API } from "../api";

const CITIES = ["Oran", "Alger", "Constantine", "Annaba"];

export default function Pastryshops() {
  const [selectedCity, setSelectedCity] = useState("Oran");
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH REAL DATA
  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API}/api/partners?wilaya=${selectedCity}`
        );
        const data = await res.json();
        setShops(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [selectedCity]);

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <MapPin style={styles.iconMain} />
          <h1 style={styles.title}>Nos Pâtisseries</h1>
          <p style={styles.subtitle}>
            Découvrez les meilleures pâtisseries près de chez vous
          </p>
        </div>

        {/* CITIES */}
        <div style={styles.grid}>
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              style={{
                ...styles.card,
                borderColor:
                  selectedCity === city ? "#C8194A" : "#e5e5e5",
                borderWidth: selectedCity === city ? "2px" : "1px",
              }}
            >
              <h2 style={styles.cityName}>{city}</h2>
              <p style={styles.cityStatus}>Voir les pâtisseries</p>
            </button>
          ))}
        </div>

        {/* SHOPS */}
        <div style={styles.shopSection}>
          <h2 style={styles.shopTitle}>
            Pâtisseries à {selectedCity}
          </h2>

          {loading ? (
            <p>Chargement...</p>
          ) : shops.length === 0 ? (
            <p>Aucune pâtisserie disponible.</p>
          ) : (
            <div style={styles.shopList}>
              {shops.map((shop) => (
                <div key={shop._id} style={styles.shopCard}>
                  <div style={{ flex: 1 }}>
                    <div style={styles.shopNameRow}>
                      <h3 style={styles.shopNameText}>
                        {shop.shopName}
                      </h3>

                      <div style={styles.ratingBadge}>
                        <Star size={14} fill="#f59e0b" />
                        <span style={styles.ratingText}>
                          {shop.rating || 4.5}
                        </span>
                      </div>
                    </div>

                    <p style={styles.shopSubText}>
                      {shop.shopAddress} • {shop.description}
                    </p>

                    <div style={styles.deliveryInfo}>
                      <Clock size={14} color="#C8194A" />
                      <span style={styles.deliveryText}>
                        Livraison disponible
                      </span>
                    </div>
                  </div>

                  <button style={styles.orderButton}>
                    Voir <ChevronRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ───────── STYLES RESPONSIVE ───────── */
const styles = {
  container: {
    fontFamily: "system-ui, sans-serif",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fafafa",
    minHeight: "100vh",
  },

  header: {
    textAlign: "center",
    marginBottom: 30,
  },

  iconMain: {
    color: "#C8194A",
    width: 40,
    height: 40,
    marginBottom: 10,
  },

  title: {
    fontSize: "2rem",
    fontWeight: 800,
  },

  subtitle: {
    color: "#666",
    fontSize: "1rem",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 12,
    width: "100%",
    maxWidth: 700,
    marginBottom: 30,
  },

  card: {
    background: "#fff",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #e5e5e5",
    cursor: "pointer",
    textAlign: "left",
    transition: "0.2s",
  },

  cityName: {
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
  },

  cityStatus: {
    fontSize: 12,
    color: "#777",
  },

  shopSection: {
    width: "100%",
    maxWidth: 800,
  },

  shopTitle: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 15,
  },

  shopList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  shopCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #eee",
  },

  shopNameRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  shopNameText: {
    margin: 0,
    fontSize: 16,
  },

  ratingBadge: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    background: "#fff4f4",
    padding: "2px 8px",
    borderRadius: 8,
  },

  ratingText: {
    fontSize: 12,
    fontWeight: 700,
  },

  shopSubText: {
    fontSize: 13,
    color: "#666",
  },

  deliveryInfo: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
  },

  deliveryText: {
    fontSize: 12,
    color: "#C8194A",
  },

  orderButton: {
    padding: "8px 14px",
    border: "1px solid #eee",
    borderRadius: 10,
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
};