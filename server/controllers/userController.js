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