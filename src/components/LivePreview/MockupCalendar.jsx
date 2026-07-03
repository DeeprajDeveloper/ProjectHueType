import { useState } from 'react';
import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupCalendar.scss';

const EVENT_COLOR_CLASS = {
  accent: 'mockup-calendar__event--accent',
  primary: 'mockup-calendar__event--primary',
  secondary: 'mockup-calendar__event--secondary',
};

const DAYS_IN_MONTH = 31;
const LEADING_BLANKS = 0;

function buildMonthCells() {
  const cells = Array.from({ length: LEADING_BLANKS }, () => null);
  for (let day = 1; day <= DAYS_IN_MONTH; day += 1) {
    cells.push(day);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

function MockupCalendar({ parts = {} }) {
  const copy = MOCKUP_COPY.calendar;
  const show = (id) => parts[id] !== false;
  const cells = buildMonthCells();
  const [selectedDay, setSelectedDay] = useState(copy.todayDate);
  const [activeView, setActiveView] = useState(copy.header.views[0]);

  const eventsByDay = copy.events.reduce((acc, event) => {
    if (!acc[event.day]) acc[event.day] = [];
    acc[event.day].push(event);
    return acc;
  }, {});

  const selectedEvents = eventsByDay[selectedDay] || [];
  const upcomingItems = selectedDay === copy.todayDate
    ? copy.upcoming.items
    : selectedEvents.map((event) => ({
      title: event.title,
      when: `Mar ${event.day} · ${event.time}`,
    }));

  return (
    <div className="mockup-calendar">
      {show('calendarHeader') && (
        <header className="mockup-calendar__header">
          <h1 className="mockup-calendar__title">{copy.header.title}</h1>
          <div className="mockup-calendar__header-actions">
            <button
              type="button"
              className="mockup-calendar__today-btn"
              onClick={() => setSelectedDay(copy.todayDate)}
            >
              {copy.header.today}
            </button>
            <div className="mockup-calendar__views" role="tablist" aria-label="Calendar view">
              {copy.header.views.map((view) => (
                <button
                  key={view}
                  type="button"
                  role="tab"
                  aria-selected={activeView === view}
                  className={`mockup-calendar__view-btn ${activeView === view ? 'mockup-calendar__view-btn--active' : ''}`}
                  onClick={() => setActiveView(view)}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>
        </header>
      )}

      <div className="mockup-calendar__layout">
        {show('monthGrid') && (
          <section className="mockup-calendar__grid-section" aria-label="Month view">
            <div className="mockup-calendar__weekdays">
              {copy.weekdays.map((day) => (
                <span key={day} className="mockup-calendar__weekday">
                  <span className="mockup-calendar__weekday-full">{day}</span>
                  <span className="mockup-calendar__weekday-short" aria-hidden="true">{day.charAt(0)}</span>
                </span>
              ))}
            </div>
            <div className="mockup-calendar__grid">
              {cells.map((day, index) => {
                const isToday = day === copy.todayDate;
                const isSelected = day === selectedDay;
                const dayEvents = day ? eventsByDay[day] || [] : [];

                return (
                  <button
                    key={`cell-${index}`}
                    type="button"
                    className={[
                      'mockup-calendar__cell',
                      !day ? 'mockup-calendar__cell--empty' : '',
                      isToday ? 'mockup-calendar__cell--today' : '',
                      isSelected && day ? 'mockup-calendar__cell--selected' : '',
                    ].filter(Boolean).join(' ')}
                    disabled={!day}
                    onClick={() => day && setSelectedDay(day)}
                    aria-label={day ? `March ${day}` : undefined}
                    aria-pressed={isSelected && !!day}
                  >
                    {day && (
                      <>
                        <span className="mockup-calendar__date">{day}</span>
                        {show('eventBlocks') && (
                          <div className="mockup-calendar__events">
                            {dayEvents.map((event) => (
                              <span
                                key={`${event.day}-${event.title}`}
                                className={`mockup-calendar__event ${EVENT_COLOR_CLASS[event.color] || ''}`}
                              >
                                {event.title}
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {show('sidebarEvents') && (
          <aside className="mockup-calendar__sidebar" aria-label="Upcoming events">
            <h2 className="mockup-calendar__sidebar-title">
              {selectedDay === copy.todayDate ? copy.upcoming.title : `Mar ${selectedDay}`}
            </h2>
            <ul className="mockup-calendar__upcoming">
              {upcomingItems.length > 0 ? upcomingItems.map((item) => (
                <li key={item.title}>
                  <article className="mockup-calendar__upcoming-item">
                    <h3>{item.title}</h3>
                    <time>{item.when}</time>
                  </article>
                </li>
              )) : (
                <li className="mockup-calendar__no-events">No events scheduled</li>
              )}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
}

export default MockupCalendar;
