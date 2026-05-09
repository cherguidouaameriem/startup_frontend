import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, Inbox, Store, ShoppingCart, 
  CheckCircle, XCircle, Eye, TrendingUp, 
  Users, DollarSign, Package, BadgeCheck
} from "lucide-react";
import {API} from "./api";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
const [applications, setApplications] = useState([]);
const [selectedApplication, setSelectedApplication] = useState(null);useEffect(() => {
  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API}/api/partners/applications`);
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchApplications();
}, []);


  

const handleApprove = async (id) => {
  try {
    await fetch(`${API}/api/partners/approve/${id}`, {
      method: "PUT",
    });

    // remove from UI
    setApplications(prev => prev.filter(app => app._id !== id));

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      
      <main style={styles.mainContent}>
        <div style={styles.container}>
          
          {/* HEADER */}
          <div style={styles.header}>
            <div style={styles.headerTitleRow}>
              <div style={styles.iconBg}><LayoutDashboard color="#C8194A" size={24}/></div>
              <div>
                <h1 style={styles.title}>Admin Dashboard</h1>
                <p style={styles.subtitle}>Platform management</p>
              </div>
            </div>
          </div>

          {/* NAVIGATION TABS */}
          <div style={styles.tabsContainer}>
            <TabButton 
              active={activeTab === "Overview"} 
              onClick={() => setActiveTab("Overview")} 
              icon={<TrendingUp size={18}/>} 
              label="Overview" 
            />
            <TabButton 
              active={activeTab === "Applications"} 
              onClick={() => setActiveTab("Applications")} 
              icon={<Inbox size={18}/>} 
              label="Applications" 
              count={applications.length}
            />
            <TabButton 
              active={activeTab === "Shops"} 
              onClick={() => setActiveTab("Shops")} 
              icon={<Store size={18}/>} 
              label="Shops" 
            />
            <TabButton 
              active={activeTab === "Orders"} 
              onClick={() => setActiveTab("Orders")} 
              icon={<Package size={18}/>} 
              label="All Orders" 
            />
          </div>

          {/* CONTENT: OVERVIEW */}
          {activeTab === "Overview" && (
            <div style={styles.fadeAnim}>
              <div style={styles.statsGrid}>
                <StatCard title="Active Shops" value="2" icon={<Store color="#C8194A"/>} />
                <StatCard title="Pending Shops" value={applications.length} icon={<Users color="#C8194A"/>} />
                <StatCard title="Total Orders" value="89" icon={<ShoppingCart color="#C8194A"/>} />
                <StatCard title="Total Revenue" value="473K DA" icon={<DollarSign color="#C8194A"/>} />
              </div>

              <div style={styles.sectionCard}>
                <h3 style={styles.sectionTitle}>Pending Approvals</h3>
                {applications.length > 0 ? (
                  applications.map(app => (
                    <div key={app._id} style={styles.approvalRow}>
                      <div style={styles.appInfo}>
                        <span style={styles.appName}>{app.shopName}</span>
                        <span style={styles.appLoc}>{app.wilaya}</span>
                      </div>
                      <div style={styles.actionGroup}>
                        <PlanBadge plan={app.plan} />
                        <button style={styles.viewBtn} onClick={() => setSelectedApplication(app)}>
                          <Eye size={16} /> Détails
                        </button>
                        <button style={styles.approveBtn} onClick={() => handleApprove(app._id)}>
                          <CheckCircle size={16} /> Approve
                        </button>
                        <button style={styles.rejectBtn}><XCircle size={16} /></button>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>
          )}

          {/* CONTENT: APPLICATIONS */}
          {activeTab === "Applications" && (
            <div style={styles.fadeAnim}>
              <div style={styles.sectionCard}>
                <h3 style={styles.sectionTitle}>Demandes de partenariat</h3>
                {applications.length > 0 ? (
                    <table style={styles.table}>
                      <thead>
                        <tr style={styles.tableHeader}>
                          <th style={styles.th}>Boutique</th>
                          <th style={styles.th}>Propriétaire</th>
                          <th style={styles.th}>Offre choisie</th>
                          <th style={styles.th}>Date</th>
                          <th style={styles.th}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map(app => (
                          <tr key={app._id} style={styles.tr}>
                            <td style={styles.td}><strong>{app.shopName}</strong><br/><small>{app.wilaya}</small></td>
                            <td style={styles.td}>{app.ownerName}</td>
                            <td style={styles.td}><PlanBadge plan={app.plan} /></td>
                            <td style={styles.td}>{new Date(app.createdAt).toLocaleDateString()}</td>
                            <td style={styles.td}>
                              <button style={styles.viewBtn} onClick={() => setSelectedApplication(app)}>Voir tout</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODAL POUR LES DÉTAILS DU FORMULAIRE */}
      {selectedApplication && (
        <div style={styles.modalOverlay} onClick={() => setSelectedApplication(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2>Détails de la candidature</h2>
              <XCircle style={{cursor:'pointer'}} onClick={() => setSelectedApplication(null)} />
            </div>
            <div style={styles.modalBody}>
               <div style={styles.modalSection}>
                  <h4><Store size={14}/> Shop Identity</h4>
                  <p><strong>Nom:</strong> {selectedApplication.shopName}</p>
                  <p><strong>Bio:</strong> {selectedApplication.description}</p>
                  <p><strong>Instagram:</strong> <span style={{color: '#C8194A'}}>{selectedApplication.instagram}</span></p>
               </div>
               <div style={styles.modalSection}>
                  <h4><Users size={14}/> Contact & Offre</h4>
                  <p><strong>Propriétaire:</strong> {selectedApplication.ownerName}</p>
                  <p><strong>Email:</strong> {selectedApplication.email}</p>
                  <p><strong>Téléphone:</strong> {selectedApplication.phone}</p>
                  <p><strong>Offre choisie:</strong> <PlanBadge plan={selectedApplication.plan} /></p>
               </div>
            </div>
            <div style={styles.modalFooter}>
               <button style={styles.approveBtnFull} onClick={() => handleApprove(selectedApplication._id)}>
                 Valider et autoriser l'accès au portail
               </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

// ─── SOUS-COMPOSANTS ─────────────────────────

const TabButton = ({ active, onClick, icon, label, count }) => (
  <button 
    onClick={onClick}
    style={{
      ...styles.tab,
      backgroundColor: active ? "#fff" : "transparent",
      color: active ? "#111827" : "#6b7280",
      boxShadow: active ? "0 2px 8px rgba(0,0,0,0.05)" : "none"
    }}
  >
    {icon} <span>{label}</span>
    {count > 0 && <span style={styles.tabBadge}>{count}</span>}
  </button>
);

const StatCard = ({ title, value, icon }) => (
  <div style={styles.statCard}>
    <div style={styles.statIcon}>{icon}</div>
    <div style={styles.statInfo}>
      <span style={styles.statTitle}>{title}</span>
      <span style={styles.statValue}>{value}</span>
    </div>
  </div>
);

const PlanBadge = ({ plan }) => {
  const colors = {
    Premium: { bg: "#FFF1F2", text: "#C8194A", border: "#FECDD3" },
    Starter: { bg: "#EFF6FF", text: "#2563EB", border: "#DBEAFE" },
    Gratuit: { bg: "#F9FAFB", text: "#4B5563", border: "#E5E7EB" }
  };
  const style = colors[plan] || colors.Gratuit;
  return (
    <span style={{
      padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "700",
      backgroundColor: style.bg, color: style.text, border: `1px solid ${style.border}`,
      display: "flex", alignItems: "center", gap: "4px"
    }}>
      {plan === "Premium" && <BadgeCheck size={12}/>} {plan}
    </span>
  );
};

const EmptyState = () => (
  <div style={styles.emptyState}>
    <Inbox size={48} color="#9ca3af" />
    <h4 style={{margin: '16px 0 8px'}}>Aucune demande</h4>
    <p style={{fontSize: '14px', color: '#6b7280'}}>Les demandes des nouveaux pâtissiers apparaîtront ici.</p>
  </div>
);

// ─── STYLES ─────────────────────────

const styles = {
  pageWrapper: { minHeight: "100vh", backgroundColor: "#F8F9FB", display: "flex", flexDirection: "column" },
  mainContent: { flex: 1, padding: "40px 20px", marginTop: "80px" },
  container: { maxWidth: "1100px", margin: "0 auto", width: "100%" },
  
  header: { marginBottom: "32px" },
  headerTitleRow: { display: "flex", alignItems: "center", gap: "16px" },
  iconBg: { width: "48px", height: "48px", backgroundColor: "#fff", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" },
  title: { fontSize: "28px", fontWeight: "800", color: "#111827" },
  subtitle: { color: "#6b7280", fontSize: "14px" },

  tabsContainer: { display: "flex", gap: "8px", backgroundColor: "#F1F5F9", padding: "6px", borderRadius: "16px", marginBottom: "32px", width: "fit-content" },
  tab: { display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "0.2s" },
  tabBadge: { backgroundColor: "#C8194A", color: "#fff", fontSize: "10px", padding: "2px 6px", borderRadius: "10px", marginLeft: "4px" },

  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px" },
  statCard: { backgroundColor: "#fff", padding: "24px", borderRadius: "20px", display: "flex", gap: "16px", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" },
  statIcon: { width: "44px", height: "44px", backgroundColor: "#FFF1F2", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" },
  statTitle: { display: "block", color: "#6b7280", fontSize: "12px", fontWeight: "600" },
  statValue: { display: "block", fontSize: "20px", fontWeight: "800", color: "#111827" },

  sectionCard: { backgroundColor: "#fff", borderRadius: "24px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" },
  sectionTitle: { fontSize: "18px", fontWeight: "700", marginBottom: "24px", color: "#1f2937" },

  approvalRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", backgroundColor: "#F9FAFB", borderRadius: "16px", marginBottom: "12px", border: "1px solid #F1F5F9" },
  appInfo: { display: "flex", flexDirection: "column" },
  appName: { fontWeight: "700", color: "#111827" },
  appLoc: { fontSize: "12px", color: "#6b7280" },
  actionGroup: { display: "flex", alignItems: "center", gap: "12px" },

  approveBtn: { display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#C8194A", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "10px", fontWeight: "600", cursor: "pointer" },
  viewBtn: { display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#fff", color: "#4b5563", border: "1px solid #E5E7EB", padding: "8px 16px", borderRadius: "10px", fontWeight: "600", cursor: "pointer" },
  rejectBtn: { backgroundColor: "#fff", color: "#ef4444", border: "1px solid #FEE2E2", padding: "8px", borderRadius: "10px", cursor: "pointer" },

  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px", borderBottom: "1px solid #E5E7EB", color: "#6b7280", fontSize: "13px" },
  td: { padding: "16px 12px", borderBottom: "1px solid #F3F4F6", fontSize: "14px" },

  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modalContent: { backgroundColor: "#fff", width: "100%", maxWidth: "500px", borderRadius: "24px", padding: "32px", position: "relative" },
  modalHeader: { display: "flex", justifyContent: "space-between", marginBottom: "24px" },
  modalSection: { marginBottom: "20px", padding: "16px", backgroundColor: "#F9FAFB", borderRadius: "12px" },
  modalFooter: { marginTop: "24px" },
  approveBtnFull: { width: "100%", padding: "14px", backgroundColor: "#C8194A", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer" },
  
  emptyState: { textAlign: "center", padding: "60px 0" },
  fadeAnim: { animation: "fadeIn 0.3s ease-in-out" }
};