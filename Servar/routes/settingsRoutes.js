import express from "express";
import Settings from "../models/Settings.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

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

    if (!settings) {
      settings = new Settings();
    }

    // OLD ADMIN USER
    const adminUser = await User.findOne({ role: "admin" });

    /* SETTINGS UPDATE */
    settings.studioName = studioName;
    settings.adminEmail = adminEmail;
    settings.logo = logo;
    settings.themeColor = themeColor;
    settings.websiteDescription = websiteDescription;

    await settings.save();

    /* ADMIN USER UPDATE */
    if (adminUser) {
      adminUser.email = adminEmail;

      // password blank ho to old password rahega
      if (password && password.trim() !== "") {
        const hashedPassword = await bcrypt.hash(password, 10);
        adminUser.password = hashedPassword;
      }

      await adminUser.save();
    }

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
