import './MockupHero.scss';

function MockupHero({ onOpenAuth }) {
  return (
    <section className="mockup-hero">
      <p className="mockup-hero__eyebrow">Design better, ship faster</p>
      <h1 className="mockup-hero__heading">
        The modern way to build beautiful products
      </h1>
      <p className="mockup-hero__subtext">
        See your palette and typography come alive on a real landing page — hero,
        cards, forms, and navigation working together.
      </p>
      <div className="mockup-hero__actions">
        <button type="button" className="mockup-hero__cta" onClick={onOpenAuth}>
          Get started free
        </button>
        <button type="button" className="mockup-hero__cta-secondary">
          View demo
        </button>
      </div>
    </section>
  );
}

export default MockupHero;
