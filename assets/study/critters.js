/* ==========================================================================
   THE LEARNING ZOO - creatures of the sky (header of study.html)
     小鳥 (birds) - now and then a little flock, for 3 hours after sunrise
     トンビ (kite) - rarely during the day, circles a few times and glides away
     カラス (crow) - now and then from 1 hour before sunset until sunset
     フクロウ (owl) - now and then at night, flies down and perches on the 算数 or 国語
                      board for a while (blinks, turns its head, ホー), then flies off.
                      Tapping it makes it fly off early.
   Sunrise / sunset come from SUN_TIMES and nowHours() in study.html (so ?month= and
   ?time= work here too). ?animal=bird,kite,crow,owl (or all) shows them right away.
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

// Kite seen from above with wings spread, head to the right (it is rotated to its heading).
// What makes it a トンビ: long broad wings with dark splayed "fingers", a pale patch near
// each wrist, and the notched (バチ型) tail. The lower wing is the upper one mirrored.
function kiteSVG() {
  const wing = `
      <path d="M46 29C48.6 24 49.2 19 47.5 14.5L30 12C28.6 18 28.6 24 30 29Z" fill="#8f6038" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M47.5 14.5C46.6 10 44.6 6 42.2 3.2Q41.2 0.2 39.8 2.4L39.2 4.2Q38 0.8 36.6 3L36.2 5.4Q34.8 2 33.6 4.4L33.4 6.6Q31.8 4.4 31 6.8L31.2 8.6Q29.4 7.6 29.4 9.8L30 12Z" fill="#4b3121" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M33 14.4Q39 13 45.6 15.8Q39 18.8 33 14.4Z" fill="#e9d2a8"/>
      <path d="M32.5 22.5Q39 21 45.5 23" fill="none" stroke="#6e4628" stroke-width="1.1" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 80 64" aria-hidden="true" focusable="false">
    <g class="cr-glide">
      <path d="M27 29L11 25.5Q9.6 25.4 10 26.8L13.6 32L10 37.2Q9.6 38.6 11 38.5L27 35Z" fill="#7a4c2c" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M13.5 28.4L19 29.5M13.5 35.6L19 34.5" fill="none" stroke="#4b3121" stroke-width="1.3" stroke-linecap="round"/>
      <g>${wing}</g>
      <g transform="translate(0 64) scale(1 -1)">${wing}</g>
      <path d="M24 32C24 27.5 30 26 40 26C48 26 53 28.5 53 32C53 35.5 48 38 40 38C30 38 24 36.5 24 32Z" fill="#9b6a42" stroke="${INK}" stroke-width="1.6"/>
      <path d="M33 30.4L36 30.6M38 33.6L41 33.4M42.5 30.6L45 30.8" fill="none" stroke="#6e4628" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M61.5 29.2Q68 29.4 70 32Q68 34.6 61.5 34.8Z" fill="#f2c14e" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M67.6 30.3Q70 31 70 32Q70 33 67.6 33.7Z" fill="#3a3a46"/>
      <ellipse cx="57" cy="32" rx="7" ry="6.4" fill="#c4a07a" stroke="${INK}" stroke-width="1.6"/>
      <path d="M51.5 29.2Q54 32 51.5 34.8" fill="none" stroke="#9b6a42" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="59" cy="28.6" r="1.7" fill="${INK}"/><circle cx="59.5" cy="28.1" r=".55" fill="#fff"/>
      <circle cx="59" cy="35.4" r="1.7" fill="${INK}"/><circle cx="59.5" cy="34.9" r=".55" fill="#fff"/>
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
    kite: want('kite') || want('tonbi'),
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

  // The kite glides in, circles a few times, then glides away. The circle lies flat, parallel
  // to the ground, and we look at it from below at a slant: on screen it is a squashed ellipse,
  // the bird is a little smaller on the far side and bigger on the near side, and the drawing
  // itself is turned to its heading on that flat plane and then squashed the same way.
  // Ground coordinates: gx = left/right (same as the screen), gz = depth (+ = toward the viewer).
  function kite() {
    const size = small() ? 58 : 80;
    const r = small() ? rand(48, 66) : rand(80, 115);
    const FLAT = 0.32;                         // how squashed the circle looks on screen
    const BODY = 0.62;                         // how squashed the bird looks (it banks, so we see more of it)
    const DEPTH = 0.16;                        // size change between the near and far side
    const cx = Math.random() < 0.5 ? W() * rand(0.15, 0.3) : W() * rand(0.7, 0.85);
    const cy = H() * rand(0.25, 0.38);
    const ccw = Math.random() < 0.5 ? 1 : -1;  // which way round it circles
    const loops = Math.round(rand(2, 3));
    const loopTime = rand(6.5, 8.5);
    const speed = (2 * Math.PI * r) / loopTime;
    const dir = cx < W() / 2 ? 1 : -1;         // come in from the nearer edge, leave toward the far one
    const hIn = dir > 0 ? 0 : Math.PI;         // heading on the ground plane while flying straight
    // Join (and later leave) the circle where its direction matches the straight flight
    const a0 = hIn - ccw * Math.PI / 2;
    const jgx = cx + r * Math.cos(a0), jgz = r * Math.sin(a0);
    const sgx = dir > 0 ? -size : W() + size;
    const inTime = Math.abs(jgx - sgx) / speed;
    const circleEnd = inTime + loops * loopTime;
    const lift = rand(10, 30);                 // drifts down a little on the way in, climbs on the way out
    addFlyer(kiteSVG(), 'cr-kite', size, (el, t) => {
      let gx, gz, heading, up = 0;
      if (t < inTime) {
        gx = sgx + dir * speed * t; gz = jgz;
        heading = hIn;
        up = lift * (1 - t / inTime);
      } else if (t < circleEnd) {
        const a = a0 + ccw * ((t - inTime) / loopTime) * Math.PI * 2;
        gx = cx + r * Math.cos(a); gz = r * Math.sin(a);
        heading = a + ccw * Math.PI / 2;
      } else {
        const k = t - circleEnd;
        gx = jgx + dir * speed * k; gz = jgz;
        heading = hIn;
        up = lift * Math.min(1, k / 4);
      }
      const x = gx, y = cy + gz * FLAT - up;
      const s = 1 + DEPTH * (gz / r);
      place(el, x - size / 2, y - size * 0.4,
        ` scale(${s.toFixed(3)}) scaleY(${BODY}) rotate(${(heading * 180 / Math.PI).toFixed(1)}deg)`);
      return x > -size * 2 && x < W() + size * 2;
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
  // It flies in a fixed layer over the screen; while it perches it is moved to a layer laid
  // over the whole page, so it scrolls with the board and stays in front of the hill and
  // the acorns (which cover the top of the first board on phones). Only comes when one of
  // those boards is in view.
  let owlSky = null, owlPage = null;
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
    if (!owlSky) {
      owlSky = document.createElement('div');
      owlSky.className = 'owl-sky';
      owlSky.setAttribute('aria-hidden', 'true');
      owlPage = document.createElement('div');
      owlPage.className = 'owl-page';
      owlPage.setAttribute('aria-hidden', 'true');
      document.body.append(owlSky, owlPage);
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
    const bezier = (a, c, b, k) => ({
      x: (1 - k) * (1 - k) * a.x + 2 * (1 - k) * k * c.x + k * k * b.x,
      y: (1 - k) * (1 - k) * a.y + 2 * (1 - k) * k * c.y + k * k * b.y,
    });

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
    kite: { spawn: kite, active: (h, rise, set) => h >= rise + 0.5 && h < set - 0.5, wait: () => rand(150, 330), busy: () => !!layer.querySelector('.cr-kite') },
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
      next[name] = t + (FORCED[name] ? (name === 'kite' || name === 'owl' ? 3 : rand(6, 10)) : k.wait());
    }
  }
  check();
  setInterval(check, 1000);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}
