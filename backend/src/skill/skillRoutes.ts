import { Router } from "express";
import verifyToken from "../middleware/auth";
import { createSkill, deleteSkill, getSkillById, getSkills, updateSkill } from "./skillController";

const router: Router = Router()

router.get("/skills", verifyToken, getSkills)
router.get("/skills/:id", verifyToken, getSkillById)
router.post("/skills", verifyToken, createSkill)
router.put("skills/:id", verifyToken, updateSkill)
router.delete("skills/:id", verifyToken, deleteSkill)

export default router