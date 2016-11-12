/*jshint esversion: 6 */

// Ermoeglicht es Funktionen und Variablen nur fuer einen Bereich zu definieren
// ohne das sie ausserhalb des Bereiches definiert sind oder definierte Element
// ueberschreiben

// Variablen
for ( let i = 0; i < 2; i++ ) {} 
try {
    console.log(i);
} catch(e) {
    console.log( `Error: ${e}` );
}

// Funktionen
{
    function foo() {}
}
try {
    foo();
} catch(e) {
    console.log( `Error: ${e}` );
}

