"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const book_interface_1 = require("./book.interface");
const reviewSchema = new mongoose_1.Schema({
    user_email: { type: String, required: true },
    comment: { type: String, required: true },
});
const wishlistReaderSchema = new mongoose_1.Schema({
    reader_email: { type: String, required: true },
});
const readingStatusSchema = new mongoose_1.Schema({
    reader_email: { type: String, required: true },
    status: { type: String, enum: book_interface_1.Status, required: true },
});
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publication_date: { type: Date, required: true },
    reviews: [reviewSchema],
    user_email: { type: String, required: true },
    wishlist: [wishlistReaderSchema],
    reading_status: [readingStatusSchema],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const BookModel = mongoose_1.default.model("Books", bookSchema);
exports.default = BookModel;
