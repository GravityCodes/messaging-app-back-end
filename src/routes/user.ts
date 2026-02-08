import { Router } from "express";
import controller from "../controller/user.js";
import validator from "../validator/user.js";
import { validateRequest } from "../middleware/validationResults.js";
import { verifyUserToken } from "../middleware/authCheck.js";
import multerValidator from "../middleware/multerValidator.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

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
route.put(
  "/update",
  verifyUserToken,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  multerValidator.validateImages,
  validator.updateUser,
  controller.updateUser,
);
export default route;
