/*jshint esversion: 6 */

// Damit kann man ein Array oder Objekt in einzelne Variablen zerlegen
// und teilweise sogar ueber Softfail mit Defaults versehen
let foo = [ 1, 2, 3 ];
let [ a, b, c ] = foo;

// man auch Elemente auslassen wenn man 2 Kommas benutzt
let [ x, ,y ] = foo;

// fuer Objekte  sieht das so aus, dabei ist zu beachten das man nur die Keys als Variablen
// bekommt, damit man andere Namen verwenden kann, siehe unten
let bar = {
    m: 1,
    n: 2,
    o: 3
};
let { m, n, o } = bar;

// eigene Namen bei Objekt-Destructing, frei nach LASS M jetzt AN sein
let { m: an, n: other, o: name } = bar;

// Objekte haben natuerlich nicht nur eine Ebene, also kann man auch
// verschachtelte Strukuren so definieren
let baz = {
    m: { z: 1 },
    n: 2,
    o: { p: { k: 3 } }
};
let { m: { z: deepName } } = baz;

// auch fuer Parameteruebergaben kann man das benutzen
// sowohl Arrays als auch Objekte (mit und ohne eigenem Variablen-Namen)
function buz( [ name, value ], { name2, value2 }, { name: n, value: v } ) { console.log(name, value, name2, value2, n, v); } 
buz( [ "me", 1 ], { name2: 'me', value2: 2 }, { name: 'me', value: 3 } );

// Falls man Defaults braucht
let list = [ 7, 42 ];
let [ ab = 1, cd = 2, ef = 3, gh ] = list;
console.log( ab, cd, ef, gh );
