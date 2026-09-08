/* ==========================================================================
   c1t0d0s0 Portal - Service Worker
   Provides 24-hour caching for assets/images/
   ========================================================================== */

const CACHE_NAME = 'portal-images-v1';
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

self.addEventListener('install', (event) => {
  // Activate worker immediately once installed
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Clean up old image caches and take control of all open clients
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key.startsWith('portal-images-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Only intercept requests for assets/images/ on the same origin
  if (url.origin === self.location.origin && url.pathname.includes('/assets/images/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
          const cachedTime = cachedResponse.headers.get('sw-cached-time');
          const isFresh = cachedTime && (Date.now() - parseInt(cachedTime, 10)) < CACHE_EXPIRATION_MS;

          if (isFresh) {
            return cachedResponse;
          }
        }

        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            const headers = new Headers(responseClone.headers);
            headers.set('sw-cached-time', Date.now().toString());

            const blob = await responseClone.blob();
            const customResponse = new Response(blob, {
              status: responseClone.status,
              statusText: responseClone.statusText,
              headers: headers
            });

            await cache.put(event.request, customResponse);
          }
          return networkResponse;
        } catch (err) {
          // If offline or network error, fallback to stale cache if available
          if (cachedResponse) {
            return cachedResponse;
          }
          throw err;
        }
      })
    );
  }
});
