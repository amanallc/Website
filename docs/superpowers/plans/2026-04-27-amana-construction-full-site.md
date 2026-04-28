# Amana Construction — Full Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full 5-page Next.js 15 website for Amana Construction (Roswell, GA) matching the UpConstruction design, with Resend-powered contact form email, all content localized, and real project photos integrated.

**Architecture:** Next.js App Router, TypeScript, `src/` directory. All content (services, projects, testimonials) lives in `src/data/` files — not hardcoded in components. Client interactivity is isolated to leaf components (`'use client'`). A single `/api/contact` route handles form submission and sends a branded HTML email via Resend.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Swiper, Lucide React, Resend, React Email, Zod, Prettier, ESLint

---

## File Map

```
src/
  app/
    layout.tsx                    — root layout, font, metadata, Header+Footer
    page.tsx                      — homepage
    globals.css                   — Tailwind v4 directives + @theme tokens
    about/page.tsx
    services/page.tsx
    projects/page.tsx
    contact/page.tsx
    api/contact/route.ts          — POST handler → Resend
  components/
    layout/
      Header.tsx                  — server, includes MobileNav island
      MobileNav.tsx               — 'use client', hamburger toggle
      Footer.tsx                  — server
    sections/
      HeroCarousel.tsx            — 'use client', Swiper
      GetStarted.tsx              — server wrapper
      RecentProjects.tsx          — server
      ServicesSection.tsx         — server
      AltServices.tsx             — server
      Features.tsx                — 'use client', tab state
      Portfolio.tsx               — 'use client', filter state
      TestimonialsSection.tsx     — 'use client', Swiper
      StatsSection.tsx            — 'use client', counter animation
      RecentBlog.tsx              — server
    ui/
      PageHero.tsx                — server, inner-page banner
      ContactForm.tsx             — 'use client', form state + fetch
      ServiceCard.tsx             — server
      ProjectCard.tsx             — server
      BlogCard.tsx                — server
  data/
    services.ts
    projects.ts
    testimonials.ts
    blog.ts
  emails/
    ContactEmail.tsx              — React Email template
  lib/
    constants.ts
    schemas.ts                    — Zod schemas
  styles/
    .gitkeep
```

---

## Task 1: Initialize Next.js project

**Files:** All scaffold files

- [ ] **Step 1: Run create-next-app**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

Expected: scaffold created, no errors.

- [ ] **Step 2: Install all project dependencies**

```bash
npm install swiper lucide-react resend zod @react-email/components
npm install -D prettier prettier-plugin-tailwindcss
```

- [ ] **Step 3: Verify Tailwind version**

```bash
npm list tailwindcss | head -3
```

Expected: `tailwindcss@4.x.x`. If v3 installed, note it — Task 4 has v3 fallback.

- [ ] **Step 4: Init git and commit scaffold**

```bash
git init
git add .
git commit -m "chore: initialize Next.js 15 project with all dependencies"
```

---

## Task 2: Configure tooling and package.json

**Files:** `package.json`, `.prettierrc`, `.prettierignore`, `.gitignore`, `.nvmrc`, `.env.example`

- [ ] **Step 1: Update package.json**

Edit `package.json`. Set top-level fields:
```json
{
  "name": "amana-construction",
  "version": "0.1.0",
  "private": true,
  "description": "Website for Amana Construction, a trusted general contractor serving Roswell, GA and the North Atlanta area.",
  "author": "Amana Construction",
  "license": "UNLICENSED",
  "keywords": ["amana construction","construction","general contractor","roswell ga","atlanta","renovation","remodeling","new construction"]
}
```

Replace `"scripts"`:
```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "lint:fix": "next lint --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "typecheck": "tsc --noEmit"
}
```

- [ ] **Step 2: Create .prettierrc**

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

- [ ] **Step 3: Create .prettierignore**

```
.next
node_modules
public
*.lock
dist
```

- [ ] **Step 4: Append to .gitignore**

Add at bottom of `.gitignore`:
```
.env
.env.local
.env.*.local
.vscode/
.idea/
.DS_Store
```

- [ ] **Step 5: Create .nvmrc**

```
22
```

- [ ] **Step 6: Create .env.example**

```bash
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=info@amanaconstruction.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "chore: configure tooling, prettier, env template"
```

---

## Task 3: Move assets

**Files:** `public/assets/brand/`, `public/assets/img/`

Images are already downloaded to the project directory. This task just moves/copies them to final paths.

- [ ] **Step 1: Create brand directory and copy logos**

```bash
mkdir -p public/assets/brand
cp logo-no-bg.png public/assets/brand/amana-logo.png
cp logo-w-bg.png public/assets/brand/amana-logo-bg.png
```

- [ ] **Step 2: Verify all image directories exist**

```bash
ls public/assets/img/real/ | wc -l    # expect 16
ls public/assets/img/hero-carousel/ | wc -l  # expect 5
ls public/assets/img/projects/ | wc -l       # expect 12
ls public/assets/brand/                      # expect 2 files
```

- [ ] **Step 3: Commit**

```bash
git add public/
git commit -m "chore: add all brand and project image assets"
```

---

## Task 4: Tailwind config and globals.css

**Files:** `src/app/globals.css`, optionally `tailwind.config.ts` (v3 only)

- [ ] **Step 1: Replace globals.css**

**Tailwind v4 path** — replace `src/app/globals.css` entirely:

