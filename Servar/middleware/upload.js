import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, 
  params: {
    folder: "tattoo-studio",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "gif", "svg"],
  },
});

const upload = multer({ storage });

export default upload;
