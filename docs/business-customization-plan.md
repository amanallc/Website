# Business Customization Plan

Last audited: 2026-05-18

This document is a practical maintenance and customization plan for the Amana Construction website. The goal is to help turn the current site from a polished construction template into a site that reflects the real business model, services, proof, voice, and lead process of the company.

## 1. Current Project Snapshot

This project is a compact Next.js App Router website for Amana Construction. It was generated from a live-coded/template-style implementation inspired by a construction website template, then adapted with Amana branding, project images, a lead form, and a small content/data layer.

The site currently has:

- A multi-page public website.
- Static content stored in TypeScript files.
- A reusable component/section architecture.
- A contact form that sends quote requests through Resend.
- No CMS, database, authentication, or admin dashboard.

### Tech Stack

- Framework: Next.js 16.2.4 with App Router.
- Language: TypeScript.
- Styling: Tailwind CSS v4 with custom theme tokens in `src/app/globals.css`.
- Icons: Lucide React.
- Carousels: Swiper.
- Validation: Zod.
- Email: Resend and React Email.
- Package manager: npm.

### Current Routes

- `/` - homepage.
- `/about` - company story and proof sections.
- `/services` - service overview.
- `/projects` - filterable portfolio.
- `/contact` - contact information and estimate form.
- `/api/contact` - form submission route.

### Current Health

As of the audit:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- `npm run format:check` reports formatting drift across many files.
- `next build` warns that Turbopack inferred the workspace root from `C:\Users\awagr\package-lock.json` instead of this project folder. The local Next.js 16 docs say this can be fixed by setting `turbopack.root` in `next.config.ts`.

## 2. Project Structure

The most important project areas are:

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    about/page.tsx
    services/page.tsx
    projects/page.tsx
    contact/page.tsx
    api/contact/route.ts

  components/
    layout/
      Header.tsx
      MobileNav.tsx
      Footer.tsx

    sections/
      HeroCarousel.tsx
      GetStarted.tsx
      RecentProjects.tsx
      ServicesSection.tsx
      AltServices.tsx
      Features.tsx
      Portfolio.tsx
      TestimonialsSection.tsx
      StatsSection.tsx
      RecentBlog.tsx

    ui/
      PageHero.tsx
      ContactForm.tsx
      ServiceCard.tsx
      ProjectCard.tsx
      BlogCard.tsx

  data/
    services.ts
    projects.ts
    testimonials.ts
    blog.ts

  emails/
    ContactEmail.tsx

  lib/
    constants.ts
    schemas.ts

public/
  assets/
    brand/
    img/
```

## 3. Key Files And What They Control

### Business Identity

File: `src/lib/constants.ts`

Controls:

- Business name.
- Tagline.
- Description.
- Phone number.
- Email address.
- Address/location text.
- Service area.
- Navigation links.
- Social links.

This file should become the main source of truth for basic business identity.

### Services

File: `src/data/services.ts`

Controls:

- Service card titles.
- Service card descriptions.
- Icons.
- Links/anchors for services.

This is one of the highest-priority files to customize because the service list determines what kind of leads the site attracts.

### Projects

File: `src/data/projects.ts`

Controls:

- Portfolio project titles.
- Project categories.
- Project images.
- Project descriptions.

This file is currently useful but too shallow for a truly tailored portfolio. Consider expanding project entries later with city, year, service type, scope, challenge, outcome, and multiple images.

### Testimonials

File: `src/data/testimonials.ts`

Controls:

- Client names.
- Client roles/locations.
- Review quotes.

The current testimonials are placeholders and should be replaced with real client feedback or removed until real feedback is available.

### Blog Previews

File: `src/data/blog.ts`

Controls:

- Blog card titles.
- Excerpts.
- Dates.
- Authors.
- Images.
- Links.

The current blog items are placeholders and link to `#`. Either build real blog detail pages, link to real resources, or remove the homepage blog section for now.

### Homepage Composition

File: `src/app/page.tsx`

Controls the order of homepage sections:

1. `HeroCarousel`
2. `GetStarted`
3. `RecentProjects`
4. `ServicesSection`
5. `AltServices`
6. `Features`
7. `Portfolio`
8. `TestimonialsSection`
9. `StatsSection`
10. `RecentBlog`

