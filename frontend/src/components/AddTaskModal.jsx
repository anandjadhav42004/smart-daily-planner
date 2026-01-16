import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Calendar, Flag, Type } from "lucide-react";
import Button from "./Button";

export default function AddTaskModal({ onClose, onTaskAdded }) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!task || !dueDate) return;

    // Pass everything to parent handler
    onTaskAdded({ title: task, priority, dueDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-primary-500/10"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">New Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleAdd} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/60 ml-1">What needs to be done?</label>
            <div className="relative">
              <input
                type="text"
                placeholder="E.g., Design system presentation"
                value={task}
                autoFocus
                onChange={(e) => setTask(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary-500 transition-colors"
                required
              />
              <Type size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-white/60 ml-1">Due Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary-500 transition-colors"
                  required
                />
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-white/60 ml-1">Priority</label>
              <div className="relative">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 appearance-none transition-colors"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <Flag size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Task
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
