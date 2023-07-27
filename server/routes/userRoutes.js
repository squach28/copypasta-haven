import express from 'express'
import { addPostToLikes, getLikeById, getUserByEmail, getUserByUsername, getUserLikedPosts, getUserSelf, getUsernameById, removePostFromLikes } from '../controllers/userController.js'
import { verifyUser } from '../utils/verifyToken.js'

const userRouter = express.Router()

// GET - Self Data by ID
userRouter.get('/user/self/:id', verifyUser, getUserSelf)
// GET - User by Username
userRouter.get('/userByUsername/:username', getUserByUsername)
// GET - User by Email
userRouter.get('/userByEmail/:email', getUserByEmail)
// PUT - Add Post to Likes
userRouter.put('/user/addPostToLikes', verifyUser, addPostToLikes)
// PUT - Remove Post from Likes
userRouter.put('/user/removePostFromLikes', verifyUser, removePostFromLikes)
// GET - Get User Liked Posts
userRouter.get('/user/:id/likes', getUserLikedPosts)
// GET - Get Username by ID
userRouter.get('/user/username/:id', getUsernameById)
// GET - Get Post in User's Likes by ID
userRouter.get('/user/like', getLikeById)

export default userRouter