import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupFeatureCards.scss';

function MockupFeatureCards() {
  const copy = MOCKUP_COPY.marketing.featureCards;

  return (
    <section className="mockup-feature-cards">
      <header className="mockup-feature-cards__header">
        <h2 className="mockup-feature-cards__title">{copy.header.title}</h2>
        <p className="mockup-feature-cards__subtitle">
          {copy.header.subtitle}
        </p>
      </header>
      <div className="mockup-feature-cards__grid">
        {copy.cards.map((card) => (
          <article key={card.title} className="mockup-feature-cards__card">
            <div className="mockup-feature-cards__image" aria-hidden="true" />
            <div className="mockup-feature-cards__body">
              <span className="mockup-feature-cards__tag">{card.tag}</span>
              <h3 className="mockup-feature-cards__card-title">{card.title}</h3>
              <p className="mockup-feature-cards__card-text">{card.text}</p>
              <button type="button" className="mockup-feature-cards__link">{copy.link}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MockupFeatureCards;
