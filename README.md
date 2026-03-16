# VARTEX Architects Portfolio — Developer Reference

> **Full-stack architecture portfolio site** for VARTEX Architects.  
> **Stack**: Next.js 15 · Sanity CMS · Tailwind CSS v4 · GSAP · TypeScript  
> **Live URL**: https://vartex-architects-portfolio.vercel.app  
> **GitHub Repo**: https://github.com/Akakaui/vartex-architects-portfolio  
> **Local Folder**: `C:\Users\BRain\Desktop\Vartex-architects`

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server (port 3000)
npm run dev

# 3. Access CMS (Sanity Studio)
# Visit http://localhost:3000/admin
```

### Environment Variables (`.env` at project root)
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `a4s65bdv` — Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_WRITE_TOKEN` | Write access for server-side mutations |
| `ZOHO_USER` | `info@vartexarchitects.com` — contact form email |
| `ZOHO_APP_PASSWORD` | Zoho App Password for SMTP |

---

## Project Structure

```
src/
├── app/
│   ├── HomeClient.tsx          # Homepage: Hero carousel + Selected Works grid
│   ├── portfolio/
│   │   └── PortfolioClient.tsx # Project catalog with type filter + pagination (4/page)
│   ├── project/[id]/
│   │   ├── page.tsx            # Dynamic SEO metadata (generateMetadata)
│   │   └── ProjectClient.tsx   # Project detail: hero, specs, gallery, Related Architecture
│   ├── journal/
│   │   ├── JournalClient.tsx   # Blog listing page
│   │   └── [id]/JournalPostClient.tsx  # Individual journal post
│   ├── about/page.tsx          # About the Studio
│   ├── process/page.tsx        # Design process (3 steps, no images — static)
│   └── contact/page.tsx        # Contact form → Zoho email
├── sanity/
│   ├── lib/
│   │   ├── client.ts           # Sanity client config
│   │   └── queries.ts          # All GROQ queries
│   └── schemaTypes/
│       ├── project.ts          # Project schema (see CMS section below)
│       ├── category.ts         # Category schema
│       └── post.ts             # Journal post schema
```

---

## CMS (Sanity Studio) — Content Management

Access the Studio at `/admin` or https://vartex-architects-portfolio.vercel.app/admin

### Project Schema Fields
| Field | Notes |
|---|---|
| `title` | Project name (ALL CAPS in CMS matches display) |
| `slug` | Auto-generated from title. Used in URL: `/project/[slug]` |
| `client` | Client name (defaults to "VARTEX" if empty) |
| `location` | City/country (e.g. "Lagos, Nigeria"). **You control this — no defaults.** |
| `year` | 4-digit year string (e.g. "2025") |
| `area` | Floor area (e.g. "456 m²") |
| `duration` | Project status (e.g. "Completed" / "In Progress") |
| `category` | **Legacy singular field** — kept to avoid "Unknown field" errors for older projects |
| `categories` | **New array field** — used for filtering in Portfolio. Use this going forward. |
| `selectedWork` | ✅ Toggle ON to show project in "Selected Works" on homepage |
| `heroImage` | Main hero image for the project detail page |
| `images` | Gallery images (appear in the scrollable image strip) |
| `description` | Project description text |
| `materiality` | Optional — shown in Specification section |
| `sustainability` | Optional — shown in Specification section |

### ⚠️ "Unknown field: category" Error
This error in Sanity was caused by an older project having `category` data, but the field was deleted from the schema. **Fix applied**: The schema now keeps BOTH `category` (singular, for legacy data) and `categories` (array, for new projects). You can safely migrate old data by adding it to `categories` and clearing the singular field.

### Selected Works (Homepage)
The homepage "Selected Works" section shows up to **2 projects**. A project appears there if:
- The **"Show in Selected Works"** toggle is ON, OR
- It has a category named exactly **"Selected Works"**

---

## Key Pages & Features

### Hero Carousel (Homepage)
- Pulls the **2 most recent projects** from Sanity with images.
- Cycles automatically, showing project title, location, and year.
- Clicking leads to the project detail page.

### Portfolio Catalog (`/portfolio`)
- Shows **all projects** from Sanity.
- **Filter tabs** are generated dynamically from the `categories` field.
- **Pagination**: 4 projects per page.
- Metadata grid shows: Location, Year, Type (first category).

### Project Detail (`/project/[slug]`)
- **Breadcrumb**: `← PROJECT ARCHIVE // PROJECT-NAME` (clickable, links to `/portfolio`)
- **Metadata strip**: Client, Location, Year, Area, Status
- **Gallery**: Scrollable image strip from `images[]`
- **Specification**: Shows Materiality and Sustainability if filled in CMS
- **Related Architecture**: Shows other projects from the same category

### Journal (`/journal`)
- Blog posts managed in Sanity under "Post" type
- Featured post (first) + grid layout

---

## Deployment

**Platform**: Vercel (auto-deploy from GitHub `main` branch)

```bash
# Commit and push via GitHub Desktop, or:
git add .
git commit -m "Your message"
git push origin main
```
Vercel will automatically detect the push and redeploy within ~2 minutes.

---

## Pending / Next Steps

> These items were agreed to be completed after all project data is uploaded to Sanity:

- [ ] **Email Automation**: Contact form already set up with Zoho SMTP. Needs: enquiry email template, newsletter confirmation email.
- [ ] **OG Image / Logo**: Upload `/public/og-image.jpg` (1200×630px) and ensure it's referenced in `layout.tsx` metadata.
- [ ] **Sitemap & robots.txt**: Already included (`/public/robots.txt`, `next-sitemap` config pending).
- [ ] **Google Sheets integration**: Pending Google Cloud Console access for service account (noted in `.env`).
- [ ] **Final Live Audit**: After all projects are uploaded, verify metadata, images, and Related Architecture on the live Vercel URL.

---

## Known Issues & Resolutions

| Issue | Fix Applied |
|---|---|
| `Unknown field: category` in Sanity | Restored singular `category` field to schema |
| Empty `src` on `<img>` (console error) | Added image guards across all client components |
| "Selected Works" section empty | Query now checks for both toggle AND category name |
| "Related Architecture" empty | Removed image filter — shows all related projects with placeholder |
| "NIGERIA" hardcoded as location | Removed — CMS value is displayed directly |
| Breadcrumb visually non-clickable | Brightened opacity, added hover underline |

---

*Last updated: March 2026 · Maintained by VARTEX Architects*
