
interface NavbarProps {
  onAddTask: () => void
  onLogout: () => void
}

export default function Navbar({ onAddTask, onLogout }: NavbarProps) {
  return (
    <nav className="w-full bg-neutral-950 text-white border-b border-rose-700 px-4 py-3 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
      <div className="text-2xl font-bold text-rose-400 text-center sm:text-left">
        Task Tracker
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={onAddTask}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-1.5 rounded-md transition text-sm font-medium"
        >
          + Add Task
        </button>

        <button
          onClick={onLogout}
          className="border border-rose-600 hover:bg-rose-700 hover:text-white text-rose-400 px-4 py-1.5 rounded-md transition text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
