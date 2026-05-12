import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        
        {/* TOP */}
        <div style={styles.topSection}>
          
          {/* BRAND */}
          <div style={styles.brandBlock}>
            <h2 style={styles.logo}>HalwaTech</h2>

            <p style={styles.description}>
              Découvrez les meilleures pâtisseries de votre wilaya et
              créez votre gâteau personnalisé en quelques clics grâce
              à notre expérience 3D immersive.
            </p>

            {/* SOCIALS */}
            <div style={styles.socials}>
              <a href="#" style={styles.socialBtn}>
                <Instagram size={18} />
              </a>

              <a href="#" style={styles.socialBtn}>
                <Facebook size={18} />
              </a>

              <a href="mailto:contact@halwatech.dz" style={styles.socialBtn}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div style={styles.linksGrid}>
            
            {/* Navigation */}
            <div>
              <h4 style={styles.columnTitle}>Navigation</h4>

              <div style={styles.linksColumn}>
                <Link to="/" style={styles.link}>
                  Accueil
                </Link>

                <Link to="/delivery" style={styles.link}>
                  Commander
                </Link>

                <Link to="/pastry-shops" style={styles.link}>
                  Pâtisseries
                </Link>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 style={styles.columnTitle}>Support</h4>

              <div style={styles.linksColumn}>
                <a href="mailto:contact@halwatech.dz" style={styles.link}>
                  Contact
                </a>

                <Link to="/connexion_patis" style={styles.link}>
                  Espace pâtissier
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={styles.columnTitle}>Contact</h4>

              <div style={styles.contactColumn}>
                <div style={styles.contactItem}>
                  <MapPin size={15} />
                  <span>Oran, Algérie</span>
                </div>

                <div style={styles.contactItem}>
                  <Phone size={15} />
                  <span>+213 XX XX XX XX</span>
                </div>

                <div style={styles.contactItem}>
                  <Mail size={15} />
                  <span>contact@halwatech.dz</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM */}
        <div style={styles.bottom}>
          <span>
            © {new Date().getFullYear()} HalwaTech — Tous droits réservés
          </span>

          <span style={styles.made}>
            Créé avec passion 🍰
          </span>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "linear-gradient(180deg, #b31542 0%, #8f1034 100%)",
    padding: "70px 24px 30px",
    marginTop: 80,
  },

  inner: {
    maxWidth: 1200,
    margin: "0 auto",
  },

  topSection: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 60,
    paddingBottom: 40,
    borderBottom: "1px solid rgba(255,255,255,0.12)",

    // responsive
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },

  brandBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 34,
    fontWeight: 800,
    color: "#fff",
    margin: 0,
    letterSpacing: "-1px",
  },

  description: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    lineHeight: 1.8,
    color: "rgba(255,255,255,0.78)",
    maxWidth: 500,
    margin: 0,
  },

  socials: {
    display: "flex",
    gap: 14,
    marginTop: 6,
  },

  socialBtn: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textDecoration: "none",
    transition: "all 0.25s ease",
    backdropFilter: "blur(10px)",
  },

  linksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 30,
  },

  columnTitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "rgba(255,255,255,0.55)",
    marginBottom: 18,
  },

  linksColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  link: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    color: "rgba(255,255,255,0.82)",
    textDecoration: "none",
    transition: "all 0.2s ease",
  },

  contactColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
  },

  bottom: {
    marginTop: 24,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    color: "rgba(255,255,255,0.55)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
  },

  made: {
    opacity: 0.9,
  },
};