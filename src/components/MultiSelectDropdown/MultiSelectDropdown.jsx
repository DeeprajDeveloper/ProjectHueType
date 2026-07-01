import { useState, useRef, useEffect } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './MultiSelectDropdown.scss';

function MultiSelectDropdown({
  label,
  options,
  selected,
  onToggle,
  onClear,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const summary = selected.length === 0
    ? `All ${label.toLowerCase()}`
    : selected.length === 1
      ? selected[0]
      : `${selected.length} selected`;

  return (
    <div className="multi-select" ref={ref}>
      <span className="multi-select__label">{label}</span>
      <div className="multi-select__wrapper">
        <button
          type="button"
          className={`multi-select__trigger ${open ? 'multi-select__trigger--open' : ''}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="multi-select__summary">{summary}</span>
          <span className={`multi-select__arrow ${open ? 'multi-select__arrow--open' : ''}`} aria-hidden="true">
            <Icon icon={CaretDown} size={ICON_SIZE_SM} active={open} />
          </span>
        </button>

        {open && (
          <div className="multi-select__panel" role="listbox" aria-label={`${label} filter`}>
            {selected.length > 0 && (
              <button type="button" className="multi-select__clear" onClick={onClear}>
                Clear selection
              </button>
            )}
            {options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <label key={option} className="multi-select__option">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggle(option)}
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiSelectDropdown;
