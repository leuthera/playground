/*jshint esversion: 6 */

// Funktionen koennen jetzt Parameter mit Default-Werten
// und sonstigen Parametern ( Rest ) die nicht definiert sein
// muessen entgegen nehmen
const foo = ( a = 1, b = 2 ) => { return a+b; };
console.log( foo() === 3 );

// beliebige viele Parameter stehen dann in ...VARIABLE
const bar = ( a = 1, b = 2, ...n ) => {
    let x = 0;
    if ( n.length ) {
        x = n.reduce( ( old, v ) => { return old + v; } );
    }
    return a+b+x;
};
console.log( foo(1,2,3,4,5) === 15 );

// man kann mit den 3 ... vor einer Variable sogar Zeichenketten zerlegen
let baz = "hallo welt";
let chars = [ ...baz ];
console.log( chars.length === 10);
