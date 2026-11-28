/* ==========================================================================
   THE LEARNING ZOO - the beach at the bottom of study.html
     カルガモ (spot-billed duck) - now and then in the daytime, one or two swim across,
        stopping here and there and sometimes tipping up to feed (head under, tail up).
        In May and June a mother often comes with a line of ducklings behind her.
     ユリカモメ (black-headed gull) - a flock stays from October to May: most of them float
        on the sea, two or three fly about over the beach, and now and then one lands and
        another takes off. In October they fly in when the page opens. In May their heads
        are dark (summer plumage); from June to September they are gone.
   Month / time come from MONTH, SUN_TIMES and nowHours() in study.html (?month= and ?time=
   work here too). ?animal=duck (or karugamo, all) brings ducks right away; in May / June
   with ?animal=duck they always bring their ducklings.
   The birds only move while the beach is on screen.
   ========================================================================== */

import { forcedAnimals } from './lions.js';

const INK = '#1c2a4a';
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

/* ---------- Drawings (side view, facing right; feet / waterline at the bottom) ---------- */

// Spot-billed duck: scaly brown body, blue wing patch, pale face with a dark eye stripe and
// a black bill with a yellow tip. Waterline at y = 30 (transform-origin 50% 75%).
// .dk-body tips forward for feeding (.is-dabble): .dk-head disappears under the water and
// .dk-cover (sea colored) hides the front of the body below the waterline.
function duckSVG() {
  return `<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false">
    <ellipse class="dk-ring" cx="30" cy="30.5" rx="24" ry="2.6"/>
    <path class="dk-wake" d="M3 31.5Q-4 30.5 -10 32.5M6 33.5Q-1 33.5 -6 36" fill="none" stroke-width="1.4" stroke-linecap="round"/>
    <g class="dk-body">
      <path d="M10 22L2.5 14.5L5 21.5Z" fill="#4a3322" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M8 22C8 15 17 12.5 29 13C37 13.4 43 16 45.5 21.5C47 26.5 42 30 34 30H14C10 30 8 27 8 22Z" fill="#7a5536" stroke="${INK}" stroke-width="1.6"/>
      <path d="M15 18Q17 16.5 19 18M21 16.5Q23 15 25 16.5M27 16.3Q29 14.8 31 16.3M18 22.5Q20 21 22 22.5M24 21.5Q26 20 28 21.5M30 22.5Q32 21 34 22.5M36 20Q38 18.5 40 20M20 26.5Q22 25 24 26.5M27 26.5Q29 25 31 26.5M34 26Q36 24.5 38 26" fill="none" stroke="#5a3c24" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M14.5 19.2L25.5 18.4L25 21.6L14.2 22.2Z" fill="#2f6fb5" stroke="#f4f1ea" stroke-width="1"/>
      <path d="M12.5 22.4Q19 24.4 27 22.6" fill="none" stroke="#f4f1ea" stroke-width="1.4" stroke-linecap="round"/>
      <g class="dk-head">
      <path d="M40 18C39.5 14 40.5 11 43 8.5L49.5 12.5C47.5 15 46.5 17.5 46.5 20.5Z" fill="#d8c8a6" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
      <circle cx="46" cy="9" r="6.4" fill="#e8dcc0" stroke="${INK}" stroke-width="1.5"/>
      <path d="M40.2 7.6C41 3.6 45 2 48.6 3.2C50.8 4 52 5.6 52.2 7.4C48.6 6.4 44 6.6 40.2 7.6Z" fill="#5a3c24"/>
      <path d="M52 9.4L41.2 8.8" fill="none" stroke="#4a3322" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M50.4 12.6Q46.4 13.8 42.4 12.6" fill="none" stroke="#9a7a58" stroke-width="1.1" stroke-linecap="round"/>
      <circle cx="48" cy="8.6" r="1.3" fill="${INK}"/><circle cx="48.4" cy="8.2" r=".45" fill="#fff"/>
      <path d="M51.6 7.4L58.2 9.2Q59.4 10.2 58.2 11.2L51.8 11.8Z" fill="#2b2b30" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M56.2 8.7L58.2 9.2Q59.4 10.2 58.2 11.2L56.2 11.5Z" fill="#f2c14e"/>
      </g>
    </g>
    <rect class="dk-cover" x="-6" y="30.3" width="72" height="10"/>
    <path class="dk-line" d="M2 30.4H58" fill="none" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`;
}

