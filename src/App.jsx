import { useEffect, useMemo, useState } from 'react'
import EventDetailModal from './components/EventDetailModal'
import Legend from './components/Legend'
import MasterTimeline from './components/MasterTimeline'
import MonthEntryList from './components/MonthEntryList'
import MonthGrid from './components/MonthGrid'
import {
  eventCalendarEntries,
  eventLegend,
  masterCalendarEntries,
  meetingsCalendarEntries,
  meetingsLegend,
  monthOptions,
  sourceDocuments,
} from './data/apsCalendarData'
import { schools } from './data/fixtures'

const defaultMonth = 4
const viewTitles = {
  events: 'Calendar of Events',
  meetings: 'Meetings Calendar',
  master: 'Master Calendar',
}

const assetBase = `${import.meta.env.BASE_URL}assets/aps-home`

const socialLinks = [
  { label: 'Facebook', icon: 'facebook', color: 'facebook', href: 'https://www.facebook.com/pages/APS-Sport/218410264837996' },
  { label: 'X', icon: 'x', color: 'x', href: 'https://twitter.com/aps_sport' },
  { label: 'Instagram', icon: 'instagram', color: 'instagram', href: 'https://instagram.com/aps_sport' },
  { label: 'YouTube', icon: 'youtube', color: 'youtube', href: 'https://www.youtube.com/channel/UCJr4NUwxqDmRLhrF8LKx7ag' },
  { label: 'Email', icon: 'email', color: 'email', href: 'mailto:aps@apssport.org.au' },
  { label: 'Team App', icon: 'teamapp', color: 'teamapp', href: 'https://apssport.teamapp.com/' },
]

const mainNavigation = [
  { label: 'Home', path: '/', icon: 'home' },
  { label: 'About', hasDropdown: true },
  { label: 'Calendar', path: '/calendar' },
  { label: 'Policies' },
  { label: 'Sports' },
  { label: 'Fixtures/Results', hasDropdown: true },
  { label: 'Ladders', hasDropdown: true },
  { label: 'Venues', hasDropdown: true },
  { label: 'Representative', hasDropdown: true },
  { label: 'Gallery' },
]

function HeaderIcon({ name, className = '' }) {
  if (name === 'home') {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <path d="M10 2.4 2.2 9h2v8.4h4.8v-5.1h2v5.1h4.8V9h2L10 2.4Z" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'caret') {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 12 12">
        <path d="M2 4.2 6 8l4-3.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    )
  }

  if (name === 'search') {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <circle cx="8.5" cy="8.5" r="5.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="m12.6 12.6 4.2 4.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
      </svg>
    )
  }

  if (name === 'facebook') {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <path d="M11.2 17.4v-6h2l.3-2.4h-2.3V7.5c0-.7.2-1.2 1.2-1.2h1.3V4.1c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3V9H6.8v2.4h2.1v6h2.3Z" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'x') {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <path d="M4 4h2.8l3.2 4.4L13.6 4H16l-4.8 5.5L16 16h-2.8l-3.5-4.8L6 16H3.6l5-5.8L4 4Z" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'instagram') {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <rect x="3.2" y="3.2" width="13.6" height="13.6" rx="3.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="10" cy="10" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="14.5" cy="5.7" r="1.1" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'youtube') {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <path d="M16.9 6.7a2.2 2.2 0 0 0-1.6-1.6C13.8 4.7 10 4.7 10 4.7s-3.8 0-5.3.4a2.2 2.2 0 0 0-1.6 1.6A22 22 0 0 0 2.7 10c0 1.1.1 2.2.4 3.3a2.2 2.2 0 0 0 1.6 1.6c1.5.4 5.3.4 5.3.4s3.8 0 5.3-.4a2.2 2.2 0 0 0 1.6-1.6c.3-1.1.4-2.2.4-3.3 0-1.1-.1-2.2-.4-3.3ZM8.5 12.7V7.3l4.6 2.7-4.6 2.7Z" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'email') {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <path d="M3 5.4h14v9.2H3V5.4Zm1.3 1.2 5.7 4.6 5.7-4.6" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'teamapp') {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <path d="M5 4.5h10v3H11.5V16h-3V7.5H5v-3Z" fill="currentColor" />
      </svg>
    )
  }

  return null
}

