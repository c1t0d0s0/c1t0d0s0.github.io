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

// Kite seen from below with wings spread, head to the right (it is rotated to its heading)
function kiteSVG() {
  return `<svg viewBox="0 0 80 64" aria-hidden="true" focusable="false">
    <g class="cr-glide">
      <path d="M36 30C30 18 22 6 8 2C12 10 16 18 22 24C26 28 30 30 36 30Z" fill="#8a5a36" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M36 34C30 46 22 58 8 62C12 54 16 46 22 40C26 36 30 34 36 34Z" fill="#8a5a36" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M8 2C10 6 12 9 14 12M8 62C10 58 12 55 14 52" fill="none" stroke="#3d2a1c" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M28 27L32 30M28 37L32 34" stroke="#f0d9b5" stroke-width="2" stroke-linecap="round"/>
      <path d="M22 32L6 26C3 30 3 34 6 38Z" fill="#7a4c2c" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M20 32C24 26 48 26 54 32C48 38 24 38 20 32Z" fill="#9b6a42" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="58" cy="32" r="6" fill="#a87a50" stroke="${INK}" stroke-width="1.6"/>
      <path d="M63 30L68 32L63 34Z" fill="#f2b23a" stroke="${INK}" stroke-width="1" stroke-linejoin="round"/>
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

  // The kite glides in, circles a few times, then glides away
  function kite() {
    const size = small() ? 58 : 80;
    const r = small() ? rand(36, 52) : rand(55, 85);
    const cx = Math.random() < 0.5 ? W() * rand(0.12, 0.3) : W() * rand(0.7, 0.88);
    const cy = H() * rand(0.25, 0.4);
    const ccw = Math.random() < 0.5 ? 1 : -1;
    const loops = Math.round(rand(2, 4));
    const loopTime = rand(5.5, 7.5);
    const fromLeft = cx > W() / 2;            // come in from the far side
    const inTime = 4;
    const sx = fromLeft ? -size : W() + size;
    const sy = cy - rand(10, 40);
    const a0 = fromLeft ? Math.PI : 0;         // join the circle on the side facing the way in
    const circleEnd = inTime + loops * loopTime;
    let exit = null;
    addFlyer(kiteSVG(), 'cr-kite', size, (el, t) => {
      let x, y, heading;
      if (t < inTime) {
        const k = t / inTime;
        const jx = cx + r * Math.cos(a0), jy = cy + r * Math.sin(a0);
        x = sx + (jx - sx) * k; y = sy + (jy - sy) * k;
        heading = Math.atan2(jy - sy, jx - sx);
      } else if (t < circleEnd) {
        const a = a0 + ccw * ((t - inTime) / loopTime) * Math.PI * 2;
        x = cx + r * Math.cos(a); y = cy + r * Math.sin(a);
        heading = a + ccw * Math.PI / 2;
      } else {
        if (!exit) {
          const a = a0 + ccw * loops * Math.PI * 2;
          const h = a + ccw * Math.PI / 2;
          exit = { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), dx: Math.cos(h) >= 0 ? 1 : -1 };
        }
        const k = t - circleEnd;
        x = exit.x + exit.dx * k * 70; y = exit.y - k * 14;
        heading = exit.dx > 0 ? -0.2 : Math.PI + 0.2;
      }
      place(el, x - size / 2, y - size * 0.4, ` rotate(${(heading * 180 / Math.PI).toFixed(1)}deg)`);
      return x > -size * 2 && x < W() + size * 2 && y > -size * 2;
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
