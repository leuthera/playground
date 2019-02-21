import LRU from "lru-cache";
import md5 from "md5";
import produce from "immer";
import workerpool from "workerpool";

const cache = new LRU( 50 );
const pool  = new workerpool.pool();

const useWorker = ( func, args ) => {
    const key   = `${func.name}.${md5( JSON.stringify( args  ) )}`;
    const value = cache.get( key ) || { status: "new", data: null };

    if ( value.status === "resolved" ) {
        return value.data;
    }

    const promise = pool.exec( func, args );

    promise.then( data => {
        cache.set( key, produce( value, draft => {
            draft.status = "resolved";
            draft.data   = data;
        }) );
    });

    throw promise;
};

export default useWorker;
