import { useReducer, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginReducer } from "../reducers/LoginReducer"

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [randomCopypasta, setRandomCopypasta] = useState(null)
    const navigate = useNavigate()
    const initialErrors = [
        { 
            name: 'username',
            status: false,
            message: ''
        },
        {
            name: 'password',
            status: false,
            message: ''
        },
        {
            name: 'user',
            status: false,
            message: ''
        }
    ]

    const [errors, dispatch] = useReducer(loginReducer, initialErrors)

    useEffect(() => {
        fetch('http://localhost:8080/api/copypasta/randomCopypasta')
            .then(res => res.json())
            .then(data => setRandomCopypasta(data))
    }, [])
    


    const handleUsernameChange = (e) => {
        dispatch({ type: 'USER', status: false})
        if(e.target.value === '') {
            dispatch({ type: 'USERNAME_EMPTY' })
        } else {
            dispatch({ type: 'USERNAME_NOT_EMPTY'})
        }
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        dispatch({ type: 'USER', status: false})
        if(e.target.value === '') {
            dispatch({ type: 'PASSWORD_EMPTY' })
        } else {
            dispatch({ type: 'PASSWORD_NOT_EMPTY'})
        }
        setPassword(e.target.value)
    }

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
                    dispatch({ 'type': 'USER', message: data.message})
                } else {
                    navigate('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className="flex w-screen h-full">
            <div className="w-[50%] h-screen bg-blue-200 hidden md:flex md:justify-center md:items-center">
                <div className="text-center m-10 text-xl animate-pulse">
                    {randomCopypasta ? <p>{randomCopypasta[0].title}</p> : 'Loading...'}
                </div>
            </div>
            <div className="flex-1 h-screen flex flex-col px-10 justify-center md:max-w-lg mx-auto">
                <h1 className="text-3xl font-bold text-start">Welcome back!</h1>
                <form className="flex flex-col gap-2 mt-5">
                    <label className="font-bold" htmlFor="username">Username</label>
                    <input 
                        id="username" 
                        className="border-2 p-2 rounded-md" 
                        type="text" 
                        placeholder="Username" 
                        onChange={handleUsernameChange} 
                        value={username} 
                    />
                    {errors.map(err => {
                        if(err.name === 'username') {
                            if(err.status) {
                                return <div className="text-end text-red-600 font-bold" key={err.name}>{err.message}</div>
                            }

                        }
                        return null
                    })}
                    <label className="font-bold" htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        className="border-2 p-2 rounded-md" 
                        type="password" 
                        placeholder="Password" 
                        onChange={handlePasswordChange} 
                        value={password} 
                    />
                    {errors.map(err => {
                        if(err.name === 'password' && err.status) {
                            return <div className="text-end text-red-600 font-bold" key={err.name}>{err.message}</div>
                        }
                        return null
                    })}

                    {errors.map(err => {
                        if(err.name === 'user' && err.status) {
                            return <div className="text-end text-red-600 font-bold" key={err.name}>{err.message}</div>
                        }
                        return null
                    })}
                    <button disabled={loading} onClick={handleLogin} className={`mt-5 px-2 py-3  font-bold rounded-md hover:bg-green-700 ${loading ? 'bg-green-200' : 'bg-green-500'}`}>
                        {loading ? 'Logging in...': 'Login'}
                    </button>
                </form>
                <p className="text-sm text-center mt-7">
                    <span>Don&#39;t have an account? </span>
                    <Link className="font-bold" to="/register">Register here</Link>
                </p>
                <Link to="/forgotPassword" className="text-center mt-5 hover:font-bold">Forgot password?</Link>
            </div>
        </div>
    )
}

export default LoginPage