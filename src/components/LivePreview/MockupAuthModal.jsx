import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupAuthModal.scss';

function MockupAuthModal({ mode, onClose, onSwitchMode }) {
  const isLogin = mode === 'login';
  const copy = MOCKUP_COPY.marketing.authModal;
  const modeCopy = isLogin ? copy.login : copy.signup;

  return (
    <div className="mockup-auth" role="dialog" aria-modal="true" aria-labelledby="mockup-auth-title">
      <div className="mockup-auth__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="mockup-auth__panel">
        <button type="button" className="mockup-auth__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 id="mockup-auth-title" className="mockup-auth__title">
          {modeCopy.title}
        </h2>
        <p className="mockup-auth__subtitle">
          {modeCopy.subtitle}
        </p>

        <form className="mockup-auth__form" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="mockup-auth__field">
              <label className="mockup-auth__label" htmlFor="mockup-auth-name">{copy.fields.fullName.label}</label>
              <input id="mockup-auth-name" type="text" className="mockup-auth__input" placeholder={copy.fields.fullName.placeholder} />
            </div>
          )}
          <div className="mockup-auth__field">
            <label className="mockup-auth__label" htmlFor="mockup-auth-email">{copy.fields.email.label}</label>
            <input id="mockup-auth-email" type="email" className="mockup-auth__input" placeholder={copy.fields.email.placeholder} />
          </div>
          <div className="mockup-auth__field">
            <label className="mockup-auth__label" htmlFor="mockup-auth-password">{copy.fields.password.label}</label>
            <input id="mockup-auth-password" type="password" className="mockup-auth__input" placeholder={copy.fields.password.placeholder} />
          </div>

          {isLogin && (
            <label className="mockup-auth__checkbox">
              <input type="checkbox" defaultChecked />
              <span>{copy.rememberMe}</span>
            </label>
          )}

          <button type="submit" className="mockup-auth__submit">
            {isLogin ? copy.submit.login : copy.submit.signup}
          </button>
        </form>

        <p className="mockup-auth__switch">
          {isLogin ? copy.switch.loginPrompt : copy.switch.signupPrompt}
          {' '}
          <button
            type="button"
            className="mockup-auth__switch-btn"
            onClick={() => onSwitchMode(isLogin ? 'signup' : 'login')}
          >
            {isLogin ? copy.switch.toSignup : copy.switch.toLogin}
          </button>
        </p>
      </div>
    </div>
  );
}

export default MockupAuthModal;
