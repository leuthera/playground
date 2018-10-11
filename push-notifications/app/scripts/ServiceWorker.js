function register() {
    return navigator.serviceWorker.register('sw.js')
        .then( swReg => {
            console.log('Service Worker is registered', swReg);

            return swReg;
        })
        .catch( error => {
            console.error('Service Worker Error', error);
            return 0;
        });
}

function getServiceWorker() {
    if ( 'serviceWorker' in navigator  ) {
        return register();
    }

    console.warn('ServiceWorker is not supported');
}

export default getServiceWorker;
