import express from "express";
import {
	createTask,
	deleteTask,
	getUserTasks,
	updateTask,
} from "../controllers/todolist.controller";
import { checkUserAuthorization } from "../middlewares/authorization.middleware";
const todolistRouter = express.Router();

todolistRouter.get("/tasks", getUserTasks);

todolistRouter.post("/createTask", createTask);
todolistRouter.put("/updateTask/:taskId", checkUserAuthorization, updateTask);
todolistRouter.delete(
	"/deleteTask/:taskId",
	checkUserAuthorization,
	deleteTask
);

export default todolistRouter;
