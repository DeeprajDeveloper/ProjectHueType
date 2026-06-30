import './MockupContactForm.scss';

function MockupContactForm() {
  return (
    <section className="mockup-contact">
      <header className="mockup-contact__header">
        <h2 className="mockup-contact__title">Get in touch</h2>
        <p className="mockup-contact__subtitle">
          Tell us about your project — we&apos;ll respond within one business day.
        </p>
      </header>

      <form className="mockup-contact__form" onSubmit={(e) => e.preventDefault()}>
        <div className="mockup-contact__row">
          <div className="mockup-contact__field">
            <label className="mockup-contact__label" htmlFor="preview-first-name">First name</label>
            <input id="preview-first-name" type="text" className="mockup-contact__input" placeholder="Alex" />
          </div>
          <div className="mockup-contact__field">
            <label className="mockup-contact__label" htmlFor="preview-last-name">Last name</label>
            <input id="preview-last-name" type="text" className="mockup-contact__input" placeholder="Rivera" />
          </div>
        </div>

        <div className="mockup-contact__field">
          <label className="mockup-contact__label" htmlFor="preview-contact-email">Email</label>
          <input id="preview-contact-email" type="email" className="mockup-contact__input" placeholder="you@company.com" />
        </div>

        <div className="mockup-contact__field">
          <label className="mockup-contact__label" htmlFor="preview-company">Company</label>
          <input id="preview-company" type="text" className="mockup-contact__input" placeholder="Acme Co." />
        </div>

        <fieldset className="mockup-contact__fieldset">
          <legend className="mockup-contact__label">I&apos;m interested in</legend>
          <div className="mockup-contact__radio-group">
            <label className="mockup-contact__radio">
              <input type="radio" name="preview-interest" value="design" defaultChecked />
              <span>Design systems</span>
            </label>
            <label className="mockup-contact__radio">
              <input type="radio" name="preview-interest" value="marketing" />
              <span>Marketing sites</span>
            </label>
            <label className="mockup-contact__radio">
              <input type="radio" name="preview-interest" value="product" />
              <span>Product UI</span>
            </label>
          </div>
        </fieldset>

        <div className="mockup-contact__field">
          <label className="mockup-contact__label" htmlFor="preview-message">Message</label>
          <textarea id="preview-message" className="mockup-contact__textarea" rows={4} placeholder="Tell us about your project…" />
        </div>

        <div className="mockup-contact__checkboxes">
          <label className="mockup-contact__checkbox">
            <input type="checkbox" name="preview-newsletter" defaultChecked />
            <span>Send me product updates and tips</span>
          </label>
          <label className="mockup-contact__checkbox">
            <input type="checkbox" name="preview-terms" />
            <span>I agree to the privacy policy</span>
          </label>
        </div>

        <div className="mockup-contact__actions">
          <button type="submit" className="mockup-contact__submit">Send message</button>
          <button type="reset" className="mockup-contact__reset">Clear form</button>
        </div>
      </form>
    </section>
  );
}

export default MockupContactForm;
