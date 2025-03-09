import {
  FiMenu,
  FiFileText,
  FiFilePlus,
  FiBookOpen,
  FiCalendar,
} from "react-icons/fi";
import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const { dashboardMetrics } = useOutletContext(); // ✅ Get sidebar & metrics from context
  const currentYear = new Date().getFullYear(); // ✅ Get the current year

  if (!dashboardMetrics) {
    return <p className="text-center text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Admin Dashboard - {currentYear}
        </h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Total Subjects */}
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow flex items-center gap-3">
          <FiBookOpen size={28} className="text-blue-500" />
          <div>
            <h3 className="text-sm sm:text-md text-gray-600">Total Subjects</h3>
            <p className="text-lg sm:text-xl font-bold text-blue-600">
              {dashboardMetrics.totalSubjects}
            </p>
          </div>
        </div>

        {/* Total Questions (Separate 2-marks & 10-marks) */}
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow flex flex-col">
          <h3 className="text-sm sm:text-md text-gray-600 flex items-center gap-2">
            <FiFileText size={22} className="text-green-500" />
            Total Questions
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            2-marks:{" "}
            <span className="font-bold text-green-600">
              {dashboardMetrics.totalQuestions["2-marks"]}
            </span>
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            10-marks:{" "}
            <span className="font-bold text-green-600">
              {dashboardMetrics.totalQuestions["10-marks"]}
            </span>
          </p>
        </div>

        {/* Total Generated Papers */}
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow flex items-center gap-3">
          <FiFilePlus size={28} className="text-purple-500" />
          <div>
            <h3 className="text-sm sm:text-md text-gray-600">
              Generated Papers
            </h3>
            <p className="text-lg sm:text-xl font-bold text-purple-600">
              {dashboardMetrics.totalGeneratedPapers}
            </p>
          </div>
        </div>

        {/* Current Year Indicator */}
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow flex items-center gap-3">
          <FiCalendar size={28} className="text-red-500" />
          <div>
            <h3 className="text-sm sm:text-md text-gray-600">Academic Year</h3>
            <p className="text-lg sm:text-xl font-bold text-red-600">
              {currentYear}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow">
        <h3 className="text-md sm:text-lg font-semibold text-gray-900 mb-3">
          Recent Activities
        </h3>
        <ul className="space-y-2 text-gray-600 text-sm sm:text-md">
          <li>✅ New question added to "Module 1 - IoT Basics"</li>
          <li>📄 Question paper generated for "Mid-Term Exam"</li>
          <li>📝 Teacher uploaded 50 questions via bulk import</li>
        </ul>
      </div>
    </div>
  );
}
