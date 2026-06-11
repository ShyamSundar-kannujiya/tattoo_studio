import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";

const app = express();

/* Middleware */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Routes */
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
app.use("/customers", customerRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/settings", settingsRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/testimonials", testimonialRoutes);

/* Default Route */
app.get("/", (req, res) => {
  res.send("Tattoo Studio API Running...");
});

/* Error Handler */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

/* Start Server */
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ DB Connection Failed:", err);
  });
