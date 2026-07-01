import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupHero.scss';

function MockupHero({ onOpenAuth }) {
  const copy = MOCKUP_COPY.marketing.hero;

  return (
    <section className="mockup-hero">
      <p className="mockup-hero__eyebrow">{copy.eyebrow}</p>
      <h1 className="mockup-hero__heading">
        {copy.heading}
      </h1>
      <p className="mockup-hero__subtext">
        {copy.subtext}
      </p>
      <div className="mockup-hero__actions">
        <button type="button" className="mockup-hero__cta" onClick={onOpenAuth}>
          {copy.cta.primary}
        </button>
        <button type="button" className="mockup-hero__cta-secondary">
          {copy.cta.secondary}
        </button>
      </div>
    </section>
  );
}

export default MockupHero;
