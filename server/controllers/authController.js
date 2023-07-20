import User from "../model/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
    
        await newUser.save()
        res.status(200).json({
            success: true,
            message: 'User has been successfully created'
        })
    } catch(err) {
        console.log(err)
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})

        if(!user) {
            res.status(404).json({success: false, message: 'User was not found'})
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if(!isPasswordCorrect) {
            res.status(400).json({ success: false, message: 'Wrong password or username'})

        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        
        res.cookie('access_token', token, {
            httpOnly: true
        })
        res.cookie('username', req.body.username, {
            httpOnly: true
        })

        res.status(200).json({success: true, message: 'User successfully logged in'})
        
    } catch(err) {
        console.log(err)
    }
}