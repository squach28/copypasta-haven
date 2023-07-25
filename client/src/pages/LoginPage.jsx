import { useReducer, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginReducer } from "../reducers/LoginReducer"
import ErrorIcon from '@mui/icons-material/Error'

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

    const renderErrorMessage = (errorName) => {
        let element = null
        errors.map(err => {
            if(err.name === errorName && err.status) {
                element = <div className="text-red-600 font-bold flex items-center justify-end gap-2" key={err.name}><ErrorIcon />{err.message}</div>
            } 
            return null
        })

        return element
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

    const errorsPresent = () => {
        const isErrorPresent = errors.find(err => err.status)

        return isErrorPresent
    }

    const inputsEmpty = () => {
        return username === '' || password === '' 
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
                    {renderErrorMessage('username')}
                    <label className="font-bold" htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        className="border-2 p-2 rounded-md" 
                        type="password" 
                        placeholder="Password" 
                        onChange={handlePasswordChange} 
                        value={password} 
                    />
                    {renderErrorMessage('password')}
                    {renderErrorMessage('user')}
                    <button disabled={loading || errorsPresent() || inputsEmpty()} onClick={handleLogin} className={`mt-5 px-2 py-3 font-bold rounded-md hover:bg-green-700 disabled:bg-green-200 ${loading ? 'bg-green-200' : 'bg-green-500'}`}>
                        {loading ? 'Logging in...': 'Login'}
                    </button>
                </form>
                <p className="text-sm text-center mt-7">
                    <span>Don&#39;t have an account? </span>
                    <Link className="font-bold" to="/register">Register here</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage