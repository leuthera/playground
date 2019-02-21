import React from "react";
import useFetchSuspense from "./useFetchSuspense";

const BostonRoutes = () => {
    const data = useFetchSuspense(
        'https://api-v3.mbta.com/routes', {
            query: { "filter[route_type]": "0,1" }
        }
    );

    return <ul>
        {
            data.data.map(route =>
                <li key={ route.id }>
                    { route.attributes.long_name }
                </li>
            )
        }
    </ul>;
};

export default BostonRoutes;
