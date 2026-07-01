import { ArrowRightIcon, RocketLaunchIcon } from '@phosphor-icons/react';
import {
  APP_VERSION,
  BUILD_FEATURES,
  BUILD_NOTES,
  BUILD_STACK,
} from '../../data/buildInfo';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './BuildInfoPanel.scss';

function BuildInfoPanel({ onStartTour }) {
  return (
    <div className="build-info-panel">
      <header className="build-info-panel__header">
        <p className="build-info-panel__version">v{APP_VERSION}</p>
        <h3 className="build-info-panel__title">HueType</h3>
        <p className="build-info-panel__tagline">
          Curated color and typography combos — previewed on realistic layouts,
          checked for accessibility, ready to export.
        </p>
      </header>

      <section className="build-info-panel__section" aria-labelledby="build-info-stack">
        <h4 id="build-info-stack" className="build-info-panel__section-title">Stack</h4>
        <dl className="build-info-panel__stack">
          {BUILD_STACK.map((item) => (
            <div key={item.label} className="build-info-panel__stack-row">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="build-info-panel__section" aria-labelledby="build-info-features">
        <h4 id="build-info-features" className="build-info-panel__section-title">In this build</h4>
        <ul className="build-info-panel__list">
          {BUILD_FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="build-info-panel__section" aria-labelledby="build-info-notes">
        <h4 id="build-info-notes" className="build-info-panel__section-title">Tips</h4>
        <ul className="build-info-panel__list build-info-panel__list--notes">
          {BUILD_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      {onStartTour && (
        <button
          type="button"
          className="build-info-panel__tour-btn btn btn--secondary"
          onClick={onStartTour}
        >
          <Icon icon={RocketLaunchIcon} size={ICON_SIZE_SM} />
          Start product tour
          <Icon icon={ArrowRightIcon} size={ICON_SIZE_SM} />
        </button>
      )}
    </div>
  );
}

export default BuildInfoPanel;
