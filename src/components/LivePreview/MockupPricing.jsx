import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO } from '../../data/mockupCopy';
import './MockupPricing.scss';

function FeatureCell({ value, copy }) {
  if (value === true) {
    return <span className="mockup-pricing__check" aria-label={copy.included}>✓</span>;
  }
  if (value === false) {
    return <span className="mockup-pricing__dash" aria-label={copy.notIncluded}>—</span>;
  }
  return <span>{value}</span>;
}

function MockupPricing({ parts = {}, logoText = DEFAULT_PREVIEW_LOGO }) {
  const copy = MOCKUP_COPY.pricing;
  const show = (id) => parts[id] !== false;

  return (
    <section className="mockup-pricing">
      {show('topNav') && (
        <header className="mockup-pricing__nav">
          <span className="mockup-pricing__logo" data-inspect="pricing-nav-logo">{logoText}</span>
          <nav className="mockup-pricing__nav-links" aria-label="Pricing navigation">
            {copy.nav.links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>
            ))}
          </nav>
          <button type="button" className="mockup-pricing__nav-cta">{copy.nav.signIn}</button>
        </header>
      )}

      {show('pageHeader') && (
        <header className="mockup-pricing__header" id="plans">
          <h1 className="mockup-pricing__title" data-inspect="pricing-heading">{copy.header.title}</h1>
          <p className="mockup-pricing__subtitle">
            {copy.header.subtitle}
          </p>
        </header>
      )}

      {show('pricingTiers') && (
        <div className="mockup-pricing__grid">
          {copy.tiers.map((tier) => (
            <article
              key={tier.name}
              className={`mockup-pricing__tier ${tier.highlighted ? 'mockup-pricing__tier--highlighted' : ''}`}
            >
              {tier.highlighted && tier.badge && (
                <span className="mockup-pricing__badge">{tier.badge}</span>
              )}
              <h2 className="mockup-pricing__tier-name" data-inspect={tier.highlighted ? 'tier-name' : undefined}>{tier.name}</h2>
              <p className="mockup-pricing__tier-desc">{tier.description}</p>
              <p className="mockup-pricing__price" data-inspect={tier.highlighted ? 'tier-price' : undefined}>
                <span className="mockup-pricing__price-amount">{tier.price}</span>
                <span className="mockup-pricing__price-period">{copy.period}</span>
              </p>
              <ul className="mockup-pricing__features">
                {tier.features.map((feature, featureIndex) => (
                  <li key={feature} className="mockup-pricing__feature" data-inspect={tier.highlighted && featureIndex === 0 ? 'tier-feature' : undefined}>{feature}</li>
                ))}
              </ul>
              <button
                type="button"
                className={`mockup-pricing__cta ${tier.highlighted ? 'mockup-pricing__cta--primary' : ''}`}
                data-inspect={tier.highlighted ? 'tier-cta' : undefined}
              >
                {copy.cta}
              </button>
            </article>
          ))}
        </div>
      )}

      {show('featureComparison') && (
        <section className="mockup-pricing__comparison" id="compare">
          <h2 className="mockup-pricing__comparison-title">{copy.comparison.title}</h2>
          <p className="mockup-pricing__comparison-desc">
            {copy.comparison.subtitle}
          </p>
          <div className="mockup-pricing__comparison-wrap">
            <table className="mockup-pricing__comparison-table">
              <thead>
                <tr>
                  <th scope="col">{copy.comparison.columnFeature}</th>
                  {copy.tiers.map((tier) => (
                    <th key={tier.id} scope="col">{tier.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.comparison.rows.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    <td><FeatureCell value={row.starter} copy={copy.comparison} /></td>
                    <td><FeatureCell value={row.pro} copy={copy.comparison} /></td>
                    <td><FeatureCell value={row.enterprise} copy={copy.comparison} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </section>
  );
}

export default MockupPricing;
