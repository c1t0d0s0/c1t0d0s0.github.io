/* ==========================================================================
   THE LEARNING ZOO - lion family
   A father, a mother and a cub roam a walkway that runs across the whole page
   width, in front of the first row of blackboards and behind the second row
   (feet just above the 理科・社会 headings). They rest only where they can be
   seen (the open space on either side) and pass behind the boards in between.
   ========================================================================== */

const INK = '#1c2a4a';

const KINDS = {
  father: { width: 137, body: '#e8ab45', far: '#d39536', belly: '#fff4dc', tuft: '#8c4a22', mane: ['#b25a2a', '#d98a42'], face: 0.6 },
  mother: { width: 121, body: '#ebb456', far: '#d69d40', belly: '#fff4dc', tuft: '#8c4a22', face: 0.64 },
  cub: { width: 84, body: '#f2c46c', far: '#ddae55', belly: '#fff7e4', tuft: '#a8642e', spots: true, face: 0.76 },
};

/* ---------- Drawing ----------
   viewBox 14 0 146 120, ground at y = 114. The body is drawn from the side so the four legs
   can walk; the head faces the viewer and uses the same parts as the other zoo characters
   (squirrel monkey / lynx): round head, big eyes with two highlights, blush, small nose. */

const STROKE = `stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"`;
const HIP_Y = 92;

function leg(cls, hx, color, boot) {
  const y = HIP_Y;
  // One soft shape: a slightly tapered leg ending in a rounded paw that points forward.
  // The top is tucked under the body (legs are drawn before it), so no seam shows.
  const d = `M${hx - 8} ${y - 12}`
    + `C${hx - 9} ${y} ${hx - 8} ${y + 9} ${hx - 7} ${y + 14}`
    + `C${hx - 8} ${y + 20} ${hx - 4} ${y + 22.5} ${hx + 1} ${y + 22.5}`
    + `H${hx + 6}`
    + `C${hx + 12} ${y + 22.5} ${hx + 13} ${y + 15.5} ${hx + 7} ${y + 14}`
    + `C${hx + 7} ${y + 8} ${hx + 8} ${y} ${hx + 8} ${y - 12}Z`;
  const bootPath = boot
    ? `<path d="M${hx - 7.3} ${y + 11}C${hx - 8} ${y + 20} ${hx - 4} ${y + 22.5} ${hx + 1} ${y + 22.5}H${hx + 6}C${hx + 12} ${y + 22.5} ${hx + 13} ${y + 15.5} ${hx + 7.2} ${y + 11}Z" fill="${boot}" ${STROKE}/>`
      + `<path d="M${hx - 8.5} ${y + 8}H${hx + 8.5}V${y + 12.5}H${hx - 8.5}Z" fill="#ffffff" ${STROKE} stroke-width="2"/>`
    : '';
  return `<g class="ln-leg ${cls}" style="--hx:${hx}px;--hy:${y}px"><path d="${d}" fill="${color}" ${STROKE}/>${bootPath}</g>`;
}

