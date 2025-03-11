import { useState, useEffect } from "react";
import axios from "axios";

export default function GeneratePaper() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [paperType, setPaperType] = useState("");
  const [isGenerateEnabled, setIsGenerateEnabled] = useState(false);
  const [count, setCount] = useState({ twoMarks: 0, tenMarks: 0 });

  // Fetch Subjects
  useEffect(() => {
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
    fetchSubjects();
  }, []);

  // Fetch Questions for Selected Subject
  useEffect(() => {
    if (!selectedSubject) return;
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/qpaper/question",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const filteredQuestions = response.data.questionSets.filter(
          (q) => q.subject_id._id === selectedSubject
        );
        setQuestions(filteredQuestions || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [selectedSubject]);

  // Count Question Types
  useEffect(() => {
    let twoMarks = 0,
      tenMarks = 0;
    questions.forEach((set) => {
      set.question_data.forEach((q) => {
        if (q.question_mark === "2-marks") twoMarks++;
        if (q.question_mark === "10-marks") tenMarks++;
      });
    });
    setCount({ twoMarks, tenMarks });
  }, [questions]);

  // Validate Question Paper
  useEffect(() => {
    if (
      (paperType === "50-marks" &&
        count.twoMarks >= 5 &&
        count.tenMarks >= 4) ||
      (paperType === "100-marks" && count.twoMarks >= 10 && count.tenMarks >= 8)
    ) {
      setIsGenerateEnabled(true);
    } else {
      setIsGenerateEnabled(false);
    }
  }, [paperType, count]);

  // Handle Generate Question Paper
  const handleGeneratePaper = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/qpaper/generateQp",
        {
          subjectId: selectedSubject,
          maxMarks: paperType === "100-marks" ? 100 : 50,
          course: "Third Semester MCA (Autonomous) Examinations November-2022",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // To handle file download
        }
      );

      // Create a link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "QuestionPaper.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating question paper:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Generate Question Paper</h1>

      {/* Subject Selection */}
      <select
        className="p-2 border rounded mb-4"
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        <option value="">Select Subject</option>
        {subjects.map((sub) => (
          <option key={sub._id} value={sub._id}>
            {sub.name}
          </option>
        ))}
      </select>

      {/* Paper Type Selection */}
      <select
        className="p-2 border rounded mb-4 ml-4"
        value={paperType}
        onChange={(e) => setPaperType(e.target.value)}
      >
        <option value="">Select Paper Type</option>
        <option value="50-marks">50 Marks</option>
        <option value="100-marks">100 Marks</option>
      </select>

      {/* Question Count */}
      <div className="mb-4">
        <p className="text-lg">2 Marks Questions: {count.twoMarks}</p>
        <p className="text-lg">10 Marks Questions: {count.tenMarks}</p>
      </div>

      {/* Generate Paper Button */}
      <button
        onClick={handleGeneratePaper}
        className={`ml-4 px-4 py-2 rounded-lg text-white ${
          isGenerateEnabled
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isGenerateEnabled}
      >
        Generate Question Paper
      </button>

      {/* Questions List */}
      <div className="bg-white p-4 shadow rounded mt-6">
        <h2 className="text-lg font-semibold mb-3">
          Questions for{" "}
          {selectedSubject &&
            subjects.find((sub) => sub._id === selectedSubject)?.name}
        </h2>
        {questions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No questions found.</p>
        ) : (
          <ul className="space-y-4">
            {questions.map((set, setIndex) =>
              set.question_data.map((q, qIndex) => (
                <li
                  key={`${setIndex}-${qIndex}`}
                  className="p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <p className="font-medium text-gray-800">
                        <strong>Module {q.moduleNo}:</strong> {q.question_text}
                      </p>
                    </div>
                    <div className="col-span-1 flex flex-wrap gap-4 justify-end text-sm text-gray-700">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md">
                        Marks: {q.question_mark}
                      </span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md">
                        BL: {q.BL}
                      </span>
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md">
                        TLO: {q.TLO}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md">
                        CO: {q.CO}
                      </span>
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md">
                        PO: {q.PO}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
