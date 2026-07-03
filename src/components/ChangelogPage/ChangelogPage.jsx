import { APP_VERSION, BUILD_CHANGELOG } from '../../data/buildInfo';
import { useStandaloneRoute } from '../../hooks/useStandaloneRoute';
import { formatReleaseDate } from '../../utils/releaseNotes';
import StandalonePageHeader from '../StandalonePageHeader/StandalonePageHeader';
import './ChangelogPage.scss';

function ChangelogPage() {
  useStandaloneRoute();

  return (
    <div className="changelog-page">
      <StandalonePageHeader title="Changelog & release notes" />

      <main className="changelog-page__main">
        <p className="changelog-page__intro">
          What shipped in each HueType release — newest first. You are on{' '}
          <strong>v{APP_VERSION}</strong>.
        </p>

        <ol className="changelog-page__timeline">
          {BUILD_CHANGELOG.map((release, index) => (
            <li key={release.version} className="changelog-release">
              <div className="changelog-release__rail" aria-hidden="true">
                <span className="changelog-release__marker" />
                {index < BUILD_CHANGELOG.length - 1 && (
                  <span className="changelog-release__line" />
                )}
              </div>

              <aside className="changelog-release__meta">
                <div className="changelog-release__meta-sticky">
                  <span className="changelog-release__version">v{release.version}</span>
                  {release.date && (
                    <time className="changelog-release__date" dateTime={release.date}>
                      {formatReleaseDate(release.date)}
                    </time>
                  )}
                  <p className="changelog-release__label">{release.label}</p>
                </div>
              </aside>

              <div className="changelog-release__content">
                <div className="changelog-release__summary">
                  {release.summary.map((line) => (
                    <p key={line.slice(0, 48)}>{line}</p>
                  ))}
                </div>

                <section className="changelog-release__notes" aria-label={`v${release.version} changes`}>
                  <h2 className="changelog-release__notes-title">Changes</h2>
                  <ul className="changelog-release__changes">
                    {release.changes.map((change) => (
                      <li key={change}>{change}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}

export default ChangelogPage;
