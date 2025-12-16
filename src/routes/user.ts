import { Router } from "express";
import controller from "../controller/user.js";

const route = Router();

route.get("/", controller.getUser);
route.post("/login",controller.loginUser);
route.post("/signup", controller.signupUser);

export default route;
