function Contact() {
  return (
    <section className="contact-poster" id="contact">
      <div className="container">
        <div className="contact-poster__box">
          <div className="contact-poster__content">
            <h2>Contact Us</h2>
            <p>
              Talk to GPS Track Tanzania for consultation, installation,
              partnership, and support.
            </p>

            <div className="contact-phone">+255 69 329 7454</div>

            <div className="contact-social">
              <span>Follow us on social media</span>

              <a
                href="https://www.instagram.com/gpstrack_tanzania?igsh=MXN3ZjY4dmYzeWZ0ag=="
                target="_blank"
                rel="noreferrer"
                className="social-icon social-icon--instagram"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <div className="contact-poster__actions">
            <button
              className="btn-red"
              type="button"
              onClick={() => {
                window.location.href = "tel:+255693297454";
              }}
            >
              Call Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;