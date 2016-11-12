/*jshint esversion: 6 */

// Hiermit kann Eigenschaften von Objekten einfach definieren

// Wenn man beispielsweise eine API hat wo man Funktionen zurueckgibt
// reicht jetzt einfach der Name des Keys insofern die Funktionalitaet
// genauso heisst
function foo() {
    let x = function () {};
    let y = function () {};
    return { x, y };
}

// ebenso kann man jetzt dynamische Keys vergeben
let bar = {
    [ `Dynamic_${Date.now()}` ] : 1
};

// auch Funktionen koennen jetzt ohne extra key: value-Syntax als Key erstellt werden
let baz = {
    myFN() {},
    doIt() {}
};

// Das ganze geht auch fuer Genratoren Funktionen
let buz = {
    *gen() {}
};

