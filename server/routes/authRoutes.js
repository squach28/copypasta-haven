import express from 'express'
import { loginUser, registerUser } from '../controllers/authController.js'

const authRouter = express.Router()

// POST - Register User 
authRouter.post('/register', registerUser)
// POST - Login User 
authRouter.post('/login', loginUser)

export default authRouter