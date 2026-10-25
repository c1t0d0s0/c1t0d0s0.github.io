/* ==========================================================================
   THE LEARNING ZOO - lion family
   A father, a mother and a cub roam a walkway that runs across the whole page
   width behind the first row of blackboards. They rest only where they can be
   seen (the open space on either side) and pass behind the boards in between.
   ========================================================================== */

const INK = '#1c2a4a';

const KINDS = {
  father: { width: 124, body: '#e6a948', far: '#cf9234', belly: '#fff3d6', tuft: '#8c4a22', mane: ['#b8612c', '#d98a42'], headScale: 1.15 },
  mother: { width: 108, body: '#e9b257', far: '#d29a3e', belly: '#fff3d6', tuft: '#8c4a22', headScale: 1.2 },
  cub: { width: 72, body: '#f0c26a', far: '#dcab52', belly: '#fff6e0', tuft: '#a8642e', spots: true, headScale: 1.42 },
};

/* ---------- Drawing (viewBox 0 0 140 100, facing right, ground at y = 95) ---------- */

function leg(cls, hx, color) {
  const hy = 60;
  return `<g class="ln-leg ${cls}" style="--hx:${hx}px;--hy:${hy}px">`
    + `<path d="M${hx - 6} ${hy - 6}H${hx + 6}V${hy + 25}C${hx + 6} ${hy + 30} ${hx + 3} ${hy + 31} ${hx} ${hy + 31}C${hx - 3} ${hy + 31} ${hx - 6} ${hy + 30} ${hx - 6} ${hy + 25}Z" fill="${color}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`
    + `<ellipse cx="${hx + 2}" cy="${hy + 31}" rx="8" ry="4" fill="${color}" stroke="${INK}" stroke-width="2.5"/>`
    + '</g>';
}

/** A scalloped ring for the father's mane */
function manePath(cx, cy, r, bumps) {
  let d = '';
  for (let i = 0; i <= bumps; i++) {
    const a = (i / bumps) * Math.PI * 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) { d += `M${x.toFixed(1)} ${y.toFixed(1)}`; continue; }
    const am = ((i - 0.5) / bumps) * Math.PI * 2;
    const qx = cx + Math.cos(am) * (r + 7);
    const qy = cy + Math.sin(am) * (r + 7);
    d += `Q${qx.toFixed(1)} ${qy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + 'Z';
}

export function lionSVG(kind) {
  const k = KINDS[kind];
  const s = k.headScale || 1;
  const spots = k.spots
    ? `<g fill="${k.tuft}" opacity=".28"><circle cx="50" cy="46" r="3"/><circle cx="62" cy="52" r="2.6"/><circle cx="78" cy="45" r="3"/><circle cx="88" cy="54" r="2.4"/><circle cx="44" cy="58" r="2.4"/></g>`
    : '';
  const mane = k.mane
    ? `<path d="${manePath(114, 36, 25, 14)}" fill="${k.mane[0]}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="114" cy="36" r="20" fill="${k.mane[1]}"/>`
    : '';
  return `<svg viewBox="0 0 140 100" aria-hidden="true" focusable="false">
  <ellipse class="ln-shadow" cx="72" cy="95" rx="46" ry="4"/>
  <g class="ln-flip"><g class="ln-pose"><g class="ln-bob">
    <g class="ln-tail">
      <path d="M30 50C18 49 10 41 9 29" fill="none" stroke="${INK}" stroke-width="8.5" stroke-linecap="round"/>
      <path d="M30 50C18 49 10 41 9 29" fill="none" stroke="${k.body}" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="9" cy="26" rx="5" ry="7" transform="rotate(-18 9 26)" fill="${k.tuft}" stroke="${INK}" stroke-width="2.2"/>
    </g>
    ${leg('far hind b', 46, k.far)}
    ${leg('far front a', 96, k.far)}
    <path d="M36 40C46 33 72 33 96 34C108 35 116 42 116 53C116 65 108 71 96 71H44C32 71 26 63 27 53C27 47 30 43 36 40Z" fill="${k.body}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="72" cy="66" rx="26" ry="4.5" fill="${k.belly}"/>
    ${spots}
    ${leg('near hind a', 38, k.body)}
    ${leg('near front b', 102, k.body)}
    <g class="ln-head"><g transform="translate(106 46) scale(${s}) translate(-106 -46)">
      ${mane}
      <circle cx="106" cy="20" r="6" fill="${k.body}" stroke="${INK}" stroke-width="2.5"/>
      <circle cx="106" cy="20" r="2.6" fill="#f3b8a4"/>
      <circle cx="121" cy="19" r="6" fill="${k.body}" stroke="${INK}" stroke-width="2.5"/>
      <circle cx="121" cy="19" r="2.6" fill="#f3b8a4"/>
      <circle cx="115" cy="36" r="17" fill="${k.body}" stroke="${INK}" stroke-width="2.5"/>
      <ellipse cx="127" cy="42" rx="9" ry="7" fill="${k.belly}" stroke="${INK}" stroke-width="2"/>
      <path d="M130.5 36.5H137L133.8 40.6Z" fill="${INK}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M133.8 41V43.5C133 46 130 46.5 128.5 45" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
      <ellipse cx="117" cy="43" rx="4" ry="2.5" fill="#f3b8a4" opacity=".7"/>
      <g class="ln-eye-open"><ellipse cx="120" cy="31" rx="3.6" ry="4.4" fill="${INK}"/><circle cx="121.3" cy="29.6" r="1.4" fill="#fff"/></g>
      <path class="ln-eye-closed" d="M116.4 32.4Q120 35.6 123.6 32.4" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
    </g></g>
  </g></g>
  <g class="ln-z" fill="${INK}"><text x="122" y="10" font-size="11">z</text><text x="131" y="3" font-size="8">z</text></g>
  </g>
</svg>`;
}

