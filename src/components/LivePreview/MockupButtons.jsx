import './MockupButtons.scss';

function MockupButtons() {
  return (
    <section className="mockup-buttons">
      <h3 className="mockup-buttons__label">Buttons</h3>
      <div className="mockup-buttons__row">
        <button type="button" className="mockup-buttons__btn mockup-buttons__btn--primary">
          Primary action
        </button>
        <button type="button" className="mockup-buttons__btn mockup-buttons__btn--secondary">
          Secondary action
        </button>
        <button type="button" className="mockup-buttons__btn mockup-buttons__btn--ghost">
          Ghost action
        </button>
        <button type="button" className="mockup-buttons__btn mockup-buttons__btn--primary" disabled>
          Disabled
        </button>
      </div>
    </section>
  );
}

export default MockupButtons;
