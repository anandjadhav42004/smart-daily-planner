export default function Topbar() {
  return (
    <header className="h-24 flex items-center justify-between px-10 border-b border-white/10 bg-white/5 backdrop-blur-xl shadow-glow">
      <h1 className="text-3xl font-extrabold text-white drop-shadow-md">
        Good Evening, Sakshi 🌙
      </h1>

      <div className="text-white/60 text-lg drop-shadow-sm">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </div>
    </header>
  );
}
