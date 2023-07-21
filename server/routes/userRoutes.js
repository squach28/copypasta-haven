import express from 'express'
import { getUserByEmail, getUserByUsername, getUserSelf } from '../controllers/userController.js'
import { verifyUser } from '../utils/verifyToken.js'

const userRouter = express.Router()

// GET - Self Data by ID
userRouter.get('/user/self/:id', verifyUser, getUserSelf)
// GET - User by Username
userRouter.get('/userByUsername/:username', getUserByUsername)
// GET - User by Email
userRouter.get('/userByEmail/:email', getUserByEmail)

export default userRouter