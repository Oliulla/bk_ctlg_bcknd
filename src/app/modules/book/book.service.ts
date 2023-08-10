import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import IBook from "./book.interface"
import BookModel from "./book.model"

const getAllBooks = async () => {
  const books = await BookModel.find()
  //   console.log(books)
  return books
}

const createBook = async (bookData: IBook) => {
  const newBook = await BookModel.create(bookData)
  return newBook
}

const getBookById = async (bookId: string) => {
  const book = await BookModel.findById(bookId)
  return book
}
const updateBookById = async (
  bookId: string,
  updateBookData: Partial<IBook>
) => {
  const updatedBook = await BookModel.findByIdAndUpdate(
    bookId,
    updateBookData,
    { new: true }
  )
  return updatedBook
}
const deleteBookById = async (bookId: string) => {
  const deletedBook = await BookModel.findByIdAndRemove(bookId)
  if (!deletedBook) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not Found!!!")
  }
  return deletedBook
}

export const bookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
}
