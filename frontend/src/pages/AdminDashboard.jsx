import { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  return (
    <div className="admin-layout admin-layout--fancy">
      <div className="admin-layout__bg"></div>

      <aside className="admin-sidebar admin-sidebar--glass admin-sidebar--desktop">
        <h2>Admin Panel</h2>

        <nav>
          <Link to="/admin/dashboard/features">Features</Link>
          <Link to="/admin/dashboard/consultations">Consultations</Link>
          <Link to="/admin/dashboard/team">Team</Link>
          <Link to="/admin/dashboard/works">Works</Link>
        </nav>

        <button className="btn-red" onClick={logout}>Logout</button>
      </aside>

      <main className="admin-main admin-main--glass">
        <div className="admin-mobile-topbar">
          <button
            className="admin-menu-toggle"
            type="button"
            onClick={() => setMenuOpen(true)}
          >
            ☰ Admin Menu
          </button>
        </div>

        <Outlet />
      </main>

      {menuOpen && (
        <div className="admin-mobile-drawer">
          <div
            className="admin-mobile-drawer__overlay"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="admin-mobile-drawer__panel">
            <div className="admin-mobile-drawer__top">
              <h3>Admin Panel</h3>
              <button type="button" onClick={() => setMenuOpen(false)}>✕</button>
            </div>

            <nav className="admin-mobile-drawer__links">
              <Link to="/admin/dashboard/features" onClick={() => setMenuOpen(false)}>
                Features
              </Link>
              <Link to="/admin/dashboard/consultations" onClick={() => setMenuOpen(false)}>
                Consultations
              </Link>
              <Link to="/admin/dashboard/team" onClick={() => setMenuOpen(false)}>
                Team
              </Link>
              <Link to="/admin/dashboard/works" onClick={() => setMenuOpen(false)}>
                Works
              </Link>
            </nav>

            <button className="btn-red" onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;