# Noir Table 🍽️

A production-ready restaurant web application built with **Next.js App Router**, **Tailwind CSS**, and **Supabase**. Features secure email/password authentication, protected menu and favorites pages, real-time user-specific favorites, search and category filtering, and a full admin system for managing dishes.

> **Live Demo**: [Deploy to Vercel](#deploy-to-vercel) to see it in action.

---

## ✨ Features

- **Premium dark landing page** with animated sections and glassmorphism
- **Supabase Auth** login and signup with protected routes via middleware
- **Session-aware fixed navbar** with user identity, role badge, and logout
- **Dynamic restaurant menu** with realistic chef-curated dishes
- **Favorites system** stored per user in Supabase with live sync via Realtime
- **Search and filter** dishes by name, description, or category
- **Admin dashboard** — add, edit, delete dishes, toggle availability, control prices
- **Loading skeletons**, toast notifications, and error handling
- **Fully responsive** — optimized for mobile, tablet, and desktop
- **Vercel-ready** — zero backend split required

---

## 🛠️ Tech Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Framework      | Next.js 14 (App Router)        |
| Styling        | Tailwind CSS 3                 |
| Auth & DB      | Supabase Auth + Postgres + RLS |
| Animations     | Framer Motion                  |
| Notifications  | Sonner                         |
| Icons          | Lucide React                   |
| Deployment     | Vercel                         |

---

## 📁 Folder Structure

```text
app/
  (protected)/
    favorites/page.js       # Favorites page (auth required)
    layout.js               # Protected layout with navbar
    loading.js              # Skeleton loading state
    menu/page.js            # Menu page (auth required)
  api/
    menu/
      [id]/route.js         # PATCH/DELETE individual dishes (admin)
      bootstrap/route.js    # POST seed menu data
      route.js              # POST add new dish (admin)
  error.js                  # Global error boundary
  globals.css               # Global styles + Tailwind layers
  layout.js                 # Root layout with fonts + Toaster
  loading.js                # Root loading spinner
  login/page.js             # Login page
  page.js                   # Landing page
  signup/page.js            # Signup page
components/
  auth/                     # AuthForm, AuthShell
  dashboard/                # DashboardNavbar, DashboardShell
  favorites/                # FavoritesExperience
  landing/                  # LandingPage
  menu/                     # MenuExperience, DishCard, ChefDesk, AdminControls, etc.
  ui/                       # Button, Input, Logo, StarRating, SectionHeading, EmptyState
hooks/
  use-favorites.js          # Favorites toggle + Realtime subscription
  use-menu-filters.js       # Search + category filter logic
  use-scroll-state.js       # Scroll-aware navbar styling
lib/
  admin.js                  # Admin email check helpers
  constants.js              # Categories, routes, highlights
  data.js                   # Server-side data fetching (profiles, menu, favorites)
  menu-seed.js              # Curated seed data
  menu-validation.js        # Payload validation for menu items
  utils.js                  # cn(), formatCurrency(), capitalize()
  supabase/
    admin.js                # Service role client (server-only)
    browser.js              # Browser client singleton
    middleware.js            # Auth middleware + route protection
    server.js               # Server component client
supabase/
  schema.sql                # Full database schema + RLS policies
  seed.sql                  # Sample menu data SQL
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js 18+ and npm
- A [Supabase](https://supabase.com) project (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/HEARTLESS5413/PRODIGY_WD_01.git
cd PRODIGY_WD_01
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAILS=admin@example.com
```

> **Where to find these values**: Go to your Supabase project → Settings → API

### 4. Set up the database

In the Supabase SQL Editor, run the contents of these files **in order**:

1. `supabase/schema.sql` — Creates tables, triggers, and RLS policies
2. `supabase/seed.sql` — Populates 12 curated menu items

### 5. Configure Supabase Auth

In Supabase dashboard → Authentication → URL Configuration:
- Set **Site URL** to `http://localhost:3000`

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and create an account to get started.

---

## 👑 Admin Setup

Admin access is controlled entirely by environment variables — **no database roles needed**.

1. Add your admin email(s) to `.env.local`:

```env
ADMIN_EMAILS=youradmin@email.com,owner@example.com
```

2. Sign in with that email address
3. Restart the dev server (or redeploy on Vercel)

Admin users automatically get:
- ✏️ **Edit** — modify names, descriptions, images, prices, ratings, categories
- ➕ **Add** — publish new dishes via the Chef Desk form
- 🗑️ **Delete** — remove dishes from the menu
- 🔄 **Toggle availability** — mark dishes available/unavailable
- 🌱 **Reseed** — reload the sample menu at any time

---

## ❤️ How Favorites Work

- Favorites are stored in the `public.favorites` table
- **Row Level Security (RLS)** ensures each user can only see/manage their own favorites
- The client subscribes to **Supabase Realtime** and updates the UI instantly when favorites change
- Optimistic updates provide snappy UX with server reconciliation

---

## 🌐 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/HEARTLESS5413/PRODIGY_WD_01&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,ADMIN_EMAILS&envDescription=Supabase%20credentials%20and%20admin%20config&envLink=https://github.com/HEARTLESS5413/PRODIGY_WD_01%23-quick-start-local-development)

### Manual Deploy

1. Push this project to your GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Add environment variables:

| Variable                          | Value                                    |
| --------------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | `https://your-app.vercel.app`            |
| `NEXT_PUBLIC_SUPABASE_URL`        | `https://your-project-ref.supabase.co`   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Your Supabase anon key                   |
| `SUPABASE_SERVICE_ROLE_KEY`       | Your Supabase service role key           |
| `ADMIN_EMAILS`                    | Comma-separated admin email addresses    |

4. Click **Deploy**
5. After deployment, update Supabase Auth settings:
   - **Site URL** → your Vercel production URL (e.g., `https://your-app.vercel.app`)
   - **Redirect URLs** → add your production URL and any preview URL patterns (`https://*-yourusername.vercel.app/*`)

### About Render

This project does **not** require a separate backend server. All server logic is handled through Next.js API Route Handlers in `app/api/`. If you later need a split architecture, the menu endpoints in `app/api/menu/` are the server responsibilities you would extract first.

---

## 🌱 Seeding the Menu

You have two options:

1. **SQL**: Run `supabase/seed.sql` in the Supabase SQL Editor
2. **In-app**: Sign in and press the **"Load chef-curated sample menu"** button on the menu page

If menu data already exists, only configured admin users can reseed.

---

## 📋 Production Checklist

- [x] Protected routes enforced by middleware and server-side checks
- [x] Supabase RLS policies included in schema (users can only access their own data)
- [x] Menu data fetched from database, not hardcoded
- [x] Admin access controlled by `ADMIN_EMAILS` env var
- [x] Unsplash images configured in `next.config.mjs`
- [x] `server-only` guard on server data functions
- [x] Error boundary with user-friendly messaging
- [x] Loading skeletons for async pages
- [x] Toast notifications for all user actions
- [x] Responsive design (mobile + tablet + desktop)
- [x] Vercel-optimized with zero backend split
- [x] Environment variables properly separated (public vs. server-only)

---

## 🔒 Security Notes

- **`SUPABASE_SERVICE_ROLE_KEY`** is used **only** on the server for the bootstrap/seed route and admin menu operations. It is **never** exposed to the browser.
- **`ADMIN_EMAILS`** is a server-side environment variable — admin checks happen on both the server (layout) and API routes.
- All database operations respect **Row Level Security** policies.
- Authentication state is verified via `supabase.auth.getUser()` on every protected request.

---

## 📜 License

This project was built as part of the **Prodigy InfoTech Web Development Internship** (Task WD-01).
