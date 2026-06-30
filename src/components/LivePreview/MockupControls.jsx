import { useState } from 'react';
import './MockupControls.scss';

function MockupControls() {
  const [toggleOn, setToggleOn] = useState(true);
  const [checkboxes, setCheckboxes] = useState({ updates: true, newsletter: false });
  const [plan, setPlan] = useState('pro');

  return (
    <section className="mockup-controls">
      <h3 className="mockup-controls__label">Settings & preferences</h3>

      <div className="mockup-controls__group">
        <label className="mockup-controls__toggle-row">
          <span className="mockup-controls__toggle-label">Enable notifications</span>
          <button
            type="button"
            role="switch"
            aria-checked={toggleOn}
            className={`mockup-controls__toggle ${toggleOn ? 'mockup-controls__toggle--on' : ''}`}
            onClick={() => setToggleOn((v) => !v)}
          >
            <span className="mockup-controls__toggle-thumb" />
          </button>
        </label>
      </div>

      <div className="mockup-controls__group">
        <span className="mockup-controls__group-label">Email preferences</span>
        {Object.entries(checkboxes).map(([key, checked]) => (
          <label key={key} className="mockup-controls__checkbox-row">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setCheckboxes((prev) => ({ ...prev, [key]: !prev[key] }))}
            />
            <span>{key === 'updates' ? 'Product updates' : 'Weekly newsletter'}</span>
          </label>
        ))}
      </div>

      <div className="mockup-controls__group">
        <span className="mockup-controls__group-label">Select a plan</span>
        {[
          { id: 'free', label: 'Free' },
          { id: 'pro', label: 'Pro' },
          { id: 'team', label: 'Team' },
        ].map(({ id, label }) => (
          <label key={id} className="mockup-controls__radio-row">
            <input
              type="radio"
              name="plan"
              value={id}
              checked={plan === id}
              onChange={() => setPlan(id)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

export default MockupControls;
