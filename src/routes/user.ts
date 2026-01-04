import { Router } from "express";
import controller from "../controller/user.js";
import validator from "../validator/user.js";

const route = Router();

route.get("/", controller.getUser);
route.post("/login", validator.loginUser, controller.loginUser);
route.post("/signup", validator.createUser, controller.signupUser);

export default route;
