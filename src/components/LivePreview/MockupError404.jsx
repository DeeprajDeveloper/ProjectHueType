import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupError404.scss';

function MockupError404({ parts = {}, copy = MOCKUP_COPY.error404 }) {
  const show = (id) => parts[id] !== false;

  return (
    <div className="mockup-error404">
      <div className="mockup-error404__content">
        {show('errorCode') && (
          <div className="mockup-error404__illustration" aria-hidden="true">
            <svg className="mockup-error404__svg" viewBox="0 0 200 160" fill="none">
              <rect x="24" y="20" width="152" height="120" rx="8" stroke="currentColor" strokeWidth="2" opacity="0.2" />
              <path d="M40 44h120M40 68h80M40 92h96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.15" />
              <circle cx="148" cy="44" r="6" fill="var(--preview-accent)" opacity="0.5" />
              <circle cx="148" cy="68" r="6" fill="var(--preview-primary)" opacity="0.4" />
              <path
                d="M100 108 L88 96 L76 108 L64 96"
                stroke="var(--preview-accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="100" cy="78" r="28" stroke="var(--preview-primary)" strokeWidth="2.5" fill="color-mix(in srgb, var(--preview-primary) 8%, transparent)" />
              <text x="100" y="86" textAnchor="middle" className="mockup-error404__svg-code">404</text>
              <path d="M118 62 L134 46 M134 62 L118 46" stroke="var(--preview-accent)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {show('message') && (
          <div className="mockup-error404__text">
            <h1 className="mockup-error404__title" data-inspect="error-title">{copy.title}</h1>
            <p className="mockup-error404__body" data-inspect="error-body">{copy.body}</p>
          </div>
        )}

        {show('primaryAction') && (
          <button type="button" className="mockup-error404__primary" data-inspect="error-primary">{copy.primary}</button>
        )}

        {show('secondaryLinks') && (
          <nav className="mockup-error404__links" aria-label="Helpful links">
            {copy.links.map((link) => (
              <button key={link} type="button" className="mockup-error404__link">{link}</button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

export default MockupError404;
