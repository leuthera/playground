/*jshint esversion: 6 */

// Objekt erzeugen welches beliebige Typen als Key haben kann
let s = new Set();
s.add("hello").add("goodbye").add("hello");
console.log(s.size === 2);
console.log(s.has("hello") === true);
for (let key of s.values()) // insertion order
    console.log(key);

console.log(s[Symbol.iterator] === s.values);

for (let key of s ) // insertion order
    console.log(key);


// WeakSet kann man benutzen damit man keine Angst vor Mem-Leaks haben muss
// man kann allerdings nicht iterate machen
// Values muessen Objekte sein. Es gibt keinen so richtigen Use-Case ausser man
// hat eine Collection von markierten Objekten oder sowas
let set = new WeakSet();
let el1 = document.querySelector('body');
set.add(el1);
console.log(set.has(el1));
el1.parentNode.removeChild(el1);
el1 = null;
console.log(set.has(e));
