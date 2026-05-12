import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  CalendarCheck,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import api from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    appointments: 0,
    customers: 0,
    blogs: 0,
    revenue: 0,
  });

  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
   const [refreshing, setRefreshing] = useState(false);

  // Fetch dashboard stats
  const fetchDashboardData = async () => {
    setRefreshing(true);
    try {
    const [appointmentsRes, customersRes, blogsRes, portfolioRes] = await Promise.all([
      api.get("/appointments"),
      api.get("/customers"),
      api.get("/blogs"),
      api.get("/portfolio"),
    ]);

    // Handle different response structures
    const appointmentsCount = Array.isArray(appointmentsRes.data) 
      ? appointmentsRes.data.length 
      : (appointmentsRes.data.total || appointmentsRes.data.appointments?.length || 0);
    
    const customersCount = Array.isArray(customersRes.data)
      ? customersRes.data.length
      : (customersRes.data.total || customersRes.data.customers?.length || 0);
    
    const blogsCount = blogsRes.data.total || blogsRes.data.blogs?.length || 0;

    setStats({
      appointments: appointmentsCount,
      customers: customersCount,
      blogs: blogsCount,
      revenue: appointmentsCount * 150,
    });

    // Recent appointments bhi handle karo
    let appointmentsList = [];
    if (Array.isArray(appointmentsRes.data)) {
      appointmentsList = appointmentsRes.data;
    } else if (appointmentsRes.data.appointments) {
      appointmentsList = appointmentsRes.data.appointments;
    }
    setRecentAppointments(appointmentsList.slice(0, 5));
    
  } catch (error) {
    console.error("Dashboard fetch failed:", error);
  } finally {
    setLoading(false);
  }
  };


  // Initial load
  useEffect(() => {
    fetchDashboardData();
  }, []);


  const statCards = [
    {
      title: "Appointments",
      value: stats.appointments,
      icon: <CalendarCheck size={30} />,
    },
    {
      title: "Customers",
      value: stats.customers,
      icon: <Users size={30} />,
    },
    {
      title: "Blogs",
      value: stats.blogs,
      icon: <FileText size={30} />,
    },
    {
      title: "Estimated Revenue",
      value: `₹${stats.revenue}`,
      icon: <DollarSign size={30} />,
    },
  ];

  return (
    <div className="flex bg-black min-h-screen text-white">
      <button 
      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg" onClick={() => fetchDashboardData()}>
        Refresh
      </button>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-6 md:p-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">
            Admin <span className="text-red-500">Dashboard</span>
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Manage appointments, customers, blogs, and studio growth.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg hover:border-red-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="bg-red-600 p-4 rounded-2xl">{card.icon}</div>

                <TrendingUp className="text-green-500" size={22} />
              </div>

              <h3 className="text-gray-400 uppercase tracking-wide text-sm">
                {card.title}
              </h3>

              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Appointments */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg">
          <h2 className="text-3xl font-bold uppercase mb-8">
            Recent Appointments
          </h2>

          {loading ? (
            <div className="text-gray-400 text-center py-10">
              Loading dashboard data...
            </div>
          ) : recentAppointments.length === 0 ? (
            <div className="text-gray-400 text-center py-10">
              No recent appointments found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="pb-4">Client</th>
                    <th className="pb-4">Tattoo Style</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Contact</th>
                  </tr>
                </thead>

                <tbody>
                  {recentAppointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-4">
                        <div>
                          <h4 className="font-semibold">{appointment.name}</h4>
                          <p className="text-sm text-gray-400">
                            {appointment.email}
                          </p>
                        </div>
                      </td>

                      <td className="py-4 text-gray-300">
                        {appointment.tattooStyle}
                      </td>

                      <td className="py-4 text-gray-300">
                        {appointment.appointmentDate}
                      </td>

                      <td className="py-4 text-gray-300">
                        {appointment.phone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Studio Performance */}
        <div className="mt-14 bg-gradient-to-r from-red-600/20 to-black border border-red-500/20 rounded-3xl p-8">
          <h2 className="text-3xl font-bold uppercase mb-4">
            Studio Growth Overview
          </h2>

          <p className="text-gray-300 max-w-3xl leading-relaxed">
            Your tattoo studio is actively growing through customer bookings,
            blog engagement, and recurring clientele. Focus on improving
            customer retention, artist portfolio updates, and marketing for
            continued expansion.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
