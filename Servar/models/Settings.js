import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    studioName: {
      type: String,
      default: "Tattoo Studio",
    },

    adminEmail: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    themeColor: {
      type: String,
      default: "#dc2626",
    },

    websiteDescription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
