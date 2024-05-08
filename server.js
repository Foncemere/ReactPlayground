//if something is changed in server, need to restart node
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let connectedUsers = new Map();

app
  .prepare()
  .then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      console.log("A user connected");

      const emitConnectedUsers = () => {
        io.emit("connectedUsers", Object.fromEntries(connectedUsers));
      };

      // Add the new user to the list of connected users
      socket.on("userJoins", (user) => {
        if (connectedUsers.size >= 2) {
          connectedUsers.set(socket.id, "spectator");
        } else {
          connectedUsers.set(socket.id, user);
        }
        emitConnectedUsers();
      });

      //io is to reflect for all connections
      //socket is just for the user itself
      //so when a user calls reset, it resets for the other player
      socket.on("reset", (args) => {
        io.emit("reset", args);
      });

      socket.on("cellSelection", (args) => {
        io.emit("cellSelection", args);
        console.log("Received hello from client:", args);
      });

      socket.on("disconnect", (user) => {
        console.log("A user disconnected");
        // Remove the disconnected user from the list of connected users
        const index = connectedUsers.get(socket.id);
        if (index != undefined) {
          console.log("THIS SOCKET WAS DELETED");
          connectedUsers.delete(socket.id);
          emitConnectedUsers();
        }
      });
    });

    httpServer
      .once("error", (err) => {
        console.error(err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
  })
  .catch((e) => {
    console.log("e", e);
  });
