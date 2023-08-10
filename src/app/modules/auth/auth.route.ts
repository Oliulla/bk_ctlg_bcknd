import express from "express"
import { AuthController } from "./auth.controller"
const router = express.Router()

router.post("/sign-up", AuthController.signUpUser)

router.post("/login", AuthController.loginUser)

router.post("/refresh-token", AuthController.refreshToken)

export default router
