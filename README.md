# Bayan (بيان)

A bilingual Arabic and English website that helps families learn sign language and lets deaf people express their needs. Made by Batool, mentored by Eng. Abdullah Sherdy.

Plain HTML, CSS and JavaScript. There is no build step and nothing to install.

## Signing demonstrations

All 14 signs use real signer posters and videos from the [Saudi Sign Language Dictionary](https://sshi.sa/). Clicking a dictionary card opens the movement with pause, replay and half-speed controls. Practice and Express use the same player. Reduced-motion users start playback manually.

These are **Saudi Sign Language references**, not verified Egyptian signs. This distinction is shown in both interface languages. Egyptian regional review and replacement recordings are still needed for the project's Egyptian focus.

Media streams directly from the credited source; it is not bundled or available offline. Each player links to its original dictionary entry, which remains accessible if a video fails. The external service can change its URLs or availability.

Each `demonstration` in `data/signs.json` contains `src`, `poster`, `sourceUrl`, bilingual source credits, and bilingual sign-language labels. Replace those fields together when adding reviewed Egyptian recordings. Preserve the original source's permissions and credit for any replacement media.

Run the dependency-free rendering checks with `node --test` (Node.js 18+).

## Run it on your computer

The signs load from `data/signs.json`, and browsers block that when you double-click `index.html`. Start a small local server in this folder instead:

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Put it online with GitHub Pages

1. Push the `main` branch to GitHub.
2. Open the repository's Settings, then Pages.
3. Under "Build and deployment", choose "Deploy from a branch", branch `main`, folder `/ (root)`, and save.
4. After a minute the site is live at `https://<username>.github.io/sign_language/`.

All links in the site are relative and pages use hash routes (`#signs`, `#quiz`), so it works from a sub-folder URL with no extra setup. The empty `.nojekyll` file tells GitHub to serve the files as they are.

## Files

| Path | What it holds |
|------|---------------|
| `index.html` | Page shell, header, footer and the small interface icons |
| `style.css` | Design tokens, sticker style, motion, light and dark themes |
| `app.js` | Pages, language switch, quiz, Express, speech, learned marks |
| `data/signs.json` | Every sign and category; add a sign by adding one entry |
| `icons/` | Category illustrations and legacy word drawings; current sign cards use signer posters |
| `logo.svg`, `favicon.svg`, `wordmark.svg` | Brand marks |
| `mascot.svg` | The "Bayan hand" in three poses: wave, cheer, think |
| `docs/BATOOL_GUIDE_AR.md` | Arabic guide for Batool: every page explained, plus presentation and judges prep |
| `docs/screenshots/` | Screenshots at 360px and 1280px, Arabic and English, light and dark |
