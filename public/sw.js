/* eslint-disable no-restricted-globals */
const VERSION = 'v0.0.1';
const baseUrl = self.location.origin;

const [CACHED_OFFLINE, ...CACHED_FILES] = [
  `${baseUrl}/offline.html`,
  `${baseUrl}/assets/android-chrome-192x192.png`,
  `${baseUrl}/assets/android-chrome-512x512.png`,
  `${baseUrl}/assets/apple-touch-icon.png`,
  `${baseUrl}/assets/favicon-16x16.png`,
  `${baseUrl}/assets/favicon-32x32.png`,
  `${baseUrl}/assets/favicon.ico`,
  `${baseUrl}/assets/logo.svg`,
  `${baseUrl}/assets/mstile-150x150.png`,
  `${baseUrl}/assets/safari-pinned-tab.png`,
  `${baseUrl}/assets/logo192.png`,
  'https://fonts.googleapis.com/css2?family=Material+Icons&family=Roboto:wght@100;400;700&display=swap',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(CacheFiles([CACHED_OFFLINE, ...CACHED_FILES]));
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
  event.waitUntil(ClearOldKeys());
});

self.addEventListener('fetch', async (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;

          return preloadResponse || (await fetch(event.request));
        } catch (err) {
          const cache = await caches.open(VERSION);
          return await cache.match(CACHED_OFFLINE);
        }
      })()
    );
  } else if (CACHED_FILES.includes(event.request.url)) {
    event.respondWith(caches.match(event.request));
  }
});

async function CacheFiles(files) {
  const cache = await caches.open(VERSION);
  cache.addAll(files);
}

async function ClearOldKeys() {
  const keys = await caches.keys();
  const oldKeys = keys.filter((key) => key !== VERSION);

  return await Promise.all(oldKeys.map((key) => caches.delete(key)));
}
