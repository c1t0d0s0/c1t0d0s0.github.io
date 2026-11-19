/* ==========================================================================
   THE LEARNING ZOO - creatures of the sky (header of study.html)
     小鳥 (birds) - now and then a little flock, for 3 hours after sunrise
     ハヤブサ (falcon) - rarely during the day, crosses the sky fast in a straight line.
                      If the mouse is on the lions' walkway when it passes overhead, now and
                      then it dives for it ... and misses (the mouse dashes off just in time).
     カラス (crow) - now and then from 1 hour before sunset until sunset
     フクロウ (owl) - now and then at night, flies down and perches on the 算数 or 国語
                      board for a while (blinks, turns its head, ホー), then flies off.
                      Tapping it makes it fly off early.
   Sunrise / sunset come from SUN_TIMES and nowHours() in study.html (so ?month= and
   ?time= work here too). ?animal=bird,falcon,crow,owl (or all) shows them right away;
   ?animal=falcon,mouse makes the falcon always dive when it passes over the mouse.
   The mouse that visits the lions' walkway lives in lions.js.
   ========================================================================== */

import { forcedAnimals } from './lions.js';

const INK = '#1c2a4a';

/* ---------- Drawings (facing right) ---------- */

function birdSVG(color) {
  return `<svg viewBox="0 0 30 20" aria-hidden="true" focusable="false">
    <path d="M3 9L9 11L4 14Z" fill="${color}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
    <ellipse cx="14" cy="12" rx="8" ry="5.5" fill="${color}" stroke="${INK}" stroke-width="1.4"/>
    <ellipse cx="14" cy="14" rx="5" ry="2.6" fill="#fff6e0"/>
    <circle cx="21.5" cy="8.5" r="4.5" fill="${color}" stroke="${INK}" stroke-width="1.4"/>
    <path d="M25.5 7.6L29 9L25.5 10.2Z" fill="#f2b23a" stroke="${INK}" stroke-width="1" stroke-linejoin="round"/>
    <circle cx="23" cy="7.6" r="1.1" fill="${INK}"/>
    <path class="cr-wing" d="M10 11C12 4 18 3 19 10Z" fill="${color}" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>
  </svg>`;
}

function crowSVG() {
  return `<svg viewBox="0 0 60 34" aria-hidden="true" focusable="false">
    <path d="M4 15L16 17L6 24Z" fill="#23232c" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
    <ellipse cx="27" cy="19" rx="14" ry="8" fill="#23232c" stroke="${INK}" stroke-width="1.6"/>
    <circle cx="42" cy="14" r="7" fill="#23232c" stroke="${INK}" stroke-width="1.6"/>
    <path d="M48 12L58 15L48 18Z" fill="#3a3a46" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
    <circle cx="44.5" cy="12.5" r="1.6" fill="#fff"/>
    <path class="cr-wing" d="M18 17C22 4 34 2 38 16Z" fill="#2f2f3a" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
    <text class="cr-caw" x="44" y="2" font-size="9">カー</text>
  </svg>`;
}

