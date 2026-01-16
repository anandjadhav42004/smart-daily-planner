import { motion } from "framer-motion";
import { useState } from "react";
import { addTask } from "../services/api";

export default function AddTaskModal({ onClose, onTaskAdded }) {
  const [task, setTask] = useState("");

  const handleAdd = async () => {
    if (!task) return;
    const newTask = await addTask(task);
    onTaskAdded(newTask);
    setTask("");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-96 flex flex-col gap-4"
      >
        <h2 className="text-white text-xl font-bold">Add New Task</h2>
        <input
          type="text"
          placeholder="Task title..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="p-3 rounded-xl bg-white/5 text-white placeholder-white/60 border border-white/20 outline-none"
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-400 text-white"
          >
            Add
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
