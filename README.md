<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/NextAuth.js-4-purple?logo=auth0&logoColor=white" alt="NextAuth" />
  <img src="https://img.shields.io/badge/Gemini_AI-Powered-4285F4?logo=google&logoColor=white" alt="Gemini AI" />
</p>

<h1 align="center">🌏 Purbodoy Tours & Travels</h1>

<p align="center">
  <strong>A full-stack domestic travel booking platform for India</strong><br/>
  Browse curated travel packages, build a wishlist, add to cart, and book your next adventure — all powered by a modern Next.js stack with AI-assisted customer support.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-database-schema">Database</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-getting-started">Setup</a> •
  <a href="#-project-structure">Structure</a>
</p>

---

## ✨ Features

| Category | Feature | Description |
|----------|---------|-------------|
| 🏠 **Homepage** | Hero Carousel | Auto-rotating image carousel with Ken Burns animations, sourced from active packages in the DB |
| | Highlights Section | Key value propositions with animated stat counters |
| | Popular Destinations | Horizontally-scrollable destination cards fetched server-side |
| | Reviews Carousel | Infinite-scroll testimonials with verified badges and star ratings |
| | Trust Metrics | Social proof strip — 10K+ travelers, 200+ destinations, 4.8 avg rating |
| 📦 **Packages** | Browse & Filter | View all active travel packages with pricing, locations, and quick info |
| | Package Cards | Rich cards with image, price, location, and "Add to Cart" / "Wishlist" actions |
| ❤️ **Wishlist** | Server-Synced | Persistent wishlist stored in PostgreSQL, synced via REST API |
| | Optimistic Updates | Instant UI feedback with background server reconciliation |
| 🛒 **Cart** | Per-User Cart | `localStorage`-backed cart scoped to authenticated user email |
| | Member Count | Adjustable member count per package with dynamic subtotal |
| 💳 **Checkout** | Billing Form | Full billing details with real-time validation (email, phone, PIN) |
| | Payment Selection | Credit / Debit / UPI method selection |
| | Booking Creation | Server-side booking persisted with `BookingItem` line items |
| 🔐 **Auth** | Multi-Provider | Google OAuth + Email/Password (bcrypt) via NextAuth.js |
| | JWT Sessions | Stateless session management with PrismaAdapter |
| | Route Guards | Client-side auth guards on protected pages (checkout, profile, wishlist) |
| 👤 **Profile** | User Dashboard | View and manage profile, booking history |
| 🤖 **AI Chatbot** | Gemini-Powered | Floating chatbot with Gemini 2.5 Flash (auto-fallback to 1.5 Flash) |
| | Context-Aware | System prompt trained on Purbodoy policies, pricing, and support info |
| 🎨 **Design** | Glassmorphism | Frosted glass UI with organic blob backgrounds and subtle animations |
| | Responsive | Mobile-first design with hamburger nav, adaptive grids |
| | Skeleton Loading | Full skeleton screens for every page during data fetch |

---

## 🛠 Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND                                               │
│  ├── Next.js 16 (App Router, Server Components)         │
│  ├── React 19                                           │
│  ├── TypeScript 5                                       │
│  └── Tailwind CSS 4                                     │
│                                                         │
│  BACKEND                                                │
│  ├── Next.js API Routes (Route Handlers)                │
│  ├── NextAuth.js 4 (Google + Credentials providers)     │
│  ├── Prisma 5 ORM                                       │
│  └── Google Generative AI SDK (Gemini 2.5 / 1.5 Flash) │
│                                                         │
│  DATABASE                                               │
│  └── PostgreSQL                                         │
│                                                         │
│  INFRASTRUCTURE                                         │
│  ├── Vercel (Deployment)                                │
│  └── bcrypt (Password Hashing)                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🏛 Architecture

### High-Level System Design

