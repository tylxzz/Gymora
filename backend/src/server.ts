import app from "./app"
import dotenv from "dotenv"
import config from "./config/config"

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`A szerver a ${PORT}-on fut`)
})

console.log("DB config:", config.database)

