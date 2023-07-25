import express from 'express'
import { addPostToLikes, getUserByEmail, getUserByUsername, getUserSelf } from '../controllers/userController.js'
import { verifyUser } from '../utils/verifyToken.js'

const userRouter = express.Router()

// GET - Self Data by ID
userRouter.get('/user/self/:id', verifyUser, getUserSelf)
// GET - User by Username
userRouter.get('/userByUsername/:username', getUserByUsername)
// GET - User by Email
userRouter.get('/userByEmail/:email', getUserByEmail)
// PUT - Add Post to Likes
userRouter.put('/user/addPostToLikes', addPostToLikes)

export default userRouter