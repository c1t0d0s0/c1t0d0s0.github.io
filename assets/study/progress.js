/* ==========================================================================
   まなびの どうぶつえん - がんばり ノート
   Google login + progress charts (today / this week / this month) built from the
   records the learning apps save in Firestore: users/{uid}/apps/{appId}.
   ========================================================================== */

const SDK = 'https://www.gstatic.com/firebasejs/13.0.0/';

/* ---------- Pure helpers (exported so they can be checked with Node) ---------- */

const DATE_IN_ID = /(\d{4}-\d{2}-\d{2})/;

/** Local date as YYYY-MM-DD */
export function ymd(d) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Every date of the period that contains `today`. Weeks start on Monday. */
export function periodDates(kind, today) {
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let length = 1;
  if (kind === 'week') {
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    length = 7;
  } else if (kind === 'month') {
    start.setDate(1);
    length = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  }
  const dates = [];
  for (let i = 0; i < length; i++) {
    dates.push(ymd(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)));
  }
  return dates;
}

const strings = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []);

/**
 * Reads one app document (AppDoc, shared by all the learning apps).
 *   activeDays: days the app's daily goal was met
 *   completed:  finished items; many ids carry a date (g3:2026-10-12, daily-2026-10-15 ...)
 */
export function readAppDoc(doc) {
  const goalDays = new Set(strings(doc && doc.activeDays));
  const clearsByDay = {};
  const completed = strings(doc && doc.completed);
  for (const id of completed) {
    const m = DATE_IN_ID.exec(id);
    if (m) clearsByDay[m[1]] = (clearsByDay[m[1]] || 0) + 1;
  }
  return {
    exists: !!doc,
    dated: goalDays.size > 0 || Object.keys(clearsByDay).length > 0,
    goalDays,
    clearsByDay,
    collected: completed.length,
  };
}

/**
 * Builds everything the board shows for one period.
 * apps: [{ id, name, subject }], records: { [appId]: readAppDoc(...) }
 */
export function summarize(apps, records, kind, today) {
  const dates = periodDates(kind, today);
  const todayKey = ymd(today);
  // Apps whose document exists but holds no dated records (collections only)
  const undated = apps.filter((a) => records[a.id] && records[a.id].exists && !records[a.id].dated);
  const dated = apps.filter((a) => !undated.includes(a));

  const days = dates.map((date) => {
    const goals = dated.filter((a) => records[a.id] && records[a.id].goalDays.has(date));
    return { date, future: date > todayKey, goals };
  });

  const rows = dated.map((a) => {
    const r = records[a.id];
    let goalDays = 0;
    let clears = 0;
    for (const date of dates) {
      if (r && r.goalDays.has(date)) goalDays++;
      clears += (r && r.clearsByDay[date]) || 0;
    }
    return { app: a, goalDays, clears };
  });

  return {
    kind,
    dates,
    days,
    rows,
    undated: undated.map((a) => ({ app: a, collected: records[a.id].collected })),
    goalTotal: days.reduce((n, d) => n + d.goals.length, 0),
    activeDayCount: days.filter((d) => d.goals.length > 0).length,
  };
}

/* ---------- Page ---------- */

const SUBJECTS = {
  math: { name: '算数', color: '#f4c430' },
  japanese: { name: '国語', color: '#ff7aa2' },
  science: { name: '理科', color: '#56b4f0' },
  social: { name: '社会', color: '#b4e05a' },
};
const SUBJECT_ORDER = ['math', 'japanese', 'science', 'social'];
const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

function readConfig() {
  // config.js defines these as global constants (same format as the learning apps);
  // module code sees them through the shared global scope
  /* global FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_APP_ID */
  const cfg = {
    apiKey: typeof FIREBASE_API_KEY === 'undefined' ? '' : FIREBASE_API_KEY,
    authDomain: typeof FIREBASE_AUTH_DOMAIN === 'undefined' ? '' : FIREBASE_AUTH_DOMAIN,
    projectId: typeof FIREBASE_PROJECT_ID === 'undefined' ? '' : FIREBASE_PROJECT_ID,
    appId: typeof FIREBASE_APP_ID === 'undefined' ? '' : FIREBASE_APP_ID,
  };
  return cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId ? cfg : null;
}

