"use client";
import { useState } from "react";

export const TicTacToeGameComponent = (props) => {
  const [currPlayer, setCurrPlayer] = useState(false);
  const [board, setBoard] = useState({});
  //object to know who claims the square they are on, when this is updated
  // we will call a useEffect to see if there's a winner.
  const claimSquare = (id) => {
    setBoard({ ...board, [id]: currPlayer });
    setCurrPlayer(!currPlayer);
  };
  return (
    <div>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <Square id={0} currentPlayer={board[0]} onClick={claimSquare} />
        <Square id={1} currentPlayer={board[1]} onClick={claimSquare} />
        <Square id={2} currentPlayer={board[2]} onClick={claimSquare} />
      </div>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <Square id={3} currentPlayer={board[3]} onClick={claimSquare} />
        <Square id={4} currentPlayer={board[4]} onClick={claimSquare} />
        <Square id={5} currentPlayer={board[5]} onClick={claimSquare} />
      </div>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <Square id={6} currentPlayer={board[6]} onClick={claimSquare} />
        <Square id={7} currentPlayer={board[7]} onClick={claimSquare} />
        <Square id={8} currentPlayer={board[8]} onClick={claimSquare} />
      </div>
    </div>
  );
};

const Square = (props) => {
  return (
    <button
      style={{
        height: 36,
        width: 36,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      id={props.id}
      onClick={() => props.onClick(props.id)}
      className={"p-5 border-2 border-black"}
    >
      <p>
        {props.currentPlayer === false
          ? "x"
          : props.currentPlayer === true
            ? "o"
            : null}
      </p>
    </button>
  );
};
