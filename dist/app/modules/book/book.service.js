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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const book_model_1 = __importDefault(require("./book.model"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const book_constants_1 = require("./book.constants");
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield book_model_1.default.create(bookData);
    return newBook;
});
const insertReview = (id, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const book = yield book_model_1.default.findById(id);
        if (!book) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
        }
        // Use nullish coalescing operator to handle 'undefined'
        book.reviews = (_a = book.reviews) !== null && _a !== void 0 ? _a : [];
        book.reviews.push(reviewData);
        const updatedBook = yield book.save();
        return updatedBook;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
});
const pushReaderInWishlist = (bookId, readerEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findById(bookId);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found with the given ID");
    }
    const userWishlistCheck = yield book_model_1.default.find({
        _id: bookId,
        "wishlist.reader_email": { $eq: readerEmail },
    });
    // console.log("userwish", userWishlistCheck)
    if (userWishlistCheck.length > 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You already added this book in wishlist");
    }
    // Check if the user has already added the book with the any status
    const userStatusCheck = yield book_model_1.default.findOne({
        _id: bookId,
        "reading_status.reader_email": readerEmail,
    });
    if (userStatusCheck) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You already added this status. So, you can't add this to wishlist!!!");
    }
    // Book not found, so let's add it to the wishlist
    yield book_model_1.default.updateOne({ _id: book._id }, { $push: { wishlist: { reader_email: readerEmail } } });
    // console.log(updatedBook)
    return book;
});
const changeBookStatus = (bookId, readerEmail, status) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findById(bookId);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found with the given book id!!!");
    }
    // Check if the user has already added the book with the requested status
    const userStatusCheck = yield book_model_1.default.findOneAndUpdate({
        _id: bookId,
        "reading_status.reader_email": readerEmail,
    }, {
        $set: {
            "reading_status.$.status": status,
        },
    }, { new: true });
    if (!userStatusCheck) {
        // If the user hasn't added the book with the requested status, check if the user has added the book to the wishlist
        const userWishlistCheck = yield book_model_1.default.findOne({
            _id: bookId,
            "wishlist.reader_email": readerEmail,
        });
        if (!userWishlistCheck) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You have to add the book to the wishlist first!!!");
        }
        // Remove user from wishlist
        yield book_model_1.default.updateOne({ _id: bookId }, { $pull: { wishlist: { reader_email: readerEmail } } });
        // Update user's reading status by pushing a new entry
        yield book_model_1.default.updateOne({ _id: book._id }, {
            $push: {
                reading_status: { reader_email: readerEmail, status: status },
            },
        });
    }
    return book;
});
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters
    // console.log(searchTerm)
    , ["searchTerm"]);
    // console.log(searchTerm)
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constants_1.bookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const books = yield book_model_1.default.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    //   console.log(books)
    const total = yield book_model_1.default.countDocuments(books);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: books,
    };
});
const getBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findById(bookId);
    return book;
});
const updateBookById = (bookId, updateBookData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield book_model_1.default.findByIdAndUpdate(bookId, updateBookData, { new: true });
    return updatedBook;
});
const deleteBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBook = yield book_model_1.default.findByIdAndRemove(bookId);
    if (!deletedBook) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Not Found!!!");
    }
    return deletedBook;
});
exports.bookService = {
    createBook,
    insertReview,
    pushReaderInWishlist,
    changeBookStatus,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById,
};
