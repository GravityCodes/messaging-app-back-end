import { Router } from "express";
import controller from "../controller/user.js";
import validator from "../validator/user.js";
import { validateRequest } from "../middleware/validationResults.js";

const route = Router();

route.get("/", controller.getUser);
route.post(
  "/login",
  validator.loginUser,
  validateRequest,
  controller.loginUser,
);
route.post(
  "/signup",
  validator.createUser,
  validateRequest,
  controller.signupUser,
);

export default route;
