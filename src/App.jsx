import { useEffect, useState } from 'react';
import AppShell from './components/AppShell/AppShell';
import PrivacyPage from './components/PrivacyPage/PrivacyPage';
import { PRIVACY_POLICY_PATH } from './data/buildInfo';

function isPrivacyPath(pathname) {
  return pathname === PRIVACY_POLICY_PATH || pathname === `${PRIVACY_POLICY_PATH}/`;
}

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (isPrivacyPath(pathname)) {
    return <PrivacyPage />;
  }

  return <AppShell />;
}

export default App;
