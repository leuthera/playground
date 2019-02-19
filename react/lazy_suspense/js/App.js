import React, { Suspense } from "react";
const Nav = React.lazy(() => import("./Nav.js"));

const Loading = () => (
  <ul>
    <li>Loading...</li>
  </ul>
);

const App = () => (
  <div>
    <Suspense fallback={<Loading />}>
      <Nav />
    </Suspense>
    Hello
  </div>
);

export default App;
