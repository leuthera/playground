/*jshint esversion: 6, expr: true */

// Promises benutzt man um Werte die irgendwann in der Zukunft zur Verfuegung
// stehen sauber zu behandeln und auch Fehler gut abfangen zu koennen
// Als Beispiel koennte man ein simplen XHR-Request benutzen
const get = url => {
    return new Promise(
        ( resolve, reject ) => {
            let request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                this.status === 200 ? resolve( this.response )
                    : reject( new Error( this.statusText ) );
            };

            request.onerror = () => {
                reject( new Error( `XHR Error: ${this.statusText}` ) );
            };

            request.open( "GET", url );
            request.send();
        });
};

get( "url" ).then(
    content => { console.log( content ); },
    error   => { console.error( error ); }
);

// Wenn man mehrer Promises hat, wo die Reihenfolge nicht wichtig ist
// kann man mit all ein Array uebergeben
Promise.all([ new Promise(), new Promise() ]).then( data => {}, err => {} );
