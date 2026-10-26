/* ==========================================================================
   THE LEARNING ZOO - seasonal costumes
   In a few special months one of the subject animals dresses up for the season.
   Each piece is drawn in that animal's own coordinates (the 120-unit system of
   the apps' favicons) and slotted into its SVG:
     back  - behind the body (a cape)
     body  - over the body, under the face (kimono, blazer, raincoat)
     head  - inside the head group, so it tilts / hops with it (hats, hair ornament)
     feet  - over the sparrow's feet (boots)
   The lion father's Santa outfit lives in lions.js.
   ========================================================================== */

const INK = '#1c2a4a';
// Outline attributes (the strict SVG parser rejects a repeated stroke-width, so the width is a parameter)
const sw = (w) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const S = sw(2.5);
// Body outline shared by the squirrel monkey and the lynx
const ROUND_BODY = 'M60 92C38 92 30 112 30 132C30 150 42 158 60 158C78 158 90 150 90 132C90 112 82 92 60 92Z';

const COSTUMES = {
  // 1月: お正月の着物 (lynx)
  1: [{
    animal: 'lynx',
    body: `
      <clipPath id="costume-clip-lynx"><path d="${ROUND_BODY}"/></clipPath>
      <g clip-path="url(#costume-clip-lynx)">
        <rect x="26" y="90" width="68" height="60" fill="#d9473f"/>
        <g fill="#fff4f0" opacity=".9">
          <circle cx="40" cy="104" r="2.6"/><circle cx="80" cy="102" r="2.6"/><circle cx="36" cy="140" r="2.6"/>
          <circle cx="84" cy="138" r="2.6"/><circle cx="48" cy="144" r="2"/><circle cx="72" cy="146" r="2"/>
        </g>
        <path d="M46 92L60 120L74 92L69 92L60 111L51 92Z" fill="#fffaf0" ${S}/>
        <rect x="24" y="118" width="72" height="13" fill="#f2c14e" ${S}/>
        <path d="M24 124.5H96" stroke="#c0392b" stroke-width="2.5"/>
        <path d="M24 150H96" stroke="${INK}" stroke-width="2.5"/>
      </g>
      <path d="${ROUND_BODY}" fill="none" ${S}/>`,
    head: `
      <g transform="translate(95 50)">
        <g fill="#ffffff" ${sw(1.6)}>
          <circle cx="0" cy="-6" r="4.6"/><circle cx="5.7" cy="-1.9" r="4.6"/><circle cx="3.5" cy="4.9" r="4.6"/>
          <circle cx="-3.5" cy="4.9" r="4.6"/><circle cx="-5.7" cy="-1.9" r="4.6"/>
        </g>
        <circle r="3" fill="#d9473f" stroke="${INK}" stroke-width="1.4"/>
        <circle cx="8" cy="9" r="3.2" fill="#d9473f" stroke="${INK}" stroke-width="1.4"/>
        <circle cx="12" cy="1" r="2.6" fill="#ffd84a" stroke="${INK}" stroke-width="1.4"/>
      </g>`,
  }],

  // 4月: 学校の制服 (squirrel monkey)
  4: [{
    animal: 'monkey',
    body: `
      <clipPath id="costume-clip-monkey"><path d="${ROUND_BODY}"/></clipPath>
      <g clip-path="url(#costume-clip-monkey)">
        <rect x="26" y="90" width="68" height="56" fill="#2f3f6e"/>
        <path d="M26 146H94" stroke="${INK}" stroke-width="2.5"/>
        <path d="M48 92L60 124L72 92Z" fill="#fffaf0" ${S}/>
        <path d="M48 92L56 116M72 92L64 116" fill="none" stroke="#4a5b8e" stroke-width="2.5"/>
        <circle cx="60" cy="132" r="2" fill="#f2c14e"/><circle cx="60" cy="140" r="2" fill="#f2c14e"/>
      </g>
      <path d="${ROUND_BODY}" fill="none" ${S}/>
      <ellipse cx="38" cy="126" rx="7" ry="13" transform="rotate(14 38 126)" fill="#2f3f6e" ${S}/>
      <ellipse cx="82" cy="126" rx="7" ry="13" transform="rotate(-14 82 126)" fill="#2f3f6e" ${S}/>
      <g fill="#c0392b" ${sw(1.8)}>
        <path d="M60 106L50 101V111Z"/><path d="M60 106L70 101V111Z"/><circle cx="60" cy="106" r="2.6"/>
      </g>`,
    head: `
      <path d="M27 42C27 13 93 13 93 42Z" fill="#ffd84a" ${S}/>
      <path d="M33 30C46 25 74 25 87 30" fill="none" stroke="#e6b800" stroke-width="2"/>
      <path d="M21 42C21 47 99 47 99 42C99 37 21 37 21 42Z" fill="#ffd84a" ${S}/>`,
  }],

  // 6月: レインコートと長靴 (sparrow)
  6: [{
    animal: 'sparrow',
    feet: `
      <g fill="#e2503a" ${sw(2.2)}>
        <path d="M42 96H54V110H58C60 110 60 115 57 115H42Z"/>
        <path d="M66 96H78V110H82C84 110 84 115 81 115H66Z"/>
      </g>`,
    body: `
      <path d="M22 80C23 97 40 107 60 107C80 107 97 97 98 80C88 89 74 93 60 93C46 93 32 89 22 80Z" fill="#ffd23f" ${S}/>
      <circle cx="52" cy="99" r="1.8" fill="${INK}"/><circle cx="68" cy="99" r="1.8" fill="${INK}"/>
      <path d="M18 72C18 45 37 24 60 24C83 24 102 45 102 72" fill="none" stroke="${INK}" stroke-width="12.5" stroke-linecap="round"/>
      <path d="M18 72C18 45 37 24 60 24C83 24 102 45 102 72" fill="none" stroke="#ffd23f" stroke-width="7.5" stroke-linecap="round"/>`,
  }],

  // 8月: 麦わら帽子 (shiba)
  8: [{
    animal: 'shiba',
    head: `
      <path d="M38 32C36 12 84 12 82 32Z" fill="#f2d27a" ${S}/>
      <path d="M44 20H76M41 26H79" fill="none" stroke="#c9a14a" stroke-width="1.6"/>
      <path d="M38.5 27H81.5V33H38.5Z" fill="#d9473f" stroke="${INK}" stroke-width="2"/>
      <ellipse cx="60" cy="34" rx="40" ry="7" fill="#f2d27a" ${S}/>
      <path d="M28 34H92" fill="none" stroke="#c9a14a" stroke-width="1.4" opacity=".8"/>`,
  }],

  // 10月: ハロウィンの魔女 (squirrel monkey)
  10: [{
    animal: 'monkey',
    back: `
      <path d="M42 96C26 110 18 138 20 160H100C102 138 94 110 78 96Z" fill="#5b3f8c" ${S}/>
      <path d="M44 100C32 114 27 136 28 156" fill="none" stroke="#f0963c" stroke-width="2.5" opacity=".8"/>
      <path d="M76 100C88 114 93 136 92 156" fill="none" stroke="#f0963c" stroke-width="2.5" opacity=".8"/>`,
    body: `
      <g fill="#f0963c" ${sw(1.8)}>
        <path d="M60 111L51 106V116Z"/><path d="M60 111L69 106V116Z"/><circle cx="60" cy="111" r="2.6"/>
      </g>`,
    head: `
      <g transform="rotate(-8 60 34)">
        <ellipse cx="60" cy="36" rx="42" ry="8" fill="#5b3f8c" ${S}/>
        <path d="M38 34C42 16 50 -2 66 -18C70 -6 76 2 86 4C80 12 80 22 82 34Z" fill="#5b3f8c" ${S}/>
        <path d="M39 28C52 31 70 31 83 28L82 34C70 37 52 37 38 34Z" fill="#f0963c" ${sw(2)}/>
        <path d="M58 6L60 10L64 10L61 13L62 17L58 15L55 17L56 13L53 10L57 10Z" fill="#ffd84a"/>
      </g>`,
  }],

  // 12月: サンタの帽子 (shiba). The lion father's Santa outfit is drawn in lions.js
  12: [{
    animal: 'shiba',
    head: `
      <g transform="rotate(10 60 30)">
        <path d="M34 32C38 8 62 -4 88 4C96 7 100 14 98 22C92 18 88 22 86 32Z" fill="#d9473f" ${S}/>
        <circle cx="98" cy="24" r="7" fill="#ffffff" ${S}/>
        <path d="M30 32C30 26 90 26 90 32C90 39 30 39 30 32Z" fill="#ffffff" ${S}/>
      </g>`,
  }],
};

