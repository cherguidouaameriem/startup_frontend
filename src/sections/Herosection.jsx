import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../components/button";
import HeroCakeScene from "./HereCakeScene";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">

        {/* LEFT CONTENT */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="hero-title">
            <span className="title-line">Créez,</span>

            <span className="title-line middle-line">
              <span className="text-accent">visualisez en</span>

              <span className="title-3d">3D</span>
            </span>

            <span className="title-line">
              et <span className="text-accent">savourez</span>
            </span>
          </h1>

          <p className="hero-description">
            La première plateforme qui connecte vos designs uniques
            aux talents des meilleurs pâtissiers de votre wilaya.

            <span className="hero-bold-tagline">
              Votre imagination est la seule limite.
            </span>
          </p>

          <div className="hero-actions">
            <Button
              size="lg"
              className="btn-primary-custom"
              onClick={() => navigate("/delivery")}
            >
              Commencer à créer
              <ArrowRight size={20} style={{ marginLeft: "8px" }} />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="btn-outline-custom"
              onClick={() => navigate("/pastry-shops")}
            >
              Explorer les pâtisseries
            </Button>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <div className="hero-visual">
          <div className="vaporeux-blob blob-red" />
          <div className="vaporeux-blob blob-blue" />
          <div className="center-glow" />

          <HeroCakeScene />
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap');

        .hero-section {
          position: relative;
          min-height: 100svh;
          background: white;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 40px 5%;
        }

        .hero-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
        }

        /* TEXT SIDE */

        .hero-content {
          z-index: 2;
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          gap: 12px;

          margin: 0 0 28px;

          font-family: 'Playfair Display', serif;
          font-size: clamp(48px, 6vw, 88px);
          font-weight: 500;

          line-height: 1.05;
          letter-spacing: -1px;

          color: #1a1a2e;
        }

        .title-line {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 14px;
        }

        .middle-line {
          align-items: flex-end;
        }

        .text-accent {
          color: #c8194a;
        }

        .title-3d {
          display: inline-block;

          font-size: clamp(54px, 7vw, 95px);
          font-weight: 700;

          color: #c8194a;

          line-height: 1;

          text-shadow:
            0 1px 0 #b51642,
            0 2px 0 #aa143d,
            0 3px 0 #9c1238,
            0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .hero-description {
          max-width: 580px;

          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          line-height: 1.7;

          color: #555;

          margin-bottom: 40px;
        }

        .hero-bold-tagline {
          display: block;
          margin-top: 16px;

          font-weight: 800;
          color: #1a1a2e;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 18px;
        }

        /* VISUAL */

        .hero-visual {
          position: relative;

          width: 100%;
          height: 650px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vaporeux-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.16;
          z-index: -1;
        }

        .blob-red {
          width: 420px;
          height: 420px;

          top: 0;
          left: 0;

          background: #c8194a;
        }

        .blob-blue {
          width: 520px;
          height: 520px;

          bottom: 0;
          right: -10%;

          background: #4361ee;
        }

        .center-glow {
          position: absolute;
          inset: 0;

          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.85) 0%,
            transparent 70%
          );

          z-index: -1;
        }

        /* TABLET */

        @media (max-width: 1100px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 20px;
          }

          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            order: 2;
          }

          .hero-visual {
            order: 1;
            height: 480px;
          }

          .hero-description {
            max-width: 700px;
          }

          .hero-actions {
            justify-content: center;
          }
        }

        /* MOBILE */

        @media (max-width: 768px) {
          .hero-section {
            padding: 100px 20px 50px;
          }

          .hero-title {
            font-size: clamp(40px, 11vw, 62px);
            gap: 10px;
          }

          .title-line {
            justify-content: center;
            gap: 10px;
          }

          .title-3d {
            font-size: clamp(44px, 12vw, 70px);
          }

          .hero-description {
            font-size: 17px;
          }

          .hero-actions {
            width: 100%;
            flex-direction: column;
          }

          .hero-actions button {
            width: 100%;
          }

          .hero-visual {
            height: 360px;
          }

          .blob-red,
          .blob-blue {
            width: 260px;
            height: 260px;
          }
        }
      `}</style>
    </section>
  );
}