# Amana Construction Website Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a production-ready Next.js 15 website foundation for Amana Construction with brand assets, Tailwind custom colors, and a single homepage (Header + Hero + Footer).

**Architecture:** Next.js App Router with TypeScript in `src/` directory. Components are split by role: `layout/` for persistent shell (Header, Footer), `sections/` for page content (Hero). All brand constants are centralized in `src/lib/constants.ts`. No state management, no data fetching, no client components in this phase.

**Tech Stack:** Next.js 15 (App Router, TypeScript, `src/`), Tailwind CSS v4, ESLint (Next.js config), Prettier + prettier-plugin-tailwindcss, Geist Sans (`next/font/google`), npm

---

## File Map

| File                                    | Action                  | Responsibility                                             |
| --------------------------------------- | ----------------------- | ---------------------------------------------------------- |
| `public/assets/brand/amana-logo.png`    | Create (copy from root) | Primary logo — transparent bg, used in Header + Hero       |
| `public/assets/brand/amana-logo-bg.png` | Create (copy from root) | Alternate logo — solid bg, available for future use        |
| `src/lib/constants.ts`                  | Create                  | Brand constants and nav link definitions                   |
| `src/app/globals.css`                   | Replace                 | Tailwind v4 directives + custom color tokens + base styles |
| `src/app/layout.tsx`                    | Replace                 | Root layout: Geist font, metadata, Header + Footer shell   |
| `src/app/page.tsx`                      | Replace                 | Homepage: renders Hero only                                |
| `src/components/layout/Header.tsx`      | Create                  | Sticky header with logo, company name, desktop nav         |
| `src/components/layout/Footer.tsx`      | Create                  | Minimal footer with name, tagline, copyright year          |
| `src/components/sections/Hero.tsx`      | Create                  | Full hero: logo mark, heading, tagline, copy, two CTAs     |
| `src/styles/.gitkeep`                   | Create                  | Reserve the styles directory                               |
| `.prettierrc`                           | Create                  | Prettier config (semi, singleQuote, trailingComma, etc.)   |
| `.prettierignore`                       | Create                  | Files Prettier should skip                                 |
| `.nvmrc`                                | Create                  | Node 22 LTS pin                                            |
| `.env.example`                          | Create                  | Environment variable template                              |
| `README.md`                             | Replace                 | Project docs with dev/lint/build/deploy instructions       |
| `package.json`                          | Modify                  | Name, description, keywords, author, license, scripts      |
| `next.config.ts`                        | Verify                  | Default generated config is sufficient                     |

---

## Task 1: Initialize Next.js project

**Files:**

- Creates all Next.js scaffold files in current directory

- [ ] **Step 1: Run create-next-app in current directory**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

Expected output ends with: `Success! Created ... at ...`

- [ ] **Step 2: Verify the scaffold**

```bash
ls src/app/ && ls src/
```

Expected: `src/app/` contains `layout.tsx`, `page.tsx`, `globals.css`. `src/` contains `app/`.

- [ ] **Step 3: Verify Tailwind version**

```bash
npm list tailwindcss | head -5
```

Expected: `tailwindcss@4.x.x` (this plan assumes v4; if v3 is installed see note below).

> **Note (Tailwind v3 fallback):** If `tailwindcss@3.x.x` is installed, `tailwind.config.ts` will exist. In that case, add custom colors to the `extend.colors` block in `tailwind.config.ts` instead of using `@theme` in globals.css (see Task 5 for both paths).

- [ ] **Step 4: Commit initial scaffold**

```bash
git init
git add .
git commit -m "chore: initialize Next.js 15 project scaffold"
```

---

## Task 2: Move logo assets

**Files:**

- Create: `public/assets/brand/amana-logo.png`
- Create: `public/assets/brand/amana-logo-bg.png`

- [ ] **Step 1: Create brand directory and copy logos**

```bash
mkdir -p public/assets/brand
cp logo-no-bg.png public/assets/brand/amana-logo.png
cp logo-w-bg.png public/assets/brand/amana-logo-bg.png
```

