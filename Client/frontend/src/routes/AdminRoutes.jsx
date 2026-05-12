  import React from "react";
  import { Routes, Route, Navigate } from "react-router-dom";

  // Admin Pages
  import Login from "../admin/Login";
  import Dashboard from "../admin/Dashboard";
  import Appointments from "../admin/Appointments";
  import BlogEditor from "../admin/BlogEditor";
  import Customers from "../admin/Customers";
  import Settings from "../admin/Settings";

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken) {
      return <Navigate to="/admin/login" replace />;
    }

    return children;
  };

  const AdminRoutes = () => {
    return (
      <Routes>
        {/* Public Admin Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blog-editor"
          element={
            <ProtectedRoute>
              <BlogEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    );
  };

  export default AdminRoutes;
