import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/button";
import { API } from "../api";
import {
  MapPin,
  Globe,
  Instagram,
  Phone,
  Mail,
  BadgeCheck,
  Star,
  ArrowLeft,
} from "lucide-react";

export default function BakerProfile() {
  const { bakerId } = useParams();
  const navigate = useNavigate();

  const [baker, setBaker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBaker = async () => {
      try {
        const res = await fetch(`${API}/api/partners/${bakerId}`);
        const data = await res.json();
        setBaker(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBaker();
  }, [bakerId]);

  if (loading) {
    return <div style={styles.loading}>Chargement...</div>;
  }

  if (!baker) {
    return <div style={styles.loading}>Pâtisserie introuvable</div>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* BACK BUTTON */}
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <ArrowLeft size={18} />
          Retour
        </button>

        {/* HEADER */}
        <div style={styles.card}>
          <div style={styles.cover}>
            {baker.logoFile && (
              <img
                src={`${API}/uploads/${baker.logoFile}`}
                alt={baker.shopName}
                style={styles.avatar}
              />
            )}
          </div>

          {/* INFO */}
          <div style={styles.content}>
            <h1 style={styles.title}>{baker.shopName}</h1>

            <div style={styles.row}>
              <MapPin size={16} />
              <span>{baker.wilaya} — {baker.shopAddress}</span>
            </div>

            <p style={styles.desc}>
              {baker.description || "Artisan pâtissier passionné"}
            </p>

            {/* BADGES 
            <div style={styles.badges}>
              <span style={styles.badge}>
                <BadgeCheck size={14} /> {baker.plan}
              </span>
              
            </div>*/}

            {/* CONTACT */}
            <div style={styles.contactGrid}>
              {baker.phone && (
                <div style={styles.cardInfo}>
                  <Phone size={16} />
                  {baker.phone}
                </div>
              )}

              {baker.email && (
                <div style={styles.cardInfo}>
                  <Mail size={16} />
                  {baker.email}
                </div>
              )}

              {baker.instagram && (
                <a
                  href={`https://instagram.com/${baker.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.cardInfo}
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              )}

              {baker.website && (
                <a
                  href={baker.website}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.cardInfo}
                >
                  <Globe size={16} />
                  Website
                </a>
              )}
            </div>

            {/* CTA */}
            <Button
              variant="primary"
              onClick={() =>
                navigate(`/cake-builder/${bakerId}?skip=true`)
              }
              style={{ marginTop: 20 }}
            >
              Commencer mon gâteau
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #fff7f9 0%, #ffffff 100%)",
    padding: "60px 20px",
    fontFamily: "Inter, sans-serif",
  },

  container: {
    maxWidth: 1000,
    margin: "0 auto",
  },

  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    marginBottom: 20,
    color: "#555",
    fontWeight: 500,
  },

  card: {
    background: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease",
  },

  cover: {
    height: 260,
    background: "linear-gradient(135deg, #fce4ec, #fff0f4)",
    position: "relative",
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    objectFit: "cover",
    border: "6px solid white",
    position: "absolute",
    bottom: -70,
    left: 50,
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    transition: "transform 0.3s ease",
  },

  content: {
    padding: "90px 50px 50px",
  },

  title: {
    fontSize: 38,
    fontWeight: 800,
    color: "#1a1a2e",
    marginBottom: 10,
    fontFamily: "'Playfair Display', serif",
  },

  row: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#666",
    marginBottom: 15,
  },

  desc: {
    fontSize: 16,
    color: "#555",
    lineHeight: 1.8,
    maxWidth: 700,
    marginBottom: 25,
  },

  badges: {
    display: "flex",
    gap: 10,
    marginBottom: 25,
    flexWrap: "wrap",
  },

  badge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#f1f5f9",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
  },

  badgeStatus: {
    background: "#C8194A",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
  },

  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 12,
    marginTop: 10,
  },

  cardInfo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 14px",
    borderRadius: 12,
    background: "#fafafa",
    textDecoration: "none",
    color: "#333",
    fontSize: 14,
    transition: "0.2s",
  },

  loading: {
    padding: 40,
    textAlign: "center",
    color: "#666",
  },
};