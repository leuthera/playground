/*jshint esversion: 6 */

// Symbols sind ein neuer primitiver Datentyp, ähnlich String, Number, ...
// Eine weiterführende Erklärung findet ihr hier:
// https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/

// jedes symbol ist eindeutig, der optionale Parameter dient nur zu debug Zwecken
Symbol("foo") !== Symbol("foo")

// Symbole können global gemacht werden und werden in einer Registry vorgehalten
const foo = Symbol.for("foobar")

// für globale Symbole kann der Key ausgelesen werden
Symbol.keyFor(foo) === "foobar"

// globale Symbole können verglichen werden
foo === Symbol.for("foobar")

// in einem Object können Symbole als Keys benutzt werden
let obj = {
	Symbol.for("foobar"): "bar"
}
Object.getOwnPropertySymbols(obj) // [ bar ]

// Einsatzbereiche
// - unendlich viele eindeutige, konfliktfreie keys
// - nicht über 'for in' oder 'for of' erreichbar => hidden layer
// - nicht änderbare werte

// Beispiele //
///////////////
// Nur bestimmte Werte zulassen. Hier wird das Symbol zum Vergleich benutzt,
// ein Wert kann auch aus einem anderen Kontext kommen
const COLOR_RED = Symbol("red");
const COLOR_GREEN = "green";

function get(type) {
	switch(type) {
		case COLOR_RED:
			return "red";
		case COLOR_GREEN:
			return "green";
		default:
			return false;
	}
}

get(COLOR_RED) => "red";
get(COLOR_GREEN) => "green"
// this value can be defined elsewhere
x = "green";
get(x) => "green"
// never get red instead of when using the defined symbol
y = "red";
get(y) => false;

// Objekt-interner Status, nicht von aussen über Collection.size erreichbar/überschreibbar
// Bei HiDrive nutzen wir eher this._size und erwarten, dass es keiner direkt benutzt
var size = Symbol('size');
class Collection {
    constructor() {
        this[size] = 0;
    }

    add(item) {
        this[this[size]] = item;
        this[size]++;
    }

    static sizeOf(instance) {
        return instance[size];
    }

}

var x = new Collection();
assert(Collection.sizeOf(x) === 0);
x.add('foo');
assert(Collection.sizeOf(x) === 1);

// Es gibt "well known symbols"
class MyClass {
	constructor(value) {
		this.value = value;
		this[0] = "foo";
		this[1] = "bar";
	}

	// x = new MyClass("test");
	// x.next() => "foo"
	// x.next() => "bar"
	*[Symbol.iterator]() {
		var i = 0;
		while(this[i] !== undefined) {
			yield this[i];
			++i;
		}
	}
	// declare either your class could be used by [].concat or not
	get [Symbol.isConcatSpreadable]() {
		return false;
	}
	// possibility to exclude methods from 'with()'
	get [Symbol.unscopables]() {
		return { foo: true }
	}
	// set own matcher so
	// "test".match(new MyClass("test")) => ["test"]
	// "foo".match(new MyClass("test")) => null
	[Symbol.match](string) {
		if (string.indexOf(this.value)) {
			return [this.value];
		}
		return null;
	}
	// "Stiftung Warenfoo".replace(new MyClass("Test"), "foo") => "Stiftung WarenTest"
	[Symbol.replace](string, replacer) {
		var index = string.indexOf(this.value);
		return `${string.slice(0, index)}${replacer}${string.slice(index + this.value.length)}`;
	}
	// 'st'.search(new MyClass("test")) => 2
	[Symbol.search](string) {
		return string.indexOf(this.value);
	}
	// your own split method
	[Symbol.split](string) {}
	// hier muss nochmal nachgesehen werden...ich verstehs nicht
	get *[Symbol.species]
	// cast into another type
	[Symbol.toPrimitive](hint) {
		// e.g. (new MyClass("test")) + "-asString" => "test-asString"
		if (hint === "string") {
			return this.value;
		}
		// (new MyClass("test")) + 12 => 13
		if (hint === "number") {
			return 1;
		}
		// ...
	}
	// Object.prototype.toString.call(new MyClass("test")) => '[object MyClass]'
	get [Symbol.toStringTag]() {
		return 'MyClass'
	}
	foo() {}
}
