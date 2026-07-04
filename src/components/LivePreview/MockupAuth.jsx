import { useState } from 'react';
import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO } from '../../data/mockupCopy';
import './MockupAuth.scss';

function MockupAuth({ parts = {}, logoText = DEFAULT_PREVIEW_LOGO }) {
  const [mode, setMode] = useState('login');
  const copy = MOCKUP_COPY.auth;
  const show = (id) => parts[id] !== false;
  const isLogin = mode === 'login';
  const formCopy = isLogin ? copy.form.login : copy.form.signup;

  return (
    <div className="mockup-auth-page">
      {show('brandPanel') && (
        <aside className="mockup-auth-page__brand" aria-hidden="true">
          <span className="mockup-auth-page__logo">{logoText}</span>
          <h1 className="mockup-auth-page__tagline">
            {copy.brand.tagline}
          </h1>
          <p className="mockup-auth-page__brand-copy">
            {copy.brand.copy}
          </p>
        </aside>
      )}

      <main className="mockup-auth-page__main">
        {show('authTabs') && (
          <div className="mockup-auth-page__tabs" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              role="tab"
              aria-selected={isLogin}
              className={`mockup-auth-page__tab ${isLogin ? 'mockup-auth-page__tab--active' : ''}`}
              onClick={() => setMode('login')}
            >
              {copy.tabs.login}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!isLogin}
              className={`mockup-auth-page__tab ${!isLogin ? 'mockup-auth-page__tab--active' : ''}`}
              onClick={() => setMode('signup')}
            >
              {copy.tabs.signup}
            </button>
          </div>
        )}

        {show('authForm') && (
          <div className="mockup-auth-page__panel">
            <h2 className="mockup-auth-page__title" data-inspect="form-heading">
              {formCopy.title}
            </h2>
            <p className="mockup-auth-page__subtitle" data-inspect="form-subheading">
              {formCopy.subtitle}
            </p>

            <form className="mockup-auth-page__form" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div className="mockup-auth-page__field">
                  <label className="mockup-auth-page__label" htmlFor="mockup-auth-name">{copy.form.fields.fullName.label}</label>
                  <input id="mockup-auth-name" type="text" className="mockup-auth-page__input" placeholder={copy.form.fields.fullName.placeholder} />
                </div>
              )}
              <div className="mockup-auth-page__field">
                <label className="mockup-auth-page__label" htmlFor="mockup-auth-email" data-inspect="input-label">{copy.form.fields.email.label}</label>
                <input id="mockup-auth-email" type="email" className="mockup-auth-page__input" placeholder={copy.form.fields.email.placeholder} data-inspect="input-field" />
              </div>
              <div className="mockup-auth-page__field">
                <label className="mockup-auth-page__label" htmlFor="mockup-auth-password">{copy.form.fields.password.label}</label>
                <input id="mockup-auth-password" type="password" className="mockup-auth-page__input" placeholder={copy.form.fields.password.placeholder} />
              </div>

              {isLogin && (
                <label className="mockup-auth-page__checkbox">
                  <input type="checkbox" defaultChecked />
                  <span>{copy.form.rememberMe}</span>
                </label>
              )}

              <button type="submit" className="mockup-auth-page__submit" data-inspect="submit-button">
                {isLogin ? copy.form.submit.login : copy.form.submit.signup}
              </button>
            </form>
          </div>
        )}

        {show('socialLogin') && (
          <div className="mockup-auth-page__social">
            <span className="mockup-auth-page__divider">{copy.social.divider}</span>
            <div className="mockup-auth-page__social-btns">
              <button type="button" className="mockup-auth-page__social-btn">{copy.social.google}</button>
              <button type="button" className="mockup-auth-page__social-btn">{copy.social.github}</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MockupAuth;
