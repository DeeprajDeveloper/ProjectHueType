import './MockupForm.scss';

function MockupForm() {
  return (
    <section className="mockup-form">
      <h3 className="mockup-form__label">Form elements</h3>
      <form className="mockup-form__fields" onSubmit={(e) => e.preventDefault()}>
        <div className="mockup-form__field">
          <label className="mockup-form__field-label" htmlFor="preview-email">
            Email address
          </label>
          <input
            id="preview-email"
            type="email"
            className="mockup-form__input"
            placeholder="you@example.com"
          />
          <span className="mockup-form__helper">We&apos;ll never share your email.</span>
        </div>
        <button type="submit" className="mockup-form__submit">
          Subscribe
        </button>
      </form>
    </section>
  );
}

export default MockupForm;
