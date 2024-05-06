"use client";
import { useState } from "react";

export const TicTacToeGameComponent = (props) => {
  const [currPlayer, setCurrPlayer] = useState(0);
  const [board, setBoard] = useState({});
  //object to know who claims the square they are on, when this is updated
  // we will call a useEffect to see if there's a winner.
  return (
    <div>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <Square id={0} />
        <Square id={1} />
        <Square id={2} />
      </div>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <Square id={3} />
        <Square id={4} />
        <Square id={5} />
      </div>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <Square id={6} />
        <Square id={7} />
        <Square id={8} />
      </div>
    </div>
  );
};

const Square = (props) => {
  return (
    <button
      id={props.id}
      onClick={() => {}}
      className={"p-5 border-2 border-black"}
    >
      <p>{"x"}</p>
    </button>
  );
};
