import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { Repository } from "./repositories/message.js";
import { Service } from "../src/services/message.js";


const service = new Service(new Repository());

const port = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("enterRoom", (chatRoomId: number) => {
    socket.join(`${chatRoomId}`);
  });

  socket.on("sendMessage", (chatRoomId: number, message: string, user) => {
    socket.to(`${chatRoomId}`).emit(message, user);
    service.logMessage(message, chatRoomId, user);
  });

});



httpServer.listen(port, () => console.log("Listening on port:", port));
