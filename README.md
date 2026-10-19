# Sean Kakhkhorov: portfolio site

A one-page portfolio in English and Korean, built with Next.js (Pages Router) and TypeScript, the same setup as CreatorHub's frontend. It is made to run on Vercel.

## What's in it

- `pages/index.tsx`: the single page (EN at `/`, KO at `/ko`, via Next.js i18n routing)
- `content/en.ts`, `content/ko.ts`: **all the text on the page**. Edit these to change wording.
- `components/`: header and hero (`Top.tsx`), page sections (`Sections.tsx`), AI chat panel (`Chat.tsx`)
- `pages/api/chat.ts` + `lib/chat.ts`: the "Ask this site about me" chat, built like CreatorHub's AI finder:
  same-site requests only, 1,500-character messages, 8 messages a minute per visitor, a daily cap,
  retrieval from the page content with a 3.5 s time limit, a grounded low-temperature Gemini prompt,
  and one retry on a fallback model. Without `GEMINI_API_KEY` it tells visitors to email instead.
- `lib/files.ts`: links to the résumé and portfolio PDFs in `public/files/`
- `styles/globals.css`: all styling and animations (they switch off for "reduce motion")
- `tests/`: unit tests for the chat route's rules
- `.github/workflows/ci.yml`: typecheck, lint, tests and build on every push

## Run it on your Mac

```bash
npm install
npm run dev        # http://localhost:3000 and http://localhost:3000/ko
```

Checks (the same ones CI runs):

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Deploy to Vercel

1. Create a GitHub repo (for example `kakhkhorov97/web-portfolio`) and push this folder:
   ```bash
   git init && git add . && git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/kakhkhorov97/web-portfolio.git
   git push -u origin main
   ```
2. On vercel.com, sign in with GitHub, then **Add New → Project** and import the repo. Vercel detects Next.js; keep the defaults.
3. In **Settings → Environment Variables**, add:
   - `GEMINI_API_KEY`: your Gemini key (optional; the chat works without it, but only points to email)
   - `NEXT_PUBLIC_SITE_URL`: the site's URL once you know it, e.g. `https://sean-kakhkhorov.vercel.app`
4. Deploy. Every push to `main` deploys again, and pull requests get preview links.
5. Optional: add your own domain in **Settings → Domains** and create the record it shows in Cloudflare (DNS only).

## Notes

- Rate limits are kept in memory, which is fine for a portfolio. To share them across Vercel instances,
  replace `createLimiter` in `lib/chat.ts` with Upstash Redis.
- The portfolio PDFs are 11–13 MB. Smaller copies will download faster on phones.
- Phone number, visa status and street address are intentionally left off the page; they stay in the PDFs.
