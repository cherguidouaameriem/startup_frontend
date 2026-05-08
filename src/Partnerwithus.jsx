import { useState, useRef } from "react";

// ─── Design Tokens (shared with OrderConfirmation) ────────────────────────────
const theme = {
  primary: "#C8315A",
  primaryLight: "#F5E6EC",
  primaryDark: "#A0244A",
  text: "#1A1A2E",
  textMuted: "#7A7A8C",
  border: "#E8E0E4",
  bg: "#F7F4F5",
  white: "#FFFFFF",
  font: "'Cormorant Garamond', Georgia, serif",
  fontSans: "'DM Sans', 'Segoe UI', sans-serif",
};

// ─── Reusable Components ──────────────────────────────────────────────────────

const InputField = ({ label, icon, placeholder, value, onChange, type = "text", name, required = false }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{
      fontSize: 12,
      fontWeight: 600,
      color: theme.textMuted,
      fontFamily: theme.fontSans,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
      gap: 6,
    }}>
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      {label}
      {required && <span style={{ color: theme.primary }}>*</span>}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        border: `1.5px solid ${theme.border}`,
        borderRadius: 10,
        padding: "11px 14px",
        fontSize: 14,
        fontFamily: theme.fontSans,
        color: theme.text,
        background: theme.white,
        outline: "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        width: "100%",
        boxSizing: "border-box",
      }}
      onFocus={e => {
        e.target.style.borderColor = theme.primary;
        e.target.style.boxShadow = `0 0 0 3px ${theme.primaryLight}`;
      }}
      onBlur={e => {
        e.target.style.borderColor = theme.border;
        e.target.style.boxShadow = "none";
      }}
    />
  </div>
);

const TextareaField = ({ label, icon, placeholder, value, onChange, name, rows = 5 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{
      fontSize: 12,
      fontWeight: 600,
      color: theme.textMuted,
      fontFamily: theme.fontSans,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
      gap: 6,
    }}>
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      {label}
    </label>
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      style={{
        border: `1.5px solid ${theme.border}`,
        borderRadius: 10,
        padding: "11px 14px",
        fontSize: 14,
        fontFamily: theme.fontSans,
        color: theme.text,
        background: theme.white,
        outline: "none",
        resize: "vertical",
        transition: "border-color 0.2s, box-shadow 0.2s",
        width: "100%",
        boxSizing: "border-box",
        lineHeight: 1.6,
      }}
      onFocus={e => {
        e.target.style.borderColor = theme.primary;
        e.target.style.boxShadow = `0 0 0 3px ${theme.primaryLight}`;
      }}
      onBlur={e => {
        e.target.style.borderColor = theme.border;
        e.target.style.boxShadow = "none";
      }}
    />
  </div>
);

