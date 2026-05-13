import { useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {API} from "../api";
import { 
  Store, User, Phone, Mail, MapPin, Instagram, 
  Facebook, Globe, ClipboardList, Image as ImageIcon, 
  Send, Lock, CheckCircle, Sparkles, Clock
} from "lucide-react";

export default function PartnerForm() {
  const [formData, setFormData] = useState({
    shopName: "", ownerName: "", phone: "", email: "", password: "",
    shopAddress: "", wilaya: "", instagram: "", facebookPage: "",
    website: "", description: "", logoFile: null, selectedPlan: "Gratuit"
  });

  const [submitted, setSubmitted] = useState(false);

const handleSubmit = async () => {
  if (!formData.wilaya) {
    alert("La wilaya est obligatoire ⚠️");
    return;
  }

  try {
    const data = new FormData();

    // 🔥 append ALL fields
    Object.keys(formData).forEach((key) => {
      if (key !== "logoFile") {
        data.append(key, formData[key]);
      }
    });

    // 🔥 append file
    if (formData.logoFile) {
      data.append("logoFile", formData.logoFile);
    }

    const res = await fetch(`${API}/api/partners`, {
      method: "POST",
      body: data, // ❌ NO JSON
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Erreur ❌");
      return;
    }

    setSubmitted(true);
  } catch (err) {
    console.error(err);
  }
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectPlan = (plan) => setFormData(prev => ({ ...prev, selectedPlan: plan }));

  const isValid = formData.shopName && formData.ownerName && formData.phone && formData.email && formData.password && formData.shopAddress && formData.wilaya ;

 if (submitted) {
  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      <main style={styles.mainContent}>
        <div style={styles.successCard}>

          <div style={styles.successIcon}>
            <CheckCircle size={64} color="#C8194A" />
          </div>

          <h2 style={styles.successTitle}>
            Demande envoyée avec succès 🎉
          </h2>

          <p style={styles.successText}>
            Merci ! Votre formulaire a bien été reçu.<br />
            Notre équipe va examiner votre boutique sous <b>24 heures</b>.
          </p>

          <div style={styles.successBadge}>
            <Clock size={14} />
            En cours de vérification
          </div>

          <button
            style={styles.backBtn}
            onClick={() => window.location.href = "/"}
          >
            Retour à l'accueil
          </button>

        </div>
      </main>

      <Footer />
    </div>
  );
}

  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      <main style={styles.mainContent}>
        <div style={styles.container}>
          
          {/* EN-TÊTE */}
          <div style={styles.header}>
            <div style={styles.headerIcon}><Store size={32} color="#C8194A" /></div>
            <h1 style={styles.mainTitle}>Devenir partenaire</h1>
            <p style={styles.mainSubtitle}>Rejoignez notre réseau de pâtissiers et boostez votre visibilité</p>
          </div>

          {/* SECTION: IDENTITÉ DE LA BOUTIQUE */}
          <FormCard icon={<Store size={20} />} title="Identité de la Boutique">
            <LogoUploader logoFile={formData.logoFile} onUpload={(file) => setFormData(p => ({...p, logoFile: file}))} />
            <div style={styles.grid}>
              <InputField label="Nom de la boutique" icon={<Store size={14}/>} name="shopName" placeholder="Pâtisserie El Bahia" onChange={handleChange} />
              <InputField label="Nom du propriétaire" icon={<User size={14}/>} name="ownerName" placeholder="Votre nom complet" onChange={handleChange} />
            </div>
          </FormCard>

          {/* SECTION: IDENTIFIANTS DE COMPTE */}
          <FormCard icon={<Lock size={20} />} title="Identifiants de Connexion">
            <div style={styles.grid}>
              <InputField label="Email professionnel" icon={<Mail size={14}/>} name="email" placeholder="contact@votre-boutique.dz" onChange={handleChange} />
              <InputField label="Mot de passe" icon={<Lock size={14}/>} name="password" type="password" placeholder="••••••••" onChange={handleChange} />
            </div>
            <p style={styles.infoText}>Ces identifiants vous serviront à accéder à votre tableau de bord après validation.</p>
          </FormCard>

          {/* SECTION: CONTACT */}
          <FormCard icon={<Phone size={20} />} title="Informations de Contact">
            <InputField label="Numéro de téléphone" icon={<Phone size={14}/>} name="phone" placeholder="+213 5XX XX XX XX" onChange={handleChange} />
            <InputField label="Adresse de la boutique" icon={<MapPin size={14}/>} name="shopAddress" placeholder="Centre-ville, Oran" onChange={handleChange} />
            <select
  name="wilaya"
  value={formData.wilaya}
  onChange={handleChange}
  style={styles.input}
>
  <option value="">Choisir une wilaya</option>
  <option value="Oran">Oran</option>
  <option value="Alger">Alger</option>
  <option value="Constantine">Constantine</option>
  <option value="Blida">Blida</option>
  {/* you can add all 58 later */}
</select>
          </FormCard>

          {/* SECTION: PRÉSENCE EN LIGNE */}
          <FormCard icon={<Globe size={20} />} title="Présence en Ligne">
            <div style={styles.grid}>
              <InputField label="Instagram" icon={<Instagram size={14}/>} name="instagram" placeholder="@ma_patisserie" onChange={handleChange} />
              <InputField label="Page Facebook" icon={<Facebook size={14}/>} name="facebookPage" placeholder="Lien de votre page" onChange={handleChange} />
            </div>
            <InputField label="Site Web (optionnel)" icon={<Globe size={14}/>} name="website" placeholder="https://votre-boutique.dz" onChange={handleChange} />
          </FormCard>

          {/* SECTION: À PROPOS */}
          <FormCard icon={<ClipboardList size={20} />} title="À Propos de Votre Shop">
            <p style={styles.infoText}>Parlez-nous de vos spécialités, de votre expérience et de ce qui vous rend unique.</p>
            <textarea
              style={styles.textarea}
              name="description"
              placeholder="Ex: Entreprise familiale spécialisée dans les gâteaux algériens traditionnels revisités..."
              onChange={handleChange}
              rows={4}
            />
          </FormCard>

          {/* SECTION: TARIFICATION */}
          <div style={styles.pricingCard}>
            <div style={styles.sectionHeader}>
              <Sparkles size={22} color="#C8194A" />
              <h3 style={styles.cardTitle}>Choisissez votre formule</h3>
            </div>
            <p style={styles.infoText}>Vous pourrez changer de forfait à tout moment depuis votre espace partenaire.</p>
            
            <div style={styles.pricingGrid}>
              <PlanCard 
                title="Gratuit" price="0 DA" desc="Idéal pour démarrer"
                features={["5 commandes/mois", "Boutique en ligne"]}
                selected={formData.selectedPlan === "Gratuit"}
                onClick={() => selectPlan("Gratuit")}
              />
              <PlanCard 
                title="Starter" price="1 990 DA/mois" desc="Flexibilité totale"
                features={["20 commandes/mois", "Tout le plan Gratuit"]}
                selected={formData.selectedPlan === "Starter"}
                onClick={() => selectPlan("Starter")}
              />
              <PlanCard 
                title="Premium" price="2 990 DA/mois" desc="Le plus populaire"
                features={["Commandes illimitées","Visibilité prioritaire", "Badge vérifié"]}
                selected={formData.selectedPlan === "Premium"}
                isPopular
                onClick={() => selectPlan("Premium")}
              />
            </div>
          </div>

          {/* BOUTON D'ENVOI */}
          <button 
            disabled={!isValid} 
            onClick={handleSubmit}
            style={{...styles.submitBtn, opacity: isValid ? 1 : 0.6}}
          >
            Soumettre ma demande
          </button>
          <div style={styles.footerNote}>
            <Clock size={14} /> <span>Notre équipe traitera votre demande sous 24h.</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── COMPOSANTS INTERNES ─────────────────────────

const FormCard = ({ icon, title, children }) => (
  <div style={styles.card} onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"} onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.02)"}>
    <div style={styles.sectionHeader}>
      <span style={{ color: "#C8194A" }}>{icon}</span>
      <h3 style={styles.cardTitle}>{title}</h3>
    </div>
    {children}
  </div>
);

const InputField = ({ label, icon, ...props }) => (
  <div style={styles.inputGroup}>
    <label style={styles.label}>
      {icon} <span style={{marginLeft: '6px'}}>{label}</span>
    </label>
    <input 
        style={styles.input} 
        onFocus={(e) => {
            e.target.style.borderColor = "#C8194A";
            e.target.style.backgroundColor = "#fff";
        }}
        onBlur={(e) => {
            e.target.style.borderColor = "#E5E7EB";
            e.target.style.backgroundColor = "#F9FAFB";
        }}
        {...props} 
    />
  </div>
);

const PlanCard = ({ title, price, desc, features, selected, isPopular, onClick }) => (
  <div 
    onClick={onClick}
    style={{
      ...styles.planCard, 
      borderColor: selected ? "#C8194A" : "#e5e7eb",
      borderWidth: selected ? "2.5px" : "1px",
      transform: selected ? "translateY(-4px)" : "translateY(0)"
    }}
  >
    {isPopular && <div style={styles.popularBadge}><Sparkles size={12}/> Populaire</div>}
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
       <h4 style={styles.planTitle}>{title}</h4>
       {selected && <CheckCircle size={20} color="#C8194A" fill="#C8194A22" />}
    </div>
    <div style={styles.planPrice}>{price}</div>
    <p style={styles.planDesc}>{desc}</p>
    <div style={styles.featureList}>
      {features.map((f, i) => (
        <div key={i} style={styles.featureItem}>
          <CheckCircle size={14} color="#C8194A" /> {f}
        </div>
      ))}
    </div>
  </div>
);

const LogoUploader = ({ logoFile, onUpload }) => {
  const inputRef = useRef();
  const preview = logoFile ? URL.createObjectURL(logoFile) : null;
  return (
    <div style={styles.logoWrapper}>
      <div 
        style={styles.logoCircle} 
        onClick={() => inputRef.current.click()}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = "#C8194A"}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = "#E5E7EB"}
      >
        {preview ? <img src={preview} alt="logo" style={styles.previewImg} /> : <ImageIcon size={28} color="#9ca3af" />}
        <input ref={inputRef} type="file" hidden onChange={(e) => onUpload(e.target.files[0])} />
      </div>
      <span style={styles.logoLabel}>Télécharger votre logo</span>
    </div>
  );
};

