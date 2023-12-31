import express from "express"
import { bookController } from "./book.controller"

const router = express.Router()

// Create a new book
router.post("/create-book", bookController.createBook)

// Get all books
router.get("/get-all-books", bookController.getAllBooks)

// Get a single book by ID
router.get("/:id", bookController.getBookById)

// // Update a book by ID
router.patch("/:id", bookController.updateBookById)

// // Delete a book by ID
router.delete("/:id", bookController.deleteBookById)

export default router
