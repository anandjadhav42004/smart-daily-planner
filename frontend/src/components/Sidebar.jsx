import { CheckSquare, LayoutDashboard, LogOut } from "lucide-react";

export default function Sidebar() {
  const items = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: CheckSquare, label: "Tasks" },
    { icon: LogOut, label: "Logout", color: "text-red-400 hover:text-red-300" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-indigo-900/20 to-black/30 backdrop-blur-2xl border-r border-white/10 p-6">
      <h2 className="text-3xl font-bold text-white mb-12 drop-shadow-md">Planner ✨</h2>

      <nav className="space-y-6">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 text-white/80 hover:text-white cursor-pointer ${item.color || ""}`}
            >
              <Icon size={22} />
              {item.label}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
