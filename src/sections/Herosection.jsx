import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import HeroCakeScene from "./HereCakeScene";
import { Sparkles} from "lucide-react";
export default function HeroSection({ onBrowseShops }) {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      {/* Background Decor */}
      <div className="hero-blob-1" />
      <div className="hero-blob-2" />

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          

     <h1 className="hero-title">
  Créez, <span className="text-accent">visualisez en 3D</span>,<br />
  et<span className="text-accent"> savourez</span>
</h1>
        <p className="hero-description">
  La première plateforme qui connecte vos designs uniques aux talents des pâtissiers de votre wilaya.
  <br />
  <span style={{ display: "inline-block", marginTop: "10px", fontWeight: 600, color: "#6B7280" }}>
    Votre imagination est la seule limite.
  </span>
</p>

          <div className="hero-actions">
            <Button size="lg" variant="primary" onClick={() => navigate("/delivery")}>
              Commencer à créer
            </Button>
            <Button size="lg" variant="outline" onClick={onBrowseShops}>
              Explorer les pâtisseries
            </Button>
          </div>

          {/* New App "Features" instead of fake stats */}
       <div className="hero-features">
  <div className="feature-item">
    <Sparkles size={18} className="feature-icon" />
    100% Personnalisable
  </div>

</div>
        </div>

        {/* Right 3D Scene */}
        <div className="hero-visual">
          <div className="scene-bg-glow" />
          <HeroCakeScene />
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          background: #ffffff;
          padding: 80px 5%;
          overflow: hidden;
          min-height: 95vh;
          display: flex;
          align-items: center;
        }

        .hero-blob-1 {
          position: absolute;
          top: -10%;
          right: -5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(200,25,74,0.04) 0%, transparent 70%);
          z-index: 1;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: #fff0f3;
          border-radius: 50px;
          color: #C8194A;
          font-weight: 600;
          font-size: 13px;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: #C8194A;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 5.5vw, 68px);
          line-height: 1.1;
          color: #1a1a2e;
          margin: 0 0 20px 0;
          font-weight: 800;
        }

        .text-accent {
          color: #C8194A;
        }

        .hero-description {
          font-size: 18px;
          color: #555;
          line-height: 1.6;
          max-width: 480px;
          margin-bottom: 35px;
        }

        .hero-actions {
          display: flex;
          gap: 15px;
          margin-bottom: 45px;
        }

        .hero-features {
          display: flex;
          gap: 25px;
          flex-wrap: wrap;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
          opacity: 0.8;
        }

        .hero-visual {
          position: relative;
          height: 550px;
          width: 100%;
          transition: transform 0.3s ease;
        }

        .scene-bg-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(200,25,74,0.08) 0%, transparent 70%);
          z-index: -1;
        }

        /* 📱 RESPONSIVE DESIGN */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 20px;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            order: 2; /* Text moves below cake on mobile */
          }
          .hero-visual {
            height: 400px;
            order: 1;
          }
          .hero-actions {
            justify-content: center;
            width: 100%;
          }
          .hero-features {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-actions {
            flex-direction: column;
          }
          .hero-title {
            font-size: 38px;
          }
        }

        /* Animations */
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}