import { Router } from "express";
import { getRoles } from "./roleController";
import verifyToken from "../middleware/auth";

const router: Router = Router()

router.get("/roles", verifyToken, getRoles)

export default router