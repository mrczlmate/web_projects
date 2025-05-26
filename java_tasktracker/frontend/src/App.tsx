import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./auth/Login"
import TaskList from "./tasks/TaskList"
import Register from "./auth/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
