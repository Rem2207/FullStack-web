import { Router } from "express";
import {
  getAllUsers,
  userSignUp,
  userLogin,
  verifyUser,
  getUser,
  addCustomizedPlushies,
  deleteCustomizedPlushies,
} from "../controllers/user-controllers.js";
import verifyToken from "../middleware/auth.js";
import {
  validate,
  signupValidators,
  loginValidator,
} from "../middleware/user.js";

const userRoutes = Router();

userRoutes.get("/", verifyToken, getAllUsers);
userRoutes.post("/signup", validate(signupValidators), userSignUp);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.post(
  "/add-customized-plushies/:id",
  verifyToken,
  addCustomizedPlushies
);
userRoutes.post("/delete-customized-plushies/:id", verifyToken, deleteCustomizedPlushies);
userRoutes.get("/:id", verifyToken, getUser);

export default userRoutes;
