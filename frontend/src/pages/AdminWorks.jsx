import { useEffect, useState } from "react";
import API_BASE from "../config";

const emptyForm = {
  title: "",
  description: "",
  media: []
};

function AdminWorks() {
  const [works, setWorks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const loadWorks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/works`);
      const data = await res.json();
      if (res.ok) setWorks(data);
      else setMessage(data.message || "Failed to load works");
    } catch {
      setMessage("Failed to load works");
    }
  };

  useEffect(() => {
    loadWorks();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i += 1) {
      formData.append("files", files[i]);
    }

    setUploading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/upload/work-media`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setForm((prev) => ({
          ...prev,
          media: [...prev.media, ...data.files]
        }));
        setMessage("Media uploaded successfully");
      } else {
        setMessage(data.message || "Upload failed");
      }
    } catch {
      setMessage("Server connection error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = editingId ? `${API_BASE}/api/works/${editingId}` : `${API_BASE}/api/works`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(editingId ? "Work post updated" : "Work post created");
        resetForm();
        loadWorks();
      } else {
        setMessage(data.message || "Failed to save");
      }
    } catch {
      setMessage("Server connection error");
    }
  };

  const handleEdit = (work) => {
    setEditingId(work._id);
    setForm({
      title: work.title || "",
      description: work.description || "",
      media: work.media || []
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this work post?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/works/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        setMessage("Deleted successfully");
        loadWorks();
      } else {
        setMessage(data.message || "Delete failed");
      }
    } catch {
      setMessage("Server connection error");
    }
  };

  const removeMedia = (index) => {
    setForm((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  return (
    <div>
      <div className="section-heading">
        <h2>{editingId ? "Edit Work Post" : "Manage Works"}</h2>
        <p className="info-text">Upload multiple images or videos in one work post.</p>
      </div>

      {message && <p className="info-text">{message}</p>}

      <div className="admin-products-layout">
        <form className="admin-product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            rows="4"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input type="file" multiple accept="image/*,video/*" onChange={handleUpload} />
          {uploading && <p className="info-text">Uploading...</p>}

          <div className="admin-media-grid">
            {form.media.map((item, index) => (
              <div className="admin-media-box" key={index}>
                {item.type === "video" ? (
                  <video src={item.url} controls />
                ) : (
                  <img src={item.url} alt={`work-${index}`} />
                )}
                <button type="button" className="btn-red" onClick={() => removeMedia(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button className="btn-red" type="submit">
            {editingId ? "Update Post" : "Save Post"}
          </button>

          {editingId && (
            <button className="btn-gold-outline" type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        <div className="admin-product-list">
          <h3>All Work Posts</h3>

          <div className="admin-product-grid">
            {works.map((work) => (
              <div className="admin-product-card" key={work._id}>
                {work.media?.[0]?.type === "video" ? (
                  <video src={work.media[0].url} controls />
                ) : (
                  <img src={work.media?.[0]?.url} alt={work.title} />
                )}

                <div className="admin-product-card__body">
                  <h4>{work.title}</h4>
                  <p>{work.description}</p>
                  <div className="admin-product-card__actions">
                    <button className="btn-gold-outline" type="button" onClick={() => handleEdit(work)}>
                      Edit
                    </button>
                    <button className="btn-red" type="button" onClick={() => handleDelete(work._id)}>
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

export default AdminWorks;