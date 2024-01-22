import mongoose, { Schema, Model } from "mongoose"
import { Document } from "mongoose"
import { IBook } from "./book.interface"

const reviewSchema = new Schema({
  user_id: { type: String, requuired: true },
  comment: { type: String, required: true },
})

const bookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publication_date: { type: Date, required: true },
    reviews: [reviewSchema],
    user_id: { type: String, required: true },
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