- [ ] **Step 2: Verify files are present**

```bash
ls -lh public/assets/brand/
```

Expected:

```
amana-logo.png    ~75K
amana-logo-bg.png ~81K
```

- [ ] **Step 3: Commit**

```bash
git add public/assets/brand/
git commit -m "chore: add brand logo assets to public/assets/brand"
```

---

## Task 3: Install Prettier and update package.json

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Install Prettier and Tailwind plugin**

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

- [ ] **Step 2: Update package.json metadata and scripts**

Open `package.json`. Replace the entire file content with the following (preserve the existing `dependencies` and `devDependencies` blocks — only update the top-level fields and `scripts`):

The fields to set:

- `"name"`: `"amana-construction"`
- `"version"`: `"0.1.0"`
- `"private"`: `true`
- `"description"`: `"Website for Amana Construction, a trusted general contractor built on integrity, reliability, and quality craftsmanship."`
- `"author"`: `"Amana Construction"`
- `"license"`: `"UNLICENSED"`
- `"keywords"`: `["amana construction", "construction", "general contractor", "contractor", "remodeling", "renovation", "residential construction", "commercial construction"]`

Scripts section — replace `"scripts"` with:

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

- [ ] **Step 3: Verify install and scripts**

```bash
npm run format -- --version 2>&1 | head -3
```

Expected: Prettier version printed without errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: update package.json metadata and add prettier"
```

---

## Task 4: Configure Prettier and update .gitignore

**Files:**

- Create: `.prettierrc`
- Create: `.prettierignore`
- Modify: `.gitignore`

- [ ] **Step 1: Create .prettierrc**

Create file `.prettierrc` with this exact content:

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

- [ ] **Step 2: Create .prettierignore**

Create file `.prettierignore` with this content:

```
.next
node_modules
public
*.lock
dist
build
```

- [ ] **Step 3: Append to .gitignore**

Open `.gitignore` (created by create-next-app). Append these lines at the bottom if not already present:

```
# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

- [ ] **Step 4: Commit**

```bash
git add .prettierrc .prettierignore .gitignore
git commit -m "chore: configure prettier and update gitignore"
```

---

## Task 5: Configure Tailwind custom colors and globals.css

**Files:**

- Replace: `src/app/globals.css`
- Conditional: `tailwind.config.ts` (only if Tailwind v3)

- [ ] **Step 1: Replace globals.css**

**For Tailwind v4** (installed by create-next-app@latest), replace `src/app/globals.css` entirely:

```css
@import 'tailwindcss';

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
```

**For Tailwind v3** (if that's what was installed instead), replace `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-linen text-charcoal;
}
```

And update `tailwind.config.ts`:

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

- [ ] **Step 2: Verify Tailwind compiles**

```bash
npm run build 2>&1 | tail -10
```

Expected: Build completes without CSS errors (ignore any page-related errors for now — components don't exist yet).

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css tailwind.config.ts 2>/dev/null; git commit -m "feat: configure tailwind custom color tokens and base styles"
```

---

## Task 6: Create constants file

**Files:**

- Create: `src/lib/constants.ts`

- [ ] **Step 1: Create the lib directory and constants file**

```bash
mkdir -p src/lib
```

Create `src/lib/constants.ts`:

```ts
export const SITE = {
  name: 'Amana Construction',
  tagline: 'Built on Trust',
  description:
    'Reliable general contracting for homeowners, investors, and businesses. Clear communication, honest pricing, and quality work from start to finish.',
  phone: '(000) 000-0000',
  email: 'info@amanaconstruction.com',
  serviceArea: 'Your City, State',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;
```

- [ ] **Step 2: Type-check the file**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors on `src/lib/constants.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: add brand constants and nav links"
```

---

## Task 7: Create Header component

**Files:**

- Create: `src/components/layout/Header.tsx`

- [ ] **Step 1: Create directories**

```bash
mkdir -p src/components/layout
```