This file is where sections can be added, removed, or reordered.

### Contact Form

Files:

- `src/components/ui/ContactForm.tsx`
- `src/lib/schemas.ts`
- `src/app/api/contact/route.ts`
- `src/emails/ContactEmail.tsx`

Together these control:

- Visible form fields.
- Client-side form state.
- Validation rules.
- File attachments.
- Submitted payload.
- Email recipient.
- Email subject.
- Email template.

Any contact form change usually needs updates in all four files.

## 4. Main Components To Understand

### Layout Components

- `Header.tsx` renders the sticky top navigation, logo, desktop nav, and call-to-action.
- `MobileNav.tsx` renders the mobile hamburger menu.
- `Footer.tsx` renders the logo, business description, contact info, social links, quick links, services list, and service area.

### Section Components

- `HeroCarousel.tsx` renders the first viewport hero slider.
- `GetStarted.tsx` renders a split section with a quote form and trust bullets.
- `RecentProjects.tsx` shows four featured projects from the project data.
- `ServicesSection.tsx` renders all services from `src/data/services.ts`.
- `AltServices.tsx` renders a "Why Choose Us" section with bullet points.
- `Features.tsx` renders the interactive "How We Work" tabs.
- `Portfolio.tsx` renders the filterable project grid.
- `TestimonialsSection.tsx` renders the testimonial carousel.
- `StatsSection.tsx` renders animated proof-point counters.
- `RecentBlog.tsx` renders three blog preview cards.

### UI Components

- `PageHero.tsx` renders page title banners for inner pages.
- `ServiceCard.tsx` renders a single service card.
- `ProjectCard.tsx` renders a single project card.
- `BlogCard.tsx` renders a single blog preview.
- `ContactForm.tsx` renders the estimate request form.

## 5. Current Template-Like Or Unfinished Items

These are the areas that most need tailoring.

- Placeholder testimonials in `src/data/testimonials.ts`.
- Placeholder blog cards in `src/data/blog.ts`.
- Blog card links use `#`.
- Social links use `#`.
- Some images are stock/template assets rather than real Amana project photos.
- Some service descriptions are generic contractor language.
- Some proof points need verification, such as `25+ years`, `200+ projects`, `150+ clients`, and `5 star rating`.
- The contact form collects only basic lead information and may not match the actual sales process.
- The About page sounds polished but still broad.
- Footer services are hardcoded separately from `src/data/services.ts`, so they can drift from the main service list.
- SEO is basic and could be expanded with sitemap, robots, Open Graph data, and LocalBusiness schema.
- Formatting is inconsistent according to Prettier.
- Turbopack root warning should be fixed in `next.config.ts`.

## 6. Customization Strategy

The best approach is to customize in layers. Do not start by randomly rewriting every page. Start with business facts, then service positioning, then proof, then lead flow.

### Phase 1: Confirm Business Truth

Goal: create a reliable source of truth for the site.

Checklist:

- [ ] Confirm exact legal business name.
- [ ] Confirm whether the public name should be "Amana Construction" or another DBA/brand.
- [ ] Confirm tagline.
- [ ] Confirm phone number.
- [ ] Confirm public email address.
- [ ] Confirm preferred location text.
- [ ] Confirm exact service area.
- [ ] Confirm business hours.
- [ ] Confirm license, insurance, and bonding language.
- [ ] Confirm years of experience.
- [ ] Confirm number of completed projects.
- [ ] Confirm number of clients served.
- [ ] Confirm warranty or workmanship guarantee.
- [ ] Confirm whether the company wants residential, commercial, or both.
- [ ] Confirm which services are most profitable.
- [ ] Confirm which services are easiest to fulfill.
- [ ] Confirm which services should not be advertised.

Primary file to update:

- `src/lib/constants.ts`

### Phase 2: Rewrite Services Around The Real Business Model

Goal: make the service list match what the business actually sells.

Checklist:

