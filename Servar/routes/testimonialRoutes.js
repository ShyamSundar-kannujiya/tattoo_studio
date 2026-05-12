import express from "express";

import {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */

// Create Review
router.post("/", createTestimonial);

// Get All Reviews
router.get("/", getTestimonials);

/* =========================
   ADMIN ROUTE
========================= */

// Delete Review
router.delete("/:id", deleteTestimonial);

export default router;