// Duckling: fluffy, yellow-buff with dark brown patches, big eye. Waterline at y = 17
// (viewBox 30 x 22, transform-origin 50% 77%).
function ducklingSVG() {
  return `<svg viewBox="0 0 30 22" aria-hidden="true" focusable="false">
    <ellipse class="dk-ring" cx="14" cy="17.4" rx="11" ry="1.6"/>
    <g class="dk-body">
      <path d="M6 12.5L2.4 9.2L3.4 13Z" fill="#7a5536" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M4.5 13C4.5 9 9.5 7.4 15 7.8C19 8.2 21.6 10.4 21.6 13.6C21.6 16 19 17 16 17H8C5.8 17 4.5 15.4 4.5 13Z" fill="#e9c46a" stroke="${INK}" stroke-width="1.3"/>
      <path d="M7.6 10.6Q11 8.4 15 9.2Q13.8 12 9.6 12.4Q7.8 12.2 7.6 10.6Z" fill="#8a5f34"/>
      <path d="M8.6 14.6Q11 13.6 13 15" fill="none" stroke="#8a5f34" stroke-width="1.6" stroke-linecap="round"/>
      <g class="dk-head">
      <circle cx="21" cy="7.4" r="4.6" fill="#f0d27a" stroke="${INK}" stroke-width="1.3"/>
      <path d="M16.8 6.4C17.4 3.4 20.6 2.2 23 3C24.4 3.6 25.2 4.6 25.4 5.8C22.6 5.2 19.4 5.4 16.8 6.4Z" fill="#8a5f34"/>
      <path d="M25.2 7.6L18.4 7.2" fill="none" stroke="#8a5f34" stroke-width="1.1" stroke-linecap="round"/>
      <circle cx="22.4" cy="7.2" r="1.25" fill="${INK}"/><circle cx="22.8" cy="6.8" r=".42" fill="#fff"/>
      <path d="M25 6.6L28.6 7.6Q29.2 8.2 28.6 8.8L25.2 9.4Z" fill="#4a4a52" stroke="${INK}" stroke-width=".9" stroke-linejoin="round"/>
      </g>
    </g>
    <rect class="dk-cover" x="-4" y="17.2" width="38" height="6"/>
    <path class="dk-line" d="M2 17.3H27" fill="none" stroke-width="1" stroke-linecap="round"/>
  </svg>`;
}

// Black-headed gull, two poses in one drawing (viewBox 60 x 40, waterline y = 31):
//   .gl-float  sitting on the water, wings folded (black tips past the tail)
//   .gl-fly    flying, long pointed wing raised (.gl-wing flaps), red legs trailing
// Winter: white head with a dark spot behind the eye. Summer (.is-summer): dark brown hood.
function gullSVG() {
  const head = (cx, cy) => `
      <circle cx="${cx}" cy="${cy}" r="5.6" fill="#fbfbfb" stroke="${INK}" stroke-width="1.4"/>
      <path class="gl-hood" d="M${cx - 4.4} ${cy - 3.2}C${cx - 2.4} ${cy - 6.6} ${cx + 3.4} ${cy - 6.6} ${cx + 5.4} ${cy - 1.6}L${cx + 5.6} ${cy + 2.2}C${cx + 2} ${cy + 3.8} ${cx - 2.6} ${cy + 3.4} ${cx - 4.8} ${cy + 1.2}Z" fill="#3b2a24"/>
      <circle class="gl-spot" cx="${cx - 1.6}" cy="${cy + 0.6}" r="1.4" fill="#3a3a46"/>
      <path class="gl-ring" d="M${cx + 0.2} ${cy - 2.4}A2 2 0 0 0 ${cx + 0.4} ${cy + 0.6}" fill="none" stroke="#fff" stroke-width=".9" stroke-linecap="round"/>
      <circle cx="${cx + 1.8}" cy="${cy - 1}" r="1.1" fill="${INK}"/>
      <path d="M${cx + 4.8} ${cy - 0.8}L${cx + 11} ${cy + 0.4}L${cx + 5} ${cy + 2}Z" fill="#d93a3a" stroke="${INK}" stroke-width=".9" stroke-linejoin="round"/>`;
  return `<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false">
    <g class="gl-float">
      <ellipse class="dk-ring" cx="28" cy="31.4" rx="20" ry="2.2"/>
      <path d="M8 21L1.5 17.5L3 23Z" fill="#222" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M7 24C7 17.5 15 15 26 15C34 15 40 17.5 42 22.5C43 27.5 38 31 31 31H13C9 31 7 28 7 24Z" fill="#fbfbfb" stroke="${INK}" stroke-width="1.5"/>
      <path d="M9 21C13 16.6 25 16 36 19.4C30 23 18 24 9 21Z" fill="#b9c2cc" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M9 21L3.5 18.6L5 22.2Z" fill="#222"/>
      <path d="M37.5 20C37 16.5 38 13.5 40 12L45 15C43.6 16.8 43 18.6 43 21Z" fill="#fbfbfb"/>
      ${head(42, 12)}
    </g>
    <g class="gl-fly">
      <path class="gl-wing gl-wing-far" d="M27 22C25 15 21 10 12 6C17 12 19 17 21 22Z" fill="#9aa4b0" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M18 27.4L10.5 29.4M19.6 28L12.6 31" fill="none" stroke="#d93a3a" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M15 24L7 21.8L7.6 27L15 26.4Z" fill="#fbfbfb" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M14 25C14 21.4 22 19.6 32 20C40 20.4 45 22 46 25C45 28 38.6 29.4 30.6 29.4C22 29.4 14 28.4 14 25Z" fill="#fbfbfb" stroke="${INK}" stroke-width="1.4"/>
      <g class="gl-wing">
        <path d="M36 23.4C32 14 23 7 5 2.5C13 10 18 17 22.6 23.8Z" fill="#c6ced8" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>
        <path d="M5 2.5C9.4 5 12.6 7.6 15.2 10.6L12 11.6C10 8.6 7.6 5.4 5 2.5Z" fill="#222"/>
        <path d="M36 23.4C32.6 15.6 26 9.6 15.6 5.6" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".9"/>
      </g>
      ${head(47, 21)}
    </g>
  </svg>`;
}

