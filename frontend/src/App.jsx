import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Authentication */}
          <Route path="/" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="manage-questions" element={<ManageQuestions />} />
            <Route path="manage-patterns" element={<ManagePatterns />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="manage-questions" element={<ManageQuestions />} />
            <Route path="generate-paper" element={<GeneratePaper />} />
          </Route>

          {/* 404 - Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
