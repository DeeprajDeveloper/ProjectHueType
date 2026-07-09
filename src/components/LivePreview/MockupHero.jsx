import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupHero.scss';

function MockupHero({ copy = MOCKUP_COPY.marketing.hero, onOpenAuth }) {

  return (
    <section className="mockup-hero">
      <p className="mockup-hero__eyebrow" data-inspect="hero-eyebrow">{copy.eyebrow}</p>
      <h1 className="mockup-hero__heading" data-inspect="hero-heading">
        {copy.heading}
      </h1>
      <p className="mockup-hero__subtext" data-inspect="hero-body">
        {copy.subtext}
      </p>
      <div className="mockup-hero__actions">
        <button type="button" className="mockup-hero__cta" data-inspect="hero-cta-primary" onClick={onOpenAuth}>
          {copy.cta.primary}
        </button>
        <button type="button" className="mockup-hero__cta-secondary" data-inspect="hero-cta-secondary">
          {copy.cta.secondary}
        </button>
      </div>
    </section>
  );
}

export default MockupHero;