// Peregrine falcon seen from above, head to the right (it is rotated to its heading).
// What makes it a ハヤブサ: long, narrow, pointed wings swept back like a sickle, a short
// narrow tail, slate-blue back, a dark hood with white cheeks and a black "moustache",
// and yellow eye rings. The lower wing is the upper one mirrored.
//   .fa-spread  wings spread (gliding; .is-flap flaps them)
//   .fa-stoop   wings tucked in for the dive (.is-stoop)
//   .fa-feet    talons thrust forward at the end of the dive (.is-strike)
const FA = '#55637a', FA_DEEP = '#333f52', FA_BACK = '#64738b', FA_HOOD = '#2b3445', FA_YELLOW = '#f2c14e';
function falconSVG() {
  const mirror = (inner) => `<g>${inner}</g><g transform="translate(0 64) scale(1 -1)">${inner}</g>`;
  const spread = `
      <path d="M44 28.5C47.5 23 48.5 16 45.5 10.5C41.5 5.5 33 2.5 23 1C28.5 5 31.5 9.5 32.5 15C33.2 20 32.6 25 32 28.5Z" fill="${FA}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M45.5 10.5C41.5 5.5 33 2.5 23 1C28.5 5 31.5 9.5 32.5 15C37 12.2 41.4 10.8 45.5 10.5Z" fill="${FA_DEEP}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M34 21Q40 19.6 46.8 20.4" fill="none" stroke="${FA_DEEP}" stroke-width="1.1" stroke-linecap="round"/>`;
  const stoop = `
      <path d="M46 28.6C42 25.4 32 24.4 17 26C28 28.4 38 29.2 46 29.6Z" fill="${FA}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`;
  const foot = `
      <path d="M49 29L60 24.4" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      <path d="M49 29L60 24.4" fill="none" stroke="${FA_YELLOW}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M58.6 21.6L64.6 22.6L63 26.8L58.4 27Z" fill="${FA_YELLOW}" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M64.6 22.6L66.4 23.8M63 26.8L64.8 27.6" fill="none" stroke="${INK}" stroke-width="1.3" stroke-linecap="round"/>`;
  const eye = `<circle cx="59.6" cy="29.4" r="1.6" fill="${INK}" stroke="${FA_YELLOW}" stroke-width=".8"/><circle cx="60.1" cy="28.9" r=".5" fill="#fff"/>`;
  const cheek = `<path d="M51.6 28.2Q55.4 25.2 60.8 26.6Q57.4 27.4 54.6 29.2Q53 29.4 51.6 28.2Z" fill="#f4f1ea"/>
      <path d="M57.4 26.4L56.4 29.4" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 80 64" aria-hidden="true" focusable="false">
    <g class="cr-glide">
      <path d="M25 29L10.6 28.2Q8.6 32 10.6 35.8L25 35Z" fill="${FA}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M15 29L15 35M19.4 29.2L19.4 34.8" fill="none" stroke="${FA_DEEP}" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M11.2 29.2Q9.8 32 11.2 34.8" fill="none" stroke="#e9eef5" stroke-width="1.3" stroke-linecap="round"/>
      <g class="fa-spread">${mirror(spread)}</g>
      <g class="fa-stoop">${mirror(stoop)}</g>
      <g class="fa-feet">${mirror(foot)}</g>
      <path d="M23 32C23 28.6 30 27.4 40 27.4C48 27.4 52.5 29.2 52.5 32C52.5 34.8 48 36.6 40 36.6C30 36.6 23 35.4 23 32Z" fill="${FA_BACK}" stroke="${INK}" stroke-width="1.6"/>
      <path d="M32 30L35 32L32 34M39 30L42 32L39 34" fill="none" stroke="#8593aa" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M62 30.2Q66.4 30.6 67.2 32Q66.4 33.4 62 33.8Z" fill="#8a96ad" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M65.6 31Q67.2 31.4 67.2 32Q67.2 32.6 65.6 33Z" fill="${INK}"/>
      <ellipse cx="56.5" cy="32" rx="6.6" ry="6.2" fill="${FA_HOOD}" stroke="${INK}" stroke-width="1.6"/>
      ${mirror(cheek)}
      <path d="M62.4 30.4Q63.6 32 62.4 33.6" fill="none" stroke="${FA_YELLOW}" stroke-width="1.4" stroke-linecap="round"/>
      ${mirror(eye)}
    </g>
  </svg>`;
}

// Owl seen from the front, feet at the bottom middle (60, 64). Folded wings and feet show
// while it perches (.ow-fold); spread, flapping wings while it flies (.ow-fly, .is-flying).
// A フクロウ: round head without ear tufts, pale heart-shaped face, big dark eyes.
const OWL = '#8f7a62', OWL_DEEP = '#6e5c48', OWL_FACE = '#eadfc8', OWL_BELLY = '#e2d3b4', OWL_FOOT = '#e8b04a';
// Mirror a path of absolute commands (M L C Q Z only) around the owl's middle line x = 60
const mirrorX = (d) => { let i = 0; return d.replace(/-?\d*\.?\d+/g, (n) => (i++ % 2 ? n : String(120 - Number(n)))); };

