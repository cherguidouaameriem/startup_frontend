import React from 'react';
import './Livraison.css';
import { MapPin, Store, Palette, Info, ChevronRight, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import Button from './button';
const SelectWilayaPage = () => {
  const navigate = useNavigate(); // ✅ ici

  const handleSelectWilaya = (wilaya) => {
    navigate(`/bakers?wilaya=${wilaya}`);
  };

  return (
    <div className="page-container">
      <Navbar />

      <main className="main-content">

      

        <div className="header-section">
          <div className="icon-badge"><MapPin size={24} /></div>
          <h1 className="page-title">Choisissez votre wilaya</h1>
          <p className="page-subtitle">
            Sélectionnez la ville où vous souhaitez recevoir votre gâteau
          </p>
        </div>

        <div className="info-alert">
          <div className="info-icon-small">
            <Info size={12} strokeWidth={3} />
          </div>
          <p style={{ margin: 0, fontSize: '14px' }}>
            <strong>Lancement à Oran.</strong>
          </p>
        </div>

        <div className="wilaya-grid-container">
          <div className="wilaya-grid">

            {/* ✅ ORAN */}
            <div
              className="wilaya-card active"
              onClick={() => handleSelectWilaya("Oran")}
            >
              <div>
                <h3 className="wilaya-name">Oran</h3>
                <p className="wilaya-status">2 Pâtissiers</p>
              </div>
              <ChevronRight size={18} color="#D4A373" />
            </div>

            {/* ❌ Disabled */}
            <div className="wilaya-card disabled">
              <div>
                <h3 className="wilaya-name">Alger</h3>
                <p className="wilaya-status">Bientôt</p>
              </div>
            </div>

          </div>
        </div>

        <Button 
  className="back-btn"
  onClick={() => navigate("/")}
>
  <ArrowLeft size={16} /> Retour à l'accueil
</Button>

      </main>

      <Footer />
    </div>
  );
};

export default SelectWilayaPage;