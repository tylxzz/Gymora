import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

import rootRouter from "./routes/routes"
import trainerRouter from "./trainer/trainerRoutes"
import authRouter from "./auth/authRoutes"
import userRouter from "./user/userRoutes"


const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/", rootRouter)
app.use("/", authRouter)
app.use("/", userRouter)
app.use("/", trainerRouter)

export default app