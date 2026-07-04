import { useState } from 'react';
import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO, formatMockupCopy } from '../../data/mockupCopy';
import './MockupOnboarding.scss';

function MockupOnboarding({ parts = {}, logoText = DEFAULT_PREVIEW_LOGO }) {
  const [step, setStep] = useState(0);
  const copy = MOCKUP_COPY.onboarding;
  const steps = copy.steps;
  const show = (id) => parts[id] !== false;
  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="mockup-onboarding">
      <div className="mockup-onboarding__shell">
        {show('progressBar') && (
          <div className="mockup-onboarding__progress" aria-label={formatMockupCopy(copy.progressLabel, { step: step + 1, total: steps.length })}>
            <div className="mockup-onboarding__progress-track">
              <div className="mockup-onboarding__progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="mockup-onboarding__progress-label" data-inspect="progress-label">
              {formatMockupCopy(copy.progressLabel, { step: step + 1, total: steps.length })}
            </span>
          </div>
        )}

        <div className="mockup-onboarding__body">
          {show('illustration') && (
            <div className="mockup-onboarding__illus" aria-hidden="true">
              <div className="mockup-onboarding__illus-card">
                <span className="mockup-onboarding__illus-logo">{logoText.charAt(0)}</span>
                <div className="mockup-onboarding__illus-lines">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}

          {show('stepContent') && (
            <div className="mockup-onboarding__content">
              <h1 className="mockup-onboarding__title" data-inspect="step-title">{current.title}</h1>
              <p className="mockup-onboarding__copy" data-inspect="step-body">{current.copy}</p>

              {step === 1 && current.chips && (
                <div className="mockup-onboarding__choices">
                  {current.chips.map((tag) => (
                    <button key={tag} type="button" className="mockup-onboarding__chip">{tag}</button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {show('stepNavigation') && (
          <footer className="mockup-onboarding__nav">
            <button
              type="button"
              className="mockup-onboarding__back"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              {copy.nav.back}
            </button>
            <button
              type="button"
              className="mockup-onboarding__next"
              data-inspect="next-button"
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            >
              {step === steps.length - 1 ? copy.nav.getStarted : copy.nav.continue}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}

export default MockupOnboarding;
