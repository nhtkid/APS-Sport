function FilterBar({
  filters,
  schools,
  seasons,
  sports,
  statusOptions,
  onFilterChange,
  onReset,
  onShare,
  shareFeedback,
  shareUrl,
  hasActiveFilters,
}) {
  return (
    <section className="filter-bar-shell" aria-label="Shared calendar filters">
      <div className="filter-grid">
        <label className="filter-field">
          <span>School</span>
          <select value={filters.school} onChange={(event) => onFilterChange('school', event.target.value)}>
            <option value="all">All schools</option>
            {schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.shortName}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Sport</span>
          <select value={filters.sport} onChange={(event) => onFilterChange('sport', event.target.value)}>
            <option value="all">All sports</option>
            {sports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.label}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Season</span>
          <select value={filters.season} onChange={(event) => onFilterChange('season', event.target.value)}>
            <option value="all">All seasons</option>
            {seasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.label}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Status</span>
          <select value={filters.status} onChange={(event) => onFilterChange('status', event.target.value)}>
            <option value="all">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="share-row">
        <div className="share-copy">
          <p className="section-kicker">Public share link</p>
          <div className="share-url-box">{shareUrl}</div>
          <p className="share-hint">
            Send this URL to a school coordinator, parent group, or staff member to reopen the
            same filtered calendar view.
          </p>
        </div>

        <div className="share-actions">
          <button className="button-primary button-inline" onClick={onShare} type="button">
            Copy share link
          </button>
          <button
            className="button-secondary button-inline"
            disabled={!hasActiveFilters}
            onClick={onReset}
            type="button"
          >
            Reset filters
          </button>
          <p className="share-feedback" role="status">
            {shareFeedback || 'Ready to share'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default FilterBar