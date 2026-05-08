

const defaultLinks = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Track Order", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer({ links = defaultLinks }) {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.topRow}>
          {/* Brand */}
          <div style={styles.brand}>
            <span style={styles.brandName}>HalwaTech</span>
            <p style={styles.tagline}>
              Connecting cake lovers with the finest local pastry shops.
            </p>
            <div style={styles.socials}>
              {["Instagram", "Facebook", "Twitter"].map((s) => (
                <a key={s} href="#" style={styles.socialLink}>{s}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div style={styles.columns}>
            {Object.entries(links).map(([col, items]) => (
              <div key={col} style={styles.column}>
                <h4 style={styles.colTitle}>
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </h4>
                <ul style={styles.colList}>
                  {items.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} style={styles.colLink}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.bottomRow}>
          <span style={styles.copyright}>
            © {new Date().getFullYear()} HalwaTech. All rights reserved.
          </span>
          <span style={styles.madeWith}>Faits avec amour</span>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#eb6988",
    padding: "56px 24px 32px",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  topRow: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: 64,
    paddingBottom: 40,
    borderBottom: "1px solid #C8194A",
    marginBottom: 24,
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  brandName: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 22,
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "-0.3px",
  },
  tagline: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    lineHeight: 1.6,
    margin: 0,
    maxWidth: 240,
  },
  socials: {
    display: "flex",
    gap: 16,
  },
  socialLink: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  columns: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 32,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  colTitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    margin: 0,
  },
  colList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  colLink: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  copyright: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: "rgba(255,255,255,0.3)",
  },
  madeWith: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: "rgba(255,255,255,0.3)",
  },
};