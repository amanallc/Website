# Design Spec: Amana Construction Full Website

**Date:** 2026-04-27  
**Status:** Approved — supersedes foundation spec  
**Scope:** Full multi-page website, UpConstruction-inspired design, Resend email, no CMS

---

## 1. Overview

Port the UpConstruction Bootstrap 5 HTML template to Next.js 15 + Tailwind CSS, with all content replaced by real Amana Construction information. The site is 100% static-renderable (no DB, no auth). The only backend surface is a single `/api/contact` route that sends email via Resend.

**Company:** Amana Construction  
**Phone:** (678) 468-8022  
**Email:** info@amanaconstruction.com  
**Location:** Roswell, GA (North Atlanta metro)  
**Service Area:** Roswell, Alpharetta, Milton, Johns Creek, Marietta, Sandy Springs, Dunwoody, Cumming  
**Tagline:** Built on Trust  
**Founded:** 25+ years of experience

---

## 2. Tech Stack

| Concern         | Choice                                      |
| --------------- | ------------------------------------------- |
| Framework       | Next.js 15 (App Router, TypeScript, `src/`) |
| Styling         | Tailwind CSS v4 (custom color tokens)       |
| Icons           | Lucide React                                |
| Carousels       | Swiper (Hero + Testimonials)                |
| Email           | Resend + React Email                        |
| Form validation | Zod (API route only)                        |
| Linting         | ESLint (Next.js config)                     |
| Formatting      | Prettier + prettier-plugin-tailwindcss      |
| Node            | 22 LTS                                      |
| Package manager | npm                                         |

---

## 3. Pages

| Route       | Page     | Key sections                                                                                                                 |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `/`         | Homepage | Hero carousel, About blurb + form, Recent projects, Services, Why Us, Features, Portfolio, Testimonials, Stats, Blog preview |
| `/about`    | About    | Page hero banner, About story, Stats, Why Choose Us, Testimonials                                                            |
| `/services` | Services | Page hero banner, 6 service cards, Features, Why Us                                                                          |
| `/projects` | Projects | Page hero banner, Filterable portfolio grid                                                                                  |
| `/contact`  | Contact  | Page hero banner, Contact form, Map placeholder, Contact info                                                                |

---

## 4. Design System

### Colors (Tailwind custom tokens)

```
charcoal: #282933    — header, footer, dark sections
black:    #050505    — deep text
gold:     #C99717    — accent, CTA buttons, highlights
white:    #FFFFFF    — light text on dark bg
linen:    #F7F7F4    — warm page background
```

### Typography

- **Font:** Geist Sans via `next/font/google`
- **Headings:** charcoal, bold, tight tracking
- **Body:** charcoal at 80% opacity
- **Accent:** gold (tagline, section labels)

### Spacing

Generous. Section padding: `py-20`. Max content width: `max-w-6xl mx-auto px-6`.

---

## 5. Images

### Real images (from amanaconstruction.us)

Located at `public/assets/img/real/`:

- `house-about.jpeg` — brick/stone house, used in About section
- `project-hero.jpeg` — main project photo
- `project-foundation.jpeg` — rebar framework
- `project-excavation.jpeg` — excavator at work
- `project-formwork.jpeg` — concrete formwork
- `project-erosion.jpeg` — erosion control site
- `project-piles.jpeg` — concrete piles
- `project-bulldozers.jpeg` — bulldozers on site
- `project-grading.jpeg` — grading work
- `project-drainage.jpeg` — drainage installation
- `project-commercial.jpeg` — commercial interior
- `project-salon.jpeg` — salon buildout
- `project-12.jpeg` through `project-15.jpeg` — additional project shots

### Stock images (from UpConstruction template)

Located at `public/assets/img/`:

- `hero-carousel/hero-carousel-1.jpg` through `hero-carousel-5.jpg` — wide hero slides
- `about.jpg`, `alt-services.jpg`, `services.jpg` — section backgrounds
- `features-1.jpg` through `features-4.jpg` — feature tab images
- `projects/` — additional portfolio images
- `footer-bg.jpg` — footer background

### Logo

`public/assets/brand/amana-logo.png` (transparent, 2000×2000px)

---

