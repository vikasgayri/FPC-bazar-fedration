# FPC Bazaar Federation — Website (Phase 1 · Frontend Demo)

Corporate website + FPC Bazaar marketplace + admin console for **FPC Bazaar Federation**
(Kisan • Yuva • Mahila Kalyan), built as a fully interactive **frontend-only** client demo.

> **Demo mode:** there is no backend. Logins, orders, payments, registrations and enquiries are
> simulated and stored in the browser (localStorage). Every such screen is labelled as demo/simulated.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the build
```

Node 18+ (tested on Node 22).

## Demo credentials

| Area | Email | Password |
|---|---|---|
| Customer | `customer@fpcbazaar.demo` | `demo@123` |
| Admin console (`/admin/login`) | `admin@fpcbazaar.demo` | `admin@123` |

Both login screens have a **"Fill demo credentials"** button. New customer accounts can be created at `/signup`.
**Admin → Reset demo data** restores the original seed data.

Demo application refs to try on `/register/track`: `FRM-2541203`, `FPO-2539871`, `SHG-2540112`, `DRY-2538554`.

## What's inside

**Public site** — Home, About (mission/vision, chairman's message, leadership, advisory committee,
how-we-work, FPO agenda, registration details), Initiatives (14 programmes from the proposal, each with
its own detail page), News & Events, Gallery (lightbox), Partner With Us, Contact.

**FPC Bazaar** — product search, category/price/stock filters, sorting, product detail, wishlist,
cart drawer + cart page, checkout with validation, simulated UPI/Card/Netbanking/COD payment, order
confirmation, My Account order tracking.

**Registrations** — Farmer, FPO, Women SHG and Dairy/Gaushala forms (React Hook Form + Zod), reference
number, status tracking.

**Admin console** — dashboard (KPIs, 7-day sales, registrations by type), product CRUD (bilingual,
image library / demo upload), order management + status workflow, registration review + CSV export,
enquiry inbox, news CRUD, gallery management.

**Bilingual** — English / हिन्दी toggle (top bar, mobile menu, admin header). UI strings live in
`src/i18n/en.ts` and `src/i18n/hi.ts`; content objects carry `{ en, hi }`.

## Project structure

```
src/
  api/          client.ts (mock/real switch, http placeholder), endpoints.ts (Spring Boot route map)
  services/     authService, productService, orderService, registrationService, enquiryService,
                contentService (news, gallery), adminService, cartService, storage.ts
  mocks/        products.ts, orders.ts, users.ts, registrations.ts, content.ts  (seed data)
  data/         images.ts (ALL imagery), site.ts (org facts, leadership), initiatives.ts
  context/      AuthContext, CartContext, ToastContext
  hooks/        useLang, useAsync, useUi (scroll, count-up, title)
  components/   layout/, home/, shop/, forms/, admin/, ui/
  pages/        public pages, account/, admin/
  types/        shared domain types (mirror future backend DTOs)
  utils/        format.ts, validation.ts (Zod schemas)
```

Components never touch localStorage or seed arrays directly — they call **service functions** only.

## Replacing images

All imagery is centralised in **`src/data/images.ts`**:

- `real.*` → photos from the federation's company profile (`public/images/real/`). Drop in
  higher-resolution originals with the **same file names**.
- `stock.*` → Unsplash placeholders. Replace any URL with a client photo path (e.g. `/images/real/hero-1.jpg`).
- `team.*` → leadership portraits (`public/images/team/`).
- Logo → `public/brand/logo.png` (extracted from the proposal; replace with the original vector/PNG).

Every image has a branded fallback, so a missing file never shows a broken icon.

## Phase 2 — connecting the Spring Boot backend

1. `npm i axios`, set `VITE_USE_MOCK=false` and `VITE_API_BASE_URL` in `.env`.
2. Implement `http` in `src/api/client.ts` with axios (base URL, `Authorization: Bearer <JWT>`, 401 handling).
3. Each service already branches on `USE_MOCK` and calls `http.*(endpoints.*)` — align `endpoints.ts`
   with the controller mappings. Request/response shapes are in `src/types/index.ts`.
4. Replace the simulated checkout with a server-created Razorpay/Cashfree order; replace the admin
   "demo upload" with Cloudinary signed uploads.

## Content notes for the client

- Content is taken from *FPC Bazaar Federation Proposal* and *Company Profile (13 Jun 2025)*.
- **CIN confirmed** from the MCA Certificate of Incorporation: `U85197RJ2022NPL078943` (incorporated 3 Jan 2022,
  Section 8, limited by shares). PAN `AAECF8742R`, TAN `JPRF02094B`. The proposal's `U01100…078043` was a typo.
- Registered address and directors (Laxman Lohana Satiya Sindhi, Sourabh Sindhi) follow the MCA certificate and
  Section 8 licence application; the MoA main object is shown on the About page.
- Proposal names **Laxman Lohana** as Chairman; profile lists **Naveen Dhingra** as MD. Site follows that.
- Contact details combine both documents (Jaipur office, phones, both emails) — confirm the final set.
- Products, prices, producers, ratings and orders are **illustrative demo data**.
- News dates/captions were written from profile photos — confirm before go-live.
