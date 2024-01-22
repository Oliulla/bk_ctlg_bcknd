import mongoose, { Schema, Model } from "mongoose"
import { Document } from "mongoose"
import { IBook, Status } from "./book.interface"

const reviewSchema = new Schema({
  user_email: { type: String, required: true },
  comment: { type: String, required: true },
})

const wishlistReaderSchema = new Schema({
  reader_email: { type: String, required: true },
})

const readingStatusSchema = new Schema({
  reader_email: { type: String, required: true },
  status: { type: String, enum: Status, required: true },
})

const bookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publication_date: { type: Date, required: true },
    reviews: [reviewSchema],
    user_email: { type: String, required: true },
    wishlist: [wishlistReaderSchema],
    reading_status: [readingStatusSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const BookModel: Model<IBook & Document> = mongoose.model<IBook & Document>(
  "Books",
  bookSchema
)

export default BookModel
