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

                    <Cake size={18} color="#C8194A" />

                    <h3>Récapitulatif</h3>

                  </div>



                  <div className="summary-list">



                    <div className="summary-row">

                      <span className="s-label">Gâteau</span>

                      <span className="s-value">{cake?.name}</span>

                    </div>



                    <div className="summary-row">

                      <span className="s-label">Personnes</span>

                      <span className="s-value">{cake?.people}</span>

                    </div>



                    <div className="summary-row">

                      <span className="s-label">Génoise</span>

                      <span className="s-value">{cake?.sponge}</span>

                    </div>



                    <div className="summary-row align-top">

                      <span className="s-label">Glaçage</span>

                      <div className="color-indicator">

                        <div

                          className="color-dot"

                          style={{ background: frostingColor }}

                        />

                      </div>

                    </div>



                   <div className="summary-row column">

  <span className="s-label">Décor</span>



  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>

    {decor?.types?.length ? (

      decor.types.map((item, i) => (

        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>

         

          {/* decor name */}

          <span className="s-value">{item}</span>



          {/* color dot */}

          <div

            style={{

              width: 14,

              height: 14,

              borderRadius: "50%",

              background: decor?.colors?.[item] || "#ddd",

              border: "1px solid #ccc",

            }}

          />

        </div>

      ))

    ) : (

      <span className="s-value">Standard</span>

    )}

  </div>

</div>



                    {/* 🧁 FILLINGS */}

                    <div className="summary-row column">

                      <span className="s-label">Garniture</span>

                      {fillingsByLayer?.map((f, i) => (

                        <span key={i} className="s-value small-text">

                          Couche {i + 1} → {f || "vide"}

                        </span>

                      ))}

                    </div>



                  </div>



                  <div className="summary-divider"></div>



                  <div className="total-display">

                    <span className="total-title">PRIX TOTAL</span>

                    <div className="total-price-val">

                      {totalPrice?.toLocaleString()} DA

                    </div>

                  </div>



                  <button

                    className="confirm-btn"

                    disabled={!isFormValid || loading}

                    onClick={handleSubmit}

                  >

                    {loading ? "Chargement..." : "Confirmer"}

                    <ChevronRight size={18} />

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

