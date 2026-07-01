import { useState, useCallback, useEffect } from 'react';
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
  useIsCompactLayout,
  useBreakpoint,
} from '../../hooks';
import { SidebarSimpleIcon, BooksIcon, PackageIcon, QuestionIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import { APP_VERSION } from '../../data/buildInfo';
import './AppShell.scss';
import LivePreview, { MOBILE_PREVIEW_DISABLED_MESSAGE } from '../LivePreview/LivePreview';
import ExportPanel from '../ExportPanel/ExportPanel';
import Toast from '../Toast/Toast';
import SidebarRail from '../SidebarRail/SidebarRail';
import SidebarToolbar from '../SidebarToolbar/SidebarToolbar';
import SidebarNav from '../SidebarNav/SidebarNav';
import OptionsPanel from '../OptionsPanel/OptionsPanel';
import Walkthrough from '../Walkthrough/Walkthrough';
import { readStoredActivePanel, storeActivePanel } from '../../data/sidebarNavItems';

function getInitialPreviewMode() {
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches) {
    return 'mobile';
  }
  return 'desktop';
}

function AppShell() {
  const [activePanel, setActivePanelState] = useState(readStoredActivePanel);
  const [exportOpen, setExportOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(getInitialPreviewMode);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [originalCombo, setOriginalCombo] = useState(COMBOS[0]);

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
  } = useUiPreferences();

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

  const setActivePanel = useCallback((panel) => {
    setActivePanelState(panel);
    storeActivePanel(panel);
  }, []);

  const handlePanelToggle = useCallback((panel) => {
    if (activePanel === panel && componentsSidebarOpen) {
      setComponentsSidebarOpen(false);
    } else {
      setActivePanel(panel);
      setComponentsSidebarOpen(true);
    }
  }, [activePanel, componentsSidebarOpen, setComponentsSidebarOpen]);

  const handleTourStepEnter = useCallback(
    (step) => {
      const prepare = step?.prepare;

      if (prepare === 'sidebar-workspace' || prepare === 'open-workspace') {
        setSidebarOpen(true);
        setActivePanel('workspace');
        setComponentsSidebarOpen(true);
        setExportOpen(false);
        return;
      }

      if (prepare === 'open-colors') {
        setSidebarOpen(true);
        setActivePanel('colors');
        setComponentsSidebarOpen(true);
        setExportOpen(false);
        return;
      }

      if (prepare === 'open-archetypes') {
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
        return;
      }

      if (prepare === 'close-panels') {
        setExportOpen(false);
        return;
      }

      if (prepare === 'open-export') {
        setExportOpen(true);
        return;
      }

      if (prepare === 'close-export') {
        setExportOpen(false);
        return;
      }

      if (prepare === 'open-build-info') {
        setSidebarOpen(true);
        setActivePanel('build-info');
        setComponentsSidebarOpen(true);
        setExportOpen(false);
        return;
      }

      if (prepare === 'open-feature-catalog') {
        setSidebarOpen(true);
        setActivePanel('feature-catalog');
        setComponentsSidebarOpen(true);
        setExportOpen(false);
      }
    },
    [setComponentsSidebarOpen],
  );

  const tour = useWalkthrough({ onStepEnter: handleTourStepEnter });
  const isCompact = useIsCompactLayout();
  const breakpoint = useBreakpoint();

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
  }, [breakpoint, showToast]);

  useEffect(() => {
    if (isCompact) {
      setSidebarOpen(false);
    }
  }, [isCompact]);

  useEffect(() => {
    if (!isCompact || !componentsSidebarOpen) return undefined;

    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isCompact, componentsSidebarOpen]);

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
          !sidebarOpen ? 'app-shell__main--collapsed' : '',
          !componentsSidebarOpen ? 'app-shell__main--components-collapsed' : '',
          isCompact ? 'app-shell__main--compact' : '',
        ].filter(Boolean).join(' ')}
      >
        <aside className={`app-shell__sidebar ${!sidebarOpen ? 'app-shell__sidebar--collapsed' : ''}`}>
          <div className="app-shell__sidebar-brand">
            <div className="app-shell__brand">
              <img
                src='/logo_light.svg'
                alt="HueType"
                className="app-shell__logo"
              />
              <span className="app-shell__brand-name">HueType</span>
            </div>
            {sidebarOpen && (
              <button
                type="button"
                className="app-shell__sidebar-toggle"
                aria-label="Collapse sidebar"
                onClick={() => setSidebarOpen(false)}
              >
                <Icon icon={SidebarSimpleIcon} size={ICON_SIZE} />
              </button>
            )}
          </div>

          <SidebarRail
            onExpand={() => setSidebarOpen(true)}
            activePanel={activePanel}
            panelOpen={componentsSidebarOpen}
            onPanelChange={handlePanelToggle}
            onToggleTheme={toggleTheme}
            onShare={handleShare}
            onSave={handleSave}
            isSaved={isSaved(combo.id)}
            onExport={handleExportToggle}
            exportActive={exportOpen}
            theme={theme}
            hasActiveFilters={filter.hasActiveFilters}
            isCompact={isCompact}
          />

          <div className="app-shell__sidebar-panel">
            <SidebarNav
              activePanel={activePanel}
              panelOpen={componentsSidebarOpen}
              onPanelChange={handlePanelToggle}
              savedCount={saved.length}
              hasActiveFilters={filter.hasActiveFilters}
            />

            <SidebarToolbar
              theme={theme}
              onToggleTheme={toggleTheme}
              onShare={handleShare}
              onSave={handleSave}
              isSaved={isSaved(combo.id)}
              onExport={handleExportToggle}
              exportActive={exportOpen}
              dataTour="toolbar"
            />
          </div>

          {sidebarOpen && (
            <footer className="app-shell__sidebar-footer">
              <button
                type="button"
                className={`app-shell__sidebar-footer-link ${activePanel === 'help' && componentsSidebarOpen ? 'app-shell__sidebar-footer-link--active' : ''}`}
                onClick={() => handlePanelToggle('help')}
                aria-pressed={activePanel === 'help' && componentsSidebarOpen}
                data-tour="help-footer"
              >
                <Icon icon={QuestionIcon} size={ICON_SIZE} className="app-shell__sidebar-footer-icon" />
                <span className="app-shell__sidebar-footer-text">
                  <span className="app-shell__sidebar-footer-label">Help</span>
                  <span className="app-shell__sidebar-footer-desc">Keyboard shortcuts</span>
                </span>
              </button>
              <button
                type="button"
                className={`app-shell__sidebar-footer-link ${activePanel === 'build-info' && componentsSidebarOpen ? 'app-shell__sidebar-footer-link--active' : ''}`}
                onClick={() => handlePanelToggle('build-info')}
                aria-pressed={activePanel === 'build-info' && componentsSidebarOpen}
                data-tour="build-info-footer"
              >
                <Icon icon={PackageIcon} size={ICON_SIZE} className="app-shell__sidebar-footer-icon" />
                <span className="app-shell__sidebar-footer-text">
                  <span className="app-shell__sidebar-footer-label">Build Info</span>
                  <span className="app-shell__sidebar-footer-desc">v{APP_VERSION} · app overview</span>
                </span>
              </button>
              <button
                type="button"
                className={`app-shell__sidebar-footer-link ${activePanel === 'feature-catalog' && componentsSidebarOpen ? 'app-shell__sidebar-footer-link--active' : ''}`}
                onClick={() => handlePanelToggle('feature-catalog')}
                aria-pressed={activePanel === 'feature-catalog' && componentsSidebarOpen}
                data-tour="feature-catalog-footer"
              >
                <Icon icon={BooksIcon} size={ICON_SIZE} className="app-shell__sidebar-footer-icon" />
                <span className="app-shell__sidebar-footer-text">
                  <span className="app-shell__sidebar-footer-label">Feature Catalog</span>
                  <span className="app-shell__sidebar-footer-desc">Built &amp; planned components</span>
                </span>
              </button>
            </footer>
          )}
        </aside>

        <main id="main-content" className="app-shell__content">
          {exportOpen ? (
            <ExportPanel
              combo={combo}
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
              archetypeParts={archetypeParts}
              previewLogoText={previewLogoText}
              typeBasePx={typeBasePx}
              typeScaleRatio={typeScaleRatio}
              onOpenInfo={() => handlePanelToggle('info')}
              infoActive={activePanel === 'info' && componentsSidebarOpen}
              onShuffle={handleShuffle}
              lockedCount={Object.values(locks).filter(Boolean).length}
              isCompact={isCompact}
              onShowToast={showToast}
            />
          )}
        </main>

        {isCompact && componentsSidebarOpen && (
          <button
            type="button"
            className="app-shell__backdrop"
            aria-label="Close panel"
            onClick={() => setComponentsSidebarOpen(false)}
          />
        )}

        <div className={`app-shell__components ${!componentsSidebarOpen ? 'app-shell__components--collapsed' : ''}`}>
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
            onStartTour={tour.start}
          />
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
    </div>
  );
}

export default AppShell;
