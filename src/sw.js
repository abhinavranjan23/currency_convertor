const CACHE_NAME = 'currency-converter-v1';
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/index.js',
  '/index.css'
];

const API_CACHE_NAME = 'currency-api-v1';
const API_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache API responses
  if (url.origin === 'https://latest.currency-api.pages.dev') {
    event.respondWith(
      caches.open(API_CACHE_NAME).then(cache => {
        return cache.match(request).then(cachedResponse => {
          if (cachedResponse) {
            const cachedDate = new Date(cachedResponse.headers.get('sw-cache-date'));
            const now = new Date();
            
            if (now - cachedDate < API_CACHE_DURATION) {
              return cachedResponse;
            }
          }

          return fetch(request).then(response => {
            if (response.ok) {
              const responseClone = response.clone();
              const headers = new Headers(responseClone.headers);
              headers.set('sw-cache-date', new Date().toISOString());
              
              const cachedResponse = new Response(responseClone.body, {
                status: responseClone.status,
                statusText: responseClone.statusText,
                headers: headers
              });
              
              cache.put(request, cachedResponse);
            }
            return response;
          }).catch(() => {
            // Return cached response if available when offline
            return cachedResponse || new Response('Offline', { status: 503 });
          });
        });
      })
    );
    return;
  }

  // Cache static assets
  if (request.destination === 'document' || 
      request.destination === 'script' || 
      request.destination === 'style' ||
      request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).then(fetchResponse => {
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
          return fetchResponse;
        });
      })
    );
  }
});