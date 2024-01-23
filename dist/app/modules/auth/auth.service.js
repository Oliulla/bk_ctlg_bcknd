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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("../user/user.model");
const signUpUser = (UserData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(UserData === null || UserData === void 0 ? void 0 : UserData.password) || !(UserData === null || UserData === void 0 ? void 0 : UserData.email)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide both email and password");
    }
    const isUserExist = yield user_model_1.User.isUserExist(UserData === null || UserData === void 0 ? void 0 : UserData.email);
    if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User with the email is already exist");
    }
    const newUser = yield user_model_1.User.create(UserData);
    return newUser;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist, please sign-up first");
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    //create access token & refresh token
    const { email: userEmail } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh Token");
    }
    const { userEmail } = verifiedToken;
    const isUserExist = yield user_model_1.User.isUserExist(userEmail);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: isUserExist.email,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    signUpUser,
    loginUser,
    refreshToken,
};
