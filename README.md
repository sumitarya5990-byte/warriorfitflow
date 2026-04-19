# WarriorFitFlow Website

Modern, responsive dark-theme website for **WarriorFitFlow** built with **Next.js + Tailwind CSS**.

## Features

- Home, About, Programs, Locations, Testimonials, Contact sections
- Sticky header + smooth scrolling navigation
- Programs: Calisthenics / MMA / Both
- 3 location cards with embedded OpenStreetMap views + direct Google Maps open links
- Enquiry form with frontend validation
- API endpoint to store enquiries in local JSON (`data/enquiries.json`)
- CTA buttons including **Join Now** + optional WhatsApp click-to-chat
- Brand logo sourced from official asset: `https://www.warriorfitflow.com/assets/svg/logo.svg`

## Tech Stack

- Frontend: Next.js (React)
- Styling: Tailwind CSS
- Backend/API: Next.js API Route (`app/api/enquiry/route.js`)
- Data storage: local JSON file for mock backend persistence (`/tmp` fallback on Vercel serverless runtime)

## Folder Structure

```txt
warriorfitflow/
├─ app/
│  ├─ api/
│  │  └─ enquiry/
│  │     └─ route.js
│  ├─ globals.css
│  ├─ layout.js
│  └─ page.js
├─ components/
│  └─ EnquiryForm.js
├─ data/
│  └─ enquiries.json
├─ jsconfig.json
├─ next.config.mjs
├─ package.json
├─ postcss.config.js
└─ tailwind.config.js
```

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```

2. (Optional) configure webhook endpoint
   ```bash
   export enquiry_webhook="https://webhook.site/your-webhook-id"
   ```

3. Run development server
   ```bash
   npm run dev
   ```

4. Open in browser
   ```txt
   http://localhost:3000
   ```

## Form Handling

- Frontend sends `POST /api/enquiry` with:
  - `name`
  - `phone`
  - `skill`
  - `location`
- API validates and appends records to `data/enquiries.json`.
- API forwards each enquiry as JSON to `process.env.enquiry_webhook` (or `process.env.ENQUIRY_WEBHOOK`).
- If env vars are not set, it falls back to `https://webhook.site/2af9dab5-3e20-4a72-9844-d8eeebc27f80`.


## Vercel 404 Troubleshooting

If Vercel shows a generic `404: NOT_FOUND` page:

1. Confirm the project **Root Directory** in Vercel is this repository root (the folder containing `package.json`).
2. Ensure the framework is detected as **Next.js** (this repo includes `vercel.json` with `framework: nextjs`).
3. Re-deploy after clearing old build cache.
4. If you are opening an old deployment URL, use the latest production domain from the Vercel dashboard.

## Deployment (Vercel preferred)

1. Push repository to GitHub.
2. Import project in [Vercel](https://vercel.com).
3. Framework preset: **Next.js**.
4. Add environment variable `enquiry_webhook` in Vercel Project Settings (optional but recommended).
5. Deploy.

### Notes for Production

- Next.js is pinned to a patched 14.2.x release to avoid known vulnerabilities from older 14.2 builds.
- Current storage uses filesystem JSON for demo/mock use.
- For production persistence, replace with a managed DB (e.g. Firebase, Supabase, MongoDB Atlas, PostgreSQL).
- Keep WhatsApp link updated with live business number.


## Maps Embedding Note

Because Google/short links can refuse iframe embedding in some browsers, the site now uses OpenStreetMap embeds for reliable in-page maps and keeps your original Google links as the “Open in Google Maps” action button for navigation.