/** A scalloped ring for the father's mane (face coordinates) */
function manePath(cx, cy, r, bumps, depth) {
  let d = '';
  for (let i = 0; i <= bumps; i++) {
    const a = (i / bumps) * Math.PI * 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) { d += `M${x.toFixed(1)} ${y.toFixed(1)}`; continue; }
    const am = ((i - 0.5) / bumps) * Math.PI * 2;
    d += `Q${(cx + Math.cos(am) * (r + depth)).toFixed(1)} ${(cy + Math.sin(am) * (r + depth)).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + 'Z';
}

/** Front-facing face in the 120 x 120 coordinate system of the other characters' heads */
function face(k) {
  const mane = k.mane
    ? `<path d="${manePath(60, 68, 50, 16, 10)}" fill="${k.mane[0]}" ${STROKE}/>`
      + `<path d="${manePath(60, 68, 42, 16, 6)}" fill="${k.mane[1]}"/>`
    : '';
  return `${mane}
    <g ${STROKE}><circle cx="29" cy="38" r="14" fill="${k.fur || k.body}"/><circle cx="91" cy="38" r="14" fill="${k.fur || k.body}"/></g>
    <circle cx="30" cy="39" r="7" fill="#f3b8a4"/><circle cx="90" cy="39" r="7" fill="#f3b8a4"/>
    <path d="M60 28C36 28 19 44 19 67C19 90 38 106 60 106C82 106 101 90 101 67C101 44 84 28 60 28Z" fill="${k.fur || k.body}" ${STROKE}/>
    <path d="M42 40Q60 34 78 40" fill="none" stroke="${k.fur ? '#8c4a22' : k.tuft}" stroke-width="2" stroke-linecap="round" opacity=".35"/>
    <ellipse cx="60" cy="87" rx="17" ry="12.5" fill="${k.belly}"/>
    <ellipse cx="28" cy="83" rx="6.5" ry="4" fill="#f7b3a6" opacity=".75"/><ellipse cx="92" cy="83" rx="6.5" ry="4" fill="#f7b3a6" opacity=".75"/>
    <g class="ln-eye-open">
      <ellipse cx="42" cy="69" rx="7.5" ry="8.5" fill="${INK}"/><circle cx="44.6" cy="65.4" r="3.1" fill="#fff"/><circle cx="39.4" cy="72.6" r="1.5" fill="#fff"/>
      <ellipse cx="78" cy="69" rx="7.5" ry="8.5" fill="${INK}"/><circle cx="80.6" cy="65.4" r="3.1" fill="#fff"/><circle cx="75.4" cy="72.6" r="1.5" fill="#fff"/>
    </g>
    <path class="ln-eye-closed" d="M35 70Q42 76 49 70M71 70Q78 76 85 70" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M55.6 79.6Q60 77.6 64.4 79.6Q62.8 84 60 84.6Q57.2 84 55.6 79.6Z" fill="#7a3f2a" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M60 84.6V87M60 87C58 91 53 91 51.5 88M60 87C62 91 67 91 68.5 88" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
    <g fill="${INK}" opacity=".55"><circle cx="49" cy="86" r="1.1"/><circle cx="47" cy="90" r="1.1"/><circle cx="71" cy="86" r="1.1"/><circle cx="73" cy="90" r="1.1"/></g>
    ${k.hat ? SANTA_HAT : ''}`;
}

// Santa hat in face coordinates: red cap flopping to the right, white trim and pompom
const SANTA_HAT = `<g transform="rotate(8 60 34)">
    <path d="M30 38C32 10 60 -4 90 2C102 5 108 14 106 26C100 21 94 24 90 38Z" fill="#d9473f" ${STROKE}/>
    <circle cx="106" cy="28" r="8.5" fill="#ffffff" ${STROKE}/>
    <path d="M24 38C24 30 96 30 96 38C96 46 24 46 24 38Z" fill="#ffffff" ${STROKE}/>
  </g>`;

// Santa coat details on the body: white fur hem and a black belt with a gold buckle
const BODY_PATH = 'M60 66C70 59 98 58 112 60C126 62 134 72 134 84C134 96 124 102 110 102H66C52 102 44 94 44 83C44 75 50 70 60 66Z';
const SANTA_BELT = `<clipPath id="ln-clip-santa"><path d="${BODY_PATH}"/></clipPath>
    <g clip-path="url(#ln-clip-santa)">
      <rect x="40" y="94" width="100" height="10" fill="#ffffff"/>
      <path d="M40 94H140" stroke="${INK}" stroke-width="2"/>
      <rect x="40" y="76" width="100" height="9" fill="#2b2b36"/>
    </g>
    <rect x="96" y="74.5" width="12" height="12" rx="2" fill="#f2c14e" ${STROKE} stroke-width="2"/>
    <rect x="99.5" y="78" width="5" height="5" fill="#2b2b36"/>
    <path d="${BODY_PATH}" fill="none" ${STROKE}/>`;

/** Costumes change colours and add pieces. 'santa': red coat, belt, boots, white-mane beard, hat */
function dressed(k, costume) {
  if (costume !== 'santa') return k;
  return { ...k, fur: k.body, body: '#d9473f', far: '#b8392f', belly: '#ffffff', tuft: '#ffffff', mane: ['#ffffff', '#e8edf4'], hat: true, boot: '#2b2b36', belt: true };
}

export function lionSVG(kind, costume) {
  const k = dressed(KINDS[kind], costume);
  const spots = k.spots
    ? `<g fill="${k.tuft}" opacity=".25"><circle cx="68" cy="72" r="3.4"/><circle cx="80" cy="81" r="3"/><circle cx="93" cy="70" r="3.4"/><circle cx="104" cy="80" r="2.8"/><circle cx="58" cy="87" r="2.8"/></g>`
    : '';
  // Head centre sits over the front shoulders; the face is scaled from its 120-unit drawing
  const head = `translate(122 56) scale(${k.face}) translate(-60 -67)`;
  return `<svg viewBox="14 0 146 120" aria-hidden="true" focusable="false">
  <ellipse class="ln-shadow" cx="90" cy="114" rx="46" ry="4.5"/>
  <g class="ln-flip"><g class="ln-pose"><g class="ln-bob">
    <g class="ln-tail">
      <path d="M48 76C34 75 26 66 26 52" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
      <path d="M48 76C34 75 26 66 26 52" fill="none" stroke="${k.body}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M26 41C19 44 19 54 26 56C33 54 33 44 26 41Z" fill="${k.tuft}" ${STROKE}/>
    </g>
    ${leg('far hind b', 72, k.far, k.boot)}
    ${leg('far front a', 112, k.far, k.boot)}
    ${leg('near hind a', 60, k.body, k.boot)}
    ${leg('near front b', 122, k.body, k.boot)}
    <path d="M60 66C70 59 98 58 112 60C126 62 134 72 134 84C134 96 124 102 110 102H66C52 102 44 94 44 83C44 75 50 70 60 66Z" fill="${k.body}" ${STROKE}/>
    <path d="M68 102C72 94 104 94 110 102Z" fill="${k.belly}"/>
    ${spots}
    ${k.belt ? SANTA_BELT : ''}
    <g class="ln-head"><g transform="${head}">${face(k)}</g></g>
  </g></g>
  <g class="ln-z" fill="${INK}"><text x="140" y="22" font-size="12">z</text><text x="150" y="12" font-size="9">z</text></g>
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
    // 12月: the father dresses up as Santa
    el.innerHTML = lionSVG(kind, Number(window.MONTH) === 12 && kind === 'father' ? 'santa' : null);
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
    const tops = [...new Set(habitats.map((h) => h.offsetTop))].sort((a, b) => a - b);
    // The walkway runs just above the headings of the second row (理科・社会)
    const row = habitats.filter((h) => h.offsetTop === (tops[1] !== undefined ? tops[1] : tops[0]));
    const zr = zoo.getBoundingClientRect();
    const headings = row.map((h) => h.querySelector('.board h2')).filter(Boolean);
    const ground = headings.length
      ? Math.min(...headings.map((el) => el.getBoundingClientRect().top - zr.top)) - 4
      : Math.max(...row.map((h) => h.offsetTop + h.offsetHeight));
    path.style.top = `${ground - path.offsetHeight}px`;

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