function owlSVG() {
  const wing = 'M47 28C38 20 24 14 6 16Q8 22 14 22Q16 28 22 27Q24 33 30 32Q32 38 38 36Q41 42 47 40Z';
  const bars = 'M16 19L20 24M26 18L30 27M36 21L38 32';
  const fold = 'M42 30C37 40 39 53 47 60C50 50 50 40 46 30Z';
  const flyWing = (side, d, b) => `<g class="ow-wing-${side}">
      <path d="${d}" fill="${OWL}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="${b}" fill="none" stroke="${OWL_DEEP}" stroke-width="1.4" stroke-linecap="round"/></g>`;
  const toes = (xs) => xs.map((x) => `<circle cx="${x}" cy="62" r="1.8" fill="${OWL_FOOT}" stroke="${INK}" stroke-width=".9"/>`).join('');
  const eye = (x) => `<circle cx="${x}" cy="26" r="5" fill="${INK}"/><circle cx="${x + 1.6}" cy="24.4" r="1.8" fill="#fff"/><circle cx="${x - 1.2}" cy="27.6" r=".8" fill="#fff"/>
      <ellipse class="ow-lid" cx="${x}" cy="26" rx="5.6" ry="5.6" fill="#cdbb98" style="transform-origin:${x}px 20.4px"/>`;
  return `<svg viewBox="0 0 120 66" aria-hidden="true" focusable="false">
    <g class="ow-fly">${flyWing('l', wing, bars)}${flyWing('r', mirrorX(wing), mirrorX(bars))}</g>
    <path class="ow-body" d="M60 10C76 10 80 24 80 38C80 54 72 62 60 62C48 62 40 54 40 38C40 24 44 10 60 10Z" fill="${OWL}" stroke="${INK}" stroke-width="1.6"/>
    <ellipse cx="60" cy="48" rx="13" ry="11" fill="${OWL_BELLY}"/>
    <path d="M53 43L55 45L57 43M63 43L65 45L67 43M57.5 49.5L59.5 51.5L61.5 49.5M53.5 54L55.5 56L57.5 54M62.5 54L64.5 56L66.5 54" fill="none" stroke="${OWL_DEEP}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <g class="ow-fold">
      <path d="${fold}" fill="${OWL_DEEP}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="${mirrorX(fold)}" fill="${OWL_DEEP}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
      ${toes([52, 54.6, 57.2])}${toes([62.8, 65.4, 68])}
    </g>
    <g class="ow-face">
      <path d="M60 20C56 14 44 14 44 26C44 35 52 38 60 36C68 38 76 35 76 26C76 14 64 14 60 20Z" fill="${OWL_FACE}" stroke="#7a6650" stroke-width="1.2"/>
      ${eye(53)}${eye(67)}
      <path d="M58.4 30L61.6 30L60 35Z" fill="${OWL_FOOT}" stroke="${INK}" stroke-width="1" stroke-linejoin="round"/>
    </g>
    <text class="cr-caw" x="80" y="9" font-size="10">ホー</text>
  </svg>`;
}

/* ---------- Flights ---------- */

const rand = (a, b) => a + Math.random() * (b - a);

