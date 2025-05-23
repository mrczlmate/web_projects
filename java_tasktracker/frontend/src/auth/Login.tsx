import { useState } from "react"
import axios from "../api/axios"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        try {
            const response = await axios.post("/auth/login", {
                username,
                password,
            })
            localStorage.setItem("token", response.data.token)
            alert("Login successful")
        } catch (err) {
            alert("Login failed")
        }
    }

    return (
        <div>
            <h2>Bejelentkezés</h2>
            <input placeholder="Felhasználónév" onChange={e => setUsername(e.target.value)} />
            <input placeholder="Jelszó" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Belépés</button>
        </div>
    )
}