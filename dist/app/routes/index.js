"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = __importDefault(require("../modules/book/book.route"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/books",
        route: book_route_1.default,
    },
    {
        path: "/user",
        route: user_route_1.default,
    },
    {
        path: "/auth",
        route: auth_route_1.default,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
