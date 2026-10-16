# Blackbird UAV Website

<div align="center" style="width:100%;">
  <a href="https://blackbirduav.ca">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/836fb028-7dbe-4231-98d8-655b2403d845">
      <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/271396bd-6481-4cd9-b735-d8180a4749e4">
      <!-- Fallback (-->
        <img src="https://github.com/user-attachments/assets/f6306836-6f36-4c2a-9885-75999f012aab" alt="Blackbird UAV" style="width: 100%; height: auto;">
    </picture>
  </a>


[![Release](https://img.shields.io/github/v/release/Blackbird-UAV/BlackbirdUAV-Website?style=for-the-badge&label=Release&labelColor=4D4D4D&color=306998)](https://github.com/Blackbird-UAV/BlackbirdUAV-Website/releases)
[![CI](https://github.com/Blackbird-UAV/BlackbirdUAV-Website/actions/workflows/nodeMain.js.yml/badge.svg)](https://github.com/Blackbird-UAV/BlackbirdUAV-Website/actions/workflows/nodeMain.js.yml)
[![Deploy](https://github.com/Blackbird-UAV/BlackbirdUAV-Website/actions/workflows/deployMain.yml/badge.svg)](https://github.com/Blackbird-UAV/BlackbirdUAV-Website/actions/workflows/deployMain.yml)

[![Website Status](https://img.shields.io/website?down_message=offline&label=Main%20Site&style=for-the-badge&up_message=online&url=https%3A%2F%2Fblackbirduav.ca)](https://blackbirduav.ca)

</div>

**Start Date**: October 4, 2024
**Team Members / Developers**:

- [Edwin Ngui](https://github.com/EdwinNgui)
- [Daniel Lu](https://github.com/FinityFly)
- [Marc Vidal](https://github.com/MarcVidalCodes)
- [Jonah Pasquantonio](https://github.com/jonahp123)
- [Teddy Kurita](https://github.com/EdwardKurita)
- [Jeremy Friesen](https://github.com/JeremyFriesenGitHub)

---

## Overview

Welcome to the official repository for the **Blackbird UAV** website! Blackbird UAV is a student UAV design team at Carleton University, and the website showcases our team, our aircraft and our competition results, helps students join, and connects us with sponsors.

---

## Deployment

The live site is [https://blackbirduav.ca/](https://blackbirduav.ca/). There is no separate development site: run it locally instead (see [Getting Started](#getting-started)).

Checks and deploys run on GitHub Actions:

1. **CI** ([`nodeMain.js.yml`](.github/workflows/nodeMain.js.yml)) runs on every push and pull request to `main`: `npm ci`, the dependency audit (`npm run audit:ci`), `npm run lint` and `npm run build`.
2. **Deploy to Main** ([`deployMain.yml`](.github/workflows/deployMain.yml)) runs once CI passes on a push to `main`. One job builds the export and has no access to secrets. A separate job in the `production` environment, which holds the FTP credentials, uploads the export over FTPS. Only changed files are uploaded, and files no longer in the export are deleted from the server.

The host runs Apache (LiteSpeed) and applies [`website/.htaccess`](website/.htaccess), which `npm run prod` copies into the export. It maps clean URLs such as `/vehicles` to `vehicles.html`, shows the 404 page for unknown URLs, sets caching and security headers, and redirects HTTP to HTTPS.

---

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Easily Updatable Content**: Team rosters, alumni, competitions, sponsors and the FAQ live in plain data files (see [Updating Content](#updating-content)).
- **Static and Fast**: Every page is prerendered to HTML at build time, so the host only serves files.
- **Accessible**: A skip link, keyboard-friendly menus, tabs and carousels, and less motion when the device asks for it.
- **Search and Link Previews**: Every page has its own title, description and canonical URL, and link-preview tags with a photo; the site has a `robots.txt` and a `sitemap.xml`.

---

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) 16 (pages router) with [React](https://react.dev/) 19, built as a static export (`output: 'export'`) into `website/out`
- **Styling**: CSS Modules, [Mantine](https://mantine.dev/) (search inputs) and [Motion](https://motion.dev/) (animations)
- **Icons and Fonts**: Font Awesome and Tabler Icons; Fira Sans and Fahkwang through `next/font`, served from the site itself
- **Analytics**: Google Analytics through `@next/third-parties`
- **Hosting**: Apache (LiteSpeed), configured by `website/.htaccess`
- **Deployment**: GitHub Actions, FTPS

### Project Structure

```
website/
├── src/
│   ├── pages/        one file per page; MeetTheTeam/[year].js builds a page for each team year
│   ├── components/   shared parts: Navbar, Footer, Header, PageMeta (each page's <head> tags)...
│   ├── data/         teamData.js, sponsorData.js, faqData.js
│   └── styles/       CSS Modules, plus globals.css
├── public/           images, the sponsorship package, favicon, robots.txt and sitemap.xml, published as they are
├── scripts/          audit.mjs (the CI dependency audit) and resize-images.mjs
└── .htaccess         the host's rewrite, cache and header rules
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 24, the version in [`.nvmrc`](.nvmrc) and the one CI uses, with the npm it ships (11.17 or newer). Older npm releases may report `package-lock.json` as out of sync or rewrite it.
- [Git](https://git-scm.com/)

### How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Blackbird-UAV/BlackbirdUAV-Website.git
   ```

2. Navigate to the project folder:

   ```bash
   cd BlackbirdUAV-Website/website
   ```

3. Install dependencies:

   ```bash
   nvm install   # with nvm: installs and switches to the Node version in .nvmrc
   npm ci
   ```

   `npm ci` installs exactly what `package-lock.json` pins. Don't use `npm install --legacy-peer-deps`: it rewrites the lockfile and leaves out the TypeScript peer that the ESLint config loads, so `npm run lint` fails.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

### How to Build

1. Build the static site into `website/out`, with `.htaccess` copied in, exactly as the deploy does:

   ```bash
   npm run prod
   ```

2. To preview the build, serve `out/` with any static file server, for example:

   ```bash
   npx serve@14 out
   ```

   It serves clean URLs and the 404 page like the host does, but not the other `.htaccess` rules (redirects, caching and security headers).

### Checks

| Command | What it does |
| ------- | ------------ |
| `npm test` | Lints (`npm run lint`) and builds: CI's checks apart from the audit |
| `npm run audit:ci` | CI's dependency audit: fails on high or critical advisories (see [`audit.mjs`](website/scripts/audit.mjs)) |
| `npm run lighthouse` | Runs Lighthouse three times on every page in `out/` (build first; needs Chrome or Chromium; takes several minutes) and fails if a page's desktop performance score is below 90 |
| `npm run lighthouse:live` | The same for the live site's home page |

---

## Updating Content

- **Team members**: edit [`teamData.js`](website/src/data/teamData.js). Headshots go in a folder per year, such as `website/public/images/2026Headshots/`.
- **A new team year**: add the year to `teamData.js` (its page is generated from it), then add it to the team links in [`Navbar.js`](website/src/components/Navbar.js) and to [`sitemap.xml`](website/public/sitemap.xml), and point the `/MeetTheTeam` redirect in [`.htaccess`](website/.htaccess) at it.
- **Alumni and competitions**: the `Alumni` and `Competition` entries in `teamData.js`. A competition photo also needs its size in pixels, `imageWidth` and `imageHeight`.
- **Sponsors**: [`sponsorData.js`](website/src/data/sponsorData.js), with the logo in `website/public/images/Sponsors/`.
- **FAQ**: [`faqData.js`](website/src/data/faqData.js).
- **Page titles and descriptions**: each page passes its own to [`PageMeta`](website/src/components/PageMeta.js), which writes all of its `<head>` tags. A new page should use it too, and be added to `sitemap.xml`.

### Adding Images

Everything in `website/public` is published, so resize photos before adding them, and keep full-size originals out of it. From `website/`:

```bash
npm run resize-images -- <max-width> <file-or-folder>...
# e.g. a new year's headshots: npm run resize-images -- 555 public/images/2027Headshots
```

Aim for about twice the width the image is shown at: 555 px is right for a headshot. A full-width page header is shown at every screen size, so save it at three widths, 1280, 1920 and 2880 px (the last with `--quality 70`), as `team4-1280.jpg`, `team4.jpg` and `team4-2880.jpg` are, and list them in `SRCSETS` in [`Header.js`](website/src/components/Header.js): each screen then downloads only the one it needs. The script also removes camera and location metadata. It overwrites the files it is given (unless you pass `--out`) and re-encodes them, so run it only on new images. See the comment at the top of [`resize-images.mjs`](website/scripts/resize-images.mjs) for its options.

---

## License

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for details.

---

**Blackbird UAV** – Soaring to New Heights! 🚀
