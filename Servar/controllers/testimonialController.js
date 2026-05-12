import Testimonial from "../models/Testimonial.js";

/* =========================
   CREATE TESTIMONIAL
========================= */
export const createTestimonial = async (req, res) => {
  try {
    const { name, review } = req.body;

    if (!name || !review) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const testimonial = await Testimonial.create({
      name,
      review,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ALL TESTIMONIALS
========================= */
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   DELETE TESTIMONIAL
========================= */
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await testimonial.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
