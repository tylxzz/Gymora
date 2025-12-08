import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

import rootRouter from "./routes/routes"
import trainerRouter from "./trainer/trainerRoutes"
import authRouter from "./auth/authRoutes"
import userRouter from "./user/userRoutes"
import roleRouter from "./role/roleRoutes"
import skillRouter from "./skill/skillRoutes"
import locationRouter from "./location/locationRoutes"
import bookingRouter from "./booking/bookingRoute"
import membershipRouter from "./membership/membershipRoutes"


const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/", rootRouter)
app.use("/", authRouter)
app.use("/", userRouter)
app.use("/", roleRouter)
app.use("/", trainerRouter)
app.use("/", skillRouter)
app.use("/", locationRouter)
app.use("/", bookingRouter)
app.use("/", membershipRouter)

export default app