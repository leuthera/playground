import React, { Suspense } from "react";
import { Router } from "@reach/router";
import Loader from "./Loader";

const Nav          = React.lazy(() => import("./Nav.js"));
const Home         = React.lazy(() => import("./Home.js"));
const Calculations = React.lazy(() => import("./Calculations.js"));


const App = () => <div>
    <Suspense fallback={ <Loader /> }>
        <Nav />
    </Suspense>

    <Suspense fallback={ <Loader /> }>
        <Router>
            <Home path="/" />
            <Calculations path="/calculations" />
        </Router>
    </Suspense>
</div>;

export default App;
