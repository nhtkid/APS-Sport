# APS Sport Stage 0 Discovery

## Organisation mission

APS Sport is the sporting body for the Associated Public Schools of Victoria.

From the public Vision, Mission & Aims page:

- Vision: to be recognised nationally as a leading school sport association.
- Mission: to provide a comprehensive and high quality sporting competition for students of APS member schools and foster individual and team development.
- Aims: promote health and fitness, teamwork and fair play, deliver diverse competitions suited to age and ability, provide safe competition environments, foster leadership and ethical behaviour, and respect tradition while adapting to student needs.

## Current website purpose

The current site functions as a central public information hub for APS Sport rather than as an operational system of record.

Its main jobs appear to be:

- present APS Sport as the governing body for interschool competitions
- publish organisational information such as history, records, premierships, policies, and member schools
- publish sport-specific information and regulations
- publish fixtures, ladders, and representative sport information
- publish venue information and adverse weather contacts
- distribute downloadable season calendars and meeting calendars
- promote community activity through social content, alumni stories, and announcements

## Public information architecture

The main sections surfaced on the current site are:

- About
- Member Schools
- Calendar
- Policies
- Sports
- Fixtures/Results
- Results or Ladders
- Venues
- Representative
- Gallery
- Contact Us

This indicates the website has to support multiple audiences:

- APS administrators
- school sport coordinators
- coaches and teachers
- students and parents
- alumni and the broader public

## Current operational reality

The site exposes competition information, but much of it appears to be published in a static or semi-static way.

Observed patterns:

- The Calendar page primarily distributes Word and PDF calendars.
- Winter Team Sport fixtures are published as PDF files for 2026.
- Results and ladders pages mix filterable views with archived season pages.
- Member schools, sports, venues, and representative pages are structured as CMS content indexes.
- The homepage contains social embeds, promotional content, and static navigation tiles rather than a task-first experience.

This aligns with your assessment: APS currently acts as the central association, but not as the live operational calendar used by schools, families, coaches, and students week to week.

## Legacy implementation signals

The public markup strongly suggests the current site is a WordPress site built with a commercial theme and a collection of plugins.

Observed signals:

- WordPress asset paths under `wp-content`
- theme `spacious-pro`
- plugins including `the-events-calendar`, `event-tickets`, `content-views-query-and-display-post-page`, `pt-content-views-pro`, `nextend-smart-slider3-pro`, `rotatingtweets`, and several gallery and shortcode plugins

This matters because it suggests:

- content is likely managed page-by-page in a CMS
- information architecture has grown over time rather than being product-led
- fixtures and calendars may be uploaded files rather than normalized structured data
- rebuilding can be decoupled from the current presentation layer, but migration may require extracting data from a mix of pages, files, and plugin-specific content

## Best current understanding of website purpose

If we reduce the site to its core purpose, it appears to exist to help APS coordinate, publish, and preserve school sport competition information across its member schools.

In practical terms, the current site is trying to do four jobs:

1. Act as the official public source of APS sport information.
2. Publish competition schedules, results, ladders, venues, and rules.
3. Support coordination across member schools and representative programs.
4. Promote the APS sport community, identity, achievements, and heritage.

## Why the calendar pain point is the right Stage 0 wedge

The strongest visible gap is that APS publishes calendar files, but not a live shared event layer.

That creates obvious friction:

- each school maintains its own downstream system
- changes and cancellations are fragmented across schools
- parents and students must check local systems rather than one authoritative source
- there is no central event status model for postponements, wet weather, venue changes, or reschedules

This makes the calendar problem a credible first proposal because it is:

- easy to explain
- visibly broken today
- valuable across all schools
- small enough to prototype without replacing the whole website

## Stage 1 MVP assumptions

If APS later funded an MVP, the minimal product should probably focus on the public competition-information workflow rather than broad CMS replacement.

Best-guess MVP functions:

1. Central calendar of all APS events and fixtures.
2. Filters for school, sport, season, competition type, year level, and team level.
3. Event detail pages with venue, start time, participating schools, status, and notes.
4. Status handling for scheduled, changed, cancelled, postponed, and completed.
5. Mobile-first experience for parents and students.
6. Shareable links for a fixture or event.
7. Basic admin workflow for APS staff to update events centrally.
8. Optional school-facing subscription or feed output so schools can sync updates into their own systems.

## Migration considerations

Data migration is a realistic future requirement.

Likely migration sources:

- Word and PDF calendar documents
- fixture PDFs by season and competition
- results or ladder pages and season archives
- venue pages
- member school records
- sport pages and regulations

Likely migration challenges:

- unstructured or semi-structured documents
- duplicated information across APS and school systems
- inconsistent naming conventions across sports, teams, and venues
- historical data embedded in CMS pages instead of a clean schema
- potential need to preserve public archive content separately from live operational data

## Stage 0 implication

For the proposal phase, the strongest demonstration is not a full site redesign. It is a modern, mobile-first central calendar experience that proves APS could become the authoritative weekly source of truth for school sport events.