/** The apps come from the blackboard links, so adding a link adds it here too */
function collectApps() {
  const apps = [];
  document.querySelectorAll('.habitat').forEach((habitat) => {
    const subject = (habitat.getAttribute('aria-labelledby') || '').replace('subject-', '');
    if (!SUBJECTS[subject]) return;
    habitat.querySelectorAll('.links a').forEach((link) => {
      const id = new URL(link.getAttribute('href'), location.href).pathname.split('/').filter(Boolean)[0];
      const nameEl = link.querySelector('.name');
      if (id) apps.push({ id, subject, name: (nameEl || link).textContent.trim() });
    });
  });
  return apps;
}

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k === 'style') node.style.cssText = v;
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const c of [].concat(children || [])) if (c) node.append(c);
  return node;
}

const md = (date) => `${Number(date.slice(5, 7))}/${Number(date.slice(8, 10))}`;
const weekday = (date) => WEEKDAYS[new Date(`${date}T00:00:00`).getDay()];

function start() {
  const section = document.getElementById('progress');
  const authBox = document.getElementById('auth');
  if (!section || !authBox) return;
  const config = readConfig();
  if (!config) return; // no Firebase settings: keep the page exactly as before

  const authBtn = document.getElementById('auth-btn');
  const authState = document.getElementById('auth-state');
  const view = document.getElementById('progress-view');
  const guest = document.getElementById('progress-guest');
  const guestBtn = document.getElementById('progress-login');
  const statusEl = document.getElementById('progress-status');
  const summaryEl = document.getElementById('progress-summary');
  const chartEl = document.getElementById('progress-chart');
  const legendEl = document.getElementById('progress-legend');
  const tableBody = document.getElementById('progress-rows');
  const tableHead = document.getElementById('progress-head-days');
  const undatedEl = document.getElementById('progress-undated');
  const tabs = section.querySelectorAll('.period-tab');

  const apps = collectApps();
  const emulator = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) && /[?&]emulator=1/.test(location.search);

  let fb = null;           // loaded Firebase modules + instances
  let uid = null;
  let records = null;      // { appId: readAppDoc(...) }
  let period = 'today';
  let loadSeq = 0;

  section.hidden = false;
  authBox.hidden = false;
  setAuthUI('loading');

  /* ----- auth ----- */

  function setAuthUI(state) {
    authBtn.disabled = state === 'loading';
    if (state === 'in') {
      authState.textContent = 'ログイン中';
      authBtn.textContent = 'ログアウト';
      guest.hidden = true;
      view.hidden = false;
    } else {
      authState.textContent = '';
      authBtn.textContent = 'Googleで ログイン';
      guest.hidden = false;
      view.hidden = true;
    }
  }

  async function loadFirebase() {
    const [appMod, authMod, dbMod] = await Promise.all([
      import(`${SDK}firebase-app.js`),
      import(`${SDK}firebase-auth.js`),
      import(`${SDK}firebase-firestore-lite.js`),
    ]);
    const app = appMod.initializeApp(config);
    const auth = authMod.getAuth(app);
    const db = dbMod.getFirestore(app);
    if (emulator) {
      authMod.connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      dbMod.connectFirestoreEmulator(db, '127.0.0.1', 8080);
    }
    return { authMod, dbMod, auth, db };
  }

  async function signIn() {
    try {
      if (emulator && window.__testUser) {
        // The emulator has no real Google screen; tests pick the user (same as the apps)
        const sub = window.__testUser;
        const token = JSON.stringify({ sub, email: `${sub}@example.com`, email_verified: true });
        await fb.authMod.signInWithCredential(fb.auth, fb.authMod.GoogleAuthProvider.credential(token));
        return;
      }
      await fb.authMod.signInWithPopup(fb.auth, new fb.authMod.GoogleAuthProvider());
    } catch (e) {
      if (e && /popup-closed|cancelled-popup/.test(e.code || '')) return;
      showStatus('ログインできませんでした。もう一度 ためしてね。');
    }
  }

  function onAuthClick() {
    if (!fb) return;
    if (uid) fb.authMod.signOut(fb.auth);
    else signIn();
  }
  authBtn.addEventListener('click', onAuthClick);
  guestBtn.addEventListener('click', onAuthClick);

  /* ----- records ----- */

  function showStatus(text, retry) {
    statusEl.replaceChildren();
    if (!text) { statusEl.hidden = true; return; }
    statusEl.hidden = false;
    statusEl.append(text);
    if (retry) {
      const b = el('button', { type: 'button', class: 'progress-retry', text: 'もう一度' });
      b.addEventListener('click', () => loadRecords());
      statusEl.append(' ', b);
    }
  }

  async function loadRecords() {
    if (!fb || !uid) return;
    const seq = ++loadSeq;
    const { doc, getDoc } = fb.dbMod;
    try {
      const snaps = await Promise.all(apps.map((a) => getDoc(doc(fb.db, 'users', uid, 'apps', a.id))));
      if (seq !== loadSeq) return;
      records = {};
      snaps.forEach((snap, i) => { records[apps[i].id] = readAppDoc(snap.exists() ? snap.data() : null); });
      showStatus('');
      render();
    } catch (e) {
      if (seq !== loadSeq) return;
      showStatus('きろくを 読みこめませんでした。', true);
    }
  }

  /* ----- rendering ----- */

  function render() {
    if (!records) return;
    const today = new Date();
    const s = summarize(apps, records, period, today);
    tabs.forEach((t) => t.setAttribute('aria-selected', t.dataset.period === period ? 'true' : 'false'));

    if (period === 'today') {
      const n = s.goalTotal;
      summaryEl.textContent = n > 0
        ? `今日は ${n}つの アプリで 目標たっせい！`
        : '今日は まだ 目標たっせいした アプリが ないよ。';
      chartEl.replaceChildren(renderToday(s));
      legendEl.hidden = true;
    } else {
      const label = period === 'week' ? '今週' : '今月';
      summaryEl.textContent = s.activeDayCount > 0
        ? `${label}は ${s.activeDayCount}日 がんばったよ（目標たっせい ${s.goalTotal}回）`
        : `${label}は まだ 目標たっせいした 日が ないよ。`;
      chartEl.replaceChildren(renderBars(s, today));
      legendEl.hidden = false;
    }
    renderTable(s);
    renderUndated(s);
  }

  function renderToday(s) {
    const list = el('div', { class: 'today-list' });
    for (const key of SUBJECT_ORDER) {
      const rows = s.rows.filter((r) => r.app.subject === key);
      if (!rows.length) continue;
      const group = el('div', { class: 'today-group' }, [
        el('p', { class: 'today-subject', style: `--subject:${SUBJECTS[key].color}`, text: SUBJECTS[key].name }),
      ]);
      const ul = el('ul', {});
      for (const r of rows) {
        const done = r.goalDays > 0;
        ul.append(el('li', { class: done ? 'is-done' : '' }, [
          el('span', { class: 'today-mark', 'aria-hidden': 'true', text: done ? '✓' : '・' }),
          el('span', { class: 'today-name', text: r.app.name }),
          el('span', { class: 'today-state', text: done ? 'たっせい' : 'まだ' }),
          r.clears > 0 ? el('span', { class: 'today-clears', text: `クリア ${r.clears}` }) : null,
        ]));
      }
      group.append(ul);
      list.append(group);
    }
    return list;
  }

  function renderBars(s, today) {
    const todayKey = ymd(today);
    const peak = Math.max(0, ...s.days.map((d) => d.goals.length));
    const max = Math.max(3, peak);
    const step = max > 8 ? 2 : 1;
    const isMonth = s.kind === 'month';

    const wrap = el('div', { class: `bars ${isMonth ? 'bars-month' : 'bars-week'}` });
    const axis = el('div', { class: 'bars-axis', 'aria-hidden': 'true' });
    const plot = el('div', { class: 'bars-plot', role: 'list' });
    for (let v = 0; v <= max; v += step) {
      axis.append(el('span', { style: `bottom:${(v / max) * 100}%`, text: String(v) }));
      plot.append(el('i', { class: 'bars-grid', style: `bottom:${(v / max) * 100}%`, 'aria-hidden': 'true' }));
    }
    const tip = el('div', { class: 'bars-tip', role: 'status', hidden: true });

    s.days.forEach((d, i) => {
      const dayNum = Number(d.date.slice(8, 10));
      // Month: label day 1, every 5th day, and the last day unless it would touch the 30 label
      const showLabel = !isMonth || dayNum === 1 || dayNum % 5 === 0 || (i === s.days.length - 1 && dayNum % 5 >= 3);
      const names = d.goals.map((a) => a.name);
      const aria = `${md(d.date)}（${weekday(d.date)}）: ${d.future ? 'まだ 来ていない日' : names.length ? `${names.length}つ たっせい（${names.join('、')}）` : 'たっせい なし'}`;
      const col = el('button', {
        type: 'button',
        class: `bars-col${d.future ? ' is-future' : ''}${d.date === todayKey ? ' is-today' : ''}`,
        role: 'listitem',
        'aria-label': aria,
      });
      const stack = el('span', { class: 'bars-stack', style: `height:${(d.goals.length / max) * 100}%` });
      for (const key of SUBJECT_ORDER) {
        const n = d.goals.filter((a) => a.subject === key).length;
        if (n) stack.append(el('span', { class: 'bars-seg', style: `flex:${n};background:${SUBJECTS[key].color}` }));
      }
      col.append(stack);
      col.append(el('span', {
        class: 'bars-label',
        'aria-hidden': 'true',
        text: showLabel ? (isMonth ? String(dayNum) : `${weekday(d.date)}`) : '',
      }));
      if (!isMonth) col.append(el('span', { class: 'bars-sub', 'aria-hidden': 'true', text: md(d.date) }));

      const showTip = () => {
        tip.replaceChildren(
          el('strong', { text: `${md(d.date)}（${weekday(d.date)}）` }),
          d.future ? ' まだ 来ていない日' : names.length ? ` ${names.join('・')}` : ' たっせい なし',
        );
        tip.hidden = false;
        const pr = plot.getBoundingClientRect();
        const cr = col.getBoundingClientRect();
        const center = cr.left + cr.width / 2 - pr.left;
        tip.style.left = `${Math.min(Math.max(center, 80), pr.width - 80)}px`;
      };
      col.addEventListener('mouseenter', showTip);
      col.addEventListener('focus', showTip);
      col.addEventListener('mouseleave', () => { tip.hidden = true; });
      col.addEventListener('blur', () => { tip.hidden = true; });
      plot.append(col);
    });

    plot.append(tip);
    wrap.append(axis, plot);
    return wrap;
  }

  function renderTable(s) {
    tableHead.textContent = s.kind === 'today' ? '目標たっせい' : 'たっせいした日';
    tableBody.replaceChildren();
    for (const key of SUBJECT_ORDER) {
      for (const r of s.rows.filter((x) => x.app.subject === key)) {
        tableBody.append(el('tr', {}, [
          el('td', { class: 'col-subject', text: SUBJECTS[key].name }),
          el('th', { scope: 'row' }, [el('span', { class: 'swatch', style: `background:${SUBJECTS[key].color}`, 'aria-hidden': 'true' }), r.app.name]),
          el('td', { text: s.kind === 'today' ? (r.goalDays ? '✓' : '—') : `${r.goalDays}日` }),
          el('td', { text: String(r.clears) }),
        ]));
      }
    }
  }

  function renderUndated(s) {
    undatedEl.replaceChildren();
    if (!s.undated.length) { undatedEl.hidden = true; return; }
    undatedEl.hidden = false;
    undatedEl.append(el('p', { class: 'undated-head', text: '日付の ない きろく（これまでの 合計）' }));
    const ul = el('ul', {});
    for (const u of s.undated) ul.append(el('li', {}, [el('span', { text: u.app.name }), el('span', { text: `あつめた数 ${u.collected}` })]));
    undatedEl.append(ul);
  }

  /* ----- events ----- */

  tabs.forEach((t) => t.addEventListener('click', () => { period = t.dataset.period; render(); }));

  // Arrow keys move between the period tabs
  section.querySelector('.period-tabs').addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const list = Array.from(tabs);
    const i = list.findIndex((t) => t.dataset.period === period);
    const next = list[(i + (e.key === 'ArrowRight' ? 1 : list.length - 1)) % list.length];
    period = next.dataset.period;
    render();
    next.focus();
  });

  // Coming back from an app (viewer closed) or to the tab: read the latest records
  const viewer = document.getElementById('viewer');
  if (viewer) {
    new MutationObserver(() => { if (viewer.hidden) loadRecords(); }).observe(viewer, { attributes: true, attributeFilter: ['hidden'] });
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') loadRecords(); });

  const boot = async () => {
    try {
      fb = await loadFirebase();
    } catch (e) {
      setAuthUI('out');
      authBtn.disabled = true;
      guestBtn.disabled = true;
      showStatus('ログインの じゅんびが できませんでした。');
      return;
    }
    if (emulator) window.__studyFirebase = fb;
    fb.authMod.onAuthStateChanged(fb.auth, (user) => {
      uid = user ? user.uid : null;
      records = null;
      showStatus('');
      setAuthUI(uid ? 'in' : 'out');
      if (uid) {
        summaryEl.textContent = 'きろくを 読みこみちゅう…';
        chartEl.replaceChildren();
        tableBody.replaceChildren();
        undatedEl.hidden = true;
        loadRecords();
      }
    });
  };
  if (document.readyState === 'complete') boot();
  else window.addEventListener('load', boot, { once: true });
}

if (typeof document !== 'undefined') start();
