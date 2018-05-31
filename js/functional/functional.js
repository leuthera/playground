// imperative
let door = { open: false };

let toggle_door = () => { door.open = !door.open };

toggle_door();


// declarative
let closed_door = { open: false };

toggle_door = door => { 
    return { open: !door.open };
};

let opened_door = toggle_door( closed_door );

module.exports.fnprog = {
    repair_car_loop( body_shop ) {
        let fixed = [];
        for ( let car of body_shop ) {
            for ( let idx in car.tire_status ) {
                let state = car.tire_status[ idx ];

                if ( ! state ) {
                    car.tire_status[ idx ] = +!state;
                }

                fixed.push( car );
            }
        }
        return fixed;
    },

    repair_car_fn( body_shop ) {
        const fix_tires = state => state || +!state;

        const repair_broken_tires = car => ({
            tire_status: car.tire_status.map( fix_tires )
        });

        return body_shop.map( repair_broken_tires );
    },

    get_indie_sort_loop( albums ) {
        let getOnlyIndie = albums => {
            let filtered = [];
            for ( let album of albums ) {
                if ( album.genre === "indie" ) {
                    filtered.push( album );
                }
            }
            
            filtered.sort( (album1, album2) => {
                if ( album1.artist === album2.artist ) {
                    return 0;
                }
                
                return album1.artist > album2.artist ? 1 : -1;
            });

            return filtered;
        };

        return getOnlyIndie( albums );
    },

    get_indie_sort_fn( albums ) {
        const byArtistAsc = ( album1, album2 ) => {
            if ( album1.artist === album2.artist ) return 0;
            return album1.artist > album2.artist ? 1 : -1;
        };

        const getOnlyIndie = album => album.genre === "indie";

        return albums.filter( getOnlyIndie ).sort( byArtistAsc );
    },

    get_filter_sort_fn_curry( albums ) {
        const byArtistAsc = ( album1, album2 ) => {
            if ( album1.artist === album2.artist ) return 0;
            return album1.artist > album2.artist ? 1 : -1;
        };

        const filterByGenre = genre => album => {
            return album.genre === genre;
        };

        const getIndie  = filterByGenre("indie");
        //const getHipHop = filterByGenre("hip-hop");
        //const getRock   = filterByGenre("rock");

        return albums.filter(
            getIndie
        ).sort( byArtistAsc );
    }
};
