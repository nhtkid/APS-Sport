import EventCard from './EventCard'

const dateFormatter = new Intl.DateTimeFormat('en-AU', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

function buildDateTime(event) {
  return new Date(`${event.date}T${event.startTime}`)
}

function CalendarView({ events, schools, sports }) {
  const groupedEvents = []
  const sortedEvents = [...events].sort((left, right) => buildDateTime(left) - buildDateTime(right))

  for (const event of sortedEvents) {
    const lastGroup = groupedEvents[groupedEvents.length - 1]

    if (!lastGroup || lastGroup.date !== event.date) {
      groupedEvents.push({
        date: event.date,
        label: dateFormatter.format(new Date(`${event.date}T00:00:00`)),
        events: [event],
      })
      continue
    }

    lastGroup.events.push(event)
  }

  if (!events.length) {
    return (
      <section className="calendar-empty-state">
        <p className="section-kicker">No events match this view</p>
        <h3>Try widening the filters.</h3>
        <p>
          The shareable calendar is designed to narrow quickly for a school or sport, but it should
          still feel complete when the whole APS feed is visible.
        </p>
      </section>
    )
  }

  return (
    <section className="calendar-view" aria-label="APS shared calendar view">
      {groupedEvents.map((group) => (
        <div className="calendar-day-group" key={group.date}>
          <div className="calendar-day-header">
            <div>
              <p className="section-kicker">Match day</p>
              <h3>{group.label}</h3>
            </div>
            <span className="day-count">{group.events.length} events</span>
          </div>

          <div className="calendar-event-grid">
            {group.events.map((event) => (
              <EventCard event={event} key={event.id} schools={schools} sports={sports} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default CalendarView