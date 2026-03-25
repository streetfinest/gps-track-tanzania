import { useEffect, useState } from "react";
import API_BASE from "../config";

function Works() {
  const [works, setWorks] = useState([]);
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/works`)
      .then((res) => res.json())
      .then((data) => setWorks(Array.isArray(data) ? data : []))
      .catch(() => setWorks([]));
  }, []);

  return (
    <>
      <section className="works-section" id="works">
        <div className="container">
          <div className="section-heading">
            <h2>Our Works</h2>
            <p>See some of our installations, field activity, and completed GPS projects.</p>
          </div>

          <div className="works-grid">
            {works.map((work) => (
              <div className="work-card" key={work._id}>
                <div className="team-card__media-preview">
                  {work.media?.slice(0, 4).map((item, index) =>
                    item.type === "video" ? (
                      <video key={index} src={item.url} muted />
                    ) : (
                      <img key={index} src={item.url} alt={work.title} />
                    )
                  )}
                </div>

                <div className="work-card__body">
                  <div className="team-card__meta">
                    <h3>{work.title}</h3>
                  </div>

                  <p>{work.description}</p>

                  <button
                    className="learn-more-btn"
                    type="button"
                    onClick={() => setViewer(work)}
                  >
                    View Post
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {viewer && (
        <div className="media-viewer-overlay" onClick={() => setViewer(null)}>
          <div className="media-viewer" onClick={(e) => e.stopPropagation()}>
            <div className="media-viewer__top">
              <h3>{viewer.title}</h3>
              <button type="button" onClick={() => setViewer(null)}>✕</button>
            </div>

            <p>{viewer.description}</p>

            <div className="media-viewer__grid">
              {viewer.media?.map((item, index) =>
                item.type === "video" ? (
                  <video key={index} src={item.url} controls className="media-viewer__item" />
                ) : (
                  <img key={index} src={item.url} alt={`work-${index}`} className="media-viewer__item" />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Works;