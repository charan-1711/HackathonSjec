import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dashboardMetrics, setDashboardMetrics] = useState(null);

  // ✅ Fetch user details and dashboard data
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // 🔹 Get token from localStorage

      if (!token) {
        console.error("No token found. Redirect to login.");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/user/getUserDetails",
        {
          headers: { Authorization: `Bearer ${token}` }, // 🔹 Pass token in Authorization header
        }
      );

      setUserData(response.data.user);
      setDashboardMetrics(response.data.dashboardMetrics);

      console.log(userData);
      console.log(dashboardMetrics);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data || "Unknown error"
      );
    }
  };

  // 🔹 Fetch data when component loads
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Navbar */}
        <NavBar />

        {/* Page Content */}
        <div className="p-6">
          <Outlet context={{ setSidebarOpen }} />
        </div>
      </div>
    </div>
  );
}
