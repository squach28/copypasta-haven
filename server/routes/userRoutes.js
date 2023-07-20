import express from 'express'
import { getUserSelf } from '../controllers/userController.js'
import { verifyUser } from '../utils/verifyToken.js'

const userRouter = express.Router()


userRouter.get('/user/self/:id', verifyUser, getUserSelf)

export default userRouter