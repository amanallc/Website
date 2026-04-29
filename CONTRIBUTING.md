# Contributing — Amana Construction Website

This document is for anyone working on this project. It covers what the project is, what access you need, where everything lives, and what to do when something breaks.

---

## What This Project Is

A production website for **Amana Construction**, a general contractor based in Roswell, GA (North Atlanta metro area). The site is a 5-page Next.js application deployed on Vercel. There is no database, no CMS, and no admin login. All content is stored in TypeScript data files inside the project.

When a visitor fills out the "Get a Free Estimate" form, the submission is emailed to the company's work inbox (`support@amanaconstruction.us`) via the Resend email API.

---

## Access You Need

You will need credentials or invitations to the following services. All accounts were originally created with the personal email `amanaconstructionhomes@gmail.com` — ask the owner for access to each one.

| Service | What it does | How to get access |
|---|---|---|
| **GitHub** | Hosts the source code repository | Ask owner to add you as a collaborator on the repo |
| **Vercel** | Hosts the live website, runs deployments | Ask owner to add you to the Vercel project |
| **GoDaddy** | Owns the domain `amanaconstruction.us` | Ask owner — account tied to personal email |
| **Resend** | Sends contact form emails | Ask owner for API key, or add you to the Resend team |

> The previous GoDaddy website template has been disconnected. The domain now points to Vercel via DNS records.

---

## Email Accounts

| Address | Purpose |
|---|---|
| `support@amanaconstruction.us` | **Work inbox** — all "Get a Free Estimate" form submissions are delivered here. This is a GoDaddy-managed email inbox tied to the domain. |
| `amanaconstructionhomes@gmail.com` | **Personal email** — used to create all the service accounts listed above. Not used for receiving form leads. |

**Never change `CONTACT_EMAIL` to the Gmail address.** Every estimate request must go to `support@amanaconstruction.us`. The fallback in the API route also defaults to this address.

---

## Environment Variables

The app needs these three variables set — in Vercel for production, and in a local `.env` or `.env.local` file for development. See `.env.example` for the template.

| Variable | Value | Where to get it |
|---|---|---|
| `RESEND_API_KEY` | `re_...` | Resend dashboard → API Keys |
| `CONTACT_EMAIL` | `support@amanaconstruction.us` | Fixed — do not change |
| `NEXT_PUBLIC_SITE_URL` | `https://amanaconstruction.us` (prod) or `http://localhost:3000` (dev) | Set manually |

> `.env` and `.env.local` are gitignored. They must be created manually on any new machine. Never commit real API keys to the repository.

---

## Project Structure

```
src/
  app/
    layout.tsx               — root layout: font, metadata, Header + Footer
    page.tsx                 — homepage (10 sections assembled here)
    globals.css              — Tailwind v4 @theme tokens (colors, font)
    about/page.tsx
    services/page.tsx
    projects/page.tsx
    contact/page.tsx
    api/contact/route.ts     — POST handler: validates form → sends email via Resend

  components/
    layout/
      Header.tsx             — sticky charcoal nav bar (server component)
      MobileNav.tsx          — hamburger toggle (client component)
      Footer.tsx             — 4-column footer (server component)

    sections/                — one file per homepage/page section
      HeroCarousel.tsx       — full-width image slider (Swiper, client)
      GetStarted.tsx         — "Get Started" split section with contact form
      RecentProjects.tsx     — 4 featured project cards
      ServicesSection.tsx    — 6 service cards grid
      AltServices.tsx        — image + bullet points side-by-side
      Features.tsx           — tabbed "How We Work" section (client)
      Portfolio.tsx          — filterable project grid (client)
      TestimonialsSection.tsx — testimonials carousel (Swiper, client)
      StatsSection.tsx       — animated counter stats (client)
      RecentBlog.tsx         — 3 blog preview cards

    ui/
      PageHero.tsx           — inner-page banner with title + breadcrumb
      ContactForm.tsx        — estimate request form with validation (client)
      ServiceCard.tsx        — single service card
      ProjectCard.tsx        — single project card with hover overlay
      BlogCard.tsx           — single blog preview card

  data/                      — all site content lives here, not in components
    services.ts              — 6 services
    projects.ts              — 12 projects (categories: construction/remodeling/commercial)
    testimonials.ts          — 3 testimonials (placeholder — replace with real ones)
    blog.ts                  — 3 blog posts (placeholder)

  emails/
    ContactEmail.tsx         — branded HTML email template sent on form submission

  lib/
    constants.ts             — SITE info (phone, email, address, nav links)
    schemas.ts               — Zod validation schema for the contact form

public/
  assets/
    brand/
      amana-logo.png         — primary logo (transparent, 2000×2000)
      amana-logo-bg.png      — logo with solid background
    img/
      hero-carousel/         — 5 wide-format hero images
      real/                  — real project photos from amanaconstruction.us
      projects/              — additional portfolio images
      blog/                  — blog section images
      features-1..4.jpg      — tab images for the "How We Work" section
      about.jpg, alt-services.jpg, services.jpg, footer-bg.jpg, page-title-bg.jpg
```

