# APS Sport Calendar

Stakeholder demo for an APS-style homepage replica that routes into a new calendar application built from the real 2026 APS calendar PDFs.

## What This Version Does

- Presents an APS-style homepage at `/` with only the Calendar journey wired up.
- Uses localized copies of the current APS homepage logo, hero photos, button-strip graphics, and school badges from `public/assets/aps-home/`.
- Routes the Calendar navigation to a production-style calendar page at `/calendar`.
- Recreates the current APS Calendar of Events as live, month-based data.
- Recreates the APS Meetings Calendar as live, month-based data.
- Recreates the APS Master Calendar as a chronological monthly timeline.
- Uses a restrained navy, white, and cyan theme intended to sit closer to the current APS website.

## Source Documents

This prototype is based on three uploaded APS calendar files:

- APS Sport Calendar of Events 2026
- APS Sport Meetings Calendar 2026
- APS Sport Calendar 2026 Master

Text extracts and rendered page images used during transcription are kept in `docs/pdf-extracts/` and `docs/pdf-renders/`.

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Notes

This is still a frontend-only demo. It does not yet include admin tooling, live data ingestion, search, or shareable filtered links. The current goal is to let APS stakeholders move through a familiar homepage experience and then see the proposed calendar as if it were already part of the site.