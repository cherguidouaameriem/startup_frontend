import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HeroSection from "./sections/Herosection";
import Howitworkssection from "./sections/Howitworkssection";
import PastriesSection from "./sections/Pastriessection";
import FeaturesSection from "./sections/Featuressection";
import CTASection from "./sections/Ctasection";
import BakeryPartnerSection from "./sections/Bakerypartnersection";
import PartnersSection from "./sections/Partnerssection";
export default function Home() {
  const navigate = useNavigate();

  const [partners] = useState([]); // will come from backend later
  const [pastries] = useState([]); // will come from backend later
  const [loading] = useState(false);

  const handleStartDesigning = () => {
    navigate("/cake-builder");
  };

  const handleBrowseShops = () => {
    document.getElementById("partners")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewPartner = (partner) => {
    console.log("View partner:", partner?.id);
  };

  const handleCustomize = (pastry) => {
    console.log("Customize pastry:", pastry?.id);
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

  return (
    <div style={pageStyles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        body {
          margin: 0;
          padding: 0;
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      <Navbar onLogin={handleLogin} onSignup={handleSignup} />

      <main>
        <HeroSection
          onStartDesigning={handleStartDesigning}
          onBrowseShops={handleBrowseShops}
        />

        {/* IMPORTANT: NO fake data passed */}
        <Howitworkssection />

        <div id="pastries">
          <PastriesSection
            pastries={pastries}
            onCustomize={handleCustomize}
            loading={loading}
          />
        </div>

        <FeaturesSection />

        <BakeryPartnerSection onBePartner={handleBePartner} />
      </main>

      <Footer />
    </div>
  );
}

const pageStyles = {
  root: {
    minHeight: "100vh",
    width: "100vw",
    background: "#fff",
    position: "relative",
  },
};