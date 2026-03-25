function Hero() {
  return (
    <section className="hero-poster">
      <div className="hero-poster__overlay"></div>

      <div className="container hero-poster__grid">
        <div className="hero-poster__content hero-poster__content--center">
          <div className="hero-poster__brand">GPS TRACK TANZANIA</div>

          <h1>
            Advanced GPS Tracking
            <span>Solutions in Tanzania</span>
          </h1>

          <p className="hero-poster__text">
            We provide modern tracking, monitoring, and vehicle security solutions
            for private cars, business fleets, and transport operations with a
            professional and reliable service experience.
          </p>

          <div className="hero-poster__badges">
            <span>Professional Installation</span>
            <span>Trusted Support</span>
            <span>Real-Time Monitoring</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;