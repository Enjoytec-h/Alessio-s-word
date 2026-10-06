const CACHE_NAME = 'halloween-games-v1';
const assetsToCache = [
  'index.html',
  'tetris.html',
  'pacman.html',
  'style.css',
  'tetris.js',
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
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
