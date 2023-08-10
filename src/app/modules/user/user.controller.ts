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

const getUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const UserId = req.params.id
    const result = await UserService.getUserById(UserId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get single User Succcessfully!",
      data: result,
    })
  }
)

const updateUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const UserId = req.params.id
    const updateUserData = req.body
    const result = await UserService.updateUserById(UserId, updateUserData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Updated Succcessfully!",
      data: result,
    })
  }
)
const deleteUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const UserId = req.params.id
    const result = await UserService.deleteUserById(UserId)

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
  getUserById,
  updateUserById,
  deleteUserById,
}
