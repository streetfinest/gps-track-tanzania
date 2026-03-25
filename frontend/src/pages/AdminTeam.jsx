import { useEffect, useState } from "react";
import API_BASE from "../config";

const emptyForm = {
  name: "",
  role: "",
  bio: "",
  media: []
};

function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const loadMembers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/team`);
      const data = await res.json();
      if (res.ok) setMembers(data);
      else setMessage(data.message || "Failed to load team");
    } catch {
      setMessage("Failed to load team");
    }
  };

  useEffect(() => {
    loadMembers();
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
      const res = await fetch(`${API_BASE}/api/upload/team-media`, {
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
      const url = editingId ? `${API_BASE}/api/team/${editingId}` : `${API_BASE}/api/team`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(editingId ? "Team post updated" : "Team post created");
        resetForm();
        loadMembers();
      } else {
        setMessage(data.message || "Failed to save");
      }
    } catch {
      setMessage("Server connection error");
    }
  };

  const handleEdit = (member) => {
    setEditingId(member._id);
    setForm({
      name: member.name || "",
      role: member.role || "",
      bio: member.bio || "",
      media: member.media || []
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team post?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/team/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        setMessage("Deleted successfully");
        loadMembers();
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
        <h2>{editingId ? "Edit Team Post" : "Manage Team"}</h2>
        <p className="info-text">Upload multiple images or videos in one team post.</p>
      </div>

      {message && <p className="info-text">{message}</p>}

      <div className="admin-products-layout">
        <form className="admin-product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          />

          <textarea
            rows="4"
            placeholder="Bio / Description"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />

          <input type="file" multiple accept="image/*,video/*" onChange={handleUpload} />
          {uploading && <p className="info-text">Uploading...</p>}

          <div className="admin-media-grid">
            {form.media.map((item, index) => (
              <div className="admin-media-box" key={index}>
                {item.type === "video" ? (
                  <video src={item.url} controls />
                ) : (
                  <img src={item.url} alt={`team-${index}`} />
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
          <h3>All Team Posts</h3>

          <div className="admin-product-grid">
            {members.map((member) => (
              <div className="admin-product-card" key={member._id}>
                {member.media?.[0]?.type === "video" ? (
                  <video src={member.media[0].url} controls />
                ) : (
                  <img src={member.media?.[0]?.url} alt={member.name} />
                )}

                <div className="admin-product-card__body">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                  <div className="admin-product-card__actions">
                    <button className="btn-gold-outline" type="button" onClick={() => handleEdit(member)}>
                      Edit
                    </button>
                    <button className="btn-red" type="button" onClick={() => handleDelete(member._id)}>
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

export default AdminTeam;