/* ---------- Behavior ---------- */

const SPEED = { walk: 30, run: 110 }; // px per second
const PERSONALITY = {
  father: { walk: 0.25, run: 0.05, sit: 0.3, sleep: 0.3, idle: 0.1 },
  mother: { walk: 0.4, run: 0.05, sit: 0.25, sleep: 0.18, idle: 0.12 },
  cub: { walk: 0.18, run: 0.32, sit: 0.15, sleep: 0.2, idle: 0.15 },
};
const POSES = ['walk', 'run', 'sit', 'sleep', 'idle'];

const rand = (a, b) => a + Math.random() * (b - a);
function pick(weights) {
  let r = Math.random() * Object.values(weights).reduce((n, w) => n + w, 0);
  for (const [k, w] of Object.entries(weights)) { if ((r -= w) <= 0) return k; }
  return Object.keys(weights)[0];
}

function start() {
  const path = document.getElementById('lion-path');
  const zoo = document.querySelector('.zoo');
  if (!path || !zoo) return;

  const params = new URLSearchParams(location.search);
  const forced = POSES.includes(params.get('lions')) ? params.get('lions') : null;
  const timeScale = Math.min(20, Math.max(1, parseFloat(params.get('lionspeed')) || 1));
  const wide = window.matchMedia('(min-width: 1280px)');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  const lions = ['father', 'mother', 'cub'].map((kind) => {
    const el = document.createElement('div');
    el.className = `lion lion-${kind} is-idle`;
    el.style.width = `${KINDS[kind].width}px`;
    el.innerHTML = lionSVG(kind);
    path.append(el);
    return { kind, el, w: KINDS[kind].width, x: 0, timer: null, action: 'idle' };
  });
  const byKind = Object.fromEntries(lions.map((l) => [l.kind, l]));

  let spots = [];          // open ground on the walkway where a lion can be seen: [{ l, r }]
  let running = false;

  /* ----- layout ----- */

  function layout() {
    const habitats = Array.from(zoo.querySelectorAll('.habitat'));
    if (!habitats.length) return;
    const firstTop = habitats[0].offsetTop;
    const row = habitats.filter((h) => Math.abs(h.offsetTop - firstTop) < 4);
    const bottom = Math.max(...row.map((h) => h.offsetTop + h.offsetHeight));
    path.style.top = `${bottom - path.offsetHeight - 10}px`;

    const pr = path.getBoundingClientRect();
    const blocks = row.map((h) => h.getBoundingClientRect()).map((r) => [r.left - pr.left, r.right - pr.left]).sort((a, b) => a[0] - b[0]);
    const edges = [8];
    for (const [l, r] of blocks) edges.push(l, r);
    edges.push(document.documentElement.clientWidth - 8);
    spots = [];
    for (let i = 0; i < edges.length; i += 2) {
      if (edges[i + 1] - edges[i] > 40) spots.push({ l: edges[i], r: edges[i + 1] });
    }
    // Keep only the two side margins as resting places (the gap between boards is too narrow)
    spots = [spots[0], spots[spots.length - 1]].filter(Boolean);
  }

  /** Left position that shows the lion inside a spot (centred if it is wider than the spot) */
  function placeIn(spot, w, near) {
    const room = spot.r - spot.l - w;
    if (room <= 0) return spot.l + room / 2;
    if (near !== undefined) return Math.min(spot.r - w, Math.max(spot.l, near));
    return spot.l + rand(0, room);
  }
  const spotOf = (lion) => spots.find((s) => lion.x + lion.w * 0.25 >= s.l && lion.x + lion.w * 0.75 <= s.r);
  const otherSpot = (lion) => spots.find((s) => s !== spotOf(lion)) || spots[0];

  /* ----- actions ----- */

  function setPose(lion, pose, facingLeft) {
    POSES.forEach((p) => lion.el.classList.toggle(`is-${p}`, p === pose));
    if (facingLeft !== undefined) lion.el.classList.toggle('is-left', facingLeft);
    lion.action = pose;
  }

  function jumpTo(lion, x) {
    lion.x = x;
    lion.el.style.transition = 'none';
    lion.el.style.transform = `translateX(${x}px)`;
  }

  function moveTo(lion, x, gait, then) {
    const dx = x - lion.x;
    if (Math.abs(dx) < 4) { then(); return; }
    const secs = Math.abs(dx) / SPEED[gait] / timeScale;
    setPose(lion, gait, dx < 0);
    lion.el.style.transition = `transform ${secs}s linear`;
    lion.el.style.transform = `translateX(${x}px)`;
    lion.x = x;
    lion.timer = setTimeout(then, secs * 1000);
  }

  function rest(lion, pose, secs) {
    setPose(lion, pose);
    lion.timer = setTimeout(() => decide(lion), (secs * 1000) / timeScale);
  }

  function decide(lion) {
    if (!running || !spots.length) return;
    const here = spotOf(lion);
    const mom = byKind.mother;

    // The cub stays close to its mother
    if (lion.kind === 'cub' && Math.abs(lion.x - mom.x) > 160) {
      const s = spotOf(mom) || spots[0];
      moveTo(lion, placeIn(s, lion.w, mom.x + rand(-40, 50)), 'run', () => decide(lion));
      return;
    }
    if (lion.kind === 'cub' && mom.action === 'sleep' && here && Math.random() < 0.6) {
      moveTo(lion, placeIn(here, lion.w, mom.x + mom.w * 0.55), 'walk', () => rest(lion, 'sleep', rand(12, 25)));
      return;
    }

    let action = pick(PERSONALITY[lion.kind]);
    // Resting only happens where the lion can be seen
    if (!here && (action === 'sit' || action === 'sleep' || action === 'idle')) action = 'walk';

    if (action === 'walk' || action === 'run') {
      let target;
      if (lion.kind === 'father' && Math.random() < 0.5) target = placeIn(spotOf(mom) || otherSpot(lion), lion.w, mom.x - lion.w * 0.6);
      else if (lion.kind === 'cub') target = placeIn(spotOf(mom) || here || spots[0], lion.w);
      else target = placeIn(Math.random() < 0.55 ? otherSpot(lion) : (here || spots[0]), lion.w);
      moveTo(lion, target, action, () => decide(lion));
    } else if (action === 'sit') rest(lion, 'sit', rand(4, 9));
    else if (action === 'sleep') rest(lion, 'sleep', rand(12, 25));
    else rest(lion, 'idle', rand(2, 4));
  }

  /* ----- start / stop ----- */

  function freeze() {
    running = false;
    lions.forEach((lion) => {
      clearTimeout(lion.timer);
      const m = new DOMMatrixReadOnly(getComputedStyle(lion.el).transform);
      jumpTo(lion, m.m41);
      if (lion.action === 'walk' || lion.action === 'run') setPose(lion, 'idle');
    });
  }

  function staticScene(pose) {
    const s = spots[0];
    if (!s) return;
    const poses = pose ? { father: pose, mother: pose, cub: pose } : { father: 'sit', mother: 'sleep', cub: 'sleep' };
    jumpTo(byKind.father, placeIn(s, byKind.father.w, s.l));
    jumpTo(byKind.mother, placeIn(s, byKind.mother.w, s.r - byKind.mother.w));
    jumpTo(byKind.cub, placeIn(s, byKind.cub.w, byKind.mother.x + byKind.mother.w * 0.45));
    if (pose) {
      // Preview: spread the family over both sides so every pose is visible
      const t = spots[spots.length - 1];
      jumpTo(byKind.mother, placeIn(t, byKind.mother.w, t.l));
      jumpTo(byKind.cub, placeIn(t, byKind.cub.w, t.r - byKind.cub.w));
    }
    lions.forEach((lion) => setPose(lion, poses[lion.kind], lion.kind === 'father' ? false : undefined));
  }

  function run() {
    if (!wide.matches) { freeze(); return; }
    layout();
    if (forced || reduce.matches) { freeze(); staticScene(forced); return; }
    if (running) return;
    running = true;
    const paused = document.visibilityState !== 'visible' || document.documentElement.classList.contains('viewing');
    if (paused) { running = false; return; }
    lions.forEach((lion, i) => setTimeout(() => decide(lion), 400 * i));
  }

  // Start the family together in one of the side margins
  function firstPlacement() {
    layout();
    const s = spots[Math.random() < 0.5 ? 0 : spots.length - 1];
    if (!s) return;
    jumpTo(byKind.mother, placeIn(s, byKind.mother.w));
    jumpTo(byKind.cub, placeIn(s, byKind.cub.w, byKind.mother.x + 30));
    jumpTo(byKind.father, placeIn(s, byKind.father.w, byKind.mother.x - 50));
  }

  firstPlacement();
  run();

  const restart = () => { freeze(); run(); };
  wide.addEventListener('change', restart);
  reduce.addEventListener('change', restart);
  document.addEventListener('visibilitychange', restart);
  new MutationObserver(restart).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      freeze();
      layout();
      // Bring anyone left in an odd place back into the open
      lions.forEach((lion) => { if (!spotOf(lion) && spots.length) jumpTo(lion, placeIn(spots[0], lion.w)); });
      run();
    }, 200);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!running) { layout(); } });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}
