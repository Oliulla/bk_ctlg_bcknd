"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/sign-up", auth_controller_1.AuthController.signUpUser);
router.post("/login", auth_controller_1.AuthController.loginUser);
router.post("/log-out", auth_controller_1.AuthController.logOutUser);
router.post("/refresh-token", auth_controller_1.AuthController.refreshToken);
exports.default = router;