```css
@import "tailwindcss";

@theme {
  --color-charcoal: #282933;
  --color-black: #050505;
  --color-gold: #c99717;
  --color-linen: #f7f7f4;
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-linen);
  color: var(--color-charcoal);
}

/* Swiper custom arrows */
.swiper-button-next,
.swiper-button-prev {
  color: var(--color-gold) !important;
}

.swiper-pagination-bullet-active {
  background: var(--color-gold) !important;
}
```

**Tailwind v3 path** — if v3 was installed, use this `globals.css` instead:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html { scroll-behavior: smooth; }
body { @apply bg-linen text-charcoal; }

.swiper-button-next, .swiper-button-prev { color: theme('colors.gold') !important; }
.swiper-pagination-bullet-active { background: theme('colors.gold') !important; }
```

And create `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#282933',
        black: '#050505',
        gold: '#C99717',
        linen: '#F7F7F4',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css tailwind.config.ts 2>/dev/null; git commit -m "feat: configure tailwind custom color tokens"
```

---

## Task 5: Constants and data files

**Files:** `src/lib/constants.ts`, `src/lib/schemas.ts`, `src/data/services.ts`, `src/data/projects.ts`, `src/data/testimonials.ts`, `src/data/blog.ts`, `src/styles/.gitkeep`

- [ ] **Step 1: Create src/lib/constants.ts**

```ts
export const SITE = {
  name: 'Amana Construction',
  tagline: 'Built on Trust',
  description:
    'With over 25 years of experience, Amana Construction is a trusted general contractor serving Roswell and the greater North Atlanta area.',
  phone: '(678) 468-8022',
  phoneHref: 'tel:+16784688022',
  email: 'info@amanaconstruction.com',
  address: 'Roswell, GA',
  serviceArea: 'Roswell · Alpharetta · Milton · Johns Creek · Marietta · Sandy Springs',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SOCIAL_LINKS = {
  facebook: '#',
  instagram: '#',
  linkedin: '#',
} as const;
```

- [ ] **Step 2: Create src/lib/schemas.ts**

```ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

- [ ] **Step 3: Create src/data/services.ts**

```ts
export interface Service {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export const SERVICES: Service[] = [
  {
    icon: 'Building2',
    title: 'General Contracting',
    description:
      'Full-service project oversight from pre-construction through final walkthrough. We coordinate scheduling, subcontractors, materials, and inspections so you don\'t have to.',
    href: '/services#general-contracting',
  },
  {
    icon: 'Hammer',
    title: 'Home Renovation & Remodeling',
    description:
      'Kitchen, bath, basement, and whole-home renovations across Roswell, Alpharetta, and surrounding North Atlanta communities. Quality materials, skilled tradespeople.',
    href: '/services#renovation',
  },
  {
    icon: 'Home',
    title: 'New Home Construction',
    description:
      'Custom homes built to your specifications. We manage every phase with precision, transparent pricing, and clear communication from groundbreaking to move-in.',
    href: '/services#new-construction',
  },
  {
    icon: 'Briefcase',
    title: 'Commercial Build-Outs',
    description:
      'Office spaces, retail locations, restaurants, and tenant improvements. We work around your business schedule to minimize disruption and meet your deadline.',
    href: '/services#commercial',
  },
  {
    icon: 'ArrowUpRight',
    title: 'Home Additions',
    description:
      'Seamlessly expand your living space with additions that match your home\'s existing architecture and style. From sunrooms to second stories.',
    href: '/services#additions',
  },
  {
    icon: 'Trees',
    title: 'Outdoor Living Spaces',
    description:
      'Decks, patios, pergolas, and hardscaping that bring Georgia\'s beautiful outdoors into your home life. Designed to last through every season.',
    href: '/services#outdoor',
  },
];
```

- [ ] **Step 4: Create src/data/projects.ts**

```ts
export type ProjectCategory = 'all' | 'construction' | 'remodeling' | 'commercial';

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  image: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Foundation & Structural Work',
    category: 'construction',
    image: '/assets/img/real/project-foundation.jpeg',
    description: 'Rebar framework and concrete foundation for a custom home in Roswell, GA.',
  },
  {
    id: '2',
    title: 'Site Excavation',
    category: 'construction',
    image: '/assets/img/real/project-excavation.jpeg',
    description: 'Full site preparation and excavation for a new residential build.',
  },
  {
    id: '3',
    title: 'Concrete Formwork',
    category: 'construction',
    image: '/assets/img/real/project-formwork.jpeg',
    description: 'Trench and rebar formwork for a concrete foundation system.',
  },
  {
    id: '4',
    title: 'Land Grading',
    category: 'construction',
    image: '/assets/img/real/project-grading.jpeg',
    description: 'Precision grading and site leveling for a residential development.',
  },
  {
    id: '5',
    title: 'Erosion Control & Site Prep',
    category: 'construction',
    image: '/assets/img/real/project-erosion.jpeg',
    description: 'Erosion control measures and environmental compliance during active construction.',
  },
  {
    id: '6',
    title: 'Drainage System Installation',
    category: 'construction',
    image: '/assets/img/real/project-drainage.jpeg',
    description: 'Corrugated drainage pipe installation and gravel bedding.',
  },
  {
    id: '7',
    title: 'Luxury Residential Build',
    category: 'construction',
    image: '/assets/img/real/house-about.jpeg',
    description: 'Multi-garage luxury home completed in the North Atlanta suburbs.',
  },
  {
    id: '8',
    title: 'Commercial Salon Build-Out',
    category: 'commercial',
    image: '/assets/img/real/project-salon.jpeg',
    description: 'Full interior build-out for a modern hair salon with custom privacy dividers.',
  },
  {
    id: '9',
    title: 'Commercial Interior Project',
    category: 'commercial',
    image: '/assets/img/real/project-commercial.jpeg',
    description: 'Commercial interior installation and finish work.',
  },
  {
    id: '10',
    title: 'Site Work & Earth Moving',
    category: 'construction',
    image: '/assets/img/real/project-bulldozers.jpeg',
    description: 'Large-scale site work with heavy equipment for a new development.',
  },
  {
    id: '11',
    title: 'Concrete Pile Installation',
    category: 'construction',
    image: '/assets/img/real/project-piles.jpeg',
    description: 'Concrete pile layout and preparation ahead of foundation pour.',
  },
  {
    id: '12',
    title: 'Structural Remodel',
    category: 'remodeling',
    image: '/assets/img/real/project-14.jpeg',
    description: 'Structural renovation and interior remodel for a residential property.',
  },
];
```

- [ ] **Step 5: Create src/data/testimonials.ts**

```ts
export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

// Replace these with real client testimonials when available
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'James M.',
    role: 'Homeowner — Roswell, GA',
    quote:
      'Amana Construction handled our whole-home renovation flawlessly. On budget, on time, and the crew was respectful of our home every single day. Highly recommend.',
  },
  {
    name: 'Sarah K.',
    role: 'Property Investor — Alpharetta, GA',
    quote:
      'We\'ve worked with Amana on three investment properties now. Their attention to detail and honest pricing keeps bringing us back. True professionals.',
  },
  {
    name: 'David R.',
    role: 'Business Owner — Sandy Springs, GA',
    quote:
      'They built out our office space on a tight timeline and didn\'t cut a single corner. Clear communication throughout. The result exceeded our expectations.',
  },
];
```

- [ ] **Step 6: Create src/data/blog.ts**

```ts
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  href: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Questions to Ask Before Hiring a General Contractor',
    excerpt:
      'Choosing the right contractor can make or break your project. Here are the five most important questions to ask before signing any contract.',
    date: 'March 15, 2026',
    author: 'Amana Construction',
    image: '/assets/img/blog/blog-1.jpg',
    href: '#',
  },
  {
    id: '2',
    title: 'What to Expect During a Home Addition Project',
    excerpt:
      'Adding square footage to your home is a major investment. This guide walks you through the process from permits to final inspection.',
    date: 'February 28, 2026',
    author: 'Amana Construction',
    image: '/assets/img/blog/blog-2.jpg',
    href: '#',
  },
  {
    id: '3',
    title: 'Kitchen Remodel Trends for North Atlanta Homes in 2026',
    excerpt:
      'From quartz countertops to open layouts, here\'s what Roswell and Alpharetta homeowners are choosing for their kitchen renovations this year.',
    date: 'February 10, 2026',
    author: 'Amana Construction',
    image: '/assets/img/blog/blog-3.jpg',
    href: '#',
  },
];
```

- [ ] **Step 7: Create src/styles/.gitkeep**

```bash
mkdir -p src/styles && touch src/styles/.gitkeep
```

- [ ] **Step 8: Commit**

```bash
git add src/
git commit -m "feat: add constants, zod schemas, and all data files"
```

---

## Task 6: Email template

**Files:** `src/emails/ContactEmail.tsx`

- [ ] **Step 1: Create src/emails/ContactEmail.tsx**

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export function ContactEmail({ name, email, phone, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New quote request from {name} — Amana Construction</Preview>
      <Body style={{ backgroundColor: '#F7F7F4', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <Container
          style={{
            maxWidth: '600px',
            margin: '40px auto',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <Section style={{ backgroundColor: '#282933', padding: '32px 40px' }}>
            <Heading
              style={{
                color: '#C99717',
                fontSize: '24px',
                fontWeight: 'bold',
                margin: '0 0 4px',
              }}
            >
              Amana Construction
            </Heading>
            <Text style={{ color: '#ffffff', margin: 0, fontSize: '14px', opacity: 0.8 }}>
              New Quote Request — Built on Trust
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: '32px 40px' }}>
            <Text style={{ color: '#282933', fontSize: '16px', marginBottom: '24px' }}>
              You have received a new quote request from your website.
            </Text>

            <Hr style={{ borderColor: '#e5e5e5', margin: '0 0 24px' }} />

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '8px 0', color: '#666', width: '100px', fontWeight: 'bold', fontSize: '14px' }}>
                    Name
                  </td>
                  <td style={{ padding: '8px 0', color: '#282933', fontSize: '14px' }}>{name}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', color: '#666', fontWeight: 'bold', fontSize: '14px' }}>Email</td>
                  <td style={{ padding: '8px 0', color: '#282933', fontSize: '14px' }}>{email}</td>
                </tr>
                {phone && (
                  <tr>
                    <td style={{ padding: '8px 0', color: '#666', fontWeight: 'bold', fontSize: '14px' }}>Phone</td>
                    <td style={{ padding: '8px 0', color: '#282933', fontSize: '14px' }}>{phone}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <Hr style={{ borderColor: '#e5e5e5', margin: '24px 0' }} />

            <Text style={{ color: '#666', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>
              Message
            </Text>
            <Text
              style={{
                color: '#282933',
                fontSize: '15px',
                lineHeight: '1.6',
                backgroundColor: '#F7F7F4',
                padding: '16px',
                borderRadius: '6px',
                borderLeft: '3px solid #C99717',
              }}
            >
              {message}
            </Text>
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: '#282933',
              padding: '20px 40px',
              textAlign: 'center',
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: '12px', margin: 0, opacity: 0.6 }}>
              Amana Construction &middot; Built on Trust &middot; Roswell, GA &middot; (678) 468-8022
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/emails/
git commit -m "feat: add branded React Email template for contact form"
```

---

## Task 7: Contact API route

**Files:** `src/app/api/contact/route.ts`

- [ ] **Step 1: Create src/app/api/contact/route.ts**

```ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/schemas';
import { ContactEmail } from '@/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, phone, message } = result.data;

  const { error } = await resend.emails.send({
    from: 'Amana Construction <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL ?? 'info@amanaconstruction.com',
    replyTo: email,
    subject: `New Quote Request from ${name}`,
    react: ContactEmail({ name, email, phone, message }),
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/
git commit -m "feat: add /api/contact route with Resend + Zod validation"
```

---

## Task 8: Header + MobileNav + Footer

**Files:** `src/components/layout/Header.tsx`, `src/components/layout/MobileNav.tsx`, `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create src/components/layout/MobileNav.tsx**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="text-white"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full bg-charcoal shadow-lg">
          <ul className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium text-white/80 hover:text-gold border-b border-white/10 last:border-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create src/components/layout/Header.tsx**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { NAV_LINKS, SITE } from '@/lib/constants';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-charcoal shadow-md">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/brand/amana-logo.png"
            alt="Amana Construction"
            width={2000}
            height={2000}
            className="h-10 w-auto"
            priority
          />
          <span className="text-lg font-semibold text-white">{SITE.name}</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="rounded bg-gold px-4 py-2 text-sm font-semibold text-charcoal transition-opacity hover:opacity-90"
            >
              Free Estimate
            </Link>
          </li>
        </ul>

        <MobileNav />
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Create src/components/layout/Footer.tsx**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { SITE, NAV_LINKS } from '@/lib/constants';

const SERVICES_LINKS = [
  'General Contracting',
  'Home Renovation',
  'New Construction',
  'Commercial Build-Outs',
  'Home Additions',
  'Outdoor Living',
];

const SERVICE_AREA = [
  'Roswell',
  'Alpharetta',
  'Milton',
  'Johns Creek',
  'Marietta',
  'Sandy Springs',
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-3">
              <Image
                src="/assets/brand/amana-logo.png"
                alt="Amana Construction"
                width={2000}
                height={2000}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-white/70">
              {SITE.description}
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-gold shrink-0" />
                {SITE.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-gold shrink-0" />
                <a href={SITE.phoneHref} className="hover:text-gold transition-colors">
                  {SITE.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-gold shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">
                  {SITE.email}
                </a>
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Facebook" className="text-white/60 hover:text-gold transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="text-white/60 hover:text-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white/60 hover:text-gold transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Our Services</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {SERVICES_LINKS.map((s) => (
                <li key={s}>
                  <Link href="/services" className="hover:text-gold transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Service Area */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Service Area</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {SERVICE_AREA.map((city) => (
                <li key={city}>{city}, GA</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-center text-xs text-white/50 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All Rights Reserved.</p>
          <p>{SITE.tagline} &middot; Roswell, GA</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add Header, MobileNav, and Footer components"
```

---

## Task 9: Root layout and shared UI

**Files:** `src/app/layout.tsx`, `src/components/ui/PageHero.tsx`, `src/components/ui/ServiceCard.tsx`, `src/components/ui/ProjectCard.tsx`, `src/components/ui/BlogCard.tsx`

- [ ] **Step 1: Replace src/app/layout.tsx**

```tsx
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Amana Construction | Built on Trust — Roswell, GA',
  description:
    'Amana Construction is a trusted general contractor serving Roswell, Alpharetta, Milton, and the greater North Atlanta area. 25+ years of experience in residential and commercial construction.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create src/components/ui/PageHero.tsx**

```tsx
import Image from 'next/image';
import Link from 'next/link';

interface PageHeroProps {
  title: string;
  breadcrumb: string;
}

export default function PageHero({ title, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative flex h-48 items-center bg-charcoal md:h-64">
      <Image
        src="/assets/img/page-title-bg.jpg"
        alt=""
        fill
        className="object-cover opacity-20"
        priority
      />
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <h1 className="text-3xl font-bold text-white md:text-4xl">{title}</h1>
        <nav className="mt-2 text-sm text-white/60" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gold">{breadcrumb}</span>
        </nav>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create src/components/ui/ServiceCard.tsx**

```tsx
import Link from 'next/link';
import {
  Building2, Hammer, Home, Briefcase, ArrowUpRight, Trees,
  LucideIcon,
} from 'lucide-react';
import type { Service } from '@/data/services';

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Hammer,
  Home,
  Briefcase,
  ArrowUpRight,
  Trees,
};

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = ICON_MAP[service.icon] ?? Building2;
  return (
    <div className="group rounded-lg border border-white/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-gold/10 text-gold">
        <Icon size={24} />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-charcoal">{service.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-charcoal/70">{service.description}</p>
      <Link
        href={service.href}
        className="text-sm font-medium text-gold transition-colors hover:text-charcoal"
      >
        Learn more →
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: Create src/components/ui/ProjectCard.tsx**

```tsx
import Image from 'next/image';
import type { Project } from '@/data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="relative h-60">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-base font-semibold text-white">{project.title}</h3>
        <p className="mt-1 text-xs text-white/80">{project.description}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create src/components/ui/BlogCard.tsx**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import type { BlogPost } from '@/data/blog';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="relative h-52">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <div className="mb-3 flex gap-4 text-xs text-charcoal/50">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} /> {post.author}
          </span>
        </div>
        <h3 className="mb-2 font-semibold leading-snug text-charcoal">{post.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-charcoal/70">{post.excerpt}</p>
        <Link href={post.href} className="text-sm font-medium text-gold hover:text-charcoal transition-colors">
          Read more →
        </Link>
      </div>
    </article>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/components/ui/
git commit -m "feat: update root layout and add shared UI card components"
```

---

## Task 10: Hero Carousel

**Files:** `src/components/sections/HeroCarousel.tsx`

- [ ] **Step 1: Create src/components/sections/HeroCarousel.tsx**

```tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';

const SLIDES = [
  { src: '/assets/img/hero-carousel/hero-carousel-1.jpg', alt: 'Construction site' },
  { src: '/assets/img/hero-carousel/hero-carousel-2.jpg', alt: 'Building project' },
  { src: '/assets/img/hero-carousel/hero-carousel-3.jpg', alt: 'Construction work' },
  { src: '/assets/img/real/project-hero.jpeg', alt: 'Amana Construction project' },
  { src: '/assets/img/real/house-about.jpeg', alt: 'Completed residential build' },
];

export default function HeroCarousel() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="h-[560px] md:h-[680px]"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <h1 className="mb-3 text-4xl font-bold text-white drop-shadow md:text-6xl">
                  Amana Construction
                </h1>
                <p className="mb-8 text-xl font-medium text-gold md:text-2xl">
                  Built on Trust
                </p>
                <p className="mb-8 max-w-xl text-base text-white/80 md:text-lg">
                  Serving Roswell, Alpharetta, and the greater North Atlanta area with quality
                  craftsmanship and honest communication.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="rounded bg-gold px-8 py-3 font-semibold text-charcoal transition-opacity hover:opacity-90"
                  >
                    Get a Free Estimate
                  </Link>
                  <Link
                    href="/projects"
                    className="rounded border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-charcoal"
                  >
                    View Our Work
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/HeroCarousel.tsx
git commit -m "feat: add HeroCarousel with Swiper and real project images"
```

---

## Task 11: ContactForm component

**Files:** `src/components/ui/ContactForm.tsx`

- [ ] **Step 1: Create src/components/ui/ContactForm.tsx**

```tsx
'use client';

import { useState } from 'react';
import type { ContactFormData } from '@/lib/schemas';

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({ name: '', email: '', phone: '', message: '' });
  const [state, setState] = useState<FormState>({ status: 'idle', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ status: 'loading', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong');
      }

      setState({ status: 'success', message: "Thank you! We'll be in touch within 1 business day." });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Failed to send. Please call us directly.',
      });
    }
  };

  const inputClass =
    'w-full rounded border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal placeholder-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name *"
        required
        value={form.name}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email *"
        required
        value={form.email}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Your Phone"
        value={form.phone ?? ''}
        onChange={handleChange}
        className={inputClass}
      />
      <textarea
        name="message"
        placeholder="Tell us about your project *"
        required
        rows={5}
        value={form.message}
        onChange={handleChange}
        className={inputClass}
      />

      {state.status === 'success' && (
        <p className="rounded bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {state.message}
        </p>
      )}
      {state.status === 'error' && (
        <p className="rounded bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={state.status === 'loading'}
        className="w-full rounded bg-gold py-3 font-semibold text-charcoal transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {state.status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ContactForm.tsx
git commit -m "feat: add ContactForm client component with success/error states"
```

---

## Task 12: Homepage sections (server components)

**Files:** `src/components/sections/GetStarted.tsx`, `src/components/sections/RecentProjects.tsx`, `src/components/sections/ServicesSection.tsx`, `src/components/sections/AltServices.tsx`, `src/components/sections/RecentBlog.tsx`

- [ ] **Step 1: Create src/components/sections/GetStarted.tsx**

```tsx
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';
import { SITE } from '@/lib/constants';

const BULLETS = [
  'Free estimates with no obligation',
  '25+ years serving North Atlanta',
  'Licensed, insured, and fully bonded',
  'Clear communication throughout every project',
];

export default function GetStarted() {
  return (
    <section className="bg-linen py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: info */}
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
              Get Started
            </p>
            <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
              Request a Free Estimate
            </h2>
            <p className="mb-6 leading-relaxed text-charcoal/70">
              {SITE.description} We&rsquo;re ready to help with your next residential or commercial
              project. Fill out the form and we&rsquo;ll follow up within one business day.
            </p>
            <ul className="mb-8 space-y-3">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-charcoal/80">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="relative h-56 overflow-hidden rounded-lg">
              <Image
                src="/assets/img/real/house-about.jpeg"
                alt="Completed construction project"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h3 className="mb-6 text-xl font-semibold text-charcoal">Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create src/components/sections/RecentProjects.tsx**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';

export default function RecentProjects() {
  const featured = PROJECTS.slice(0, 4);
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">Our Work</p>
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">Recent Projects</h2>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/70">
            From foundations to finishes, here&rsquo;s a look at recent work across the North Atlanta area.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project) => (
            <div key={project.id} className="relative h-56 overflow-hidden rounded-lg group">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <p className="text-sm font-medium text-white">{project.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-block rounded border-2 border-charcoal px-8 py-3 font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-white"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create src/components/sections/ServicesSection.tsx**

```tsx
import Link from 'next/link';
import { SERVICES } from '@/data/services';
import ServiceCard from '@/components/ui/ServiceCard';

export default function ServicesSection() {
  return (
    <section className="bg-linen py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
            What We Do
          </p>
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">Our Services</h2>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/70">
            From new construction to remodeling, we deliver quality craftsmanship across every project type.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-block rounded bg-gold px-8 py-3 font-semibold text-charcoal transition-opacity hover:opacity-90"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create src/components/sections/AltServices.tsx**

```tsx
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const FEATURES = [
  'Transparent pricing — no hidden costs',
  'Licensed & insured in the state of Georgia',
  'Dedicated project manager on every job',
  'Clean, organized worksites daily',
  'On-time delivery commitment',
  'Warranty on all completed work',
];

export default function AltServices() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-80 overflow-hidden rounded-lg lg:h-full lg:min-h-[420px]">
            <Image
              src="/assets/img/alt-services.jpg"
              alt="Construction quality"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
              Why Choose Us
            </p>
            <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
              Quality You Can Count On
            </h2>
            <p className="mb-6 leading-relaxed text-charcoal/70">
              At Amana Construction, we don&rsquo;t just build structures — we build trust. Every project
              is handled with the same care and professionalism we&rsquo;d bring to our own home.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-charcoal/80">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create src/components/sections/RecentBlog.tsx**

```tsx
import { BLOG_POSTS } from '@/data/blog';
import BlogCard from '@/components/ui/BlogCard';

export default function RecentBlog() {
  return (
    <section className="bg-linen py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
            Resources
          </p>
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">From Our Blog</h2>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/70">
            Tips, guides, and insights for homeowners and business owners in the North Atlanta area.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/
git commit -m "feat: add GetStarted, RecentProjects, Services, AltServices, RecentBlog sections"
```

---

## Task 13: Interactive homepage sections

**Files:** `src/components/sections/Features.tsx`, `src/components/sections/Portfolio.tsx`, `src/components/sections/TestimonialsSection.tsx`, `src/components/sections/StatsSection.tsx`

- [ ] **Step 1: Create src/components/sections/Features.tsx**

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const TABS = [
  {
    label: 'Planning',
    heading: 'Thorough Pre-Construction Planning',
    body: 'We invest time upfront to understand your goals, review site conditions, and plan every detail before breaking ground. This eliminates costly surprises and keeps your project on schedule.',
    bullets: ['Site assessment & feasibility review', 'Detailed scope of work', 'Permit coordination', 'Budget development'],
    image: '/assets/img/features-1.jpg',
  },
  {
    label: 'Execution',
    heading: 'Skilled Execution on Every Phase',
    body: 'Our crews bring decades of hands-on experience to every phase of construction. We self-perform key scopes and closely manage all subcontractors to maintain quality and timeline.',
    bullets: ['Daily site supervision', 'Quality control checkpoints', 'Subcontractor management', 'Progress reporting'],
    image: '/assets/img/features-2.jpg',
  },
  {
    label: 'Materials',
    heading: 'Durable, Quality Materials',
    body: 'We use materials that are built to last — no shortcuts, no cheap substitutes. Our supplier relationships give us access to quality products at competitive pricing.',
    bullets: ['Code-compliant materials', 'Vetted supplier network', 'Energy-efficient options available', 'Warranty-backed products'],
    image: '/assets/img/features-3.jpg',
  },
  {
    label: 'Delivery',
    heading: 'On-Time, On-Budget Delivery',
    body: 'We take our commitments seriously. Our project management system tracks milestones, flags issues early, and keeps your project moving toward a clean, on-time finish.',
    bullets: ['Milestone scheduling', 'Budget tracking & reporting', 'Clean final walkthrough', '1-year craftsmanship warranty'],
    image: '/assets/img/features-4.jpg',
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="bg-linen py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">Our Process</p>
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">How We Work</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Tabs + content */}
          <div>
            <div className="mb-6 flex gap-2 flex-wrap">
              {TABS.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setActive(i)}
                  className={`rounded px-4 py-2 text-sm font-semibold transition-colors ${
                    active === i
                      ? 'bg-gold text-charcoal'
                      : 'bg-white text-charcoal/60 hover:text-charcoal'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <h3 className="mb-3 text-xl font-bold text-charcoal">{tab.heading}</h3>
            <p className="mb-5 leading-relaxed text-charcoal/70">{tab.body}</p>
            <ul className="space-y-2">
              {tab.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-charcoal/80">
                  <CheckCircle2 size={16} className="shrink-0 text-gold" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          {/* Image */}
          <div className="relative h-80 overflow-hidden rounded-lg lg:h-auto">
            <Image src={tab.image} alt={tab.heading} fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create src/components/sections/Portfolio.tsx**

```tsx
'use client';

import { useState } from 'react';
import { PROJECTS, type ProjectCategory } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';

const FILTERS: { label: string; value: ProjectCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Construction', value: 'construction' },
  { label: 'Remodeling', value: 'remodeling' },
  { label: 'Commercial', value: 'commercial' },
];

export default function Portfolio() {
  const [active, setActive] = useState<ProjectCategory>('all');
  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">Portfolio</p>
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">Our Projects</h2>
        </div>

        {/* Filter buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`rounded px-5 py-2 text-sm font-semibold transition-colors ${
                active === f.value
                  ? 'bg-gold text-charcoal'
                  : 'bg-white text-charcoal/60 hover:text-charcoal border border-charcoal/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create src/components/sections/TestimonialsSection.tsx**

```tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';

export default function TestimonialsSection() {
  return (
    <section className="bg-charcoal py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">What Our Clients Say</h2>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {TESTIMONIALS.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-white/80 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create src/components/sections/StatsSection.tsx**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 25, suffix: '+', label: 'Years Experience' },
  { value: 200, suffix: '+', label: 'Projects Completed' },
  { value: 150, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '★', label: 'Average Rating' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const duration = 1800;
        const step = value / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl font-bold text-gold md:text-5xl">
      {count}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-charcoal py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm font-medium text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/
git commit -m "feat: add Features tabs, Portfolio filter, Testimonials, and Stats components"
```

---

## Task 14: Wire up homepage

**Files:** `src/app/page.tsx`

- [ ] **Step 1: Replace src/app/page.tsx**

```tsx
import HeroCarousel from '@/components/sections/HeroCarousel';
import GetStarted from '@/components/sections/GetStarted';
import RecentProjects from '@/components/sections/RecentProjects';
import ServicesSection from '@/components/sections/ServicesSection';
import AltServices from '@/components/sections/AltServices';
import Features from '@/components/sections/Features';
import Portfolio from '@/components/sections/Portfolio';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import StatsSection from '@/components/sections/StatsSection';
import RecentBlog from '@/components/sections/RecentBlog';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <GetStarted />
      <RecentProjects />
      <ServicesSection />
      <AltServices />
      <Features />
      <Portfolio />
      <TestimonialsSection />
      <StatsSection />
      <RecentBlog />
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Fix any type errors before continuing.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire up full homepage with all sections"
```

---

## Task 15: About page

**Files:** `src/app/about/page.tsx`

- [ ] **Step 1: Create src/app/about/page.tsx**

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export const metadata: Metadata = {
  title: 'About Us | Amana Construction — Roswell, GA',
  description:
    'Learn about Amana Construction — 25+ years of trusted general contracting in Roswell, Alpharetta, and the North Atlanta area.',
};

const VALUES = [
  'Honest pricing with no hidden fees',
  'Clear communication at every stage',
  'Skilled, background-checked tradespeople',
  'Fully licensed and insured in Georgia',
  'Residential and commercial expertise',
  'Clean worksites — every day, every project',
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" breadcrumb="About" />

      {/* About story */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative h-80 overflow-hidden rounded-lg lg:h-[500px]">
              <Image
                src="/assets/img/real/house-about.jpeg"
                alt="Amana Construction completed project"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
                Our Story
              </p>
              <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
                25+ Years of Building Trust
              </h2>
              <p className="mb-4 leading-relaxed text-charcoal/70">
                With over 25 years of experience in the construction industry, Amana Construction
                has become a trusted name serving Roswell and the greater North Atlanta area. Our
                team brings the knowledge, skills, and expertise to handle any project — residential
                or commercial, big or small.
              </p>
              <p className="mb-6 leading-relaxed text-charcoal/70">
                We have completed numerous projects ranging from custom homes and major renovations
                to commercial build-outs across Alpharetta, Milton, Johns Creek, Marietta, and
                surrounding communities. Our clients come back — and they send their neighbors.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {VALUES.map((v) => (
                  <li key={v} className="flex items-start gap-2 text-sm text-charcoal/80">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <TestimonialsSection />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/about/
git commit -m "feat: add About page with story, values, stats, and testimonials"
```

---

## Task 16: Services page

**Files:** `src/app/services/page.tsx`

- [ ] **Step 1: Create src/app/services/page.tsx**

```tsx
import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ServiceCard from '@/components/ui/ServiceCard';
import AltServices from '@/components/sections/AltServices';
import Features from '@/components/sections/Features';
import { SERVICES } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services | Amana Construction — Roswell, GA',
  description:
    'General contracting, renovation, new construction, commercial build-outs, and more. Serving Roswell, Alpharetta, and the North Atlanta area.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Our Services" breadcrumb="Services" />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
              What We Offer
            </p>
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Full-Service Construction
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-charcoal/70">
              Whether you&rsquo;re renovating a single room or building from the ground up, Amana
              Construction has the experience and crew to get it done right.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <AltServices />
      <Features />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/services/
git commit -m "feat: add Services page"
```

---

## Task 17: Projects page

**Files:** `src/app/projects/page.tsx`

- [ ] **Step 1: Create src/app/projects/page.tsx**

```tsx
import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import Portfolio from '@/components/sections/Portfolio';

export const metadata: Metadata = {
  title: 'Projects | Amana Construction — Roswell, GA',
  description:
    'Browse completed construction, renovation, and commercial projects by Amana Construction across Roswell and the North Atlanta area.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero title="Our Projects" breadcrumb="Projects" />
      <Portfolio />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/projects/
git commit -m "feat: add Projects page with filterable portfolio"
```

---

## Task 18: Contact page

**Files:** `src/app/contact/page.tsx`

- [ ] **Step 1: Create src/app/contact/page.tsx**

```tsx
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import ContactForm from '@/components/ui/ContactForm';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact | Amana Construction — Roswell, GA',
  description:
    'Contact Amana Construction for a free estimate. Serving Roswell, Alpharetta, Milton, and the North Atlanta area. Call (678) 468-8022.',
};

const INFO = [
  { icon: Phone, label: 'Phone', value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: 'Location', value: SITE.address, href: undefined },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 8am – 6pm', href: undefined },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" breadcrumb="Contact" />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: info */}
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
                Get in Touch
              </p>
              <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
                Request a Free Estimate
              </h2>
              <p className="mb-8 leading-relaxed text-charcoal/70">
                Ready to start your project? Fill out the form and we&rsquo;ll respond within one
                business day. Prefer to call? Reach us at{' '}
                <a href={SITE.phoneHref} className="font-semibold text-gold hover:underline">
                  {SITE.phone}
                </a>
                .
              </p>

              <ul className="space-y-5">
                {INFO.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold/10 text-gold">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">
                        {label}
                      </p>
                      {href ? (
                        <a href={href} className="font-medium text-charcoal hover:text-gold transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="font-medium text-charcoal">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="mb-2 text-sm font-semibold text-charcoal/50 uppercase tracking-wider">
                  Service Area
                </p>
                <p className="text-charcoal/70 text-sm leading-relaxed">{SITE.serviceArea}</p>
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-lg bg-white p-8 shadow-md">
              <h3 className="mb-6 text-xl font-semibold text-charcoal">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/contact/
git commit -m "feat: add Contact page with form and contact info"
```

---

## Task 19: README and final validation

**Files:** `README.md`

- [ ] **Step 1: Replace README.md**

```markdown
# Amana Construction Website

Production website for **Amana Construction** — a trusted general contractor serving Roswell,
Alpharetta, Milton, Johns Creek, Marietta, and the greater North Atlanta area.

**Tagline:** Built on Trust | **Phone:** (678) 468-8022

---

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router, TypeScript, `src/` directory
- [Tailwind CSS](https://tailwindcss.com/) — custom brand color tokens
- [Swiper](https://swiperjs.com/) — hero and testimonials carousels
- [Lucide React](https://lucide.dev/) — icons
- [Resend](https://resend.com/) — transactional email (contact form)
- [React Email](https://react.email/) — branded HTML email template
- [Zod](https://zod.dev/) — contact form validation

---

## Local Development

### 1. Install dependencies
npm install

### 2. Create .env.local
Copy `.env.example` to `.env.local` and fill in your values:
- `RESEND_API_KEY` — get a free key at resend.com
- `CONTACT_EMAIL` — where form submissions are delivered

### 3. Start dev server
npm run dev
# Open http://localhost:3000

---

## Code Quality

npm run typecheck       # TypeScript check
npm run lint            # ESLint
npm run lint:fix        # ESLint auto-fix
npm run format:check    # Prettier check
npm run format          # Prettier auto-format

---

## Build & Start

npm run build
npm run start

---

## Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Copy your API key to `RESEND_API_KEY` in `.env.local`
3. Set `CONTACT_EMAIL` to the inbox that should receive quote requests
4. In production: verify your domain in Resend and update the `from` address
   in `src/app/api/contact/route.ts` from `onboarding@resend.dev` to
   `noreply@yourdomain.com`

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com) — auto-detects Next.js
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
4. Deploy

## Custom Domain (GoDaddy → Vercel)

- **Option A (recommended):** In GoDaddy DNS, replace nameservers with Vercel's
  nameservers. Vercel manages all DNS from there.
- **Option B:** Keep GoDaddy DNS, add an A record pointing to `76.76.21.21`
  and a CNAME `www` pointing to `cname.vercel-dns.com`.

DNS changes propagate in 5–30 minutes.
```

- [ ] **Step 2: Run typecheck — fix all errors before continuing**

```bash
npm run typecheck 2>&1
```

Expected: `Found 0 errors.`

Common fixes:
- If `Geist` not found in `next/font/google`: `npm install geist` and change import to `import { GeistSans } from 'geist/font/sans'`, use `GeistSans.variable` directly in `<html>` className, remove the `geistSans` const.
- If Swiper CSS import errors: add `declare module 'swiper/css'` to `src/types/swiper.d.ts`
- If `@react-email/components` types missing: `npm install -D @types/react-email` or check that `@react-email/components` is in `dependencies`

- [ ] **Step 3: Run lint — fix all errors**

```bash
npm run lint 2>&1
```

Expected: `✔ No ESLint warnings or errors`

Common fix: add `eslint-disable-next-line` only for legitimate false positives, not to silence real issues.

- [ ] **Step 4: Run format check — fix formatting**

```bash
npm run format:check 2>&1
```

If files listed: run `npm run format` then re-check.

- [ ] **Step 5: Run build — fix all errors**

```bash
npm run build 2>&1
```

Expected: clean build with all 5 routes listed (/, /about, /services, /projects, /contact).

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "chore: finalize README and pass all validation checks"
```

- [ ] **Step 7: Summary**

Print the final project summary:

```bash
echo "=== Amana Construction Website ==="
echo "Routes:"
echo "  / (homepage)"
echo "  /about"
echo "  /services"
echo "  /projects"
echo "  /contact"
echo ""
echo "Real images: public/assets/img/real/ (16 photos)"
echo "Stock images: public/assets/img/ (35 photos)"
echo "Logo: public/assets/brand/amana-logo.png"
echo ""
echo "Next step: add RESEND_API_KEY to .env.local to enable email"
echo "Run: npm run dev"
```
