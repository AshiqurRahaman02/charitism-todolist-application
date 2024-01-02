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
exports.deleteUser = exports.userLogin = exports.userRegister = exports.getUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecretKey = process.env.jwt_secret_key;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ isError: true, message: "User not found" });
        }
        res.status(200).json({ isError: false, user });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: error });
    }
});
exports.getUser = getUser;
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        let user = yield user_model_1.default.findOne({ email });
        if (user) {
            return res.status(201).json({
                isError: true,
                message: "Email already used in this website.",
            });
        }
        bcrypt_1.default.hash(password, 5, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            const user = new user_model_1.default({ email, password: hash, name, });
            yield user.save();
            res.status(201).json({
                isError: false,
                message: "Welcome to our website",
                token: jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id }, jwtSecretKey),
                user,
            });
        }));
    }
    catch (error) {
        res.status(404).json({ isError: true, message: error.message });
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ isError: true, message: "User not found" });
        }
        bcrypt_1.default.compare(password, user.password, (err, result) => {
            if (result) {
                res.status(200).json({
                    isError: false,
                    message: "Welcome Back to our website",
                    token: jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id }, jwtSecretKey),
                    user,
                });
            }
            else {
                res.status(401).json({
                    isError: true,
                    message: "Invalid password",
                });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ isError: true, message: error.message });
    }
});
exports.userLogin = userLogin;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { password } = req.body;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ isError: true, message: "User not found" });
        }
        // Compare the provided password with the user's actual password
        const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatches) {
            return res
                .status(401)
                .json({ isError: true, message: "Invalid password" });
        }
        // If the password is correct, proceed with user deletion
        yield user_model_1.default.findByIdAndDelete(userId);
        res.status(200).json({
            isError: false,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: error.message });
    }
});
exports.deleteUser = deleteUser;