```
┌──────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                        │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────────┐   │
│  │ Homepage  │  │ Packages │  │ Checkout │  │  AI Chatbot    │   │
│  │ (SSR)     │  │ (SSR)    │  │ (CSR)    │  │  (CSR)         │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────┬────────┘   │
│       │              │             │                │            │
│  ┌────┴──────────────┴─────────────┴────────────────┴─────────┐  │
│  │              React Context Providers                       │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │  │
│  │  │ CartProvider  │  │  Wishlist    │  │ SessionProvider  │  │  │
│  │  │ (localStorage)│  │  Provider    │  │ (NextAuth)       │  │  │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │  │
│  └────────────────────────────────────────────────────────────┘  │
└───────────────────────────────┬──────────────────────────────────┘
                                │ HTTPS
┌───────────────────────────────┴──────────────────────────────────┐
│                      NEXT.JS SERVER                              │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    API Route Handlers                       │ │
│  │                                                             │ │
│  │  POST /api/auth/*        ← NextAuth (Google, Credentials)  │ │
│  │  POST /api/register      ← User registration               │ │
│  │  GET  /api/bookings      ← Fetch user bookings             │ │
│  │  POST /api/bookings      ← Create booking                  │ │
│  │  GET  /api/wishlist      ← Fetch wishlist                  │ │
│  │  POST /api/wishlist      ← Add to wishlist                 │ │
│  │  DEL  /api/wishlist      ← Remove from wishlist            │ │
│  │  POST /api/chat          ← AI chatbot (Gemini)             │ │
│  │  GET  /api/profile       ← User profile                   │ │
│  │  PUT  /api/profile       ← Update profile                 │ │
│  │  GET  /api/test          ← Health check                   │ │
│  └──────────────────────┬──────────────────────────────────────┘ │
│                         │                                        │
│  ┌──────────────────────┴──────────────────────────────────────┐ │
│  │                   Prisma ORM Client                         │ │
│  └──────────────────────┬──────────────────────────────────────┘ │
└─────────────────────────┼────────────────────────────────────────┘
                          │ TCP/SSL
              ┌───────────┴────────────┐     ┌──────────────────┐
              │   PostgreSQL Database  │     │  Google Gemini   │
              │                        │     │  AI API          │
              │  Users, Packages,      │     │  (Chat Support)  │
              │  Bookings, Wishlists,  │     └──────────────────┘
              │  Payments, Sessions    │
              └────────────────────────┘
```

### Rendering Strategy

| Page | Strategy | Reason |
|------|----------|--------|
| `/` (Homepage) | **SSR** (async Server Component) | SEO-critical; fetches hero images & popular packages at request time |
| `/packages` | **SSR** | Dynamic content from DB, needs fresh data |
| `/gallery` | **SSR** | Image gallery sourced from DB |
| `/login`, `/register` | **CSR** | Interactive forms, no SEO need |
| `/cart`, `/checkout` | **CSR** | User-specific state from `localStorage` + session |
| `/profile` | **CSR** | Authenticated user data |
| `/wishlist` | **CSR** | Authenticated, API-driven |

### State Management

```
┌─────────────────────────────────────────────────────┐
│              Client-Side State Architecture         │
│                                                     │
│  SessionProvider (NextAuth)                         │
│  └── WishlistProvider (React Context + REST API)    │
│      └── CartProvider (React Context + localStorage)│
│          └── BookingProvider (React Context)         │
│              └── App Pages & Components             │
└─────────────────────────────────────────────────────┘
```

| State | Storage | Scope |
|-------|---------|-------|
| Auth Session | JWT (cookie) | Global |
| Wishlist | PostgreSQL (via API) | Per-user, server-synced |
| Cart | `localStorage` (keyed by email) | Per-user, client-only |
| Booking Form | React `useState` | Page-local |

---

## 🗄 Database Schema

