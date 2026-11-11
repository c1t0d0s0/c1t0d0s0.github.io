/* ==========================================================================
   THE LEARNING ZOO - super animals
   An animal turns into its golden "super" form while its subject's daily task
   has been done 7 days in a row, and turns back when the run is broken.
     math     - math-quiz           今日のチャレンジ
     japanese - kokugo-master       今日のチャレンジ
     science  - science-quiz        今日の10問
     social   - social-studies-quiz 今日のチャレンジ
   The days come from the records the apps keep in this browser (localStorage,
   same origin) and, when logged in, from Firestore (handed over by progress.js).
   Dates are Japan dates (YYYY-MM-DD), the same as in the apps.
   When all four subject animals are super at once, the lion family turns super too.
   ========================================================================== */

/* ---------- Pure helpers (exported so they can be checked with Node) ---------- */

export const SUPER_RUN = 7;

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const MATH_DAILY = /^daily:(\d{4}-\d{2}-\d{2})$/;

/** Today's date in Japan */
export function jstDate(now = new Date()) {
  return new Date(now.getTime() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

export function addDays(date, days) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const dayList = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string' && DAY.test(x)) : []);

/** Days in a row up to `today`. A run that reached yesterday still counts: today is not over yet. */
export function currentRun(days, today) {
  const set = new Set(days);
  let day = set.has(today) ? today : addDays(today, -1);
  let n = 0;
  while (set.has(day)) {
    n++;
    day = addDays(day, -1);
  }
  return n;
}

export function isSuper(days, today) {
  return currentRun(days, today) >= SUPER_RUN;
}

/** math-quiz marks a finished 今日のチャレンジ as "daily:<date>" among its clears */
function mathDays(clears) {
  const days = [];
  for (const id of Array.isArray(clears) ? clears : []) {
    const m = typeof id === 'string' ? MATH_DAILY.exec(id) : null;
    if (m) days.push(m[1]);
  }
  return days;
}

export const SUBJECT_APPS = {
  math: 'math-quiz',
  japanese: 'kokugo-master',
  science: 'science-quiz',
  social: 'social-studies-quiz',
};

/** Days the daily task was done, from the app's Firestore document (users/{uid}/apps/{appId}) */
export function daysFromDoc(subject, doc) {
  if (!doc) return [];
  // In the other three apps activeDays is exactly "the daily task was finished that day"
  return subject === 'math' ? mathDays(doc.completed) : dayList(doc.activeDays);
}

function readJSON(storage, key) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/** The three newer apps keep guest records under "<ns>:v1:" and a logged-in copy under "<ns>:u:<uid>:" */
function prefixOf(storage, ns) {
  let uid = null;
  try { uid = storage.getItem(`${ns}:auth-uid`); } catch (e) { /* no storage */ }
  return uid ? `${ns}:u:${uid}:` : `${ns}:v1:`;
}

/** Days the daily task was done, from the records the app keeps in this browser */
export function daysFromLocal(subject, storage) {
  try {
    if (subject === 'math') {
      const saved = readJSON(storage, 'math_quiz_rewards');
      return mathDays(saved && saved.clears);
    }
    if (subject === 'japanese') return dayList(readJSON(storage, `${prefixOf(storage, 'kokugo')}stamps`));
    if (subject === 'social') return dayList(readJSON(storage, `${prefixOf(storage, 'shakai')}stamps`));
    if (subject === 'science') {
      // One key per finished day: <prefix>done:<date>
      const head = `${prefixOf(storage, 'science-quiz')}done:`;
      const days = [];
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key && key.startsWith(head) && DAY.test(key.slice(head.length))) days.push(key.slice(head.length));
      }
      return days;
    }
  } catch (e) { /* storage blocked: no local records */ }
  return [];
}

/** { math, japanese, science, social } -> true while that animal is super */
export function superStates(storage, docs, today) {
  const states = {};
  for (const [subject, appId] of Object.entries(SUBJECT_APPS)) {
    const days = [...(storage ? daysFromLocal(subject, storage) : []), ...daysFromDoc(subject, docs && docs[appId])];
    states[subject] = isSuper(days, today);
  }
  return states;
}

