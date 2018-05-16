var CACHE_NAME = 'hackference-v1';
var urlsToCache = [
  // Pages
  '/',
  '/tickets',
  '/code-of-conduct/code-of-conduct.html',
  // CSS
  '/assets/style.css',
  // General Images
  '/assets/hackference-flag.jpg',
  '/assets/hackference.svg',
  '/assets/mike-elsmore.png',
  '/assets/mike-elsmore.svg',
  // Favicons
  '/assets/favicons/android-chrome-192x192.png',
  '/assets/favicons/android-chrome-512x512.png',
  '/assets/favicons/apple-touch-icon.png',
  '/assets/favicons/browserconfig.png',
  '/assets/favicons/favicon-16x16.png',
  '/assets/favicons/favicon-32x32.png',
  '/assets/favicons/favicon.ico',
  '/assets/favicons/mstile-70x70.png',
  '/assets/favicons/mstile-144x144.png',
  '/assets/favicons/mstile-150x150.png',
  '/assets/favicons/mstile-310x150.png',
  '/assets/favicons/mstile-310x310.png',
  '/assets/favicons/safari-pinned-tab.svg',
];

self.addEventListener('install', function(event) {
  console.log('Cache - Install Step')
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('fetch', function(event) {
  console.log('Cache - Fetch Event')
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log('Cache - Respond From Cache')
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
