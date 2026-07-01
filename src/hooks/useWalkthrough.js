import { useState, useEffect, useCallback } from 'react';
import { TOUR_STEPS } from '../data/tourSteps';

const STORAGE_KEY = 'huetype-tour-completed';
const AUTO_START_DELAY_MS = 800;

function readCompleted() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function useWalkthrough({ onStepEnter } = {}) {
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const enterStep = useCallback(
    (index) => {
      const step = TOUR_STEPS[index];
      if (step) onStepEnter?.(step);
    },
    [onStepEnter],
  );

  useEffect(() => {
    if (!readCompleted()) {
      const timer = window.setTimeout(() => {
        setActive(true);
        enterStep(0);
      }, AUTO_START_DELAY_MS);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [enterStep]);

  const start = useCallback(() => {
    setStepIndex(0);
    setActive(true);
    enterStep(0);
  }, [enterStep]);

  const finish = useCallback(() => {
    setActive(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
  }, []);

  const goTo = useCallback(
    (index) => {
      setStepIndex(index);
      enterStep(index);
    },
    [enterStep],
  );

  const goNext = useCallback(() => {
    if (stepIndex >= TOUR_STEPS.length - 1) {
      finish();
      return;
    }
    goTo(stepIndex + 1);
  }, [stepIndex, finish, goTo]);

  const goPrev = useCallback(() => {
    if (stepIndex > 0) goTo(stepIndex - 1);
  }, [stepIndex, goTo]);

  const skip = finish;

  return {
    active,
    step: TOUR_STEPS[stepIndex],
    stepIndex,
    stepCount: TOUR_STEPS.length,
    start,
    finish,
    skip,
    goNext,
    goPrev,
    isFirst: stepIndex === 0,
    isLast: stepIndex === TOUR_STEPS.length - 1,
  };
}
