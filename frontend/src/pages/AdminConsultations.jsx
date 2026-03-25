import { useEffect, useState } from "react";
import API_BASE from "../config";

function AdminConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [message, setMessage] = useState("");

  const loadConsultations = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/consultations`);
      const data = await res.json();

      if (res.ok) {
        setConsultations(data);
      } else {
        setMessage(data.message || "Failed to load consultations");
      }
    } catch {
      setMessage("Failed to load consultations");
    }
  };

  useEffect(() => {
    loadConsultations();
  }, []);

  return (
    <div>
      <div className="section-heading">
        <h2>Manage Consultations</h2>
        <p className="info-text">Review all consultation requests from visitors.</p>
      </div>

      {message && <p className="info-text">{message}</p>}

      <div className="admin-consultation-grid">
        {consultations.length === 0 ? (
          <div className="admin-empty-box">
            <p>No consultations available.</p>
          </div>
        ) : (
          consultations.map((item) => (
            <div className="admin-consultation-card admin-consultation-card--enhanced" key={item._id}>
              <div className="admin-consultation-card__top">
                <div>
                  <h3>{item.name}</h3>
                  <p className="consultation-date">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="admin-consultation-meta">
                <p><strong>Phone:</strong> {item.phone}</p>
                <p><strong>Email:</strong> {item.email || "N/A"}</p>
              </div>

              <div className="consultation-message-box">
                <h4>Message</h4>
                <p>{item.message || "No message provided."}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminConsultations;