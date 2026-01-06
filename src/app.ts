import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "okay" });
});

app.use("/user", routes.user);

export default app;
