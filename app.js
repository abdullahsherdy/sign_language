// Bayan (بيان) by Batool.
// How this file is organised:
//   1. Saved settings   2. Words in two languages   3. Small helpers
//   4. Pages (one function per page)   5. Features (speech, quiz, express, learned)
//   6. Clicks and start-up

"use strict";

/* ---------- 1. Saved settings ---------- */

// localStorage can throw (private mode, blocked cookies), so we always use try/catch.
function loadSetting(key, fallback) {
  try {
    const value = localStorage.getItem("bayan-" + key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

function saveSetting(key, value) {
  try {
    localStorage.setItem("bayan-" + key, JSON.stringify(value));
  } catch {
    // Storage is blocked: the site still works, it just won't remember.
  }
}

const state = {
  lang: loadSetting("lang", "ar"),
  size: loadSetting("size", 0),
  learned: new Set(loadSetting("learned", [])),
  filter: "all",
  search: "",
  quiz: null,
  data: null,
};

/* ---------- 2. Words in two languages ---------- */

const WORDS = {
  en: {
    skip: "Skip to content",
    navLabel: "Main",
    navHome: "Home", navSigns: "Signs", navQuiz: "Practice", navExpress: "Express", navAbout: "About",
    langBtn: "عربي", langLabel: "التبديل إلى العربية",
    themeLabel: "Switch between light and dark", sizeLabel: "Change text size",
    sizeNames: ["normal", "large", "extra large"], textSize: "Text size: {s}",
    heroTitle: "Learn sign language together",
    heroText: "Bayan helps families learn sign language and lets deaf people express their needs.",
    start: "Start learning", expressNeed: "Express a need",
    shelvesTitle: "Browse by category", seeAll: "See all {c}",
    signsTitle: "Sign dictionary", searchLabel: "Search for a sign", searchPh: "Type a word…",
    all: "All", count: "{n} signs", noResults: "No signs match “{q}”. Try another word.",
    learnedBadge: "Learned", markLearned: "Mark as learned", isLearned: "Learned",
    listen: "Listen", speaking: "Speaking: “{w}”", noSpeech: "This browser cannot speak. Read the words on the screen.",
    backToSigns: "All signs", notFound: "We couldn’t find that sign.",
    quizTitle: "Practice", quizAsk: "Which word matches this picture?",
    questionOf: "Question {i} of {n}", score: "Score: {s}",
    correct: "Correct! Well done.", wrong: "Not quite. The answer is “{w}”.",
    nextQ: "Next question", quizDone: "You finished! You got {s} out of {n}.", restart: "Play again",
    expressTitle: "Express", expressText: "Tap a picture. The word appears big on the screen and is read aloud, so a hearing person understands.",
    close: "Close", sayAgain: "Say it again",
    aboutTitle: "About Bayan",
    a1: "Bayan is a website made by Batool, a 13-year-old student, to help families and friends of deaf children learn sign language.",
    a2: "It started as a small phone app with four signs. Now it has a sign dictionary, a practice game and an Express page that turns a picture into big words.",
    a3: "Sign language note: Bayan targets Egyptian Sign Language, cross-checked against the Unified Arabic Sign Dictionary. The sign pictures here are a prototype and have not yet been reviewed by a deaf signer, interpreter or specialist.",
    a4: "Pictures on this site show what a word means. They are not instructions for the hand shape. Real sign photos and videos recorded by Batool will replace them.",
    nextLink: "What comes next",
    nextTitle: "What comes next",
    nextIntro: "Bayan is a bridge between deaf and hearing people, built in three stages.",
    built: "Ready now", research: "Being researched",
    stageLearn: "Learn", stageComm: "Communicate", stageCommunity: "Community",
    rLearn: ["Sign dictionary", "Practice game", "Learned marks"],
    rCommBuilt: ["Express page"],
    rComm: ["Emergency phrase cards", "Type a word to see its signs", "Tools for hearing people to reply"],
    rCommunity: ["Signs suggested by users and checked by specialists", "Videos from deaf signers", "Camera sign recognition"],
    footerBefore: "All rights reserved to Batool · Mentored by ", mentor: "Eng. Abdullah Sherdy",
    loadError: "The signs could not load. If you opened the file directly, run a small local server (see README).",
  },
  ar: {
    skip: "تخطَّ إلى المحتوى",
    navLabel: "القائمة الرئيسية",
    navHome: "الرئيسية", navSigns: "الإشارات", navQuiz: "تدريب", navExpress: "عبّر", navAbout: "عن بيان",
    langBtn: "English", langLabel: "Switch to English",
    themeLabel: "التبديل بين الوضع الفاتح والداكن", sizeLabel: "تغيير حجم الخط",
    sizeNames: ["عادي", "كبير", "كبير جدًا"], textSize: "حجم الخط: {s}",
    heroTitle: "نتعلّم لغة الإشارة معًا",
    heroText: "بيان يساعد الأسر على تعلّم لغة الإشارة، ويتيح للصمّ التعبير عن احتياجاتهم.",
    start: "ابدأ التعلّم", expressNeed: "عبّر عن حاجة",
    shelvesTitle: "تصفّح حسب المجموعة", seeAll: "كل {c}",
    signsTitle: "قاموس الإشارات", searchLabel: "ابحث عن إشارة", searchPh: "اكتب كلمة…",
    all: "الكل", count: "{n} إشارة", noResults: "لا توجد إشارة تطابق «{q}». جرّب كلمة أخرى.",
    learnedBadge: "تعلّمتها", markLearned: "تعلّمت هذه الإشارة", isLearned: "تعلّمتها",
    listen: "استمع", speaking: "يُقرأ الآن: «{w}»", noSpeech: "هذا المتصفح لا يستطيع القراءة بصوت. اقرأ الكلمات على الشاشة.",
    backToSigns: "كل الإشارات", notFound: "لم نجد هذه الإشارة.",
    quizTitle: "تدريب", quizAsk: "أي كلمة تناسب هذه الصورة؟",
    questionOf: "السؤال {i} من {n}", score: "النقاط: {s}",
    correct: "إجابة صحيحة! أحسنت.", wrong: "ليست هذه. الإجابة الصحيحة «{w}».",
    nextQ: "السؤال التالي", quizDone: "انتهيت! حصلت على {s} من {n}.", restart: "العب مرة أخرى",
    expressTitle: "عبّر", expressText: "اضغط على صورة. تظهر الكلمة كبيرة على الشاشة وتُقرأ بصوت عالٍ ليفهمها الشخص السامع.",
    close: "إغلاق", sayAgain: "قلها مرة أخرى",
    aboutTitle: "عن بيان",
    a1: "بيان موقع صنعته بتول، طالبة عمرها ١٣ عامًا، لتساعد أسر الأطفال الصمّ وأصدقاءهم على تعلّم لغة الإشارة.",
    a2: "بدأ كتطبيق صغير على الهاتف فيه أربع إشارات. أصبح الآن قاموسًا للإشارات ولعبة تدريب وصفحة «عبّر» التي تحوّل الصورة إلى كلمات كبيرة.",
    a3: "ملاحظة عن لغة الإشارة: يعتمد بيان لغة الإشارة المصرية، مع المراجعة على القاموس الإشاري العربي الموحّد. صور الإشارات هنا نموذج أولي، ولم يراجعها بعد شخص أصمّ يستخدم الإشارة أو مترجم أو مختص.",
    a4: "الصور في الموقع توضّح معنى الكلمة، وليست شرحًا لشكل اليد. ستحلّ محلها صور وفيديوهات حقيقية تسجّلها بتول.",
    nextLink: "ما القادم",
    nextTitle: "ما القادم",
    nextIntro: "بيان جسر بين الصمّ والسامعين، يُبنى على ثلاث مراحل.",
    built: "جاهز الآن", research: "قيد البحث",
    stageLearn: "تعلّم", stageComm: "تواصل", stageCommunity: "مجتمع",
    rLearn: ["قاموس الإشارات", "لعبة التدريب", "علامات «تعلّمتها»"],
    rCommBuilt: ["صفحة «عبّر»"],
    rComm: ["بطاقات عبارات الطوارئ", "اكتب كلمة لترى إشاراتها", "أدوات تساعد السامعين على الرد"],
    rCommunity: ["إشارات يقترحها المستخدمون ويراجعها مختصون", "فيديوهات من أشخاص صمّ", "التعرّف على الإشارة بالكاميرا"],
    footerBefore: "جميع الحقوق محفوظة لبتول · بإشراف ", mentor: "م. عبدالله شردي",
    loadError: "لم نتمكن من تحميل الإشارات. إذا فتحت الملف مباشرة، شغّل خادمًا محليًا صغيرًا (راجع ملف README).",
  },
};

// t("count", {n: 5}) -> "5 signs"
function t(key, values = {}) {
  let text = WORDS[state.lang][key] ?? key;
  for (const [name, value] of Object.entries(values)) text = text.replace("{" + name + "}", value);
  return text;
}

/* ---------- 3. Small helpers ---------- */

const view = document.getElementById("view");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Make text safe before putting it inside HTML.
function esc(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function icon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

function mascot(pose, extraClass = "") {
  return `<svg class="mascot ${extraClass}" viewBox="0 0 160 160" aria-hidden="true"><use href="mascot.svg#${pose}"/></svg>`;
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function signs() { return state.data.signs; }
function findSign(id) { return signs().find((s) => s.id === id); }
function findCategory(id) { return state.data.categories.find((c) => c.id === id); }

// The word in the current language, and in the other one.
function word(sign) { return sign[state.lang]; }
function otherWord(sign) { return sign[state.lang === "ar" ? "en" : "ar"]; }
function otherLang() { return state.lang === "ar" ? "en" : "ar"; }
function desc(sign) { return state.lang === "ar" ? sign.descAr : sign.descEn; }
function catColor(sign) { return `--cat: var(--${findCategory(sign.category).color})`; }

// The picture for a sign: a real photo/video when recorded, otherwise the drawn icon.
function signArt(sign, size) {
  if (sign.media && sign.media.endsWith(".mp4")) {
    const auto = reduceMotion.matches ? "" : "autoplay";
    return `<video src="${esc(sign.media)}" ${auto} muted loop playsinline controls aria-label="${esc(word(sign))}"></video>`;
  }
  const src = sign.media || `icons/${sign.id}.svg`;
  return `<img src="${esc(src)}" alt="" width="${size}" height="${size}" loading="lazy">`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerHTML = `${icon("speaker")}<span>${esc(message)}</span>`;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 4000);
}

/* ---------- 4. Pages ---------- */

function stickerCard(sign) {
  const learned = state.learned.has(sign.id);
  return `
    <a class="sticker" href="#sign-${sign.id}" style="${catColor(sign)}">
      <span class="sticker-art">${signArt(sign, 96)}</span>
      <span class="sticker-label">
        <span class="sticker-word">${esc(word(sign))}</span>
        <span class="sticker-other" lang="${otherLang()}">${esc(otherWord(sign))}</span>
      </span>
      ${learned ? `<span class="learned-badge" title="${t("learnedBadge")}">${icon("check")}<span class="visually-hidden">${t("learnedBadge")}</span></span>` : ""}
    </a>`;
}

function renderHome() {
  const shelves = state.data.categories.map((cat) => {
    const items = signs().filter((s) => s.category === cat.id);
    return `
      <section class="shelf" style="--cat: var(--${cat.color})" aria-labelledby="shelf-${cat.id}">
        <div class="shelf-head">
          <h3 id="shelf-${cat.id}"><img class="cat-icon" src="icons/cat-${cat.id}.svg" alt="" width="40" height="40">${esc(cat[state.lang])}</h3>
          <a class="text-link" href="#signs" data-action="filter" data-cat="${cat.id}">${t("seeAll", { c: esc(cat[state.lang]) })}</a>
        </div>
        <div class="shelf-row">${items.map(stickerCard).join("")}</div>
      </section>`;
  }).join("");

  return `
    <section class="hero">
      <div class="blobs" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="hero-text">
        <h1 tabindex="-1">${t("heroTitle")}</h1>
        <p class="lead">${t("heroText")}</p>
        <div class="hero-buttons">
          <a class="btn btn-primary" href="#signs">${icon("signs")}${t("start")}</a>
          <a class="btn" href="#express">${icon("express")}${t("expressNeed")}</a>
        </div>
      </div>
      <button class="hero-mascot" type="button" data-action="wave" aria-label="${state.lang === "ar" ? "يد بيان تلوّح" : "Bayan hand waves"}">
        ${mascot("wave", "waving")}
      </button>
    </section>
    <h2 class="section-title">${t("shelvesTitle")}</h2>
    ${shelves}`;
}

function renderSigns() {
  const chips = [{ id: "all", en: WORDS.en.all, ar: WORDS.ar.all, color: "ink" }, ...state.data.categories]
    .map((cat) => `
      <button class="chip" type="button" data-action="filter" data-cat="${cat.id}"
        aria-pressed="${state.filter === cat.id}" style="--cat: var(--${cat.color})">
        ${cat.id === "all" ? icon("signs") : `<img src="icons/cat-${cat.id}.svg" alt="" width="32" height="32">`}
        ${esc(cat[state.lang])}
      </button>`).join("");

  return `
    <h1 tabindex="-1">${t("signsTitle")}</h1>
    <div class="search-bubble">
      <label class="visually-hidden" for="search">${t("searchLabel")}</label>
      ${icon("search")}
      <input id="search" type="search" autocomplete="off" placeholder="${t("searchPh")}" value="${esc(state.search)}" data-action="search">
    </div>
    <div class="chips" role="group" aria-label="${t("navSigns")}">${chips}</div>
    <p class="result-count" id="result-count" aria-live="polite"></p>
    <div class="grid" id="sign-grid"></div>`;
}

// Only the grid changes while typing, so the search box keeps focus.
function updateSignGrid() {
  const grid = document.getElementById("sign-grid");
  if (!grid) return;
  const query = state.search.trim().toLowerCase();
  const list = signs().filter((s) =>
    (state.filter === "all" || s.category === state.filter) &&
    (!query || s.en.toLowerCase().includes(query) || s.ar.includes(query)));
  grid.innerHTML = list.length
    ? list.map(stickerCard).join("")
    : `<div class="empty">${mascot("think")}<p>${t("noResults", { q: esc(state.search) })}</p></div>`;
  document.getElementById("result-count").textContent = t("count", { n: list.length });
}

function renderSign(id) {
  const sign = findSign(id);
  if (!sign) return `<div class="empty">${mascot("think")}<h1 tabindex="-1">${t("notFound")}</h1><a class="btn" href="#signs">${t("backToSigns")}</a></div>`;
  const learned = state.learned.has(sign.id);
  const cat = findCategory(sign.category);
  return `
    <a class="btn btn-small back" href="#signs">${icon("back")}${t("backToSigns")}</a>
    <article class="detail" style="${catColor(sign)}">
      <div class="detail-art">${signArt(sign, 220)}</div>
      <span class="cat-tag"><img src="icons/cat-${cat.id}.svg" alt="" width="28" height="28">${esc(cat[state.lang])}</span>
      <h1 tabindex="-1" class="detail-word">
        <span lang="ar">${esc(sign.ar)}</span>
        <span lang="en">${esc(sign.en)}</span>
      </h1>
      <p class="detail-desc">${esc(desc(sign))}</p>
      <div class="detail-actions">
        <button class="btn" type="button" data-action="speak" data-id="${sign.id}">${icon("speaker")}${t("listen")}</button>
        <button class="btn learned-btn" type="button" data-action="learned" data-id="${sign.id}" aria-pressed="${learned}">
          <svg class="icon draw-check" aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>
          <span>${learned ? t("isLearned") : t("markLearned")}</span>
        </button>
      </div>
    </article>`;
}

function renderExpress() {
  const needs = signs().filter((s) => s.express);
  return `
    <h1 tabindex="-1">${t("expressTitle")}</h1>
    <p class="lead">${t("expressText")}</p>
    <div class="need-grid">
      ${needs.map((s) => `
        <button class="need" type="button" data-action="express" data-id="${s.id}" style="${catColor(s)}">
          <span class="need-art">${signArt(s, 120)}</span>
          <span class="need-word">${esc(word(s))}</span>
        </button>`).join("")}
    </div>`;
}

function renderAbout() {
  return `
    <article class="prose">
      <h1 tabindex="-1">${t("aboutTitle")}</h1>
      <p>${t("a1")}</p>
      <p>${t("a2")}</p>
      <div class="note" role="note">${icon("about")}<p>${t("a3")}</p></div>
      <p>${t("a4")}</p>
      <a class="btn" href="#next">${icon("flag")}${t("nextLink")}</a>
    </article>`;
}

function renderNext() {
  const item = (text, ready) =>
    `<li class="${ready ? "ready" : "soon"}">${ready ? icon("check") : icon("flag")}<span>${esc(text)}</span>
       <span class="visually-hidden">(${ready ? t("built") : t("research")})</span></li>`;
  const W = WORDS[state.lang];
  const stage = (num, title, color, ready, later) => `
    <section class="stage" style="--cat: var(--${color})">
      <span class="stage-num" aria-hidden="true">${num}</span>
      <h2>${title}</h2>
      <ul>${ready.map((x) => item(x, true)).join("")}${later.map((x) => item(x, false)).join("")}</ul>
    </section>`;
  return `
    <h1 tabindex="-1">${t("nextTitle")}</h1>
    <p class="lead">${t("nextIntro")}</p>
    <p class="legend"><span class="ready">${icon("check")}${t("built")}</span><span class="soon">${icon("flag")}${t("research")}</span></p>
    <div class="stages">
      ${stage(1, t("stageLearn"), "teal", W.rLearn, [])}
      ${stage(2, t("stageComm"), "coral", W.rCommBuilt, W.rComm)}
      ${stage(3, t("stageCommunity"), "lilac", [], W.rCommunity)}
    </div>`;
}

/* ---------- 5. Features ---------- */

// Speech: recorded audio first (when the sign has "audio": true), browser voice as a fallback.
function speak(text, sign) {
  showToast(t("speaking", { w: text }));
  if (sign && sign.audio) {
    new Audio(`audio/${state.lang}/${sign.id}.mp3`).play().catch(() => speakWithBrowser(text));
    return;
  }
  speakWithBrowser(text);
}

function speakWithBrowser(text) {
  if (!("speechSynthesis" in window)) { showToast(t("noSpeech")); return; }
  speechSynthesis.cancel();
  // Arabic voices read better without tashkeel (diacritics).
  const clean = state.lang === "ar" ? text.replace(/[ً-ْ]/g, "") : text;
  const voice = new SpeechSynthesisUtterance(clean);
  voice.lang = state.lang === "ar" ? "ar-SA" : "en-US";
  voice.rate = 0.85;
  speechSynthesis.speak(voice);
}

function toggleLearned(id) {
  if (state.learned.has(id)) state.learned.delete(id);
  else state.learned.add(id);
  saveSetting("learned", [...state.learned]);
  const button = view.querySelector(`[data-action="learned"]`);
  const isOn = state.learned.has(id);
  button.setAttribute("aria-pressed", isOn);
  button.querySelector("span").textContent = isOn ? t("isLearned") : t("markLearned");
}

// Quiz: 8 random signs, each with 3 answer choices.
function newQuiz() {
  const questions = shuffle(signs()).slice(0, 8).map((answer) => {
    const wrong = shuffle(signs().filter((s) => s.id !== answer.id)).slice(0, 2);
    return { answer, options: shuffle([answer, ...wrong]) };
  });
  state.quiz = { questions, index: 0, score: 0, chosen: null };
}

function renderQuiz() {
  if (!state.quiz) newQuiz();
  const quiz = state.quiz;
  const total = quiz.questions.length;

  if (quiz.index >= total) {
    return `
      <div class="quiz-done">
        ${mascot("cheer", "cheering")}
        <h1 tabindex="-1">${t("quizDone", { s: quiz.score, n: total })}</h1>
        <button class="btn btn-primary" type="button" data-action="restart">${icon("restart")}${t("restart")}</button>
      </div>`;
  }

  const q = quiz.questions[quiz.index];
  const answered = quiz.chosen !== null;
  const options = q.options.map((opt) => {
    let mark = "";
    if (answered && opt.id === q.answer.id) mark = "is-correct";
    else if (answered && opt.id === quiz.chosen) mark = "is-wrong";
    return `
      <button class="option ${mark}" type="button" data-action="answer" data-id="${opt.id}" ${answered ? "disabled" : ""}>
        <span class="option-mark" aria-hidden="true">${mark === "is-correct" ? icon("check") : mark === "is-wrong" ? icon("close") : ""}</span>
        <span>${esc(word(opt))}</span><span class="option-other" lang="${otherLang()}">${esc(otherWord(opt))}</span>
      </button>`;
  }).join("");

  const right = quiz.chosen === q.answer.id;
  const feedback = answered
    ? `<div class="feedback ${right ? "good" : "bad"}">
         ${mascot(right ? "cheer" : "think", right ? "cheering" : "")}
         <p>${right ? t("correct") : t("wrong", { w: esc(word(q.answer)) })}</p>
         <button class="btn btn-primary" type="button" data-action="next-question">${t("nextQ")}</button>
       </div>`
    : "";

  return `
    <h1 tabindex="-1">${t("quizTitle")}</h1>
    <div class="quiz-bar">
      <span>${t("questionOf", { i: quiz.index + 1, n: total })}</span>
      <span class="progress" aria-hidden="true"><span style="width:${(quiz.index / total) * 100}%"></span></span>
      <span>${t("score", { s: quiz.score })}</span>
    </div>
    <div class="quiz-card" style="${catColor(q.answer)}">
      <div class="quiz-art">${signArt(q.answer, 180)}</div>
      <p class="quiz-ask">${t("quizAsk")}</p>
      <div class="options">${options}</div>
      <div role="status" aria-live="polite">${feedback}</div>
    </div>`;
}

function answerQuestion(id, button) {
  const quiz = state.quiz;
  if (quiz.chosen !== null) return;
  quiz.chosen = id;
  const right = id === quiz.questions[quiz.index].answer.id;
  if (right) quiz.score++;
  const rect = button.getBoundingClientRect();
  showPage(renderQuiz(), false);
  if (right) confetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
  else view.querySelector(".is-wrong")?.classList.add("shake");
  view.querySelector('[data-action="next-question"]')?.focus();
}

// Confetti: little palette shapes that fly out from the tapped answer.
function confetti(x, y) {
  if (reduceMotion.matches) return;
  const colors = ["--teal", "--sun", "--coral", "--lilac", "--mint"];
  const box = document.createElement("div");
  box.className = "confetti";
  box.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 26; i++) {
    const bit = document.createElement("span");
    const angle = (Math.PI * 2 * i) / 26;
    const distance = 70 + Math.random() * 90;
    bit.style.cssText = `left:${x}px; top:${y}px; background:var(${colors[i % colors.length]});
      --dx:${Math.cos(angle) * distance}px; --dy:${Math.sin(angle) * distance - 40}px; --r:${Math.random() * 540}deg`;
    if (i % 3 === 0) bit.classList.add("round");
    box.append(bit);
  }
  document.body.append(box);
  setTimeout(() => box.remove(), 1100);
}

// Express: the tapped need fills the screen in big words and is read aloud.
function openExpress(id, opener) {
  const sign = findSign(id);
  const letters = [...sign.en].map((ch, i) => `<span style="--i:${i}">${ch === " " ? "&nbsp;" : esc(ch)}</span>`).join("");
  const overlay = document.createElement("div");
  overlay.className = "express-full";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", word(sign));
  overlay.style.cssText = catColor(sign);
  overlay.innerHTML = `
    <div class="express-card">
      <div class="express-art">${signArt(sign, 200)}</div>
      <p class="express-ar" lang="ar">${esc(sign.ar)}</p>
      <p class="express-en" lang="en" aria-label="${esc(sign.en)}"><span aria-hidden="true">${letters}</span></p>
      <div class="express-actions">
        <button class="btn" type="button" data-action="speak-express" data-id="${sign.id}">${icon("speaker")}${t("sayAgain")}</button>
        <button class="btn btn-primary" type="button" data-action="close-express">${icon("close")}${t("close")}</button>
      </div>
    </div>`;
  overlay.returnFocus = opener;
  document.body.append(overlay);
  document.body.classList.add("no-scroll");
  overlay.querySelector('[data-action="close-express"]').focus();
  speak(word(sign), sign);
}

function closeExpress() {
  const overlay = document.querySelector(".express-full");
  if (!overlay) return;
  overlay.remove();
  document.body.classList.remove("no-scroll");
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  overlay.returnFocus?.focus();
}

/* ---------- Settings: language, theme, text size ---------- */

function applyLanguage() {
  const html = document.documentElement;
  html.lang = state.lang;
  html.dir = state.lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-label]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nLabel)); });
  document.querySelector('[data-action="size"]').setAttribute("aria-label", t("textSize", { s: t("sizeNames")[state.size] }));
  // The footer text must stay exactly as Batool wrote it, with the link on the mentor's name.
  const footer = document.getElementById("footer-text");
  footer.firstChild.textContent = t("footerBefore");
  footer.querySelector("a").textContent = t("mentor");
}

