import Appointment from "../models/Appointment.js";

/* =========================
   CREATE APPOINTMENT (PUBLIC)
========================= */
export const createAppointment = async (req, res) => {
  try {
    const { fullName, email, phone, tattooStyle, appointmentDate, message } =
      req.body;

    const appointment = await Appointment.create({
      fullName,
      email,
      phone,
      tattooStyle,
      appointmentDate,
      message,
    });

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   GET ALL APPOINTMENTS (ADMIN)
========================= */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      total: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   DELETE APPOINTMENT
========================= */
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    await appointment.deleteOne();

    res.status(200).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