## 6. Component Architecture

### Server components (no interactivity)

- `Header` — renders nav links, includes `MobileNav` client island
- `Footer` — static content
- All section components except those with interactivity
- All page files
- `PageHero` — shared inner-page banner
- `ServiceCard`, `ProjectCard`, `BlogCard` — display-only

### Client components ('use client')

- `MobileNav` — hamburger toggle via useState
- `HeroCarousel` — Swiper carousel
- `TestimonialsCarousel` — Swiper carousel
- `Portfolio` — filter state via useState
- `ContactForm` — form state + fetch to API
- `Features` — tab state via useState
- `StatsSection` — Intersection Observer + counting animation

---

## 7. Content

### Hero Carousel

5 slides using `hero-carousel-1.jpg` through `hero-carousel-5.jpg`.  
Each slide has a dark overlay with centered content:

- Headline: "Amana Construction"
- Subline: "Built on Trust"
- CTA: "Get a Free Estimate" → `/contact`

### About Section (homepage + about page)

> With over 25 years of experience in the construction industry, Amana Construction has become a trusted name serving Roswell and the greater North Atlanta area. Our team brings the knowledge, skills, and expertise to handle any project — residential or commercial, big or small. From custom homes to commercial build-outs, we deliver quality craftsmanship and honest communication from start to finish.

### Services (6 cards)

1. **General Contracting** — Full-service project oversight from pre-construction through final walkthrough. We coordinate scheduling, subcontractors, materials, and inspections.
2. **Home Renovation & Remodeling** — Kitchen, bath, basement, and whole-home renovations across Roswell, Alpharetta, and surrounding communities.
3. **New Home Construction** — Custom homes built to your specifications. We manage every phase with precision and keep you informed throughout.
4. **Commercial Build-Outs** — Office spaces, retail locations, and tenant improvements. We work around your business schedule to minimize disruption.
5. **Home Additions** — Seamlessly expand your living space with additions that match your home's existing architecture and style.
6. **Outdoor Living Spaces** — Decks, patios, and hardscaping that extend your home into the Georgia outdoors.

### Stats (About page + homepage)

- 25+ Years Experience
- 200+ Projects Completed
- 150+ Happy Clients
- 5★ Average Rating

### Testimonials (placeholders — real ones to be added later)

3 placeholder testimonials with generic names, marked clearly in data file so client can replace.

### Footer columns

1. **About** — Logo, tagline, address (Roswell, GA), phone, email, social icons
2. **Quick Links** — Home, About, Services, Projects, Contact
3. **Our Services** — General Contracting, Remodeling, New Construction, Commercial, Additions, Outdoor Living
4. **Service Area** — Roswell · Alpharetta · Milton · Johns Creek · Marietta · Sandy Springs

---

## 8. Email (Contact Form)

**Provider:** Resend (free tier: 3,000 emails/month)  
**Template:** React Email — branded HTML with charcoal header, gold accent, plain text body  
**API route:** `POST /api/contact`  
**Validation:** Zod schema (name required, email valid format, message required)  
**From:** `Amana Construction <onboarding@resend.dev>` (dev) → `noreply@amanaconstruction.com` (prod, after domain verified)  
**To:** `CONTACT_EMAIL` env var

**Email template sections:**

1. Header bar — charcoal bg, gold "Amana Construction" text, "New Quote Request" subtitle
2. Body — fields displayed as labeled rows: Name, Email, Phone, Message
3. Footer bar — charcoal, "Amana Construction · Built on Trust · Roswell, GA"

---

## 9. Environment Variables

```bash
RESEND_API_KEY=re_...              # required for email
CONTACT_EMAIL=info@amanaconstruction.com  # where form submissions go
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 10. Data Files (content lives here, not in components)

```
src/data/
  services.ts       — 6 service objects
  projects.ts       — 12 project objects with category + image
  testimonials.ts   — 3 testimonial objects
  blog.ts           — 3 placeholder blog post objects
```

---

## 11. Out of Scope (this phase)

- Blog detail pages
- Service detail pages
- Project detail pages
- CMS / admin dashboard
- Analytics
- SEO sitemap / robots.txt
- Auth of any kind
- Real testimonials (placeholders used)
