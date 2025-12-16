import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

app.get("/", (req, res) => {
  res.status(200).json({ msg: "okay" });
});


io.on("connection", (socket) => {
  console.log("a user connected");
});


httpServer.listen(port, () => console.log("Listening on port:", port));
