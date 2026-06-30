import './MockupPricing.scss';

const TIERS = [
  {
    name: 'Starter',
    price: '$19',
    description: 'For individuals getting started.',
    features: ['Up to 3 projects', 'Basic analytics', 'Email support', '1 GB storage'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'For growing teams that need more.',
    features: ['Unlimited projects', 'Advanced analytics', 'Priority support', '50 GB storage', 'Custom domains'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For organizations at scale.',
    features: ['Everything in Pro', 'SSO & SAML', 'Dedicated manager', 'Unlimited storage', 'SLA guarantee'],
    highlighted: false,
  },
];

function MockupPricing({ parts = {} }) {
  const show = (id) => parts[id] !== false;

  return (
    <section className="mockup-pricing">
      {show('pageHeader') && (
        <header className="mockup-pricing__header">
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
    </section>
  );
}

export default MockupPricing;
