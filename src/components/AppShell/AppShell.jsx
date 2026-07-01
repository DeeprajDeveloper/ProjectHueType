import { useState, useCallback } from 'react';
import { COMBOS } from '../../data/combos';
import {
  useComboState,
  useComboFilter,
  useSavedCombos,
  useTheme,
  useToast,
  useKeyboardShuffle,
  useUiPreferences,
  useWalkthrough,
} from '../../hooks';
import { SidebarSimpleIcon, BooksIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import './AppShell.scss';
import AccordionStack from '../Accordion/AccordionStack';
import PresetsPanel from '../PresetsPanel/PresetsPanel';
import LivePreview from '../LivePreview/LivePreview';
import CustomizePanel from '../CustomizePanel/CustomizePanel';
import LockRandomizeControls from '../LockRandomizeControls/LockRandomizeControls';
import ExportModal from '../ExportModal/ExportModal';
import DesignSystemModal from '../DesignSystemModal/DesignSystemModal';
import Toast from '../Toast/Toast';
import SidebarRail from '../SidebarRail/SidebarRail';
import SidebarToolbar from '../SidebarToolbar/SidebarToolbar';
import PreviewComponentsPanel from '../PreviewComponentsPanel/PreviewComponentsPanel';
import Walkthrough from '../Walkthrough/Walkthrough';

function AppShell() {
  const [activeView, setActiveView] = useState('workspace');
  const [exportOpen, setExportOpen] = useState(false);
  const [designSystemOpen, setDesignSystemOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [originalCombo, setOriginalCombo] = useState(COMBOS[0]);

  const { theme, toggleTheme } = useTheme();
  const { toast, showToast } = useToast();
  const { saved, isSaved, toggleSave } = useSavedCombos();
  const {
    showColorScales,
    toggleColorScales,
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
  } = useComboState(COMBOS[0]);

  const filter = useComboFilter(activeView === 'saved' ? saved : COMBOS);

  const handleTourStepEnter = useCallback(
    (step) => {
      if (step.prepare === 'sidebar-workspace') {
        setSidebarOpen(true);
        setActiveView('workspace');
      } else if (step.prepare === 'components-panel') {
        setComponentsSidebarOpen(true);
      }
    },
    [setComponentsSidebarOpen],
  );

  const tour = useWalkthrough({ onStepEnter: handleTourStepEnter });

  useKeyboardShuffle(() => {
    if (tour.active) return;
    shuffle();
    showToast('Shuffled unlocked roles');
  });

  const handleSelectCombo = (selected) => {
    setOriginalCombo(structuredClone(selected));
    selectCombo(selected);
  };

  const handleShuffle = () => {
    shuffle();
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

  const handleExportCopy = () => {
    showToast('Copied to clipboard');
  };

  return (
    <div className="app-shell">
      <a href="#main-content" className="app-shell__skip">
        Skip to content
      </a>

      <div className={`app-shell__main ${!sidebarOpen ? 'app-shell__main--collapsed' : ''} ${!componentsSidebarOpen ? 'app-shell__main--components-collapsed' : ''}`}>
        <aside className={`app-shell__sidebar ${!sidebarOpen ? 'app-shell__sidebar--collapsed' : ''}`}>
          <div className="app-shell__sidebar-brand">
            <div className="app-shell__brand">
              <span className="app-shell__logo" aria-hidden="true">H</span>
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
            activeView={activeView}
            onViewChange={setActiveView}
            onShuffle={handleShuffle}
            onToggleTheme={toggleTheme}
            onShare={handleShare}
            onSave={handleSave}
            isSaved={isSaved(combo.id)}
            onExport={() => setExportOpen(true)}
            onOpenDesignSystem={() => setDesignSystemOpen(true)}
            onStartTour={tour.start}
            theme={theme}
            hasActiveFilters={filter.hasActiveFilters}
          />

          <div className="app-shell__sidebar-panel">
            <nav className="app-shell__sidebar-nav" aria-label="Library views">
              <button
                type="button"
                className={`app-shell__sidebar-nav-btn ${activeView === 'workspace' ? 'app-shell__sidebar-nav-btn--active' : ''}`}
                onClick={() => setActiveView('workspace')}
              >
                My Workspace
              </button>
              <button
                type="button"
                className={`app-shell__sidebar-nav-btn ${activeView === 'saved' ? 'app-shell__sidebar-nav-btn--active' : ''}`}
                onClick={() => setActiveView('saved')}
              >
                My Presets {saved.length > 0 && `(${saved.length})`}
              </button>
            </nav>

            <SidebarToolbar
              theme={theme}
              onToggleTheme={toggleTheme}
              onShare={handleShare}
              onSave={handleSave}
              isSaved={isSaved(combo.id)}
              onExport={() => setExportOpen(true)}
              dataTour="toolbar"
            />

            <AccordionStack className="app-shell__sidebar-accordions">
              <PresetsPanel
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
                isSavedView={activeView === 'saved'}
                combos={filter.filtered}
                selectedId={combo.id}
                savedIds={saved.map((s) => s.id)}
                onSelect={handleSelectCombo}
                onSave={toggleSave}
                onClearFiltersLibrary={filter.clearFilters}
              />
              <CustomizePanel
                combo={combo}
                originalCombo={originalCombo}
                locks={locks}
                showColorScales={showColorScales}
                onToggleColorScales={toggleColorScales}
                typeBasePx={typeBasePx}
                onTypeBasePxChange={setTypeBasePx}
                onColorChange={setColor}
                onFontChange={setFont}
                onToggleLock={toggleLock}
                onResetRole={resetRole}
                onCopyColor={(hex) => showToast(`Copied ${hex}`)}
              />
            </AccordionStack>
            <LockRandomizeControls locks={locks} onShuffle={handleShuffle} dataTour="shuffle" />
          </div>

          {sidebarOpen && (
            <footer className="app-shell__sidebar-footer">
              <button
                type="button"
                className="app-shell__design-system-link"
                onClick={() => setDesignSystemOpen(true)}
              >
                <Icon icon={BooksIcon} size={ICON_SIZE} className="app-shell__design-system-icon" />
                <span className="app-shell__design-system-text">
                  <span className="app-shell__design-system-label">Design system</span>
                  <span className="app-shell__design-system-desc">Built &amp; planned components</span>
                </span>
              </button>
              <p className="app-shell__sidebar-hint">
                Press <kbd>Space</kbd> to shuffle unlocked roles
              </p>
            </footer>
          )}
        </aside>

        <main id="main-content" className="app-shell__content">
          <LivePreview
            combo={combo}
            contrastPairs={contrastPairs}
            contrastStatus={contrastStatus}
            fontsLoading={fontsLoading}
            previewMode={previewMode}
            onPreviewModeChange={setPreviewMode}
            archetype={previewArchetype}
            archetypeParts={archetypeParts}
            previewLogoText={previewLogoText}
            typeBasePx={typeBasePx}
          />
        </main>

        <div className={`app-shell__components ${!componentsSidebarOpen ? 'app-shell__components--collapsed' : ''}`} data-tour="components-panel">
          <PreviewComponentsPanel
            open={componentsSidebarOpen}
            onToggleOpen={setComponentsSidebarOpen}
            archetype={previewArchetype}
            onArchetypeChange={setPreviewArchetype}
            archetypeParts={archetypeParts}
            onToggleArchetypePart={toggleArchetypePart}
            previewLogoText={previewLogoText}
            onPreviewLogoTextChange={setPreviewLogoText}
          />
        </div>
      </div>

      {exportOpen && (
        <ExportModal
          combo={combo}
          onClose={() => setExportOpen(false)}
          onCopy={handleExportCopy}
        />
      )}

      {designSystemOpen && (
        <DesignSystemModal onClose={() => setDesignSystemOpen(false)} />
      )}

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
