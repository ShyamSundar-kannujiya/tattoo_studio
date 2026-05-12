import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { CalendarDays, Trash2, Eye, Search } from "lucide-react";
import api from "../api/axios";

const Appointments = () => {
  console.log("Appointments Component Rendered");
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH APPOINTMENTS
  ========================= */
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointments");

        // Backend response: { total, appointments }
        setAppointments(res.data.appointments || []);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  /* =========================
     DELETE APPOINTMENT
  ========================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/appointments/${id}`);

      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== id),
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* =========================
     SEARCH FILTER
  ========================= */
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.tattooStyle?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-6 md:p-10">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl font-bold uppercase tracking-widest">
            Appointment <span className="text-red-500">Management</span>
          </h1>

          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search
              className="absolute top-3.5 left-4 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-10 text-center text-gray-400">
              Loading appointments...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              No appointments found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-red-600/20 border-b border-white/10">
                  <tr>
                    <th className="p-5">Client</th>
                    <th className="p-5">Tattoo Style</th>
                    <th className="p-5">Date</th>
                    <th className="p-5">Status</th>
                    <th className="p-5">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      {/* Client Info */}
                      <td className="p-5">
                        <div>
                          <h3 className="font-semibold">
                            {appointment.fullName}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {appointment.email}
                          </p>
                        </div>
                      </td>

                      {/* Tattoo Style */}
                      <td className="p-5 text-gray-300">
                        {appointment.tattooStyle}
                      </td>

                      {/* Date */}
                      <td className="p-5 text-gray-300 flex items-center gap-2">
                        <CalendarDays size={16} className="text-red-500" />
                        {new Date(
                          appointment.appointmentDate,
                        ).toLocaleDateString()}
                      </td>

                      {/* Status */}
                      <td className="p-5">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            appointment.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : appointment.status === "confirmed"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-5 flex gap-3">
                        {/* View */}
                        <button
                          onClick={() => setSelectedAppointment(appointment)}
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
                        >
                          <Eye size={18} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(appointment._id)}
                          className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* =========================
            VIEW MODAL
        ========================= */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-2xl w-full relative">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
              >
                ✕
              </button>

              <h2 className="text-3xl font-bold mb-6 uppercase">
                Appointment Details
              </h2>

              <div className="space-y-4 text-gray-300">
                <p>
                  <span className="font-semibold text-white">Name:</span>{" "}
                  {selectedAppointment.fullName}
                </p>

                <p>
                  <span className="font-semibold text-white">Email:</span>{" "}
                  {selectedAppointment.email}
                </p>

                <p>
                  <span className="font-semibold text-white">Phone:</span>{" "}
                  {selectedAppointment.phone}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Tattoo Style:
                  </span>{" "}
                  {selectedAppointment.tattooStyle}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Appointment Date:
                  </span>{" "}
                  {new Date(
                    selectedAppointment.appointmentDate,
                  ).toLocaleDateString()}
                </p>

                <p>
                  <span className="font-semibold text-white">Status:</span>{" "}
                  {selectedAppointment.status}
                </p>

                <p>
                  <span className="font-semibold text-white">Message:</span>{" "}
                  {selectedAppointment.message || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Appointments;