const heroSlides = [
  { label: 'Brighton Grammar School', image: `${assetBase}/BGS-Indigenous-2022.jpg` },
  { label: 'Carey Grammar School', image: `${assetBase}/IMG_5316-scaled.jpg` },
  { label: 'Caulfield Grammar School', image: `${assetBase}/EBAxKDxVUAAT_to.jpg` },
  { label: 'The Geelong College', image: `${assetBase}/GC-Rconciliation-Round-27.05.23.jpg` },
  { label: 'Geelong Grammar School', image: `${assetBase}/GGS-G-Football-27.5.23.jpeg` },
  { label: 'Haileybury', image: `${assetBase}/TEAM_HBY_Girls-scaled.jpg` },
  { label: 'Melbourne Grammar School', image: `${assetBase}/IMG_10532.jpg` },
  { label: "St Kevin's College", image: `${assetBase}/SKC-Indigenous-Tops-A-1-scaled.jpg` },
  { label: 'Scotch College', image: `${assetBase}/SC-1sts-Hockey-27.5.23-Original-large-A-scaled.jpg` },
  { label: 'Wesley College', image: `${assetBase}/CR6_4903-scaled.jpg` },
  { label: 'Xavier College', image: `${assetBase}/GSIF4473.jpg` },
  { label: 'APS Social Media', image: `${assetBase}/Social-Media-Promo-2023.png` },
]

const homeShortcutButtons = [
  { label: 'Calendar', image: `${assetBase}/btn-Calendar.jpg`, path: '/calendar' },
  { label: 'Fixtures/Results', image: `${assetBase}/btn-Fixtures.jpg` },
  { label: 'Sports', image: `${assetBase}/btn-Regulations.jpg` },
  { label: 'Results', image: `${assetBase}/btn-Results.jpg` },
]

const schoolBadges = [
  { label: 'Brighton Grammar', image: `${assetBase}/BGS3.png` },
  { label: 'Carey Grammar', image: `${assetBase}/Carey2017_90a.png` },
  { label: 'Caulfield Grammar', image: `${assetBase}/CaulfieldGS2.png` },
  { label: 'Geelong College', image: `${assetBase}/Geelong2.png` },
  { label: 'Geelong Grammar School', image: `${assetBase}/Geelong_Grammar2.png` },
  { label: 'Haileybury', image: `${assetBase}/Haileybury2.png` },
  { label: 'Melbourne Grammar School', image: `${assetBase}/MelbourneGrammarSchool2.png` },
  { label: 'St. Kevin’s College', image: `${assetBase}/st-kevins-college-instagram.jpg` },
  { label: 'Scotch College', image: `${assetBase}/ScotchCollege2.png` },
  { label: 'Wesley College', image: `${assetBase}/Wesley_College_Melbourne.png` },
  { label: 'Xavier College', image: `${assetBase}/XavierCollege2.png` },
]

const newsCards = [
  {
    title: 'Twitter',
    body: "Congrats to Wesley College's Ruby Smith, Capt of the State 15&U Girls Volleyball team that won Gold in the ACT last week.",
    meta: 'Latest',
  },
  {
    title: 'Instagram',
    body: 'Celebrate the achievements and success of APS students, staff, alumni and programs across the sporting year.',
    meta: 'Social',
  },
  {
    title: 'Upcoming Events',
    body: 'There are no upcoming events.',
    meta: 'Schedule',
  },
]

function getCurrentPath() {
  return window.location.pathname === '/calendar' ? '/calendar' : '/'
}

