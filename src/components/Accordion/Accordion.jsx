import { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './Accordion.scss';

function readStoredOpen(storageKey, defaultOpen) {
  if (!storageKey) return defaultOpen;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) return stored === 'true';
  } catch {
    // ignore
  }
  return defaultOpen;
}

function Accordion({
  title,
  badge,
  defaultOpen = false,
  persistKey,
  children,
  className = '',
  variant = 'default',
}) {
  const storageKey = persistKey ? `huetype-accordion-${persistKey}` : null;
  const [open, setOpen] = useState(() => readStoredOpen(storageKey, defaultOpen));

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, String(next));
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  return (
    <div className={`accordion accordion--${variant} ${open ? 'accordion--open' : ''} ${className}`}>
      <button
        type="button"
        className="accordion__trigger"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span className="accordion__title">{title}</span>
        {badge && <span className="accordion__badge">{badge}</span>}
        <span className={`accordion__chevron ${open ? 'accordion__chevron--open' : ''}`} aria-hidden="true">
          <Icon icon={CaretDown} size={ICON_SIZE_SM} />
        </span>
      </button>
      {open && (
        <div className="accordion__content">
          {children}
        </div>
      )}
    </div>
  );
}

export default Accordion;
