import Portfolio from "../models/Portfolio.js";
import cloudinary from "../config/cloudinary.js";

/* CREATE */
export const createPortfolio = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Get Cloudinary URL from multer-storage-cloudinary
    const imageUrl = req.file.url;
    const publicId = req.file.filename;

    const portfolio = await Portfolio.create({
      title,
      category,
      image: imageUrl,
      public_id: publicId,
    });

    res.status(201).json(portfolio);
  } catch (error) {
    console.error("Create portfolio error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL */
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE */
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (portfolio.public_id) {
      await cloudinary.uploader.destroy(portfolio.public_id);
    }

    await Portfolio.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
