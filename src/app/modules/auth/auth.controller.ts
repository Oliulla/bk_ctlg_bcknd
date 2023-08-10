import { Request, RequestHandler, Response } from "express"
import config from "../../../config"
import sendResponse from "../../../shared/sendResponse"
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface"
import { catchAsync } from "../../../shared/catchAsync"
import httpStatus from "http-status"
import { AuthService } from "./auth.service"
import { IUser } from "../user/user.interface"

const signUpUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body
    const result = await AuthService.signUpUser(userData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User signned up successfully!",
      data: result,
    })
  }
)

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body
  const result = await AuthService.loginUser(loginData)
  const { refreshToken, ...others } = result

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  }

  res.cookie("refreshToken", refreshToken, cookieOptions)

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: others,
  })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const result = await AuthService.refreshToken(refreshToken)

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  }

  res.cookie("refreshToken", refreshToken, cookieOptions)

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: result,
  })
})

export const AuthController = {
  signUpUser,
  loginUser,
  refreshToken,
}
