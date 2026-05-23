'use client';

import { useState } from 'react';
import styles from './FilterPanel.module.css';

/* Collapsible filter group */
function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={styles.group}>
      <button
        className={styles.groupHeader}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        suppressHydrationWarning
      >
        <span>{title}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className={styles.groupBody}>{children}</div>}
    </div>
  );
}

/* Searchable checkbox list */
function CheckboxList({ items, selected, onToggle, placeholder = 'Search…', maxVisible = 6 }) {
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
  const visible = showAll ? filtered : filtered.slice(0, maxVisible);

  return (
    <div className={styles.checkboxList}>
      {items.length > maxVisible && (
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          suppressHydrationWarning
        />
      )}
      {visible.map((item) => (
        <label key={item} className={styles.checkboxItem}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={selected.includes(item)}
            onChange={() => onToggle(item)}
            suppressHydrationWarning
          />
          <span className={styles.checkboxLabel}>{item}</span>
        </label>
      ))}
      {filtered.length > maxVisible && !showAll && (
        <button className={styles.showMore} onClick={() => setShowAll(true)} suppressHydrationWarning>
          +{filtered.length - maxVisible} more
        </button>
      )}
      {showAll && filtered.length > maxVisible && (
        <button className={styles.showMore} onClick={() => setShowAll(false)} suppressHydrationWarning>
          Show less
        </button>
      )}
      {filtered.length === 0 && (
        <p className={styles.noResults}>No results</p>
      )}
    </div>
  );
}

export default function FilterPanel({
  filterOptions,
  selectedProfiles,
  toggleProfile,
  selectedLocations,
  toggleLocation,
  selectedDurations,
  toggleDuration,
  minStipend,
  setMinStipend,
  remoteOnly,
  setRemoteOnly,
  clearAllFilters,
  activeFilterCount,
}) {
  const { profiles, locations, durations, maxStipend } = filterOptions;

  return (
    <aside className={styles.panel} id="filter-panel">
      {/* Panel header */}
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className={styles.filterBadge}>{activeFilterCount}</span>
          )}
        </h2>
        {activeFilterCount > 0 && (
          <button className={styles.clearBtn} onClick={clearAllFilters} id="clear-filters-btn" suppressHydrationWarning>
            Clear all
          </button>
        )}
      </div>

      {/* Work from Home toggle */}
      <div className={styles.toggleRow}>
        <span className={styles.toggleLabel}>Work From Home</span>
        <button
          id="wfh-toggle"
          className={`${styles.toggle} ${remoteOnly ? styles.toggleOn : ''}`}
          onClick={() => setRemoteOnly((v) => !v)}
          role="switch"
          aria-checked={remoteOnly}
          suppressHydrationWarning
        >
          <span className={styles.toggleThumb} />
        </button>
      </div>

      {/* Profile */}
      <FilterGroup title="Profile">
        <CheckboxList
          items={profiles}
          selected={selectedProfiles}
          onToggle={toggleProfile}
          placeholder="Search profiles…"
        />
      </FilterGroup>

      {/* Location */}
      <FilterGroup title="Location">
        <CheckboxList
          items={locations}
          selected={selectedLocations}
          onToggle={toggleLocation}
          placeholder="Search cities…"
        />
      </FilterGroup>

      {/* Duration */}
      <FilterGroup title="Duration">
        <CheckboxList
          items={durations}
          selected={selectedDurations}
          onToggle={toggleDuration}
          placeholder="Search duration…"
          maxVisible={8}
        />
      </FilterGroup>

      {/* Stipend */}
      <FilterGroup title="Stipend (min/month)">
        <div className={styles.stipendWrap}>
          <div className={styles.stipendValue}>
            ₹ {minStipend.toLocaleString('en-IN')}
          </div>
          <input
            id="stipend-slider"
            type="range"
            className={styles.slider}
            min={0}
            max={maxStipend || 100000}
            step={1000}
            value={minStipend}
            onChange={(e) => setMinStipend(Number(e.target.value))}
            suppressHydrationWarning
          />
          <div className={styles.sliderLabels}>
            <span>₹0</span>
            <span>₹{(maxStipend || 100000).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </FilterGroup>
    </aside>
  );
}
