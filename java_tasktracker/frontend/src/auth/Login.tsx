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
            alert("Bejelentkezés sikertelen: nincs token!")
        }
        } catch (err) {
            console.error(err)
            alert("Bejelentkezés sikertelen!")
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