/* ---------- The beach ---------- */

function start() {
  const beach = document.querySelector('.beach');
  const life = beach && beach.querySelector('.beach-life');
  if (!beach || !life) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const month = Number(window.MONTH) || new Date().getMonth() + 1;
  const forced = forcedAnimals();
  const want = (...names) => names.some((n) => forced.includes(n)) || forced.includes('all');
  const DUCK_FORCED = want('duck', 'karugamo');
  const DUCKLING_SEASON = month === 5 || month === 6;
  const GULL_SEASON = month >= 10 || month <= 5;
  const GULL_SUMMER = month === 5;

  const W = () => life.clientWidth;
  const H = () => life.clientHeight;
  const small = () => W() < 700;
  // The sea, as fractions of the beach height (matches the shore drawn in study.html)
  const SEA_TOP = 0.46, SEA_BOTTOM = 0.92;
  const seaY = (f) => H() * (SEA_TOP + (SEA_BOTTOM - SEA_TOP) * f);
  // Farther out (higher up) is a little smaller
  const depthScale = (f) => 0.78 + 0.34 * f;

  const isDay = () => {
    const times = window.SUN_TIMES && window.SUN_TIMES[month];
    const h = typeof window.nowHours === 'function' ? window.nowHours() : new Date().getHours();
    return !times || (h >= times[0] && h < times[1]);
  };

  function make(markup, cls, width) {
    const el = document.createElement('div');
    el.className = `bird ${cls}`;
    el.style.width = `${width}px`;
    el.innerHTML = markup;
    life.append(el);
    return el;
  }
  // (x, y) is the bird's waterline point: `line` is its height below the element's top, as a
  // fraction of the width (the CSS puts transform-origin there too, so scaling keeps it put)
  const LINE = { duck: 30 / 60, duckling: 17 / 30, gull: 31 / 60 };
  const place = (el, x, y, w, s, line) => {
    el.style.transform = `translate(${(x - w / 2).toFixed(1)}px, ${(y - w * line).toFixed(1)}px) scale(${s.toFixed(3)})`;
    el.style.zIndex = String(Math.round(y));
  };

  /* ----- ユリカモメ ----- */

  // Point on a flyer's loop over the beach
  const airPoint = (a) => ({ x: W() * (a.cx + a.rx * Math.cos(a.a)), y: H() * (a.cy + a.ry * Math.sin(a.a)) });
  const gulls = [];
  if (GULL_SEASON) {
    const n = Math.round(small() ? rand(5, 7) : rand(8, 12));
    const flying = Math.min(n - 3, Math.round(rand(2, 3)));
    for (let i = 0; i < n; i++) {
      const w = small() ? 36 : 60;
      const el = make(gullSVG(), `gull${GULL_SUMMER ? ' is-summer' : ''}`, w);
      el.querySelector('.gl-float').style.animationDelay = `${-rand(0, 3).toFixed(2)}s`;
      const g = {
        el, w,
        fx: rand(0.04, 0.96), fy: rand(0.08, 0.9),   // spot on the sea (fractions)
        vx: rand(-0.004, 0.004),                     // slow drift (fraction of width per second)
        left: Math.random() < 0.5,
        state: 'float', x: 0, y: 0, t: 0,
        air: null, from: null,
      };
      gulls.push(g);
      if (i < flying) startAir(g, true);
    }
    // October: they have only just arrived, so the whole flock flies in when the page opens
    if (month === 10 && !reduce) {
      gulls.forEach((g, i) => {
        if (g.state === 'air') return;
        g.state = 'arrive';
        g.t = -i * rand(0.4, 0.8);
        g.from = { x: W() + 60 + rand(0, 80), y: H() * rand(0.06, 0.22) };
      });
    }
    gulls.forEach((g) => layoutGull(g, 0));
  }

  // A lazy loop over the beach: a flattened ellipse, flapping now and then
  function startAir(g, immediate) {
    g.state = immediate ? 'air' : 'takeoff';
    g.t = 0;
    g.air = {
      cx: rand(0.2, 0.8), cy: rand(0.14, 0.28), rx: rand(0.12, 0.3), ry: rand(0.05, 0.09),
      a: rand(0, Math.PI * 2), speed: rand(0.35, 0.55) * (Math.random() < 0.5 ? 1 : -1),
      nextFlap: rand(0.5, 2), flapEnd: 0,
    };
    g.from = { x: g.x, y: g.y };
    g.el.classList.add('is-air');
  }

  function layoutGull(g, dt) {
    const w = g.w;
    if (g.state === 'float') {
      g.fx += g.vx * dt;
      if (g.fx < 0.03 || g.fx > 0.97) { g.vx = -g.vx; g.fx = Math.min(0.97, Math.max(0.03, g.fx)); }
      if (Math.random() < dt / 9) g.vx = rand(-0.004, 0.004);  // change of mind now and then
      g.left = g.vx < 0;
      g.x = W() * g.fx; g.y = seaY(g.fy);
      g.el.classList.toggle('is-left', g.left);
      place(g.el, g.x, g.y, w, depthScale(g.fy), LINE.gull);
      return;
    }
    const a = g.air;
    if (g.state === 'air' || g.state === 'takeoff') {
      a.a += a.speed * dt;
      if (g.t > a.nextFlap) { g.el.classList.add('is-flap'); a.flapEnd = g.t + rand(0.6, 1.4); a.nextFlap = a.flapEnd + rand(1.5, 4); }
      if (a.flapEnd && g.t > a.flapEnd) { g.el.classList.remove('is-flap'); a.flapEnd = 0; }
      const p = airPoint(a);
      let x = p.x, y = p.y;
      if (g.state === 'takeoff') {               // rise from the water onto the loop
        const k = Math.min(1, g.t / 2.2), e = k * k * (3 - 2 * k);
        x = g.from.x + (p.x - g.from.x) * e; y = g.from.y + (p.y - g.from.y) * e;
        g.el.classList.add('is-flap');
        if (k >= 1) { g.state = 'air'; g.el.classList.remove('is-flap'); }
      }
      const dx = x - g.x;
      if (Math.abs(dx) > 0.05) g.left = dx < 0;
      g.x = x; g.y = y;
    } else if (g.state === 'landing' || g.state === 'arrive') {
      // Glide down onto its spot on the sea, a few wingbeats at the end
      const dur = g.state === 'arrive' ? 4 : 2.6;
      const k = Math.max(0, Math.min(1, g.t / dur)), e = 1 - (1 - k) * (1 - k);
      const tx = W() * g.fx, ty = seaY(g.fy);
      const cx = (g.from.x + tx) / 2, cy = Math.min(g.from.y, ty) - H() * 0.08;
      const x = (1 - e) * (1 - e) * g.from.x + 2 * (1 - e) * e * cx + e * e * tx;
      const y = (1 - e) * (1 - e) * g.from.y + 2 * (1 - e) * e * cy + e * e * ty;
      const dx = x - g.x;
      if (Math.abs(dx) > 0.05) g.left = dx < 0;
      g.x = x; g.y = y;
      g.el.classList.toggle('is-flap', k < 0.25 || k > 0.8);
      if (k >= 1) {
        g.state = 'float';
        g.el.classList.remove('is-air', 'is-flap');
        g.vx = rand(-0.004, 0.004);
        return layoutGull(g, 0);
      }
    }
    g.el.classList.toggle('is-left', g.left);
    place(g.el, g.x, g.y, w, 0.95, LINE.gull);
    g.el.style.zIndex = '1000';
  }

  // Now and then one of the flyers lands and one of the floaters takes off
  let nextSwap = rand(10, 20);
  function swapGulls() {
    const air = gulls.filter((g) => g.state === 'air');
    const water = gulls.filter((g) => g.state === 'float');
    if (!air.length || !water.length) return;
    const down = pick(air), up = pick(water);
    down.state = 'landing'; down.t = 0; down.from = { x: down.x, y: down.y };
    down.fx = rand(0.05, 0.95); down.fy = rand(0.08, 0.9);
    startAir(up, false);
  }

  /* ----- カルガモ ----- */

  let ducks = null;            // the visit in progress: { lead, followers, ... }
  let nextDucks = performance.now() / 1000 + (DUCK_FORCED ? 1.5 : rand(20, 70));

  function duckVisit() {
    const family = DUCKLING_SEASON && (DUCK_FORCED || Math.random() < 0.6);
    const ltr = Math.random() < 0.5;
    const base = small() ? 0.78 : 1.3;
    const fy = rand(0.25, 0.8);
    const lead = { el: make(duckSVG(), 'duck', 56 * base), w: 56 * base };
    // Waypoints across the sea: in from one side, a stop or two, out the other side (or back)
    const wps = [];
    const sx = ltr ? -60 : W() + 60;
    let x = ltr ? rand(0.15, 0.4) : rand(0.6, 0.85);
    wps.push({ x: W() * x, fy: fy + rand(-0.12, 0.12) });
    if (Math.random() < 0.7) { x = Math.min(0.9, Math.max(0.1, x + (ltr ? 1 : -1) * rand(0.15, 0.35))); wps.push({ x: W() * x, fy: fy + rand(-0.15, 0.15) }); }
    const followers = [];
    if (family) {
      const n = Math.round(rand(4, 7));
      for (let i = 0; i < n; i++) {
        const w = 26 * base;
        followers.push({ el: make(ducklingSVG(), 'duckling', w), w, line: LINE.duckling, gap: (i === 0 ? 30 : 22) * base, wob: rand(0, 6), dab: 0 });
      }
    } else if (Math.random() < 0.45) {
      followers.push({ el: make(duckSVG(), 'duck', 54 * base), w: 54 * base, line: LINE.duck, gap: 58 * base, wob: rand(0, 6), dab: 0 });
    }
    // Out of sight once the last one in the line is past the edge too
    const tail = 90 + followers.reduce((sum, f) => sum + f.gap, 0);
    const back = Math.random() < 0.25;          // sometimes it turns round and goes back
    wps.push({ x: (ltr !== back) ? W() + tail : -tail, fy: fy + rand(-0.1, 0.1), exit: true });
    wps.forEach((p) => { p.fy = Math.min(0.92, Math.max(0.12, p.fy)); });
    ducks = {
      lead, followers, wps, i: 0,
      x: sx, fy: wps[0].fy, pause: 0, dabble: 0, left: !ltr,
      speed: rand(24, 32) * (small() ? 0.85 : 1),
      trail: [{ x: sx, fy: wps[0].fy, d: 0 }],   // where the mother has been, for the ducklings
      dist: 0,
    };
    // Followers start out of sight behind her
    followers.forEach((f) => { f.x = sx; f.fy = wps[0].fy; });
  }

  // Point on the mother's trail at distance d along it
  function trailAt(d) {
    const tr = ducks.trail;
    if (d <= 0) return tr[0];
    for (let i = tr.length - 1; i > 0; i--) {
      if (tr[i - 1].d <= d) {
        const a = tr[i - 1], b = tr[i], k = (d - a.d) / Math.max(1e-6, b.d - a.d);
        return { x: a.x + (b.x - a.x) * k, fy: a.fy + (b.fy - a.fy) * k, d };
      }
    }
    return tr[0];
  }

  function stepDucks(dt, t) {
    const v = ducks, lead = v.lead;
    let moving = false;
    if (v.pause > 0) {
      v.pause -= dt;
      if (v.dabble > 0) {
        v.dabble -= dt;
        if (v.dabble <= 0) lead.el.classList.remove('is-dabble');
      }
    } else {
      const wp = v.wps[v.i];
      const dx = wp.x - v.x, dfy = wp.fy - v.fy;
      const step = v.speed * dt;
      const dist = Math.hypot(dx, dfy * H());
      if (dist <= step) {
        v.x = wp.x; v.fy = wp.fy;
        if (wp.exit) return false;   // everyone has swum out of sight
        else {
          v.i++;
          v.pause = rand(1.5, 4);
          if (Math.random() < 0.45) { v.dabble = rand(1.4, 2); lead.el.classList.add('is-dabble'); }
        }
      } else {
        v.x += (dx / dist) * step; v.fy += (dfy * H() / dist) * step / H();
        v.left = dx < 0;
        moving = true;
      }
    }
    // Trail for the followers (only when she has moved)
    const lastP = v.trail[v.trail.length - 1];
    const moved = Math.hypot(v.x - lastP.x, (v.fy - lastP.fy) * H());
    if (moved > 1.5) { v.dist += moved; v.trail.push({ x: v.x, fy: v.fy, d: v.dist }); if (v.trail.length > 600) v.trail.splice(0, 100); }

    lead.el.classList.toggle('is-left', v.left);
    lead.el.classList.toggle('is-swim', moving);
    place(lead.el, v.x, seaY(v.fy), lead.w, depthScale(v.fy), LINE.duck);

    let back = 0;
    v.followers.forEach((f, i) => {
      back += f.gap;
      const p = trailAt(v.dist - back);
      const nx = p.x, nfy = p.fy;
      const dx = nx - f.x;
      if (Math.abs(dx) > 0.2) f.el.classList.toggle('is-left', dx < 0);
      f.el.classList.toggle('is-swim', Math.abs(dx) > 0.2 || Math.abs(nfy - f.fy) > 0.0005);
      f.x = nx; f.fy = nfy;
      const bob = Math.sin(t * 2.2 + f.wob) * 1.2;
      place(f.el, f.x, seaY(f.fy) + bob, f.w, depthScale(f.fy), f.line);
      // A duckling copies its mother's feeding now and then (a little late)
      if (v.dabble > 0 && Math.random() < dt * 0.6 && !f.dab) { f.dab = 1.2; f.el.classList.add('is-dabble'); }
      if (f.dab) { f.dab -= dt; if (f.dab <= 0) { f.dab = 0; f.el.classList.remove('is-dabble'); } }
    });
    return true;
  }

  function endDucks() {
    if (!ducks) return;
    ducks.lead.el.remove();
    ducks.followers.forEach((f) => f.el.remove());
    ducks = null;
    nextDucks = performance.now() / 1000 + (DUCK_FORCED ? 3 : rand(60, 120));
  }

  /* ----- run only while the beach is on screen ----- */

  if (reduce) return;   // gulls stay still on the water; no ducks
  let visible = false, frame = 0, last = 0;
  const paused = () => document.visibilityState !== 'visible' || document.documentElement.classList.contains('viewing');

  function tick(now) {
    const t = now / 1000;
    const dt = Math.min(0.1, last ? t - last : 0);
    last = t;
    if (!paused()) {
      gulls.forEach((g) => { g.t += dt; layoutGull(g, dt); });
      if (gulls.length) {
        nextSwap -= dt;
        if (nextSwap <= 0) { swapGulls(); nextSwap = rand(12, 25); }
      }
      if (ducks) { if (stepDucks(dt, t) === false) endDucks(); }
      else if (t >= nextDucks) {
        if (DUCK_FORCED || isDay()) duckVisit();
        else nextDucks = t + 30;
      }
    }
    frame = visible ? requestAnimationFrame(tick) : 0;
  }

  new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
    if (visible && !frame) { last = 0; frame = requestAnimationFrame(tick); }
  }).observe(beach);

  window.addEventListener('resize', () => { gulls.forEach((g) => layoutGull(g, 0)); });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}

export { duckSVG, ducklingSVG, gullSVG };
