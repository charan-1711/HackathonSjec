import { useState, useEffect } from "react";
import axios from "axios";
import {
  FiMenu,
  FiFileText,
  FiFilePlus,
  FiBookOpen,
  FiCalendar,
  FiDownload,
} from "react-icons/fi";
import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const { dashboardMetrics } = useOutletContext();
  const currentYear = new Date().getFullYear();
  const [questionPapers, setQuestionPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Generated Question Papers with Authorization Token
  useEffect(() => {
    const fetchGeneratedPapers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.get(
          "http://localhost:3000/api/qpaper/generateQp",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQuestionPapers(response.data);
        console.log({ fetch: response.data });
      } catch (error) {
        console.error("Error fetching question papers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGeneratedPapers();
  }, []);

  const handleDownload = async (subjectId, totalMarks) => {
    try {
      const token = localStorage.getItem("token"); // Get the authentication token

      const response = await axios.post(
        "http://localhost:3000/api/qpaper/getDownloadPdf",
        { subjectId, maxMarks: totalMarks }, // Send data in body
        {
          headers: { Authorization: `Bearer ${token}` }, // Send token in headers
          responseType: "blob", // Ensure the response is treated as a file
        }
      );

      // Create a URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `QuestionPaper_${subjectId}_${totalMarks}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download question paper.");
    }
  };

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
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow flex items-center gap-3">
          <FiBookOpen size={28} className="text-blue-500" />
          <div>
            <h3 className="text-sm sm:text-md text-gray-600">Total Subjects</h3>
            <p className="text-lg sm:text-xl font-bold text-blue-600">
              {dashboardMetrics.totalSubjects}
            </p>
          </div>
        </div>

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
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow mb-6">
        <h3 className="text-md sm:text-lg font-semibold text-gray-900 mb-3">
          Steps to Generate a Question Paper
        </h3>
        <ul className="space-y-2 text-gray-600 text-sm sm:text-md">
          <li>📚 Create a Subject in the system.</li>
          <li>✏️ Add Questions to the Subject (both 2-mark and 10-mark).</li>
          <li>
            📝 Generate a Question Paper by selecting a Subject and Marks.
          </li>
          <li>📄 Download the generated Question Paper in PDF format.</li>
        </ul>
      </div>

      {/* Generated Question Papers Section */}
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Generated Question Papers
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading question papers...</p>
        ) : questionPapers.length === 0 ? (
          <p className="text-gray-500">No question papers generated yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Subject</th>
                <th className="border border-gray-300 px-4 py-2">Marks</th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Questions
                </th>
                <th className="border border-gray-300 px-4 py-2">Download</th>
              </tr>
            </thead>
            <tbody>
              {questionPapers.map((paper) => (
                <tr
                  key={paper.id}
                  className="text-center border border-gray-300"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {paper.subject_name} ({paper.subject_code})
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {paper.total_marks}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {paper.number_of_questions}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() =>
                        handleDownload(paper.subject_id, paper.total_marks)
                      }
                      className="text-blue-500 flex items-center justify-center bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      <FiDownload className="mr-2" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
