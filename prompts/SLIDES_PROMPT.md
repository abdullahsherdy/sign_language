# Prompt for building the Bayan presentation in another Claude chat

How to use it:

1. Open a new chat on claude.ai.
2. Attach these 12 images from the repo:
   - `docs/presentation-assets/`: `wordmark.png`, `logo.png`, `mascot-wave.png`, `mascot-cheer.png`, `mascot-think.png`, `phone-home-ar.png`, `phone-signs-ar.png`, `phone-detail-ar.png`, `phone-express-open-ar.png`
   - `docs/screenshots/`: `home-ar-1280-light.png`, `quiz-ar-1280-light.png`, `next-ar-1280-light.png`
3. Paste everything below the line into the message and send.
4. Before presenting, install the two free fonts on the laptop (search "Baloo Bhaijaan 2" and "Readex Pro" on fonts.google.com). PowerPoint swaps in another font if they are missing.

---

Create a 12-slide PowerPoint file (.pptx, 16:9) for a 13-year-old student, Batool, to present her project "Bayan" (بيان) to a competition judging panel in Egypt. Use the attached images. Give me the .pptx file to download.

## About the project

Bayan is a bilingual Arabic/English website for families of deaf children and for deaf people. One-line pitch: "بيان يساعد الأسر على تعلّم لغة الإشارة، ويتيح للصمّ التعبير عن احتياجاتهم." (Bayan helps families learn sign language and lets deaf people express their needs.) It started as a 4-sign MIT App Inventor app; the website is version 2. It is plain HTML, CSS and JavaScript, hosted free on GitHub Pages. Batool built it with her mentor, Eng. Abdullah Sherdy.

## Language and direction

- Every slide is in Arabic, right-to-left: right-aligned text and RTL paragraph direction, with the reading order starting on the right. English appears only as small secondary text (the project name, technical terms in brackets).
- Simple Arabic a 13-year-old says comfortably. Short phrases, not paragraphs. At most 5 bullets per slide.
- Put speaker notes in Arabic under every slide, written as what Batool says out loud in 30 to 60 seconds, in a friendly first-person voice.

## Visual style (must match the website)

Style name: "sticker book of hands". Every card looks like a sticker.

- Colors: ink #10324A (text and outlines), teal #0FA3A3, sun #FFC72C, coral #FF6F59, lilac #B8A1FF, mint #BDF2D5, background #F4FAFF. Use white #FFFFFF for card fills.
- Cards: rounded rectangles with a 3pt #10324A outline and a flat, unblurred shadow (a #10324A copy of the shape offset 4pt down, placed behind it). Tilt some cards 1 to 2 degrees, alternating direction. Big cards have rounder corners than small buttons.
- Screenshots sit inside the same sticker frame, slightly tilted.
- Fonts: headings "Baloo Bhaijaan 2" (extra bold), body "Readex Pro". Body text 20pt or larger, titles 40pt or larger. Dark text on light backgrounds for strong contrast.
- Each section can use one category color as an accent: teal for learning, coral for needs and problems, lilac for feelings and the future, sun for highlights and buttons.
- Use the mascot images ("Bayan hand") on the title slide (wave), the problem slide (think) and the last slide (cheer).
- Do not use: emoji, stock photos, gradients, all-caps labels, glows or blurred shadows, clip-art icons, or "Learn more →" arrows. Keep slides uncluttered with plenty of space.

## Slides

1. Title. Wordmark image large. «بيان» and below it the pitch sentence. Small: «بتول · بإشراف م. عبدالله شردي». Mascot wave image at the left side.
2. المشكلة. A short story: a deaf child in a hearing family needs water, the toilet or help, and the people around them don't understand quickly. The same happens at school and in public places. Mascot think image. Do not add any statistic. Leave an empty sticker labelled «[رقم من مصدر موثوق]» that Batool may fill later.
3. المستخدمون. Two stickers. الأساسيون: أسر الأطفال الصمّ، والمعلّمون، وكل من يريد التواصل مع الصمّ. الثانويون: الصمّ أنفسهم (صفحة «عبّر»).
4. الحل: بيان = تعلّم + تعبير. Two stickers side by side. تعلّم: قاموس إشارات، لعبة تدريب، علامات «تعلّمتها». تعبير: اضغط صورة الحاجة ← تظهر الكلمة كبيرة وتُقرأ بصوت عالٍ. Use `phone-express-open-ar.png`.
5. جولة في الموقع. Three phone screenshots in a row: `phone-home-ar.png`, `phone-signs-ar.png`, `phone-detail-ar.png`, with one short caption under each: الرئيسية، القاموس والبحث، صفحة الإشارة.
6. الميزات. Use `quiz-ar-1280-light.png` plus a short list: عربي وإنجليزي مع تبديل الاتجاه، بحث فوري، مجموعات بالألوان، لعبة تدريب، علامات «تعلّمتها»، قراءة بصوت مع نص مكتوب، وضع داكن وتكبير الخط.
7. تصميم للصمّ أولًا. Four stickers: الصورة هي البطل؛ لا صوت بدون نص مكتوب؛ أزرار كبيرة (56 بكسل على الأقل)؛ النتيجة تظهر بلون وعلامة وكلمات، وليس باللون وحده. Small footnote: يتبع معيار WCAG AA لسهولة الوصول.
8. كيف بنيته. A house drawn from simple shapes, or four stickers: `index.html` الهيكل (الجدران)، `style.css` الشكل (الدهان)، `app.js` التفاعل (الكهرباء)، `signs.json` الإشارات (المكتبة). One line: إضافة إشارة جديدة = سطر واحد في ملف البيانات. One line: استضافة مجانية على GitHub Pages، ولا يجمع أي بيانات شخصية.
9. الأثر. دمج الأطفال الصمّ في الأسرة والمدرسة؛ تقليل فجوة التواصل في البيت والمدرسة والأماكن العامة. Do not claim numbers of users or test results.
10. كيف يستمر؟ Present these as a plan, not results: مجاني دائمًا للأسر؛ شراكات مع مدارس الدمج وجمعيات الصمّ لمراجعة الإشارات وتصويرها؛ رعاية من مؤسسات مهتمة بالمسؤولية المجتمعية.
11. ما القادم. Use `next-ar-1280-light.png` or rebuild it as three stickers. 1 تعلّم: جاهز. 2 تواصل: صفحة «عبّر» جاهزة؛ بطاقات الطوارئ وأدوات رد السامعين قيد البحث. 3 مجتمع: إشارات يقترحها المستخدمون ويراجعها مختصون، فيديوهات من أشخاص صمّ، التعرّف بالكاميرا؛ كلها قيد البحث. Mark every item clearly as «جاهز» or «قيد البحث».
12. شكرًا. «شكرًا لكم» large, mascot cheer image, the site link `abdullahsherdy.github.io/sign_language`, and «هل لديكم أسئلة؟». Small footer: «جميع الحقوق محفوظة لبتول · بإشراف م. عبدالله شردي».

## Honesty rules (important)

- Do not invent statistics, user numbers, awards, partnerships, test results or quotes.
- Never present an item marked «قيد البحث» as finished.
- Somewhere visible (slide 7 or 8, small text) include: «الإشارات نموذج أولي ولم يراجعها مختص بعد؛ نعتمد لغة الإشارة المصرية مع المراجعة على القاموس الإشاري العربي الموحّد.»
- The pictures on the website show what a word means; they are not hand-shape instructions. Don't describe how to make any sign.

When you are done, list any slide where you had to guess, so I can check it.
