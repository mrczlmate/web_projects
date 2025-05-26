import { useEffect, useState } from "react"
import axios from "../api/axios"

type Task = {
    id: number
    title: string
    status: string
}

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
  axios.get("/tasks")
    .then(res => {
      setTasks(res.data)
    })
    .catch(err => console.error("ERROR", err))
}, [])

    return (
        <div>
            <h2>Feladataim</h2>
            <ul>
                {Array.isArray(tasks) && tasks.map(t => (
                    <li key={t.id}>{t.title} ({t.status})</li>
                ))}
            </ul>
        </div>
    )
}