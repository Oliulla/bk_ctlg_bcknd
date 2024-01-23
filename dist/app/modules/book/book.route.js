"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
// Create a new book
router.post("/create-book", book_controller_1.bookController.createBook);
// Insert review for a book
router.post("/:bookId", book_controller_1.bookController.insertReview);
// Push reader in wishlist
router.post("/wishlist/:bookId&:readerEmail", book_controller_1.bookController.pushReaderInWishlist);
// Change user reading status
router.post("/wishlist/status/:bookId&:readerEmail", book_controller_1.bookController.changeBookStatus);
// Get all books
router.get("/get-all-books", book_controller_1.bookController.getAllBooks);
// Get a single book by ID
router.get("/:id", book_controller_1.bookController.getBookById);
// // Update a book by ID
router.patch("/:id", book_controller_1.bookController.updateBookById);
// // Delete a book by ID
router.delete("/:id", book_controller_1.bookController.deleteBookById);
exports.default = router;
