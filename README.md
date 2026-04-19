# WarriorFitFlow Website

Modern, responsive dark-theme website for **WarriorFitFlow** built with **Next.js + Tailwind CSS**.

## Features

- Home, About, Programs, Locations, Testimonials, Contact sections
- Sticky header + smooth scrolling navigation
- Programs: Calisthenics / MMA / Both
- 3 location cards with embeddable Google Maps iframes + direct open-in-maps links
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

2. Run development server
   ```bash
   npm run dev
   ```

3. Open in browser
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
4. Deploy.

### Notes for Production

- Current storage uses filesystem JSON for demo/mock use.
- For production persistence, replace with a managed DB (e.g. Firebase, Supabase, MongoDB Atlas, PostgreSQL).
- Keep WhatsApp link updated with live business number.


## Maps Embedding Note

Because shared short links (e.g. `share.google`) can refuse iframe embedding, the site uses `google.com/maps?q=...&output=embed` for the iframe and keeps your original shared link as the “Open in Google Maps” button.
