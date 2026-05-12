import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createPortfolio,
  getPortfolio,
  deletePortfolio,
} from "../controllers/portfolioController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  adminOnly,
  upload.single("image"),
  createPortfolio,
);

router.get(
    "/", 
    getPortfolio
);

router.delete("/:id", protect, deletePortfolio);

export default router;
