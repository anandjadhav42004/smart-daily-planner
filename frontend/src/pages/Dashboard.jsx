import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

const BASE_URL = "http://localhost:5001";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "medium",
    dueDate: "",
  });

  /* ---------------- FETCH TASKS ---------------- */
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ---------------- ADD TASK ---------------- */
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.dueDate) {
      alert("Title & due date required!");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/tasks`, {
        ...newTask,
        completed: false,
      });
      setTasks((prev) => [...prev, res.data]);
      setNewTask({ title: "", priority: "medium", dueDate: "" });
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  /* ---------------- TOGGLE TASK ---------------- */
  const toggleTaskDone = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      if (!task) return;

      await axios.put(`${BASE_URL}/api/tasks/${id}`, {
        completed: !task.completed,
      });

      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  /* ---------------- DELETE TASK ---------------- */
  const handleTaskDeleted = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  /* ---------------- PROGRESS ---------------- */
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  if (loading) {
    return (
      <p className="text-white/50 text-center mt-10">
        Loading tasks...
      </p>
    );
  }

  return (
    <div className="p-10 space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Today’s Tasks
        </h2>
        <p className="text-white/60 mt-1">
          {completedCount} / {tasks.length} completed
        </p>
        <div className="mt-4 w-full h-3 bg-white/10 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ADD BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Task
        </button>
      </div>

      {/* ADD TASK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleAddTask}
            className="bg-gray-800 p-6 rounded-lg w-96 space-y-4"
          >
            <h3 className="text-white text-lg font-bold">Add New Task</h3>

            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            {/* Due Date */}
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            {/* Priority */}
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TASK LIST */}
      <AnimatePresence>
        {tasks.length === 0 ? (
          <p className="text-white/50 text-center">No tasks yet!</p>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {tasks.map((task) => (
              <motion.div key={task._id} layout>
                <TaskCard
                  task={task}
                  onToggleDone={toggleTaskDone}
                  onTaskDeleted={handleTaskDeleted}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
