import './MockupHero.scss';

function MockupHero() {
  return (
    <section className="mockup-hero">
      <h2 className="mockup-hero__heading">
        Build something people love
      </h2>
      <p className="mockup-hero__subtext">
        A realistic preview of your palette and typography working together across real page elements.
      </p>
      <button type="button" className="mockup-hero__cta">
        Get started
      </button>
    </section>
  );
}

export default MockupHero;
