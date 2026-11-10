# Project: Bayan (بيان), Batool's Sign Language Website (competition, round 2)
(Name note: "Wasla" is Eng. Abdullah's own graduation project, so it is NOT used here. Name is one constant in the header/title: easy to change.)

## Context
- Owner: Batool (13 y/o). Mentor: Eng. Abdullah Sherdy. Not a course project: it is a competition entry, delivered fast.
- Replaces an old MIT App Inventor app: Home (banner "Sign Language: Connect · Express · Include" + 4 signs: Hello, Thank you, Sorry, Help, each with a "Know more" button) and a detail screen (sign image, one-line explanation, "Return to main screen", tap image to hear explanation).
- Audience: deaf/hard-of-hearing children and their families, teachers, hearing learners.

## Requirements
1. Website, Arabic + English (RTL/LTR switch, remembered).
2. More signs than the old app (currently 14; target 60+ in categories: everyday, needs, feelings, answers, numbers, Arabic letters, family, school).
3. Elegant UI, visual-first UX for deaf users: sign picture/video is the hero, sound optional, big tap targets, high contrast, text-size control, no flashing, no autoplay audio.
4. Student-buildable features: search, categories, detail page, learned checkmarks (localStorage), practice quiz, optional speech (Web Speech API), fingerspelling tool (type a word, show letter tiles in order), sign of the day.
5. Footer on every page, both languages: "All rights reserved to Batool · Mentored by Eng. Abdullah Sherdy" / "جميع الحقوق محفوظة لبتول · بإشراف م. عبدالله شردي".
   The mentor's name in the footer links to https://abdullahsherdy.tech (opens in a new tab). Do not remove the link.
6. Later: presentation (startup/innovation framing) and detailed documentation.

## Tech rules
- Plain HTML/CSS/JS, no build step, no framework. Static hosting (GitHub Pages / Netlify).
- Signs live in one data array/JSON (id, category, en, ar, descriptions, media). Adding a sign = adding one entry.
- Media convention: signs/<id>.jpg (or .mp4/.gif); emoji is only a fallback. Alphabet: alphabet/<letter>.jpg.
- Accessibility: semantic HTML, aria-labels, visible focus, prefers-reduced-motion, WCAG AA contrast, light + dark themes.
- Wrap localStorage in try/catch. Hash routes only (#home, #signs, #sign-<id>, #quiz, #about).
- Typographic punctuation in visible text (’ “ ”).

## Content rules (important)
- Never invent hand-shape descriptions. Sign accuracy must be reviewed by a deaf community member or specialist; decide Egyptian vs Unified Arabic Sign Language and state it on the About page.
- Media must be recorded by Batool or properly credited. No copied images without credit.

## Working style
- Keep the code readable by a 13-year-old: short functions, clear names, comments in simple English.
- Make small changes, test in the browser, keep the file working at every step.
- Done = bilingual, responsive on phone, footer present, no console errors.

## Deliverables
1. Website (current state: index.html, single file, 14 signs, quiz, learned marks, speech, bilingual).
2. docs/DOCUMENTATION.md: problem, users, features, architecture, data format, how to add a sign, accessibility, testing, limitations, roadmap, credits.
3. Presentation (10 to 12 slides): problem, users, solution, demo pages, features, UX for deaf users, how it is built, impact, startup model, roadmap, thank you.

## Positioning (decided)
Bayan is a bridge between deaf and hearing people, in three stages that match the old banner's icons (Learn, Communicate, Community):
1. Learn (built): sign dictionary, quiz, learned marks.
2. Communicate (research, shown on the #next page): emergency phrase cards, type a word to see signs, tools for hearing people to reply.
3. Community (research): user-suggested signs reviewed by specialists, videos from deaf signers.
Pitch it as a learning product now with a communication roadmap. Do not claim research features exist.

## Audio rules
- Preferred: recorded audio by a native Arabic speaker at audio/ar/<id>.mp3 and audio/en/<id>.mp3 (the site plays these first).
- Fallback: browser text-to-speech (ar-SA, diacritics stripped, rate 0.85). Quality varies by device; test on Android and iPhone and list words that sound wrong, then record those.

## Sign verification status
- Target variety: Egyptian Sign Language, cross-checked against the Unified Arabic Sign Dictionary (Arab League / CAMSA). Sign visuals are a prototype until reviewed by a deaf signer, interpreter or specialist.
- The About page states this honestly (key a3 in both languages). Update it only after a real review, naming the reviewer.
- Never copy images/videos from other apps or dictionaries; record new ones.

## Domain and users (decided, overrides earlier wording)
- Domain: assistive communication technology (accessibility and inclusion), family-first. One-line pitch: "Bayan helps families learn sign language and lets deaf people express their needs."
- Primary users: parents of deaf children and anyone who wants to communicate with deaf people (Learn + Practice pages).
- Secondary users: deaf people themselves (Express page, #express: tap a need picture, the word shows full-screen in large Arabic/English text and is spoken aloud so the hearing person understands).
- Still research (roadmap page): emergency phrases, typing a word to see its signs, replies from hearing people, community-reviewed signs, camera sign recognition.
- Impact framing for judges: inclusion of deaf children in families and schools; reduces communication gaps at home, school and public places.

## Visual design
Follow DESIGN_BRIEF.md exactly (sticker style, custom SVG icons, mascot, logo.svg, purposeful animation, anti-AI-look rules). Design pass comes before adding more signs.