const Button = ({ children, onClick, disabled, type = "button", style = {} }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    style={{
      background: disabled ? "#C4B0B7" : `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
      color: theme.white,
      border: "none",
      borderRadius: 12,
      padding: "14px 24px",
      fontSize: 15,
      fontWeight: 700,
      fontFamily: theme.fontSans,
      cursor: disabled ? "not-allowed" : "pointer",
      width: "100%",
      letterSpacing: "0.04em",
      transition: "transform 0.15s, box-shadow 0.15s",
      boxShadow: disabled ? "none" : `0 4px 16px ${theme.primary}44`,
      ...style,
    }}
    onMouseEnter={e => { if (!disabled) { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = `0 6px 20px ${theme.primary}66`; } }}
    onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = disabled ? "none" : `0 4px 16px ${theme.primary}44`; }}
  >
    {children}
  </button>
);

const SectionCard = ({ icon, title, subtitle, children }) => (
  <div style={{
    background: theme.white,
    borderRadius: 18,
    padding: "24px 28px",
    boxShadow: "0 2px 14px rgba(200,49,90,0.07)",
    border: `1px solid ${theme.border}`,
  }}>
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: subtitle ? 4 : 0 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: theme.text, fontFamily: theme.fontSans }}>{title}</h3>
      </div>
      {subtitle && <p style={{ margin: "0 0 0 28px", fontSize: 13, color: theme.textMuted, fontFamily: theme.fontSans }}>{subtitle}</p>}
    </div>
    {children}
  </div>
);

const TwoCol = ({ children }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
    {children}
  </div>
);

// ─── Logo Uploader ─────────────────────────────────────────────────────────────

const LogoUploader = ({ logoFile, onUpload }) => {
  const inputRef = useRef(null);
  const preview = logoFile ? URL.createObjectURL(logoFile) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 }}>
      <div
        onClick={() => inputRef.current.click()}
        style={{
          width: 90,
          height: 90,
          borderRadius: 16,
          border: `2px dashed ${theme.primary}66`,
          background: theme.primaryLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          overflow: "hidden",
          transition: "border-color 0.2s, background 0.2s",
          marginBottom: 8,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.background = "#F0D8E2"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = `${theme.primary}66`; e.currentTarget.style.background = theme.primaryLight; }}
      >
        {preview
          ? <img src={preview} alt="logo preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
        }
      </div>
      <span style={{ fontSize: 12, color: theme.textMuted, fontFamily: theme.fontSans }}>
        {logoFile ? logoFile.name : "Upload your logo"}
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={e => onUpload(e.target.files[0] || null)}
      />
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const INITIAL_FORM = {
  // Shop Identity
  shopName: "",
  ownerName: "",
  logoFile: null,
  // Contact Information
  phone: "",
  email: "",
  shopAddress: "",
  // Online Presence
  instagram: "",
  facebookPage: "",
  website: "",
  // About
  description: "",
};

export default function PartnerFormulaire() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (file) => {
    setFormData(prev => ({ ...prev, logoFile: file }));
  };

  const isValid =
    formData.shopName.trim() &&
    formData.ownerName.trim() &&
    formData.phone.trim() &&
    formData.email.trim() &&
    formData.shopAddress.trim();

  const handleSubmit = () => {
    if (!isValid) return;

    // TODO: Build FormData for multipart upload (includes logo file)
    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null) payload.append(key, val);
    });
    // fetch('/api/partners/apply', { method: 'POST', body: payload })
    console.log("Partner application payload:", Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, v instanceof File ? v.name : v])
    ));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: theme.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: theme.fontSans }}>
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🏪</div>
          <h2 style={{ color: theme.primary, fontFamily: theme.font, fontSize: 32, margin: "0 0 8px" }}>Application Sent!</h2>
          <p style={{ color: theme.textMuted, fontSize: 15 }}>We'll review your application and get back to you within 48 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, fontFamily: theme.fontSans, padding: "44px 16px 60px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{
          width: 54, height: 54, borderRadius: 14,
          background: theme.primaryLight,
          border: `2px solid ${theme.primary}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <h1 style={{ margin: "0 0 6px", fontSize: 30, fontWeight: 700, color: theme.text, fontFamily: theme.font }}>
          Become a Partner
        </h1>
        <p style={{ margin: 0, color: theme.textMuted, fontSize: 14 }}>
          Join our network of pastry shops and reach more customers
        </p>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Shop Identity */}
        <SectionCard icon="🏬" title="Shop Identity">
          <LogoUploader logoFile={formData.logoFile} onUpload={handleLogoUpload} />
          <TwoCol>
            <InputField
              label="Shop Name"
              icon="🏬"
              placeholder="Pâtisserie El Bahia"
              value={formData.shopName}
              onChange={handleChange}
              name="shopName"
              required
            />
            <InputField
              label="Owner Name"
              icon="👤"
              placeholder="Your full name"
              value={formData.ownerName}
              onChange={handleChange}
              name="ownerName"
              required
            />
          </TwoCol>
        </SectionCard>

        {/* Contact Information */}
        <SectionCard icon="📞" title="Contact Information">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <TwoCol>
              <InputField
                label="Phone Number"
                icon="📞"
                placeholder="+213 5XX XXX XXX"
                value={formData.phone}
                onChange={handleChange}
                name="phone"
                type="tel"
                required
              />
              <InputField
                label="Email"
                icon="✉️"
                placeholder="contact@patisserie.dz"
                value={formData.email}
                onChange={handleChange}
                name="email"
                type="email"
                required
              />
            </TwoCol>
            <InputField
              label="Shop Address"
              icon="📍"
              placeholder="Centre-ville, Oran"
              value={formData.shopAddress}
              onChange={handleChange}
              name="shopAddress"
              required
            />
          </div>
        </SectionCard>

        {/* Online Presence */}
        <SectionCard icon="🌐" title="Online Presence">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <TwoCol>
              <InputField
                label="Instagram"
                icon="📸"
                placeholder="@your_pastry_shop"
                value={formData.instagram}
                onChange={handleChange}
                name="instagram"
              />
              <InputField
                label="Facebook Page Link"
                icon="🔗"
                placeholder="https://facebook.com/yourshop"
                value={formData.facebookPage}
                onChange={handleChange}
                name="facebookPage"
                type="url"
              />
            </TwoCol>
            <div style={{ position: "relative" }}>
              <InputField
                label="Website (optional)"
                icon="🌐"
                placeholder="https://your-pastry-shop.com"
                value={formData.website}
                onChange={handleChange}
                name="website"
                type="url"
              />
            </div>
          </div>
        </SectionCard>

        {/* About Your Shop */}
        <SectionCard
          icon="📋"
          title="About Your Shop"
          subtitle="Tell us about your specialties, experience, and what makes your shop unique"
        >
          <TextareaField
            name="description"
            placeholder="We are a family-owned pastry shop specializing in traditional Algerian cakes with a modern twist…"
            value={formData.description}
            onChange={handleChange}
          />
        </SectionCard>

        {/* Submit */}
        <div style={{
          background: theme.white,
          borderRadius: 16,
          padding: "20px 28px",
          border: `1px solid ${theme.border}`,
          boxShadow: "0 2px 12px rgba(200,49,90,0.07)",
        }}>
          {!isValid && (
            <p style={{ margin: "0 0 14px", fontSize: 13, color: theme.textMuted, textAlign: "center", fontFamily: theme.fontSans }}>
              Please fill in all required fields <span style={{ color: theme.primary }}>*</span>
            </p>
          )}
          <Button onClick={handleSubmit} disabled={!isValid}>
            Submit Application
          </Button>
        </div>

      </div>
    </div>
  );
}