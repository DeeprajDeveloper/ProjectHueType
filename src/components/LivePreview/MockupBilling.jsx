import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupBilling.scss';

function usagePercent(used, limit) {
  return Math.min(100, Math.round((used / limit) * 100));
}

function MockupBilling({ parts = {} }) {
  const copy = MOCKUP_COPY.billing;
  const show = (id) => parts[id] !== false;

  return (
    <div className="mockup-billing">
      {show('currentPlan') && (
        <section className="mockup-billing__plan">
          <h2 className="mockup-billing__section-title">{copy.currentPlan.title}</h2>
          <div className="mockup-billing__plan-card">
            <div>
              <span className="mockup-billing__plan-name" data-inspect="plan-name">{copy.currentPlan.name}</span>
              <p className="mockup-billing__plan-price" data-inspect="plan-price">
                <span className="mockup-billing__plan-amount">{copy.currentPlan.price}</span>
                <span className="mockup-billing__plan-period">{copy.currentPlan.period}</span>
              </p>
              <p className="mockup-billing__plan-renewal">{copy.currentPlan.renewal}</p>
            </div>
            <button type="button" className="mockup-billing__manage">{copy.currentPlan.manage}</button>
          </div>
        </section>
      )}

      {show('usageMeters') && (
        <section className="mockup-billing__usage">
          <h2 className="mockup-billing__section-title">{copy.usage.title}</h2>
          <ul className="mockup-billing__meters">
            {copy.usage.items.map((item, index) => {
              const pct = usagePercent(item.used, item.limit);
              return (
                <li key={item.label} className="mockup-billing__meter">
                  <div className="mockup-billing__meter-header">
                    <span className="mockup-billing__meter-label" data-inspect={index === 0 ? 'usage-label' : undefined}>{item.label}</span>
                    <span className="mockup-billing__meter-value">
                      {item.used.toLocaleString()} / {item.limit.toLocaleString()}
                    </span>
                  </div>
                  <div className="mockup-billing__meter-track">
                    <div
                      className={`mockup-billing__meter-fill mockup-billing__meter-fill--${item.status}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {show('upgradeOptions') && (
        <section className="mockup-billing__upgrade">
          <h2 className="mockup-billing__section-title">{copy.upgrade.title}</h2>
          <div className="mockup-billing__plans">
            {copy.upgrade.plans.map((plan) => (
              <article
                key={plan.id}
                className={[
                  'mockup-billing__plan-option',
                  plan.current ? 'mockup-billing__plan-option--current' : '',
                  plan.recommended ? 'mockup-billing__plan-option--recommended' : '',
                ].filter(Boolean).join(' ')}
              >
                {plan.recommended && (
                  <span className="mockup-billing__recommended">Recommended</span>
                )}
                <h3 className="mockup-billing__option-name">{plan.name}</h3>
                <p className="mockup-billing__option-price">
                  {plan.price}
                  {plan.period && <span>{plan.period}</span>}
                </p>
                <ul className="mockup-billing__features">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                {plan.current ? (
                  <span className="mockup-billing__current-badge">Current plan</span>
                ) : plan.recommended ? (
                  <button type="button" className="mockup-billing__upgrade-btn" data-inspect="upgrade-cta">{copy.upgrade.cta}</button>
                ) : (
                  <button type="button" className="mockup-billing__contact-btn">Contact sales</button>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {show('billingHistory') && (
        <section className="mockup-billing__history">
          <h2 className="mockup-billing__section-title">{copy.history.title}</h2>
          <table className="mockup-billing__table">
            <tbody>
              {copy.history.invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="mockup-billing__invoice-id">{invoice.id}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.amount}</td>
                  <td>
                    <span className="mockup-billing__status mockup-billing__status--paid">{invoice.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

export default MockupBilling;
