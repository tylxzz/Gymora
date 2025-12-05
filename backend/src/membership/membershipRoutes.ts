import { Router } from "express"
import verifyToken from "../middleware/auth"
import {
  getMemberships,
  getMembershipById,
  createMembership
} from "./membershipController"

const router: Router = Router()

router.get("/memberships", verifyToken, getMemberships)
router.get("/memberships/:id", verifyToken, getMembershipById)
router.post("/memberships", verifyToken, createMembership)

export default router