/* ---------- Page ---------- */

const GOLD = '#ffd84a';
const DEEP = '#f5b301';

// Which fur colours turn golden (fill / stroke attributes of the drawing)
const ANIMALS = {
  math: { cls: 'monkey', name: 'リスザル', fur: { '#e3b84f': GOLD, '#6b6558': DEEP }, aura: '' },
  japanese: { cls: 'lynx', name: 'オオヤマネコ', fur: { '#e9bd72': GOLD, '#8c5a33': DEEP }, aura: '' },
  science: { cls: 'shiba', name: '柴犬', fur: { '#e0a05a': GOLD }, aura: '' },
  // The sparrow is small and sits low in its frame
  social: { cls: 'sparrow', name: 'スズメ', fur: { '#b9763f': GOLD, '#8c5a33': DEEP }, aura: 'translate(60 160) scale(.74) translate(-60 -160)' },
};

const FLAME = 'M60 -8C66 8 80 10 84 0C88 16 104 24 112 16C108 36 122 50 130 46C122 66 130 84 126 100C124 126 104 156 60 160C16 156 -4 126 -6 100C-10 84 -2 66 -10 46C-2 50 12 36 8 16C16 24 32 16 36 0C40 10 54 8 60 -8Z';
const SPARK = 'M0 -7L1.8 -1.8L7 0L1.8 1.8L0 7L-1.8 1.8L-7 0L-1.8 -1.8Z';

/* Flame tongues standing around an ellipse (cx, cy, rx, ry) of the aura: tallest on top, shorter
   down the sides. Each one flickers on its own (CSS .super-tongue with its own duration and delay). */
function fireMarkup(gradId, cx, cy, rx, ry, height) {
  const angles = [160, 180, 197, 214, 232, 250, 270, 290, 308, 326, 343, 360, 380];
  const tongues = angles.map((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const x = cx + rx * 0.86 * Math.cos(a);
    const y = cy + ry * 0.86 * Math.sin(a);
    const up = Math.max(0, -Math.sin(a));                 // 1 at the top, 0 at the sides
    const h = height * (0.55 + 0.6 * up) * (i % 2 ? 0.82 : 1);
    const w = h * 0.42;
    const tilt = Math.cos(a) * 18 * (1 - up);              // side flames lean outward a little
    const d = `M${-w / 2} 0C${-w / 2} ${-h * 0.42} ${-w * 0.12} ${-h * 0.6} 0 ${-h}C${w * 0.12} ${-h * 0.6} ${w / 2} ${-h * 0.42} ${w / 2} 0Z`;
    const dur = (0.48 + ((i * 7) % 5) * 0.09).toFixed(2);
    const delay = (-((i * 0.37) % 1)).toFixed(2);
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${tilt.toFixed(1)})"><path class="super-tongue" style="--d:${dur}s;--delay:${delay}s" d="${d}" fill="url(#${gradId})"/></g>`;
  }).join('');
  const embers = [[-0.55, 0.4], [-0.2, 0.15], [0.25, 0.3], [0.6, 0.45], [0.05, 0.6]].map(([dx, dy], i) =>
    `<circle class="super-ember" style="--d:${(1.5 + i * 0.27).toFixed(2)}s;--delay:${(-i * 0.41).toFixed(2)}s;--drift:${(i % 2 ? 6 : -6)}px"`
    + ` cx="${(cx + dx * rx).toFixed(1)}" cy="${(cy + dy * ry).toFixed(1)}" r="${i % 2 ? 2.2 : 2.8}" fill="#ffe680"/>`).join('');
  return `<linearGradient id="${gradId}" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="#fff6c2" stop-opacity=".95"/>
        <stop offset=".35" stop-color="#ffd23a" stop-opacity="1"/>
        <stop offset=".7" stop-color="#ff8c1a" stop-opacity=".95"/>
        <stop offset="1" stop-color="#f2540c" stop-opacity=".2"/>
      </linearGradient>
      <g class="super-fire">${tongues}</g>
      <g class="super-embers">${embers}</g>`;
}

