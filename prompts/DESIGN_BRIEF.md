# Design brief: Bayan (بيان)

Audience: children 6-14 (deaf and hearing), their parents and teachers, in Egypt. Mood: playful, warm, confident. Must feel hand-made by a designer, not template-generated.

## Concept
"Sticker book of hands." Every sign is a sticker: thick navy outline, flat color fill, small offset shadow, slight tilt. Pages feel like a friendly notebook of conversations. Speech bubbles are the recurring shape (the logo is a bubble with a hand).

## Tokens
- Ink (text, outlines): #10324A
- Teal (brand): #0FA3A3, Sun: #FFC72C, Coral: #FF6F59, Lilac: #B8A1FF, Mint: #BDF2D5
- Paper background: #F4FAFF (light), #0E2433 (dark). Each category owns a color: Everyday teal, Needs coral, Feelings lilac, Answers sun.
- Outline 3px ink; offset shadow 0 4px 0 ink (flat, not blurred). Radius varies by role: 28px big stickers, 14px buttons, full-round chips. Do not use one radius everywhere.
- Fonts (Google Fonts, Arabic + Latin): headings "Baloo Bhaijaan 2" 800; body "Readex Pro" 400/600. Body 18px min, line-height 1.7, lines under 70 characters. Sentence case, no all-caps labels.

## Icons and illustration
- Replace every emoji with custom inline SVG drawn in the same style: 3px ink stroke, round caps, flat fills from the palette, 64x64 grid. One icon per sign (14 now, 60+ later), per category, per nav item.
- Mascot: a friendly waving hand character with big eyes (name it in code as "Bayan hand"), used on Home hero, empty states, quiz feedback (cheering / thinking). Keep it simple: shapes only.
- Logo: logo.svg (speech bubble + hand) is v1. Refine proportions, add a favicon.svg and a wordmark lockup: "Bayan" in Baloo + "بيان" side by side. Logo must work at 24px and on dark.

## Motion (small, purposeful, all disabled under prefers-reduced-motion)
- Hero: the mascot hand waves once on load, then only on tap.
- Tiles: press = squish down (translateY 4px, shadow collapses), release = spring back. No hover effects on every card.
- Express page: tapped need grows to full screen with a bouncy scale-in; the word pops in letter by letter.
- Quiz: correct = confetti burst of palette-colored shapes and mascot cheers; wrong = gentle shake and the right answer pulses. Never rely on sound or color alone.
- Learned mark: a check that draws itself (stroke-dashoffset).
- Page change: 200ms slide of the content area only. No scroll-triggered fade-ins.
- Background: 3-4 slow-floating blobs behind the hero only.

## Layout
- Home: asymmetrical hero, mascot at the inline-end side, headline + two big buttons; below it a "sign of the day" sticker slightly tilted, then category shelves as horizontal scrollers.
- Signs: large sticker grid, category filter as colored chips with icons, search field shaped like a speech bubble.
- Sign detail: big sticker centered, word huge, Arabic and English together, listen and learned buttons below with icons.
- Express: 2-column grid of very large need stickers (min 140px), one-tap, high contrast.
- Everything mirrors correctly in RTL (logical properties, icons with direction flipped only when meaningful).

## Deaf-first accessibility
Visual feedback for every action, no audio-only cues, captions for any audio, focus ring 4px sun color with ink outline, targets 56px+, contrast AA, text-size control kept, no flashing over 3 per second.

## Avoid (looks AI-generated)
Cream background with serif headings and terracotta accent; identical rounded cards with soft grey shadows; gradient washes as decoration; emoji as icons; all-caps eyebrow labels; "Learn more →" arrows; fade-up on every section; purple-to-blue gradients.

## Deliverables
style.css with the tokens above, icons/ (SVG per sign and category), logo.svg + favicon.svg + wordmark, mascot.svg with 3 poses (wave, cheer, think), updated pages, and screenshots at 360px and 1280px in both languages and both themes.
