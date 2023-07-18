import { useState } from "react"
import { Link } from "react-router-dom"

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        await login(username, password)
        setLoading(false)
    }

    const login = async (username, password) => {
        const user = {
            username: username,
            password: password
        }
        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if(!data.success) {
                    console.log(data.message)
                } else {
                    console.log(data.message)
                }
            })
    }

    return (
        <div className="flex w-screen h-full">
            <div className="w-[50%] h-screen bg-blue-200 hidden md:block">
            </div>
            <div className="flex-1 h-full m-10 flex flex-col">
                <p>Welcome back!</p>
                <h1 className="text-center text-3xl font-bold">Copypasta Haven</h1>
                <form className="flex flex-col gap-2 mt-5">
                    <label className="font-bold" htmlFor="username">Username</label>
                    <input 
                        id="username" 
                        className="border-2 p-2" 
                        type="text" 
                        placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username} 
                    />
                    <label className="font-bold" htmlFor="password">Password</label>
                    <input 
                    id="password" 
                    className="border-2 p-2" 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    />
                    <button disabled={loading} onClick={handleLogin} className="px-2 py-3 bg-green-500">
                        {loading ? 'Loading...': 'Login'}
                    </button>
                </form>
                <p><Link to="/register">Click here to create an account</Link></p>
            </div>
        </div>
    )
}

export default LoginPage