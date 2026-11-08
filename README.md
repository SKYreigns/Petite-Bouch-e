# Petite Bouchée Patisserie

A Toronto neighbourhood patisserie website — fresh cruffins, viennoiserie, seasonal tarts, Portuguese country bread, and bespoke celebration cakes.

**Live site:** https://skyreigns.github.io/Petite-Bouch-e/

---

## About the bakery

**Petite Bouchée Patisserie**
28 Sousa Mendes St, Toronto, ON M6P 0B2, Canada  
Phone: +1 416-588-8882  
Instagram: @petite__bouchee_patisserie  
Established: 2021

**Opening hours** (as listed on the public profile — please call ahead to confirm holiday hours):
- Monday: 12:00 pm – 7:00 pm
- Tuesday – Sunday: 10:00 am – 7:00 pm

---

## Tech stack

- **Vite 7** — build tool and dev server
- **React 18** — UI framework
- **TypeScript** — type safety
- **Tailwind 3** — styling (STITCH-aligned design tokens)
- **React Router 7** — multi-page routing
- **lucide-react** — icons
- **Fontsource variable fonts** — Playfair Display (display/headings) + DM Sans (body)
- **Vitest + Testing Library** — unit and component tests

---

## Project structure

```
src/
  app.tsx                 # Router + routes
  main.tsx                # Entry point + font imports
  index.css               # Design system tokens & component styles
  data/
    site.ts               # Business info, hours, categories, products
  lib/
    asset.ts              # Base-path-aware public asset helper
    hours.ts              # isToday() helper
    usePageMeta.ts        # Page title + social meta sync
    cakeInquiry.ts        # Wizard types, options, validation, summary helpers
  components/
    layout/
      AppShell.tsx        # Skip link, header, main, footer
      Header.tsx          # Desktop nav + mobile dialog drawer
      Footer.tsx          # Explore / Visit / Follow columns
      ScrollToTop.tsx
    ui/
      Dialog.tsx          # Native <dialog> wrapper (focus trapping)
      PageHero.tsx
      SectionHeading.tsx
      ProductCard.tsx
      CategoryCard.tsx
      HoursCard.tsx
      InstagramIcon.tsx
      Logo.tsx
    home/
      Hero.tsx
      CategoryGrid.tsx
      SignatureBakes.tsx
      CakeCta.tsx
      CafeSection.tsx
      StoryTeaser.tsx
      VisitSection.tsx
  pages/
    Home.tsx
    Menu.tsx
    CustomCakes.tsx       # 4-step cake enquiry wizard (demo-only)
    OurStory.tsx
    Contact.tsx
    Privacy.tsx
    NotFound.tsx
  adapters/
    DemoInquiryAdapter.ts # Local-only demo adapter (no network)
    InquiryProviderAdapter.ts
  types/
    inquiry.ts
    config.ts
  config/
    appConfig.ts
public/
  images/
    products/clean/       # 30 cropped authentic Instagram product tiles (476x476)
    editorial/            # High-res STITCH hero/editorial images (1408x768)
    cakes/                # Pressed florals cake image
  favicon.svg
  404.html                # SPA deep-link restore
  robots.txt
  sitemap.xml
.github/
  workflows/
    deploy.yml            # GitHub Pages deployment
```

---

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm ci
```

### Development server

```bash
npm run dev
```

The site runs at `http://localhost:3000`. For production path verification, use:

```bash
VITE_BASE_PATH=/Petite-Bouch-e/ npm run dev
```

### Build

```bash
npm run build
```

Output goes to `dist/`. The build uses `VITE_BASE_PATH=/Petite-Bouch-e/` for GitHub Pages.

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Typecheck

```bash
npm run typecheck
```

### Tests

```bash
npm test
```

### Audit

```bash
npm audit --omit=dev
```

---

## Responsive breakpoints

The site is designed and tested at: 320, 360, 390, 768, 1024, 1280, 1440, 1920 px.

All interactive elements meet the 44px minimum touch target.

---

## Accessibility

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<address>`, `<figure>`, `<details>`)
- Skip-to-content link
- Keyboard-navigable header and mobile dialog drawer
- Focus-visible outlines on all interactive elements
- Native `<dialog>` for modals (focus trapping, Escape to close, backdrop click)
- Alt text on all images
- `prefers-reduced-motion` respected (animations disabled)
- ARIA labels, `aria-labelledby`, `aria-pressed`, `aria-current`, `aria-invalid`, `aria-describedby`
- Form fields with associated labels and error messages
- Scroll padding for anchored sections

---

## Cake enquiry (demonstration)

The custom cake enquiry form is a **demonstration**. It does not send data to any provider, does not create a booking, and does not take payment.

- Four steps: Occasion & size → Flavour & style → Date & details → Review
- Per-step validation with inline error messages
- Draft saved in `sessionStorage` (current tab only)
- Review step shows a summary before submission
- On submit: a modal dialog clearly states **"Your enquiry was not sent"** and provides call/Instagram fallbacks
- No network call is made; `DemoInquiryAdapter` returns a demo reference only
- Future integration point: `src/config/appConfig.ts` `getInquiryAdapter()`

---

## Deployment

The site deploys to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`.

- Build command: `VITE_BASE_PATH=/Petite-Bouch-e/ npm run build`
- Deploy target: `gh-pages` branch → GitHub Pages
- Live URL: https://skyreigns.github.io/Petite-Bouch-e/

Deep links are preserved via `public/404.html` (stores `pb:redirect` in sessionStorage) and the restore script in `index.html`.

---

## Content sources

- **Business info:** Verified from the bakery's public Instagram profile and supplied screenshots — 28 Sousa Mendes St, Toronto, ON M6P 0B2; +1 416-588-8882; @petite__bouchee_patisserie; est. 2021; hours Mon 12–7, Tue–Sun 10–7.
- **Product catalogue:** 30 authentic products cropped from the verified Instagram product grid into `public/images/products/clean/` (476×476, text overlays removed where possible).
- **Editorial imagery:** High-res STITCH export assets (1408×768) in `public/images/editorial/`; cake hero image in `public/images/cakes/pressed-florals.jpg`.
- **Design system:** STITCH export `DESIGN.md` tokens, typography, spacing, and interactions (desktop/mobile `code.html` references).

---

## What is intentionally not included

- No invented prices
- No allergen or dietary certification claims
- No fabricated reviews or founder history
- No newsletter form (Instagram link replaces it)
- No map iframe (styled location card + Google Maps link instead)
- No STITCH-fabricated contact details (Yorkville, 416-555-0198, `@petiteboucheeto`, 128 Cumberland St)
- No real enquiry provider (demo-only, clearly labelled)

---

## License

All rights reserved. Petite Bouchée Patisserie, Toronto.
