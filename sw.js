var CACHE_NAME = 'hackference-v4';
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
  '/assets/favicons/favicon-16x16.png',
  '/assets/favicons/favicon-32x32.png',
  '/assets/favicons/favicon.ico',
  '/assets/favicons/mstile-70x70.png',
  '/assets/favicons/mstile-144x144.png',
  '/assets/favicons/mstile-150x150.png',
  '/assets/favicons/mstile-310x150.png',
  '/assets/favicons/mstile-310x310.png',
  '/assets/favicons/safari-pinned-tab.svg'
];

self.addEventListener('install', function(event) {
  console.log('Cache - Install Step');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
    .catch(function(error) {
      console.log('--Err--');
      console.log(error);
      console.log('--Err--');
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        //console.log("cache request: " + event.request.url);
        var fetchPromise = fetch(event.request).then(
          function(networkResponse) {
            // if we got a response from the cache, update the cache
            console.log(
              'fetch completed: ' + event.request.url,
              networkResponse
            );
            if (networkResponse) {
              console.debug(
                'updated cached page: ' + event.request.url,
                networkResponse
              );
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          },
          function(e) {
            // rejected promise - just ignore it, we're offline
            console.log('Error in fetch()', e);
          }
        );

        // respond from the cache, or the network
        return response || fetchPromise;
      });
    })
  );
});
