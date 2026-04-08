const timeFormatter = new Intl.DateTimeFormat('en-AU', {
  hour: 'numeric',
  minute: '2-digit',
})

const updatedFormatter = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: '2-digit',
})

function formatTimeRange(event) {
  const start = new Date(`${event.date}T${event.startTime}`)
  const end = new Date(`${event.date}T${event.endTime}`)

  return `${timeFormatter.format(start)} - ${timeFormatter.format(end)}`
}

function EventCard({ event, schools, sports }) {
  const homeSchool = schools.find((school) => school.id === event.homeSchoolId)
  const awaySchool = schools.find((school) => school.id === event.awaySchoolId)
  const sport = sports.find((entry) => entry.id === event.sportId)

  return (
    <article className={`event-card is-${event.status}`}>
      <div className="event-card-topline">
        <div>
          <p className="event-meta">{sport?.label}</p>
          <h4>
            {homeSchool?.code} v {awaySchool?.code}
          </h4>
        </div>
        <span className={`event-status is-${event.status}`}>{event.status}</span>
      </div>

      <div className="event-card-body">
        <p className="event-matchup">
          {homeSchool?.shortName} vs {awaySchool?.shortName}
        </p>
        <p className="event-summary">
          {event.level} · {event.round}
        </p>
        <p className="event-summary">{formatTimeRange(event)}</p>
        <p className="event-summary">{event.venue}</p>
        <p className="event-note">{event.note}</p>
      </div>

      <div className="event-card-footer">
        <span>Updated {updatedFormatter.format(new Date(event.updatedAt))}</span>
        <span>{homeSchool?.code} / {awaySchool?.code}</span>
      </div>
    </article>
  )
}

export default EventCard