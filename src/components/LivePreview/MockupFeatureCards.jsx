import './MockupFeatureCards.scss';

const CARDS = [
  {
    title: 'Ship with confidence',
    text: 'Preview every color and font pairing on layouts your users actually see — not just swatches.',
    tag: 'Design',
  },
  {
    title: 'Built for teams',
    text: 'Lock what you love, shuffle the rest, and share combos with a link the whole team can open.',
    tag: 'Collaborate',
  },
  {
    title: 'Export ready',
    text: 'Copy CSS variables, Tailwind config, or design tokens when your combo is ready for production.',
    tag: 'Handoff',
  },
];

function MockupFeatureCards() {
  return (
    <section className="mockup-feature-cards">
      <header className="mockup-feature-cards__header">
        <h2 className="mockup-feature-cards__title">Everything you need to evaluate a combo</h2>
        <p className="mockup-feature-cards__subtitle">
          Three pillars teams use to decide if a palette and type pairing is ready to ship.
        </p>
      </header>
      <div className="mockup-feature-cards__grid">
        {CARDS.map((card) => (
          <article key={card.title} className="mockup-feature-cards__card">
            <div className="mockup-feature-cards__image" aria-hidden="true" />
            <div className="mockup-feature-cards__body">
              <span className="mockup-feature-cards__tag">{card.tag}</span>
              <h3 className="mockup-feature-cards__card-title">{card.title}</h3>
              <p className="mockup-feature-cards__card-text">{card.text}</p>
              <button type="button" className="mockup-feature-cards__link">Learn more →</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MockupFeatureCards;
