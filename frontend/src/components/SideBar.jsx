import { Link } from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiBarChart2,
  FiMenu,
} from "react-icons/fi";

export default function SideBar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Sidebar Toggle Button (for small screens) */}
      <button
        className="absolute top-4 left-4 md:hidden bg-gray-200 p-2 rounded-full"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FiMenu size={24} className="text-gray-700" />
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg w-64 p-5 fixed h-full transition-transform z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-5">QPGS Admin</h2>

        {/* Close Sidebar Button (for mobile) */}
        <button
          className="md:hidden text-gray-600 mb-4"
          onClick={() => setSidebarOpen(false)}
        >
          ✖ Close
        </button>

        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/admin"
                className="flex items-center space-x-3 text-gray-700 hover:bg-blue-200 p-2 rounded-lg cursor-pointer"
                onClick={() => setSidebarOpen(false)}
              >
                <FiHome />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage-subjects"
                className="flex items-center space-x-3 text-gray-700 hover:bg-blue-200 p-2 rounded-lg cursor-pointer"
                onClick={() => setSidebarOpen(false)}
              >
                <FiFileText />
                <span>Subjects</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage-questions"
                className="flex items-center space-x-3 text-gray-700 hover:bg-blue-200 p-2 rounded-lg cursor-pointer"
                onClick={() => setSidebarOpen(false)}
              >
                <FiFileText />
                <span>Questions</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center space-x-3 text-gray-700 hover:bg-blue-200 p-2 rounded-lg cursor-pointer"
                onClick={() => setSidebarOpen(false)}
              >
                <FiUsers />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reports"
                className="flex items-center space-x-3 text-gray-700 hover:bg-blue-200 p-2 rounded-lg cursor-pointer"
                onClick={() => setSidebarOpen(false)}
              >
                <FiBarChart2 />
                <span>Reports</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
