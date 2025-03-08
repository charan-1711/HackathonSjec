import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Navbar (Positioned at the top) */}
        <NavBar />

        {/* Page Content */}
        <div className="p-6">
          <Outlet context={{ setSidebarOpen }} />
        </div>
      </div>
    </div>
  );
}
