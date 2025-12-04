import { Router } from "express"

const router: Router = Router()

router.get("/", (_req, res) => {
  res.send("Gymora backend fut 🚀")
})

export default router
