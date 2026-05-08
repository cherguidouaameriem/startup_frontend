import { useState, useEffect } from "react";
import Icon from "../components/Icon";
import Button from "../components/button";



function StarRating({ rating }) {
  return (
    <span style={ratingStyles.wrapper}>
      <Icon name="star" size={14} color="#f59e0b" />
      <span style={ratingStyles.text}>{rating}</span>
    </span>
  );
}

function PartnerCard({ partner, onView }) {
  console.log("Données reçues pour :", partner.shopName);
  console.log("Nom du fichier logo :", partner.logoFile);

  const [hovered, setHovered] = useState(false);

  // Construction de l'URL de l'image
const imageUrl = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500";
  return (
    <div
      style={{
        ...cardStyles.card,
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered
          ? "0 12px 40px rgba(200,25,74,0.14)"
          : "0 2px 16px rgba(200,25,74,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Zone Image */}
      <div style={cardStyles.imageArea}>
        {imageUrl ? (
        <img
  src={imageUrl}
  alt={partner.shopName}
  style={{ ...cardStyles.image, border: '5px solid red', minHeight: '100px' }} 
  onLoad={() => console.log("L'image a chargé avec succès !")}
  onError={(e) => console.log("L'image a vraiment échoué ici")}
/>
        ) : (
          <div style={cardStyles.imagePlaceholder}>
            <Icon name="store" size={40} color="#e8a0b8" />
          </div>
        )}
      </div>

      {/* Info */}
      <div style={cardStyles.info}>
        <div style={cardStyles.nameRow}>
          <h3 style={cardStyles.name}>{partner.shopName || "Sans nom"}</h3>
          <StarRating rating={partner.rating || 4.5} />
        </div>

        {/* On utilise la description ou la spécialité du schéma */}
        <p style={cardStyles.specialty}>{partner.description || "Artisan Pâtissier"}</p>

        <div style={cardStyles.metaRow}>
          <span style={cardStyles.meta}>
            <Icon name="location" size={13} color="#aaa" />
            {/* On utilise wilaya et shopAddress du schéma */}
            {partner.wilaya} {partner.shopAddress ? `, ${partner.shopAddress}` : ""}
          </span>
        </div>

        <Button
          variant="secondary"
          size="sm"
          fullWidth
          onClick={() => onView && onView(partner)}
          style={{ marginTop: 4 }}
        >
          Voir la pâtisserie
        </Button>
      
      </div>
    </div>
  );
}
export default function PartnersSection({
  partners = [],
  onViewPartner,
  loading = false,
}) {
  // Ready for useEffect / API fetch — just pass data via props or fetch inside here
  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <div style={styles.tagRow}>
            <span style={styles.tag}>Our Partners</span>
          </div>
          <h2 style={styles.title}>
            Trusted Pastry <span style={styles.accent}>Shops Near You</span>
          </h2>
          <p style={styles.subtitle}>
            Browse our network of verified local bakeries and artisan pastry shops
          </p>
        </div>

        {loading ? (
          <div style={styles.loadingGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={styles.skeleton} />
            ))}
          </div>
        ) : (
          <div style={styles.grid}>
            {partners.map((partner) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                onView={onViewPartner}
              />
            ))}
          </div>
        )}

        <div style={styles.footer}>
          <Button variant="outline" size="md">
            View All Pastry Shops →
          </Button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#fff",
    padding: "80px 24px",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: 48,
  },
  tagRow: { marginBottom: 12 },
  tag: {
    display: "inline-block",
    background: "#fff0f4",
    color: "#C8194A",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "5px 14px",
    borderRadius: 100,
    border: "1px solid #fce4ec",
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 800,
    color: "#1a1a2e",
    margin: "0 0 12px",
  },
  accent: { color: "#C8194A" },
  subtitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 16,
    color: "#888",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 24,
  },
  loadingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 24,
  },
  skeleton: {
    height: 320,
    borderRadius: 16,
    background: "linear-gradient(90deg, #f5f0f2 25%, #ede8ea 50%, #f5f0f2 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
  },
  footer: {
    textAlign: "center",
    marginTop: 40,
  },
};

const cardStyles = {
  card: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #f0e8ec",
    overflow: "hidden",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "pointer",
  },
  imageArea: {
    height: 160,
    position: "relative",
    overflow: "hidden",
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
  verifiedBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "#C8194A",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    padding: "3px 10px",
    borderRadius: 100,
  },
  info: {
    padding: "20px 20px 22px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  nameRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  name: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 17,
    fontWeight: 700,
    color: "#1a1a2e",
    margin: 0,
    lineHeight: 1.3,
  },
  specialty: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: "#888",
    margin: 0,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  meta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    color: "#999",
  },
  reviews: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    color: "#bbb",
    marginLeft: "auto",
  },
};

const ratingStyles = {
  wrapper: {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    flexShrink: 0,
  },
  text: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "#1a1a2e",
  },
};