```
┌──────────────────┐       ┌──────────────────┐
│      User        │       │     Package      │
│──────────────────│       │──────────────────│
│ id          PK   │       │ id          PK   │
│ name             │       │ title            │
│ email       UQ   │       │ slug        UQ   │
│ password    ?    │       │ shortInfo        │
│ phone       ?    │       │ price       INR  │
│ role        ENUM │       │ location         │
│ dateOfBirth ?    │       │ state       ?    │
│ address     ?    │       │ isFeatured       │
│ whatsappOptIn    │       │ status      ENUM │
│ emailOptIn       │       │ imageUrl    ?    │
│ image       ?    │       │ createdAt        │
│ emailVerified ?  │       │ updatedAt        │
│ createdAt        │       └────────┬─────────┘
│ updatedAt        │                │
└──┬───┬───┬───┬───┘                │
   │   │   │   │                    │
   │   │   │   │    ┌───────────────┴──────────┐
   │   │   │   │    │        Wishlist           │
   │   │   │   └────┤──────────────────────────│
   │   │   │        │ id              PK       │
   │   │   │        │ userId          FK→User  │
   │   │   │        │ packageId       FK→Pkg   │
   │   │   │        │ createdAt                │
   │   │   │        │ @@unique(userId,pkgId)   │
   │   │   │        └─────────────────────────-┘
   │   │   │
   │   │   │    ┌──────────────────────────────┐
   │   │   └────┤         Booking              │
   │   │        │──────────────────────────────│
   │   │        │ id              PK           │
   │   │        │ userId          FK→User      │
   │   │        │ totalAmount     INR          │
   │   │        │ status          ENUM         │
   │   │        │ createdAt                    │
   │   │        └──────────┬───────────────────┘
   │   │                   │
   │   │        ┌──────────┴───────────────────┐
   │   │        │       BookingItem            │
   │   │        │──────────────────────────────│
   │   │        │ id              PK           │
   │   │        │ bookingId       FK→Booking   │
   │   │        │ packageId       FK→Package   │
   │   │        │ location                     │
   │   │        │ membersCount                 │
   │   │        │ pricePerHead    INR          │
   │   │        └──────────────────────────────┘
   │   │
   │   │        ┌──────────────────────────────┐
   │   └────────┤         Payment              │
   │            │──────────────────────────────│
   │            │ id              PK           │
   │            │ bookingId       FK(1:1)      │
   │            │ userId          FK→User      │
   │            │ provider        ENUM         │
   │            │ status          ENUM         │
   │            │ amount          INR          │
   │            │ currency        "INR"        │
   │            │ razorpayOrderId ?            │
   │            │ razorpayPaymentId ?          │
   │            │ razorpaySignature ?          │
   │            │ createdAt                    │
   │            │ updatedAt                    │
   │            └──────────────────────────────┘
   │
   │            ┌──────────────────────────────┐
   ├────────────┤         Account              │
   │            │ (OAuth provider accounts)    │
   │            │ @@unique(provider, accountId)│
   │            └──────────────────────────────┘
   │
   │            ┌──────────────────────────────┐
   └────────────┤         Session              │
                │ (NextAuth sessions)          │
                └──────────────────────────────┘
```

### Enums

| Enum | Values |
|------|--------|
| `Role` | `USER`, `ADMIN` |
| `PackageStatus` | `ACTIVE`, `INACTIVE` |
| `BookingStatus` | `PENDING_PAYMENT`, `CONFIRMED`, `CANCELLED` |
| `PaymentStatus` | `CREATED`, `ATTEMPTED`, `PAID`, `FAILED`, `REFUNDED` |
| `PaymentProvider` | `RAZORPAY`, `STRIPE` |

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/[...nextauth]` | — | NextAuth.js handler (Google OAuth + Credentials) |
| `POST` | `/api/register` | — | Register new user with email/password |

### Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/bookings` | ✅ | Fetch all bookings for the authenticated user |
| `POST` | `/api/bookings` | ✅ | Create a new booking with line items |

<details>
<summary><strong>POST /api/bookings — Request Body</strong></summary>

