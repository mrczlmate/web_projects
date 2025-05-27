import { useState, useEffect } from "react"

export type Task = {
    id?: number
    title: string
    description?: string
    status: "TO_DO" | "IN_PROGRESS" | "DONE"
}

interface TaskModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (task: Task) => void
    initialData?: Task
    mode: "edit" | "add"
}

export default function TaskModal({ isOpen, onClose, onSubmit, initialData, mode }: TaskModalProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState<"TO_DO" | "IN_PROGRESS" | "DONE">("TO_DO")

    useEffect(() => {
        if (initialData) {
        setTitle(initialData.title)
        setDescription(initialData.description || "")
        setStatus(initialData.status)
        } else {
        setTitle("")
        setDescription("")
        setStatus("TO_DO")
        }
    }, [initialData, isOpen])

    const handleSubmit = () => {
        const task: Task = {
        id: initialData?.id,
        title,
        description,
        status,
        }
        onSubmit(task)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-neutral-900 border border-rose-700 rounded-xl p-6 w-[90%] max-w-md shadow-xl text-white">
            <h2 className="text-2xl font-semibold mb-4 text-center text-rose-400">
            {mode === "edit" ? "Edit Task" : "Add Task"}
            </h2>

            <div className="space-y-4">
            <input
                className="w-full px-4 py-2 bg-neutral-800 border border-rose-700 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="w-full px-4 py-2 bg-neutral-800 border border-rose-700 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none resize-none h-24"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <select
                className="w-full pl-3 pr-8 py-2 bg-neutral-800 border border-rose-700 rounded-lg text-white focus:ring-2 focus:ring-rose-500 outline-none appearance-none"
                value={status}
                onChange={(e) => setStatus(e.target.value as Task["status"])}
            >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>
            </div>

            <div className="flex justify-end mt-6 gap-3">
            <button
                onClick={onClose}
                className="px-4 py-2 border border-rose-600 text-rose-400 rounded hover:bg-rose-700 hover:text-white transition"
            >
                Cancel
            </button>
            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition"
            >
                {mode === "edit" ? "Modify" : "Add"}
            </button>
            </div>
        </div>
        </div>
    )
}
