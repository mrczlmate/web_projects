import { useState } from "react"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Layout from "../components/Layout"
import FormInput from "../components/FormInput"
import FormButton from "../components/FormButton"
import AuthSwitchText from "../components/AuthSwitchText"

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
                toast.success("Logged in!")
            } else {
                toast.error('Login unsuccessful! Authentication Token not generated!')
            }
        } catch (err : any) {
            console.error(err)
            if (err.response?.status === 403) {
                toast.error("Invalid username or password.")
            } else if (err.response?.status === 500) {
                toast.error("Server error. Please try again later.")
            } else if (err.response?.data?.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error("Login failed.")
            }
        }
    }

    return (
        <Layout>
        <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>
        <FormInput type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <FormInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <FormButton onClick={handleLogin}>Log In</FormButton>
        <AuthSwitchText text="Don’t have an account?" linkText="Sign up" onClick={() => navigate("/register")}/>
        </Layout>
    )
}