function HowItWorks() {
  return (
    <section className="how-section">
      <div className="how-section__bg"></div>

      <div className="container">
        <div className="section-heading premium-heading">
          <h2>How It Works</h2>
          <p>Simple setup, secure hardware and clear real-time tracking access.</p>
        </div>

        <div className="how-grid">
          <div className="how-glass-card">
            <h3>1. Install Device</h3>
            <p>
              The GPS tracker is professionally installed inside the vehicle in a secure location.
            </p>
          </div>
          <div className="how-glass-card">
            <h3>2. Connect via SIM</h3>
            <p>
              The device uses a SIM connection to send real-time movement and status data.
            </p>
          </div>
          <div className="how-glass-card">
            <h3>3. Track via App / Web</h3>
            <p>
              View location, trip history and system information through your dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;