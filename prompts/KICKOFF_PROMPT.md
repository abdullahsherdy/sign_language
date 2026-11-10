Read CLAUDE.md and DESIGN_BRIEF.md first. This folder has index.html (Bayan, بيان: a bilingual Arabic/English assistive-communication website for families of deaf children and deaf people) and logo.svg. Keep it working at every step and commit after each task.

1. Split into index.html, style.css, app.js and data/signs.json with identical behavior.
2. Design pass: implement DESIGN_BRIEF.md fully (tokens, fonts, sticker style, custom SVG icons replacing every emoji, mascot with 3 poses, refined logo plus favicon and wordmark, the listed animations, reduced-motion support, light and dark themes, RTL). Show me screenshots at 360px and 1280px in Arabic and English before continuing.
3. Expand signs.json to 60+ entries (everyday, needs, feelings, answers, numbers 1-10, family, school) with Arabic and English words and short usage descriptions only. Never invent hand-shape instructions. Each needs its own icon in icons/.
4. Add the #fingerspell page: type a word, show letter tiles in order (alphabet/<letter>.jpg, the letter as fallback), Arabic and English.
5. Add Sign of the day on Home.
6. Accessibility pass (keyboard, contrast, 56px targets, no flashing) and fix console errors.
7. Write docs/DOCUMENTATION.md (problem, users, features, architecture, data format, how to add a sign, design system, audio, accessibility, testing, limitations, roadmap, credits), English with an Arabic summary.
8. Create presentation.pptx (10 to 12 slides) in the same visual style, from the outline in CLAUDE.md, with screenshots of each page.

Do not change: the footer text and its link to https://abdullahsherdy.tech, the name Bayan, the #express page behavior, or the About page note about sign verification. Ask me before changing the palette.
