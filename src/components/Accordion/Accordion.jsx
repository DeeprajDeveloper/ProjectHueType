import { useState, useEffect, useRef } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import { useAccordionStack } from './AccordionStack';
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
  stackId,
  children,
  className = '',
  variant = 'default',
  dataTour,
  dataInspectDockId,
  triggerRef,
}) {
  const stack = useAccordionStack();
  const storageKey = persistKey ? `huetype-accordion-${persistKey}` : null;
  const [open, setOpen] = useState(() => readStoredOpen(storageKey, defaultOpen));
  const registeredStackIdRef = useRef(null);

  useEffect(() => {
    if (!stack || !stackId || registeredStackIdRef.current === stackId) return;
    registeredStackIdRef.current = stackId;

    const initialOpen = readStoredOpen(storageKey, defaultOpen);
    stack.register(stackId, initialOpen);
  }, [stack, stackId, storageKey, defaultOpen]);

  useEffect(() => {
    if (!stack || !stackId) return;

    const shouldOpen = stack.openId === stackId;
    if (stack.openId === null && !shouldOpen) return;

    setOpen((prev) => {
      if (prev === shouldOpen) return prev;
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, String(shouldOpen));
        } catch {
          // ignore
        }
      }
      return shouldOpen;
    });
  }, [stack, stackId, stack?.openId, storageKey]);

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
      if (stack && stackId) {
        stack.setOpen(stackId, next);
      }
      return next;
    });
  };

  const isPrimary = stack && stackId ? stack.isPrimary(stackId) : false;

  return (
    <div
      className={`accordion accordion--${variant} ${open ? 'accordion--open' : ''} ${isPrimary ? 'accordion--focused' : ''} ${className}`}
      data-tour={dataTour}
    >
      <button
        ref={triggerRef}
        type="button"
        className="accordion__trigger"
        aria-expanded={open}
        data-inspect-dock-id={dataInspectDockId}
        onClick={handleToggle}
      >
        <span className="accordion__title">{title}</span>
        {badge && <span className="accordion__badge">{badge}</span>}
        <span className={`accordion__chevron ${open ? 'accordion__chevron--open' : ''}`} aria-hidden="true">
          <Icon icon={CaretDownIcon} size={ICON_SIZE_SM} />
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
