const CACHE_VERSION = 'v2025-09-27';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const PAGE_CACHE = `pages-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const CORE_ASSETS = [
  '/',
  '/styles/global.css',
  '/favicon/favicon-192x192.png',
  '/favicon/favicon-512x512.png',
  '/images/hdud-logo.svg',
];

const STATIC_DESTINATIONS = new Set(['style', 'script', 'font']);
const STATIC_EXTENSIONS = ['.css', '.js', '.mjs', '.cjs', '.json', '.woff', '.woff2', '.ttf'];
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif'];
const MAX_IMAGE_ENTRIES = 60;

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      await caches.open(STATIC_CACHE).then(cache => cache.addAll(CORE_ASSETS)).catch(() => undefined);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const expected = [STATIC_CACHE, PAGE_CACHE, IMAGE_CACHE];
      const keys = await caches.keys();
      await Promise.all(
        keys.map(key => {
          if (!expected.includes(key)) {
            return caches.delete(key);
          }
          return undefined;
        })
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('sync', event => {
  if (event.tag === 'refresh-dynamic-content') {
    event.waitUntil(prewarmPageCache());
  }
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') {
    event.respondWith(
      fetch(request).catch(async () => {
        if ('sync' in self.registration) {
          try {
            await self.registration.sync.register('refresh-dynamic-content');
          } catch (err) {
            // no-op if registration fails
          }
        }
        return new Response(null, { status: 503, statusText: 'Service Unavailable' });
      })
    );
    return;
  }

  if (isNavigationRequest(request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isImageRequest(request)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE, MAX_IMAGE_ENTRIES));
    return;
  }

  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  event.respondWith(fetch(request));
});

async function networkFirst(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      if ('sync' in self.registration) {
        try {
          await self.registration.sync.register('refresh-dynamic-content');
        } catch (err) {
          // ignore registration errors
        }
      }
      return cached;
    }

    return new Response('<h1>Offline</h1><p>The requested page is not available offline yet.</p>', {
      status: 503,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

async function cacheFirst(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response && response.status === 200) {
    await cache.put(request, response.clone());
    if (maxEntries) {
      await trimCache(cache, maxEntries);
    }
  }
  return response;
}

async function trimCache(cache, maxEntries) {
  const keys = await cache.keys();
  while (keys.length > maxEntries) {
    const key = keys.shift();
    if (key) {
      await cache.delete(key);
    }
  }
}

async function prewarmPageCache() {
  const cache = await caches.open(PAGE_CACHE);
  const urls = Array.from(self.__SW_PREWARM_URLS || []);
  await Promise.all(
    urls.map(async url => {
      try {
        const response = await fetch(url, { cache: 'no-store' });
        if (response && response.status === 200) {
          await cache.put(url, response.clone());
        }
      } catch (error) {
        // ignore
      }
    })
  );
}

function isNavigationRequest(request) {
  return request.mode === 'navigate' || (request.destination === 'document' || request.headers.get('accept')?.includes('text/html'));
}

function isImageRequest(request) {
  if (request.destination === 'image') {
    return true;
  }
  const url = request.url.split('?')[0];
  return IMAGE_EXTENSIONS.some(ext => url.endsWith(ext));
}

function isStaticAsset(request) {
  if (STATIC_DESTINATIONS.has(request.destination)) {
    return true;
  }
  const url = request.url.split('?')[0];
  return STATIC_EXTENSIONS.some(ext => url.endsWith(ext));
}
