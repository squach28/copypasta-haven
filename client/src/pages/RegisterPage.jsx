import { useState, useEffect, useReducer } from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import { registerReducer } from '../reducers/RegisterReducer'
import validator from 'validator'
import ErrorIcon from '@mui/icons-material/Error'
import { getRandomCopypasta } from '../api/copypasta'
import { register as registerUser } from '../api/auth'
import { isEmailTaken, isUsernameTaken } from '../api/user'

const RegisterPage = () => {

    const [randomCopypasta, setRandomCopypasta] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

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
        getRandomCopypasta()
            .then(res => {
                setRandomCopypasta(res)
            })

        const focusListener = document.addEventListener('focusout', (e) => {
            const inputId = e.target.id
            if(inputId === 'username' && e.target.value !== '') {
                verifyUsernameTaken(e.target.value)
            }

            if(inputId === 'email' && e.target.value !== '') {
                verifyEmailTaken(e.target.value)
            }
        })

        return document.removeEventListener('focusout', focusListener) 
    }, [])

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
        dispatch({ type: 'USER', status: false})
        dispatch({ type: 'USERNAME_CLEAR_ERROR' })
        if(e.target.value === '') {
            dispatch({ type: 'USERNAME_EMPTY' })
        } else {
            dispatch({ type: 'USERNAME_NOT_EMPTY' })
        }
        
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
        
        registerUser(user)
            .then(data => {
                if(data.success) {
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
    }

    const errorsPresent = () => {
        const isErrorPresent = errors.find(err => err.status)

        return isErrorPresent
    }

    const verifyUsernameTaken = (username) => {

        isUsernameTaken(username)
            .then(data => {
                if(data.username) {
                    dispatch({
                        type: 'USERNAME_TAKEN'
                    })
                }
            })
    }

    const verifyEmailTaken = (email) => {
        isEmailTaken(email)
            .then(data => {
                if(data.email) {
                    dispatch({
                        type: 'EMAIL_TAKEN',
                    })
                }
            })
    }

    const inputsEmpty = () => {
        return username === '' || email === '' || password === '' || confirmPassword === ''
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


    return (
        <div className="flex w-screen h-full">
        <div className="w-[50%] h-screen bg-blue-200 hidden md:flex md:justify-center md:items-center">
            <div className="text-center m-10 text-xl animate-pulse">
                {randomCopypasta ? <p>{randomCopypasta.title}</p> : 'Loading...'}
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
                <button disabled={loading || errorsPresent() || inputsEmpty()} onClick={handleRegister} className={`mt-5 px-2 py-3  font-bold rounded-md hover:bg-green-700 ${loading ? 'bg-green-200' : 'bg-green-500'} disabled:opacity-50`}>
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