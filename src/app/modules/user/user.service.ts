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

const getUserById = async (UserId: string) => {
  const user = await User.findById(UserId)
  return user
}
const updateUserById = async (
  UserId: string,
  updateUserData: Partial<IUser>
) => {
  const updatedUser = await User.findByIdAndUpdate(UserId, updateUserData, {
    new: true,
  })
  return updatedUser
}
const deleteUserById = async (UserId: string) => {
  const deletedUser = await User.findByIdAndRemove(UserId)
  if (!deletedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not Found!!!")
  }
  return deletedUser
}

export const UserService = {
  // createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
}
