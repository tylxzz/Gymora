import { Router } from "express";
import verifyToken from "../middleware/auth";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "./userController"

const router: Router = Router()

router.get("/users", verifyToken, getUsers)
router.get("/users/:id", verifyToken, getUserById)
router.post("/users", verifyToken, createUser)
router.put("/users/:id", verifyToken, updateUser)
router.delete("/users/:id", verifyToken, deleteUser)

export default router
