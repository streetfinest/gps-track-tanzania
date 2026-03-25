import { useState } from "react";

function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="container nav-inner">
          <a className="logo-wrap" href="/">
            <div className="logo-badge">GT</div>
            <div className="logo-text">
              <strong>GPS Track</strong>
              <span>Tanzania</span>
            </div>
          </a>

          <nav className="nav-links">
            <a href="/">Home</a>
            <a href="#features">Features</a>
            <a href="#consultation">Consultation</a>
            <a href="#contact">Contact</a>
            <a href="/admin">Admin</a>
          </nav>

          <div className="nav-actions">
            <button className="theme-btn" type="button" onClick={onToggleTheme}>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>

            <button className="menu-toggle" type="button" onClick={() => setMenuOpen(true)}>
              ☰
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer__overlay" onClick={() => setMenuOpen(false)}></div>
          <div className="mobile-drawer__panel">
            <div className="mobile-drawer__top">
              <h3>Menu</h3>
              <button type="button" onClick={() => setMenuOpen(false)}>✕</button>
            </div>

            <div className="mobile-drawer__links">
              <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
              <a href="#consultation" onClick={() => setMenuOpen(false)}>Consultation</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
              <a href="/admin" onClick={() => setMenuOpen(false)}>Admin</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;