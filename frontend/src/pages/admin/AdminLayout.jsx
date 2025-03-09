import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]); // ✅ State for storing all subjects

  const navigate = useNavigate();

  // ✅ Fetch user details
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/user/getUserDetails",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("API response:", response.data);

      setUserData(response.data.user);
      setDashboardMetrics(response.data.dashboardMetrics);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data || "Unknown error"
      );
      navigate("/");
    }
  };

  // ✅ Fetch all users
  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/");
        return;
      }

      const response = await axios.get("http://localhost:3000/api/user/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched Users:", response.data.users);
      setUsersData(response.data.users);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || "Unknown error"
      );
    }
  };

  // ✅ Fetch all subjects
  const fetchAllSubjects = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/qpaper/subject",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Fetched Subjects:", response.data.subjects);
      setSubjectsData(response.data.subjects);
    } catch (error) {
      console.error(
        "Error fetching subjects:",
        error.response?.data || "Unknown error"
      );
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchAllUsers();
    fetchAllSubjects();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Navbar */}
        <NavBar userData={userData} />

        {/* Page Content */}
        <div className="p-0">
          <Outlet
            context={{
              setSidebarOpen,
              dashboardMetrics,
              usersData,
              subjectsData,
              fetchUserDetails,
              fetchAllSubjects,
            }}
          />
        </div>
      </div>
    </div>
  );
}
