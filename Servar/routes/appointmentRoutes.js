import express from "express";
import {
  createAppointment,
  getAllAppointments,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

/* PUBLIC BOOKING */
router.post("/", createAppointment);

/* ADMIN VIEW */
router.get("/", getAllAppointments);

/* DELETE */
router.delete("/:id", deleteAppointment);

export default router;
