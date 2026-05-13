import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Button from "../components/button";
import HeroCakeScene from "./HereCakeScene";

export default function HeroSection({ onBrowseShops }) {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* --- PARTIE GAUCHE : TEXTE & ACTIONS --- */}
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          

          <h1 className="hero-title">
            Créez, <span className="text-accent">visualisez en</span>
            <br />
            <span className="text-accent">3D</span>, et <span className="text-accent">savourez</span>
          </h1>

          <p className="hero-description">
            La première plateforme qui connecte vos designs uniques 
            aux talents des meilleurs pâtissiers de votre wilaya.
            <span className="hero-bold-tagline">Votre imagination est la seule limite.</span>
          </p>

          <div className="hero-actions">
            <Button size="lg" className="btn-primary-custom" onClick={() => navigate("/delivery")}>
              Commencer à créer <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </Button>
            <Button size="lg" variant="outline" className="btn-outline-custom" onClick={onBrowseShops}>
              Explorer les pâtisseries
            </Button>
          </div>
        </motion.div>

        {/* --- PARTIE DROITE : SCÈNE 3D & BLOBS --- */}
        <div className="hero-visual">
          {/* Blobs vaporeux inspirés de image_3b9490.png */}
          <div className="vaporeux-blob blob-red" />
          <div className="vaporeux-blob blob-blue" />
          <div className="center-glow" />

        
          <HeroCakeScene />
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 0 5%;
        }

        .hero-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
          z-index: 2;
        }

        /* --- TYPOGRAPHIE (Image 2) --- */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 20px;
          background: #FFF0F3;
          border-radius: 100px;
          color: #C8194A;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 25px;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #C8194A;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(200, 25, 74, 0.4);
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(50px, 6vw, 86px);
          line-height: 1.05;
          font-weight: 800;
          color: #1a1a2e;
          margin: 0 0 25px 0;
        }

        .text-accent {
          color: #C8194A;
        }

        .hero-description {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          color: #555;
          line-height: 1.6;
          max-width: 550px;
          margin-bottom: 40px;
        }

        .hero-bold-tagline {
          display: block;
          margin-top: 15px;
          font-weight: 800;
          color: #1a1a2e;
        }

        .hero-actions {
          display: flex;
          gap: 20px;
        }

        /* --- VISUEL ET BACKGROUND (Image 1) --- */
        .hero-visual {
          position: relative;
          height: 650px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vaporeux-blob {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          z-index: -1;
        }

        .blob-red {
          top: 0;
          left: 0;
          background: #C8194A;
        }

        .blob-blue {
          bottom: 10%;
          right: -10%;
          background: #4361EE;
          width: 600px;
          height: 600px;
        }

        .center-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
          z-index: -1;
        }

        .floating-review {
          position: absolute;
          top: 30%;
          right: 5%;
          background: white;
          padding: 12px 20px;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 10;
          font-weight: 700;
          font-size: 14px;
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 1100px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            padding-top: 100px;
          }
          .hero-content {
            order: 2;
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          .hero-visual {
            order: 1;
            height: 450px;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .vaporeux-blob {
            width: 300px;
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
}