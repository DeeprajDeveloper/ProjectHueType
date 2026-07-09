import { useState, useCallback, useEffect, useMemo } from 'react';
import { COMBOS } from '../../data/combos';
import {
  useComboState,
  useComboFilter,
  useSavedCombos,
  useTheme,
  useToast,
  useKeyboardShuffle,
  useKeyboardShortcuts,
  useUiPreferences,
  useWalkthrough,
  useWhatsNew,
  useIsCompactLayout,
  useBreakpoint,
} from '../../hooks';
import SidebarHeader from '../SidebarHeader/SidebarHeader';
import SidebarFooter from '../SidebarFooter/SidebarFooter';
import './AppShell.scss';
import LivePreview, { MOBILE_PREVIEW_DISABLED_MESSAGE } from '../LivePreview/LivePreview';
import ExportPanel from '../ExportPanel/ExportPanel';
import Toast from '../Toast/Toast';
import SidebarNav from '../SidebarNav/SidebarNav';
import OptionsPanel from '../OptionsPanel/OptionsPanel';
import Walkthrough from '../Walkthrough/Walkthrough';
import FeedbackModal from '../FeedbackModal/FeedbackModal';
import WhatsNewModal from '../WhatsNewModal/WhatsNewModal';
import { CHANGELOG_PATH } from '../../data/buildInfo';
import { submitFeedback } from '../../utils/feedback';
import { readStoredActivePanel, storeActivePanel, readStoredPreviewMode, storePreviewMode, resolvePanelId } from '../../data/sidebarNavItems';
import { resolvePreviewCopy } from '../../utils/previewCopyUtils';

function getInitialSidebarOpen() {
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches) {
    return false;
  }
  return true;
}

