import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";

import { Routes, Route, useLocation } from "react-router-dom";

// Public Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Booking from "./pages/Booking.jsx";
import Blog from "./pages/Blog.jsx";
import BlogDetails from "./pages/BlogDetails";
import PortfolioManager from "./admin/PortfolioManager";


// Admin Routes
import AdminRoutes from "./routes/AdminRoutes.jsx";

function App() {
  const location = useLocation();

  // Hide Navbar/Footer on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Show Navbar only on public pages */}
      {!isAdminRoute && <Navbar />}
      <ScrollToTop />

      {/* Main Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/admin/portfolio" element={<PortfolioManager />} />


        {/* Admin Panel */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>

      {/* Show Footer only on public pages */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;