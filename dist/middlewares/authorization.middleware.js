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
exports.checkUserAuthorization = void 0;
const todolist_model_1 = __importDefault(require("../models/todolist.model"));
const checkUserAuthorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { taskId } = req.params;
        if (!taskId) {
            res.status(500).json({
                isError: true,
                message: "Task Id is required as taskId in parameters",
            });
        }
        const task = yield todolist_model_1.default.findById(taskId);
        if (!task) {
            return res.status(404).json({
                isError: true,
                message: "Task not found",
            });
        }
        console.log(task, userId);
        if (task.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                isError: true,
                message: "Unauthorized. You do not have permission to perform this action.",
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            isError: true,
            message: "Internal Server Error",
            error,
        });
    }
});
exports.checkUserAuthorization = checkUserAuthorization;
