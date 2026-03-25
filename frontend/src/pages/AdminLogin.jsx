import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE from "../config";

function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("admin_token", data.token);
        navigate("/admin/dashboard/consultations");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch {
      setMessage("Server connection error");
    }
  };

  return (
    <div className="admin-login-page admin-login-page--fancy">
      <div className="admin-login-page__bg"></div>

      <header className="navbar">
        <div className="container nav-inner">
          <div className="logo-wrap">
            <div className="logo-badge">GT</div>
            <div className="logo-text">
              <strong>GPS Track</strong>
              <span>Tanzania</span>
            </div>
          </div>

          <div className="nav-actions">
            <Link to="/" className="theme-btn">Home</Link>
          </div>
        </div>
      </header>

      <div className="admin-login-box admin-login-box--glass">
        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button className="btn-red" type="submit">Login</button>
          <p className="info-text">{message}</p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;