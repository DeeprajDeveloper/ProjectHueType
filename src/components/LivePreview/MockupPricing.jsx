import './MockupPricing.scss';

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$19',
    description: 'For individuals getting started.',
    features: ['Up to 3 projects', 'Basic analytics', 'Email support', '1 GB storage'],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$49',
    description: 'For growing teams that need more.',
    features: ['Unlimited projects', 'Advanced analytics', 'Priority support', '50 GB storage', 'Custom domains'],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    description: 'For organizations at scale.',
    features: ['Everything in Pro', 'SSO & SAML', 'Dedicated manager', 'Unlimited storage', 'SLA guarantee'],
    highlighted: false,
  },
];

const COMPARISON_ROWS = [
  { feature: 'Projects', starter: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Team members', starter: '1', pro: '10', enterprise: 'Unlimited' },
  { feature: 'Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Advanced + exports' },
  { feature: 'Custom domains', starter: false, pro: true, enterprise: true },
  { feature: 'Priority support', starter: false, pro: true, enterprise: true },
  { feature: 'SSO / SAML', starter: false, pro: false, enterprise: true },
  { feature: 'Dedicated manager', starter: false, pro: false, enterprise: true },
  { feature: 'SLA guarantee', starter: false, pro: false, enterprise: true },
];

function FeatureCell({ value }) {
  if (value === true) {
    return <span className="mockup-pricing__check" aria-label="Included">✓</span>;
  }
  if (value === false) {
    return <span className="mockup-pricing__dash" aria-label="Not included">—</span>;
  }
  return <span>{value}</span>;
}

function MockupPricing({ parts = {}, logoText = 'Acme Co.' }) {
  const show = (id) => parts[id] !== false;

  return (
    <section className="mockup-pricing">
      {show('topNav') && (
        <header className="mockup-pricing__nav">
          <span className="mockup-pricing__logo">{logoText}</span>
          <nav className="mockup-pricing__nav-links" aria-label="Pricing navigation">
            <a href="#plans">Plans</a>
            <a href="#compare">Compare</a>
            <a href="#faq">FAQ</a>
          </nav>
          <button type="button" className="mockup-pricing__nav-cta">Sign in</button>
        </header>
      )}

      {show('pageHeader') && (
        <header className="mockup-pricing__header" id="plans">
          <h1 className="mockup-pricing__title">Choose your plan</h1>
          <p className="mockup-pricing__subtitle">
            Simple, transparent pricing. Upgrade or downgrade at any time.
          </p>
        </header>
      )}

      {show('pricingTiers') && (
        <div className="mockup-pricing__grid">
          {TIERS.map((tier) => (
            <article
              key={tier.name}
              className={`mockup-pricing__tier ${tier.highlighted ? 'mockup-pricing__tier--highlighted' : ''}`}
            >
              {tier.highlighted && (
                <span className="mockup-pricing__badge">Most popular</span>
              )}
              <h2 className="mockup-pricing__tier-name">{tier.name}</h2>
              <p className="mockup-pricing__tier-desc">{tier.description}</p>
              <p className="mockup-pricing__price">
                <span className="mockup-pricing__price-amount">{tier.price}</span>
                <span className="mockup-pricing__price-period">/month</span>
              </p>
              <ul className="mockup-pricing__features">
                {tier.features.map((feature) => (
                  <li key={feature} className="mockup-pricing__feature">{feature}</li>
                ))}
              </ul>
              <button
                type="button"
                className={`mockup-pricing__cta ${tier.highlighted ? 'mockup-pricing__cta--primary' : ''}`}
              >
                Get started
              </button>
            </article>
          ))}
        </div>
      )}

      {show('featureComparison') && (
        <section className="mockup-pricing__comparison" id="compare">
          <h2 className="mockup-pricing__comparison-title">Compare plans</h2>
          <p className="mockup-pricing__comparison-desc">
            See exactly what each price tier unlocks across your workspace.
          </p>
          <div className="mockup-pricing__comparison-wrap">
            <table className="mockup-pricing__comparison-table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  {TIERS.map((tier) => (
                    <th key={tier.id} scope="col">{tier.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    <td><FeatureCell value={row.starter} /></td>
                    <td><FeatureCell value={row.pro} /></td>
                    <td><FeatureCell value={row.enterprise} /></td>
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
