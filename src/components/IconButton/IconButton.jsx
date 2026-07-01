import { Children, cloneElement, isValidElement } from 'react';
import './IconButton.scss';

function IconButton({ children, label, onClick, active = false }) {
  const content = Children.map(children, (child) => {
    if (isValidElement(child) && child.props?.icon != null) {
      return cloneElement(child, {
        active: child.props.active ?? active,
      });
    }
    return child;
  });

  return (
    <button
      type="button"
      className={`icon-button ${active ? 'icon-button--active' : ''}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {content}
    </button>
  );
}

export default IconButton;
