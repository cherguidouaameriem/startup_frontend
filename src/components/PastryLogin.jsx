import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChefHat } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { API } from "../api";

export default function ShopLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Format email invalide 📧");
      return;
    }

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
        toast.error(
          data.message === "Partner not found"
            ? "Compte introuvable"
            : "Email ou mot de passe incorrect"
        );
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("partnerId", data.partner.id);

      toast.dismiss(loadingToast);
      toast.success("Bienvenue chez Sweet Cake ✨");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Erreur serveur");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <Toaster position="top-center" />

      <Navbar />

      <main style={styles.mainContent}>

        {/* 🔥 DEMO BOX */}
        <div style={styles.demoBox}>
          <h3 style={{ color: "#C8194A", marginBottom: 8 }}>
            🎯 Accès Démo — Sweet Cake
          </h3>

          <p style={styles.demoTextLine}>
            Email: <b>asmaacherdouane@gmail.com</b>
          </p>

          <p style={styles.demoTextLine}>
            Mot de passe: <b>asma2003</b>
          </p>

          <button
            style={styles.demoBtn}
            onClick={() => {
              setEmail("asmaacherdouane@gmail.com");
              setPassword("asma2003");
            }}
          >
            Remplir automatiquement
          </button>
        </div>

        {/* LOGIN CARD */}
        <div style={styles.loginCard}>
          <div style={styles.headerSection}>
            <ChefHat size={26} color="#C8194A" />
            <h1 style={styles.title}>Connexion</h1>
            <p style={styles.subtitle}>
              Accédez au tableau de bord de votre boutique
            </p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="boutique@exemple.com"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Mot de passe</label>

              <div style={styles.passwordBox}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  placeholder="••••••••"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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

/* ================= STYLES ================= */

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "#f9fafb",
  },

  mainContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "120px 20px 60px",
    gap: "20px",
  },

  /* DEMO BOX */
  demoBox: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff7f9",
    border: "1px solid #ffd1dc",
    borderRadius: "14px",
    padding: "16px",
    textAlign: "center",
  },

  demoTextLine: {
    fontSize: "13px",
    color: "#374151",
    margin: "4px 0",
  },

  demoBtn: {
    marginTop: "10px",
    background: "#C8194A",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "12px",
  },

  /* LOGIN CARD */
  loginCard: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    textAlign: "center",
  },

  headerSection: {
    marginBottom: "20px",
  },

  title: {
    fontSize: "22px",
    fontWeight: "700",
  },

  subtitle: {
    fontSize: "13px",
    color: "#6b7280",
  },

  form: {
    textAlign: "left",
  },

  inputGroup: {
    marginBottom: "14px",
  },

  label: {
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "6px",
    display: "block",
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    outline: "none",
  },

  passwordBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  eyeBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },

  submitBtn: {
    width: "100%",
    padding: "12px",
    background: "#C8194A",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },
  footerLink: {
  marginTop: "18px",
  fontSize: "13px",
  color: "#6b7280",
  textAlign: "center",
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