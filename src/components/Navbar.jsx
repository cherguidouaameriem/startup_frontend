import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChefHat, Menu, X } from "lucide-react";

const defaultLinks = [
  { label: "Accueil", path: "/" },
  { label: "Pâtisseries", path: "/pastry-shops" },
];

export default function Navbar({ links = defaultLinks }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navigate = useNavigate();
  const location = useLocation();

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

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        ...styles.nav,
        ...(isScrolled || isOpen
          ? styles.navScrolled
          : styles.navTransparent),
      }}
    >
      <div style={styles.inner}>
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          style={{ ...styles.logo, cursor: "pointer" }}
        >
          <img
            src="/images/cakes/logo-halwatech.png"
            alt="HalwaTech Logo"
            style={styles.logoImage}
          />
          <span style={styles.logoText}>HalwaTech</span>
        </div>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <ul style={styles.navLinks}>
            {links.map((link) => (
              <li key={link.label}>
                <span
                  onClick={() => navigate(link.path)}
                  style={
                    isActive(link.path)
                      ? styles.activeLinkText
                      : styles.linkText
                  }
                >
                  {link.label}
                </span>
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

          {isMobile && (
            <button onClick={() => setIsOpen(!isOpen)} style={styles.menuIcon}>
              {isOpen ? (
                <X size={28} color="#1f2937" />
              ) : (
                <Menu size={28} color="#1f2937" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobile && isOpen && (
        <div style={styles.mobileOverlay}>
          <ul style={styles.mobileLinks}>
            {links.map((link) => (
              <li key={link.label}>
                <span
                  onClick={() => {
                    navigate(link.path);
                    setIsOpen(false);
                  }}
                  style={
                    isActive(link.path)
                      ? styles.mobileActiveLink
                      : styles.mobileLink
                  }
                >
                  {link.label}
                </span>
              </li>
            ))}

            <li style={{ marginTop: 20 }}>
              <button
                style={styles.mobilePortalBtn}
                onClick={() => {
                  navigate("/connexion_patis");
                  setIsOpen(false);
                }}
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
    padding: "0 24px",
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

  logoImage: {
    width: 28,
    height: 28,
    objectFit: "cover",
    borderRadius: "8px",
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
    fontWeight: 500,
    cursor: "pointer",
  },

  activeLinkText: {
    fontSize: 15,
    color: "#C8194A",
    fontWeight: 600,
    cursor: "pointer",
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
    fontWeight: 500,
    cursor: "pointer",
  },

  mobileActiveLink: {
    fontSize: 22,
    color: "#C8194A",
    fontWeight: 700,
    cursor: "pointer",
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
  },
};