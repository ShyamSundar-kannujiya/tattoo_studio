import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  Save,
  User,
  Mail,
  Lock,
  Image,
  Palette,
  Globe,
} from "lucide-react";
import api from "../api/axios";

const Settings = () => {
  const [formData, setFormData] = useState({
    studioName: "",
    adminEmail: "",
    password: "",
    logo: "",
    themeColor: "#dc2626",
    websiteDescription: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch current settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        setFormData({
          studioName: res.data.studioName || "",
          adminEmail: res.data.adminEmail || "",
          password: "",
          logo: res.data.logo || "",
          themeColor: res.data.themeColor || "#dc2626",
          websiteDescription: res.data.websiteDescription || "",
        });
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Save settings
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      await api.put("/settings", formData);

      setMessage("Settings updated successfully!");
    } catch (error) {
      setMessage("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <main className="flex-1 lg:ml-72 p-6 md:p-10">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold uppercase tracking-widest">
            Studio <span className="text-red-500">Settings</span>
          </h1>

          <p className="text-gray-400 mt-2">
            Customize your tattoo studio branding and admin preferences.
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 bg-red-600/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl">
            {message}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center text-gray-400 py-20">
            Loading settings...
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg max-w-5xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Studio Name */}
              <div>
                <label className="block mb-3 font-semibold uppercase text-sm tracking-wide">
                  Studio Name
                </label>

                <div className="relative">
                  <User
                    className="absolute top-4 left-4 text-red-500"
                    size={20}
                  />

                  <input
                    type="text"
                    name="studioName"
                    value={formData.studioName}
                    onChange={handleChange}
                    placeholder="Studio Name"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Admin Email */}
              <div>
                <label className="block mb-3 font-semibold uppercase text-sm tracking-wide">
                  Admin Email
                </label>

                <div className="relative">
                  <Mail
                    className="absolute top-4 left-4 text-red-500"
                    size={20}
                  />

                  <input
                    type="email"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleChange}
                    placeholder="Admin Email"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-3 font-semibold uppercase text-sm tracking-wide">
                  New Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute top-4 left-4 text-red-500"
                    size={20}
                  />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Logo */}
              <div>
                <label className="block mb-3 font-semibold uppercase text-sm tracking-wide">
                  Studio Logo URL
                </label>

                <div className="relative">
                  <Image
                    className="absolute top-4 left-4 text-red-500"
                    size={20}
                  />

                  <input
                    type="text"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    placeholder="Logo URL"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Theme Color */}
              <div>
                <label className="block mb-3 font-semibold uppercase text-sm tracking-wide">
                  Theme Color
                </label>

                <div className="flex items-center gap-4">
                  <Palette className="text-red-500" size={22} />

                  <input
                    type="color"
                    name="themeColor"
                    value={formData.themeColor}
                    onChange={handleChange}
                    className="w-20 h-12 border-none rounded-lg cursor-pointer bg-transparent"
                  />

                  <span className="text-gray-400">
                    {formData.themeColor}
                  </span>
                </div>
              </div>

              {/* Website Description */}
              <div>
                <label className="block mb-3 font-semibold uppercase text-sm tracking-wide">
                  Website Description
                </label>

                <div className="relative">
                  <Globe
                    className="absolute top-4 left-4 text-red-500"
                    size={20}
                  />

                  <textarea
                    name="websiteDescription"
                    rows="5"
                    value={formData.websiteDescription}
                    onChange={handleChange}
                    placeholder="Website description..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500"
                  ></textarea>
                </div>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 shadow-lg disabled:opacity-50"
              >
                <Save size={20} />
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Settings;