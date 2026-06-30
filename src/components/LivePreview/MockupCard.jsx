import './MockupCard.scss';

function MockupCard() {
  return (
    <section className="mockup-card-section">
      <article className="mockup-card">
        <div className="mockup-card__image" aria-hidden="true" />
        <div className="mockup-card__body">
          <span className="mockup-card__tag">Featured</span>
          <h3 className="mockup-card__title">Design with confidence</h3>
          <p className="mockup-card__text">
            See how your palette and fonts work together on cards, forms, and navigation — not just swatches.
          </p>
        </div>
      </article>
    </section>
  );
}

export default MockupCard;
