import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HeroSection from "./sections/Herosection";
import Howitworkssection from "./sections/Howitworkssection";
import PastriesSection from "./sections/PastriesSection";
import PartnersSection from "./sections/PartnersSection";
import FeaturesSection from "./sections/FeaturesSection";
import CTASection from "./sections/Ctasection";
import BakeryPartnerSection from "./sections/Bakerypartnersection";

import {
  partnersData,
  pastriesData,
  featuresData,
  stepsData,
} from "./data/mockData";



export default function Home() {

  const [partners, setPartners] = useState([]);
  const [pastries, setPastries] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

      
        await new Promise((resolve) => setTimeout(resolve, 600));
        setPartners(partnersData);
        setPastries(pastriesData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleStartDesigning = () => {
  navigate("/cake-builder");
};

  const handleBrowseShops = () => {
    // TODO: navigate to /partners
    document.getElementById("partners")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewPartner = (partner) => {
    // TODO: navigate to /partners/:id
    console.log("View partner:", partner.id);
  };

  const handleCustomize = (pastry) => {
    console.log("Customize pastry:", pastry.id);
  };

  const handleBePartner = () => {
    console.log("Navigate to partner signup");
  };

  const handleLogin = () => {
    console.log("Open login");
  };

  const handleSignup = () => {
    console.log("Open signup");
  };

  // ── Render ───────────────────────────────────
  return (
    <div style={pageStyles.root}>
      {/* Global font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        body {
          margin: 0;
          padding: 0;
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        @media (max-width: 900px) {
          /* Responsive hero */
          .hero-inner { grid-template-columns: 1fr !important; }
          .hero-image-wrapper { display: none !important; }

          /* Responsive steps */
          .steps-row { flex-direction: column !important; }
          .connector { display: none !important; }

          /* Responsive bakery card */
          .bakery-card { grid-template-columns: 1fr !important; }

          /* Responsive footer */
          .footer-top { grid-template-columns: 1fr !important; }
          .footer-columns { grid-template-columns: 1fr 1fr !important; }

          /* Mobile nav hamburger visible */
          nav button[aria-label="Toggle menu"] { display: flex !important; }
          nav ul { display: none !important; }
          nav .auth-buttons { display: none !important; }
        }

        @media (max-width: 600px) {
          .footer-columns { grid-template-columns: 1fr !important; }
        }

        /* Smooth hover effects */
        button:hover { filter: brightness(0.95); }
        a:hover { opacity: 0.8; }
      `}</style>

      <Navbar onLogin={handleLogin} onSignup={handleSignup} />

      <main>
        <HeroSection
          onStartDesigning={handleStartDesigning}
          onBrowseShops={handleBrowseShops}
        />

        <Howitworkssection steps={stepsData} />

       

        
  <div id="pastries">
          <PastriesSection
            pastries={pastries}
            onCustomize={handleCustomize}
            loading={loading}
          />
        </div>
        <FeaturesSection features={featuresData} />

        <BakeryPartnerSection onBePartner={handleBePartner} />
      </main>

      <Footer />
    </div>
  );
}

const pageStyles = {

  root: {
     height: "100vh",
  width: "100vw",
    background: "#fff",
     position: "relative",
  },
}; 