import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupContactForm.scss';

function MockupContactForm() {
  const copy = MOCKUP_COPY.marketing.contact;

  return (
    <section className="mockup-contact">
      <header className="mockup-contact__header">
        <h2 className="mockup-contact__title">{copy.title}</h2>
        <p className="mockup-contact__subtitle">
          {copy.subtitle}
        </p>
      </header>

      <form className="mockup-contact__form" onSubmit={(e) => e.preventDefault()}>
        <div className="mockup-contact__row">
          <div className="mockup-contact__field">
            <label className="mockup-contact__label" htmlFor="preview-first-name">{copy.fields.firstName.label}</label>
            <input id="preview-first-name" type="text" className="mockup-contact__input" placeholder={copy.fields.firstName.placeholder} />
          </div>
          <div className="mockup-contact__field">
            <label className="mockup-contact__label" htmlFor="preview-last-name">{copy.fields.lastName.label}</label>
            <input id="preview-last-name" type="text" className="mockup-contact__input" placeholder={copy.fields.lastName.placeholder} />
          </div>
        </div>

        <div className="mockup-contact__field">
          <label className="mockup-contact__label" htmlFor="preview-contact-email">{copy.fields.email.label}</label>
          <input id="preview-contact-email" type="email" className="mockup-contact__input" placeholder={copy.fields.email.placeholder} />
        </div>

        <div className="mockup-contact__field">
          <label className="mockup-contact__label" htmlFor="preview-company">{copy.fields.company.label}</label>
          <input id="preview-company" type="text" className="mockup-contact__input" placeholder={copy.fields.company.placeholder} />
        </div>

        <fieldset className="mockup-contact__fieldset">
          <legend className="mockup-contact__label">{copy.interest.legend}</legend>
          <div className="mockup-contact__radio-group">
            <label className="mockup-contact__radio">
              <input type="radio" name="preview-interest" value="design" defaultChecked />
              <span>{copy.interest.designSystems}</span>
            </label>
            <label className="mockup-contact__radio">
              <input type="radio" name="preview-interest" value="marketing" />
              <span>{copy.interest.marketingSites}</span>
            </label>
            <label className="mockup-contact__radio">
              <input type="radio" name="preview-interest" value="product" />
              <span>{copy.interest.productUi}</span>
            </label>
          </div>
        </fieldset>

        <div className="mockup-contact__field">
          <label className="mockup-contact__label" htmlFor="preview-message">{copy.fields.message.label}</label>
          <textarea id="preview-message" className="mockup-contact__textarea" rows={4} placeholder={copy.fields.message.placeholder} />
        </div>

        <div className="mockup-contact__checkboxes">
          <label className="mockup-contact__checkbox">
            <input type="checkbox" name="preview-newsletter" defaultChecked />
            <span>{copy.checkboxes.updates}</span>
          </label>
          <label className="mockup-contact__checkbox">
            <input type="checkbox" name="preview-terms" />
            <span>{copy.checkboxes.privacy}</span>
          </label>
        </div>

        <div className="mockup-contact__actions">
          <button type="submit" className="mockup-contact__submit">{copy.actions.submit}</button>
          <button type="reset" className="mockup-contact__reset">{copy.actions.reset}</button>
        </div>
      </form>
    </section>
  );
}

export default MockupContactForm;