function currentTheme() {
  const chosen = document.documentElement.dataset.theme;
  if (chosen) return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function toggleTheme() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  saveSetting("theme", next);
}

function cycleSize() {
  state.size = (state.size + 1) % 3;
  document.documentElement.dataset.size = state.size;
  saveSetting("size", state.size);
  applyLanguage();
  showToast(t("textSize", { s: t("sizeNames")[state.size] }));
}

/* ---------- Router: #home, #signs, #sign-<id>, #quiz, #express, #about, #next ---------- */

const PAGES = { home: renderHome, signs: renderSigns, quiz: renderQuiz, express: renderExpress, about: renderAbout, next: renderNext };

function currentPage() {
  const hash = location.hash.slice(1) || "home";
  return hash.startsWith("sign-") || PAGES[hash] ? hash : "home";
}

function showPage(html, animate = true) {
  view.innerHTML = html;
  if (animate) {
    view.classList.remove("enter");
    void view.offsetWidth; // restart the slide animation
    view.classList.add("enter");
  }
  updateSignGrid();
}

function route(firstLoad = false) {
  closeExpress();
  const page = currentPage();
  const html = page.startsWith("sign-") ? renderSign(page.slice(5)) : PAGES[page]();
  showPage(html, !firstLoad);

  const navPage = page.startsWith("sign-") ? "signs" : page;
  document.querySelectorAll(".mainnav a").forEach((a) => {
    if (a.dataset.page === navPage) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  const heading = view.querySelector("h1");
  document.title = `${heading ? heading.textContent.trim().replace(/\s+/g, " ") : ""} · ${state.lang === "ar" ? "بيان" : "Bayan"}`;
  if (!firstLoad) {
    window.scrollTo(0, 0);
    heading?.focus({ preventScroll: true });
  }
}

/* ---------- 6. Clicks and start-up ---------- */

const ACTIONS = {
  lang() {
    state.lang = otherLang();
    saveSetting("lang", state.lang);
    applyLanguage();
    route(true);
  },
  theme: toggleTheme,
  size: cycleSize,
  filter(el, event) {
    state.filter = el.dataset.cat;
    if (currentPage() !== "signs") return; // the link itself goes to #signs
    event.preventDefault();
    view.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c.dataset.cat === state.filter));
    updateSignGrid();
  },
  speak(el) {
    const sign = findSign(el.dataset.id);
    speak(`${word(sign)}. ${desc(sign)}`, sign);
  },
  learned(el) { toggleLearned(el.dataset.id); },
  answer(el) { answerQuestion(el.dataset.id, el); },
  "next-question"() {
    state.quiz.index++;
    state.quiz.chosen = null;
    showPage(renderQuiz());
    view.querySelector("h1").focus();
  },
  restart() {
    newQuiz();
    showPage(renderQuiz());
    view.querySelector("h1").focus();
  },
  express(el) { openExpress(el.dataset.id, el); },
  "speak-express"(el) { const s = findSign(el.dataset.id); speak(word(s), s); },
  "close-express": closeExpress,
  wave(el) {
    const m = el.querySelector(".mascot");
    m.classList.remove("waving");
    void m.offsetWidth;
    m.classList.add("waving");
  },
};

document.addEventListener("click", (event) => {
  const el = event.target.closest("[data-action]");
  if (el && ACTIONS[el.dataset.action] && el.dataset.action !== "search") ACTIONS[el.dataset.action](el, event);
});

document.addEventListener("input", (event) => {
  if (event.target.dataset.action === "search") {
    state.search = event.target.value;
    updateSignGrid();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeExpress();
  // Keep keyboard focus inside the full-screen Express card.
  const overlay = document.querySelector(".express-full");
  if (overlay && event.key === "Tab") {
    const buttons = overlay.querySelectorAll("button");
    const first = buttons[0], last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) { last.focus(); event.preventDefault(); }
    else if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
  }
});

async function start() {
  applyLanguage();
  try {
    const response = await fetch("data/signs.json");
    if (!response.ok) throw new Error(response.status);
    state.data = await response.json();
  } catch {
    view.innerHTML = `<div class="empty"><p>${t("loadError")}</p></div>`;
    return;
  }
  window.addEventListener("hashchange", () => route());
  route(true);
}

start();
