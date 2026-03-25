import { useEffect, useState } from "react";
import API_BASE from "../config";

function Team() {
  const [members, setMembers] = useState([]);
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/team`)
      .then((res) => res.json())
      .then((data) => setMembers(Array.isArray(data) ? data : []))
      .catch(() => setMembers([]));
  }, []);

  return (
    <>
      <section className="team-section" id="team">
        <div className="container">
          <div className="section-heading">
            <h2>Our Team</h2>
            <p>Meet the people behind our GPS tracking solutions and support services.</p>
          </div>

          <div className="team-grid">
            {members.map((member) => (
              <div className="team-card" key={member._id}>
                <div className="team-card__media-preview">
                  {member.media?.slice(0, 4).map((item, index) =>
                    item.type === "video" ? (
                      <video key={index} src={item.url} muted />
                    ) : (
                      <img key={index} src={item.url} alt={member.name} />
                    )
                  )}
                </div>

                <div className="team-card__body">
                  <div className="team-card__meta">
                    <h3>{member.name}</h3>
                    <span>{member.role}</span>
                  </div>

                  <p>{member.bio}</p>

                  <button
                    className="learn-more-btn"
                    type="button"
                    onClick={() => setViewer(member)}
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
              <h3>{viewer.name}</h3>
              <button type="button" onClick={() => setViewer(null)}>✕</button>
            </div>

            <p className="info-text">{viewer.role}</p>
            <p>{viewer.bio}</p>

            <div className="media-viewer__grid">
              {viewer.media?.map((item, index) =>
                item.type === "video" ? (
                  <video key={index} src={item.url} controls className="media-viewer__item" />
                ) : (
                  <img key={index} src={item.url} alt={`team-${index}`} className="media-viewer__item" />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Team;