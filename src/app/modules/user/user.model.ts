/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"
import config from "../../../config"
import { IUser, UserModel } from "./user.interface"

const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

userSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await User.findOne({ email }, { email: 1, password: 1 })
}

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

// User.create() / user.save()
userSchema.pre("save", async function (next) {
  // hashing user password
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  )

  next()
})

export const User = model<IUser, UserModel>("User", userSchema)
export default UserModel
