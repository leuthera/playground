import React from "react";
import useWorker from "./useWorker";

const calculate = n => {
    if ( n < 2 ) { return n; }
    return calculate( n - 2 ) + calculate( n - 1 );
};

const Fibonacci = ({ num }) => {
    const result = useWorker( calculate, [ num ] );

    return <div>
        Number: { num } is <strong>{ result }</strong>
    </div>;
};

export default Fibonacci;
