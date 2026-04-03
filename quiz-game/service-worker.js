const CACHE_NAME = 'quiz-cache-v1';

// Кешираме само статични ресурси, НЕ HTML
const urlsToCache = [
  '/quiz-game/icon-192.png',
  '/quiz-game/icon-512.png',
  '/quiz-game/music.mp3',
  '/quiz-game/questions.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // НЕ кешираме HTML файлове
  if (url.pathname.endsWith('.html')) {
    return; // позволяваме нормален fetch
  }

  // Кешираме само статичните ресурси
  if (url.pathname.startsWith('/quiz-game/')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