- [ ] List every service currently offered.
- [ ] Group services into clear categories.
- [ ] Remove services the business does not want to attract.
- [ ] Put the most valuable services first.
- [ ] Write each service description in specific language.
- [ ] Add location or project-type context where useful.
- [ ] Clarify whether the company handles planning, permitting, materials, subcontractors, inspections, and cleanup.
- [ ] Clarify the difference between residential and commercial services.
- [ ] Confirm service names match what customers actually search for.
- [ ] Make sure the service descriptions do not overpromise.
- [ ] Update service cards in `src/data/services.ts`.
- [ ] Update footer service links in `src/components/layout/Footer.tsx`.
- [ ] Update service page intro copy in `src/app/services/page.tsx`.
- [ ] Update homepage service intro copy in `src/components/sections/ServicesSection.tsx`.

Potential service categories to verify:

- General contracting.
- New home construction.
- Custom home construction.
- Home additions.
- Kitchen remodeling.
- Bathroom remodeling.
- Basement finishing.
- Whole-home renovation.
- Structural remodeling.
- Foundation work.
- Site preparation.
- Excavation.
- Grading.
- Drainage.
- Concrete work.
- Commercial build-outs.
- Tenant improvements.
- Outdoor living spaces.
- Decks, patios, and hardscaping.

### Phase 3: Build A Real Project Portfolio

Goal: make the portfolio prove the business can do the work it claims.

Checklist:

- [ ] Gather all recent project photos.
- [ ] Sort photos by project.
- [ ] Choose 8 to 15 strong projects to publish.
- [ ] Confirm permission to publish client/project photos.
- [ ] Record city or general location for each project.
- [ ] Record project category.
- [ ] Record services performed.
- [ ] Record project scope.
- [ ] Record project timeline.
- [ ] Record the main challenge.
- [ ] Record the final outcome.
- [ ] Record whether the project was residential or commercial.
- [ ] Rename image files clearly if needed.
- [ ] Replace weak/stock images with real project images.
- [ ] Update `src/data/projects.ts`.
- [ ] Decide whether to add project detail pages later.

Recommended future project data shape:

```ts
export interface Project {
  id: string;
  title: string;
  category: 'construction' | 'remodeling' | 'commercial';
  image: string;
  description: string;
  city?: string;
  year?: string;
  services?: string[];
  scope?: string;
  challenge?: string;
  outcome?: string;
  gallery?: string[];
}
```

### Phase 4: Replace Placeholder Proof

Goal: make trust signals real.

Checklist:

- [ ] Replace placeholder testimonials with real client reviews.
- [ ] Use first name and last initial if privacy matters.
- [ ] Add city or project type to each testimonial.
- [ ] Ask clients for permission before publishing quotes.
- [ ] Confirm whether reviews came from Google, text, email, or direct client quote.
- [ ] Replace generic stats with confirmed stats.
- [ ] Remove stats that cannot be verified.
- [ ] Add Google Business Profile link if available.
- [ ] Add license/insurance wording if confirmed.
- [ ] Add warranty/guarantee wording if confirmed.
- [ ] Add before/after photos where possible.

Primary files to update:

- `src/data/testimonials.ts`
- `src/components/sections/StatsSection.tsx`
- `src/components/sections/AltServices.tsx`
- `src/app/about/page.tsx`

### Phase 5: Tailor The Lead Funnel

Goal: make the website generate useful leads, not just messages.

Checklist:

- [ ] Define what counts as a qualified lead.
- [ ] Decide which questions should be required.
- [ ] Add a project type field.
- [ ] Add a city or service-area field if ZIP is not enough.
- [ ] Add a desired timeline field.
- [ ] Add a budget range field if the business wants it.
- [ ] Add preferred contact method.
- [ ] Add "Do you own the property?" if useful.
- [ ] Add "Are plans/drawings available?" if useful.
- [ ] Keep file uploads if project photos help qualification.
- [ ] Update client validation in `ContactForm.tsx`.
- [ ] Update server validation in `schemas.ts`.
- [ ] Update API payload handling in `route.ts`.
- [ ] Update email template in `ContactEmail.tsx`.
- [ ] Test the form locally.
- [ ] Test the form in production after deployment.

Possible form fields:

