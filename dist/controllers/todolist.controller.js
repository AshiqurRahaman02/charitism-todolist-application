"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getUserTasks = void 0;
const todolist_model_1 = __importDefault(require("../models/todolist.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getTasks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userTasks = yield todolist_model_1.default.find({ userId });
    return userTasks || [];
});
const getUserTasks = () => {
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!userId) {
                res.status(500).json({
                    isError: true,
                    message: "Internal Server Error",
                });
            }
            const userTasks = yield getTasks(userId);
            res.status(201).json({ isError: false, tasks: userTasks });
        }
        catch (error) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
                error,
            });
        }
    });
};
exports.getUserTasks = getUserTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { title, deadline } = req.body;
        const newTask = new todolist_model_1.default({
            title,
            userId,
            deadline,
        });
        const savedTask = yield newTask.save();
        // Update the user's tasks array
        yield user_model_1.default.findByIdAndUpdate(userId, {
            $push: { tasks: savedTask._id },
        });
        const userTasks = yield getTasks(userId);
        res.status(201).json({
            isError: false,
            message: "Task Created Successfully",
            tasks: userTasks,
        });
    }
    catch (error) {
        res.status(500).json({
            isError: true,
            message: "Internal Server Error",
            error,
        });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { taskId } = req.params;
        const { title, deadline, isCompleted } = req.body;
        const updatedTask = yield todolist_model_1.default.findByIdAndUpdate(taskId, { title, deadline, isCompleted }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({
                isError: true,
                message: "Task not found",
            });
        }
        const userTasks = yield getTasks(userId);
        res.status(201).json({
            isError: false,
            message: "Task Updated Successfully",
            tasks: userTasks,
        });
    }
    catch (error) {
        res.status(500).json({
            isError: true,
            message: "Internal Server Error",
            error,
        });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { taskId } = req.params;
        const deletedTask = yield todolist_model_1.default.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({
                isError: true,
                message: "Task not found",
            });
        }
        yield user_model_1.default.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });
        const userTasks = yield getTasks(userId);
        res.status(201).json({
            isError: false,
            message: "Task Deleted Successfully",
            tasks: userTasks,
        });
    }
    catch (error) {
        res.status(500).json({
            isError: true,
            message: "Internal Server Error",
            error,
        });
    }
});
exports.deleteTask = deleteTask;
