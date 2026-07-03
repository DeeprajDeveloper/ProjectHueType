import { useEffect, useId, useRef, useState } from 'react';
import { XIcon } from '@phosphor-icons/react';
import { FEEDBACK_TYPES, FEEDBACK_MESSAGE_MAX_LENGTH } from '../../utils/feedback';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './FeedbackModal.scss';

function FeedbackModal({ onClose, onSubmit }) {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef(null);
  const [type, setType] = useState('general');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      setError('Please enter a message before sending.');
      return;
    }

    onSubmit?.({ type, email, message: trimmed });
  };

  return (
    <div className="feedback-modal" role="presentation">
      <button
        type="button"
        className="feedback-modal__backdrop"
        aria-label="Close feedback form"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        className="feedback-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
      >
        <header className="feedback-modal__header">
          <div>
            <h2 id={titleId} className="feedback-modal__title">Send feedback</h2>
            <p id={descId} className="feedback-modal__intro">
              Your message will be sent to hello@huetype.dev through your email app.
            </p>
          </div>
          <button
            type="button"
            className="feedback-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <Icon icon={XIcon} size={ICON_SIZE_SM} />
          </button>
        </header>

        <form className="feedback-modal__form" onSubmit={handleSubmit}>
          <fieldset className="feedback-modal__field">
            <legend className="feedback-modal__label">Feedback type</legend>
            <div className="feedback-modal__type-options">
              {FEEDBACK_TYPES.map((option) => (
                <label
                  key={option.id}
                  className={`feedback-modal__type ${type === option.id ? 'feedback-modal__type--active' : ''}`}
                >
                  <input
                    type="radio"
                    name="feedback-type"
                    value={option.id}
                    checked={type === option.id}
                    onChange={() => setType(option.id)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="feedback-modal__field" htmlFor="feedback-email">
            <span className="feedback-modal__label">Email (optional)</span>
            <span className="feedback-modal__hint">Only if you&apos;d like a follow-up.</span>
            <input
              id="feedback-email"
              type="email"
              className="feedback-modal__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label className="feedback-modal__field feedback-modal__field--message" htmlFor="feedback-message">
            <span className="feedback-modal__label">Message</span>
            <textarea
              id="feedback-message"
              className="feedback-modal__textarea"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError('');
              }}
              placeholder="What happened? What would you like to see improved?"
              rows={6}
              maxLength={FEEDBACK_MESSAGE_MAX_LENGTH}
              required
            />
            <span className="feedback-modal__char-count" aria-live="polite">
              {message.length}/{FEEDBACK_MESSAGE_MAX_LENGTH}
            </span>
          </label>

          {error && (
            <p className="feedback-modal__error" role="alert">{error}</p>
          )}

          <footer className="feedback-modal__actions">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Send feedback
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default FeedbackModal;