// ─── STYLES ─────────────────────────

const styles = {
  successCard: {
  width: "100%",
  maxWidth: "520px",
  margin: "0 auto",
  textAlign: "center",
  backgroundColor: "#fff",
  padding: "50px 30px",
  borderRadius: "24px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
  animation: "fadeIn 0.4s ease-in-out",
},

successIcon: {
  width: "90px",
  height: "90px",
  margin: "0 auto 20px",
  backgroundColor: "#FFF1F2",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
},

successTitle: {
  fontSize: "26px",
  fontWeight: "800",
  color: "#111827",
  marginBottom: "12px",
},

successText: {
  fontSize: "15px",
  color: "#6b7280",
  lineHeight: 1.6,
  marginBottom: "20px",
},

successBadge: {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  backgroundColor: "#F9FAFB",
  border: "1px solid #E5E7EB",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  color: "#374151",
  marginBottom: "25px",
},

backBtn: {
  width: "100%",
  maxWidth: "240px",
  height: "44px",
  backgroundColor: "#C8194A",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.2s",
},


  pageWrapper: { display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#F8F9FB" },
  mainContent: { flex: 1, display: "flex", justifyContent: "center", padding: "40px 20px", marginTop: "80px" },
  container: { width: "100%", maxWidth: "800px" },
  header: { textAlign: "center", marginBottom: "40px" },
  headerIcon: { width: "60px", height: "60px", backgroundColor: "#FFF1F2", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" },
  mainTitle: { fontSize: "32px", fontWeight: "800", color: "#111827", marginBottom: "8px" },
  mainSubtitle: { fontSize: "16px", color: "#6b7280" },
  
  card: { backgroundColor: "#fff", borderRadius: "20px", padding: "30px", marginBottom: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)", border: "1px solid #f1f1f1", transition: "all 0.3s ease" },
  sectionHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" },
  cardTitle: { fontSize: "18px", fontWeight: "700", color: "#1f2937" },
  
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  inputGroup: { marginBottom: "16px" },
  label: { display: "flex", alignItems: "center", fontSize: "13px", fontWeight: "600", color: "#4b5563", marginBottom: "8px" },
  input: { width: "100%", height: "48px", backgroundColor: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: "12px", padding: "0 16px", fontSize: "14px", outline: "none", transition: "all 0.2s ease" },
  textarea: { width: "100%", backgroundColor: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: "12px", padding: "16px", fontSize: "14px", outline: "none", resize: "none", transition: "all 0.2s ease" },
  infoText: { fontSize: "12px", color: "#9ca3af", marginTop: "-8px", marginBottom: "16px" },
  
  logoWrapper: { textAlign: "center", marginBottom: "24px" },
  logoCircle: { width: "100px", height: "100px", backgroundColor: "#F3F4F6", border: "2px dashed #E5E7EB", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", cursor: "pointer", overflow: "hidden", transition: "all 0.3s ease" },
  logoLabel: { fontSize: "13px", color: "#6b7280", fontWeight: "500" },
  previewImg: { width: "100%", height: "100%", objectFit: "cover" },

  pricingCard: { backgroundColor: "#fff", borderRadius: "20px", padding: "30px", marginBottom: "30px", border: "1px solid #f1f1f1" },
  pricingGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "20px" },
  planCard: { padding: "24px", border: "1px solid #e5e7eb", borderRadius: "18px", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", position: "relative", backgroundColor: "#fff" },
  planTitle: { fontSize: "18px", fontWeight: "700", marginBottom: "12px" },
  planPrice: { fontSize: "20px", fontWeight: "800", color: "#111827", marginBottom: "4px" },
  planDesc: { fontSize: "12px", color: "#6b7280", marginBottom: "20px" },
  featureList: { display: "flex", flexDirection: "column", gap: "10px" },
  featureItem: { display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#4b5563" },
  popularBadge: { position: "absolute", top: "-12px", right: "12px", backgroundColor: "#C8194A", color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "10px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" },

  submitBtn: { width: "100%", height: "56px", backgroundColor: "#C8194A", color: "#fff", border: "none", borderRadius: "16px", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s ease", transform: "scale(1)" },
  footerNote: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px", fontSize: "13px", color: "#9ca3af" },
  successCard: { textAlign: "center", backgroundColor: "#fff", padding: "60px", borderRadius: "30px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" },
  
};