import { useState, useEffect, useReducer } from 'react' 
import { Link } from 'react-router-dom'
import { registerReducer } from '../reducers/RegisterReducer'
import ErrorIcon from '@mui/icons-material/Error'
import validator from 'validator'

const RegisterPage = () => {

    const [randomCopypasta, setRandomCopypasta] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const initialErrors = [
        { 
            name: 'username',
            status: false,
            message: ''
        },
        { 
            name: 'email',
            status: false,
            message: ''
        },
        {
            name: 'password',
            status: false,
            message: ''
        },
        {
            name: 'confirmPassword',
            status: false,
            message: ''
        },
        {
            name: 'mismatchingPasswords',
            status: false,
            message: ''
        },
        {
            name: 'user',
            status: false,
            message: ''
        }
    ]

    const [errors, dispatch] = useReducer(registerReducer, initialErrors)


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
            dispatch({ type: 'USERNAME_NOT_EMPTY' })
        }
        setUsername(e.target.value)
    }

    const handleEmailChange = (e) => {
        if(e.target.value === '') {
            dispatch({ type: 'EMAIL_EMPTY'})
        } else {
            dispatch({ type: 'EMAIL_NOT_EMPTY' })
            if(!validator.isEmail(e.target.value)) {
                dispatch({ type: 'EMAIL_INVALID' })
            }
        }
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        dispatch({ type: 'USER', status: false })
        if(e.target.value === '') {
            dispatch({ type: 'PASSWORD_EMPTY' })
        } else {
            dispatch({ type: 'PASSWORD_NOT_EMPTY' })
        }
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        dispatch({ type:'USER', status: false })
        if(e.target.value === '') {
            dispatch({ type: 'CONFIRM_PASSWORD_EMPTY'})
        } else {
            dispatch({ type: 'CONFIRM_PASSWORD_NOT_EMPTY'})
        }

        if(e.target.value !== password) {
            dispatch({ type: 'MISMATCHING_PASSWORDS' })
        } else {
            dispatch({ type: 'MATCHING_PASSWORDS' })
        }


        setConfirmPassword(e.target.value)
    }

    const renderErrorMessage = (errorName) => {
        let element = null
        errors.map(err => {
            if(err.name === errorName && err.status) {
                element = <div className="text-red-600 font-bold flex items-center justify-end gap-2 text-sm" key={err.name}><ErrorIcon />{err.message}</div>
            } 
            return null
        })

        return element
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        await register(username, email, password)
        setLoading(false)
    }

    const register = async (username, email, password) => {
    
        const user = {
            username: username,
            email: email,
            password: password
        }
        
        fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }


    return (
        <div className="flex w-screen h-full">
        <div className="w-[50%] h-screen bg-blue-200 hidden md:flex md:justify-center md:items-center">
            <div className="text-center m-10 text-xl animate-pulse">
                {randomCopypasta ? <p>{randomCopypasta[0].title}</p> : 'Loading...'}
            </div>
        </div>
        <div className="flex-1 h-screen flex flex-col px-10 justify-center md:max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-start">Create your Account!</h1>
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
                <label className="font-bold" htmlFor="email">Email</label>
                <input 
                    id="email"
                    className="border-2 p-2 rounded-md" 
                    type="email"
                    placeholder="Email"
                    onChange={handleEmailChange}
                    value={email}
                />
                {renderErrorMessage('email')}
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
                <label className="font-bold" htmlFor="confirmPassword">Confirm Password</label>
                <input 
                    id="confirmPassword"
                    className="border-2 p-2 rounded-md"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleConfirmPasswordChange}
                    value={confirmPassword}
                />
                {renderErrorMessage('confirmPassword')}
                {renderErrorMessage('mismatchingPasswords')}
                <button disabled={loading} onClick={handleRegister} className={`mt-5 px-2 py-3  font-bold rounded-md hover:bg-green-700 ${loading ? 'bg-green-200' : 'bg-green-500'}`}>
                    {loading ? 'Logging in...': 'Register'}
                </button>
            </form>
            <p className="text-sm text-center mt-7">
                <span>Already have an account? </span>
                <Link className="font-bold" to="/login">Login here</Link>
            </p>
        </div>
    </div>
  )
}

export default RegisterPage