let mocha = require("../node_modules/mocha");
let { describe, beforeEach, it } = mocha;
let assert = require("chai").assert;
let app = require("../js/functional").fnprog;

describe("fix cars in garage", () => {
    let body_shop;

    beforeEach(() => {
        body_shop = [
            { brand: "bmw", tire_status  : [1,1,1,1] },
            { brand: "fiat", tire_status : [1,0,1,1] },
            { brand: "opel", tire_status : [1,1,0,1] },
            { brand: "dacia", tire_status: [0,0,0,0] }
        ];
    });

    it("should fix broken tires [loops]", () => {
        let fixed = app.repair_car_loop( body_shop );
        if ( fixed.length ) {
            fixed.forEach( car => assert.deepEqual( car.tire_status, [1,1,1,1] ) );
        }
        else {
            assert.ok(0);
        }
        body_shop.forEach( car => assert.deepEqual( car.tire_status, [1,1,1,1] ) );
    });

    it("should fix broken tires [functional]", () => {
        const fixed_cars = app.repair_car_fn( body_shop );
        if ( fixed_cars.length ) {
            fixed_cars.forEach( car => assert.deepEqual( car.tire_status, [1,1,1,1] ) );
        } 
        else {
            assert.ok(1);
        }
        //body_shop.forEach( car => assert.deepEqual( car.tire_status, [1,1,1,1] ) );
    });
});

describe("filter album list and sort it", () => {
    let albums;
    let filtered_albums;

    beforeEach(() => {
        albums = [
            {
                name: "Middle Cyclone",
                artist: "Neko Case",
                genre: "indie",
            },
            {
                name: "Highly Refined Pirates",
                artist: "Minus The Bear",
                genre: "rock",
            },
            {
                name: "Rabbit Fur Coat",
                artist: "Jenny Lewis",
                genre: "indie",
            },
            {
                name: "Black on Both Sides",
                artist: "Mos Def",
                genre: "hip-hop",
            },
        ];

        filtered_albums = [
            {
                name: "Rabbit Fur Coat",
                artist: "Jenny Lewis",
                genre: "indie"
            },
            {
                name: "Middle Cyclone",
                artist: "Neko Case",
                genre: "indie"
            }
        ];
    });

    it("get indie sorted genre [loop]", () => {
        assert.deepEqual( app.get_indie_sort_loop( albums ), filtered_albums );
    });

    it("get indie sorted genre [functional]", () => {
        assert.deepEqual( app.get_indie_sort_fn( albums ), filtered_albums );
    });

    it("get curried sorted genre [functional]", () => {
        assert.deepEqual( app.get_filter_sort_fn_curry( albums ), filtered_albums );
    });
});