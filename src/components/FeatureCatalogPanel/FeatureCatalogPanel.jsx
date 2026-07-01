import { useMemo, useState } from 'react';
import { FEATURE_COMPONENTS, LIVE_PREVIEW_COMPONENTS, UTILITY_COMPONENTS } from '../../data/componentCatalog';
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

function CatalogItem({ item }) {
  const isBuilt = item.status === 'built';

  return (
    <article className={`feature-catalog-panel__item ${isBuilt ? 'feature-catalog-panel__item--built' : ''}`}>
      <div className="feature-catalog-panel__item-head">
        <h4 className="feature-catalog-panel__item-label">{item.label}</h4>
        <span className={`feature-catalog-panel__status feature-catalog-panel__status--${item.status}`}>
          {isBuilt ? 'Built' : 'Planned'}
        </span>
      </div>
      <p className="feature-catalog-panel__item-desc">{item.description}</p>
      {item.usedIn && (
        <p className="feature-catalog-panel__item-used">Used in: {item.usedIn}</p>
      )}
    </article>
  );
}

function FeatureCatalogPanel() {
  const [activeTab, setActiveTab] = useState('utility');
  const [statusFilter, setStatusFilter] = useState('all');

  const current = CATALOG_TABS.find((tab) => tab.id === activeTab) || CATALOG_TABS[0];

  const filteredItems = useMemo(
    () => current.items.filter((item) => statusFilter === 'all' || item.status === statusFilter),
    [current.items, statusFilter],
  );

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
