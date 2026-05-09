import { useState } from "react";
import { Cake, User, Phone, MapPin, Clock, Check, Truck, Calendar } from "lucide-react";
import "./OrderConfirmation.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {API} from "../api";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedCake, frostingColor, decor, delivery, selectedPatisserie } =
    location.state || {};

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔥 DATE MIN = J+2
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
  try {
    const res = await fetch(`${API}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
       patisserieId: selectedPatisserie,

        cake: {
          name: selectedCake.name,
          people: selectedCake.people,
          layers: selectedCake.layers,
        },

        frostingColor,
        decor,
        customer: form,
        deliveryDate: selectedDate, // (IMPORTANT: now you store it)
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("SERVER ERROR:", data);
      throw new Error(data.message);
    }

    setSubmitted(true);
  } catch (err) {
    alert("Erreur lors de la commande");
  }
};
  // 🔥 VALIDATION
  const valid =
    form.fullName && form.phone && form.address && selectedDate;

  if (!selectedCake)
    return (
      <div className="error-state">
        <h2>⚠️ Aucune commande trouvée</h2>
      </div>
    );

  if (submitted)
    return (
      <div className="success-screen">
        <div className="success-card">
          <Check size={60} color="#C8194A" />
          <h2>Commande confirmée !</h2>
          <p>Merci {form.fullName}, votre gâteau est en préparation. 🎂</p>
          <button onClick={() => navigate("/")} className="back-home">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="confirmation-page">
        <div className="confirmation-container">
          
          {/* HEADER */}
          <header className="page-header">
            <div className="header-icon">
              <Check size={28} color="#C8194A" />
            </div>
            <h1>Confirmer votre commande</h1>
            <p>Vérifiez les détails et validez votre création</p>
          </header>

          {/* LIVRAISON */}
          <section className="info-card">
            <div className="card-title">
              <Truck size={20} color="#C8194A" />
              <h3>Livraison</h3>
            </div>

            <div className="delivery-grid">
              <div className="info-item">
                <MapPin size={14} />
                <span>{delivery?.wilaya || "Oran"}</span>
              </div>
            </div>

            {/* 🔥 DATE PICKER */}
            <div className="input-box">
              <label>
                <Calendar size={14} /> Date de livraison
              </label>

              <input
                type="date"
                value={selectedDate}
                min={getMinDate()}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              <p style={{ fontSize: 12, color: "#888" }}>
                Disponible à partir du {getMinDate()}
              </p>
            </div>
          </section>

          {/* DÉTAILS GÂTEAU */}
          <section className="info-card">
            <div className="card-title">
              <Cake size={20} color="#C8194A" />
              <h3>Détails du gâteau</h3>
            </div>

            <div className="cake-details-grid">
              <DetailItem label="Forme" value={selectedCake.name} />
              <DetailItem
                label="Taille"
                value={`${selectedCake.people} pers.`}
              />
              <DetailItem label="Étages" value={selectedCake.layers} />
              <DetailItem
                label="Crème"
                value={frostingColor}
                isColor
              />
              <DetailItem
                label="Décor"
                value={decor?.types?.join(", ")}
              />
              <DetailItem label="Texte" value={decor?.text} />
            </div>
          </section>

          {/* CLIENT */}
          <section className="info-card">
            <div className="card-title">
              <User size={20} color="#C8194A" />
              <h3>Vos informations</h3>
            </div>

            <div className="client-form">
              <div className="input-box">
                <label>
                  <User size={14} /> Nom complet
                </label>
                <input
                  name="fullName"
                  placeholder="Votre nom complet"
                  onChange={handleChange}
                />
              </div>

              <div className="input-box">
                <label>
                  <Phone size={14} /> Numéro de téléphone
                </label>
                <input
                  name="phone"
                  placeholder="+213 XXX XXX XXX"
                  onChange={handleChange}
                />
              </div>

              <div className="input-box">
                <label>
                  <MapPin size={14} /> Adresse exacte
                </label>
                <input
                  name="address"
                  placeholder={`Votre adresse à ${
                    delivery?.wilaya || "Oran"
                  }`}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* FINAL */}
          <div className="summary-section">
            <div className="summary-row">
              <div className="ready-info">
                <Clock size={18} color="#C8194A" />
                <div>
                  <small>Prêt estimé</small>
                  <p>Selon la date choisie</p>
                </div>
              </div>

              <div className="price-info">
                <small>Total</small>
                <p className="final-price">
                  {selectedCake.price} DA
                </p>
              </div>
            </div>

            <button
              className="confirm-btn"
              disabled={!valid}
              onClick={handleSubmit}
            >
              Confirmer la commande
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const DetailItem = ({ label, value, isColor }) => (
  <div className="detail-item">
    <span className="detail-label">{label}:</span>
    {isColor ? (
      <span
        className="detail-value color-preview"
        style={{ background: value }}
      ></span>
    ) : (
      <span className="detail-value">{value || "-"}</span>
    )}
  </div>
);