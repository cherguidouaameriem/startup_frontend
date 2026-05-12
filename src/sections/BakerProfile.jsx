import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/button";
import { API } from "../api";

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
    return (
      <div style={{ padding: 40 }}>
        Chargement...
      </div>
    );
  }

  if (!baker) {
    return (
      <div style={{ padding: 40 }}>
        Pâtisserie introuvable
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff7f9",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
        }}
      >
        {/* COVER */}
        <div
          style={{
            height: 280,
            background:
              "linear-gradient(135deg, #fce4ec 0%, #fff0f4 100%)",
            position: "relative",
          }}
        >
          {baker.logoFile && (
            <img
              src={`${API}/uploads/${baker.logoFile}`}
              alt={baker.shopName}
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                objectFit: "cover",
                border: "6px solid white",
                position: "absolute",
                bottom: -70,
                left: 50,
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              }}
            />
          )}
        </div>

        {/* CONTENT */}
        <div
          style={{
            padding: "90px 50px 50px",
          }}
        >
          <h1
            style={{
              fontSize: 42,
              marginBottom: 10,
              color: "#1a1a2e",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {baker.shopName}
          </h1>

          <p
            style={{
              color: "#777",
              fontSize: 16,
              marginBottom: 20,
            }}
          >
            📍 {baker.wilaya} — {baker.shopAddress}
          </p>

          <p
            style={{
              color: "#555",
              lineHeight: 1.8,
              fontSize: 17,
              maxWidth: 700,
              marginBottom: 35,
            }}
          >
            {baker.description || "Artisan pâtissier passionné"}
          </p>

          {/* SOCIALS */}
          <div
            style={{
              display: "flex",
              gap: 15,
              flexWrap: "wrap",
              marginBottom: 35,
            }}
          >
            {baker.instagram && (
              <a
                href={`https://instagram.com/${baker.instagram}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#C8194A",
                  fontWeight: 600,
                }}
              >
                Instagram
              </a>
            )}

            {baker.website && (
              <a
                href={baker.website}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#C8194A",
                  fontWeight: 600,
                }}
              >
                Website
              </a>
            )}
          </div>

          <Button
            variant="primary"
            onClick={() =>
              navigate(`/cake-builder/${bakerId}?skip=true`)
            }
          >
            Commencer mon gâteau
          </Button>
        </div>
      </div>
    </div>
  );
}