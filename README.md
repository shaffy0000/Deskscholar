# DeskScholar — Product Website

DeskScholar is an offline-first AI learning companion concept: a desk device designed to see books,
worksheets, and handwriting, understand spoken questions, and project step-by-step guidance directly onto
the learner's desk. **Primary message: “Your AI tutor, built into your desk.”**

> **Status:** DeskScholar is a product-focused final-year project currently in prototype development.
> Capabilities described on the website are planned or in progress. Final specifications may change.

This repository contains the complete marketing/product website: a React frontend and Node.js serverless
form APIs deployed together as **one Vercel project**.

---

## Technology stack

**Frontend**

- React 18 + TypeScript + Vite
- Tailwind CSS (custom design tokens: navy / off-white / electric blue / mint / amber)
- React Router (lazy route-based code splitting)
- Framer Motion (motion design with `prefers-reduced-motion` support)
- Lucide React (icons)
- React Hook Form + Zod (forms and validation)
- TanStack Query (mutation state)
- React Helmet Async (per-route SEO)
- Vitest + React Testing Library (tests)

**Backend (serverless)**

- Node.js + TypeScript Vercel serverless functions (`api/`)
- Zod validation
- Resend for optional email delivery

**Deliberately not used:** no database, no authentication, no CMS, no persistent form storage, no
continuously running server. The website stays simple and cheap to deploy.

## Project structure (single folder)

```
deskscholar/
├── api/                     # Vercel serverless functions (Node.js + TypeScript)
│   ├── _lib/                # email, errors, request, response, validation helpers
│   ├── contact.ts           # POST /api/contact
│   ├── early-access.ts      # POST /api/early-access
│   ├── school-interest.ts   # POST /api/school-interest
│   └── health.ts            # GET  /api/health
├── public/
│   ├── assets/              # product media (see “Media replacement” below)
│   ├── favicon.ico          # generated from logo-icon.webp (+ 16/32/48 PNG, apple-touch 180,
│   ├── site.webmanifest     # android 192/512) — robots.txt & sitemap.xml are build-generated
│   └── fonts/               # self-hosted Sora/Inter latin subsets
├── src/
│   ├── api/                 # frontend API client + Zod form schemas
│   ├── components/
│   │   ├── common/          # Button, Modal, VideoModal, ProductImage, tabs, accordion…
│   │   ├── demo/            # interactive demo stage, controls, visuals
│   │   ├── forms/           # EarlyAccess, Contact, SchoolInterest forms
│   │   ├── layout/          # AnnouncementBar, Navbar, MobileNavigation, Footer, PageLayout
│   │   └── sections/        # Hero, Problem, InteractiveDemo, HowItWorks, Features, Comparison…
│   ├── data/                # navigation, features, faq, demoScenarios, team, site constants
│   ├── hooks/               # useLockBodyScroll, useTypewriter
│   ├── pages/               # 9 routes (8 pages + custom 404)
│   ├── styles/              # Tailwind entry + design tokens
│   ├── types/               # shared API types
│   ├── utils/               # cn, inputClasses
│   ├── App.tsx              # providers + lazy routes
│   └── main.tsx
├── tests/                   # Vitest frontend + API tests
├── vercel.json              # SPA rewrites (API excluded) + asset caching
└── …configs (vite, tailwind, tsconfig ×2, eslint)
```

The React frontend lives in `src`, the Node.js backend functions live in `api`, and everything deploys as
**one Vercel project** from this single root folder. All frontend API calls use relative paths
(`/api/…`) — no hosts are hardcoded in components.

## Why there is no database

Form submissions are validated and optionally forwarded by email (Resend), then forgotten. Nothing is
written to a database, file, or repository. A generated `referenceId` in API responses is a temporary
request reference only — it does not imply stored data. This keeps the deployment minimal and the privacy
story honest for a prototype-stage project.

## Local installation

```bash
npm install
npm run dev
```

The site works fully without any environment variables: forms validate client- and server-side, and the
APIs respond with `deliveryStatus: "DISABLED"` when email delivery is not configured.

## Production checks

```bash
npm run lint        # ESLint
npm run typecheck   # tsc for src/tests and api/vite.config
npm run test        # Vitest (frontend + API handler tests)
npm run build       # typecheck + vite build → dist/
npm run preview     # serve the production build locally
```

## Vercel deployment

One project, one repository, this folder as root:

```bash
vercel          # preview deployment
vercel --prod   # production deployment
```

