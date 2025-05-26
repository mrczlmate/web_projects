import { useState } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            await axios.post('/auth/register', { 
                username, 
                password, 
            })

            const loginResponse = await axios.post('/auth/login', {
                username,
                password,
            })

            const token = loginResponse.data.token
            if (token) {
                localStorage.setItem('token', token)
                navigate('/')
            } else {
                alert('Login unsuccessful! Authentication Token not generated!')
            }
        } catch (err : any) {
            console.error(err)
            if (err.response?.status === 409) {
                alert('Username already exists. Please choose a different username.')
                return
            } else {
                alert('Registration failed. Please try again.')
            }
        }
    }

    return (
        <div>
            <h2>Register for Task Tracker</h2>
            <input placeholder="username" onChange={e => setUsername(e.target.value)} />
            <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>

            <p>Already have an account? <button onClick={() => navigate('/login')}>Login here</button></p>
        </div>
    )
}