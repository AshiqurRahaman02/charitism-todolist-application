"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const todolist_route_1 = __importDefault(require("./routes/todolist.route"));
const authentication_middlewares_1 = require("./middlewares/authentication.middlewares");
const try_body_route_1 = require("./controllers/try.body.route");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routers
app.use("/user", user_route_1.default);
app.use("/todolist", authentication_middlewares_1.verifyToken, todolist_route_1.default);
app.post('/api/v2/suppliers/test-update-price', try_body_route_1.createTryBody);
exports.default = app;
