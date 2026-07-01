import { useState, useEffect } from 'react';
import {
  MockupBarChart,
  MockupLineChart,
  MockupDoughnutChart,
  MockupAreaChart,
} from './MockupDashboardCharts';
import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO } from '../../data/mockupCopy';
import './MockupDashboard.scss';

function MockupDashboard({ parts = {}, logoText = DEFAULT_PREVIEW_LOGO, onFrameScrollLock }) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const copy = MOCKUP_COPY.dashboard;
  const show = (id) => parts[id] !== false;
  const hasSidebar = show('sidebarNav');

  const openNotifications = () => {
    setNotificationsOpen(true);
    onFrameScrollLock?.(true);
  };

  const closeNotifications = () => {
    setNotificationsOpen(false);
    onFrameScrollLock?.(false);
  };

  useEffect(() => () => onFrameScrollLock?.(false), [onFrameScrollLock]);

  const showHeader = show('pageHeader');
  const showStats = show('statCards') && activeNav === 'dashboard';
  const showCharts = show('charts') && (activeNav === 'dashboard' || activeNav === 'analytics');
  const showIssues = show('issuesTracker') && (activeNav === 'dashboard' || activeNav === 'issues');
  const showTable = show('dataTable') && (activeNav === 'dashboard' || activeNav === 'customers');
  const showProfile = show('profileSettings') && activeNav === 'profile';
  const showTopBar = show('topBar');

  return (
    <div className={`mockup-dashboard ${!hasSidebar ? 'mockup-dashboard--no-sidebar' : ''}`}>
      {hasSidebar && (
        <aside className="mockup-dashboard__sidebar" aria-label="App navigation">
          <div className="mockup-dashboard__sidebar-top">
            <span className="mockup-dashboard__brand">{logoText}</span>
            <nav className="mockup-dashboard__nav">
              {copy.nav.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`mockup-dashboard__nav-link ${activeNav === item.id ? 'mockup-dashboard__nav-link--active' : ''}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <nav className="mockup-dashboard__nav mockup-dashboard__nav--footer">
            <button
              type="button"
              className={`mockup-dashboard__nav-link mockup-dashboard__nav-link--profile ${activeNav === copy.nav.profile.id ? 'mockup-dashboard__nav-link--active' : ''}`}
              onClick={() => setActiveNav(copy.nav.profile.id)}
            >
              <span className="mockup-dashboard__nav-avatar" aria-hidden="true">{copy.profile.avatarInitials}</span>
              {copy.nav.profile.label}
            </button>
          </nav>
        </aside>
      )}

      <div className="mockup-dashboard__main">
        {showTopBar && (
          <div className="mockup-dashboard__topbar">
            <input
              type="search"
              className="mockup-dashboard__search"
              placeholder={copy.topBar.searchPlaceholder}
              aria-label="Search dashboard"
            />
            <button
              type="button"
              className={`mockup-dashboard__notify ${notificationsOpen ? 'mockup-dashboard__notify--active' : ''}`}
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              onClick={notificationsOpen ? closeNotifications : openNotifications}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="mockup-dashboard__notify-dot" aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="mockup-dashboard__content">
          {showHeader && (
            <header className="mockup-dashboard__header">
              <h1 className="mockup-dashboard__title">{copy.pageTitles[activeNav]}</h1>
              <p className="mockup-dashboard__subtitle">
                {copy.subtitles[activeNav]}
              </p>
            </header>
          )}

          {showStats && (
            <div className="mockup-dashboard__stats">
              {copy.stats.map((stat) => (
                <article key={stat.label} className="mockup-dashboard__stat">
                  <span className="mockup-dashboard__stat-label">{stat.label}</span>
                  <span className="mockup-dashboard__stat-value">{stat.value}</span>
                  <span className="mockup-dashboard__stat-change">{stat.change}</span>
                </article>
              ))}
            </div>
          )}

          {showCharts && (
            <section className="mockup-dashboard__charts">
              <MockupBarChart />
              <MockupLineChart />
              <MockupDoughnutChart />
              <MockupAreaChart />
            </section>
          )}

          {showIssues && (
            <section className="mockup-dashboard__issues">
              <h2 className="mockup-dashboard__section-title">{copy.issues.sectionTitle}</h2>
              <ul className="mockup-dashboard__issue-list">
                {copy.issues.items.map((issue) => (
                  <li key={issue.id} className="mockup-dashboard__issue">
                    <div className="mockup-dashboard__issue-main">
                      <span className="mockup-dashboard__issue-id">{issue.id}</span>
                      <span className="mockup-dashboard__issue-title">{issue.title}</span>
                    </div>
                    <div className="mockup-dashboard__issue-meta">
                      <span className={`mockup-dashboard__priority mockup-dashboard__priority--${issue.priority.toLowerCase()}`}>
                        {issue.priority}
                      </span>
                      <span className={`mockup-dashboard__issue-status mockup-dashboard__issue-status--${issue.status.toLowerCase().replace(' ', '-')}`}>
                        {issue.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {showTable && (
            <section className="mockup-dashboard__table-section">
              <h2 className="mockup-dashboard__section-title">{copy.table.sectionTitle}</h2>
              <table className="mockup-dashboard__table">
                <thead>
                  <tr>
                    <th scope="col">{copy.table.columns.account}</th>
                    <th scope="col">{copy.table.columns.plan}</th>
                    <th scope="col">{copy.table.columns.status}</th>
                    <th scope="col">{copy.table.columns.mrr}</th>
                  </tr>
                </thead>
                <tbody>
                  {copy.table.rows.map((row) => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td>{row.plan}</td>
                      <td>
                        <span className={`mockup-dashboard__status mockup-dashboard__status--${row.status.toLowerCase()}`}>
                          {row.status}
                        </span>
                      </td>
                      <td>{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {showProfile && (
            <section className="mockup-dashboard__profile">
              <div className="mockup-dashboard__profile-card">
                <div className="mockup-dashboard__profile-header">
                  <span className="mockup-dashboard__avatar" aria-hidden="true">{copy.profile.avatarInitials}</span>
                  <div>
                    <h2 className="mockup-dashboard__profile-name">{copy.profile.name}</h2>
                    <p className="mockup-dashboard__profile-email">{copy.profile.email}</p>
                  </div>
                </div>
                <form className="mockup-dashboard__settings" onSubmit={(e) => e.preventDefault()}>
                  <h3 className="mockup-dashboard__settings-title">{copy.profile.preferences.title}</h3>
                  <label className="mockup-dashboard__setting">
                    <span>{copy.profile.preferences.emailNotifications}</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                  <label className="mockup-dashboard__setting">
                    <span>{copy.profile.preferences.weeklyDigest}</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                  <label className="mockup-dashboard__setting">
                    <span>{copy.profile.preferences.compactSidebar}</span>
                    <input type="checkbox" />
                  </label>
                  <div className="mockup-dashboard__setting-field">
                    <label htmlFor="mockup-dash-timezone">{copy.profile.fields.timezone.label}</label>
                    <select id="mockup-dash-timezone" className="mockup-dashboard__select">
                      {copy.profile.fields.timezone.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mockup-dashboard__setting-field">
                    <label htmlFor="mockup-dash-export">{copy.profile.fields.exportFormat.label}</label>
                    <select id="mockup-dash-export" className="mockup-dashboard__select">
                      {copy.profile.fields.exportFormat.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="mockup-dashboard__save">{copy.profile.save}</button>
                </form>
              </div>
            </section>
          )}
        </div>
      </div>

      {notificationsOpen && (
        <div className="mockup-dashboard__notifications" role="dialog" aria-label="Notifications">
          <div className="mockup-dashboard__notifications-backdrop" onClick={closeNotifications} aria-hidden="true" />
          <div className="mockup-dashboard__notifications-panel">
            <header className="mockup-dashboard__notifications-header">
              <h2>{copy.notifications.title}</h2>
              <button type="button" onClick={closeNotifications} aria-label="Close notifications">×</button>
            </header>
            <ul className="mockup-dashboard__notifications-list">
              {copy.notifications.items.map((n) => (
                <li key={n.id} className="mockup-dashboard__notification">
                  <p>{n.text}</p>
                  <span>{n.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default MockupDashboard;
