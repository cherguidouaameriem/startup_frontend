import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChefHat, Menu, X } from "lucide-react"; // Import de Menu et X pour le mobile

const CakeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8194A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
    <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
    <path d="M2 21h20" />
    <path d="M7 8v3" />
    <path d="M12 8v3" />
    <path d="M17 8v3" />
    <path d="M7 4h.01" />
    <path d="M12 4h.01" />
    <path d="M17 4h.01" />
  </svg>
);

const defaultLinks = [
  { label: "Accueil", href: "/" },
  { label: "Personnaliser", href: "#design" },
  { label: "Pâtisseries", href: "#partners" },
];

export default function Navbar({ links = defaultLinks }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // État pour le menu mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav style={{
      ...styles.nav,
      ...(isScrolled || isOpen ? styles.navScrolled : styles.navTransparent)
    }}>
      <div style={styles.inner}>
        
        {/* LOGO */}
        <div onClick={() => navigate("/")} style={{ ...styles.logo, cursor: "pointer" }}>
          <CakeIcon />
          <span style={styles.logoText}>HalwaTech</span>
        </div>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <ul style={styles.navLinks}>
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={link.label === "Accueil" ? styles.activeLinkText : styles.linkText}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* RIGHT SECTION */}
        <div style={styles.rightSection}>
          {!isMobile && (
            <button 
              style={styles.portalBtn} 
              onClick={() => navigate("/connexion_patis")}
            >
              <ChefHat size={18} />
              <span>Portail Pâtissier</span>
            </button>
          )}

          {/* MOBILE TOGGLE */}
          {isMobile && (
            <button onClick={toggleMenu} style={styles.menuIcon}>
              {isOpen ? <X size={28} color="#1f2937" /> : <Menu size={28} color="#1f2937" />}
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobile && isOpen && (
        <div style={styles.mobileOverlay}>
          <ul style={styles.mobileLinks}>
            {links.map((link) => (
              <li key={link.label} style={{ width: "100%", textAlign: "center" }}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={link.label === "Accueil" ? styles.mobileActiveLink : styles.mobileLink}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li style={{ marginTop: 20 }}>
              <button 
                style={styles.mobilePortalBtn} 
                onClick={() => { navigate("/connexion_patis"); setIsOpen(false); }}
              >
                <ChefHat size={20} />
                <span>Portail Pâtissier</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: "all 0.3s ease-in-out",
    fontFamily: "'Inter', sans-serif",
  },
  navTransparent: {
    background: "transparent",
    padding: "20px 0",
  },
  navScrolled: {
    background: "rgba(255, 255, 255, 0.98)",
    padding: "12px 0",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #eaeaea",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  inner: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 24px", // Réduit pour mobile
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    zIndex: 1001,
  },
  logoText: {
    fontWeight: 700,
    fontSize: 20,
    color: "#1f2937",
    letterSpacing: "-0.5px",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: 40,
    margin: 0,
    padding: 0,
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  linkText: {
    fontSize: 15,
    color: "#6b7280",
    textDecoration: "none",
    fontWeight: 500,
  },
  activeLinkText: {
    fontSize: 15,
    color: "#C8194A",
    textDecoration: "none",
    fontWeight: 600,
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    zIndex: 1001,
  },
  portalBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f3f4f6",
    border: "none",
    fontSize: 14,
    fontWeight: 500,
    color: "#1f2937",
    cursor: "pointer",
    padding: "8px 16px",
    borderRadius: "8px",
  },
  menuIcon: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
  },
  mobileOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  mobileLinks: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
  },
  mobileLink: {
    fontSize: 22,
    color: "#4b5563",
    textDecoration: "none",
    fontWeight: 500,
  },
  mobileActiveLink: {
    fontSize: 22,
    color: "#C8194A",
    textDecoration: "none",
    fontWeight: 700,
  },
  mobilePortalBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#C8194A",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontSize: 16,
    fontWeight: 600,
  }
};