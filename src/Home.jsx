import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HeroSection from "./sections/Herosection";
import Howitworkssection from "./sections/Howitworkssection";
import PastriesSection from "./sections/PastriesSection";
import FeaturesSection from "./sections/Featuressection";
import BakeryPartnerSection from "./sections/Bakerypartnersection";

export default function Home() {
  const navigate = useNavigate();

  const [partners] = useState([]);
  const [pastries] = useState([]);
  const [loading] = useState(false);

  const handleStartDesigning = () => {
    navigate("/cake-builder");
  };

  const handleBrowseShops = () => {
    document
      .getElementById("partners")
      ?.scrollIntoView({ behavior: "smooth" });
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
      <Navbar onLogin={handleLogin} onSignup={handleSignup} />

      <main>
        <HeroSection
          onStartDesigning={handleStartDesigning}
          onBrowseShops={handleBrowseShops}
        />

        <Howitworkssection />

        <div id="pastries">
          <PastriesSection
            pastries={pastries}
            onCustomize={handleCustomize}
            loading={loading}
          />
        </div>

        <FeaturesSection />

        <BakeryPartnerSection
          onBePartner={handleBePartner}
        />
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