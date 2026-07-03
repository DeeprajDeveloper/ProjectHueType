import { ArrowLeftIcon } from '@phosphor-icons/react';
import { APP_NAME } from '../../data/buildInfo';
import { useTheme } from '../../hooks';
import { getThemeLogoSrc } from '../../utils/themeAssets';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './StandalonePageHeader.scss';

function StandalonePageHeader({ title, backHref = '/', backLabel = 'Back to HueType' }) {
  const { theme } = useTheme();

  return (
    <header className="standalone-header">
      <div className="standalone-header__inner">
        <a href="/" className="standalone-header__brand">
          <img
            src={getThemeLogoSrc(theme)}
            alt=""
            className="standalone-header__logo"
            width={28}
            height={28}
          />
          <span className="standalone-header__name">{APP_NAME}</span>
        </a>

        <a href={backHref} className="standalone-header__back">
          <Icon icon={ArrowLeftIcon} size={ICON_SIZE_SM} />
          {backLabel}
        </a>
      </div>

      {title && <h1 className="standalone-header__title">{title}</h1>}
    </header>
  );
}

export default StandalonePageHeader;
