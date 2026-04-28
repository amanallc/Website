# Design Spec: Amana Construction Website — Foundation

**Date:** 2026-04-27
**Status:** Approved
**Scope:** Initial project scaffold, tooling, and homepage only. No backend, no auth, no database.

---

## 1. Overview

Build the clean foundation for the Amana Construction public website. This phase covers project initialization, configuration, and a single homepage that establishes the brand. Future phases will add services, about, contact, and project gallery pages.

**Company:** Amana Construction
**Tagline:** Built on Trust
**Business type:** General contractor — residential and commercial, U.S. market
**Tone:** Trustworthy, clean, modern, professional

---

## 2. Tech Stack

| Concern         | Choice                                 | Reason                                                        |
| --------------- | -------------------------------------- | ------------------------------------------------------------- |
| Framework       | Next.js 15 (App Router)                | Latest stable, best DX for React + SSR/SSG                    |
| Language        | TypeScript                             | Type safety, required by team standards                       |
| Styling         | Tailwind CSS                           | Utility-first, fast iteration, great for custom design tokens |
| Linting         | ESLint (Next.js config)                | Standard for Next.js projects                                 |
| Formatting      | Prettier + prettier-plugin-tailwindcss | Consistent style, class ordering                              |
| Package manager | npm                                    | Specified by user                                             |
| Node version    | 22 LTS                                 | Current LTS as of 2026                                        |

No database, no auth, no backend in this phase.

---

## 3. Project Structure

```
/
├── public/
│   └── assets/
│       └── brand/
│           ├── amana-logo.png         ← transparent background (primary)
│           └── amana-logo-bg.png      ← solid background (alternate)
├── src/
│   ├── app/
│   │   ├── layout.tsx                ← root layout, metadata, font
│   │   ├── page.tsx                  ← homepage
│   │   └── globals.css               ← Tailwind directives + base styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx            ← logo + nav links
│   │   │   └── Footer.tsx            ← company name, tagline, year
│   │   └── sections/
│   │       └── Hero.tsx              ← full hero section
│   ├── lib/
│   │   └── constants.ts              ← brand constants, nav links
│   └── styles/                       ← reserved for future style utilities
├── docs/
│   └── superpowers/
│       └── specs/                    ← design documents
├── .env.example
├── .gitignore
├── .nvmrc                            ← "22"
├── .prettierrc
├── .prettierignore
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Logo Assets

Two source files exist in the project root:

| Source file      | Destination                             | Purpose                                    |
| ---------------- | --------------------------------------- | ------------------------------------------ |
| `logo-no-bg.png` | `public/assets/brand/amana-logo.png`    | Primary — used in Header, Hero             |
| `logo-w-bg.png`  | `public/assets/brand/amana-logo-bg.png` | Alternate — available for dark/printed use |

All references use the path `/assets/brand/amana-logo.png`.

---

## 5. Design System

### Color Palette

```ts
// tailwind.config.ts — custom color tokens
charcoal: '#282933'; // primary text, header/footer bg
black: '#050505'; // deep black for strong contrast
gold: '#C99717'; // brand accent — tagline, buttons, highlights
white: '#FFFFFF'; // text on dark backgrounds
linen: '#F7F7F4'; // page background (warm off-white)
```

### Typography

- **Font:** Geist Sans via `next/font/google`
- **Heading:** charcoal, bold, tight tracking
- **Body:** charcoal at 90% opacity for readability
- **Accent text (tagline):** gold

### Spacing

Generous whitespace throughout. Hero section is vertically centered with large top/bottom padding. Sections are separated clearly.

---

## 6. Component Designs

### Header

- Background: charcoal (`#282933`)
- Left: logo image (~40px tall) + "Amana Construction" text in white
- Right: nav links — Home, Services, About, Contact
- Nav link hover: gold underline/color
- Mobile: hamburger menu (visual only — no JS logic in this phase; links are visible on desktop)
- Sticky at top

### Hero Section

- Background: linen (`#F7F7F4`)
- Centered layout, large vertical padding
- Logo mark: ~120px wide
- H1: "Amana Construction" — charcoal, bold, large
- H2/subheading: "Built on Trust" — gold, medium weight
- Paragraph: one short description, charcoal, max-width ~600px, centered
- Two CTAs:
  - Primary: "Request a Quote" — gold bg, charcoal text, rounded
  - Secondary: "View Services" — charcoal border, charcoal text, rounded
- No stock images. No fake testimonials. No fake data.

### Footer

- Background: charcoal
- Text: white
- Content: "Amana Construction · Built on Trust · © {year}"
- Centered, minimal

---

## 7. Constants (`src/lib/constants.ts`)

```ts
export const SITE = {
  name: 'Amana Construction',
  tagline: 'Built on Trust',
  description: 'Reliable general contracting for homeowners, investors, and businesses.',
  phone: '(000) 000-0000',
  email: 'info@amanaconstruction.com',
  serviceArea: 'Your City, State',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
```

---

## 8. Root Layout (`src/app/layout.tsx`)

- `<html lang="en">`
- Geist Sans applied as CSS variable via `next/font/google`
- Metadata:
  - `title`: `'Amana Construction | Built on Trust'`
  - `description`: `'Reliable general contracting for homeowners, investors, and businesses. Clear communication, honest pricing, and quality work from start to finish.'`
- Renders `<Header />`, `{children}`, `<Footer />`

---

## 9. Package Metadata (`package.json`)

```json
{
  "name": "amana-construction",
  "description": "Website for Amana Construction, a trusted general contractor built on integrity, reliability, and quality craftsmanship.",
  "private": true,
  "author": "Amana Construction",
  "license": "UNLICENSED",
  "keywords": [
    "amana construction",
    "construction",
    "general contractor",
    "contractor",
    "remodeling",
    "renovation",
    "residential construction",
    "commercial construction"
  ]
}
```

### Scripts

| Script         | Command              |
| -------------- | -------------------- |
| `dev`          | `next dev`           |
| `build`        | `next build`         |
| `start`        | `next start`         |
| `lint`         | `next lint`          |
| `lint:fix`     | `next lint --fix`    |
| `format`       | `prettier --write .` |
| `format:check` | `prettier --check .` |
| `typecheck`    | `tsc --noEmit`       |

---

## 10. Prettier Config (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## 11. Validation Gate

After scaffold, all four must pass with zero errors before the phase is considered complete:

```
npm run typecheck
npm run lint
npm run format:check
npm run build
```

---

## 12. Out of Scope (This Phase)

- Services page
- About page
- Contact form (backend or frontend)
- Project gallery
- Blog
- CMS integration
- Analytics
- SEO sitemap/robots.txt
- Hamburger menu JS logic
- Animations or transitions

---

## 13. Future Phases (Reference Only)

1. **Phase 2:** Services page, About page stubs
2. **Phase 3:** Contact form (frontend only, then backend)
3. **Phase 4:** Project gallery
4. **Phase 5:** SEO, sitemap, analytics, performance optimization
5. **Phase 6:** Domain + Vercel deployment

---

## 14. Deployment Note

- Deploy via **Vercel** (zero-config for Next.js)
- GoDaddy domain connected via Vercel DNS: add Vercel nameservers in GoDaddy DNS settings, or use A/CNAME records pointing to Vercel's IPs
