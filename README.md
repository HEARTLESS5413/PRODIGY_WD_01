# Noir Table

Noir Table is a production-ready restaurant web application built with Next.js App Router, Tailwind CSS, and Supabase. It includes secure email/password authentication, protected menu and favorites pages, real-time user-specific favorites, search and category filtering, and an admin-ready flow for adding new dishes.

## Features

- Responsive premium dark landing page with animated sections
- Supabase Auth login and signup with protected routes
- Session-aware fixed navbar with user identity and logout
- Dynamic restaurant menu with realistic seeded dishes
- Favorites stored per user in Supabase with live sync
- Search dishes and filter by category
- Admin-only add-dish form
- Loading states, toasts, and error handling
- Vercel-ready frontend with integrated Next.js API routes

## Tech Stack

- Next.js App Router
- Tailwind CSS
- Supabase Auth + Postgres + Realtime
- Framer Motion
- Sonner toast notifications

## Folder Structure

```text
app/
  (protected)/
    favorites/page.js
    layout.js
    loading.js
    menu/page.js
  api/
    menu/
      bootstrap/route.js
      route.js
  error.js
  layout.js
  loading.js
  login/page.js
  page.js
  signup/page.js
components/
  auth/
  dashboard/
  favorites/
  landing/
  menu/
  ui/
hooks/
lib/
  supabase/
public/
supabase/
  schema.sql
  seed.sql
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Notes:

- `SUPABASE_SERVICE_ROLE_KEY` is used only on the server for the one-click sample menu bootstrap route.
- Never expose the service role key in the browser.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a Supabase project.

3. In the Supabase SQL editor, run:

- [`supabase/schema.sql`](/c:/Users/abhij/OneDrive/Desktop/PROJECT/INTERNSHIP/PRODIGY_WD_01/supabase/schema.sql)
- [`supabase/seed.sql`](/c:/Users/abhij/OneDrive/Desktop/PROJECT/INTERNSHIP/PRODIGY_WD_01/supabase/seed.sql)

4. Add your local URL to Supabase:

- Authentication -> URL Configuration
- Site URL: `http://localhost:3000`

5. Start the app:

```bash
npm run dev
```

6. Open `http://localhost:3000`.

## Admin Setup

New users are created with the `guest` role by default. To enable the admin-only add-dish form, promote a user after signup:

```sql
update public.profiles
set role = 'admin'
where id = 'YOUR_AUTH_USER_UUID';
```

You can find the auth user UUID in Supabase Authentication -> Users.

## How Favorites Work

- Favorites are stored in `public.favorites`
- Row Level Security ensures users only see and manage their own favorites
- The client subscribes to Supabase realtime changes and refreshes the UI when favorites update

## Deployment

### Vercel

1. Push this project to your GitHub repository.
2. Import the repository into Vercel.
3. Add the same environment variables from `.env.local`.
4. Set `NEXT_PUBLIC_SITE_URL` to your Vercel production URL.
5. In Supabase Auth settings, add both your production URL and preview URL patterns if needed.
6. Deploy.

### Render

This project does not require a separate Express backend because the server logic is handled through Next.js route handlers in `app/api`. If you still want a split deployment later, the menu endpoints in [`app/api/menu/route.js`](/c:/Users/abhij/OneDrive/Desktop/PROJECT/INTERNSHIP/PRODIGY_WD_01/app/api/menu/route.js) and [`app/api/menu/bootstrap/route.js`](/c:/Users/abhij/OneDrive/Desktop/PROJECT/INTERNSHIP/PRODIGY_WD_01/app/api/menu/bootstrap/route.js) are the server responsibilities you would extract first.

## Seeding the Menu

You have two options:

1. Run [`supabase/seed.sql`](/c:/Users/abhij/OneDrive/Desktop/PROJECT/INTERNSHIP/PRODIGY_WD_01/supabase/seed.sql) in Supabase SQL editor.
2. Sign in and press the in-app "Load chef-curated sample menu" button on the menu page.

If menu data already exists, reseeding through the app is restricted to admin users.

## Production Notes

- Protected routes are enforced by middleware and server-side checks
- Supabase RLS policies are included in the schema
- Menu reads come from the database, not hardcoded frontend-only mocks
- Images are configured for Unsplash in `next.config.mjs`
- The app is designed for Vercel deployment with zero backend split required

## Suggested GitHub Push Flow

Your current local folder is inside a larger parent git workspace, so confirm your git remote before pushing. If you want this code published to `HEARTLESS5413/PRODIGY_WD_01`, point this folder or its parent repo at that remote first, then commit and push.
