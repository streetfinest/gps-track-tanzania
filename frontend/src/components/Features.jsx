import { useEffect, useState } from "react";
import API_BASE from "../config";

function Features() {
  const [features, setFeatures] = useState([]);
  const [openFeatureId, setOpenFeatureId] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/features`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFeatures(data);
        } else {
          setFeatures([]);
        }
      })
      .catch(() => setFeatures([]));
  }, []);

  const toggleFeature = (id) => {
    setOpenFeatureId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="features-poster" id="features">
      <div className="features-poster__bg"></div>

      <div className="container">
        <div className="section-heading premium-heading">
          <h2>Key Features</h2>
          <p>Powerful tracking and management features for your vehicles and operations.</p>
        </div>

        <div className="features-poster__grid">
          {features.map((feature) => {
            const isOpen = openFeatureId === feature._id;

            return (
              <div className={`feature-glass-card ${isOpen ? "open" : ""}`} key={feature._id}>
                <div className="feature-glass-card__top">
                  <h3>{feature.title}</h3>
                </div>

                <p>{feature.shortText}</p>

                <button
                  className="learn-more-btn"
                  type="button"
                  onClick={() => toggleFeature(feature._id)}
                >
                  {isOpen ? "Close" : "Learn More"}
                </button>

                <div className={`feature-inline-details ${isOpen ? "show" : ""}`}>
                  <p>{feature.fullText || feature.shortText}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;