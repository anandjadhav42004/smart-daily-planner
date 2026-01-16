import { motion } from "framer-motion";
import { CheckCircle, Trash2 } from "lucide-react";
import { useState } from "react";

export default function TaskCard({ task, onToggleDone, onTaskDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleDone = () => onToggleDone(task._id);

  const handleDelete = () => {
    setIsDeleting(true);
    onTaskDeleted(task._id);
  };

  const today = new Date();
  const due = new Date(task.dueDate);

  const diffDays = Math.ceil(
    (due - today) / (1000 * 60 * 60 * 24)
  );

  const done = task.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ duration: 0.4 }}
      className={`p-6 rounded-3xl backdrop-blur-xl border relative
        bg-gradient-to-br from-indigo-800/40 to-pink-700/30
        border-white/20 shadow-glow text-white
        ${done ? "ring-2 ring-green-400 shadow-green-400/40" : ""}
        ${!done && diffDays < 0 ? "ring-2 ring-red-500 shadow-red-500/60 animate-pulse" : ""}
      `}
    >
      <h3 className={`text-lg font-bold ${done ? "line-through opacity-60" : ""}`}>
        {task.title}
      </h3>

      <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-white/10">
        {(task.priority || "low").toUpperCase()} PRIORITY
      </span>

      <button
        onClick={toggleDone}
        className={`absolute bottom-3 right-3 ${
          done ? "text-green-400" : "text-white/60"
        } hover:text-green-300`}
      >
        <CheckCircle size={22} />
      </button>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-3 right-3 text-red-400 hover:text-red-300"
      >
        <Trash2 size={20} />
      </button>
    </motion.div>
  );
}
