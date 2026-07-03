import { ArrowRightIcon, ArrowSquareOutIcon, GithubLogoIcon, RocketLaunchIcon } from '@phosphor-icons/react';
import {
  APP_VERSION,
  BUILD_CHANGELOG,
  BUILD_FEATURES,
  BUILD_NOTES,
  BUILD_STACK,
  BUILD_SUMMARY,
  GITHUB_REPO_URL,
  PRIVACY_POLICY_PATH,
} from '../../data/buildInfo';
import Accordion from '../Accordion/Accordion';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './BuildInfoPanel.scss';

function BuildInfoPanel({ onStartTour }) {
  return (
    <div className="build-info-panel" data-tour="build-info">
      <header className="build-info-panel__header">
        <p className="build-info-panel__version">v{APP_VERSION}</p>
        <h3 className="build-info-panel__title">HueType</h3>
        <div className="build-info-panel__summary">
          {BUILD_SUMMARY.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="build-info-panel__summary-line">
              {paragraph}
            </p>
          ))}
        </div>
      </header>

      <section className="build-info-panel__section" aria-labelledby="build-info-stack">
        <h4 id="build-info-stack" className="build-info-panel__section-title">Tech stack</h4>
        <ul className="build-info-panel__stack-pills">
          {BUILD_STACK.map((item) => (
            <li key={item}>
              <span className="build-info-panel__stack-pill">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="build-info-panel__section" aria-labelledby="build-info-links">
        <h4 id="build-info-links" className="build-info-panel__section-title">Links</h4>
        <ul className="build-info-panel__external-links">
          <li>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="build-info-panel__external-link"
            >
              <Icon icon={GithubLogoIcon} size={ICON_SIZE_SM} />
              <span>GitHub repository</span>
              <Icon icon={ArrowSquareOutIcon} size={ICON_SIZE_SM} className="build-info-panel__external-icon" />
            </a>
          </li>
          <li>
            <a href={PRIVACY_POLICY_PATH} className="build-info-panel__external-link">
              <span>Privacy policy</span>
            </a>
          </li>
        </ul>
      </section>

      <Accordion
        title="In this build"
        badge={String(BUILD_FEATURES.length)}
        variant="chrome"
        className="build-info-panel__accordion"
        persistKey="build-info-features"
        defaultOpen={false}
        dataTour="build-info-features"
      >
        <ul className="build-info-panel__list">
          {BUILD_FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </Accordion>

      <section className="build-info-panel__section" aria-labelledby="build-info-changelog">
        <h4 id="build-info-changelog" className="build-info-panel__section-title">Changelog</h4>
        <ol className="build-info-panel__timeline">
          {BUILD_CHANGELOG.map((release, index) => (
            <li key={release.version} className="build-info-panel__timeline-item">
              <span className="build-info-panel__timeline-marker" aria-hidden="true" />
              <div className="build-info-panel__timeline-body">
                <header className="build-info-panel__release-header">
                  <div className="build-info-panel__release-meta">
                    <span className="build-info-panel__release-version">v{release.version}</span>
                    {release.date && (
                      <time className="build-info-panel__release-date" dateTime={release.date}>
                        {release.date}
                      </time>
                    )}
                  </div>
                  <p className="build-info-panel__release-label">{release.label}</p>
                </header>

                <div className="build-info-panel__release-summary">
                  {release.summary.map((line) => (
                    <p key={line.slice(0, 40)}>{line}</p>
                  ))}
                </div>

                <Accordion
                  title="Full release notes"
                  badge={String(release.changes.length)}
                  variant="chrome"
                  className="build-info-panel__accordion build-info-panel__accordion--nested"
                  persistKey={`build-info-changelog-${release.version}`}
                  defaultOpen={index === 0}
                >
                  <ul className="build-info-panel__list build-info-panel__list--changelog">
                    {release.changes.map((change) => (
                      <li key={change}>{change}</li>
                    ))}
                  </ul>
                </Accordion>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Accordion
        title="Tips"
        badge={String(BUILD_NOTES.length)}
        variant="chrome"
        className="build-info-panel__accordion"
        persistKey="build-info-tips"
        defaultOpen={false}
        dataTour="build-info-tips"
      >
        <ul className="build-info-panel__list build-info-panel__list--notes">
          {BUILD_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </Accordion>

      {onStartTour && (
        <button
          type="button"
          className="build-info-panel__tour-btn btn btn--secondary"
          onClick={onStartTour}
          data-tour="build-info-tour"
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
