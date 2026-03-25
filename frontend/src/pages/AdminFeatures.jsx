import { useEffect, useState } from "react";
import API_BASE from "../config";

const emptyForm = {
  title: "",
  shortText: "",
  fullText: ""
};

function AdminFeatures() {
  const [features, setFeatures] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadFeatures = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/features`);
      const data = await res.json();

      if (res.ok) {
        setFeatures(data);
      } else {
        setMessage(data.message || "Failed to load features");
      }
    } catch {
      setMessage("Failed to load features");
    }
  };

  useEffect(() => {
    loadFeatures();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = editingId
        ? `${API_BASE}/api/features/${editingId}`
        : `${API_BASE}/api/features`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(editingId ? "Feature updated successfully" : "Feature saved successfully");
        resetForm();
        loadFeatures();
      } else {
        setMessage(data.message || "Failed to save feature");
      }
    } catch {
      setMessage("Server connection error");
    }
  };

  const handleEdit = (feature) => {
    setEditingId(feature._id);
    setForm({
      title: feature.title || "",
      shortText: feature.shortText || "",
      fullText: feature.fullText || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this feature?");
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/api/features/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Feature deleted successfully");
        loadFeatures();
      } else {
        setMessage(data.message || "Failed to delete feature");
      }
    } catch {
      setMessage("Server connection error");
    }
  };

  return (
    <div>
      <div className="section-heading">
        <h2>{editingId ? "Edit Feature" : "Manage Features"}</h2>
        <p className="info-text">Add, edit or remove homepage key features.</p>
      </div>

      {message && <p className="info-text">{message}</p>}

      <div className="admin-products-layout">
        <form className="admin-product-form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Update Feature" : "Add Feature"}</h3>

          <input
            type="text"
            placeholder="Feature Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            rows="3"
            placeholder="Short explanation"
            value={form.shortText}
            onChange={(e) => setForm({ ...form, shortText: e.target.value })}
          />

          <textarea
            rows="5"
            placeholder="Full explanation for Learn More"
            value={form.fullText}
            onChange={(e) => setForm({ ...form, fullText: e.target.value })}
          />

          <button className="btn-red" type="submit">
            {editingId ? "Update Feature" : "Save Feature"}
          </button>

          {editingId && (
            <button className="btn-gold-outline" type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        <div className="admin-product-list">
          <h3>All Features</h3>

          <div className="admin-product-grid">
            {features.map((feature) => (
              <div className="admin-product-card" key={feature._id}>
                <div className="admin-product-card__body">
                  <h4>{feature.title}</h4>
                  <p>{feature.shortText}</p>

                  <div className="admin-product-card__actions">
                    <button
                      className="btn-gold-outline"
                      type="button"
                      onClick={() => handleEdit(feature)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-red"
                      type="button"
                      onClick={() => handleDelete(feature._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFeatures;