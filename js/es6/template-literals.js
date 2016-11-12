/*jshint esversion: 6 */

// Man kann jetzt Zeichenketten direkt mit Variablen anreichern 
// ohne die Zeichenkette zu beenden
let foo = "world";
console.log( `hello ${foo}` );

// das funktioniert sogar mit Objekten
let bar = { name: 'me' };
console.log( `my name is ${bar.name}` );

// sogar Berechnungen und Funktionsaufrufe kann man dort
// drin noch vornehmen
let baz = 1;
let buz = 2;
function n() { return 2; }
console.log( `Ergebnis ${baz + 5 + buz + n()}`);
// und unschoene Dinge wie
console.log( `Ergebnis ${baz + 5 + buz + n() + () => { return 2; }}`);

