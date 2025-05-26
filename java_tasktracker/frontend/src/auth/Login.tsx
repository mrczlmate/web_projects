import { useState } from "react"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post("/auth/login", {
                username,
                password,
            })
            const token = response.data.token
            if (token) {
                localStorage.setItem("token", token)
                navigate("/")
        } else {
            alert("Successful login: Authentication Token generated!")
        }
        } catch (err) {
            console.error(err)
            alert("Unsuccessful login!")
        }
    }

    return (
        <div>
            <h2>Login to Task Tracker</h2>
            <input placeholder="username" onChange={e => setUsername(e.target.value)} />
            <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>

            <p>Don't have an account? <button onClick={() => navigate("/register")}>Register here</button></p>
        </div>
    )
}