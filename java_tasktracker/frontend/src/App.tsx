import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./auth/Login"
import TaskList from "./tasks/TaskList"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
