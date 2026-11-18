/* ==========================================================================
   THE LEARNING ZOO - creatures of the sky (header of study.html)
     小鳥 (birds) - now and then a little flock, for 3 hours after sunrise
     トンビ (kite) - rarely during the day, circles a few times and glides away
     カラス (crow) - now and then from 1 hour before sunset until sunset
   Sunrise / sunset come from SUN_TIMES and nowHours() in study.html (so ?month= and
   ?time= work here too). ?animal=bird,kite,crow (or all) shows them right away.
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
  };

  const flyers = new Set();
  let frame = 0;

  function addFlyer(markup, cls, width, update) {
    const el = document.createElement('div');
    el.className = `critter ${cls}`;
    el.style.width = `${width}px`;
    el.innerHTML = markup;
    layer.append(el);
    flyers.add({ el, born: performance.now(), update });
    if (!frame) frame = requestAnimationFrame(tick);
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

  /* ---------- When ---------- */

  // [first wait, next wait] in seconds; forced ones come quickly and keep coming
  const KINDS = {
    bird: { spawn: flock, active: (h, rise) => h >= rise && h < rise + 3, wait: () => rand(25, 60) },
    kite: { spawn: kite, active: (h, rise, set) => h >= rise + 0.5 && h < set - 0.5, wait: () => rand(150, 330), busy: () => !!layer.querySelector('.cr-kite') },
    crow: { spawn: crows, active: (h, rise, set) => h >= set - 1 && h < set, wait: () => rand(20, 50) },
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
      k.spawn();
      next[name] = t + (FORCED[name] ? (name === 'kite' ? 3 : rand(6, 10)) : k.wait());
    }
  }
  check();
  setInterval(check, 1000);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}
