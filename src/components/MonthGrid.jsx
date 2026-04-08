const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function MonthGrid({ entries, month, onEventClick }) {
  const year = 2026
  const today = new Date()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month
  const todayDay = today.getDate()
  const totalDays = new Date(year, month, 0).getDate()
  const firstWeekday = new Date(year, month - 1, 1).getDay()
  const entryMap = new Map()

  entries.forEach((entry) => {
    const day = new Date(entry.date).getDate()
    const existing = entryMap.get(day) ?? []
    existing.push(entry)
    entryMap.set(day, existing)
  })

  const cells = []

  for (let index = 0; index < firstWeekday; index += 1) {
    cells.push(<div className="day-cell is-empty" key={`empty-${index}`} aria-hidden="true" />)
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const dayEntries = entryMap.get(day) ?? []
    const weekday = (firstWeekday + day - 1) % 7
    const isWeekend = weekday === 0 || weekday === 6
    const isToday = isCurrentMonth && day === todayDay
    cells.push(
      <article className={`day-cell${isWeekend ? ' is-weekend' : ''}${isToday ? ' is-today' : ''}${dayEntries.length > 0 ? ' has-entries' : ''}`} key={day}>
        <div className="day-number">{day}</div>
        <div className="day-items">
          {dayEntries.map((entry) => (
            <button
              className={`day-pill is-${entry.category}${entry.detail ? ' has-detail' : ''}`}
              key={`${entry.date}-${entry.title}`}
              onClick={() => onEventClick?.(entry)}
              type="button"
              aria-label={`${entry.title} — click for details`}
            >
              {entry.title}
            </button>
          ))}
        </div>
      </article>,
    )
  }

  return (
    <section className="month-grid">
      {WEEKDAYS.map((d) => (
        <div className="month-grid-day-header" key={d}>{d}</div>
      ))}
      {cells}
    </section>
  )
}

export default MonthGrid