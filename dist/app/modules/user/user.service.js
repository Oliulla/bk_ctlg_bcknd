"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.find();
    //   console.log(user)
    return user;
});
// const createUser = async (UserData: IUser) => {
//   const newUser = await User.create(UserData)
//   return newUser
// }
const getUserByEmail = (UserEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(UserEmail);
    return user;
});
const updateUserByEmail = (UserEmail, updateUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(UserEmail, updateUserData, {
        new: true,
    });
    return updatedUser;
});
const deleteUserByEmail = (UserEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield user_model_1.User.findByIdAndRemove(UserEmail);
    if (!deletedUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Not Found!!!");
    }
    return deletedUser;
});
exports.UserService = {
    // createUser,
    getAllUsers,
    getUserByEmail,
    updateUserByEmail,
    deleteUserByEmail,
};
