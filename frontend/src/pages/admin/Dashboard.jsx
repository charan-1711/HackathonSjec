import { FiMenu } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const { setSidebarOpen } = useOutletContext(); // ✅ Get setSidebarOpen from context

  return (
    <div>
      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setSidebarOpen((prev) => !prev)} className="md:hidden text-gray-700">
          <FiMenu size={24} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-lg text-gray-600">Total Subjects</h3>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-lg text-gray-600">Total Questions</h3>
          <p className="text-2xl font-bold text-green-600">250</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-lg text-gray-600">Generated Papers</h3>
          <p className="text-2xl font-bold text-purple-600">32</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-lg text-gray-600">Total Reports</h3>
          <p className="text-2xl font-bold text-red-600">15</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
        <ul className="space-y-3 text-gray-600">
          <li>✅ New question added to "Module 1 - IoT Basics"</li>
          <li>📄 Question paper generated for "Mid-Term Exam"</li>
          <li>📝 Teacher uploaded 50 questions via bulk import</li>
        </ul>
      </div>
    </div>
  );
}
