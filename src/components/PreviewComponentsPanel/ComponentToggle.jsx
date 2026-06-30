function ComponentToggle({ label, description, checked, onChange, disabled = false }) {
  return (
    <label className={`component-toggle ${disabled ? 'component-toggle--disabled' : ''}`}>
      <button
        type="button"
        role="switch"
        className={`component-toggle__switch ${checked ? 'component-toggle__switch--on' : ''}`}
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
      >
        <span className="component-toggle__switch-thumb" />
      </button>
      <span className="component-toggle__body">
        <span className="component-toggle__label">{label}</span>
        {description && (
          <span className="component-toggle__desc">{description}</span>
        )}
      </span>
    </label>
  );
}

export default ComponentToggle;
