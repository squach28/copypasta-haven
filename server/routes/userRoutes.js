import express from 'express'
import { getUserByUsername, getUserSelf } from '../controllers/userController.js'
import { verifyUser } from '../utils/verifyToken.js'

const userRouter = express.Router()

// GET - Self Data by ID
userRouter.get('/user/self/:id', verifyUser, getUserSelf)
// GET - User by Username
userRouter.get('/user', getUserByUsername)

export default userRouter