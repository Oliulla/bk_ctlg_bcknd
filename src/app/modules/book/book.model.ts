import mongoose, { Schema, Model } from "mongoose"
import { IBook } from "./book.interface"

const reviewSchema = new Schema({
  comment: { type: String, required: true },
})

const bookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publication_date: { type: Date, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const BookModel: Model<IBook> = mongoose.model<IBook>("Books", bookSchema)

export default BookModel
