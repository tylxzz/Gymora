import { Router } from "express"
import verifyToken from "../middleware/auth"
import {
  getTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getTrainerSkills,
  addTrainerSkill,
  deleteTrainerSkill,
  getTrainerLocations,
  addTrainerLocation,
  deleteTrainerLocation
} from "./trainerController"

const router: Router = Router()

router.get("/trainers", verifyToken, getTrainers)
router.get("/trainers/:id", verifyToken, getTrainerById)
router.post("/trainers", verifyToken, createTrainer)
router.put("/trainers/:id", verifyToken, updateTrainer)
router.delete("/trainers/:id", verifyToken, deleteTrainer)

router.get("/trainers/:id/skills", verifyToken, getTrainerSkills)
router.post("/trainers/:id/skills", verifyToken, addTrainerSkill)
router.delete(
  "/trainers/:trainerId/skills/:skillId",
  verifyToken,
  deleteTrainerSkill
)

router.get("/trainers/:id/locations", verifyToken, getTrainerLocations)
router.post("/trainers/:id/locations", verifyToken, addTrainerLocation)
router.delete(
  "/trainers/:trainerId/locations/:locationId",
  verifyToken,
  deleteTrainerLocation
)

export default router
