import React from "react";

const Nav = () => {
  const data = [1, 2];
  return (
    <ul>
      {data.map(el => (
        <li key={el}>{el}</li>
      ))}
    </ul>
  );
};

export default Nav;
