import { useState } from 'react';
import { X } from '@phosphor-icons/react';
import { FEATURE_COMPONENTS, LIVE_PREVIEW_COMPONENTS, UTILITY_COMPONENTS } from '../../data/componentCatalog';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import './DesignSystemModal.scss';

const TABS = [
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

function CatalogItem({ item }) {
  const isBuilt = item.status === 'built';

  return (
    <div className={`design-system-modal__item ${isBuilt ? 'design-system-modal__item--built' : ''}`}>
      <div className="design-system-modal__item-head">
        <span className="design-system-modal__item-label">{item.label}</span>
        <span className={`design-system-modal__status design-system-modal__status--${item.status}`}>
          {isBuilt ? 'Built' : 'Planned'}
        </span>
      </div>
      <p className="design-system-modal__item-desc">{item.description}</p>
      {item.usedIn && (
        <p className="design-system-modal__item-used">Used in: {item.usedIn}</p>
      )}
    </div>
  );
}

function DesignSystemModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('utility');
  const current = TABS.find((tab) => tab.id === activeTab) || TABS[0];
  const builtCount = current.items.filter((item) => item.status === 'built').length;

  return (
    <div className="design-system-modal" role="dialog" aria-modal="true" aria-labelledby="design-system-title">
      <div className="design-system-modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="design-system-modal__panel">
        <header className="design-system-modal__header">
          <div>
            <h2 id="design-system-title" className="design-system-modal__title">Design system catalog</h2>
            <p className="design-system-modal__subtitle">
              What&apos;s built in the app today and what&apos;s still on the roadmap.
            </p>
          </div>
          <button type="button" className="design-system-modal__close" onClick={onClose} aria-label="Close design system catalog">
            <Icon icon={X} size={ICON_SIZE} />
          </button>
        </header>

        <div className="design-system-modal__tabs" role="tablist" aria-label="Component categories">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`design-system-modal__tab ${activeTab === tab.id ? 'design-system-modal__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="design-system-modal__tab-count">{tab.items.length}</span>
            </button>
          ))}
        </div>

        <div className="design-system-modal__body" role="tabpanel">
          <p className="design-system-modal__section-desc">{current.description}</p>
          <p className="design-system-modal__summary">
            <span className="design-system-modal__summary-built">{builtCount} built</span>
            <span className="design-system-modal__summary-sep">·</span>
            <span>{current.items.length - builtCount} planned</span>
          </p>
          <div className="design-system-modal__list">
            {current.items.map((item) => (
              <CatalogItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignSystemModal;
