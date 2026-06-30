import { useState, useEffect } from 'react';
import './MockupDashboard.scss';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'customers', label: 'Customers' },
  { id: 'issues', label: 'Issues' },
  { id: 'profile', label: 'Profile' },
];

const STATS = [
  { label: 'Total revenue', value: '$48,290', change: '+12.5%' },
  { label: 'Active users', value: '2,847', change: '+8.2%' },
  { label: 'Conversion rate', value: '3.24%', change: '+0.4%' },
];

const TABLE_ROWS = [
  { name: 'Acme Corp', plan: 'Pro', status: 'Active', amount: '$299' },
  { name: 'Globex Inc', plan: 'Team', status: 'Active', amount: '$149' },
  { name: 'Initech', plan: 'Starter', status: 'Trial', amount: '$49' },
  { name: 'Umbrella Co', plan: 'Pro', status: 'Active', amount: '$299' },
];

const ISSUES = [
  { id: 'HT-104', title: 'Contrast fails on accent button', priority: 'High', status: 'Open' },
  { id: 'HT-98', title: 'Font loading slow on mobile preview', priority: 'Medium', status: 'In progress' },
  { id: 'HT-87', title: 'Export modal tab focus trap', priority: 'Low', status: 'Resolved' },
  { id: 'HT-76', title: 'Saved combo sync delay', priority: 'Medium', status: 'Open' },
];

const NOTIFICATIONS = [
  { id: 1, text: 'Acme Corp upgraded to Pro plan', time: '2m ago' },
  { id: 2, text: 'New issue assigned: HT-104', time: '18m ago' },
  { id: 3, text: 'Weekly analytics report ready', time: '1h ago' },
];

const BAR_DATA = [42, 68, 55, 82, 61, 74, 48];
const LINE_POINTS = '0,70 40,45 80,55 120,30 160,38 200,20';
const HIST_DATA = [12, 28, 45, 38, 52, 31, 44, 36];
const PIE_SEGMENTS = [
  { label: 'Pro', value: 45, color: 'var(--preview-accent)' },
  { label: 'Team', value: 30, color: 'var(--preview-primary)' },
  { label: 'Starter', value: 25, color: 'var(--preview-secondary)' },
];

const PAGE_TITLES = {
  dashboard: 'Overview',
  analytics: 'Analytics',
  customers: 'Customers',
  issues: 'Issues tracker',
  profile: 'Profile & settings',
};

function MockupBarChart() {
  return (
    <div className="mockup-dashboard__chart mockup-dashboard__chart--bar">
      <h3 className="mockup-dashboard__chart-title">Revenue by week</h3>
      <div className="mockup-dashboard__bar-chart" aria-hidden="true">
        {BAR_DATA.map((height, i) => (
          <div key={i} className="mockup-dashboard__bar" style={{ '--bar-height': `${height}%` }} />
        ))}
      </div>
    </div>
  );
}

function MockupLineChart() {
  return (
    <div className="mockup-dashboard__chart mockup-dashboard__chart--line">
      <h3 className="mockup-dashboard__chart-title">Active users trend</h3>
      <svg className="mockup-dashboard__line-chart" viewBox="0 0 200 80" aria-hidden="true">
        <polyline points={LINE_POINTS} fill="none" stroke="var(--preview-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={`0,80 ${LINE_POINTS} 200,80`} fill="var(--preview-accent)" fillOpacity="0.12" stroke="none" />
      </svg>
    </div>
  );
}

function MockupHistogram() {
  return (
    <div className="mockup-dashboard__chart mockup-dashboard__chart--histogram">
      <h3 className="mockup-dashboard__chart-title">Session duration distribution</h3>
      <div className="mockup-dashboard__histogram" aria-hidden="true">
        {HIST_DATA.map((height, i) => (
          <div key={i} className="mockup-dashboard__hist-bar" style={{ '--bar-height': `${height * 1.4}%` }} />
        ))}
      </div>
    </div>
  );
}

