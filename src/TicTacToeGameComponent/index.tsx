"use client";
import { useEffect, useState } from "react";
import { socket } from "./socket";

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

const firstPlayer = "X";

export const TicTacToeGameComponent = (props) => {
  const [isCurrentYou, setIsCurrentYou] = useState(false);
  const [board, setBoard] = useState({});
  const [winner, setWinner] = useState(null);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const searchParams = new URLSearchParams(window.location.search);
  console.log("weee", searchParams);
  //http://localhost:3000/?user=x
  //http://localhost:3000/?user={char}
  const user = searchParams.get("user");

  const checkWinner = () => {
    const foundWinner = winningCombos.find((combo) => {
      const [a, b, c] = combo;
      //it's possible board[a] is null, so it's considered as a valid combo
      //So we must remove it
      if (board[a] == null) {
        return;
      }
      console.log("found", a, b, c);
      return board[a] === board[b] && board[b] === board[c];
    });
    if (foundWinner) {
      setWinner(board[foundWinner[0]]);
      if (
        (board[foundWinner[0]] || "").toLowerCase() ===
        firstPlayer.toLowerCase()
      ) {
        setXWins((prevState) => prevState + 1);
      } else {
        setOWins((prevState) => prevState + 1);
      }
    }
  };

  const claimSquareCore = (id, player) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      [id]: player,
    }));
  };

  const restartCore = () => {
    setBoard({});
    setWinner(null);
    // setIsCurrentYou(user === "x");
  };

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }
    function onConnect() {
      console.log("this is connected");
      socket.emit("userJoins", user);
      //we want to listen to these socket events

      socket.on("connectedUsers", (connectedUsers) => {
        console.log("weh", connectedUsers);
        setConnectedUsers(connectedUsers);
      });

      socket.on("hello", (args) => console.log(args));

      socket.on("cellSelection", (args) => {
        const { id, user: player } = args;

        claimSquareCore(id, player);

        if (player !== user) {
          setIsCurrentYou(true);
        } else {
          setIsCurrentYou(false);
        }
      });

      socket.on("reset", () => {
        restartCore();
      });
    }

    if (user?.toLowerCase() === firstPlayer.toLowerCase()) {
      setIsCurrentYou(true);
    }

    function onDisconnect() {
      console.log("this is disconnected");
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      //we want to remove the reference once the user is off
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    //there can be a winner after 5 rounds (starter will have at least 3 squares)
    if (!winner && Object.keys(board).length > 4) {
      checkWinner();
    }
  }, [winner, board]);
  const claimSquare = (id) => {
    if (!isCurrentYou) {
      return;
    }
    claimSquareCore(id, user);
    socket.emit("cellSelection", { id, user });
  };

  return (
    <div>
      <p>
        {winner
          ? `Winner is ${winner}`
          : Object.keys(board).length === 9
            ? `No Winner`
            : `It's ${isCurrentYou ? user : "other player"}'s turn`}
      </p>
      <div style={{ pointerEvents: winner ? "none" : "auto" }}>
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
      <button onClick={() => socket.emit("reset")}>Restart</button>
      <div>
        <p>{`${Object.values(connectedUsers)[0]} won ${xWins} ${xWins === 1 ? "time" : "times"}`}</p>
        <p>{`${Object.values(connectedUsers)[1]} won ${oWins} ${oWins === 1 ? "time" : "times"}`}</p>
        <p>connectedUsers: {JSON.stringify(connectedUsers)}</p>
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
      disabled={props.currentPlayer}
    >
      <p>{props.currentPlayer}</p>
    </button>
  );
};