```json
{
  "items": [
    {
      "packageId": "clx...",
      "location": "Goa",
      "membersCount": 2,
      "pricePerHead": 5000
    }
  ],
  "totalAmount": 10000,
  "billing": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main St",
    "country": "India",
    "state": "Maharashtra",
    "pin": "400001"
  },
  "paymentMethod": "upi"
}
```

</details>

### Wishlist

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/wishlist` | ✅ | Fetch user's wishlist with package details |
| `POST` | `/api/wishlist` | ✅ | Add a package to wishlist |
| `DELETE` | `/api/wishlist?packageId=xxx` | ✅ | Remove a package from wishlist |

### AI Chat

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/chat` | — | Send message to Gemini-powered chatbot |

<details>
<summary><strong>POST /api/chat — Request / Response</strong></summary>

**Request:**
```json
{
  "message": "What packages do you offer for Goa?"
}
```

**Response:**
```json
{
  "reply": "We have several exciting Goa packages! You can browse them from our Packages page..."
}
```

**Model Fallback:** Primary → `gemini-2.5-flash` → Fallback → `gemini-1.5-flash`

</details>

### User Profile

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/profile` | ✅ | Fetch authenticated user's profile |
| `PUT` | `/api/profile` | ✅ | Update profile fields |

---

## 🔄 Core User Flows

### Booking Flow

```
┌─────────┐    ┌──────────┐    ┌─────────┐    ┌──────────┐    ┌─────────────┐
│ Browse   │───▶│ Add to   │───▶│  View   │───▶│ Checkout │───▶│  Booking    │
│ Packages │    │  Cart    │    │  Cart   │    │  Form    │    │  Confirmed  │
└─────────┘    └──────────┘    └─────────┘    └──────────┘    └─────────────┘
     │                              │               │               │
     │         localStorage         │    POST       │    Redirect   │
     │         (per-user key)       │    /api/      │    /booking-  │
     │                              │    bookings   │    success    │
     ▼                              ▼               ▼               ▼
  Prisma DB                   Client State     Server DB       Clear Cart
  (packages)                  (cart-context)   (booking +      + Success UI
                                               booking items)
```

### Authentication Flow

```
                    ┌─────────────────┐
                    │   /login Page   │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────▼────┐  ┌─────▼────┐  ┌──────▼─────┐
        │  Google   │  │  Email/  │  │  Register  │
        │  OAuth    │  │  Password│  │  /register │
        └─────┬────┘  └─────┬────┘  └──────┬─────┘
              │              │              │
              ▼              ▼              ▼
        ┌─────────────────────────────────────┐
        │         NextAuth.js Handler         │
        │     (PrismaAdapter + JWT Session)   │
        └──────────────┬──────────────────────┘
                       │
                       ▼
              ┌────────────────┐
              │  PostgreSQL    │
              │  User + Account│
              │  + Session     │
              └────────────────┘
