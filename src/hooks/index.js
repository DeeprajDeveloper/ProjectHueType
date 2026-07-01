import { useState, useEffect, useCallback, useMemo } from 'react';
import { COMBOS } from '../data/combos';
import { shuffleCombo, createDefaultLocks, updateComboColor, updateComboFont } from '../utils/shuffle';
import { checkComboContrast, getOverallContrastStatus } from '../utils/contrast';
import { loadComboFonts } from '../utils/fonts';
import { syncUrlState, readUrlState } from '../utils/urlState';

export function useComboState(initialCombo) {
  const urlState = readUrlState();
  const [combo, setCombo] = useState(urlState?.combo || initialCombo || COMBOS[0]);
  const [locks, setLocks] = useState(urlState?.locks || createDefaultLocks());
  const [fontsLoading, setFontsLoading] = useState(false);

  useEffect(() => {
    setFontsLoading(true);
    loadComboFonts(combo).finally(() => setFontsLoading(false));
  }, [combo.fonts.heading.family, combo.fonts.body.family]);

  useEffect(() => {
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
    document.documentElement.setAttribute('data-theme', theme);
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
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault();
        onShuffle();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onShuffle]);
}

import { getDefaultArchetypeParts } from '../components/PreviewComponentsPanel/previewArchetypes';
import { TYPE_BASE_PX, clampTypeBasePx } from '../utils/typographyScale';

export function useUiPreferences() {
  const COLOR_SCALES_KEY = 'huetype-show-color-scales';
  const SCALE_HEX_KEY = 'huetype-show-scale-hex';
  const TYPE_BASE_KEY = 'huetype-type-base-px';
  const PREVIEW_ARCHETYPE_KEY = 'huetype-preview-archetype';
  const PREVIEW_PARTS_KEY = 'huetype-preview-parts';
  const COMPONENTS_SIDEBAR_KEY = 'huetype-components-sidebar-open';
  const PREVIEW_LOGO_KEY = 'huetype-preview-logo-text';
  const VALID_ARCHETYPES = new Set(['marketing', 'dashboard', 'pricing', 'blog', 'ecommerce']);
  const DEFAULT_PREVIEW_LOGO = 'Acme Co.';

  const [showColorScales, setShowColorScales] = useState(() => {
    try {
      const stored = localStorage.getItem(COLOR_SCALES_KEY);
      if (stored !== null) return stored === 'true';
    } catch {
      // ignore
    }
    return true;
  });

  const [showScaleHex, setShowScaleHex] = useState(() => {
    try {
      const stored = localStorage.getItem(SCALE_HEX_KEY);
      if (stored !== null) return stored === 'true';
    } catch {
      // ignore
    }
    return false;
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
    const defaults = getDefaultArchetypeParts();
    try {
      const stored = JSON.parse(localStorage.getItem(PREVIEW_PARTS_KEY));
      if (stored && typeof stored === 'object') {
        return Object.fromEntries(
          Object.entries(defaults).map(([archetype, parts]) => [
            archetype,
            { ...parts, ...(stored[archetype] || {}) },
          ]),
        );
      }
    } catch {
      // ignore
    }
    return defaults;
  });

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

  const toggleScaleHex = useCallback(() => {
    setShowScaleHex((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SCALE_HEX_KEY, String(next));
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
      const next = {
        ...prev,
        [archetype]: {
          ...prev[archetype],
          [partId]: !prev[archetype]?.[partId],
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

  return {
    showColorScales,
    toggleColorScales,
    setColorScalesEnabled,
    showScaleHex,
    toggleScaleHex,
    typeBasePx,
    setTypeBasePx,
    previewArchetype,
    setPreviewArchetype,
    archetypeParts,
    toggleArchetypePart,
    componentsSidebarOpen,
    setComponentsSidebarOpen,
    previewLogoText,
    setPreviewLogoText,
  };
}

export { useWalkthrough } from './useWalkthrough';
