/* ==========================================================================
   THE LEARNING ZOO (study.html) - Service Worker for the installed app
   Registered with scope "/study.html", so it only controls study.html; the portal's
   own sw.js (scope "/") keeps handling index.html.
   - study.html: network first, falling back to the saved copy when offline
   - the page's own scripts, icons and config.js: served from the cache, refreshed in the background
   - everything else (learning apps, fonts, Firebase, analytics) goes straight to the network
   ========================================================================== */

const CACHE = 'study-v2';
const PAGE = 'study.html';
const ASSETS = [
  'assets/study/progress.js',
  'assets/study/lions.js',
  'assets/study/costumes.js',
  'assets/study/super.js',
  'assets/study/favicon.svg',
  'assets/study/icon-192.png',
  'study.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll([PAGE, ...ASSETS]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('study-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // The page itself (any query string, e.g. ?month=10 or ?source=pwa)
  if (req.mode === 'navigate' && url.pathname.endsWith('/' + PAGE)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(PAGE, copy));
          }
          return res;
        })
        .catch(() => caches.match(PAGE))
    );
    return;
  }

  const path = url.pathname.replace(/^\//, '');

  // News text: network first so a new line shows on the next visit; saved copy when offline
  if (path === 'assets/study/news.txt') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(path, copy));
          }
          return res;
        })
        .catch(() => caches.match(path))
    );
    return;
  }

  // The page's own files: cache first, refreshed in the background
  if (path.startsWith('assets/study/') || path === 'config.js' || path === 'study.webmanifest') {
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const cached = await cache.match(req, { ignoreSearch: true });
        const refresh = fetch(req)
          .then((res) => { if (res.ok) cache.put(req, res.clone()); return res; })
          .catch(() => cached);
        return cached || refresh;
      })
    );
  }
});