function start() {
  const sky = document.querySelector('.sky');
  const gate = sky && sky.querySelector('.gate');
  if (!sky || !gate) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;

  const layer = document.createElement('div');
  layer.className = 'sky-critters';
  layer.setAttribute('aria-hidden', 'true');
  sky.insertBefore(layer, gate); // behind the gate sign, over the sun and clouds

  const forced = forcedAnimals();
  const want = (name) => forced.includes(name) || forced.includes('all');
  const FORCED = {
    bird: want('bird') || want('birds') || want('kotori'),
    falcon: want('falcon') || want('hayabusa'),
    mouse: want('mouse'),
    crow: want('crow') || want('karasu'),
    owl: want('owl') || want('fukurou'),
  };

  const flyers = new Set();
  let frame = 0;

  function addFlyer(markup, cls, width, update, parent = layer) {
    const el = document.createElement('div');
    el.className = `critter ${cls}`;
    el.style.width = `${width}px`;
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = markup;
    parent.append(el);
    flyers.add({ el, born: performance.now(), update });
    if (!frame) frame = requestAnimationFrame(tick);
    return el;
  }

  function tick(now) {
    for (const f of flyers) {
      if (f.update(f.el, (now - f.born) / 1000) === false) {
        f.el.remove();
        flyers.delete(f);
      }
    }
    frame = flyers.size ? requestAnimationFrame(tick) : 0;
  }

  const place = (el, x, y, extra = '') => { el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)${extra}`; };
  const W = () => sky.clientWidth;
  const H = () => sky.clientHeight;
  const small = () => W() < 700;

  // A little flock crossing the sky in a loose line, bobbing as they flap
  function flock() {
    const n = Math.round(rand(3, 6));
    const ltr = Math.random() < 0.5;
    const y0 = H() * rand(0.12, 0.4);
    const speed = rand(110, 170);
    const colors = ['#c98b4a', '#a8743f', '#e0b450', '#9aa86a'];
    for (let i = 0; i < n; i++) {
      const size = (small() ? 20 : 26) * rand(0.85, 1.1);
      const lag = i * rand(0.25, 0.5);
      const dy = rand(-18, 18);
      const phase = rand(0, Math.PI * 2);
      addFlyer(birdSVG(colors[i % colors.length]), `cr-bird${ltr ? '' : ' is-left'}`, size, (el, t) => {
        const run = (t - lag) * speed;
        const x = ltr ? -40 + run : W() + 40 - run;
        place(el, x, y0 + dy + Math.sin(t * 5 + phase) * 4);
        el.style.visibility = t < lag ? 'hidden' : '';
        return ltr ? x < W() + 60 : x > -60;
      });
    }
  }

  // A layer fixed over the whole screen, for flights that leave the sky (owl, falcon's dive)
  let overlay = null;
  function screenLayer() {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'sky-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.append(overlay);
    }
    return overlay;
  }

  const bezier = (a, c, b, k) => ({
    x: (1 - k) * (1 - k) * a.x + 2 * (1 - k) * k * c.x + k * k * b.x,
    y: (1 - k) * (1 - k) * a.y + 2 * (1 - k) * k * c.y + k * k * b.y,
  });

  // The mouse on the lions' walkway (lions.js), if it is fully on screen
  function mouseOnScreen() {
    const m = document.querySelector('#lion-path .mouse');
    if (!m) return null;
    const r = m.getBoundingClientRect();
    return r.left >= 10 && r.right <= window.innerWidth - 10 && r.top >= 0 && r.bottom <= window.innerHeight ? r : null;
  }

  // The falcon crosses the sky in a straight line, fast, gliding with now and then a quick
  // burst of wingbeats, drifting a little up or down on the way. We look at it from below at a
  // slant, so the drawing (seen from above) is squashed a little, like a bird banking.
  //
  // Hunting: if it passes right above the mouse, there is a chance it goes for it.
  // It moves to the screen layer, tucks its wings and dives at the mouse; halfway down the
  // mouse notices (lions.js listens for 'zoo:falcon-strike') and dashes off, so the falcon
  // flares its wings and thrusts its talons at empty ground (スカッ), then climbs away.
  function falcon() {
    const size = small() ? 58 : 80;
    const BODY = 0.62;                         // how squashed the bird looks from below
    const ltr = Math.random() < 0.5;
    const speed = rand(170, 230);              // px per second
    const sx = ltr ? -size : W() + size, ex = ltr ? W() + size : -size;
    const y0 = H() * rand(0.15, 0.4), y1 = H() * rand(0.12, 0.42);
    const crossTime = Math.abs(ex - sx) / speed;
    const slope = Math.atan2(y1 - y0, ex - sx);
    let nextFlap = rand(0.3, 1.2), flapEnd = 0;
    const CHANCE = FORCED.falcon && FORCED.mouse ? 1 : 0.35;
    const DIVE = 1.0, HOLD = 0.35, CLIMB = 2.4;
    const deg = (a) => `${(a * 180 / Math.PI).toFixed(1)}deg`;

    let state = 'fly', tried = false, wasAbove = false;
    let from = null, target = null, locked = false, s0 = 1, diveAt = 0, missAt = 0, away = 1, diveHeading = 0;

    addFlyer(falconSVG(), 'cr-falcon', size, (el, t) => {
      if (state === 'fly') {
        const k = t / crossTime;
        const x = sx + (ex - sx) * k, y = y0 + (y1 - y0) * k + Math.sin(t * 1.6) * 3;
        const s = 1;
        // Glide, with a short burst of quick wingbeats every couple of seconds
        if (t > nextFlap) { el.classList.add('is-flap'); flapEnd = t + rand(0.45, 0.8); nextFlap = flapEnd + rand(1.4, 2.8); }
        if (flapEnd && t > flapEnd) { el.classList.remove('is-flap'); flapEnd = 0; }
        place(el, x - size / 2, y - size * 0.4, ` scaleY(${BODY}) rotate(${deg(slope)})`);

        // Right above the mouse? Roll once as it comes over. The walkway is a long way
        // below the sky (on a 800px-high screen they don't fit on it together), so the falcon
        // may be above the top of the screen: then the dive starts just above the top edge.
        if (!tried) {
          const m = mouseOnScreen();
          const sr = sky.getBoundingClientRect();
          const fx = sr.left + x, fy = sr.top + y;
          const above = !!m && fy < m.top - 80 && Math.abs(fx - (m.left + m.width / 2)) < 16;
          if (above && !wasAbove && Math.random() < CHANCE) {
            tried = true;
            state = 'dive';
            diveAt = t;
            s0 = s;
            from = { x: fx, y: Math.max(fy, -size) };
            target = { x: m.left + m.width / 2, y: m.top + m.height * 0.6 };
            el.classList.remove('is-flap');
            el.classList.add('is-stoop');
            screenLayer().append(el);
          }
          wasAbove = above;
        }
        return k < 1;
      }

      if (state === 'dive') {
        const k = Math.min(1, (t - diveAt) / DIVE);
        // Aim at the mouse until halfway; then the mouse spots it and runs, too late to re-aim
        if (!locked) {
          const m = mouseOnScreen();
          if (m) target = { x: m.left + m.width / 2, y: m.top + m.height * 0.6 };
          if (k >= 0.55 || !m) {
            locked = true;
            document.dispatchEvent(new CustomEvent('zoo:falcon-strike', { detail: { fromX: from.x, x: target.x } }));
          }
        }
        const e = k * k;                          // speeds up as it drops
        const x = from.x + (target.x - from.x) * e, y = from.y + (target.y - from.y) * e;
        const heading = diveHeading = Math.atan2(target.y - from.y, target.x - from.x);
        const squash = BODY + (1 - BODY) * Math.min(1, k * 4);
        const s = s0 + (1.35 - s0) * e;
        if (k > 0.82 && !el.classList.contains('is-strike')) {
          el.classList.remove('is-stoop');
          el.classList.add('is-strike');         // wings flare, talons out
        }
        place(el, x - size / 2, y - size * 0.4, ` scale(${s.toFixed(3)}) scaleY(${squash.toFixed(3)}) rotate(${deg(heading)})`);
        if (k >= 1) {
          state = 'miss';
          missAt = t;
          away = target.x >= from.x ? 1 : -1;     // carry on the way it was going
          const puff = document.createElement('div');
          puff.className = 'fa-miss';
          puff.textContent = 'スカッ';
          puff.style.left = `${target.x}px`;
          puff.style.top = `${target.y}px`;
          screenLayer().append(puff);
          setTimeout(() => puff.remove(), 1000);
        }
        return true;
      }

      if (state === 'miss') {
        // A moment on the ground with wings spread, turning toward the way it will climb off
        const k = Math.min(1, (t - missAt) / HOLD);
        const goal = away > 0 ? 0 : Math.PI;
        let turn = goal - diveHeading;
        turn = Math.atan2(Math.sin(turn), Math.cos(turn));
        place(el, target.x - size / 2, target.y - size * 0.4, ` scale(1.35) rotate(${deg(diveHeading + turn * k * k * (3 - 2 * k))})`);
        if (k >= 1) {
          state = 'climb';
          el.classList.remove('is-strike');
          el.classList.add('is-flap');
        }
        return true;
      }

      // Climb away, flapping hard, getting smaller as it goes
      const k = Math.min(1, (t - missAt - HOLD) / CLIMB);
      const e = k * k * (3 - 2 * k);
      const end = { x: target.x + away * window.innerWidth * 0.7, y: -120 };
      const c = { x: target.x + away * 140, y: target.y + 10 };
      const p = bezier(target, c, end, e);
      const dx = 2 * (1 - e) * (c.x - target.x) + 2 * e * (end.x - c.x);
      const dy = 2 * (1 - e) * (c.y - target.y) + 2 * e * (end.y - c.y);
      const s = 1.35 - 0.65 * e;
      place(el, p.x - size / 2, p.y - size * 0.4, ` scale(${s.toFixed(3)}) scaleY(${(1 - 0.25 * e).toFixed(3)}) rotate(${deg(Math.atan2(dy, dx))})`);
      return k < 1;
    });
  }

  // One to three crows flapping slowly across, calling カー now and then
  function crows() {
    const n = Math.round(rand(1, 3));
    const ltr = Math.random() < 0.5;
    const y0 = H() * rand(0.1, 0.35);
    const speed = rand(80, 120);
    for (let i = 0; i < n; i++) {
      const size = (small() ? 34 : 44) * rand(0.9, 1.1);
      const lag = i * rand(0.6, 1.2);
      const dy = rand(-14, 20);
      const callAt = rand(1, 4);
      addFlyer(crowSVG(), `cr-crow${ltr ? '' : ' is-left'}`, size, (el, t) => {
        const run = (t - lag) * speed;
        const x = ltr ? -60 + run : W() + 60 - run;
        place(el, x, y0 + dy - run * 0.05 + Math.sin(t * 2.4 + i) * 3);
        el.style.visibility = t < lag ? 'hidden' : '';
        el.classList.toggle('is-calling', t > callAt && t < callAt + 1.2);
        return ltr ? x < W() + 80 : x > -80;
      });
    }
  }

  // At night an owl flies down onto the 算数 or 国語 board, stays a while, then flies off.
  // It flies in the screen layer; while it perches it is moved to a layer laid
  // over the whole page, so it scrolls with the board and stays in front of the hill and
  // the acorns (which cover the top of the first board on phones). Only comes when one of
  // those boards is in view.
  let owlPage = null;
  function owl() {
    const vh = window.innerHeight, vw = window.innerWidth;
    const boards = ['subject-math', 'subject-japanese']
      .map((id) => document.getElementById(id))
      .map((h) => h && h.closest('.board'))
      .filter((b) => {
        if (!b) return false;
        const r = b.getBoundingClientRect();
        return r.width > 0 && r.top > 90 && r.top < vh * 0.8;
      });
    if (!boards.length) return false;
    const owlSky = screenLayer();
    if (!owlPage) {
      owlPage = document.createElement('div');
      owlPage.className = 'owl-page';
      owlPage.setAttribute('aria-hidden', 'true');
      document.body.append(owlPage);
    }
    const board = boards[Math.floor(Math.random() * boards.length)];
    const u = vw < 700 ? 1 : 1.25;             // px per drawing unit
    const w = 120 * u;
    const perchX = board.clientWidth * rand(0.2, 0.8);
    const FEET = -9;                            // on top of the wooden frame
    const stay = FORCED.owl ? rand(10, 14) : rand(25, 50);
    const fromLeft = Math.random() < 0.5;
    const perch = () => {
      const r = board.getBoundingClientRect();
      return { x: r.left + board.clientLeft + perchX, y: r.top + board.clientTop + FEET };
    };
    const at = (el, p, s = 1) => place(el, p.x - 60 * u, p.y - 64 * u, s === 1 ? '' : ` scale(${s.toFixed(3)})`);

    const start = { x: fromLeft ? -w : vw + w, y: rand(-40, vh * 0.15) };
    const p0 = perch();
    const inTime = Math.min(4.5, Math.max(2.4, Math.hypot(p0.x - start.x, p0.y - start.y) / 300));
    let state = 'in', perchedAt = 0, outFrom = null, outAt = 0, leaveNow = false;
    let nextBlink = 0, blinkEnd = 0, nextLook = 0, nextHoot = 0, hootEnd = 0;

    const el = addFlyer(owlSVG(), 'cr-owl is-flying', w, (el, t) => {
      if (state === 'in') {
        const k = Math.min(1, t / inTime);
        const e = 1 - (1 - k) * (1 - k);        // slows down to land
        const end = perch();
        // Swoop down below the perch, then glide up onto it
        const c = { x: (start.x + end.x) / 2, y: Math.min(Math.max(start.y, end.y) + 90, vh - 30) };
        at(el, bezier(start, c, end, e), 0.55 + 0.45 * e);
        el.classList.toggle('is-gliding', k > 0.75);
        if (k >= 1) {
          state = 'perched';
          perchedAt = t;
          nextBlink = t + rand(1, 3);
          nextLook = t + rand(2, 4);
          nextHoot = t + rand(2, 5);
          el.classList.remove('is-flying', 'is-gliding');
          el.classList.add('is-perched');
          owlPage.append(el);
        }
        return true;
      }
      if (state === 'perched') {
        // Page coordinates: stays put while scrolling, follows the board if the layout changes
        const p = perch();
        place(el, p.x + window.scrollX - 60 * u, p.y + window.scrollY - 64 * u);
        if (t > nextBlink) { el.classList.add('is-blink'); blinkEnd = t + 0.16; nextBlink = t + rand(2, 5); }
        if (blinkEnd && t > blinkEnd) { el.classList.remove('is-blink'); blinkEnd = 0; }
        if (t > nextLook) {
          const look = ['', 'look-l', 'look-r'][Math.floor(Math.random() * 3)];
          el.classList.remove('look-l', 'look-r');
          if (look) el.classList.add(look);
          nextLook = t + rand(2.5, 6);
        }
        if (t > nextHoot) { el.classList.add('is-hooting'); hootEnd = t + 1.6; nextHoot = t + rand(8, 15); }
        if (hootEnd && t > hootEnd) { el.classList.remove('is-hooting'); hootEnd = 0; }
        if (leaveNow || t > perchedAt + stay) {
          state = 'out';
          outAt = t;
          outFrom = perch();
          el.classList.remove('is-perched', 'is-blink', 'is-hooting', 'look-l', 'look-r');
          el.classList.add('is-flying');
          owlSky.append(el);
          at(el, outFrom);
        }
        return true;
      }
      // Fly up and away, out of the side it did not come in from
      const k = Math.min(1, (t - outAt) / 3);
      const e = k * k;
      const end = { x: fromLeft ? vw + w : -w, y: -80 };
      const c = { x: outFrom.x + (end.x - outFrom.x) * 0.3, y: outFrom.y - 30 };
      at(el, bezier(outFrom, c, end, e), 1 - 0.45 * e);
      return k < 1;
    }, owlSky);
    el.addEventListener('click', () => { leaveNow = true; });
    return true;
  }

  /* ---------- When ---------- */

  // [first wait, next wait] in seconds; forced ones come quickly and keep coming
  const KINDS = {
    bird: { spawn: flock, active: (h, rise) => h >= rise && h < rise + 3, wait: () => rand(25, 60) },
    falcon: { spawn: falcon, active: (h, rise, set) => h >= rise + 0.5 && h < set - 0.5, wait: () => rand(150, 330), busy: () => !!document.querySelector('.cr-falcon') },
    crow: { spawn: crows, active: (h, rise, set) => h >= set - 1 && h < set, wait: () => rand(20, 50) },
    owl: { spawn: owl, active: (h, rise, set) => h >= set + 0.5 || h < rise - 0.5, wait: () => rand(60, 180), busy: () => !!document.querySelector('.cr-owl') },
  };
  const next = {};
  const nowSec = () => performance.now() / 1000;
  for (const [name, k] of Object.entries(KINDS)) next[name] = nowSec() + (FORCED[name] ? 1 : rand(5, k.wait()));

  function check() {
    if (document.visibilityState !== 'visible' || document.documentElement.classList.contains('viewing')) return;
    const month = Number(window.MONTH) || new Date().getMonth() + 1;
    const times = window.SUN_TIMES && window.SUN_TIMES[month];
    const h = typeof window.nowHours === 'function' ? window.nowHours() : new Date().getHours();
    const t = nowSec();
    for (const [name, k] of Object.entries(KINDS)) {
      const on = FORCED[name] || (times && k.active(h, times[0], times[1]));
      if (!on || t < next[name]) continue;
      if (k.busy && k.busy()) continue;
      // A spawn that returns false found nowhere to go (owl: no board in view): try again soon
      if (k.spawn() === false) { next[name] = t + 4; continue; }
      next[name] = t + (FORCED[name] ? (name === 'falcon' || name === 'owl' ? 3 : rand(6, 10)) : k.wait());
    }
  }
  check();
  setInterval(check, 1000);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}