function MockupPieChart() {
  const gradient = PIE_SEGMENTS.reduce(
    (acc, seg, i, arr) => {
      const start = arr.slice(0, i).reduce((s, x) => s + x.value, 0);
      const end = start + seg.value;
      return `${acc}${seg.color} ${start}% ${end}%, `;
    },
    '',
  ).slice(0, -2);

  return (
    <div className="mockup-dashboard__chart mockup-dashboard__chart--pie">
      <h3 className="mockup-dashboard__chart-title">Plan distribution</h3>
      <div className="mockup-dashboard__pie-wrap">
        <div className="mockup-dashboard__pie" style={{ background: `conic-gradient(${gradient})` }} aria-hidden="true" />
        <ul className="mockup-dashboard__pie-legend">
          {PIE_SEGMENTS.map((seg) => (
            <li key={seg.label}>
              <span className="mockup-dashboard__pie-swatch" style={{ background: seg.color }} />
              {seg.label} ({seg.value}%)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MockupDashboard({ parts = {}, onFrameScrollLock }) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
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
          <span className="mockup-dashboard__brand">HueCorp Inc.</span>
          <nav className="mockup-dashboard__nav">
            {NAV_ITEMS.map((item) => (
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
        </aside>
      )}

      <div className="mockup-dashboard__main">
        {showTopBar && (
          <div className="mockup-dashboard__topbar">
            <input
              type="search"
              className="mockup-dashboard__search"
              placeholder="Search accounts, issues, reports…"
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

        {showHeader && (
          <header className="mockup-dashboard__header">
            <h1 className="mockup-dashboard__title">{PAGE_TITLES[activeNav]}</h1>
            <p className="mockup-dashboard__subtitle">
              {activeNav === 'dashboard' && 'Your workspace at a glance — revenue, users, and open issues.'}
              {activeNav === 'analytics' && 'Charts and trends across your product metrics.'}
              {activeNav === 'customers' && 'Manage accounts, plans, and subscription status.'}
              {activeNav === 'issues' && 'Track bugs, design tasks, and engineering work.'}
              {activeNav === 'profile' && 'Account details and application preferences.'}
            </p>
          </header>
        )}

        {showStats && (
          <div className="mockup-dashboard__stats">
            {STATS.map((stat) => (
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
            <MockupHistogram />
            <MockupPieChart />
          </section>
        )}

        {showIssues && (
          <section className="mockup-dashboard__issues">
            <h2 className="mockup-dashboard__section-title">Open issues</h2>
            <ul className="mockup-dashboard__issue-list">
              {ISSUES.map((issue) => (
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
            <h2 className="mockup-dashboard__section-title">Recent accounts</h2>
            <table className="mockup-dashboard__table">
              <thead>
                <tr>
                  <th scope="col">Account</th>
                  <th scope="col">Plan</th>
                  <th scope="col">Status</th>
                  <th scope="col">MRR</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => (
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
                <span className="mockup-dashboard__avatar" aria-hidden="true">AR</span>
                <div>
                  <h2 className="mockup-dashboard__profile-name">Alex Rivera</h2>
                  <p className="mockup-dashboard__profile-email">alex@acme.co</p>
                </div>
              </div>
              <form className="mockup-dashboard__settings" onSubmit={(e) => e.preventDefault()}>
                <h3 className="mockup-dashboard__settings-title">Preferences</h3>
                <label className="mockup-dashboard__setting">
                  <span>Email notifications</span>
                  <input type="checkbox" defaultChecked />
                </label>
                <label className="mockup-dashboard__setting">
                  <span>Weekly digest</span>
                  <input type="checkbox" defaultChecked />
                </label>
                <label className="mockup-dashboard__setting">
                  <span>Compact sidebar</span>
                  <input type="checkbox" />
                </label>
                <div className="mockup-dashboard__setting-field">
                  <label htmlFor="mockup-dash-timezone">Timezone</label>
                  <select id="mockup-dash-timezone" className="mockup-dashboard__select">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>UTC</option>
                  </select>
                </div>
                <div className="mockup-dashboard__setting-field">
                  <label htmlFor="mockup-dash-export">Default export format</label>
                  <select id="mockup-dash-export" className="mockup-dashboard__select">
                    <option>CSS variables</option>
                    <option>Tailwind config</option>
                    <option>JSON tokens</option>
                  </select>
                </div>
                <button type="submit" className="mockup-dashboard__save">Save changes</button>
              </form>
            </div>
          </section>
        )}
      </div>

      {notificationsOpen && (
        <div className="mockup-dashboard__notifications" role="dialog" aria-label="Notifications">
          <div className="mockup-dashboard__notifications-backdrop" onClick={closeNotifications} aria-hidden="true" />
          <div className="mockup-dashboard__notifications-panel">
            <header className="mockup-dashboard__notifications-header">
              <h2>Notifications</h2>
              <button type="button" onClick={closeNotifications} aria-label="Close notifications">×</button>
            </header>
            <ul className="mockup-dashboard__notifications-list">
              {NOTIFICATIONS.map((n) => (
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