---

## How to Update Content

All content changes are made by editing the files in `src/data/` or `src/lib/constants.ts`. No CMS, no dashboard.

| What to change | File |
|---|---|
| Phone, email, address, service area | `src/lib/constants.ts` → `SITE` object |
| Navigation links | `src/lib/constants.ts` → `NAV_LINKS` |
| Services (cards, descriptions) | `src/data/services.ts` |
| Portfolio projects | `src/data/projects.ts` |
| Client testimonials | `src/data/testimonials.ts` |
| Blog posts | `src/data/blog.ts` |
| Contact form fields or validation rules | `src/lib/schemas.ts` + `src/components/ui/ContactForm.tsx` |
| Email template design | `src/emails/ContactEmail.tsx` |

---

## Local Development

```bash
# 1. Clone the repo
git clone <repo-url>
cd AmanaConstruction

# 2. Install Node 22 (use nvm)
nvm use

# 3. Install dependencies
npm install

# 4. Create env file
cp .env.example .env.local
# then fill in RESEND_API_KEY

# 5. Start dev server
npm run dev
# → http://localhost:3000
```

---

## Validation (run before every merge)

```bash
npm run typecheck      # TypeScript — must be zero errors
npm run lint           # ESLint — must be zero errors
npm run format:check   # Prettier — must pass
npm run build          # Production build — must succeed
```

---

## Deployment

Vercel deploys automatically on every push to `main`. No manual steps needed.

To deploy manually or check build logs: log in to Vercel with the GitHub account and open the `AmanaConstruction` project.

**To update environment variables on the live site:**
Vercel dashboard → Project → Settings → Environment Variables. After changing a variable, trigger a redeploy.

---

## Troubleshooting

**Estimate emails are not arriving at `support@amanaconstruction.us`**

1. Check that `CONTACT_EMAIL=support@amanaconstruction.us` is set in Vercel's environment variables.
2. Check the Resend dashboard (resend.com) → Emails — look for delivery failures or bounces.
3. Check that `RESEND_API_KEY` in Vercel is still valid — keys can be revoked.
4. If Resend's free tier (3,000 emails/month) is exhausted, emails will fail silently. Check usage in the Resend dashboard.
5. Check the `support@amanaconstruction.us` inbox in GoDaddy Webmail — it is separate from Gmail.

**The site is down or showing a Vercel error**

1. Go to Vercel dashboard → Deployments — check the latest deployment for build errors.
2. Run `npm run build` locally to reproduce the error.
3. Check that all environment variables are still set in Vercel.

**Domain not resolving / SSL issue**

1. Log in to GoDaddy with the personal email.
2. Go to DNS Management for `amanaconstruction.us`.
3. Confirm the DNS records point to Vercel (A record or CNAME — Vercel provides these).
4. In Vercel → Project → Domains, confirm the domain is verified.

**Form validation is rejecting valid input**

The validation rules live in `src/lib/schemas.ts`. Fields and their rules:
- `name` — required, must be at least two words, each at least 2 characters
- `email` — must be a valid email format
- `phone` — optional, must be formatted as `xxx xxx-xxxx`
- `zip` — required, must be exactly 5 digits
- `message` — required, minimum 10 characters

---

## Tech Stack

| Concern | Tool | Version |
|---|---|---|
| Framework | Next.js (App Router, TypeScript) | 16.x |
| Styling | Tailwind CSS v4 | 4.x |
| Icons | Lucide React | 1.x |
| Carousels | Swiper | 12.x |
| Email sending | Resend | — |
| Email template | @react-email/components | — |
| Form validation | Zod | 4.x |
| Linting | ESLint + eslint-config-next | 9.x |
| Formatting | Prettier + prettier-plugin-tailwindcss | 3.x |
| Node | 22 LTS | `.nvmrc` |

> **Note on Tailwind v4:** There is no `tailwind.config.ts`. All custom color tokens (`charcoal`, `gold`, `linen`, `black`) are defined in `src/app/globals.css` under `@theme { ... }`.

> **Note on Next.js 16:** `next lint` was removed in v16. The lint script uses `eslint .` directly.