```

---

## 📂 Project Structure

```
purbodoy-app/
├── app/                          # Next.js App Router
│   ├── api/                      # API Route Handlers
│   │   ├── auth/                 #   NextAuth [...nextauth] route
│   │   ├── bookings/             #   Booking CRUD
│   │   ├── chat/                 #   Gemini AI chatbot
│   │   ├── profile/              #   User profile
│   │   ├── register/             #   User registration
│   │   ├── test/                 #   Health check
│   │   └── wishlist/             #   Wishlist CRUD
│   │
│   ├── components/               # Page-specific components
│   │   ├── HighlightsSection.tsx  #   Homepage highlights
│   │   └── PopularPackagesClient.tsx  # Scrollable package cards
│   │
│   ├── booking-success/          # Booking confirmation page
│   ├── cart/                     # Shopping cart page
│   ├── checkout/                 # Checkout & billing page
│   ├── gallery/                  # Photo gallery page
│   ├── login/                    # Sign-in page
│   ├── packages/                 # All packages listing
│   ├── profile/                  # User profile page
│   ├── register/                 # Sign-up page
│   ├── wishlist/                 # Saved packages page
│   │
│   ├── layout.tsx                # Root layout (Navbar + Footer + Providers)
│   ├── page.tsx                  # Homepage (SSR)
│   ├── providers.tsx             # SessionProvider wrapper
│   ├── error.tsx                 # Error boundary
│   ├── global-error.tsx          # Global error boundary
│   ├── loading.tsx               # Root loading skeleton
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Global styles & animations
│
├── components/                   # Shared components
│   ├── Navbar.tsx                #   Sticky navbar with auth-aware links
│   ├── Footer.tsx                #   Site footer
│   ├── Chatbot.tsx               #   Floating AI chatbot widget
│   ├── PackageCard.tsx           #   Reusable package card
│   ├── Skeleton.tsx              #   Skeleton loading primitives
│   ├── booking-context.tsx       #   Booking state context
│   ├── cart-context.tsx          #   Cart state (localStorage-backed)
│   └── wishlist-context.tsx      #   Wishlist state (API-synced)
│
├── lib/                          # Shared utilities
│   ├── auth.ts                   #   NextAuth configuration export
│   ├── constants.ts              #   Reviews data, type definitions
│   ├── db.ts                     #   Database helpers
│   └── prisma.ts                 #   Prisma client singleton
│
├── prisma/
│   ├── schema.prisma             # Database schema (8 models, 5 enums)
│   ├── seed.ts                   # Database seeder
│   └── migrations/               # Migration history
│
├── auth.ts                       # NextAuth options (providers, adapter)
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **PostgreSQL** database (local or hosted — e.g., Supabase, Neon, Railway)
- **Google Cloud Console** project (for OAuth credentials)
- **Google AI Studio** API key (for Gemini chatbot)

### 1. Clone the Repository

```bash
git clone https://github.com/Pikxul/Purbodoy-webApp.git
cd Purbodoy-webApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/purbodoy?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Gemini AI (Chatbot)
GEMINI_API_KEY="your-gemini-api-key"
```

### 4. Set Up the Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed with sample data
npx prisma db seed
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 6. Build for Production

```bash
npm run build   # Runs prisma generate + next build
npm start       # Start production server
```

---

## 🎨 Design Philosophy

- **Glassmorphism UI** — Frosted glass cards with `backdrop-blur`, organic blob shapes, and soft gradients
- **Cinematic Animations** — Ken Burns hero carousel, floating badges, staggered fade-ins
- **Mobile-First** — Responsive breakpoints with adaptive navigation (hamburger menu on mobile)
- **Skeleton Loading** — Every page has purpose-built loading skeletons for perceived performance
- **Optimistic Updates** — Wishlist toggle provides instant UI feedback before server confirmation

---

## 🔒 Security

- **Password Hashing** — bcrypt with salt rounds for credential-based auth
- **JWT Sessions** — Stateless, server-validated session tokens
- **Server-Side Auth Guards** — API routes validate `getServerSession()` before data access
- **Client-Side Route Protection** — `useSession()` redirects unauthenticated users
- **Input Validation** — Email regex, 10-digit phone, 6-digit PIN validation on checkout

---

## 📜 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Next.js dev server with hot reload |
| `build` | `npm run build` | Generate Prisma client + production build |
| `start` | `npm start` | Start production server |
| `lint` | `npm run lint` | Run ESLint |
| `postinstall` | *(auto)* | Auto-generates Prisma client after `npm install` |

---

## 🗺 Roadmap

- [ ] **Razorpay/Stripe Integration** — Payment gateway for real transactions (schema already supports it)
- [ ] **Admin Dashboard** — Package management, booking oversight, analytics
- [ ] **Email Notifications** — Booking confirmations, cancellation alerts
- [ ] **Search & Filters** — Package search by destination, price range, trip type
- [ ] **Image Gallery Upload** — Admin-managed photo galleries per package
- [ ] **Review System** — Authenticated users can leave post-trip reviews
- [ ] **WhatsApp Integration** — Opt-in notifications (schema field exists)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Pikxul">Pikxul</a>
</p>
