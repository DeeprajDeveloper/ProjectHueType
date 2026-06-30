import './IconButton.scss';

function IconButton({ children, label, onClick, active = false }) {
  return (
    <button
      type="button"
      className={`icon-button ${active ? 'icon-button--active' : ''}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

export default IconButton;
