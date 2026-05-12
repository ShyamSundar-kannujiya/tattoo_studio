import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  Users,
  Search,
  Trash2,
  Eye,
  Mail,
  Phone,
  CalendarDays,
} from "lucide-react";
import api from "../api/axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch customers from backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get("/customers");
        setCustomers(res.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Delete customer
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/customers/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Search filter
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-6 md:p-10">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-widest">
              Customer <span className="text-red-500">Management</span>
            </h1>
            <p className="text-gray-400 mt-2">
              View and manage studio clients.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search
              className="absolute top-3.5 left-4 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="bg-red-600 p-4 rounded-xl">
            <Users size={28} />
          </div>

          <div>
            <h3 className="text-2xl font-bold">{customers.length}</h3>
            <p className="text-gray-400">Total Customers</p>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-10 text-center text-gray-400">
              Loading customers...
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              No customers found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-red-600/20 border-b border-white/10">
                  <tr>
                    <th className="p-5">Customer</th>
                    <th className="p-5">Phone</th>
                    <th className="p-5">Joined</th>
                    <th className="p-5">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="p-5">
                        <div>
                          <h3 className="font-semibold">{customer.name}</h3>
                          <p className="text-sm text-gray-400">
                            {customer.email}
                          </p>
                        </div>
                      </td>

                      <td className="p-5 text-gray-300">{customer.phone}</td>

                      <td className="p-5 text-gray-300">
                        {customer.createdAt
                          ? new Date(customer.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="p-5 flex gap-3">
                        {/* View */}
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
                        >
                          <Eye size={18} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(customer._id)}
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

        {/* Customer Detail Modal */}
        {selectedCustomer && (
          <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-2xl w-full relative">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
              >
                ✕
              </button>

              <h2 className="text-3xl font-bold mb-6 uppercase">
                Customer Details
              </h2>

              <div className="space-y-5 text-gray-300">
                <div className="flex items-center gap-3">
                  <Users className="text-red-500" size={20} />
                  <span>
                    <strong className="text-white">Name:</strong>{" "}
                    {selectedCustomer.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-red-500" size={20} />
                  <span>
                    <strong className="text-white">Email:</strong>{" "}
                    {selectedCustomer.email}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-red-500" size={20} />
                  <span>
                    <strong className="text-white">Phone:</strong>{" "}
                    {selectedCustomer.phone}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarDays className="text-red-500" size={20} />
                  <span>
                    <strong className="text-white">Joined:</strong>{" "}
                    {selectedCustomer.createdAt
                      ? new Date(
                          selectedCustomer.createdAt,
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <div>
                  <strong className="text-white">Notes:</strong>
                  <p className="mt-2 text-gray-400">
                    {selectedCustomer.notes || "No additional notes available."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Customers;