`vercel.json` configures:

- Vite build to `dist/`, then `scripts/prerender.mjs` writes real static-HTML metadata (title, description, canonical, Open Graph, Twitter, JSON-LD) for every route plus generated `robots.txt` + `sitemap.xml`.
- `api/*.ts` files deploy as serverless functions automatically.
- No SPA catch-all rewrite: unknown URLs return a real HTTP 404 served from `404.html`.
- Security headers (CSP, HSTS, nosniff, referrer, frame and permissions policies) on every response.

No custom server or long-running process is required.

**Production checklist before announcing the URL:**

1. Set `VITE_SITE_URL` (e.g. `https://www.your-domain.com`) — it drives canonicals, OG/Twitter
   URLs, JSON-LD, robots.txt and sitemap.xml from this one variable. Also add it to the Vercel
   project env before the first production build.
2. Configure the four environment variables below.
3. `vercel --prod`, then verify the deployed URL + one form submission.

`vercel.json` already ships security headers: CSP (self-hosted assets, `frame-ancestors 'none'`),
HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options: DENY`, and a
`Permissions-Policy` that denies camera/microphone/geolocation. Fonts and the social image
(`og-deskscholar.webp`, 1200 × 630) are self-hosted — no third-party requests on page load.

### Environment variables (Vercel Dashboard → Project → Settings → Environment Variables)

| Variable                 | Purpose                                                              |
| ------------------------ | -------------------------------------------------------------------- |
| `RESEND_API_KEY`         | API key from [Resend](https://resend.com)                              |
| `CONTACT_TO_EMAIL`       | Inbox that receives form submissions                                   |
| `CONTACT_FROM_EMAIL`     | Sender address — must use a verified sender/domain in Resend           |
| `EMAIL_DELIVERY_ENABLED` | Set to `true` **only after** the three variables above are configured |

See `.env.example`. Never commit real values.

`VITE_DEMO_VIDEO_EMBED_URL` accepts either official format and is validated at runtime
(`src/data/videoConfig.ts`) — only `https://iframe.videodelivery.net/…` and
`https://…cloudflarestream.com/…` embeds are allowed, so the URL can be added later with zero code
changes:

```
VITE_DEMO_VIDEO_EMBED_URL=https://iframe.videodelivery.net/<video-uid>
# or
VITE_DEMO_VIDEO_EMBED_URL=https://<customer-subdomain>.cloudflarestream.com/<video-uid>/iframe
```

### Form delivery (Formspree + Resend)

The **Early Access** and **Contact** forms submit JSON directly from the browser to Formspree
(`VITE_FORMSPREE_ENDPOINT`, single utility in `src/api/formspree.ts` — one POST per submission, no page
navigation, silent honeypot drop, friendly error copy, no raw provider responses). The **school pilot**
form continues to use the serverless API + optional Resend email relay described below.

### Legacy email-relay behavior (school pilot) without Resend

When `EMAIL_DELIVERY_ENABLED` is not `true`, the APIs still validate submissions and respond:

```json
{
  "success": true,
  "deliveryStatus": "DISABLED",
  "message": "The form is valid, but email delivery is not configured in this environment.",
  "referenceId": "temporary UUID"
}
```

The UI surfaces that message so development and preview deployments work end-to-end without credentials.
If the email provider fails in production, the API returns HTTP 503 with a friendly message and never
leaks stack traces, keys, or recipient addresses.

### Rate limiting note

`api/_lib/request.ts` includes a lightweight **best-effort in-memory rate limiter**. Vercel serverless
instances do not share memory, so it is not guaranteed across instances. The honeypot field, validation,
body-size limits, and provider-level abuse controls remain the primary spam defenses. No external service
(Upstash etc.) is required.

## Media replacement

### Final product images (integrated)

The nine approved DeskScholar product images live in `public/assets/deskscholar/` and are referenced
through the centralized map in `src/data/assets.ts` (never via filesystem-relative imports). All of them
render through the shared `ProductImage` component (reserved aspect ratio, lazy/eager loading, designed
error fallback). Generated derivatives also live in this folder: `og-deskscholar.webp` (1200 × 630 social card) and `-720.webp` mobile sizes for the three largest photos, served via `srcset`):

