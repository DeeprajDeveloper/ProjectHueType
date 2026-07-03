import { useState } from 'react';
import { HeartIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupMobileApp.scss';

function MockupMobileApp({ parts = {} }) {
  const copy = MOCKUP_COPY['mobile-app'];
  const show = (id) => parts[id] !== false;
  const [activeTab, setActiveTab] = useState('home');
  const [browseFilter, setBrowseFilter] = useState('All');
  const [browseQuery, setBrowseQuery] = useState('');
  const [savedSort, setSavedSort] = useState('Recent');
  const [savedIds, setSavedIds] = useState(() => new Set(copy.screens.saved.items.map((i) => i.id)));
  const [settings, setSettings] = useState(() => (
    Object.fromEntries(copy.screens.profile.settings.map((s) => [s.id, s.on]))
  ));

  const screen = copy.screens[activeTab];

  const browsePresets = copy.screens.browse.presets.filter((preset) => {
    const matchesFilter = browseFilter === 'All' || preset.mood === browseFilter;
    const matchesQuery = !browseQuery.trim()
      || preset.title.toLowerCase().includes(browseQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const toggleSaved = (id) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSetting = (id) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderHome = () => (
    <ul className="mockup-mobile-app__cards">
      {copy.screens.home.cards.map((card) => (
        <li key={card.id}>
          <article className="mockup-mobile-app__card">
            <div className="mockup-mobile-app__card-art" aria-hidden="true" />
            <div className="mockup-mobile-app__card-body">
              <div className="mockup-mobile-app__card-top">
                <h2 className="mockup-mobile-app__card-title">{card.title}</h2>
                {card.tag && <span className="mockup-mobile-app__card-tag">{card.tag}</span>}
              </div>
              <p className="mockup-mobile-app__card-meta">{card.meta}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );

  const renderBrowse = () => (
    <>
      <div className="mockup-mobile-app__search">
        <Icon icon={MagnifyingGlassIcon} size={ICON_SIZE} />
        <input
          type="search"
          className="mockup-mobile-app__search-input"
          placeholder={copy.screens.browse.searchPlaceholder}
          value={browseQuery}
          onChange={(e) => setBrowseQuery(e.target.value)}
          aria-label="Search presets"
        />
      </div>
      <div className="mockup-mobile-app__chips" role="tablist" aria-label="Browse filters">
        {copy.screens.browse.filters.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={browseFilter === filter}
            className={`mockup-mobile-app__chip ${browseFilter === filter ? 'mockup-mobile-app__chip--active' : ''}`}
            onClick={() => setBrowseFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <ul className="mockup-mobile-app__cards">
        {browsePresets.map((preset) => (
          <li key={preset.id}>
            <article className="mockup-mobile-app__card mockup-mobile-app__card--browse">
              <div className="mockup-mobile-app__card-art mockup-mobile-app__card-art--browse" aria-hidden="true" />
              <div className="mockup-mobile-app__card-body">
                <h2 className="mockup-mobile-app__card-title">{preset.title}</h2>
                <p className="mockup-mobile-app__card-meta">{preset.meta}</p>
              </div>
              <button
                type="button"
                className="mockup-mobile-app__preview-btn"
                aria-label={`Preview ${preset.title}`}
              >
                Preview
              </button>
            </article>
          </li>
        ))}
      </ul>
    </>
  );

  const renderSaved = () => (
    <>
      <div className="mockup-mobile-app__sort">
        {copy.screens.saved.sortOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={`mockup-mobile-app__sort-btn ${savedSort === option ? 'mockup-mobile-app__sort-btn--active' : ''}`}
            onClick={() => setSavedSort(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <ul className="mockup-mobile-app__cards">
        {copy.screens.saved.items.map((item) => (
          <li key={item.id}>
            <article className="mockup-mobile-app__card mockup-mobile-app__card--saved">
              <div className="mockup-mobile-app__card-body">
                <h2 className="mockup-mobile-app__card-title">{item.title}</h2>
                <p className="mockup-mobile-app__card-meta">{item.meta}</p>
              </div>
              <button
                type="button"
                className={`mockup-mobile-app__heart ${savedIds.has(item.id) ? 'mockup-mobile-app__heart--active' : ''}`}
                aria-label={savedIds.has(item.id) ? 'Remove from saved' : 'Save'}
                aria-pressed={savedIds.has(item.id)}
                onClick={() => toggleSaved(item.id)}
              >
                <Icon icon={HeartIcon} size={ICON_SIZE} weight={savedIds.has(item.id) ? 'fill' : 'regular'} />
              </button>
            </article>
          </li>
        ))}
      </ul>
    </>
  );

  const renderProfile = () => {
    const profile = copy.screens.profile;
    return (
      <div className="mockup-mobile-app__profile">
        <div className="mockup-mobile-app__profile-header">
          <span className="mockup-mobile-app__avatar">{profile.user.initials}</span>
          <div>
            <h2 className="mockup-mobile-app__profile-name">{profile.user.name}</h2>
            <p className="mockup-mobile-app__profile-email">{profile.user.email}</p>
          </div>
        </div>
        <div className="mockup-mobile-app__stats">
          {profile.stats.map((stat) => (
            <div key={stat.label} className="mockup-mobile-app__stat">
              <span className="mockup-mobile-app__stat-value">{stat.value}</span>
              <span className="mockup-mobile-app__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <ul className="mockup-mobile-app__settings">
          {profile.settings.map((setting) => (
            <li key={setting.id}>
              <label className="mockup-mobile-app__toggle-row">
                <span>{setting.label}</span>
                <input
                  type="checkbox"
                  className="mockup-mobile-app__toggle"
                  checked={settings[setting.id]}
                  onChange={() => toggleSetting(setting.id)}
                />
              </label>
            </li>
          ))}
        </ul>
        <button type="button" className="mockup-mobile-app__sign-out">{profile.signOut}</button>
      </div>
    );
  };

  return (
    <div className="mockup-mobile-app">
      <div className="mockup-mobile-app__device">
        {show('statusBar') && (
          <div className="mockup-mobile-app__status" aria-hidden="true">
            <span>{copy.statusTime}</span>
            <span className="mockup-mobile-app__status-icons">●●●</span>
          </div>
        )}

        {show('appHeader') && (
          <header className="mockup-mobile-app__header">
            <h1 className="mockup-mobile-app__title">{screen.title}</h1>
            {activeTab !== 'profile' && (
              <button type="button" className="mockup-mobile-app__action">{screen.action}</button>
            )}
          </header>
        )}

        <main className="mockup-mobile-app__main">
          {show('contentCards') && (
            <>
              {activeTab === 'home' && renderHome()}
              {activeTab === 'browse' && renderBrowse()}
              {activeTab === 'saved' && renderSaved()}
              {activeTab === 'profile' && renderProfile()}
            </>
          )}
        </main>

        {show('bottomNav') && (
          <nav className="mockup-mobile-app__nav" aria-label="App navigation">
            {copy.nav.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`mockup-mobile-app__nav-btn ${activeTab === item.id ? 'mockup-mobile-app__nav-btn--active' : ''}`}
                aria-current={activeTab === item.id ? 'page' : undefined}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="mockup-mobile-app__nav-dot" aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

export default MockupMobileApp;
