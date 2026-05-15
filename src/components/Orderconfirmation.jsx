import React, { useState } from "react";
import { 
  Cake, User, Phone, MapPin, Clock, Check, 
  Truck, Calendar, ChevronRight, ArrowLeft
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
    selectedCake,
    frostingColor,
    decor,
    delivery,
    selectedPatisserie,
    totalPrice,
  } = location.state || {};

  const [form, setForm] = useState({ fullName: "", phone: "", address: "" });
  const [selectedDate, setSelectedDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
          cake: selectedCake,
          frostingColor,
          decor,
          customer: form,
          deliveryDate: selectedDate,
          totalPrice
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

  const isFormValid = form.fullName && form.phone && form.address && selectedDate;

  if (submitted) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="success-screen">
          <div className="success-card">
            <div className="success-icon-wrapper"><Check size={32} color="#fff" /></div>
            <h2>Commande confirmée 🎉</h2>
            <p>Merci <b>{form.fullName}</b>, votre pâtissier a été notifié.</p>
            <button onClick={() => navigate("/")} className="confirm-btn">Retour à l'accueil</button>
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
            <ArrowLeft size={16} /> Retour à l'édition
          </button>

          <header className="page-header">
            <h1>Finaliser la commande</h1>
            <p>Veuillez compléter vos informations de livraison</p>
          </header>

          <div className="order-grid">
            <div className="form-section">
              <section className="info-card">
                <div className="card-title">
                  <User size={18} />
                  <h3>Vos Coordonnées</h3>
                </div>
                <div className="form-group">
                  <label>Nom Complet</label>
                  <input name="fullName" placeholder="Ex: Sarah Ben..." onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input name="phone" placeholder="05XX XX XX XX" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Adresse Exacte ({delivery?.wilaya || "Oran"})</label>
                  <input name="address" placeholder="N° de porte, Rue, Quartier..." onChange={handleChange} />
                </div>
              </section>

              <section className="info-card">
                <div className="card-title">
                  <Calendar size={18} />
                  <h3>Date de Livraison</h3>
                </div>
                <div className="form-group">
                  <label>Choisir une date</label>
                  <input type="date" value={selectedDate} min={getMinDate()} onChange={(e) => setSelectedDate(e.target.value)} />
                  <p className="input-hint">Préparation artisanale : minimum 48h de délai.</p>
                </div>
              </section>
            </div>

            <aside className="summary-section">
              <div className="sticky-card">
                <div className="info-card summary-card">
                  <div className="summary-header">
                    <div className="summary-icon-box"><Cake size={18} color="#C8194A" /></div>
                    <h3>Récapitulatif</h3>
                  </div>

                  <div className="summary-list">
                    <div className="summary-row">
                      <span className="s-label">Modèle</span>
                      <span className="s-value">{selectedCake?.name}</span>
                    </div>
                    <div className="summary-row">
                      <span className="s-label">Parts</span>
                      <span className="s-value">{selectedCake?.people} personnes</span>
                    </div>
                    <div className="summary-row align-top">
                      <span className="s-label">Glaçage</span>
                      <div className="color-indicator">
                         <div className="color-dot" style={{ background: frostingColor }}></div>
                         <span className="s-value small-text">Teinte<br/>choisie</span>
                      </div>
                    </div>
                    <div className="summary-row">
                      <span className="s-label">Décoration</span>
                      <span className="s-value decor-text">{decor?.types?.join(", ") || "Standard"}</span>
                    </div>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="total-display">
                    <span className="total-title">PRIX TOTAL</span>
                    <div className="total-price-val">{totalPrice?.toLocaleString()} DA</div>
                  </div>

                  <button className="confirm-btn" disabled={!isFormValid || loading} onClick={handleSubmit}>
                    {loading ? "Chargement..." : "Confirmer la commande"}
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