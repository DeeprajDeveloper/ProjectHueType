import { useState } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupSearch.scss';

function MockupSearch({ parts = {} }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const copy = MOCKUP_COPY.search;
  const show = (id) => parts[id] !== false;

  const filtered = copy.results.filter((result) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'WCAG') {
      return result.title.includes('WCAG') || result.excerpt.includes('WCAG');
    }
    const typeMap = { Presets: 'Preset', Docs: 'Doc', Exports: 'Export' };
    return result.type === (typeMap[activeFilter] || activeFilter);
  });

  return (
    <div className="mockup-search">
      {show('searchHeader') && (
        <header className="mockup-search__header">
          <div className="mockup-search__input-wrap">
            <Icon icon={MagnifyingGlassIcon} size={ICON_SIZE} />
            <input
              type="search"
              className="mockup-search__input"
              defaultValue={copy.header.query}
              placeholder={copy.header.placeholder}
              aria-label="Search"
              data-inspect="search-input"
            />
          </div>
          <p className="mockup-search__count">{copy.header.resultCount}</p>
        </header>
      )}

      {show('filterChips') && (
        <div className="mockup-search__filters" role="tablist" aria-label="Filter results">
          {copy.filters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              className={`mockup-search__chip ${activeFilter === filter ? 'mockup-search__chip--active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              data-inspect={index === 0 ? 'filter-chip' : undefined}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {show('sortBar') && (
        <div className="mockup-search__sort">
          <span className="mockup-search__sort-label">{copy.sort.label}</span>
          <button type="button" className="mockup-search__sort-btn">{copy.sort.value}</button>
        </div>
      )}

      {show('resultsList') && (
        <ul className="mockup-search__results">
          {filtered.map((result, index) => (
            <li key={result.id}>
              <article className="mockup-search__result">
                <div className="mockup-search__result-header">
                  <h2 className="mockup-search__result-title" data-inspect={index === 0 ? 'result-title' : undefined}>{result.title}</h2>
                  <span className="mockup-search__result-type">{result.type}</span>
                </div>
                <p className="mockup-search__result-excerpt">{result.excerpt}</p>
                <p className="mockup-search__result-meta" data-inspect={index === 0 ? 'result-meta' : undefined}>{result.meta}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MockupSearch;
