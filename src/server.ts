import mongoose from "mongoose"
import config from "./config/index"
import app from "./app"
// import { logger, errorLogger } from "./shared/logger"
import { Server } from "http"

process.on("uncaughtException", error => {
  console.log(error)
  process.exit(1)
})

let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`Database connected successfully!`)

    server = app.listen(config.port, () => {
      console.log(`Book Catalog app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(`Failed to connect with DB!!!`)
  }

  process.on("unhandleRejection", error => {
    if (server) {
      server.close(() => {
        console.log(error)

        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on("SIGTERM", () => {
  console.log("SIGTERM is recieved...")
  if (server) {
    server.close()
  }
})
