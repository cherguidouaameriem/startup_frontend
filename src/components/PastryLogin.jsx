import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChefHat } from "lucide-react";
import toast, { Toaster } from "react-hot-toast"; // 🔥 Import des notifications
import Navbar from "./Navbar";
import Footer from "./Footer";
import {API} from "./api";
export default function ShopLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Vérification du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Format email invalide", { icon: '📧' });
      return;
    }

    // Notification de chargement
    const loadingToast = toast.loading("Connexion en cours...");

    try {
      const res = await fetch(`${API}/api/partners/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.dismiss(loadingToast);
        toast.error(data.message === "Partner not found"
          ? "Compte introuvable"
          : "Email ou mot de passe incorrect"
        );
        return;
      }

      // Stockage local
      localStorage.setItem("token", data.token);
      localStorage.setItem("partnerId", data.partner.id);

      // Succès
      toast.dismiss(loadingToast);
      toast.success("Bienvenue chez vous ! ✨");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Erreur serveur, réessayez plus tard");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Conteneur de notifications (Gère le rendu visuel) */}
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontSize: '14px'
          },
        }}
      />
      
      <Navbar />
      
      <main style={styles.mainContent}>
        <div style={styles.loginCard}>
          <div style={styles.headerSection}>
            <div style={styles.iconContainer}>
              <ChefHat size={24} color="#C8194A" />
            </div>
            <h1 style={styles.title}>Connexion</h1>
            <p style={styles.subtitle}>Accédez au tableau de bord de votre boutique</p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <div style={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder="boutique@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Mot de passe</label>
              <div style={{ ...styles.inputWrapper, border: "1.5px solid #C8194A" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? <EyeOff size={18} color="#9ca3af" /> : <Eye size={18} color="#9ca3af" />}
                </button>
              </div>
            </div>

            <button type="submit" style={styles.submitBtn}>
              Se connecter
            </button>
          </form>

          <div style={styles.footerLink}>
            <span>Vous n'avez pas de compte ? </span>
            <button 
              onClick={() => navigate("/partner-form")} 
              style={styles.registerLink}
            >
              Inscrivez-vous ici
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Les styles restent identiques à votre version
const styles = {
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px",
    marginTop: "100px",
    marginBottom: "60px",
  },
  loginCard: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
    textAlign: "center",
  },
  headerSection: {
    marginBottom: "24px",
  },
  iconContainer: {
    width: "48px",
    height: "48px",
    backgroundColor: "#FFF1F2",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "6px",
    fontFamily: "'Inter', sans-serif",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
  },
  form: {
    textAlign: "left",
  },
  inputGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "0 14px",
    height: "44px",
  },
  input: {
    flex: 1,
    border: "none",
    background: "none",
    outline: "none",
    fontSize: "14px",
    color: "#1f2937",
    width: "100%",
  },
  eyeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: 0,
    marginLeft: "8px",
  },
  submitBtn: {
    width: "100%",
    height: "44px",
    backgroundColor: "#C8194A",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
    transition: "background 0.2s ease",
  },
  footerLink: {
    marginTop: "20px",
    fontSize: "13px",
    color: "#6b7280",
  },
  registerLink: {
    background: "none",
    border: "none",
    color: "#C8194A",
    fontWeight: "600",
    cursor: "pointer",
    padding: 0,
    fontSize: "13px",
  },
};