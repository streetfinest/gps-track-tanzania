import { useState } from "react";
import API_BASE from "../config";

function Consultation() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const submitConsultation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const res = await fetch(`${API_BASE}/api/consultations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback("Consultation submitted successfully.");
        setForm({
          name: "",
          phone: "",
          email: "",
          message: ""
        });
      } else {
        setFeedback(data.message || "Failed to submit consultation.");
      }
    } catch {
      setFeedback("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="consultation-section" id="consultation">
      <div className="consultation-section__bg"></div>

      <div className="container consultation-layout">
        <div className="consultation-copy">
          <div className="section-kicker">CONSULTATION</div>
          <h2>Request GPS Consultation</h2>
          <p>
            Talk to us about vehicle tracking, business monitoring, security
            upgrades, installation plans, and support services.
          </p>

          <div className="consultation-copy__points">
            <div className="consultation-point">Professional guidance</div>
            <div className="consultation-point">Fast response</div>
            <div className="consultation-point">Custom solutions</div>
          </div>
        </div>

        <form className="premium-form consultation-form--enhanced" onSubmit={submitConsultation}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            rows="5"
            placeholder="Write your request..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button className="btn-red" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Consultation"}
          </button>

          {feedback && <p className="consultation-feedback">{feedback}</p>}
        </form>
      </div>
    </section>
  );
}

export default Consultation;