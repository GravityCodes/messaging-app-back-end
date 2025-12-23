import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";

const port = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

httpServer.listen(port, () => console.log("Listening on port:", port));
