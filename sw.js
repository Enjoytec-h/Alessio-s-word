const CACHE_NAME = 'halloween-games-v2'; // Aggiornato alla versione 2
const assetsToCache = [
  'index.html',
  'tetris.html',
  'pacman.html',
  'style.css',
  'tetris.js',
  'manifest.json',      // <-- AGGIUNTO QUI
  'zucca-icona.png',    // <-- AGGIUNTO QUI (metti il nome esatto della tua icona)
  'sinistra.jpg',
  'destra.jpg',
  'sopra.jpg',
  'sotto.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting(); // Forza l'attivazione immediata del nuovo Service Worker
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Pulisce le vecchie cache
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
