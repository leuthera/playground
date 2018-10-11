/* eslint-env browser, serviceworker, es6, Notification */

import getServiceWorker from './ServiceWorker.js';

const applicationServerPublicKey = 'BFys5rt4x9eFwr8wH-gp39eSiQ_r28ctANDAY-PUutddhABEOQQ1GvBV38whWlFOgu8Lmvlsj-2r9b2Tow2DTws';
const pushButton                 = document.querySelector('.js-push-btn');
const ServiceWorker              = getServiceWorker();

let isSubscribed   = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat( (4 - base64String.length % 4) % 4 );
  const base64 = ( base64String + padding )
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

    const rawData = window.atob( base64 );

    return new Uint8Array( rawData.length )
        .map(
            ( elem, idx ) => rawData.charCodeAt( idx )
       );
}

function initializeUI() {
    pushButton.addEventListener('click', () => {
        pushButton.disabled = true;

        if ( isSubscribed ) {
            unsubscribeUser();
        } else {
            subscribeUser();
        }
    });

    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
        .then( subscription => {
            isSubscribed = !(subscription === null);

            updateSubscriptionOnServer( subscription );

            updateBtn( isSubscribed );
        });
}

function updateBtn() {
    if ( isPermissionDenied() ) {
        return;
    }

    pushButton.textContent = ( isSubscribed ? 'Disable': 'Enable' ) + ' Push Messaging';
    pushButton.disabled    = false;
}

function isPermissionDenied() {
    if ( Notification.permission === 'denied' ) {
        pushButton.textContent = 'Push Messaging Blocked.';
        pushButton.disabled    = true;

        updateSubscriptionOnServer( null );

        return true;
    }
}

function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array( applicationServerPublicKey );
    swRegistration.pushManager.subscribe({
            userVisibleOnly     : true,
            applicationServerKey: applicationServerKey
        })
        .then( subscription => {
            updateSubscriptionOnServer( subscription );

            isSubscribed = true;

            updateBtn();
        })
        .catch( err => {
            console.warn('Failed to subscribe the user: ', err);
            updateBtn();
        });
}

function updateSubscriptionOnServer( subscription ) {
    // TODO: Send subscription to application server

    const subscriptionJSON = document.querySelector('.js-subscription-details');
    const subscriptionDetails = document.querySelector('.js-subscription-details');

    if ( subscription ) {
        subscriptionJSON.textContent = JSON.stringify( subscription );
        subscriptionDetails.classList.remove('is-invisible');
    } else {
        subscriptionDetails.classList.add('is-invisible');
    }
}

function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
        .then( subscription => {
            if ( subscription ) {
                return subscription.unsubscribe();
            }
        })
        .catch( error => {
            console.warn('Error unsubscribing', error);
        })
        .then( () => {
            updateSubscriptionOnServer( null );

            isSubscribed = false;

            updateBtn();
        });
}


ServiceWorker.then( swReg => {
    swRegistration = swReg;
    initializeUI();
});
