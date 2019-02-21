import React, { Suspense } from "react";
import BostonRoutes from "./BostonRoutes";
import Loader from "./Loader";

const Home = () => <div>
    <h1>Welcome!</h1>
    <Suspense fallback={ <Loader /> }>
        <BostonRoutes />
    </Suspense>
</div>;

export default Home;
