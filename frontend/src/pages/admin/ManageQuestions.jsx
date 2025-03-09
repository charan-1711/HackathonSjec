import { useState, useEffect } from "react";
import axios from "axios";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    subject_id: "",
    year: new Date().getFullYear(),
    question_data: [
      {
        question_text: "",
        question_mark: "",
        moduleNo: "",
        BL: "",
        TLO: "",
        CO: "",
        PO: "",
      },
    ],
  });

  // Fetch Subjects
  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/qpaper/subject",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubjects(response.data.subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Fetch Questions
  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/qpaper/question",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions(response.data.questions || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchQuestions();
  }, []);

  // Filter Questions by Subject
  const filteredQuestions = selectedSubject
    ? questions.filter((q) => q.subject_id === selectedSubject)
    : questions;

  // Handle Input Change
  const handleInputChange = (field, value) => {
    setNewQuestion((prev) => ({
      ...prev,
      question_data: [{ ...prev.question_data[0], [field]: value }],
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      newQuestion.subject_id === "" ||
      newQuestion.question_data[0].question_text === "" ||
      newQuestion.question_data[0].question_mark === "" ||
      newQuestion.question_data[0].moduleNo === "" ||
      newQuestion.question_data[0].BL === "" ||
      newQuestion.question_data[0].TLO === "" ||
      newQuestion.question_data[0].CO === "" ||
      newQuestion.question_data[0].PO === ""
    ) {
      alert("Please fill all fields before submitting.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/qpaper/question",
        newQuestion,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Question added successfully!");
      setShowForm(false);
      setNewQuestion({
        subject_id: "",
        year: new Date().getFullYear(),
        question_data: [
          {
            question_text: "",
            question_mark: "",
            moduleNo: "",
            BL: "",
            TLO: "",
            CO: "",
            PO: "",
          },
        ],
      });
      fetchQuestions();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Questions</h1>

      {/* Subject Filter Dropdown */}
      <div className="flex gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          {subjects.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* Toggle Form Button */}
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {showForm ? "Close" : "Add Question"}
        </button>
      </div>

      {/* Add Question Form */}
      {showForm && (
        <div className="mt-4 bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-3">Add New Question</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Subject Selection */}
            <select
              className="w-full p-2 border rounded"
              value={newQuestion.subject_id}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, subject_id: e.target.value })
              }
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>

            {/* Question Text */}
            <textarea
              placeholder="Question Text"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                handleInputChange("question_text", e.target.value)
              }
            ></textarea>

            {/* Marks Dropdown */}
            <select
              className="w-full p-2 border rounded"
              onChange={(e) =>
                handleInputChange("question_mark", e.target.value)
              }
            >
              <option value="">Select Marks</option>
              <option value="2-marks">2 Marks</option>
              <option value="10-marks">10 Marks</option>
            </select>

            {/* Module Dropdown */}
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => handleInputChange("moduleNo", e.target.value)}
            >
              <option value="">Select Module</option>
              <option value="1">Module 1</option>
              <option value="2">Module 2</option>
              <option value="3">Module 3</option>
              <option value="4">Module 4</option>
              <option value="5">Module 5</option>
            </select>

            {/* BL, TLO, CO, PO Fields */}
            <input
              type="text"
              placeholder="BL (e.g., L2)"
              className="w-full p-2 border rounded"
              onChange={(e) => handleInputChange("BL", e.target.value)}
            />

            <input
              type="text"
              placeholder="TLO (e.g., 4.2)"
              className="w-full p-2 border rounded"
              onChange={(e) => handleInputChange("TLO", e.target.value)}
            />

            <input
              type="text"
              placeholder="CO (e.g., CO1)"
              className="w-full p-2 border rounded"
              onChange={(e) => handleInputChange("CO", e.target.value)}
            />

            <input
              type="text"
              placeholder="PO (e.g., PO2)"
              className="w-full p-2 border rounded"
              onChange={(e) => handleInputChange("PO", e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-700 text-white p-3 rounded hover:bg-blue-600"
            >
              Add Question
            </button>
          </form>
        </div>
      )}

      {/* Questions List */}
      <div className="bg-white p-4 shadow rounded">
        {filteredQuestions.length === 0 ? (
          <p className="text-gray-500">No questions found.</p>
        ) : (
          <ul className="space-y-3">
            {filteredQuestions.map((q, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded">
                <strong>Module {q.moduleNo}:</strong> {q.question_text}{" "}
                <span className="text-blue-600">({q.question_mark})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
