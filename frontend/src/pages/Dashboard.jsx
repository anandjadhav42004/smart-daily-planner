import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import Button from "../components/Button";
import GlassCard from "../components/GlassCard";
import { Plus, Loader2, Filter } from "lucide-react";
import { getTasks, addTask, updateTask, deleteTask } from "../services/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, completed

  /* ---------------- FETCH TASKS ---------------- */
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ---------------- ADD TASK ---------------- */
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await addTask({ ...taskData, completed: false });
      setTasks((prev) => [newTask, ...prev]);
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task");
    }
  };

  /* ---------------- TOGGLE TASK ---------------- */
  const toggleTaskDone = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      if (!task) return;

      const newStatus = !task.completed;

      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: newStatus } : t))
      );

      await updateTask(id, { completed: newStatus });

      if (newStatus) toast.success("Task completed!", { icon: '🎉' });
    } catch (err) {
      toast.error("Failed to update task");
      fetchTasks();
    }
  };

  /* ---------------- DELETE TASK ---------------- */
  const handleTaskDeleted = async (id) => {
    try {
      setTasks((prev) => prev.filter((t) => t._id !== id));
      await deleteTask(id);
    } catch (err) {
      toast.error("Failed to delete task");
      fetchTasks();
    }
  };

  /* ---------------- FILTERING ---------------- */
  const filteredTasks = tasks.filter(task => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  /* ---------------- PROGRESS ---------------- */
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-white/50">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary-500" />
        <p>Loading your day...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* HEADER SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2 flex flex-col justify-center relative overflow-hidden h-48">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Your Daily Progress
            </h2>
            <p className="text-white/60 mb-8 max-w-md">
              You've completed <span className="text-white font-bold">{completedCount}</span> out of <span className="text-white font-bold">{tasks.length}</span> tasks today. Keep up the momentum!
            </p>

            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 relative"
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse" />
              </motion.div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 w-80 h-80 bg-primary-600/20 rounded-full blur-[100px] -mr-20 -mb-20" />
        </GlassCard>

        <GlassCard className="flex flex-col items-center justify-center gap-6 text-center h-48">
          <div className="relative">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
              <motion.circle
                cx="48" cy="48" r="40"
                stroke="currentColor" strokeWidth="8"
                fill="transparent"
                className="text-emerald-500"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * progress) / 100}
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * progress) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
              {progress}%
            </div>
          </div>
          <p className="text-white/60 text-sm font-medium">Daily Efficiency</p>
        </GlassCard>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          Tasks <span className="text-base font-normal text-white/40 bg-white/5 px-3 py-1 rounded-full">{filter === 'all' ? tasks.length : filteredTasks.length}</span>
        </h3>

        <div className="flex items-center gap-3 bg-white/5 p-1 rounded-xl border border-white/10">
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${filter === f
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        <Button onClick={() => setShowAddModal(true)} variant="primary" className="shadow-lg shadow-primary-600/20">
          <Plus size={20} /> Add Task
        </Button>
      </div>

      {/* TASKS GRID */}
      <AnimatePresence mode="popLayout">
        {filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5"
          >
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Filter className="text-white/40" size={32} />
            </div>
            <p className="text-white/60 text-lg">No tasks found in this category.</p>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="mt-4 text-primary-400 hover:text-primary-300 font-medium"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggleDone={toggleTaskDone}
                onTaskDeleted={handleTaskDeleted}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddModal && (
          <AddTaskModal
            onClose={() => setShowAddModal(false)}
            onTaskAdded={handleAddTask}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
