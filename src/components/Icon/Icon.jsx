import { ICON_SIZE } from './iconConfig';
import './Icon.scss';

function Icon({ icon: IconComponent, size = ICON_SIZE, weight = 'regular', className = '', ...props }) {
  if (!IconComponent) return null;
  return (
    <IconComponent
      size={size}
      weight={weight}
      className={`app-icon ${className}`.trim()}
      aria-hidden
      {...props}
    />
  );
}

export default Icon;