- Name.
- Email.
- Phone.
- ZIP code.
- Project city.
- Project type.
- Residential or commercial.
- Desired start date.
- Budget range.
- Project description.
- File/photo upload.
- Preferred contact method.

### Phase 6: Improve SEO And Local Search

Goal: help the site appear for relevant local searches.

Checklist:

- [ ] Confirm target cities.
- [ ] Confirm primary service keywords.
- [ ] Rewrite page metadata around real services and cities.
- [ ] Add `sitemap.ts`.
- [ ] Add `robots.ts`.
- [ ] Add Open Graph metadata.
- [ ] Add a social preview image.
- [ ] Add LocalBusiness structured data.
- [ ] Add contractor-specific schema if appropriate.
- [ ] Create service detail pages if SEO becomes a priority.
- [ ] Create city/service landing pages only if the business can support them with real content.
- [ ] Add Google Business Profile link.
- [ ] Ensure name, address, and phone are consistent everywhere.

### Phase 7: Technical Cleanup

Goal: make the codebase easier to maintain before larger edits.

Checklist:

- [ ] Run `npm run format` once.
- [ ] Review the formatting diff before committing.
- [ ] Fix the Turbopack root warning in `next.config.ts`.
- [ ] Add `.env.example` if missing.
- [ ] Make footer service links derive from `src/data/services.ts` or keep them manually synchronized.
- [ ] Consider removing placeholder blog until real posts exist.
- [ ] Consider adding a small content guide in `docs/`.
- [ ] Update README to reflect Next.js 16 and the current project structure.
- [ ] Keep `AGENTS.md` in mind before editing Next.js APIs: read relevant local docs under `node_modules/next/dist/docs/`.

## 7. Business Discovery Checklist

Use this section as the information-gathering checklist before rewriting the site.

### Basic Business Identity

- [ ] Business legal name.
- [ ] Public-facing brand name.
- [ ] Tagline.
- [ ] Owner/founder name.
- [ ] Public phone number.
- [ ] Public email.
- [ ] Mailing address, if public.
- [ ] Service-area wording.
- [ ] Business hours.
- [ ] Emergency availability, if any.
- [ ] Languages spoken.
- [ ] Logo preference.
- [ ] Brand colors preference.
- [ ] Preferred tone: premium, practical, family-owned, technical, fast-response, etc.

### Services And Business Model

- [ ] Top 3 services the business wants most.
- [ ] Services that generate the best profit.
- [ ] Services that generate the easiest projects.
- [ ] Services that should be downplayed.
- [ ] Services that should not appear on the site.
- [ ] Residential services.
- [ ] Commercial services.
- [ ] New construction services.
- [ ] Remodeling services.
- [ ] Site work services.
- [ ] Specialty services.
- [ ] Minimum project size.
- [ ] Typical project size.
- [ ] Maximum comfortable project size.
- [ ] Whether estimates are free.
- [ ] Whether consultations are paid.
- [ ] How long estimates usually take.
- [ ] Whether plans/drawings are required.
- [ ] Whether the company handles permits.
- [ ] Whether the company uses subcontractors.
- [ ] Whether the company self-performs any trades.

### Ideal Customer

- [ ] Homeowners.
- [ ] Property investors.
- [ ] Business owners.
- [ ] Commercial tenants.
- [ ] Property managers.
- [ ] Architects/designers.
- [ ] Builders/developers.
- [ ] Preferred customer locations.
- [ ] Customer pain points.
- [ ] Common objections.
- [ ] Reasons customers choose this company.
- [ ] Reasons customers might not be a fit.

### Project Proof

For each project, collect:

- [ ] Project title.
- [ ] Project city.
- [ ] Project type.
- [ ] Residential or commercial.
- [ ] Services performed.
- [ ] Approximate date/year.
- [ ] Timeline.
- [ ] Scope summary.
- [ ] Main challenge.
- [ ] Final outcome.
- [ ] Photos.
- [ ] Before photos, if available.
- [ ] After photos, if available.
- [ ] Client quote, if available.
- [ ] Permission to publish.

### Testimonials And Reviews

