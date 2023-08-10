import express from "express"
import BookRoutes from "../modules/book/book.route"

const router = express.Router()

const moduleRoutes = [
  {
    path: "/books",
    route: BookRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
