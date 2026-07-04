import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './LayoutSearchField.scss';

function LayoutSearchField({
  value,
  onChange,
  placeholder = 'Search layouts…',
  inputId,
  className = '',
  dataTour,
}) {
  return (
    <div
      className={`layout-search-field ${className}`.trim()}
      data-tour={dataTour}
    >
      <Icon icon={MagnifyingGlassIcon} size={ICON_SIZE_SM} />
      <input
        id={inputId}
        type="search"
        className="layout-search-field__input"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search layouts"
      />
      {value && (
        <button
          type="button"
          className="layout-search-field__clear"
          aria-label="Clear search"
          onClick={() => onChange('')}
        >
          <Icon icon={XIcon} size={ICON_SIZE_SM} />
        </button>
      )}
    </div>
  );
}

export default LayoutSearchField;
