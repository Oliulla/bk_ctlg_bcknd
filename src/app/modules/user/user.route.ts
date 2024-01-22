import express from "express"
import { UserController } from "./user.controller"

const router = express.Router()

// Create a new uSER
// router.post("/create-book", userController.createUser)

// Get all Users
router.get("/get-all-users", UserController.getAllUsers)

// Get a single User by ID
router.get("/:email", UserController.getUserByEmail)

// // Update a User by ID
router.patch("/:email", UserController.updateUserByEmail)

// // Delete a User by ID
router.delete("/:email", UserController.deleteUserByEmail)

export default router
