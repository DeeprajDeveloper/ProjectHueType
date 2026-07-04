import { useState } from 'react';
import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO } from '../../data/mockupCopy';
import './MockupSettings.scss';

function MockupSettings({ parts = {}, logoText = DEFAULT_PREVIEW_LOGO }) {
  const [activeTab, setActiveTab] = useState('profile');
  const copy = MOCKUP_COPY.settings;
  const show = (id) => parts[id] !== false;

  return (
    <div className="mockup-settings">
      {show('settingsNav') && (
        <aside className="mockup-settings__nav" aria-label="Settings navigation">
          <span className="mockup-settings__logo">{logoText}</span>
          <nav>
            {copy.nav.tabs.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                className={`mockup-settings__nav-btn ${activeTab === tab.id ? 'mockup-settings__nav-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                data-inspect={index === 0 ? 'settings-nav-item' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>
      )}

      <main className="mockup-settings__main">
        <header className="mockup-settings__header">
          <h1 className="mockup-settings__title">{copy.header.title}</h1>
          <p className="mockup-settings__subtitle">{copy.header.subtitle}</p>
        </header>

        {show('profileSection') && activeTab === 'profile' && (
          <section className="mockup-settings__section">
            <h2 className="mockup-settings__section-title" data-inspect="section-heading">{copy.profile.sectionTitle}</h2>
            <div className="mockup-settings__field">
              <label className="mockup-settings__label" htmlFor="settings-name">{copy.profile.fields.displayName.label}</label>
              <input id="settings-name" type="text" className="mockup-settings__input" defaultValue={copy.profile.fields.displayName.value} />
            </div>
            <div className="mockup-settings__field">
              <label className="mockup-settings__label" htmlFor="settings-email">{copy.profile.fields.email.label}</label>
              <input id="settings-email" type="email" className="mockup-settings__input" defaultValue={copy.profile.fields.email.value} />
            </div>
            <button type="button" className="mockup-settings__save">{copy.profile.save}</button>
          </section>
        )}

        {show('preferences') && activeTab === 'preferences' && (
          <section className="mockup-settings__section">
            <h2 className="mockup-settings__section-title">{copy.preferences.sectionTitle}</h2>
            {copy.preferences.items.map((pref, index) => (
              <label key={pref.id} className="mockup-settings__toggle-row" data-inspect={index === 0 ? 'preference-toggle' : undefined}>
                <span className="mockup-settings__toggle-copy">
                  <span className="mockup-settings__toggle-label">{pref.label}</span>
                  <span className="mockup-settings__toggle-desc">{pref.desc}</span>
                </span>
                <input type="checkbox" className="mockup-settings__toggle" defaultChecked={pref.id !== 'email'} />
              </label>
            ))}
          </section>
        )}

        {show('dangerZone') && (
          <section className="mockup-settings__section mockup-settings__section--danger">
            <h2 className="mockup-settings__section-title">{copy.dangerZone.title}</h2>
            <p className="mockup-settings__danger-copy">
              {copy.dangerZone.copy}
            </p>
            <button type="button" className="mockup-settings__danger-btn" data-inspect="danger-button">{copy.dangerZone.delete}</button>
          </section>
        )}
      </main>
    </div>
  );
}

export default MockupSettings;
