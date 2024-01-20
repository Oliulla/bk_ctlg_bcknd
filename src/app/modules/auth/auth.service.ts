import httpStatus from "http-status"
import { Secret } from "jsonwebtoken"
import config from "../../../config"
import ApiError from "../../../errors/ApiError"
import { jwtHelpers } from "../../../helpers/jwtHelpers"
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface"
import { User } from "../user/user.model"
import { IUser } from "../user/user.interface"

const signUpUser = async (UserData: IUser) => {
  if (!UserData?.password || !UserData?.email) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please provide both email and password"
    )
  }
  const isUserExist = await User.isUserExist(UserData?.email)

  if (isUserExist?.email) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User with the email is already exist"
    )
  }

  const newUser = await User.create(UserData)

  return newUser
}

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload

  const isUserExist = await User.isUserExist(email)

  if (!isUserExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User does not exist, please sign-up first"
    )
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect")
  }

  //create access token & refresh token

  const { email: userEmail } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { userEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { userEmail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token")
  }

  const { userEmail } = verifiedToken

  const isUserExist = await User.isUserExist(userEmail)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist")
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  signUpUser,
  loginUser,
  refreshToken,
}
