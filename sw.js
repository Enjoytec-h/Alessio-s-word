const CACHE_NAME = 'halloween-games-v3'; // <-- CAMBIA QUESTO NUMERO AD OGNI MODIFICA (es. v4, v5...)
const assetsToCache = [
  'index.html',
  'tetris.html',
  'pacman.html',
  'spooky-breakout.html',
  'style.css',
  'tetris.js',
  'manifest.json',
  'zucca-icona.png',
  'sinistra.jpg',
  'destra.jpg',
  'sopra.jpg',
  'sotto.jpg'
];

// Installazione immediata del nuovo Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting();
});

// Attivazione e pulizia immediata delle vecchie cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Strategia Network-First: scarica sempre l'ultima versione dal server, usa la cache solo se offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
