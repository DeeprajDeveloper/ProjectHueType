import { useState } from 'react';
import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO } from '../../data/mockupCopy';
import './MockupWaitlist.scss';

function MockupWaitlist({ parts = {}, logoText = DEFAULT_PREVIEW_LOGO }) {
  const copy = MOCKUP_COPY.waitlist;
  const show = (id) => parts[id] !== false;
  const brand = logoText.trim() || copy.brand;
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="mockup-waitlist">
      <div className="mockup-waitlist__content">
        {show('brandMark') && (
          <span className="mockup-waitlist__brand">{brand}</span>
        )}

        {show('headline') && (
          <div className="mockup-waitlist__text">
            <h1 className="mockup-waitlist__title">{copy.headline}</h1>
            <p className="mockup-waitlist__subhead">{copy.subhead}</p>
          </div>
        )}

        {show('signupForm') && (
          submitted ? (
            <div className="mockup-waitlist__success" role="status">
              <span className="mockup-waitlist__success-icon" aria-hidden="true">✓</span>
              <p className="mockup-waitlist__success-text">You&apos;re on the list! We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form className="mockup-waitlist__form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="mockup-waitlist__input"
                placeholder={copy.form.placeholder}
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="mockup-waitlist__submit">{copy.form.submit}</button>
              <p className="mockup-waitlist__hint">{copy.form.hint}</p>
            </form>
          )
        )}

        {show('socialProof') && (
          <div className="mockup-waitlist__proof">
            <div className="mockup-waitlist__avatars" aria-hidden="true">
              {copy.socialProof.avatars.map((initials) => (
                <span key={initials} className="mockup-waitlist__avatar">{initials}</span>
              ))}
            </div>
            <p className="mockup-waitlist__proof-text">
              <strong>{copy.socialProof.count}</strong> {copy.socialProof.label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MockupWaitlist;
