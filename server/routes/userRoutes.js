import express from 'express'
import { addPostToLikes, getUserByEmail, getUserByUsername, getUserLikedPosts, getUserSelf, removePostFromLikes } from '../controllers/userController.js'
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
// PUT - Remove Post from Likes
userRouter.put('/user/removePostFromLikes', removePostFromLikes)
// GET - Get User Liked Posts
userRouter.get('/user/:id/likes', getUserLikedPosts)

export default userRouter