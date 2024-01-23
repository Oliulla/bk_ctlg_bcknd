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
exports.UserController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
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
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Users retrieved Succcessfully!",
        data: result,
    });
}));
const getUserByEmail = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserEmail = req.params.email;
    const result = yield user_service_1.UserService.getUserByEmail(UserEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get single User Succcessfully!",
        data: result,
    });
}));
const updateUserByEmail = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserEmail = req.params.email;
    const updateUserData = req.body;
    const result = yield user_service_1.UserService.updateUserByEmail(UserEmail, updateUserData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Updated Succcessfully!",
        data: result,
    });
}));
const deleteUserByEmail = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserEmail = req.params.email;
    const result = yield user_service_1.UserService.deleteUserByEmail(UserEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Deleted Succcessfully!",
        data: result,
    });
}));
exports.UserController = {
    //   createUser,
    getAllUsers,
    getUserByEmail,
    updateUserByEmail,
    deleteUserByEmail,
};
