import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"; // if you have auth
import TasksPage from "./pages/TasksPage"; // if you have another page

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login
  };

  return (
    <Router>
      {/* Navigation */}
      <nav className="flex gap-4 p-4 bg-gray-100">
        <Link to="/dashboard" className="text-blue-500">Dashboard</Link>
        <Link to="/tasks" className="text-blue-500">Tasks</Link>
        <button onClick={handleLogout} className="text-red-500">Logout</button>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} /> {/* Redirect unknown routes to login */}
      </Routes>
    </Router>
  );
}

export default App;
