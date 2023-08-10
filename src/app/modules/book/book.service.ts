import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import IBook, { IBookFilters } from "./book.interface"
import BookModel from "./book.model"
import { IPaginationOptions } from "../../interfaces/pagination"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { bookSearchableFields } from "./book.constants"
import { SortOrder } from "mongoose"

const createBook = async (bookData: IBook) => {
  const newBook = await BookModel.create(bookData)
  return newBook
}

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters
  // console.log(searchTerm)

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const books = await BookModel.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  //   console.log(books)

  const total = await BookModel.countDocuments(books)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: books,
  }
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
