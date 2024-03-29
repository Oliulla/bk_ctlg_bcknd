import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import IBook, { IBookFilters, Review } from "./book.interface"
import BookModel from "./book.model"
import { IPaginationOptions } from "../../interfaces/pagination"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { bookSearchableFields } from "./book.constants"
import { SortOrder } from "mongoose"

const createBook = async (bookData: IBook) => {
  const newBook = await BookModel.create(bookData)
  return newBook
}

const insertReview = async (id: string, reviewData: Review) => {
  try {
    const book = await BookModel.findById(id)

    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, "Book not found")
    }

    // Use nullish coalescing operator to handle 'undefined'
    book.reviews = book.reviews ?? []
    book.reviews.push(reviewData)

    const updatedBook = await book.save()

    return updatedBook
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    )
  }
}

const pushReaderInWishlist = async (bookId: string, readerEmail: string) => {
  const book = await BookModel.findById(bookId)

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found with the given ID")
  }

  const userWishlistCheck = await BookModel.find({
    _id: bookId,
    "wishlist.reader_email": { $eq: readerEmail },
  })

  // console.log("userwish", userWishlistCheck)

  if (userWishlistCheck.length > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already added this book in wishlist"
    )
  }

  // Check if the user has already added the book with the any status
  const userStatusCheck = await BookModel.findOne({
    _id: bookId,
    "reading_status.reader_email": readerEmail,
  })

  if (userStatusCheck) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already added this status. So, you can't add this to wishlist!!!"
    )
  }

  // Book not found, so let's add it to the wishlist
  await BookModel.updateOne(
    { _id: book._id },
    { $push: { wishlist: { reader_email: readerEmail } } }
  )

  // console.log(updatedBook)
  return book
}

const changeBookStatus = async (
  bookId: string,
  readerEmail: string,
  status: string
) => {
  const book = await BookModel.findById(bookId)

  if (!book) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Book not found with the given book id!!!"
    )
  }

  // Check if the user has already added the book with the requested status
  const userStatusCheck = await BookModel.findOneAndUpdate(
    {
      _id: bookId,
      "reading_status.reader_email": readerEmail,
    },
    {
      $set: {
        "reading_status.$.status": status,
      },
    },
    { new: true }
  )

  if (!userStatusCheck) {
    // If the user hasn't added the book with the requested status, check if the user has added the book to the wishlist
    const userWishlistCheck = await BookModel.findOne({
      _id: bookId,
      "wishlist.reader_email": readerEmail,
    })

    if (!userWishlistCheck) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You have to add the book to the wishlist first!!!"
      )
    }

    // Remove user from wishlist
    await BookModel.updateOne(
      { _id: bookId },
      { $pull: { wishlist: { reader_email: readerEmail } } }
    )

    // Update user's reading status by pushing a new entry
    await BookModel.updateOne(
      { _id: book._id },
      {
        $push: {
          reading_status: { reader_email: readerEmail, status: status },
        },
      }
    )
  }

  return book
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
  insertReview,
  pushReaderInWishlist,
  changeBookStatus,

  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
}
