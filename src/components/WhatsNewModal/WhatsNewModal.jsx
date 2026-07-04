import { useEffect, useId, useRef } from 'react';
import { ArrowRightIcon, SparkleIcon, XIcon } from '@phosphor-icons/react';
import { APP_VERSION, CHANGELOG_PATH, WHATS_NEW_HIGHLIGHTS } from '../../data/buildInfo';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './WhatsNewModal.scss';

function WhatsNewModal({ onClose, onViewChangelog }) {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return (
    <div className="whats-new-modal" role="presentation">
      <button
        type="button"
        className="whats-new-modal__backdrop"
        aria-label="Close what's new"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        className="whats-new-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
      >
        <div className="whats-new-modal__layout">
          <div className="whats-new-modal__illustration" aria-hidden="true">
            <img
              className="whats-new-modal__image"
              src="/new-feat.jpg"
              alt=""
              width={320}
              height={480}
              decoding="async"
            />
          </div>

          <div className="whats-new-modal__main">
            <header className="whats-new-modal__header">
              <div className="whats-new-modal__eyebrow">
                <Icon icon={SparkleIcon} size={ICON_SIZE_SM} weight="fill" />
                <span>What&apos;s new in v{APP_VERSION}</span>
              </div>
              <button
                type="button"
                className="whats-new-modal__close"
                aria-label="Close"
                onClick={onClose}
              >
                <Icon icon={XIcon} size={ICON_SIZE_SM} />
              </button>
            </header>

            <div className="whats-new-modal__body">
              <h2 id={titleId} className="whats-new-modal__title">{WHATS_NEW_HIGHLIGHTS.title}</h2>
              <p id={descId} className="whats-new-modal__intro">{WHATS_NEW_HIGHLIGHTS.intro}</p>

              <ul className="whats-new-modal__list">
                {WHATS_NEW_HIGHLIGHTS.items.map((item) => (
                  <li key={item.title} className="whats-new-modal__item">
                    <h3 className="whats-new-modal__item-title">{item.title}</h3>
                    <p className="whats-new-modal__item-body">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="whats-new-modal__actions">
              <button type="button" className="btn btn--secondary" onClick={onClose}>
                Got it
              </button>
              <button
                type="button"
                className="btn btn--primary whats-new-modal__changelog-btn"
                onClick={onViewChangelog}
              >
                Full changelog
                <Icon icon={ArrowRightIcon} size={ICON_SIZE_SM} />
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsNewModal;