/** Parses an SVG fragment into nodes in the SVG namespace */
function svgNodes(markup) {
  const doc = new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${markup}</svg>`, 'image/svg+xml');
  return Array.from(doc.documentElement.childNodes).map((n) => document.importNode(n, true));
}

function insertBefore(ref, markup) {
  if (!ref || !markup) return;
  for (const n of svgNodes(markup)) ref.parentNode.insertBefore(n, ref);
}
function insertAfter(ref, markup) {
  if (!ref || !markup) return;
  const next = ref.nextSibling;
  for (const n of svgNodes(markup)) ref.parentNode.insertBefore(n, next);
}
function append(parent, markup) {
  if (!parent || !markup) return;
  for (const n of svgNodes(markup)) parent.append(n);
}

function dress(c) {
  const svg = document.querySelector(`.animal.${c.animal}`);
  if (!svg) return;
  if (c.animal === 'sparrow') {
    const bird = svg.querySelector('.bird');
    if (!bird) return;
    insertAfter(bird.firstElementChild, c.feet);                       // the legs come first
    insertAfter(bird.querySelector('path[fill="#fbf3e2"]'), c.body);   // over the white chest, under the face
    insertAfter(bird.querySelector('path[fill="#fbf3e2"]'), c.head);
    return;
  }
  const head = svg.querySelector('.head');
  if (!head) return;
  const headTop = head.parentNode === svg ? head : head.parentNode;   // the shiba's head sits in a wrapper
  const bodyGroup = Array.from(svg.children).find((g) => g.tagName === 'g' && g.querySelector('path[d^="M60 9"]'));
  insertBefore(bodyGroup, c.back);
  insertBefore(headTop, c.body);
  append(head, c.head);
}

function start() {
  const month = Number(window.MONTH) || new Date().getMonth() + 1;
  (COSTUMES[month] || []).forEach(dress);
  document.documentElement.dataset.costume = COSTUMES[month] ? String(month) : '';
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}
