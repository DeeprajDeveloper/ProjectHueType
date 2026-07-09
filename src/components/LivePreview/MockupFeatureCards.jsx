import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupFeatureCards.scss';

function MockupFeatureCards({ copy = MOCKUP_COPY.marketing.featureCards }) {

  return (
    <section className="mockup-feature-cards">
      <header className="mockup-feature-cards__header">
        <h2 className="mockup-feature-cards__title" data-inspect="section-heading">{copy.header.title}</h2>
        <p className="mockup-feature-cards__subtitle">
          {copy.header.subtitle}
        </p>
      </header>
      <div className="mockup-feature-cards__grid">
        {copy.cards.map((card, index) => (
          <article key={card.title} className="mockup-feature-cards__card">
            <div className="mockup-feature-cards__image" aria-hidden="true" />
            <div className="mockup-feature-cards__body">
              <span className="mockup-feature-cards__tag">{card.tag}</span>
              <h3 className="mockup-feature-cards__card-title" data-inspect={index === 0 ? 'feature-card-heading' : undefined}>{card.title}</h3>
              <p className="mockup-feature-cards__card-text" data-inspect={index === 0 ? 'feature-card-body' : undefined}>{card.text}</p>
              <button type="button" className="mockup-feature-cards__link">{copy.link}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MockupFeatureCards;
