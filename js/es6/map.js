/*jshint esversion: 6 */

// Objekt erzeugen welches beliebige Typen als Key haben kann
let map = new Map([
    [false, 'no'],
    [true,  'yes'],
]);

// setzen, hole, groesse, hat item, loesche
map.set("hello", 42);
map.set('foo', 34);
console.log(map.get('foo') === 34);
console.log(map.size === 2);
console.log(map.has('foo'));
console.log(map.delete('foo'), map.has('foo'));

// Durchlaufen inkl. Array-Destructing
for (let [key, value] of map) {
    console.log(key, value);
}

// WeakMap kann man benutzen damit man keine Angst vor Mem-Leaks haben muss
// man kann allerdings nicht iterate machen, weder ueber keys, entries, values
// Keys muessen Objekte sein.
let wmap = new WeakMap();
let el1 = window;
let el2 = document.querySelector('body');

wmap.set(el1, 'window');
wmap.set(el2, 'body');

console.log(wmap.get(el2), wmap.has(el2));

el2.parentNode.removeChild(el2);
el2 = null;

console.log(map.get(el2));

// evenhandler beispiel
var handlerMap = new WeakMap();

class EventEmitter {
    on(event, handler) {
    const handlers = handlerMap.get(this) || {};
    handlers[event] = [handler, ...handlers[event]];
    handlerMap.set(this, handlers);
  }
  
  fire(event) {
    const handlers = handlerMap.get(this);
    const args = Array.from(arguments).slice(1);
    handlers[event].forEach(handler => handler.apply(this, args));
  } 
}
