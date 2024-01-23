"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// Create a new uSER
// router.post("/create-book", userController.createUser)
// Get all Users
router.get("/get-all-users", user_controller_1.UserController.getAllUsers);
// Get a single User by ID
router.get("/:email", user_controller_1.UserController.getUserByEmail);
// // Update a User by ID
router.patch("/:email", user_controller_1.UserController.updateUserByEmail);
// // Delete a User by ID
router.delete("/:email", user_controller_1.UserController.deleteUserByEmail);
exports.default = router;
