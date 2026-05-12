import express from "express";
import Settings from "../models/Settings.js";

const router = express.Router();

/* =========================
   GET SETTINGS
========================= */
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Agar database me settings nahi hai
    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   UPDATE SETTINGS
========================= */
router.put("/", async (req, res) => {
  try {
    const {
      studioName,
      adminEmail,
      password,
      logo,
      themeColor,
      websiteDescription,
    } = req.body;

    let settings = await Settings.findOne();

    // Agar settings nahi mili
    if (!settings) {
      settings = new Settings();
    }

    settings.studioName = studioName;
    settings.adminEmail = adminEmail;

    // Password blank ho to old password rahega
    if (password && password.trim() !== "") {
      settings.password = password;
    }

    settings.logo = logo;
    settings.themeColor = themeColor;
    settings.websiteDescription = websiteDescription;

    await settings.save();

    res.status(200).json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
