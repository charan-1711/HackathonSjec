import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagePatterns from "./pages/admin/ManagePatterns";
import ManageQuestions from "./pages/admin/manageQuestions";
import Notfound from "./pages/NotFound";
import Login from "./pages/Login";
import Reports from "./pages/admin/Reports";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import GeneratePaper from "./pages/admin/GeneratePaper";
import Users from "./pages/admin/Users";

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
            <Route path="users" element={<Users />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacher" element={<Reports />}>
            <Route index element={<Dashboard />} />
            <Route path="manage-questions" element={<ManageQuestions />} />
            <Route path="generate-paper" element={<GeneratePaper />} />
          </Route>

          {/* 404 - Not Found */}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
