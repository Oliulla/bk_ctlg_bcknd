import { RequestHandler, Request, Response } from "express"
import { catchAsync } from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { bookService } from "./book.service"
import { bookFilterableFields } from "./book.constants"
import pick from "../../../shared/pick"
import { paginationFields } from "../../../constants/pagination"

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookData = req.body
    const result = await bookService.createBook(bookData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book Created Succcessfully!",
      data: result,
    })
  }
)

const getAllBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields)
    // console.log(filters)
    const paginationOptions = pick(req.query, paginationFields)
    const result = await bookService.getAllBooks(filters, paginationOptions)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Books retrieved Succcessfully!",
      meta: result?.meta,
      data: result.data,
    })
  }
)

const getBookById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookId = req.params.id
    const result = await bookService.getBookById(bookId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get single Book Succcessfully!",
      data: result,
    })
  }
)

const updateBookById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookId = req.params.id
    const updateBookData = req.body
    const result = await bookService.updateBookById(bookId, updateBookData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book Updated Succcessfully!",
      data: result,
    })
  }
)
const deleteBookById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookId = req.params.id
    const result = await bookService.deleteBookById(bookId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book Deleted Succcessfully!",
      data: result,
    })
  }
)

export const bookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
}
