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