import React, { useEffect, useState } from 'react';
import {
  MapPin,
  Store,
  Star,
  CheckCircle,
  Eye,
  ArrowLeft,
} from 'lucide-react';

import { useLocation, useNavigate } from 'react-router-dom';
import './BakersList.css';

import { API } from "../api";

import Navbar from './Navbar';
import Footer from './Footer';
import Button from './button';

const BakerSelectionPage = () => {
  const [bakers, setBakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBaker, setSelectedBaker] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // 📍 get wilaya from URL
  const queryParams = new URLSearchParams(location.search);
  const wilaya = queryParams.get("wilaya");

  // 🔥 fetch bakers
  useEffect(() => {
    const fetchBakers = async () => {
      try {
        const res = await fetch(
          `${API}/api/partners?wilaya=${wilaya}`
        );

        const data = await res.json();
        setBakers(data);

      } catch (err) {
        console.error("Erreur fetch:", err);

      } finally {
        setLoading(false);
      }
    };

    if (wilaya) {
      fetchBakers();
    }
  }, [wilaya]);

  // 🔄 loading
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <p>Chargement des pâtissiers...</p>
      </div>
    );
  }

  return (
    <div className="baker-page-container">
      <Navbar />

      <main className="baker-main">

        {/* 📍 WILAYA */}
        <div className="location-badge">
          <MapPin size={14} /> {wilaya}
        </div>

        {/* 🧁 TITLE */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '10px',
            }}
          >
            Choisissez votre pâtissier
          </h1>

          <p style={{ color: '#666' }}>
            {bakers.length} artisans disponibles à {wilaya}
          </p>
        </div>

        {/* ⭐ STARTUP GUIDE */}
        <div className="startup-guide-box">

          <div className="guide-badge">
            ⭐ Recommandation Startup
          </div>

          <h2>
            Nous vous recommandons <span>Sweet Cake</span>
          </h2>

          <p>
            Pour une première expérience optimale sur HalwaTech,
            nous vous conseillons de sélectionner Sweet Cake.
          </p>

          <button
            className="guide-select-btn"
            onClick={() => {

              const sweetCake = bakers.find(
                (b) =>
                  b.shopName?.toLowerCase().includes("sweet cake")
              );

              if (sweetCake) {

                setSelectedBaker(sweetCake._id);

                document
                  .getElementById(`baker-${sweetCake._id}`)
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
              }
            }}
          >
            Sélectionner Sweet Cake
          </button>
        </div>

        {/* ❌ NO BAKERS */}
        {bakers.length === 0 && (
          <p style={{ textAlign: 'center' }}>
            Aucun pâtissier disponible pour le moment
          </p>
        )}

        {/* 🍰 BAKERS */}
        <div className="results-grid-box">

          <div className="baker-grid">

            {bakers.map((baker) => (

              <div
                key={baker._id}
                id={`baker-${baker._id}`}
                className={`baker-card ${
                  baker.shopName?.toLowerCase().includes("sweet cake")
                    ? "recommended-baker"
                    : ""
                }`}
              >

                {/* HEADER */}
                <div className="card-header">

                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >

                    {/* LOGO */}
                    <div className="baker-icon-wrapper">

                      {baker.logoFile ? (
                        <img
                          src={`${API}/uploads/${baker.logoFile}`}
                          alt="logo"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                          }}
                        />
                      ) : (
                        <Store size={20} />
                      )}

                    </div>

                    <div>
                      <h3 className="baker-name">
                        {baker.shopName}
                      </h3>

                      <p className="baker-location">
                        {baker.shopAddress}
                      </p>
                    </div>

                  </div>

                  {/* ⭐ rating */}
                  <div className="rating-badge">
                    <Star
                      size={14}
                      fill="#C8194A"
                      stroke="none"
                    />

                    4.5
                  </div>

                </div>

                {/* BODY */}
                <div className="card-body">

                  {baker.description || "Pas de description"}

                  <div className="delivery-status">
                    <CheckCircle size={12} />
                    Disponible
                  </div>

                </div>

                {/* ACTIONS */}
                <div className="card-actions">

                  {/* 🔍 VIEW PAGE */}
                  <Button
                    variant="outline"
                    className="btn-view-page"
                    onClick={() =>
                      navigate(`/baker/${baker._id}`)
                    }
                  >
                    <Eye size={14} />
                    Voir la page
                  </Button>

                  {/* 🎂 SELECT */}
                  <Button
                    variant={
                      selectedBaker === baker._id
                        ? "primary"
                        : "outline"
                    }

                    className="btn-choose"

                    onClick={() =>
                      setSelectedBaker(baker._id)
                    }
                  >
                    {selectedBaker === baker._id
                      ? "Sélectionné ✓"
                      : "Choisir"}
                  </Button>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* 🔙 BOTTOM ACTIONS */}
        <div className="bottom-actions">

          <Button
            variant="outline"
            className="btn-back-wilaya"
            onClick={() => navigate("/delivery")}
          >
            <ArrowLeft size={16} />
            Wilaya
          </Button>

          <Button
            variant="secondary"
            disabled={!selectedBaker}
            onClick={() =>
              navigate(`/cake-builder/${selectedBaker}`)
            }
          >
            Créer mon gâteau
          </Button>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default BakerSelectionPage;