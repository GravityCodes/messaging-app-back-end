import "dotenv/config";
import express from "express";
import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "okay" });
});

app.listen(port, () => console.log("Listening on port:", port));
