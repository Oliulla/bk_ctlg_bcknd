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
exports.bookController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const book_service_1 = require("./book.service");
const book_constants_1 = require("./book.constants");
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const createBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const result = yield book_service_1.bookService.createBook(bookData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book Created Succcessfully!",
        data: result,
    });
}));
const insertReview = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const reviewData = req.body;
    const result = yield book_service_1.bookService.insertReview(id, reviewData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully created review!",
        data: result,
    });
}));
const pushReaderInWishlist = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, readerEmail } = req.params;
    // console.log(bookId, readerEmail)
    const result = yield book_service_1.bookService.pushReaderInWishlist(bookId, readerEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully added in wishlist!",
        data: result,
    });
}));
const changeBookStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, readerEmail } = req.params;
    const status = req.body.status;
    // console.log(bookId, readerEmail, "body:", status)
    const result = yield book_service_1.bookService.changeBookStatus(bookId, readerEmail, status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Successfully added in ${status}`,
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constants_1.bookFilterableFields);
    // console.log(filters)
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield book_service_1.bookService.getAllBooks(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Books retrieved Succcessfully!",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result.data,
    });
}));
const getBookById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const result = yield book_service_1.bookService.getBookById(bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get single Book Succcessfully!",
        data: result,
    });
}));
const updateBookById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const updateBookData = req.body;
    const result = yield book_service_1.bookService.updateBookById(bookId, updateBookData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book Updated Succcessfully!",
        data: result,
    });
}));
const deleteBookById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const result = yield book_service_1.bookService.deleteBookById(bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book Deleted Succcessfully!",
        data: result,
    });
}));
exports.bookController = {
    createBook,
    insertReview,
    pushReaderInWishlist,
    changeBookStatus,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById,
};
