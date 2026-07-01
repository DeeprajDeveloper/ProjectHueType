import { ICON_SIZE } from './iconConfig';
import './Icon.scss';

function Icon({ icon: IconComponent, size = ICON_SIZE, weight, active = false, className = '', ...props }) {
  if (!IconComponent) return null;
  const resolvedWeight = weight ?? (active ? 'fill' : 'regular');
  return (
    <IconComponent
      size={size}
      weight={resolvedWeight}
      className={`app-icon ${className}`.trim()}
      aria-hidden
      {...props}
    />
  );
}

export default Icon;
