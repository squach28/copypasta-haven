import User from "../model/User.js"
import { createError } from "../utils/createError.js"

export const getUserSelf = async (req, res) => {

    try {
        const user = await User.findById({
            _id: req.params.id
        })
        const { username } = user

        return res.status(200).json({ username: username })
    } catch (err) {
        return createError(404, 'User not found')
    }
}

export const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({
            username: username
        })
        if(!user) {
            res.status(200).json({ success: true })
        } else {
            res.status(400).json({ success: false, message: 'Username is already taken' })
        }
    } catch(err) {
        res.status(500).json({ success: false, message: 'Something went wrong. Try again later'})
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params
        const user = await User.findOne({
            email: email
        })
        if(!user) {
            res.status(200).json({ success: true })
        } else {
            res.status(400).json({ success: false, message: 'Email is already taken' })
        }
    } catch(err) {
        res.status(500).json({ success: false, message: 'Something went wrong. Try again later'})
    }
}

export const addPostToLikes = async (req, res) => {
    try {
        console.log('added post to likes!')
        const user = await User.findOneAndUpdate({
            _id: req.query.userId,
        }, { $addToSet: { likes: req.query.postId }})
        res.status(200).json({ success: true, message: 'Post was added to likes'})
    } catch(err) {
        console.log(err)
    }
}

export const addPostToDislikes = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({
            _id: req.query.userId,
        }, { $addToSet: { dislikes: req.query.postId }})
        res.status(200).json({ success: true, message: 'Post was added to dislikes'})
    } catch(err) {
        console.log(err)
    }
}

export const removePostFromLikes = async (req, res) => {
    try {
        await User.findOneAndUpdate({
            _id: req.query.userId,
        }, { $pull: { likes: req.query.postId }})
        res.status(200).json({ success: true, message: 'Post was removed from likes'})
    } catch(err) {
        console.log(err)
    }
}

export const getUserLikedPosts = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.userId
        })
        if(!user) {
            res.status(404).json({ success: false, message: 'User not found'})
        }

        const { likes } = user

        res.status(200).json(likes)
    } catch(err) {
        console.log(err)
    }
}

export const getUsernameById = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        })

        if(!user) {
            res.status(404).json({ success: false, message: 'User was not found'})
        } else {
            const { username } = user

            res.status(200).json(username)
        }

    } catch(err) {
        console.log(err) 
    }
}

export const getLikeById = async (req, res) => {
    try {
        const likedPost = await User.find({
            _id: req.query.userId,
            likes: req.query.postId
        })
        console.log(likedPost)
        if(likedPost.length === 0) {
            res.status(404).json({ success: false, message: `Post was not found in user's likes`})
        } else {
            res.status(200).json({ success: true, message: `Post was found in user's likes`})
        }

    } catch(err) {
        console.log(err)
    }
}

export const getDislikeById = async (req, res) => {
    try {
        const likedPost = await User.find({
            _id: req.query.userId,
            dislikes: req.query.postId
        })
        if(likedPost.length === 0) {
            res.status(404).json({ success: false, message: `Post was not found in user's dislikes`})
        } else {
            res.status(200).json({ success: true, message: `Post was found in user's dislikes`})
        }

    } catch(err) {
        console.log(err)
    }
}