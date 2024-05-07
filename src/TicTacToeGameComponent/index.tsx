"use client";
import { useEffect, useState } from "react";

const winningCombos = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6],
];

export const TicTacToeGameComponent = (props) => {
  const [currPlayer, setCurrPlayer] = useState(false);
  const [board, setBoard] = useState({});
  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    const foundWinner = winningCombos.find((combo) => {
      const [a, b, c] = combo;
      console.log("found", a, b, c);
      return (
        board[a] === board[b] && board[b] === board[c] && board[a] === board[c]
      );
    });
    if (foundWinner) {
      setWinner(board[foundWinner[0]]);
    }
  };

  useEffect(() => {
    if (Object.keys(board).length > 4) {
      //check if there is a winner
      checkWinner();
    }
  }, [board]);
  const claimSquare = (id) => {
    setBoard({ ...board, [id]: currPlayer ? "o" : "x" });
    setCurrPlayer(!currPlayer);
  };
  return (
    <div>
      <p>{winner ? `Winner is ${winner}` : `No Winner yet`}</p>
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
      <p>{props.currentPlayer}</p>
    </button>
  );
};
