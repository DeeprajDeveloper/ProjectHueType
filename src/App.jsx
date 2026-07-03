import { useEffect, useState } from 'react';
import AppShell from './components/AppShell/AppShell';
import ChangelogPage from './components/ChangelogPage/ChangelogPage';
import PrivacyPage from './components/PrivacyPage/PrivacyPage';
import { isChangelogPath, isPrivacyPath } from './utils/routes';

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

  if (isChangelogPath(pathname)) {
    return <ChangelogPage />;
  }

  return <AppShell />;
}

export default App;
