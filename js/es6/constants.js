/*jshint esversion: 6 */

// Macht Variablen zu Konstanten, funktioniert
// aber nicht fuer Objekte, bzw deren Keys (siehe unten)
const IMMUTABLE = 123;

try {
    IMMUTABLE = 456;
} catch (e) {
    console.log( `Error: ${e}` );
}
console.log( IMMUTABLE );

// Beispiel mit Objekten
const OBJECT = {
    foo : 1
};

console.log( OBJECT.foo );
OBJECT.foo = 2;
console.log( OBJECT.foo );

