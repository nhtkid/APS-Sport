function formatDateRange(entry) {
  const start = new Date(entry.date)
  const formatter = new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
  })

  if (!entry.endDate) {
    return formatter.format(start)
  }

  return `${formatter.format(start)} - ${formatter.format(new Date(entry.endDate))}`
}

function MasterTimeline({ entries, monthLabel }) {
  return (
    <section className="timeline-panel">
      <div className="timeline-header">
        <h3>{monthLabel} master dates</h3>
        <p>Chronological entries transcribed from the APS master calendar PDF.</p>
      </div>

      <div className="timeline-list">
        {entries.map((entry) => (
          <article className="timeline-row" key={`${entry.date}-${entry.title}`}>
            <div className="timeline-date">{formatDateRange(entry)}</div>
            <div className="timeline-body">
              <strong>{entry.title}</strong>
              {entry.notes ? <p>{entry.notes}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MasterTimeline