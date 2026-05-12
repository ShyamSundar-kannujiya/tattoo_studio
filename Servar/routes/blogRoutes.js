import express from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE BLOG */
router.post("/upload", protect, upload.single("image"), createBlog);

/* GET BLOGS (ADD THIS ONLY) */
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);

router.put("/:id", protect, upload.single("image"), updateBlog); 
router.delete("/:id", protect, deleteBlog);      

router.get("/blogsdebug", (req, res) => {
  res.json({ message: "Blog routes are working!" });
  
});

export default router;
