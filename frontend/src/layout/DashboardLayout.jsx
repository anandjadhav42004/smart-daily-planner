import { useState } from "react";
import AddTaskButton from "../components/AddTaskButton";
import AddTaskModal from "../components/AddTaskModal";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Dashboard from "../pages/Dashboard";

export default function DashboardLayout() {
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(0); // trigger dashboard refresh

  const handleTaskAdded = () => setRefresh((prev) => prev + 1);

  return (
    <div className="flex bg-gradient-to-br from-slate-900 via-gray-900 to-black min-h-screen">
      <Sidebar />

      <div className="flex-1 relative">
        <Topbar />
        <Dashboard key={refresh} />
        <AddTaskButton onClick={() => setShowModal(true)} />
        {showModal && (
          <AddTaskModal
            onClose={() => setShowModal(false)}
            onTaskAdded={handleTaskAdded}
          />
        )}
      </div>
    </div>
  );
}
