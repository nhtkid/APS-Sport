import { useEffect } from 'react'

const longDate = new Intl.DateTimeFormat('en-AU', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function IconVenue() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2a6 6 0 0 1 6 6c0 4-6 10-6 10S4 12 4 8a6 6 0 0 1 6-6Z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6v4l2.5 2.5" />
    </svg>
  )
}

function IconContact() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="7" r="3" />
      <path d="M3.5 17c0-3 3-5.5 6.5-5.5s6.5 2.5 6.5 5.5" />
    </svg>
  )
}

function IconSchool() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2 2 6.5l8 4.5 8-4.5L10 2Z" />
      <path d="M2 6.5v6M18 6.5v6" />
      <path d="M5 8v5.5c0 1.7 2.2 3 5 3s5-1.3 5-3V8" />
    </svg>
  )
}

function IconNote() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="2.5" width="13" height="15" rx="2" />
      <path d="M7 7h6M7 10.5h6M7 14h4" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 5l10 10M15 5 5 15" />
    </svg>
  )
}

function IconInfo() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11a.75.75 0 0 0-1.5 0v.5a.75.75 0 0 0 1.5 0V7Zm-1.5 3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-1.5 0v-3Z" />
    </svg>
  )
}

const categoryLabels = {
  primary: 'Primary Sport',
  combinedSwimming: 'APS Combined Swimming',
  summer: 'Summer Sport',
  winter: 'Winter Team Sport',
  athleticsWaterPolo: 'Athletics & Water Polo',
  rep: 'Representative',
  closing: 'Closing Date',
  publicHoliday: 'Public Holiday',
  heads: 'Heads of Schools',
  delegates: 'APS Delegates',
  girlsSport: "Girls' Sport",
  juniorSecondary: 'Junior Secondary',
  forum: 'Delegates Forum',
  review: 'Review Meeting',
}

function EventDetailModal({ event, onClose }) {
  const detail = event?.detail

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!event) return null

  const dateLabel = longDate.format(new Date(`${event.date}T12:00:00`))
  const catLabel = categoryLabels[event.category] ?? event.category

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Event detail">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Mock-data notice */}
        <div className="modal-mock-banner">
          <IconInfo />
          <span>
            <strong>Demo data</strong> — this panel can be used to display full event details once a live data source is connected.
          </span>
        </div>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-text">
            <span className={`modal-category-pill is-${event.category}`}>{catLabel}</span>
            <h2 className="modal-title">{detail?.title ?? event.title}</h2>
            <p className="modal-date">{dateLabel}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} type="button" aria-label="Close">
            <IconClose />
          </button>
        </div>

        {/* Body */}
        {detail ? (
          <div className="modal-body">
            {detail.description && (
              <p className="modal-description">{detail.description}</p>
            )}

            <div className="modal-info-grid">
              {detail.venue && (
                <div className="modal-info-row">
                  <span className="modal-info-icon"><IconVenue /></span>
                  <div>
                    <span className="modal-info-label">Venue</span>
                    <span className="modal-info-value">{detail.venue}</span>
                  </div>
                </div>
              )}

              {detail.time && (
                <div className="modal-info-row">
                  <span className="modal-info-icon"><IconClock /></span>
                  <div>
                    <span className="modal-info-label">Time</span>
                    <span className="modal-info-value">{detail.time}</span>
                  </div>
                </div>
              )}

              {detail.contact && (
                <div className="modal-info-row">
                  <span className="modal-info-icon"><IconContact /></span>
                  <div>
                    <span className="modal-info-label">Contact</span>
                    <span className="modal-info-value">{detail.contact}</span>
                  </div>
                </div>
              )}

              {detail.schools?.length > 0 && (
                <div className="modal-info-row">
                  <span className="modal-info-icon"><IconSchool /></span>
                  <div>
                    <span className="modal-info-label">Participating Schools</span>
                    <div className="modal-schools-row">
                      {detail.schools.map((s) => (
                        <span className="modal-school-chip" key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {detail.notes && (
                <div className="modal-info-row">
                  <span className="modal-info-icon"><IconNote /></span>
                  <div>
                    <span className="modal-info-label">Notes</span>
                    <span className="modal-info-value">{detail.notes}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="modal-body modal-no-detail">
            <p>No additional details are available for this entry in the source calendar documents.</p>
            <p className="modal-no-detail-hint">Detailed information such as venue, time, and contact can be added when a richer data source is connected.</p>
          </div>
        )}

        <div className="modal-footer">
          <button className="modal-close-action" onClick={onClose} type="button">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventDetailModal
