/* eslint-disable no-unused-vars */
import { Document, Model } from "mongoose"

export type IUser = {
  email: string
  password: string
} & Document

export type UserModel = {
  isUserExist(email: string): Promise<Pick<IUser, "email" | "password">>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
