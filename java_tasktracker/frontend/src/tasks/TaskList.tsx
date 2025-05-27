import { useEffect, useState } from "react"
import axios from "../api/axios"
import Navbar from "../components/Navbar"
import TaskModal, { type Task } from "../components/TaskModal"

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<"add" | "edit">("add")
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined)

    const columns = [
        { key: "TO_DO", title: "To Do" },
        { key: "IN_PROGRESS", title: "In Progress" },
        { key: "DONE", title: "Done" },
    ]

    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = () => {
        axios.get("/tasks")
        .then(res => setTasks(res.data))
        .catch(err => console.error(err))
    }

    const handleAddTask = () => {
        setModalMode("add")
        setSelectedTask(undefined)
        setModalOpen(true)
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }

    const handleEdit = (task: Task) => {
        setModalMode("edit")
        setSelectedTask(task)
        setModalOpen(true)
    }

    const handleSubmit = async (task: Task) => {
        if (modalMode === "add") {
            const res = await axios.post("/tasks", task)
            setTasks([...tasks, res.data])
        } else {
            const res = await axios.put(`/tasks/${task.id}`, task)
            setTasks(tasks.map(t => (t.id === task.id ? res.data : t)))
        }
    }

    const handleDelete = async (taskId: number) => {
        if (confirm("Are you sure you want to delete this task?")) {
            try {
                await axios.delete(`/tasks/${taskId}`)
                setTasks((prev) => prev.filter((t) => t.id !== taskId))
            } catch (err) {
                console.error(err)
                alert("Failed to delete task.")
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
        <Navbar onAddTask={handleAddTask} onLogout={handleLogout} />

        <div className="px-4 sm:px-6 py-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-rose-300">Task Board</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((col) => (
                <div
                key={col.key}
                className="bg-neutral-800 border border-rose-600 rounded-xl shadow-lg p-4 flex flex-col"
                style={{ minHeight: "calc(100vh - 170px)" }}
                >
                <h2 className="text-xl font-semibold text-center text-rose-400 mb-4">{col.title}</h2>

                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                    {tasks
                    .filter((task) => task.status === col.key)
                    .map((task) => (
                        <div
                        key={task.id}
                        className="relative bg-neutral-900 border border-rose-700 rounded-md p-3 shadow hover:shadow-xl transition"
                        >
                        <p className="font-medium pr-10">{task.title}</p>

                        <div className="absolute top-2 right-2 flex gap-2">
                            <button
                            onClick={() => handleEdit(task)}
                            className="text-rose-400 hover:text-rose-200 transition"
                            title="Edit"
                            >
                            ✏️
                            </button>
                            <button
                            onClick={() => handleDelete(task.id!)}
                            className="text-rose-500 hover:text-rose-300 transition"
                            title="Delete"
                            >
                            🗑️
                            </button>
                        </div>
                        </div>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>

        <TaskModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleSubmit}
            initialData={selectedTask}
            mode={modalMode}
        />
        </div>
    )
}
