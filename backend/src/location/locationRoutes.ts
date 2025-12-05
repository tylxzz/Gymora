import { Router } from "express";
import verifyToken from "../middleware/auth";
import { createLocation, deleteLocation, getLocationById, getLocations, updateLocation } from "./locationController";


const router: Router = Router();

router.get("/locations", verifyToken, getLocations)
router.get("/locations/:id", verifyToken, getLocationById)
router.post("/locations", verifyToken, createLocation)
router.put("/locations", verifyToken, updateLocation)
router.delete("/locations/:id", verifyToken, deleteLocation)

export default router