function App() {
  const [path, setPath] = useState(() => getCurrentPath())

  useEffect(() => {
    const handlePopState = () => setPath(getCurrentPath())

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleNavigate = (nextPath) => {
    if (!nextPath || nextPath === path) {
      return
    }

    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (path === '/calendar') {
    return <CalendarPage onNavigate={handleNavigate} />
  }

  return <HomePage onNavigate={handleNavigate} />
}

function SiteChrome({ activePath, onNavigate }) {
  return (
    <>
      <div className="utility-bar">
        <div className="site-width utility-inner">
          <div className="masthead-contact">M: 0417 512 174</div>
          <div className="social-row">
            {socialLinks.map((link) => (
              <a className={`social-chip is-${link.color}`} key={link.label} aria-label={link.label} href={link.href} target={link.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
                <HeaderIcon className="social-icon" name={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <header className="site-header-shell">
        <div className="site-width brand-row">
          <button className="logo-button" onClick={() => onNavigate('/')} type="button">
            <img className="site-logo-image" src={`${assetBase}/logo1.jpg`} alt="APS Sport" />
          </button>

          <div className="header-main-column">
            <div className="header-actions-row">
              <div className="search-shell">
                <input aria-label="Search" className="search-input" placeholder="Search" type="text" />
                <button aria-label="Search site" className="search-button" type="button">
                  <HeaderIcon className="search-icon" name="search" />
                </button>
              </div>
            </div>

            <nav className="primary-nav" aria-label="Primary">
              <div className="nav-inner">
                {mainNavigation.map((item) => {
                  const isActive = item.path && item.path === activePath
                  const className = `nav-link${isActive ? ' is-active' : ''}${!item.path ? ' is-muted' : ''}`

                  if (!item.path) {
                    return (
                      <span className={className} key={item.label}>
                        {item.icon ? <HeaderIcon className="nav-home-icon" name={item.icon} /> : item.label}
                        {item.hasDropdown ? <HeaderIcon className="nav-caret" name="caret" /> : null}
                      </span>
                    )
                  }

                  return (
                    <button
                      className={className}
                      key={item.label}
                      onClick={() => onNavigate(item.path)}
                      type="button"
                    >
                      {item.icon ? <HeaderIcon className="nav-home-icon" name={item.icon} /> : item.label}
                      {item.hasDropdown ? <HeaderIcon className="nav-caret" name="caret" /> : null}
                    </button>
                  )
                })}
              </div>
            </nav>
          </div>

          <button className="menu-button" type="button" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  )
}

function HomePage({ onNavigate }) {
  const [slides, setSlides] = useState({ current: 0, prev: null })
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)
  const [isHoverPaused, setIsHoverPaused] = useState(false)
  const [timerKey, setTimerKey] = useState(0)

  const isPaused = isManuallyPaused || isHoverPaused

  useEffect(() => {
    if (isPaused) return

    const timer = window.setInterval(() => {
      setSlides((s) => ({ current: (s.current + 1) % heroSlides.length, prev: s.current }))
    }, 4500)

    return () => {
      window.clearInterval(timer)
    }
  }, [isPaused, timerKey])

  const currentSlide = heroSlides[slides.current]
  const prevSlideData = slides.prev !== null ? heroSlides[slides.prev] : null

  const handleSlideChange = (direction) => {
    setTimerKey((k) => k + 1)
    setSlides((s) => {
      const next =
        direction === 'prev'
          ? s.current === 0 ? heroSlides.length - 1 : s.current - 1
          : (s.current + 1) % heroSlides.length
      return { current: next, prev: s.current }
    })
  }

  return (
    <div className="aps-shell">
      <SiteChrome activePath="/" onNavigate={onNavigate} />

      <main className="home-main">
        <section className="hero-panel-home">
          <div className="site-width home-slider-shell">
            <div
              className="hero-slider-card"
              onMouseEnter={() => setIsHoverPaused(true)}
              onMouseLeave={() => setIsHoverPaused(false)}
            >
              {prevSlideData && (
                <img className="hero-slide-image is-prev" src={prevSlideData.image} alt={prevSlideData.label} />
              )}
              <img key={slides.current} className="hero-slide-image is-current" src={currentSlide.image} alt={currentSlide.label} />
              <div className="hero-slide-note">{currentSlide.label}</div>
              <button className="hero-arrow is-left" onClick={() => handleSlideChange('prev')} type="button" aria-label="Previous slide">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="hero-arrow is-right" onClick={() => handleSlideChange('next')} type="button" aria-label="Next slide">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
              <button
                className={`hero-pause-button${isPaused ? ' is-paused' : ''}`}
                onClick={() => setIsManuallyPaused((p) => !p)}
                type="button"
                aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
              >
                {isPaused ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <polygon points="8,5 20,12 8,19" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <rect x="5" y="4" width="4" height="16" />
                    <rect x="15" y="4" width="4" height="16" />
                  </svg>
                )}
              </button>
            </div>

            <div className="hero-pager">
              {heroSlides.map((slide, index) => (
                <button
                  aria-label={slide.label}
                  className={`hero-dot${index === slides.current ? ' is-active' : ''}`}
                  key={slide.label}
                  onClick={() => { setSlides((s) => ({ current: index, prev: s.current })); setTimerKey((k) => k + 1) }}
                  type="button"
                />
              ))}
            </div>

            <div className="shortcut-strip">
              {homeShortcutButtons.map((button) => {
                const buttonImage = <img src={button.image} alt={button.label} />

                if (button.path) {
                  return (
                    <button className="shortcut-button" key={button.label} onClick={() => onNavigate(button.path)} type="button">
                      {buttonImage}
                    </button>
                  )
                }

                return (
                  <div className="shortcut-button is-static" key={button.label}>
                    {buttonImage}
                  </div>
                )
              })}
            </div>

            <div className="school-badges-section">
              <p className="school-section-label">Member Schools</p>
              <div className="school-badges-row">
                {schoolBadges.map((badge) => (
                  <div className="school-badge" key={badge.label}>
                    <img src={badge.image} alt={badge.label} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="site-width home-content-grid-section">
          <p className="home-content-kicker">News &amp; Info</p>
          <div className="home-content-grid">
          <article className="content-card-home social-card">
            <h3>{newsCards[0].title}</h3>
            <p>{newsCards[0].body}</p>
          </article>

          <article className="content-card-home instagram-card-home">
            <h3>{newsCards[1].title}</h3>
            <img src={`${assetBase}/Social-Media-Promo-2023.png`} alt="APS Social Media" />
            <p>{newsCards[1].body}</p>
          </article>

          <article className="content-card-home events-card-home">
            <h3>{newsCards[2].title}</h3>
            <p>{newsCards[2].body}</p>
            <button className="inline-calendar-link" onClick={() => onNavigate('/calendar')} type="button">
              Calendar
            </button>
          </article>

          <article className="content-card-home links-card-home">
            <div className="card-detail-block is-static-block">
              <h4>Adverse Weather Numbers</h4>
              <p>Schools Adverse/Wet Weather Contacts</p>
            </div>

            <div className="card-detail-block contact-block-home is-static-block">
              <p className="panel-overline">Contact Us</p>
              <h4>APS Sport</h4>
              <p>Email: aps@apssport.org.au</p>
              <p>Mobile: 0417 512 174</p>
            </div>
          </article>
          </div>
        </section>
      </main>

      <footer className="site-footer-home">
        <div className="site-width footer-inner-home">
          <div className="footer-contact-col">
            <p className="footer-overline">Get in touch</p>
            <h3>APS Sport</h3>
            <p>Email: aps@apssport.org.au</p>
            <p>Mobile: 0417 512 174</p>
          </div>
          <div className="footer-right-col">
            <div className="footer-social-row">
              {socialLinks.map((link) => (
                <a className={`social-chip is-${link.color} footer-social-chip`} key={link.label} aria-label={link.label} href={link.href} target={link.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
                  <HeaderIcon className="social-icon" name={link.icon} />
                </a>
              ))}
            </div>
            <p className="footer-note-home">© 2026 APS Sport. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CalendarPage({ onNavigate }) {
  const [activeView, setActiveView] = useState('events')
  const [activeMonth, setActiveMonth] = useState(defaultMonth)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [mySchool, setMySchool] = useState('all')

  const activeLegend = activeView === 'meetings' ? meetingsLegend : eventLegend

  const activeEntries = useMemo(() => {
    let entries
    if (activeView === 'events') {
      entries = eventCalendarEntries.filter((entry) => new Date(entry.date).getMonth() + 1 === activeMonth)
    } else if (activeView === 'meetings') {
      entries = meetingsCalendarEntries.filter((entry) => new Date(entry.date).getMonth() + 1 === activeMonth)
    } else {
      entries = masterCalendarEntries.filter((entry) => new Date(entry.date).getMonth() + 1 === activeMonth)
    }

    if (mySchool !== 'all') {
      entries = entries.filter((entry) => !entry.schools || entry.schools.length === 0 || entry.schools.includes(mySchool))
    }

    return entries
  }, [activeMonth, activeView, mySchool])

  const activeMonthLabel = monthOptions.find((month) => month.id === activeMonth)?.label
  const summaryCount = activeEntries.length

  return (
    <div className="aps-shell aps-shell-calendar">
      <SiteChrome activePath="/calendar" onNavigate={onNavigate} />

      <main className="calendar-main-shell">
        <section className="site-width calendar-app-shell">
          <div className="calendar-toolbar">
            <div>
              <h3>{viewTitles[activeView]}</h3>
              <p>{activeMonthLabel} 2026</p>
            </div>

            <div className="calendar-toolbar-stats">
              <div className="stat-chip">
                <strong>{activeMonthLabel}</strong>
                <span>Month</span>
              </div>
              <div className="stat-chip">
                <strong>{summaryCount}</strong>
                <span>Entries</span>
              </div>
            </div>
          </div>

          <div className="calendar-controls">
            <div className="tab-row" role="tablist" aria-label="Calendar views">
              {sourceDocuments.map((document) => (
                <button
                  aria-selected={activeView === document.id}
                  className={`tab-button${activeView === document.id ? ' is-active' : ''}`}
                  key={document.id}
                  onClick={() => setActiveView(document.id)}
                  role="tab"
                  type="button"
                >
                  {document.shortLabel}
                </button>
              ))}
            </div>

            <div className="picker-group">
              <label className="month-picker">
                <span>Month</span>
                <select value={activeMonth} onChange={(event) => setActiveMonth(Number(event.target.value))}>
                  {monthOptions.map((month) => (
                    <option key={month.id} value={month.id}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="month-picker">
                <span>My School</span>
                <select value={mySchool} onChange={(event) => setMySchool(event.target.value)}>
                  <option value="all">All schools</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.shortName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {activeView === 'master' ? (
            <MasterTimeline entries={activeEntries} monthLabel={activeMonthLabel} />
          ) : (
            <>
              <MonthGrid entries={activeEntries} month={activeMonth} onEventClick={setSelectedEvent} />
              <Legend items={activeLegend} />
              <MonthEntryList entries={activeEntries} monthLabel={activeMonthLabel} onEventClick={setSelectedEvent} />
            </>
          )}
        </section>
      </main>

      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  )
}

export default App