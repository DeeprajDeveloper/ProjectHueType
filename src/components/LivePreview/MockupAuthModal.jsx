import './MockupAuthModal.scss';

function MockupAuthModal({ mode, onClose, onSwitchMode }) {
  const isLogin = mode === 'login';

  return (
    <div className="mockup-auth" role="dialog" aria-modal="true" aria-labelledby="mockup-auth-title">
      <div className="mockup-auth__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="mockup-auth__panel">
        <button type="button" className="mockup-auth__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 id="mockup-auth-title" className="mockup-auth__title">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="mockup-auth__subtitle">
          {isLogin
            ? 'Log in to save combos and pick up where you left off.'
            : 'Sign up free — no credit card required.'}
        </p>

        <form className="mockup-auth__form" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="mockup-auth__field">
              <label className="mockup-auth__label" htmlFor="mockup-auth-name">Full name</label>
              <input id="mockup-auth-name" type="text" className="mockup-auth__input" placeholder="Alex Rivera" />
            </div>
          )}
          <div className="mockup-auth__field">
            <label className="mockup-auth__label" htmlFor="mockup-auth-email">Email</label>
            <input id="mockup-auth-email" type="email" className="mockup-auth__input" placeholder="you@company.com" />
          </div>
          <div className="mockup-auth__field">
            <label className="mockup-auth__label" htmlFor="mockup-auth-password">Password</label>
            <input id="mockup-auth-password" type="password" className="mockup-auth__input" placeholder="••••••••" />
          </div>

          {isLogin && (
            <label className="mockup-auth__checkbox">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
          )}

          <button type="submit" className="mockup-auth__submit">
            {isLogin ? 'Log in' : 'Create account'}
          </button>
        </form>

        <p className="mockup-auth__switch">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          {' '}
          <button
            type="button"
            className="mockup-auth__switch-btn"
            onClick={() => onSwitchMode(isLogin ? 'signup' : 'login')}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default MockupAuthModal;
