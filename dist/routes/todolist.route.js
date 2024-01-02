"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todolist_controller_1 = require("../controllers/todolist.controller");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const todolistRouter = express_1.default.Router();
todolistRouter.get("/tasks", todolist_controller_1.getUserTasks);
todolistRouter.post("/createTask", todolist_controller_1.createTask);
todolistRouter.put("/updateTask/:taskId", authorization_middleware_1.checkUserAuthorization, todolist_controller_1.updateTask);
todolistRouter.delete("/deleteTask/:taskId", authorization_middleware_1.checkUserAuthorization, todolist_controller_1.deleteTask);
exports.default = todolistRouter;
