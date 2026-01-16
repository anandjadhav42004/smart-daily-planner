import { Bell, Search, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Assuming you have a logout function or just clear local storage
import { logoutUser } from "../services/api";

export default function Topbar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "Sakshi";

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="h-24 px-8 flex items-center justify-between sticky top-0 z-30 ml-72">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          Good Evening, {userName} <span className="text-2xl">👋</span>
        </h2>
        <p className="text-slate-400 font-medium">{date}</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group hidden lg:block">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-64 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/50 focus:bg-slate-900 transition-all duration-300"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
        </div>

        <button className="relative p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all duration-300">
          <Bell size={22} />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-slate-950 rounded-full indicator"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="font-bold text-white text-sm">{userName.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${showMenu ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-xl z-20 overflow-hidden"
                >
                  <div className="p-4 border-b border-white/5">
                    <p className="text-white font-medium truncate">{userName}</p>
                    <p className="text-xs text-white/50 truncate">{user.email || "user@example.com"}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                      <User size={16} /> Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                      <Settings size={16} /> Settings
                    </button>
                    <div className="h-px bg-white/5 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