- [ ] Google reviews.
- [ ] Text-message reviews.
- [ ] Email feedback.
- [ ] Repeat-client feedback.
- [ ] Referral notes.
- [ ] Client names or initials.
- [ ] Client city.
- [ ] Project type.
- [ ] Permission to publish.
- [ ] Link to Google Business Profile.

### Trust And Credentials

- [ ] Years of experience.
- [ ] Number of completed projects.
- [ ] Number of repeat customers.
- [ ] License information.
- [ ] Insurance information.
- [ ] Bonding information.
- [ ] Certifications.
- [ ] Trade memberships.
- [ ] Warranty policy.
- [ ] Safety practices.
- [ ] Cleanup policy.
- [ ] Communication process.
- [ ] Project management process.

### Sales Process

- [ ] How leads are received.
- [ ] How quickly leads are contacted.
- [ ] Whether phone calls are preferred.
- [ ] Whether text messages are preferred.
- [ ] Whether email is preferred.
- [ ] Whether site visits are required.
- [ ] Estimate process.
- [ ] Proposal process.
- [ ] Contract process.
- [ ] Deposit/payment schedule.
- [ ] Typical timeline from lead to project start.
- [ ] Most important qualifying questions.

### Competitors And Inspiration

- [ ] Competitor websites.
- [ ] Local contractor sites the owner likes.
- [ ] Sites the owner dislikes.
- [ ] Design style preferences.
- [ ] Services competitors advertise.
- [ ] Keywords competitors appear to target.
- [ ] What Amana does better.

### Accounts And Operations

- [ ] GitHub access.
- [ ] Vercel access.
- [ ] Domain registrar access.
- [ ] DNS access.
- [ ] Resend access.
- [ ] Google Business Profile access.
- [ ] Social media access.
- [ ] Analytics access, if used.
- [ ] Form recipient inbox access.

## 8. Suggested Content Collection Template

Use this template for every service.

```text
Service name:
Customer name for this service:
Short description:
Who this is for:
Common project examples:
What Amana handles:
What the customer needs to provide:
Typical timeline:
Typical budget range, if publishable:
Common questions:
Photos/projects that prove this service:
Should this be a homepage priority? yes/no
```

Use this template for every project.

```text
Project title:
City/location:
Project type:
Service category:
Date/year:
Scope:
Challenge:
Outcome:
Timeline:
Photos:
Client quote:
Permission to publish:
Notes:
```

Use this template for every testimonial.

```text
Client display name:
Client role or project type:
City:
Quote:
Source:
Permission received:
Related project:
```

## 9. Recommended Implementation Order

1. Confirm business facts and update `src/lib/constants.ts`.
2. Fix placeholder social links or hide social links until real URLs exist.
3. Replace service data in `src/data/services.ts`.
4. Replace footer service labels to match the real services.
5. Replace homepage and services page intro copy.
6. Replace testimonial placeholders or temporarily remove `TestimonialsSection`.
7. Replace blog placeholders or temporarily remove `RecentBlog`.
8. Build the real project portfolio in `src/data/projects.ts`.
9. Tailor the contact form around qualified leads.
10. Add local SEO improvements.
11. Run validation and format checks.
12. Deploy and test the live form.

## 10. Validation Workflow

Before merging or deploying meaningful changes, run:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

If `format:check` fails because of existing drift, run:

```bash
npm run format
```

Then review the diff carefully before committing.

For contact form changes, also test:

- Required field validation.
- Invalid email handling.
- Invalid phone handling.
- ZIP code handling.
- File upload size handling.
- Successful API response.
- Email delivery through Resend.
- Reply-to address.
- Production environment variables.

## 11. Near-Term Action List

These are the highest-value next tasks.

- [ ] Create a business truth document from the discovery checklist.
- [ ] Confirm the exact service list with the owner.
- [ ] Replace placeholder testimonials.
- [ ] Replace or remove placeholder blog cards.
- [ ] Replace `#` social links.
- [ ] Verify proof-point stats.
- [ ] Build a stronger project portfolio from real photos.
- [ ] Add better form fields for lead qualification.
- [ ] Fix formatting drift.
- [ ] Fix the Turbopack root warning.