function auraMarkup(cls, transform) {
  const id = `super-glow-${cls}`;
  const spark = (x, y, s, i) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="super-spark super-spark-${i}" d="${SPARK}" fill="#fffbe0" stroke="${DEEP}" stroke-width="1"/></g>`;
  return `
    <g class="super-aura"${transform ? ` transform="${transform}"` : ''}>
      <radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="60" cy="96" r="92">
        <stop offset="0" stop-color="#fffbe0" stop-opacity=".95"/>
        <stop offset=".55" stop-color="#ffe14d" stop-opacity=".8"/>
        <stop offset=".85" stop-color="#ffb300" stop-opacity=".35"/>
        <stop offset="1" stop-color="#ffb300" stop-opacity="0"/>
      </radialGradient>
      <g class="super-burst">
        ${fireMarkup(`super-tongue-${cls}`, 60, 92, 62, 70, 54)}
        <path class="super-flame super-flame-a" d="${FLAME}" fill="url(#${id})"/>
        <g opacity=".55" transform="translate(60 160) scale(.8) translate(-60 -160)"><path class="super-flame super-flame-b" d="${FLAME}" fill="#fff6b8"/></g>
        ${spark(2, 30, 1, 1)}${spark(121, 58, .8, 2)}${spark(-6, 112, .7, 3)}${spark(112, 6, .6, 4)}
      </g>
    </g>`;
}

function svgNodes(markup) {
  const doc = new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${markup}</svg>`, 'image/svg+xml');
  return Array.from(doc.documentElement.children).map((n) => document.importNode(n, true));
}

function setSuper(subject, on) {
  const animal = ANIMALS[subject];
  const title = document.getElementById(`subject-${subject}`);
  const habitat = title && title.closest('.habitat');
  const svg = habitat && habitat.querySelector(`.animal.${animal.cls}`);
  if (!svg || habitat.classList.contains('is-super') === on) return;
  const plaque = habitat.querySelector('.plaque');

  habitat.classList.toggle('is-super', on);
  if (on) {
    for (const node of svgNodes(auraMarkup(animal.cls, animal.aura))) svg.prepend(node);
    for (const el of svg.querySelectorAll('[fill], [stroke]')) {
      if (el.closest('.super-aura')) continue;
      for (const attr of ['fill', 'stroke']) {
        const to = animal.fur[el.getAttribute(attr)];
        if (!to) continue;
        el.setAttribute(`data-super-${attr}`, el.getAttribute(attr));
        el.setAttribute(attr, to);
      }
    }
  } else {
    svg.querySelectorAll('.super-aura').forEach((n) => n.remove());
    for (const attr of ['fill', 'stroke']) {
      for (const el of svg.querySelectorAll(`[data-super-${attr}]`)) {
        el.setAttribute(attr, el.getAttribute(`data-super-${attr}`));
        el.removeAttribute(`data-super-${attr}`);
      }
    }
  }
  const name = on ? `スーパー${animal.name}` : animal.name;
  svg.setAttribute('aria-label', name);
  if (plaque) plaque.textContent = name;
}

/* ---------- Lion family: super only when all four subject animals are ---------- */

// Fur, mane and tail-tuft colours of the lions (lions.js) that turn golden.
// The Santa coat (December) stays red; the father's face fur still turns golden.
const LION_FUR = {
  '#e8ab45': GOLD, '#ebb456': GOLD, '#f2c46c': GOLD,      // body / face fur (father, mother, cub)
  '#d39536': DEEP, '#d69d40': DEEP, '#ddae55': DEEP,      // far legs
  '#b25a2a': DEEP, '#d98a42': '#ffe680',                 // father's mane (outer / inner)
  '#8c4a22': DEEP, '#a8642e': DEEP,                      // tail tufts
};