function AppShell() {
  const [activePanel, setActivePanelState] = useState(readStoredActivePanel);
  const [exportOpen, setExportOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(readStoredPreviewMode);
  const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarOpen);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [originalCombo, setOriginalCombo] = useState(COMBOS[0]);
  const [inspectorDockActive, setInspectorDockActive] = useState(false);
  const [inspectorDockPortalEl, setInspectorDockPortalEl] = useState(null);

  const { theme, toggleTheme } = useTheme();
  const { toast, showToast } = useToast();
  const { saved, isSaved, toggleSave, clearAllSaved } = useSavedCombos();
  const {
    showColorScales,
    toggleColorScales,
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
    previewCopyOverrides,
    setPreviewCopyOverride,
    resetPreviewCopyForArchetype,
    chipBarArchetypeIds,
    toggleChipBarArchetype,
  } = useUiPreferences();

  const resolvedPreviewCopy = useMemo(
    () => resolvePreviewCopy(previewCopyOverrides),
    [previewCopyOverrides],
  );

  const handleInspectorDockActiveChange = useCallback((active) => {
    setInspectorDockActive(active);
    if (active) {
      setComponentsSidebarOpen(true);
    }
  }, [setComponentsSidebarOpen]);

  const {
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
  } = useComboState(COMBOS[0]);

  const isSavedView = activePanel === 'saved';
  const filter = useComboFilter(isSavedView ? saved : COMBOS);
  const isCompact = useIsCompactLayout();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const sidebarCollapsed = isMobile || !sidebarOpen;

  const setActivePanel = useCallback((panel) => {
    setActivePanelState(panel);
    storeActivePanel(panel);
  }, []);

  const handlePanelToggle = useCallback((panel) => {
    const resolvedPanel = resolvePanelId(panel);
    if (activePanel === resolvedPanel && componentsSidebarOpen) {
      setComponentsSidebarOpen(false);
    } else {
      setActivePanel(resolvedPanel);
      setComponentsSidebarOpen(true);
    }
    if (isCompact) {
      setSidebarOpen(false);
    }
  }, [activePanel, componentsSidebarOpen, isCompact, setActivePanel, setComponentsSidebarOpen]);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const handleTourStepEnter = useCallback(
    (step) => {
      const prepare = step?.prepare;

      const openSlideOverPanel = (panel) => {
        setActivePanel(panel);
        setComponentsSidebarOpen(true);
        setExportOpen(false);
        if (isCompact) {
          setSidebarOpen(false);
        } else {
          setSidebarOpen(true);
        }
      };

      const openExpandedSidebar = () => {
        if (isMobile) return;
        setSidebarOpen(true);
        setComponentsSidebarOpen(false);
        setExportOpen(false);
      };

      const closeOverlays = () => {
        setExportOpen(false);
        if (isCompact) {
          setSidebarOpen(false);
          setComponentsSidebarOpen(false);
        }
        const inspectBtn = document.querySelector('[data-tour="inspect"]');
        if (inspectBtn?.getAttribute('aria-pressed') === 'true') {
          inspectBtn.click();
        }
      };

      if (prepare === 'sidebar-workspace') {
        if (isMobile) {
          setComponentsSidebarOpen(false);
          setExportOpen(false);
          return;
        }
        if (isCompact) {
          openExpandedSidebar();
        } else {
          setSidebarOpen(true);
          setActivePanel('workspace');
          setComponentsSidebarOpen(true);
          setExportOpen(false);
        }
        return;
      }

      if (prepare === 'open-workspace') {
        openSlideOverPanel('workspace');
        return;
      }

      if (prepare === 'open-colors') {
        openSlideOverPanel('colors');
        return;
      }

      if (prepare === 'open-archetypes') {
        if (isCompact) {
          openSlideOverPanel('archetypes');
        } else {
          setSidebarOpen(true);
          setActivePanel('archetypes');
          setComponentsSidebarOpen(true);
          setExportOpen(false);
          window.setTimeout(() => {
            const trigger = document.querySelector('[data-tour="nav-prototypes"]');
            if (trigger?.getAttribute('aria-expanded') === 'false') {
              trigger.click();
            }
          }, 0);
        }
        return;
      }

      if (prepare === 'open-preview-edit') {
        openSlideOverPanel('preview-edit');
        return;
      }

      if (prepare === 'open-preview-sections') {
        openSlideOverPanel('preview-sections');
        return;
      }

      if (prepare === 'open-layouts-expanded') {
        setExportOpen(false);
        if (isCompact) {
          openSlideOverPanel('archetypes');
        } else {
          setSidebarOpen(true);
          setComponentsSidebarOpen(false);
          window.setTimeout(() => {
            const trigger = document.querySelector('[data-tour="nav-prototypes"]');
            if (trigger?.getAttribute('aria-expanded') === 'false') {
              trigger.click();
            }
          }, 0);
        }
        return;
      }

      if (prepare === 'close-panels') {
        closeOverlays();
        return;
      }

      if (prepare === 'open-inspector-demo') {
        closeOverlays();
        window.setTimeout(() => {
          const inspectBtn = document.querySelector('[data-tour="inspect"]');
          if (inspectBtn?.getAttribute('aria-pressed') !== 'true') {
            inspectBtn?.click();
          }
          window.setTimeout(() => {
            document.querySelector('.inspector-overlay__dot')?.click();
          }, 450);
        }, 120);
        return;
      }

      if (prepare === 'open-export') {
        setExportOpen(true);
        if (isCompact) {
          setSidebarOpen(false);
          setComponentsSidebarOpen(false);
        }
        return;
      }

      if (prepare === 'close-export') {
        setExportOpen(false);
        return;
      }

      if (prepare === 'open-build-info') {
        openSlideOverPanel('build-info');
        return;
      }

      if (prepare === 'open-feature-catalog') {
        openSlideOverPanel('feature-catalog');
      }
    },
    [isCompact, isMobile, setActivePanel, setComponentsSidebarOpen],
  );

  const tour = useWalkthrough({ onStepEnter: handleTourStepEnter });
  const whatsNew = useWhatsNew({ tourActive: tour.active });

  useEffect(() => {
    if (tour.active) return;
    const inspectBtn = document.querySelector('[data-tour="inspect"]');
    if (inspectBtn?.getAttribute('aria-pressed') === 'true') {
      inspectBtn.click();
    }
  }, [tour.active]);

  const handleWhatsNewChangelog = useCallback(() => {
    whatsNew.dismiss();
    window.location.href = CHANGELOG_PATH;
  }, [whatsNew]);

  useEffect(() => {
    if (breakpoint === 'mobile') {
      setPreviewMode((current) => (current !== 'mobile' ? 'mobile' : current));
    }
  }, [breakpoint]);

  const handlePreviewModeChange = useCallback((mode) => {
    if (breakpoint === 'mobile' && mode !== 'mobile') {
      showToast(MOBILE_PREVIEW_DISABLED_MESSAGE);
      return;
    }
    setPreviewMode(mode);
    storePreviewMode(mode);
  }, [breakpoint, showToast]);

  useEffect(() => {
    if (isCompact) {
      setSidebarOpen(false);
    }
  }, [isCompact]);

  useEffect(() => {
    if (!isCompact || (!componentsSidebarOpen && !sidebarOpen)) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyWidth = body.style.width;
    const previousBodyTop = body.style.top;
    const scrollY = window.scrollY;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.width = '100%';
    body.style.top = `-${scrollY}px`;

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.width = previousBodyWidth;
      body.style.top = previousBodyTop;
      window.scrollTo(0, scrollY);
    };
  }, [isCompact, componentsSidebarOpen, sidebarOpen]);

  useEffect(() => {
    if (!feedbackOpen) return undefined;

    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [feedbackOpen]);

  const handleFeedbackOpen = useCallback(() => {
    setFeedbackOpen(true);
  }, []);

  const handleFeedbackSubmit = useCallback((data) => {
    submitFeedback(data);
    setFeedbackOpen(false);
    showToast('Opening your email app to send feedback to hello@huetype.dev');
  }, [showToast]);

  useKeyboardShuffle(() => {
    if (tour.active) return;
    const next = shuffle();
    if (next) {
      setOriginalCombo(structuredClone(next));
    }
    showToast('Shuffled unlocked roles');
  });

  useKeyboardShortcuts({
    enabled: !tour.active,
    exportOpen,
    onNavPanel: handlePanelToggle,
    onPreviewModeChange: handlePreviewModeChange,
  });

  const handleSelectCombo = (selected) => {
    setOriginalCombo(structuredClone(selected));
    selectCombo(selected);
  };

  const handleShuffle = () => {
    const next = shuffle();
    if (next) {
      setOriginalCombo(structuredClone(next));
    }
    showToast('Shuffled unlocked roles');
  };

  const handleSave = () => {
    const added = toggleSave(combo);
    showToast(added ? 'Combo saved' : 'Combo removed from saved');
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      showToast('Share link copied to clipboard');
    } catch {
      showToast('Could not copy link');
    }
  };

  const handleExportToggle = useCallback(() => {
    setExportOpen((open) => !open);
  }, []);

  const handleSidebarToggle = useCallback(() => {
    if (isMobile) return;
    setSidebarOpen((open) => !open);
  }, [isMobile]);

  const handleResetAllColors = () => {
    resetAllColors(originalCombo);
    showToast('All colors reset');
  };

  const handleResetAllFonts = () => {
    resetAllFonts(originalCombo);
    showToast('All fonts reset');
  };

  const handleClearAllSaved = () => {
    clearAllSaved();
    showToast('All saved presets removed');
  };

  return (
    <div className="app-shell">
      <a href="#main-content" className="app-shell__skip">
        Skip to content
      </a>

      <div
        className={[
          'app-shell__main',
          sidebarCollapsed ? 'app-shell__main--collapsed' : '',
          !componentsSidebarOpen ? 'app-shell__main--components-collapsed' : '',
          isCompact ? 'app-shell__main--compact' : '',
          isMobile ? 'app-shell__main--mobile' : '',
        ].filter(Boolean).join(' ')}
      >
        <aside className={`app-shell__sidebar ${sidebarCollapsed ? 'app-shell__sidebar--collapsed' : ''}`}>
          <SidebarHeader
            theme={theme}
            onToggleTheme={toggleTheme}
            onShare={handleShare}
            onSave={handleSave}
            isSaved={isSaved(combo.id)}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={handleSidebarToggle}
            isCompact={isCompact}
            isMobile={isMobile}
          />

          <div className="app-shell__sidebar-panel">
            <SidebarNav
              activePanel={activePanel}
              panelOpen={componentsSidebarOpen}
              onPanelChange={handlePanelToggle}
              activeArchetype={previewArchetype}
              onArchetypeChange={setPreviewArchetype}
              savedCount={saved.length}
              presetCount={filter.filtered.length}
              hasActiveFilters={filter.hasActiveFilters}
              collapsed={sidebarCollapsed}
              isCompact={isCompact}
              isMobile={isMobile}
            />
          </div>

          <SidebarFooter
            activePanel={activePanel}
            panelOpen={componentsSidebarOpen}
            onPanelChange={handlePanelToggle}
            onExport={handleExportToggle}
            exportActive={exportOpen}
            onFeedback={handleFeedbackOpen}
            collapsed={sidebarCollapsed}
          />
        </aside>

        {isCompact && !isMobile && sidebarOpen && (
          <button
            type="button"
            className="app-shell__sidebar-backdrop"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main id="main-content" className="app-shell__content">
          {exportOpen ? (
            <ExportPanel
              combo={combo}
              typeBasePx={typeBasePx}
              typeScaleRatio={typeScaleRatio}
              onClose={() => setExportOpen(false)}
              onCopy={() => showToast('Copied to clipboard')}
              onDownload={(filename) => showToast(`Downloaded ${filename}`)}
            />
          ) : (
            <LivePreview
              combo={combo}
              fontsLoading={fontsLoading}
              contrastStatus={contrastStatus}
              previewMode={previewMode}
              onPreviewModeChange={handlePreviewModeChange}
              archetype={previewArchetype}
              onArchetypeChange={setPreviewArchetype}
              onOpenArchetypes={() => handlePanelToggle('archetypes')}
              chipBarArchetypeIds={chipBarArchetypeIds}
              onToggleChipBarArchetype={toggleChipBarArchetype}
              archetypeParts={archetypeParts}
              previewLogoText={previewLogoText}
              previewCopy={resolvedPreviewCopy}
              typeBasePx={typeBasePx}
              typeScaleRatio={typeScaleRatio}
              onOpenContrast={() => handlePanelToggle('info')}
              onShuffle={handleShuffle}
              onColorChange={setColor}
              lockedCount={Object.values(locks).filter(Boolean).length}
              isCompact={isCompact}
              onShowToast={showToast}
              dockPortalEl={inspectorDockPortalEl}
              onInspectorDockActiveChange={handleInspectorDockActiveChange}
            />
          )}
        </main>

        {isCompact && componentsSidebarOpen && sidebarCollapsed && (
          <button
            type="button"
            className="app-shell__backdrop"
            aria-label="Close panel"
            onClick={() => setComponentsSidebarOpen(false)}
          />
        )}

        <div className={`app-shell__components ${!componentsSidebarOpen ? 'app-shell__components--collapsed' : ''}`}>
          <div
            ref={setInspectorDockPortalEl}
            className={`app-shell__inspector-dock ${inspectorDockActive ? 'app-shell__inspector-dock--active' : ''}`}
          />
          {!inspectorDockActive && (
          <OptionsPanel
            open={componentsSidebarOpen}
            onToggleOpen={setComponentsSidebarOpen}
            isCompact={isCompact}
            activePanel={activePanel}
            search={filter.search}
            onSearchChange={filter.setSearch}
            moodFilter={filter.moodFilter}
            industryFilter={filter.industryFilter}
            modeFilter={filter.modeFilter}
            onModeFilterChange={filter.setModeFilter}
            onToggleMood={filter.toggleMood}
            onToggleIndustry={filter.toggleIndustry}
            onClearMood={filter.clearMoodFilter}
            onClearIndustry={filter.clearIndustryFilter}
            onClearFilters={filter.clearFilters}
            hasActiveFilters={filter.hasActiveFilters}
            combos={filter.filtered}
            selectedId={combo.id}
            savedIds={saved.map((s) => s.id)}
            onSelect={handleSelectCombo}
            onSave={toggleSave}
            onClearFiltersLibrary={filter.clearFilters}
            savedCount={saved.length}
            combo={combo}
            originalCombo={originalCombo}
            locks={locks}
            showColorScales={showColorScales}
            onToggleColorScales={toggleColorScales}
            typeBasePx={typeBasePx}
            onTypeBasePxChange={setTypeBasePx}
            typeScaleRatio={typeScaleRatio}
            onTypeScaleRatioChange={setTypeScaleRatio}
            onColorChange={setColor}
            onFontChange={setFont}
            onToggleLock={toggleLock}
            onResetRole={resetRole}
            onResetAllColors={handleResetAllColors}
            onResetAllFonts={handleResetAllFonts}
            onClearAllSaved={handleClearAllSaved}
            onCopyColor={(hex) => showToast(`Copied ${hex}`)}
            contrastPairs={contrastPairs}
            contrastStatus={contrastStatus}
            onShowToast={showToast}
            archetype={previewArchetype}
            onArchetypeChange={setPreviewArchetype}
            archetypeParts={archetypeParts}
            onToggleArchetypePart={toggleArchetypePart}
            previewLogoText={previewLogoText}
            onPreviewLogoTextChange={setPreviewLogoText}
            previewCopyOverrides={previewCopyOverrides}
            onPreviewCopyChange={setPreviewCopyOverride}
            onResetPreviewCopy={resetPreviewCopyForArchetype}
            onStartTour={tour.start}
          />
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} />}

      {tour.active && (
        <Walkthrough
          step={tour.step}
          stepIndex={tour.stepIndex}
          stepCount={tour.stepCount}
          onNext={tour.goNext}
          onPrev={tour.goPrev}
          onSkip={tour.skip}
          isFirst={tour.isFirst}
          isLast={tour.isLast}
        />
      )}

      {feedbackOpen && (
        <FeedbackModal
          onClose={() => setFeedbackOpen(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}

      {whatsNew.open && !tour.active && (
        <WhatsNewModal
          onClose={whatsNew.dismiss}
          onViewChangelog={handleWhatsNewChangelog}
        />
      )}
    </div>
  );
}

export default AppShell;
