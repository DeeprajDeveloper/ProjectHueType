import { useState } from 'react';
import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupNotifications.scss';

function MockupNotifications({ parts = {} }) {
  const [filter, setFilter] = useState('All');
  const copy = MOCKUP_COPY.notifications;
  const show = (id) => parts[id] !== false;
  const showBadges = show('unreadBadges');

  const filtered = copy.items.filter((item) => {
    if (filter === 'Unread') return item.unread;
    if (filter === 'Mentions') return item.title.includes('@') || item.body.includes('@');
    return true;
  });

  return (
    <div className="mockup-notifications">
      {show('feedHeader') && (
        <header className="mockup-notifications__header">
          <h1 className="mockup-notifications__title" data-inspect="feed-heading">{copy.header.title}</h1>
          <button type="button" className="mockup-notifications__mark-read">{copy.header.markAllRead}</button>
        </header>
      )}

      {show('filterTabs') && (
        <div className="mockup-notifications__filters" role="tablist" aria-label="Filter notifications">
          {copy.filters.map((tab, index) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={filter === tab}
              className={`mockup-notifications__filter ${filter === tab ? 'mockup-notifications__filter--active' : ''}`}
              onClick={() => setFilter(tab)}
              data-inspect={index === 0 ? 'filter-tab' : undefined}
            >
              {tab}
              {showBadges && tab === 'Unread' && (
                <span className="mockup-notifications__badge" data-inspect="unread-badge">{copy.unreadBadge}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {show('notificationList') && (
        <ul className="mockup-notifications__list">
          {filtered.map((item, index) => (
            <li key={item.id}>
              <article
                className={`mockup-notifications__item ${item.unread ? 'mockup-notifications__item--unread' : ''}`}
                data-inspect={index === 0 ? 'notification-item' : undefined}
              >
                <div className="mockup-notifications__avatar" aria-hidden="true">{item.avatar}</div>
                <div className="mockup-notifications__body">
                  <h2 className="mockup-notifications__item-title">{item.title}</h2>
                  <p className="mockup-notifications__item-text">{item.body}</p>
                  <time className="mockup-notifications__time">{item.time}</time>
                </div>
                {showBadges && item.unread && (
                  <span className="mockup-notifications__dot" aria-label="Unread" />
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MockupNotifications;
