import express from "express";
import { verifyToken } from "../middlewares/authentication.middlewares";
import {
	deleteUser,
	getUser,
	userLogin,
	userRegister,
} from "../controllers/user.controller";

const userRouter = express.Router();

// Get user
userRouter.get("/get/:id", verifyToken, getUser);

// Register route
userRouter.post("/register", userRegister);

// Login route
userRouter.post("/login", userLogin);

// Delete route
userRouter.delete("/delete/:id", verifyToken, deleteUser);

export default userRouter;
