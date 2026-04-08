function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  }).format(new Date(dateString))
}

function MonthEntryList({ entries, monthLabel, onEventClick }) {
  if (entries.length === 0) {
    return (
      <section className="entry-list-panel">
        <h3>{monthLabel} detail</h3>
        <p>No highlighted entries were found for this month in the selected source calendar.</p>
      </section>
    )
  }

  return (
    <section className="entry-list-panel">
      <h3>{monthLabel} detail</h3>
      <div className="entry-list">
        {entries.map((entry) => (
          <article
            className={`entry-row${entry.detail ? ' is-clickable' : ''}`}
            key={`${entry.date}-${entry.title}`}
            onClick={() => entry.detail && onEventClick?.(entry)}
            role={entry.detail ? 'button' : undefined}
            tabIndex={entry.detail ? 0 : undefined}
            onKeyDown={(e) => e.key === 'Enter' && entry.detail && onEventClick?.(entry)}
            aria-label={entry.detail ? `${entry.title} — click for details` : undefined}
          >
            <div className="entry-date">{formatDate(entry.date)}</div>
            <div className="entry-body">
              <div className="entry-title-row">
                <span className={`entry-cat-dot is-${entry.category}`} aria-hidden="true" />
                <strong>{entry.title}</strong>
                {entry.detail && <span className="entry-detail-badge">Details</span>}
              </div>
              {entry.notes ? <p>{entry.notes}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MonthEntryList