import { CHANGELOG_PATH, PRIVACY_POLICY_PATH } from '../data/buildInfo';

const STANDALONE_PATHS = [PRIVACY_POLICY_PATH, CHANGELOG_PATH];

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return pathname;
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function isPrivacyPath(pathname) {
  const path = normalizePath(pathname);
  return path === PRIVACY_POLICY_PATH;
}

export function isChangelogPath(pathname) {
  const path = normalizePath(pathname);
  return path === CHANGELOG_PATH;
}

export function isStandalonePath(pathname) {
  const path = normalizePath(pathname);
  return STANDALONE_PATHS.includes(path);
}
