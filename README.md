# BeIN Legal LLP — Website

Static website for BeIN Legal LLP. Plain HTML, CSS, and a small amount of vanilla JavaScript. No frameworks, no build step.

## Structure

```
.
├── public/                 # Everything in here is served as-is
│   ├── index.html          # Homepage
│   ├── css/
│   │   └── styles.css      # Single shared stylesheet
│   ├── js/
│   │   └── main.js         # Mobile nav + small interactions
│   └── images/             # Static images (logos, photos)
├── pages/                  # Future page sources (see "Adding pages" below)
├── package.json
├── vercel.json             # Deployment config (clean URLs)
└── README.md
```

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Any change to files in `public/` is reflected on refresh.

## Adding new pages

Each page is a standalone `.html` file inside `public/`. Folder structure mirrors the URL:

- `public/about.html` → `/about`
- `public/services/trademark-registration.html` → `/services/trademark-registration`

Vercel's `cleanUrls: true` setting means visitors don't need to type `.html`. Internal links in this codebase always use the clean URL (e.g. `/about`, not `/about.html`).

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, "New Project" → import the repo.
3. Framework preset: **Other**. Output directory: **public**. No build command needed.
4. Add your custom domain in Vercel's domain settings.

That's it. Every `git push` to the main branch redeploys.
