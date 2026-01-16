import { motion } from "framer-motion";
import { CheckCircle2, Trash2, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import GlassCard from "./GlassCard";
import toast from "react-hot-toast";

export default function TaskCard({ task, onToggleDone, onTaskDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleDone = () => onToggleDone(task._id);

  const handleDelete = () => {
    setIsDeleting(true);
    onTaskDeleted(task._id);
    toast.success("Task deleted");
  };

  const today = new Date();
  const due = new Date(task.dueDate);

  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const done = task.completed;

  const priorityColors = {
    low: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    high: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  };

  return (
    <GlassCard
      className={`relative group transition-all duration-300 ${done ? 'opacity-60 saturate-50' : ''}`}
      hoverEffect={!done}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority] || priorityColors.medium}`}>
          {task.priority?.toUpperCase() || "MEDIUM"}
        </span>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDone}
            className={`p-2 rounded-lg ${done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white hover:bg-emerald-500/20 hover:text-emerald-400'}`}
          >
            <CheckCircle2 size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400 transition-colors"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </div>

      <h3 className={`text-xl font-semibold mb-3 ${done ? "line-through text-white/50" : "text-white"}`}>
        {task.title}
      </h3>

      <div className="flex items-center gap-4 text-sm text-white/40">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          <span>{due.toLocaleDateString()}</span>
        </div>

        {!done && diffDays < 0 && (
          <div className="flex items-center gap-1.5 text-rose-400">
            <Clock size={14} />
            <span>Overdue</span>
          </div>
        )}
      </div>

      {/* Decorative gradient orb */}
      {!done && (
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-all duration-500" />
      )}
    </GlassCard>
  );
}
