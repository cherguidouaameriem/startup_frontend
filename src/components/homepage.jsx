import { useState, useEffect } from "react";

export default function PattylyNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --coral: #e8432d;
        }

        .nav-link {
          color: #444;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          position: relative;
          transition: color 0.2s;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--coral);
          transition: width 0.25s ease;
        }

        .nav-link:hover {
          color: var(--coral);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .btn-primary {
          background: var(--coral);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 0.6rem 1.3rem;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn-primary:hover {
          background: #d63520;
        }

        .btn-ghost {
          background: transparent;
          border: none;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          color: #444;
        }

        .btn-ghost:hover {
          color: var(--coral);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
        }

        .hamburger span {
          width: 24px;
          height: 2px;
          background: #333;
          transition: 0.3s;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }

          .hamburger {
            display: flex;
          }
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
          transition: "0.3s ease",
          padding: "0 2rem",
        }}
      >
        <nav
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a href="#" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.5rem",
                letterSpacing: "-0.02em",
                color: "#1a1a1a",
              }}
            >
              HalwaTech
            </span>
          </a>

          {/* Desktop Links */}
          <div
            className="desktop-nav"
            style={{ display: "flex", gap: "2rem", alignItems: "center" }}
          >
            <a href="#" className="nav-link">À propos</a>
            <a href="#" className="nav-link">Tarifs</a>
            <a href="#" className="nav-link">Contact</a>
          </div>

          {/* Desktop Buttons */}
          <div
            className="desktop-nav"
            style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}
          >
            <button className="btn-ghost">Se connecter</button>
            <button className="btn-primary">Commencer</button>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span style={{ transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
          </button>
        </nav>
      </header>
    </div>
  );
}