/*jshint esversion: 6 */

// Ermoeglicht es anonyme Funktionen / Closures mit weniger Aufwand
// zu definieren

// Wenn wir keinen Param haben brauchen wir die Klammern
let foo = () => { /* tu was */ };
let bar = (v) => { /* tu was und habe v als param */ };
// Fuer einzelne Parameter kann man sogar die Klammern weglassen
let baz = v => {};
// Bei 2 Params braucht man die Klammern aber
let buz = (v,a) => {};
