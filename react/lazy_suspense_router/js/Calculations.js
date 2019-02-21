import React, { Suspense } from "react";
import Fibonacci from "./Fibonacci";

const CalculationLoader = ({ num }) => <div>Loading for { num }</div>;

const numbersToCalculate = [ 10, 35, 42, 45 ];

const Calculations = () => <div>
    <h1>Calculations</h1>
    {
        numbersToCalculate.map( num =>
            <Suspense key={ num } fallback={ <CalculationLoader num={ num } /> }>
                <Fibonacci num={ num } />
            </Suspense>
        )
    }
</div>;

export default Calculations;
