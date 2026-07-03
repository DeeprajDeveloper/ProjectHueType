import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { COMBOS } from '../data/combos';
import { shuffleCombo, createDefaultLocks, updateComboColor, updateComboFont } from '../utils/shuffle';
import { checkComboContrast, getOverallContrastStatus } from '../utils/contrast';
import { loadComboFonts } from '../utils/fonts';
import { syncUrlState, readUrlState, isDefaultAppState } from '../utils/urlState';
import { isEditableTarget, matchesShortcut } from '../utils/keyboard';
import { NAV_PANEL_SHORTCUTS, PREVIEW_DEVICE_SHORTCUTS } from '../data/keyboardShortcuts';
import { getDefaultArchetypeParts, PREVIEW_ARCHETYPES, mergeArchetypePartsState, resolveArchetypeParts } from '../components/PreviewComponentsPanel/previewArchetypes';
import { CHIP_BAR_ARCHETYPE_IDS } from '../data/sidebarNavItems';
import { TYPE_BASE_PX, clampTypeBasePx, DEFAULT_SCALE_RATIO, clampScaleRatio } from '../utils/typographyScale';
import { applyThemeBranding } from '../utils/themeAssets';

export function useComboState(initialCombo) {
  const urlState = readUrlState();
  const initialComboState = urlState?.combo || initialCombo || COMBOS[0];
  const initialLocksState = urlState?.locks || createDefaultLocks();
  const [combo, setCombo] = useState(initialComboState);
  const [locks, setLocks] = useState(initialLocksState);
  const [fontsLoading, setFontsLoading] = useState(false);
  const skipInitialUrlSync = useRef(!urlState && isDefaultAppState(initialComboState, initialLocksState));

  useEffect(() => {
    setFontsLoading(true);
    loadComboFonts(combo).finally(() => setFontsLoading(false));
  }, [combo.fonts.heading.family, combo.fonts.body.family]);

  useEffect(() => {
    if (skipInitialUrlSync.current) {
      skipInitialUrlSync.current = false;
      if (isDefaultAppState(combo, locks)) return;
    }
    syncUrlState(combo, locks);
  }, [combo, locks]);

  const contrastPairs = useMemo(() => checkComboContrast(combo.colors), [combo.colors]);
  const contrastStatus = useMemo(() => getOverallContrastStatus(contrastPairs), [contrastPairs]);

  const selectCombo = useCallback((newCombo) => {
    setCombo(structuredClone(newCombo));
  }, []);

  const shuffle = useCallback(() => {
    const nextCombo = shuffleCombo(combo, locks);
    setCombo(nextCombo);
    return nextCombo;
  }, [combo, locks]);

  const toggleLock = useCallback((key) => {
    setLocks((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const setColor = useCallback((role, value) => {
    setCombo((prev) => updateComboColor(prev, role, value));
  }, []);

  const setFont = useCallback((role, family) => {
    setCombo((prev) => updateComboFont(prev, role, family));
  }, []);

  const resetRole = useCallback((type, role, originalCombo) => {
    if (type === 'color') {
      setCombo((prev) => updateComboColor(prev, role, originalCombo.colors[role]));
    } else {
      setCombo((prev) => updateComboFont(prev, role, originalCombo.fonts[role].family));
    }
  }, []);

  const resetAllColors = useCallback((originalCombo) => {
    setCombo((prev) => ({
      ...prev,
      colors: { ...originalCombo.colors },
    }));
  }, []);

  const resetAllFonts = useCallback((originalCombo) => {
    setCombo((prev) => ({
      ...prev,
      fonts: structuredClone(originalCombo.fonts),
    }));
  }, []);

  return {
    combo,
    locks,
    fontsLoading,
    contrastPairs,
    contrastStatus,
    selectCombo,
    shuffle,
    toggleLock,
    setColor,
    setFont,
    resetRole,
    resetAllColors,
    resetAllFonts,
  };
}

export function useComboFilter(combos) {
  const [search, setSearch] = useState('');
  const [moodFilter, setMoodFilter] = useState([]);
  const [industryFilter, setIndustryFilter] = useState([]);
  const [modeFilter, setModeFilter] = useState('all');

  const filtered = useMemo(() => {
    return combos.filter((combo) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        combo.name.toLowerCase().includes(searchLower) ||
        combo.inspiredBy.toLowerCase().includes(searchLower) ||
        combo.mood.some((m) => m.toLowerCase().includes(searchLower)) ||
        combo.industry.some((i) => i.toLowerCase().includes(searchLower));

      const matchesMood =
        moodFilter.length === 0 || moodFilter.some((m) => combo.mood.includes(m));

      const matchesIndustry =
        industryFilter.length === 0 || industryFilter.some((i) => combo.industry.includes(i));

      const matchesMode =
        modeFilter === 'all' || combo.mode === modeFilter;

      return matchesSearch && matchesMood && matchesIndustry && matchesMode;
    });
  }, [combos, search, moodFilter, industryFilter, modeFilter]);

  const toggleMood = (mood) => {
    setMoodFilter((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood],
    );
  };

  const toggleIndustry = (industry) => {
    setIndustryFilter((prev) =>
      prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry],
    );
  };

  const clearFilters = () => {
    setSearch('');
    setMoodFilter([]);
    setIndustryFilter([]);
    setModeFilter('all');
  };

  const clearMoodFilter = () => setMoodFilter([]);
  const clearIndustryFilter = () => setIndustryFilter([]);

  return {
    search,
    setSearch,
    moodFilter,
    industryFilter,
    modeFilter,
    setModeFilter,
    filtered,
    toggleMood,
    toggleIndustry,
    clearMoodFilter,
    clearIndustryFilter,
    clearFilters,
    hasActiveFilters: search || moodFilter.length || industryFilter.length || modeFilter !== 'all',
  };
}

export function useSavedCombos() {
  const STORAGE_KEY = 'huetype-saved-combos';

  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const persist = (items) => {
    setSaved(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const isSaved = (id) => saved.some((s) => s.id === id);

  const save = (combo) => {
    if (isSaved(combo.id)) return false;
    persist([...saved, { ...combo, savedAt: Date.now() }]);
    return true;
  };

  const unsave = (id) => {
    persist(saved.filter((s) => s.id !== id));
  };

  const toggleSave = (combo) => {
    if (isSaved(combo.id)) {
      unsave(combo.id);
      return false;
    }
    save(combo);
    return true;
  };

  const clearAll = () => {
    persist([]);
  };

  return { saved, isSaved, save, unsave, toggleSave, clearAll };
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('huetype-theme') || 'light';
  });

  useEffect(() => {
    applyThemeBranding(theme);
    localStorage.setItem('huetype-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
}

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, action) => {
    setToast({ message, action, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return { toast, showToast };
}

export function useKeyboardShuffle(onShuffle) {
  useEffect(() => {
    const handler = (e) => {
      if (e.code !== 'Space' || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (isEditableTarget(e.target)) return;
      e.preventDefault();
      onShuffle();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onShuffle]);
}

export function useKeyboardShortcuts({
  enabled = true,
  exportOpen = false,
  onNavPanel,
  onPreviewModeChange,
}) {
  useEffect(() => {
    if (!enabled) return undefined;

    const handler = (e) => {
      if (isEditableTarget(e.target)) return;

      for (const item of NAV_PANEL_SHORTCUTS) {
        if (matchesShortcut(e, item.shortcut)) {
          e.preventDefault();
          onNavPanel(item.id);
          return;
        }
      }

      if (!exportOpen) {
        for (const item of PREVIEW_DEVICE_SHORTCUTS) {
          if (matchesShortcut(e, item.shortcut)) {
            e.preventDefault();
            onPreviewModeChange(item.id);
            return;
          }
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled, exportOpen, onNavPanel, onPreviewModeChange]);
}

export function useUiPreferences() {
  const COLOR_SCALES_KEY = 'huetype-show-color-scales';
  const TYPE_BASE_KEY = 'huetype-type-base-px';
  const TYPE_RATIO_KEY = 'huetype-type-scale-ratio';
  const PREVIEW_ARCHETYPE_KEY = 'huetype-preview-archetype';
  const PREVIEW_PARTS_KEY = 'huetype-preview-parts';
  const COMPONENTS_SIDEBAR_KEY = 'huetype-components-sidebar-open';
  const PREVIEW_LOGO_KEY = 'huetype-preview-logo-text';
  const CHIP_BAR_KEY = 'huetype-chip-bar-archetypes';
  const VALID_ARCHETYPES = new Set(PREVIEW_ARCHETYPES.map((archetype) => archetype.id));
  const DEFAULT_PREVIEW_LOGO = 'Acme Co.';
  const MAX_CHIP_BAR = 8;

  const readChipBarArchetypeIds = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(CHIP_BAR_KEY));
      if (
        Array.isArray(stored)
        && stored.length <= MAX_CHIP_BAR
        && stored.every((id) => VALID_ARCHETYPES.has(id))
      ) {
        return stored;
      }
    } catch {
      // ignore
    }
    return CHIP_BAR_ARCHETYPE_IDS.filter((id) => VALID_ARCHETYPES.has(id));
  };

  const [showColorScales, setShowColorScales] = useState(() => {
    try {
      const stored = localStorage.getItem(COLOR_SCALES_KEY);
      if (stored !== null) return stored === 'true';
    } catch {
      // ignore
    }
    return true;
  });

  const [typeBasePx, setTypeBasePxState] = useState(() => {
    try {
      const stored = localStorage.getItem(TYPE_BASE_KEY);
      if (stored !== null) return clampTypeBasePx(stored);
    } catch {
      // ignore
    }
    return TYPE_BASE_PX;
  });

  const [typeScaleRatio, setTypeScaleRatioState] = useState(() => {
    try {
      const stored = localStorage.getItem(TYPE_RATIO_KEY);
      if (stored !== null) return clampScaleRatio(stored);
    } catch {
      // ignore
    }
    return DEFAULT_SCALE_RATIO;
  });

  const [previewArchetype, setPreviewArchetypeState] = useState(() => {
    try {
      const stored = localStorage.getItem(PREVIEW_ARCHETYPE_KEY);
      if (stored && VALID_ARCHETYPES.has(stored)) return stored;
    } catch {
      // ignore
    }
    return 'marketing';
  });

  const [archetypeParts, setArchetypePartsState] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(PREVIEW_PARTS_KEY));
      return mergeArchetypePartsState(stored);
    } catch {
      // ignore
    }
    return getDefaultArchetypeParts();
  });

  useEffect(() => {
    setArchetypePartsState((prev) => mergeArchetypePartsState(prev));
  }, []);

  const [componentsSidebarOpen, setComponentsSidebarOpenState] = useState(() => {
    try {
      const stored = localStorage.getItem(COMPONENTS_SIDEBAR_KEY);
      if (stored !== null) return stored === 'true';
    } catch {
      // ignore
    }
    return true;
  });

  const [previewLogoText, setPreviewLogoTextState] = useState(() => {
    try {
      const stored = localStorage.getItem(PREVIEW_LOGO_KEY);
      if (stored && stored.trim()) return stored;
    } catch {
      // ignore
    }
    return DEFAULT_PREVIEW_LOGO;
  });

  const [chipBarArchetypeIds, setChipBarArchetypeIdsState] = useState(readChipBarArchetypeIds);

  const toggleColorScales = useCallback(() => {
    setShowColorScales((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(COLOR_SCALES_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setColorScalesEnabled = useCallback((enabled) => {
    setShowColorScales(enabled);
    try {
      localStorage.setItem(COLOR_SCALES_KEY, String(enabled));
    } catch {
      // ignore
    }
  }, []);

  const setTypeBasePx = useCallback((value) => {
    const next = clampTypeBasePx(value);
    setTypeBasePxState(next);
    try {
      localStorage.setItem(TYPE_BASE_KEY, String(next));
    } catch {
      // ignore
    }
  }, []);

  const setTypeScaleRatio = useCallback((value) => {
    const next = clampScaleRatio(value);
    setTypeScaleRatioState(next);
    try {
      localStorage.setItem(TYPE_RATIO_KEY, String(next));
    } catch {
      // ignore
    }
  }, []);

  const setPreviewArchetype = useCallback((archetype) => {
    if (!VALID_ARCHETYPES.has(archetype)) return;
    setPreviewArchetypeState(archetype);
    try {
      localStorage.setItem(PREVIEW_ARCHETYPE_KEY, archetype);
    } catch {
      // ignore
    }
  }, []);

  const toggleArchetypePart = useCallback((archetype, partId) => {
    setArchetypePartsState((prev) => {
      const current = resolveArchetypeParts(archetype, prev[archetype]);
      const next = {
        ...prev,
        [archetype]: {
          ...current,
          [partId]: !current[partId],
        },
      };
      try {
        localStorage.setItem(PREVIEW_PARTS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setComponentsSidebarOpen = useCallback((open) => {
    setComponentsSidebarOpenState(open);
    try {
      localStorage.setItem(COMPONENTS_SIDEBAR_KEY, String(open));
    } catch {
      // ignore
    }
  }, []);

  const setPreviewLogoText = useCallback((text) => {
    setPreviewLogoTextState(text);
    try {
      localStorage.setItem(PREVIEW_LOGO_KEY, text);
    } catch {
      // ignore
    }
  }, []);

  const persistChipBarArchetypeIds = useCallback((ids) => {
    setChipBarArchetypeIdsState(ids);
    try {
      localStorage.setItem(CHIP_BAR_KEY, JSON.stringify(ids));
    } catch {
      // ignore
    }
  }, []);

  const toggleChipBarArchetype = useCallback((archetypeId) => {
    if (!VALID_ARCHETYPES.has(archetypeId)) return;
    setChipBarArchetypeIdsState((prev) => {
      let next = prev;
      if (prev.includes(archetypeId)) {
        next = prev.filter((id) => id !== archetypeId);
      } else if (prev.length >= MAX_CHIP_BAR) {
        return prev;
      } else {
        next = [...prev, archetypeId];
      }
      try {
        localStorage.setItem(CHIP_BAR_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return {
    showColorScales,
    toggleColorScales,
    setColorScalesEnabled,
    typeBasePx,
    setTypeBasePx,
    typeScaleRatio,
    setTypeScaleRatio,
    previewArchetype,
    setPreviewArchetype,
    archetypeParts,
    toggleArchetypePart,
    componentsSidebarOpen,
    setComponentsSidebarOpen,
    previewLogoText,
    setPreviewLogoText,
    chipBarArchetypeIds,
    toggleChipBarArchetype,
    setChipBarArchetypeIds: persistChipBarArchetypeIds,
  };
}

export { useWalkthrough } from './useWalkthrough';
export { useBreakpoint, useIsCompactLayout } from './useBreakpoint';
