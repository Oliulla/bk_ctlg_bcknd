import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import { IUser } from "./user.interface"
import { User } from "./user.model"

const getAllUsers = async () => {
  const user = await User.find()
  //   console.log(user)
  return user
}

// const createUser = async (UserData: IUser) => {
//   const newUser = await User.create(UserData)
//   return newUser
// }

const getUserByEmail = async (UserEmail: string) => {
  const user = await User.findById(UserEmail)
  return user
}
const updateUserByEmail = async (
  UserEmail: string,
  updateUserData: Partial<IUser>
) => {
  const updatedUser = await User.findByIdAndUpdate(UserEmail, updateUserData, {
    new: true,
  })
  return updatedUser
}
const deleteUserByEmail = async (UserEmail: string) => {
  const deletedUser = await User.findByIdAndRemove(UserEmail)
  if (!deletedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not Found!!!")
  }
  return deletedUser
}

export const UserService = {
  // createUser,
  getAllUsers,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
}
