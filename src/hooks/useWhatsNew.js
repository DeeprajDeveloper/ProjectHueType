import { useCallback, useEffect, useState } from 'react';
import { APP_VERSION } from '../data/buildInfo';

export const TOUR_COMPLETED_STORAGE_KEY = 'huetype-tour-completed';
export const WHATS_NEW_SEEN_STORAGE_KEY = 'huetype-whats-new-seen';
const AUTO_OPEN_DELAY_MS = 900;

function readTourCompleted() {
  try {
    return localStorage.getItem(TOUR_COMPLETED_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function readWhatsNewSeenVersion() {
  try {
    return localStorage.getItem(WHATS_NEW_SEEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function shouldShowWhatsNew() {
  return readTourCompleted() && readWhatsNewSeenVersion() !== APP_VERSION;
}

export function useWhatsNew({ tourActive = false } = {}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (tourActive || !shouldShowWhatsNew()) return undefined;

    const timer = window.setTimeout(() => {
      if (!tourActive && shouldShowWhatsNew()) {
        setOpen(true);
      }
    }, AUTO_OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [tourActive]);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(WHATS_NEW_SEEN_STORAGE_KEY, APP_VERSION);
    } catch {
      // ignore
    }
  }, []);

  return { open, dismiss };
}
