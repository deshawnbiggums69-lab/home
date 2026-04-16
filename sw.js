const CACHE_NAME = 'homeops-cache-v1';
const APP_PREFIX = '/home/'; // This matches your repository name

const ASSETS = [
  APP_PREFIX, // This caches the main folder
  APP_PREFIX + 'index.html',
  APP_PREFIX + 'manifest.json',
  // Add 'style.css' or 'script.js' only if they are separate files in your GitHub
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
