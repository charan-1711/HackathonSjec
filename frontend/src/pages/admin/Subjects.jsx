import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { FiPlus, FiChevronDown, FiChevronUp } from "react-icons/fi";
import axios from "axios";

export default function Subjects() {
  const { subjectsData } = useOutletContext();
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    code: "",
    name: "",
    year: "",
    modules: "",
  });
  const [loading, setLoading] = useState(false);

  const toggleSubject = (id) => {
    setExpandedSubjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSubject = async () => {
    if (!newSubject.code || !newSubject.name || !newSubject.year) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const modulesArray = newSubject.modules
        .split(";")
        .map((title) => ({ title: title.trim() }));

      const response = await axios.post(
        "http://localhost:3000/api/qpaper/subject",
        {
          code: newSubject.code,
          name: newSubject.name,
          year: newSubject.year,
          modules: modulesArray,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Subject added successfully!");
        setIsModalOpen(false);
        setNewSubject({ code: "", name: "", year: "", modules: "" });

        // try {
        //   await fetchSubjects();
        // } catch (fetchError) {
        //   console.error("Error fetching subjects:", fetchError);
        //   alert("Subject added, but failed to refresh subjects list.");
        // }
      }
    } catch (error) {
      console.error(
        "Error adding subject:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to add subject");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Subjects</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          <FiPlus size={20} /> Add Subject
        </button>
      </div>

      {/* Subject List */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        {subjectsData.length === 0 ? (
          <p className="text-center p-3">No subjects found.</p>
        ) : (
          subjectsData.map((subject) => (
            <div key={subject._id} className="border-b p-3">
              {/* Subject Header (Name + Code) */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSubject(subject._id)}
              >
                <h3 className="text-lg font-semibold">
                  {subject.name} ({subject.code})
                </h3>
                {expandedSubjects[subject._id] ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </div>

              {/* Subject Modules */}
              {expandedSubjects[subject._id] && (
                <ul className="mt-2 pl-5 list-disc">
                  {subject.modules.map((module) => (
                    <li key={module._id}>{module.title}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Subject Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New Subject</h2>
            <input
              type="text"
              placeholder="Code"
              className="w-full p-2 border rounded mb-3"
              value={newSubject.code}
              onChange={(e) =>
                setNewSubject({ ...newSubject, code: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded mb-3"
              value={newSubject.name}
              onChange={(e) =>
                setNewSubject({ ...newSubject, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Year"
              className="w-full p-2 border rounded mb-3"
              value={newSubject.year}
              onChange={(e) =>
                setNewSubject({ ...newSubject, year: e.target.value })
              }
            />
            <textarea
              placeholder="Modules (separate with ; )"
              className="w-full p-2 border rounded mb-3"
              value={newSubject.modules}
              onChange={(e) =>
                setNewSubject({ ...newSubject, modules: e.target.value })
              }
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubject}
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${
                  loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
