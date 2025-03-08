import { useState } from "react";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([
    { id: 1, subject: "Math", module: "Algebra", text: "What is 2+2?", correct: "4" },
    { id: 2, subject: "Physics", module: "Kinematics", text: "What is velocity?", correct: "Speed with direction" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    subject: "",
    module: "",
    text: "",
    correct: "",
  });

  const [filters, setFilters] = useState({ subject: "", module: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.subject || !newQuestion.module || !newQuestion.text || !newQuestion.correct) {
      alert("Please fill all fields");
      return;
    }
    setQuestions([...questions, { id: questions.length + 1, ...newQuestion }]);
    setNewQuestion({ subject: "", module: "", text: "", correct: "" });
    setShowForm(false);
  };

  const filteredQuestions = questions.filter(
    (q) =>
      (filters.subject === "" || q.subject === filters.subject) &&
      (filters.module === "" || q.module === filters.module)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Questions</h1>
      
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select className="p-2 border rounded" onChange={(e) => setFilters({ ...filters, subject: e.target.value })}>
          <option value="">All Subjects</option>
          <option value="Math">Math</option>
          <option value="Physics">Physics</option>
        </select>
        <select className="p-2 border rounded" onChange={(e) => setFilters({ ...filters, module: e.target.value })}>
          <option value="">All Modules</option>
          <option value="Algebra">Algebra</option>
          <option value="Kinematics">Kinematics</option>
        </select>
        {/* Add Question Button */}
      <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
        Add Question
      </button>
      </div>
      
      {/* Questions List */}
      <div className="bg-white p-4 shadow rounded">
        {filteredQuestions.length === 0 ? (
          <p className="text-gray-500">No questions found.</p>
        ) : (
          <ul className="space-y-3">
            {filteredQuestions.map((q) => (
              <li key={q.id} className="p-3 bg-gray-100 rounded">
                <strong>{q.subject} - {q.module}:</strong> {q.text}
                <span className="text-green-600 block">Correct Answer: {q.correct}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
     
      
      {/* Add Question Form */}
      {showForm && (
        <div className="mt-4 bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-3">Add New Question</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" placeholder="Subject" value={newQuestion.subject} onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })} className="w-full p-2 border rounded" />
            <input type="text" placeholder="Module" value={newQuestion.module} onChange={(e) => setNewQuestion({ ...newQuestion, module: e.target.value })} className="w-full p-2 border rounded" />
            <textarea placeholder="Question Text" value={newQuestion.text} onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })} className="w-full p-2 border rounded"></textarea>
            <input type="text" placeholder="Correct Answer" value={newQuestion.correct} onChange={(e) => setNewQuestion({ ...newQuestion, correct: e.target.value })} className="w-full p-2 border rounded" />
            <button type="submit" className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
