import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupProfile.scss';

const ACTIVITY_TYPE_CLASS = {
  save: 'mockup-profile__activity-dot--save',
  export: 'mockup-profile__activity-dot--export',
  fix: 'mockup-profile__activity-dot--fix',
  share: 'mockup-profile__activity-dot--share',
};

function MockupProfile({ parts = {} }) {
  const copy = MOCKUP_COPY.profile;
  const show = (id) => parts[id] !== false;

  return (
    <div className="mockup-profile">
      {show('profileHeader') && (
        <header className="mockup-profile__header">
          <div className="mockup-profile__avatar" aria-hidden="true">{copy.header.avatar}</div>
          <div className="mockup-profile__identity">
            <h1 className="mockup-profile__name">{copy.header.name}</h1>
            <p className="mockup-profile__handle">{copy.header.handle}</p>
            <p className="mockup-profile__meta">
              {copy.header.location} · {copy.header.joined}
            </p>
          </div>
          <button type="button" className="mockup-profile__edit">{copy.header.edit}</button>
        </header>
      )}

      {show('stats') && (
        <div className="mockup-profile__stats">
          {copy.stats.map((stat) => (
            <article key={stat.label} className="mockup-profile__stat">
              <span className="mockup-profile__stat-value">{stat.value}</span>
              <span className="mockup-profile__stat-label">{stat.label}</span>
            </article>
          ))}
        </div>
      )}

      <div className="mockup-profile__body">
        {show('bio') && (
          <section className="mockup-profile__section">
            <h2 className="mockup-profile__section-title">{copy.bio.title}</h2>
            <p className="mockup-profile__bio">{copy.bio.text}</p>
          </section>
        )}

        {show('socialLinks') && (
          <section className="mockup-profile__section">
            <h2 className="mockup-profile__section-title">{copy.social.title}</h2>
            <ul className="mockup-profile__social">
              {copy.social.items.map((item) => (
                <li key={item.label}>
                  <span className="mockup-profile__social-label">{item.label}</span>
                  <span className="mockup-profile__social-handle">{item.handle}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {show('activityGrid') && (
        <section className="mockup-profile__activity">
          <h2 className="mockup-profile__section-title">{copy.activity.title}</h2>
          <div className="mockup-profile__activity-grid">
            {copy.activity.items.map((item) => (
              <article key={item.id} className="mockup-profile__activity-item">
                <span
                  className={`mockup-profile__activity-dot ${ACTIVITY_TYPE_CLASS[item.type] || ''}`}
                  aria-hidden="true"
                />
                <div>
                  <p className="mockup-profile__activity-label">{item.label}</p>
                  <time className="mockup-profile__activity-time">{item.time}</time>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default MockupProfile;
