import { useMemo, useState } from 'react';
import { FEATURE_COMPONENTS, LIVE_PREVIEW_COMPONENTS, UTILITY_COMPONENTS } from '../../data/componentCatalog';
import { getArchetypeGroupLabel } from '../PreviewComponentsPanel/previewArchetypes';
import Accordion from '../Accordion/Accordion';
import SegmentControl from '../SegmentControl/SegmentControl';
import './FeatureCatalogPanel.scss';

const CATALOG_TABS = [
  {
    id: 'utility',
    label: 'Utility',
    description: 'Reusable primitives other components are built from.',
    items: UTILITY_COMPONENTS,
  },
  {
    id: 'feature',
    label: 'Feature',
    description: 'App-level panels, rails, and workflows beyond single UI primitives.',
    items: FEATURE_COMPONENTS,
  },
  {
    id: 'preview',
    label: 'Live Preview',
    description: 'Mockup archetypes and preview tooling inside the live frame.',
    items: LIVE_PREVIEW_COMPONENTS,
  },
];

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'built', label: 'Built' },
  { value: 'planned', label: 'Planned' },
];

const GROUP_ORDER = ['group-1', 'group-2', 'group-3', 'group-4'];

function sortCatalogItems(items, tabId) {
  if (tabId !== 'preview') return items;

  return [...items].sort((a, b) => {
    const aIndex = a.group ? GROUP_ORDER.indexOf(a.group) : -1;
    const bIndex = b.group ? GROUP_ORDER.indexOf(b.group) : -1;
    const aOrder = aIndex === -1 ? GROUP_ORDER.length : aIndex;
    const bOrder = bIndex === -1 ? GROUP_ORDER.length : bIndex;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.label.localeCompare(b.label);
  });
}

function CatalogItem({ item }) {
  const isBuilt = item.status === 'built';
  const statusLabel = isBuilt ? 'Built' : 'Planned';
  const groupLabel = item.group ? getArchetypeGroupLabel(item.group) : null;

  return (
    <Accordion
      title={item.label}
      badge={(
        <span className={`feature-catalog-panel__status feature-catalog-panel__status--${item.status}`}>
          {statusLabel}
        </span>
      )}
      variant="chrome"
      className={`feature-catalog-panel__accordion ${isBuilt ? 'feature-catalog-panel__accordion--built' : ''}`}
      defaultOpen={false}
    >
      {groupLabel && (
        <p className="feature-catalog-panel__item-group">{groupLabel}</p>
      )}
      <p className="feature-catalog-panel__item-desc">{item.description}</p>
      {item.usedIn && (
        <p className="feature-catalog-panel__item-used">Used in: {item.usedIn}</p>
      )}
    </Accordion>
  );
}

function FeatureCatalogPanel() {
  const [activeTab, setActiveTab] = useState('utility');
  const [statusFilter, setStatusFilter] = useState('all');

  const current = CATALOG_TABS.find((tab) => tab.id === activeTab) || CATALOG_TABS[0];

  const filteredItems = useMemo(() => {
    const filtered = current.items.filter(
      (item) => statusFilter === 'all' || item.status === statusFilter,
    );
    return sortCatalogItems(filtered, current.id);
  }, [current.items, current.id, statusFilter]);

  const builtCount = current.items.filter((item) => item.status === 'built').length;
  const plannedCount = current.items.length - builtCount;

  return (
    <div className="feature-catalog-panel" data-tour="feature-catalog">
      <header className="feature-catalog-panel__header">
        <p className="feature-catalog-panel__intro">
          What&apos;s shipped in HueType today and what&apos;s still on the roadmap — grouped by area.
        </p>
      </header>

      <div className="feature-catalog-panel__tabs" role="tablist" aria-label="Catalog categories">
        {CATALOG_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`feature-catalog-panel__tab ${activeTab === tab.id ? 'feature-catalog-panel__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span className="feature-catalog-panel__tab-count">{tab.items.length}</span>
          </button>
        ))}
      </div>

      <div className="feature-catalog-panel__body" role="tabpanel">
        <p className="feature-catalog-panel__section-desc">{current.description}</p>

        <div className="feature-catalog-panel__filters">
          <SegmentControl
            options={STATUS_FILTERS}
            value={statusFilter}
            onChange={setStatusFilter}
            ariaLabel="Filter by build status"
          />
          <p className="feature-catalog-panel__summary">
            <span className="feature-catalog-panel__summary-built">{builtCount} built</span>
            <span className="feature-catalog-panel__summary-sep" aria-hidden="true">·</span>
            <span>{plannedCount} planned</span>
            {statusFilter !== 'all' && (
              <>
                <span className="feature-catalog-panel__summary-sep" aria-hidden="true">·</span>
                <span>{filteredItems.length} shown</span>
              </>
            )}
          </p>
        </div>

        {filteredItems.length === 0 ? (
          <p className="feature-catalog-panel__empty">
            No {statusFilter} items in this category.
          </p>
        ) : (
          <div className="feature-catalog-panel__list">
            {filteredItems.map((item) => (
              <CatalogItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeatureCatalogPanel;
