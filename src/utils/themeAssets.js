export const LOGO_LIGHT_SRC = '/logo_light.svg';
export const LOGO_DARK_SRC = '/logo_dark.svg';

export function getThemeLogoSrc(theme) {
  return theme === 'dark' ? LOGO_DARK_SRC : LOGO_LIGHT_SRC;
}

export function applyThemeBranding(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  const favicon = document.getElementById('favicon');
  if (favicon) {
    favicon.href = getThemeLogoSrc(theme);
  }
}
