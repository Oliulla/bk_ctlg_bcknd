import { RequestHandler, Request, Response } from "express"
import { catchAsync } from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { UserService } from "./user.service"

// const createUser: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const UserData = req.body
//     const result = await UserService.createUser(UserData)

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "User Created Succcessfully!",
//       data: result,
//     })
//   }
// )

const getAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Users retrieved Succcessfully!",
      data: result,
    })
  }
)

const getUserByEmail: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const UserEmail = req.params.email
    const result = await UserService.getUserByEmail(UserEmail)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get single User Succcessfully!",
      data: result,
    })
  }
)

const updateUserByEmail: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const UserEmail = req.params.email
    const updateUserData = req.body
    const result = await UserService.updateUserByEmail(
      UserEmail,
      updateUserData
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Updated Succcessfully!",
      data: result,
    })
  }
)
const deleteUserByEmail: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const UserEmail = req.params.email
    const result = await UserService.deleteUserByEmail(UserEmail)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Deleted Succcessfully!",
      data: result,
    })
  }
)

export const UserController = {
  //   createUser,
  getAllUsers,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
}
