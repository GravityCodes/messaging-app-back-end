import {Router} from "express";
import controller from "../controller/user.js";

const route = Router();


route.get("/", controller.getUser);

export default route;