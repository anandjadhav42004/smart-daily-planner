import { LayoutDashboard, CheckSquare, LogOut, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const items = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  ];

  const handleLogout = () => {
    // Add actual logout logic here if needed
    console.log("Logging out...");
    // window.location.href = '/login'; 
  };

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col p-6 z-40">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
          <span className="text-xl font-bold text-white">Tw</span>
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Twomoory
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group
                ${isActive
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <Icon size={22} className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 pt-6 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
        >
          <LogOut size={22} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
