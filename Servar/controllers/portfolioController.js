import Portfolio from "../models/Portfolio.js";
import cloudinary from "../config/cloudinary.js";

/* CREATE */
export const createPortfolio = async (req, res) => {
  try {
    const { title, category } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);

    const portfolio = await Portfolio.create({
      title,
      category,
      image: result.secure_url,
      public_id: result.public_id,
    });

    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* GET ALL */
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find();

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* DELETE */
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(portfolio.public_id);

    // Delete from DB
    await Portfolio.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Portfolio deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
