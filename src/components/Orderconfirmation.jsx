import React, { useState } from "react";
import {
  Cake,
  User,
  Phone,
  Calendar,
  Check,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    cake,
    frostingColor,
    decor,
    fillingsByLayer,
    selectedPatisserie,
    totalPrice,
  } = location.state || {};

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patisserieId: selectedPatisserie,
          cake: {
            ...cake,
            frostingColor,
            decor,
            fillingsByLayer,
          },
          customer: form,
          deliveryDate: selectedDate,
          totalPrice,
        }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch (err) {
      alert("Erreur lors de la validation.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    form.fullName && form.phone && form.address && selectedDate;

  if (submitted) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="success-screen">
          <div className="success-card">
            <div className="success-icon-wrapper">
              <Check size={32} color="#fff" />
            </div>
            <h2>Commande confirmée 🎉</h2>
            <p>Merci <b>{form.fullName}</b>, votre pâtissier a été notifié.</p>
            <button onClick={() => navigate("/")} className="confirm-btn">
              Retour à l'accueil
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="confirmation-main">
        <div className="container">

          <button onClick={() => navigate(-1)} className="btn-back">
            <ArrowLeft size={16} /> Retour
          </button>

          <header className="page-header">
            <h1>Finaliser la commande</h1>
            <p>Vérifiez tous les détails de votre gâteau</p>
          </header>

          <div className="order-grid">

            {/* FORM */}
            <div className="form-section">

              <section className="info-card">
                <div className="card-title">
                  <User size={18} />
                  <h3>Vos Coordonnées</h3>
                </div>

                <div className="form-group">
                  <label>Nom Complet</label>
                  <input name="fullName" onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Téléphone</label>
                  <input name="phone" onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Adresse</label>
                  <input name="address" onChange={handleChange} />
                </div>
              </section>

              <section className="info-card">
                <div className="card-title">
                  <Calendar size={18} />
                  <h3>Date de Livraison</h3>
                </div>

                <div className="form-group">
                  <input
                    type="date"
                    value={selectedDate}
                    min={getMinDate()}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </section>

            </div>

            {/* SUMMARY (UNCHANGED STRUCTURE) */}
            <aside className="summary-section">
  <div className="sticky-card">
    <div className="info-card summary-card">
      <div className="summary-header">
        <div className="summary-icon-box">
          <Cake size={20} color="#C8194A" />
        </div>
        <h3>Récapitulatif</h3>
      </div>

      <div className="summary-list">
        {/* Informations de base */}
        <div className="summary-row">
          <span className="s-label">Gâteau</span>
          <span className="s-value">{cake?.name || "Format Mini"}</span>
        </div>
        <div className="summary-row">
          <span className="s-label">Personnes</span>
          <span className="s-value">{cake?.people || "2"}</span>
        </div>
        <div className="summary-row">
          <span className="s-label">Étages</span>
          <span className="s-value">{cake?.layers || "2"}</span>
        </div>
        <div className="summary-row">
          <span className="s-label">Génoise</span>
          <span className="s-value">{cake?.sponge || "Chocolat"}</span>
        </div>

        {/* Glaçage avec indicateur visuel */}
        <div className="summary-row align-center">
          <span className="s-label">Glaçage</span>
          <div className="visual-badge">
            <div 
              className="color-dot large" 
              style={{ background: frostingColor || "#ffffff", border: "1px solid #e2e8f0" }} 
            />
          </div>
        </div>

        <div className="summary-divider"></div>

        {/* Décoration dynamique */}
        <div className="summary-row column">
          <span className="s-label">Décoration</span>
          <div className="decor-list">
            {decor?.types?.length ? (
              decor.types.map((item, i) => (
                <div key={i} className="decor-item">
                  <span className="s-value">{item}</span>
                  <div 
                    className="color-dot small" 
                    style={{ background: decor?.colors?.[item] || "#C8194A" }} 
                  />
                </div>
              ))
            ) : (
              <span className="s-value italic">Décoration standard</span>
            )}
          </div>
        </div>

        {/* Garnitures par couches */}
        <div className="summary-row column">
          <span className="s-label">Garnitures</span>
          <div className="filling-grid">
            {fillingsByLayer?.some(f => f) ? (
              fillingsByLayer.map((f, i) => f && (
                <div key={i} className="filling-tag">
                  <span className="layer-num">L{i + 1}</span>
                  <span className="filling-name">{f}</span>
                </div>
              ))
            ) : (
              <span className="s-value italic">Aucune garniture</span>
            )}
          </div>
        </div>
      </div>

      <div className="summary-divider"></div>

      <div className="total-display">
        <span className="total-title">PRIX TOTAL</span>
        <div className="total-price-val">
          {totalPrice?.toLocaleString() || "6 350"} DA
        </div>
      </div>

      <button
        className="confirm-btn"
        disabled={!isFormValid || loading}
        onClick={handleSubmit}
      >
        {loading ? "Traitement..." : "Confirmer la commande"}
        {!loading && <ChevronRight size={18} />}
      </button>
    </div>
  </div>
</aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}