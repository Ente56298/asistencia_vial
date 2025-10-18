const MAPBOX_CACHE_NAME = 'mapbox-tiles-cache-v1';
const API_CACHE_NAME = 'api-data-cache-v1';
const ALL_CACHES = [MAPBOX_CACHE_NAME, API_CACHE_NAME];

const MAPBOX_URLS = [
    'https://api.mapbox.com/',
    'https://a.tiles.mapbox.com/',
    'https://b.tiles.mapbox.com/',
    'https://c.tiles.mapbox.com/',
    'https://d.tiles.mapbox.com/',
];
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/';

// Al instalar, el service worker toma el control inmediatamente.
self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

// Al activar, limpia las cachés antiguas para asegurar que se usen los datos más recientes.
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!ALL_CACHES.includes(cacheName)) {
                        console.log('ServiceWorker: eliminando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Intercepta las solicitudes de red.
self.addEventListener('fetch', (event) => {
    const { request } = event;

    const isMapboxRequest = MAPBOX_URLS.some(url => request.url.startsWith(url));
    const isApiRequest = request.url.startsWith(GEMINI_API_URL) && request.method === 'POST';

    if (isMapboxRequest) {
        event.respondWith(staleWhileRevalidate(request, MAPBOX_CACHE_NAME));
    } else if (isApiRequest) {
        event.respondWith(cacheFirst(request, API_CACHE_NAME));
    }
});

/**
 * Implementa la estrategia 'Cache First'.
 * Responde desde la caché si está disponible. Si no, va a la red,
 * y si tiene éxito, almacena la respuesta en la caché para la próxima vez.
 * Ideal para datos de API que no cambian constantemente.
 * @param {Request} request La solicitud entrante.
 * @param {string} cacheName El nombre de la caché a usar.
 * @returns {Promise<Response>} Una promesa que se resuelve con una respuesta.
 */
const cacheFirst = async (request, cacheName) => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
            // Clona la respuesta para poder guardarla en caché y devolverla.
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('ServiceWorker: La solicitud de red falló y no hay caché disponible:', error);
        // Devuelve una respuesta de error genérica para que la app pueda manejar el estado offline.
        return new Response(JSON.stringify({ error: 'Offline y sin datos en caché' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

/**
 * Implementa la estrategia 'Stale-While-Revalidate'.
 * Responde con el contenido de la caché de inmediato (si está disponible) para velocidad,
 * y luego actualiza la caché con una nueva solicitud de red en segundo plano.
 * @param {Request} request La solicitud entrante.
 * @param {string} cacheName El nombre de la caché a usar.
 * @returns {Promise<Response>} Una promesa que se resuelve con una respuesta.
 */
const staleWhileRevalidate = async (request, cacheName) => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    const fetchPromise = fetch(request.clone())
        .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        })
        .catch((error) => {
            console.warn(`ServiceWorker: La solicitud de red para ${request.url} falló.`, error);
        });

    return cachedResponse || fetchPromise;
};
