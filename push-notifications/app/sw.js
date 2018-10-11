/* eslint-env browser, serviceworker, es6 */

const cacheName    = 'ScrumPoker';
const filesToCache = [
    '/',
    '/index.html',
];

self.addEventListener('install', event => event.waitUntil(
        caches.open( cacheName ).then(
            cache => cache.addAll( filesToCache)
        )
    )
);

self.addEventListener('activate', event => event.waitUntil(
        self.clients.claim()
    )
);

self.addEventListener('fetch', event => event.respondWith(
    caches
        .match( event.request, { ignoreSearch: true } )
        .then( response => response || fetch( event.request ) )
    )
);

self.addEventListener('push', event => {
    const title   = 'ScrumPoker';
    const options = {
        body : event.data && event.data.text() || 'New MSG',
        icon : 'icons/push-icon.png',
        badge: 'icons/push-badge.png'
    };

    const notificationPromise = self.registration.showNotification( title, options );
    event.waitUntil( notificationPromise );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        self.clients.openWindow( 'https://tonil.de/poker/' )
    );
});