| File                              | Placement                                                     |
| --------------------------------- | ------------------------------------------------------------- |
| `deskscholar-hero-dark.webp`      | Home hero (eager, high priority) + default OG image           |
| `deskscholar-student-use.webp`    | Home — How It Works · Journey — evaluation scenario           |
| `deskscholar-projection-closeup.webp` | Home — Interactive Demo + curriculum feature card · Journey gallery |
| `deskscholar-face-display.webp`   | Home — voice feature card                                     |
| `deskscholar-exploded-view.webp`  | Technology — hardware (contain+caption) · Journey gallery     |
| `deskscholar-side-profile.webp`   | Technology — product form · Journey gallery (device render)   |
| `deskscholar-rear-view.webp`      | Technology — rear engineering detail                          |
| `deskscholar-hinge-detail.webp`   | Journey — mechanical prototyping visual                       |
| `deskscholar-classroom.webp`      | Schools — classroom uses (16:9) · Journey gallery             |

### Pending media (designed fallbacks render until added)

The demo video modal shows a designed fallback panel when its files are missing — there are never broken
media icons. Drop files with these exact names into `public/assets/`. **No React component changes are
required:**

| File                          | Used for                              | Recommended         |
| ----------------------------- | ------------------------------------- | ------------------- |
| `demo-video.mp4`              | Prototype demo video (modal)          | 1920 × 1080 MP4     |
| `demo-video-poster.webp`      | Video poster frame — shipped as a concept poster; replace when final footage lands | 1280 × 720 WEBP |

The `/team` page is intentionally text-only — no member photos, avatars, or image placeholders are used
there, and the team data file (`src/data/team.ts`) contains no image fields.

## Interactive demo behavior

The home-page demo (`/#demo`) is **fully scripted** — it runs offline in the browser with no AI API, no
backend calls, and no database. Five modes:

1. **Scan Homework** — worksheet scan, handwriting detection, sign-error hint projection
2. **Explain a Concept** — Urdu/English fraction lesson with an animated SVG pizza diagram (1/4 → 2/4 → 1/2)
3. **Quiz Me** — interactive multiple-choice question with correct/incorrect feedback
4. **Translate to Urdu** — photosynthesis explanation with an English / Urdu / Bilingual toggle
5. **Ask a Hard Question** — simulated local → optional cloud reasoning escalation visual

Controls: Replay Demo, Skip Animation, and mode switching at any time. Typewriter text, scanning
animations, and `aria-live` announcements all respect `prefers-reduced-motion`.

## Prototype limitations

- No customers, deployments, testimonials, awards, partners, or performance results are claimed anywhere.
- No confirmed retail price or launch date exists.
- Hardware specifications and software capabilities may change during prototype testing.
- The parent dashboard, privacy mode, and classroom controls are **planned** features.

## Legal review recommendation

The Privacy Policy and Terms of Use pages contain prototype-stage text written for this project.
**This legal text must be reviewed by a qualified professional before any commercial launch**, real user
data collection, or paid distribution of the device.

---

## AI video storyboard (future 25–35 s product video)

Planned AI-generated video for `public/assets/demo-video.mp4` (16:9 master, allow a future 9:16 crop).

| Scene | Time       | Visual                                                                                              | Text / Voice                                                                       |
| ----- | ---------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 1     | 0–4 s      | Clean, warm study desk with a mathematics worksheet; DeskScholar near the top-right of the desk.       | “Learning should happen where the work happens.”                                     |
| 2     | 4–8 s      | A student's hand points at a fraction problem; DeskScholar scans the page.                            | Student: “Mujhe yeh fraction samajh nahi aa raha.”                                   |
| 3     | 8–16 s     | DeskScholar projects a pizza divided into four equal slices; one slice becomes highlighted.           | Voice: “Chalo isko pizza slices ki example se samajhte hain.”                        |
| 4     | 16–23 s    | Projection transitions: 1/4 → 2/4 → 1/2.                                                              | Text: “Visual. Step by step. Bilingual.”                                             |
| 5     | 23–28 s    | Wi-Fi icon turns off; DeskScholar continues teaching.                                                 | Text: “Designed to keep learning offline.”                                           |
| 6     | 28–35 s    | Premium DeskScholar device shot; logo lockup.                                                         | “DeskScholar — Your AI tutor, built into your desk.”                                 |

**Video style:** premium product commercial; warm desk lighting; navy, blue, white, and mint palette;
realistic desk projection (no floating holograms); no copyrighted music; hands-only shots preferred;
avoid identifiable children.

---

© DeskScholar — prototype-stage project. Built with React, Vite, Tailwind CSS, Framer Motion, and Vercel
serverless functions.