- [ ] **Step 2: Create Header.tsx**

Create `src/components/layout/Header.tsx`:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { NAV_LINKS, SITE } from '@/lib/constants';

export default function Header() {
  return (
    <header className="bg-charcoal sticky top-0 z-50 shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/brand/amana-logo.png"
            alt="Amana Construction logo"
            width={2000}
            height={2000}
            className="h-10 w-auto"
            priority
          />
          <span className="text-lg font-semibold text-white">{SITE.name}</span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-gold text-sm font-medium text-white/80 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: decorative hamburger — no JS interaction in this phase */}
        <div className="flex flex-col gap-1.5 md:hidden" aria-hidden="true">
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors on `Header.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: add Header component with logo and desktop nav"
```

---

## Task 8: Create Footer component

**Files:**

- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

Create `src/components/layout/Footer.tsx`:

```tsx
import { SITE } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-charcoal py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm text-white/70">
          {SITE.name} &middot; {SITE.tagline} &middot; &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 9: Create Hero section

**Files:**

- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create sections directory**

```bash
mkdir -p src/components/sections
```

- [ ] **Step 2: Create Hero.tsx**

Create `src/components/sections/Hero.tsx`:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="bg-linen flex min-h-[85vh] flex-col items-center justify-center px-6 py-24 text-center">
      <Image
        src="/assets/brand/amana-logo.png"
        alt="Amana Construction logo mark"
        width={2000}
        height={2000}
        className="mb-8 h-28 w-auto"
        priority
      />

      <h1 className="text-charcoal mb-3 text-5xl font-bold tracking-tight md:text-6xl">
        {SITE.name}
      </h1>

      <p className="text-gold mb-6 text-2xl font-medium md:text-3xl">{SITE.tagline}</p>

      <p className="text-charcoal/75 mb-10 max-w-xl text-lg leading-relaxed">{SITE.description}</p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/contact"
          className="bg-gold text-charcoal rounded-md px-8 py-3 font-semibold transition-opacity hover:opacity-90"
        >
          Request a Quote
        </Link>
        <Link
          href="/services"
          className="border-charcoal text-charcoal hover:bg-charcoal rounded-md border-2 px-8 py-3 font-semibold transition-colors hover:text-white"
        >
          View Services
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with logo, tagline, and CTA buttons"
```

---

## Task 10: Update root layout

**Files:**

- Replace: `src/app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx**

Replace `src/app/layout.tsx` entirely:

```tsx
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Amana Construction | Built on Trust',
  description:
    'Reliable general contracting for homeowners, investors, and businesses. Clear communication, honest pricing, and quality work from start to finish.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: update root layout with metadata, font, and Header/Footer shell"
```

---

## Task 11: Update homepage

**Files:**

- Replace: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

Replace `src/app/page.tsx` entirely:

```tsx
import Hero from '@/components/sections/Hero';

export default function HomePage() {
  return <Hero />;
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire up homepage with Hero section"
```

---

## Task 12: Create remaining config and meta files

**Files:**

- Create: `src/styles/.gitkeep`
- Create: `.env.example`
- Create: `.nvmrc`
- Replace: `README.md`

- [ ] **Step 1: Create styles placeholder**

```bash
touch src/styles/.gitkeep
```

- [ ] **Step 2: Create .env.example**

Create `.env.example`:

```bash
# Public site URL (used for metadata and OG tags in future phases)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 3: Create .nvmrc**

Create `.nvmrc`:

```
22
```

- [ ] **Step 4: Replace README.md**

Replace `README.md` entirely:

````markdown
# Amana Construction

Website for Amana Construction — a trusted general contractor built on integrity, reliability, and quality craftsmanship.

**Tagline:** Built on Trust

---

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router, TypeScript, `src/` directory
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling with custom brand tokens
- [ESLint](https://eslint.org/) — linting via Next.js config
- [Prettier](https://prettier.io/) — code formatting with Tailwind class ordering

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:3000)
npm run dev
```
````

---

## Code Quality

```bash
# Type check
npm run typecheck

# Lint
npm run lint

# Lint and auto-fix
npm run lint:fix

# Check formatting
npm run format:check

# Auto-format all files
npm run format
```

---

## Build

```bash
npm run build
npm run start
```

---

## Deployment

This project is designed for deployment on **[Vercel](https://vercel.com/)**.

1. Push to GitHub
2. Import repository in Vercel dashboard
3. Vercel auto-detects Next.js — no extra config needed
4. Set any environment variables from `.env.example` in the Vercel dashboard

---

## Custom Domain (GoDaddy)

To connect a GoDaddy domain through Vercel:

1. In your Vercel project → **Settings → Domains** → add your domain
2. Vercel will provide nameservers or A/CNAME records
3. **Option A (recommended):** Update nameservers in GoDaddy to point to Vercel's nameservers — Vercel manages DNS
4. **Option B:** Keep GoDaddy DNS and add the A record (`76.76.21.21`) and CNAME (`cname.vercel-dns.com`) provided by Vercel

DNS propagation typically takes 5–30 minutes.

````

- [ ] **Step 5: Commit**

```bash
git add src/styles/.gitkeep .env.example .nvmrc README.md
git commit -m "chore: add .nvmrc, .env.example, README, and styles directory"
````

---

## Task 13: Full validation and fix cycle

**Files:** Any file with errors

- [ ] **Step 1: Run typecheck**

```bash
npm run typecheck 2>&1
```

Expected: `Found 0 errors.` — if errors appear, fix them and re-run.

- [ ] **Step 2: Run lint**

```bash
npm run lint 2>&1
```

Expected: `✔ No ESLint warnings or errors` — if warnings appear about `next/image` or `react/no-unescaped-entities`, address them:

- `next/image` alt text warnings: already handled (alt props are set)
- `react/no-unescaped-entities`: use HTML entities (`&middot;`, `&copy;`, `&amp;`) or escape with `{' '}` — already handled in Footer
- Any remaining: fix per ESLint message

- [ ] **Step 3: Run format check**

```bash
npm run format:check 2>&1
```

Expected: All files are formatted. If not:

```bash
npm run format
```

Then re-run `npm run format:check` to confirm.

- [ ] **Step 4: Run build**

```bash
npm run build 2>&1
```

Expected output ends with:

```
Route (app)                              Size     First Load JS
┌ ○ /                                   ...
└ ○ /_not-found                         ...
○  (Static)  prerendered as static content
✓ Compiled successfully
```

If build fails:

- **Font error (`Geist` not found in `next/font/google`):** Switch to local Geist package:

  ```bash
  npm install geist
  ```

  Then update `src/app/layout.tsx` import:

  ```tsx
  import { GeistSans } from 'geist/font/sans';
  // Replace the Geist() call with:
  // className={GeistSans.variable}  — GeistSans is already configured, no need to call it
  ```

  Full replacement for the font block in layout.tsx:

  ```tsx
  import { GeistSans } from 'geist/font/sans';
  // Remove the geistSans const declaration entirely
  // In <html>: className={GeistSans.variable}
  ```

- **Image optimization warning (not an error):** Add `unoptimized` to next.config.ts if needed for static export (not needed for Vercel deployment).

- [ ] **Step 5: Final commit if any fixes were made**

```bash
git add -A
git commit -m "fix: resolve typecheck, lint, and build errors"
```

---

## Task 14: Verify dev server

- [ ] **Step 1: Start dev server**

```bash
npm run dev 2>&1 &
sleep 5
```

- [ ] **Step 2: Check the server responds**

```bash
curl -s http://localhost:3000 | grep -i "amana" | head -5
```

Expected: HTML containing "Amana Construction".

- [ ] **Step 3: Kill dev server**

```bash
kill %1 2>/dev/null || pkill -f "next dev" 2>/dev/null
```

- [ ] **Step 4: Final summary commit**

```bash
git log --oneline | head -15
```

Expected: A clean commit history showing each phase of the build.
