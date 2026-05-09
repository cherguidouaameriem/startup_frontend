import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, ShoppingBag, UtensilsCrossed, User, 
  Package, CheckCircle, Clock, TrendingUp, Eye, X, Phone, MapPin, Trash2, Check
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './DashboardPage.css';
import {API} from "./api";
const DashboardPage = () => {
const [editData, setEditData] = useState({
  shopName: "",
  phone: "",
  shopAddress: "",
  instagram: "",
  description: "",
});
const [editOpen, setEditOpen] = useState(false);
const [loading, setLoading] = useState(false);
  const [partner, setPartner] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

 const openEdit = () => {
  if (!partner) return;

  setEditData({
    shopName: partner.shopName || "",
    phone: partner.phone || "",
    shopAddress: partner.shopAddress || "",
    instagram: partner.instagram || "",
    description: partner.description || "",
  });

  setEditOpen(true);
};

const handleUpdateProfile = async () => {
  const confirm = window.confirm(
    "⚠️ Are you sure you want to modify your profile?"
  );

  if (!confirm) return;

  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API}/api/partners/${partner._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Error updating profile");
      return;
    }

    setPartner(data); // update UI instantly
    setEditOpen(false);

  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    setLoading(false);
  }
};
  // 1. Charger les infos du partenaire
  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API}/api/partners/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setPartner(data);
      } catch (err) {
        console.error("Erreur partenaire");
      }
    };
    fetchPartner();
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};
  // 2. Charger les commandes
  const fetchOrders = async () => {
    if (!partner?._id) return;
    try {
      const res = await fetch(`${API}/api/orders/patisserie/${partner._id}`);
      const data = await res.json();
      if (res.ok) setOrders(data);
    } catch (err) {
      console.error("Erreur commandes", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [partner]);

  // 3. Modifier le statut 🔥 (Confirmé, Annulé, Livré)
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchOrders();
        setSelectedOrder(null);
      }
    } catch (err) {
      console.error("Erreur mise à jour statut");
    }
  };

  return (
    <div className="admin-style-wrapper">
      <Navbar />

      <main className="admin-container">
        {/* HEADER */}
        <header className="admin-header">
          <div className="header-icon-box">
            <LayoutDashboard color="#C8194A" size={24}/>
          </div>
          <div className="header-text">
            <h1 className="admin-title">
              {partner ? partner.shopName : "Chargement..."}
            </h1>
            <p className="admin-subtitle">Portail de Gestion Partenaire</p>
          </div>
        </header>

        {/* ONGLETS */}
        <nav className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === "Overview" ? "active" : ""}`}
            onClick={() => setActiveTab("Overview")}
          >
            <TrendingUp size={18}/> Vue d'ensemble
          </button>
          <button 
            className={`tab-btn ${activeTab === "Orders" ? "active" : ""}`}
            onClick={() => setActiveTab("Orders")}
          >
            <ShoppingBag size={18}/> Commandes
          </button>
          <button className="tab-btn"><UtensilsCrossed size={18}/> Menu</button>
<button
  className={`tab-btn ${activeTab === "Profile" ? "active" : ""}`}
  onClick={() => setActiveTab("Profile")}
>
  <User size={18}/> Profil
</button>        </nav>

        {/* STATISTIQUES - Uniquement sur Overview */}
        {activeTab === "Overview" && (
          <div className="admin-stats-grid">
            <StatBox icon={<Package color="#C8194A"/>} label="Total Commandes" value={orders.length} />
            <StatBox icon={<CheckCircle color="#C8194A"/>} label="Confirmées" value={orders.filter(o => o.status === "confirmed").length} />
            <StatBox icon={<Clock color="#C8194A"/>} label="En attente" value={orders.filter(o => o.status === "pending").length} />
            <StatBox icon={<TrendingUp color="#C8194A"/>} label="Revenus" value={`${orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0)} DA`} />
          </div>
        )}
{activeTab === "Profile" && partner && (
  <section className="admin-main-card">
    
    <div className="profile-section">

      {/* IMAGE */}
      <div className="profile-top">
        {partner.logoFile ? (
          <img
            src={`${API}/uploads/${partner.logoFile}`}
            alt={partner.shopName}
            className="profile-logo"
          />
        ) : (
          <div className="profile-placeholder">
            <User size={40} />
          </div>
        )}

        <div>
          <h2>{partner.shopName}</h2>
          <p>{partner.email}</p>
        </div>
      </div>

      {/* INFOS */}
      <div className="profile-grid">

        <div className="profile-item">
          <span>Propriétaire</span>
          <strong>{partner.ownerName}</strong>
        </div>

        <div className="profile-item">
          <span>Téléphone</span>
          <strong>{partner.phone}</strong>
        </div>

        <div className="profile-item">
          <span>Adresse</span>
          <strong>{partner.shopAddress}</strong>
        </div>

        <div className="profile-item">
          <span>Wilaya</span>
          <strong>{partner.wilaya}</strong>
        </div>

        <div className="profile-item">
          <span>Instagram</span>
          <strong>{partner.instagram || "-"}</strong>
        </div>

        <div className="profile-item">
          <span>Plan</span>
          <strong>{partner.plan}</strong>
        </div>

      </div>

      {/* DESCRIPTION */}
      <div className="profile-description">
        <span>Description</span>
        <p>{partner.description}</p>
      </div>

      {/* ACTIONS */}
      <div className="profile-actions">

       <button
  className="edit-profile-btn"
  onClick={openEdit}
>
  Modifier le profil
</button>
{editOpen && (
  <div className="modal-overlay">
    <div className="modal-content edit-profile-modal">
      
      <div className="modal-header-edit">
        <h3>Modifier le profil</h3>
      </div>

      <div className="modal-form">
        <div className="form-group">
          <label>Nom de la boutique</label>
          <input
            className="form-input"
            value={editData.shopName}
            onChange={(e) => setEditData({ ...editData, shopName: e.target.value })}
            placeholder="Ex: Ma Douce Pâtisserie"
          />
        </div>

        <div className="form-group">
          <label>Téléphone</label>
          <input
            className="form-input"
            value={editData.phone}
            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Adresse exacte</label>
          <input
            className="form-input"
            value={editData.shopAddress}
            onChange={(e) => setEditData({ ...editData, shopAddress: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Instagram (Lien ou @)</label>
          <input
            className="form-input"
            value={editData.instagram}
            onChange={(e) => setEditData({ ...editData, instagram: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Description de votre boutique</label>
          <textarea
            className="form-textarea"
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          />
        </div>
      </div>

      <div className="modal-actions-edit">
        <button className="cancel-btn" onClick={() => setEditOpen(false)}>
          Annuler
        </button>
        <button 
          className="save-btn" 
          onClick={handleUpdateProfile}
          disabled={loading}
        >
          {loading ? "Mise à jour..." : "Sauvegarder"}
        </button>
      </div>

    </div>
  </div>
)}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Déconnexion
        </button>

      </div>

    </div>

  </section>
)}
        {/* LISTE DES COMMANDES */}
    {activeTab !== "Profile" && (
  <section className="admin-main-card">
    <h3 className="section-title-serif">
      {activeTab === "Overview"
        ? "Commandes Récentes"
        : "Historique des Commandes"}
    </h3>

    <div className="orders-list">
      {orders.length === 0 ? (
        <p className="empty-msg">Aucune commande pour le moment</p>
      ) : (
        orders.map((order) => (
          <div className="admin-list-item" key={order._id}>

            {/* INFO */}
            <div className="item-main-info">
              <span className="item-name">
                {order.customer?.fullName}
              </span>

              <span className="item-sub">
                {order.selectedCake?.name} • {order.selectedCake?.layers} étage(s)
              </span>
            </div>

            {/* STATUS */}
            <div className="item-actions">

              <span className={`status-pill ${order.status}`}>
                {order.status}
              </span>

              {/* ACTIONS ICI (CORRECTEMENT DANS MAP) */}
              <div className="quick-actions-group">

                {order.status === "pending" && (
                  <>
                    <button
                      className="btn-action confirm"
                      onClick={() => updateStatus(order._id, "confirmed")}
                    >
                      <Check size={18} color="#16a34a" />
                    </button>

                    <button
                      className="btn-action cancel"
                      onClick={() => updateStatus(order._id, "cancelled")}
                    >
                      <X size={18} color="#dc2626" />
                    </button>
                  </>
                )}

              </div>

              <button
                className="details-btn"
                onClick={() => setSelectedOrder(order)}
              >
                <Eye size={16}/> Détails
              </button>

            </div>
          </div>
        ))
      )}
    </div>
  </section>
)}
      </main>

      {/* MODALE DE DÉTAILS */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Détails Commande #{selectedOrder._id.slice(-5)}</h3>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}><X size={20}/></button>
            </div>

            <div className="modal-body">
              <div className="detail-group">
                <h4><User size={16}/> Client</h4>
                <p><strong>{selectedOrder.customer?.fullName}</strong></p>
                <p><Phone size={14}/> {selectedOrder.customer?.phone}</p>
                <p><MapPin size={14}/> {selectedOrder.customer?.address}</p>
              </div>

              <div className="detail-group">
                <h4><ShoppingBag size={16}/> Spécifications du Gâteau</h4>
                <div className="cake-grid-mini">
                  <p><strong>Forme:</strong> {selectedOrder.selectedCake?.name}</p>
                  <p><strong>Étages:</strong> {selectedOrder.selectedCake?.layers}</p>
                  <p><strong>Crème:</strong> <span className="color-preview" style={{backgroundColor: selectedOrder.frostingColor}}></span></p>
                  <p><strong>Décors:</strong> {selectedOrder.decor?.types?.join(", ") || "Classique"}</p>
                </div>
                {selectedOrder.decor?.text && (
                  <div className="cake-text-box">
                    <span>Message personnalisé :</span>
                    <p>"{selectedOrder.decor.text}"</p>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
               <div className="modal-total">
                 <span>Prix Total</span>
                 <strong>{selectedOrder.totalPrice || selectedOrder.selectedCake?.price} DA</strong>
               </div>
               
               <div className="modal-actions">
                 {selectedOrder.status === "pending" && (
                   <button className="main-confirm-btn" onClick={() => updateStatus(selectedOrder._id, "confirmed")}>
                     Confirmer la commande
                   </button>
                 )}
                 {selectedOrder.status === "confirmed" && (
                   <button className="main-deliver-btn" onClick={() => updateStatus(selectedOrder._id, "delivered")}>
                     Confirmer la Livraison
                   </button>
                 )}
               </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div className="admin-stat-card">
    {icon}
    <div>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  </div>
);

export default DashboardPage;