function lionAuraMarkup(kind) {
  const id = `super-glow-lion-${kind}`;
  const spark = (x, y, sc, i) => `<g transform="translate(${x} ${y}) scale(${sc})"><path class="super-spark super-spark-${i}" d="${SPARK}" fill="#fffbe0" stroke="${DEEP}" stroke-width="1"/></g>`;
  return `
    <g class="super-aura super-aura-lion">
      <radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="88" cy="74" r="80">
        <stop offset="0" stop-color="#fffbe0" stop-opacity=".9"/>
        <stop offset=".55" stop-color="#ffe14d" stop-opacity=".7"/>
        <stop offset="1" stop-color="#ffb300" stop-opacity="0"/>
      </radialGradient>
      <g class="super-lion-burst">
        ${fireMarkup(`super-tongue-lion-${kind}`, 88, 74, 74, 46, 40)}
        <ellipse class="super-flame" cx="88" cy="74" rx="80" ry="54" fill="url(#${id})"/>
        ${spark(30, 26, 1, 1)}${spark(152, 40, .8, 2)}${spark(22, 98, .7, 3)}${spark(118, 6, .6, 4)}
      </g>
    </g>`;
}

function setLionSuper(lion, on) {
  const svg = lion.querySelector('svg');
  if (!svg || lion.classList.contains('is-super') === on) return;
  lion.classList.toggle('is-super', on);
  if (on) {
    const kind = (lion.className.match(/lion-(\w+)/) || [])[1] || 'lion';
    for (const node of svgNodes(lionAuraMarkup(kind))) svg.prepend(node);
    for (const el of svg.querySelectorAll('[fill], [stroke]')) {
      if (el.closest('.super-aura')) continue;
      for (const attr of ['fill', 'stroke']) {
        const to = LION_FUR[el.getAttribute(attr)];
        if (!to) continue;
        el.setAttribute(`data-super-${attr}`, el.getAttribute(attr));
        el.setAttribute(attr, to);
      }
    }
  } else {
    svg.querySelectorAll('.super-aura').forEach((n) => n.remove());
    for (const attr of ['fill', 'stroke']) {
      for (const el of svg.querySelectorAll(`[data-super-${attr}]`)) {
        el.setAttribute(attr, el.getAttribute(`data-super-${attr}`));
        el.removeAttribute(`data-super-${attr}`);
      }
    }
  }
}

let lionsSuper = false;
function setLionsSuper(on) {
  lionsSuper = on;
  document.querySelectorAll('.lion').forEach((lion) => setLionSuper(lion, on));
}

let cloudDocs = null;

/** ?super=all or ?super=lynx,shiba (animal or subject names) shows the super form for a look */
function forced() {
  const m = /[?&]super=([\w,-]+)/.exec(location.search);
  if (!m) return null;
  const names = m[1].split(',');
  const states = {};
  for (const [subject, a] of Object.entries(ANIMALS)) {
    states[subject] = names.includes('all') || names.includes(subject) || names.includes(a.cls);
  }
  return states;
}

export function refresh() {
  if (typeof document === 'undefined') return;
  let storage = null;
  try { storage = window.localStorage; } catch (e) { /* blocked */ }
  const states = forced() || superStates(storage, cloudDocs, jstDate());
  for (const subject of Object.keys(ANIMALS)) setSuper(subject, !!states[subject]);
  setLionsSuper(Object.keys(ANIMALS).every((subject) => states[subject]));
}

/** progress.js hands over the logged-in user's app documents ({ appId: data | null }), or null after logout */
export function setCloudDocs(docs) {
  cloudDocs = docs || null;
  refresh();
}

function start() {
  refresh();
  // The apps run in the viewer (same origin) and save there: look again when it closes or the tab comes back
  window.addEventListener('storage', refresh);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') refresh(); });
  const viewer = document.getElementById('viewer');
  if (viewer) {
    new MutationObserver(() => { if (viewer.hidden) refresh(); }).observe(viewer, { attributes: true, attributeFilter: ['hidden'] });
  }
  // The date changes while the page stays open
  setInterval(refresh, 10 * 60 * 1000);
  // In case the lions are drawn after this script runs
  const path = document.getElementById('lion-path');
  if (path) new MutationObserver(() => setLionsSuper(lionsSuper)).observe(path, { childList: true });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}
