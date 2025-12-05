import { Router } from "express";
import verifyToken from "../middleware/auth";
import {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
} from "./bookingController"

const router: Router = Router()

router.get("/bookings", verifyToken, getBookings)
router.get("/bookings/:id", verifyToken, getBookingById)
router.post("/bookings", verifyToken, createBooking)
router.put("/bookings/:id", verifyToken, updateBooking)
router.delete("/bookings/:id", verifyToken, deleteBooking)

export default router;