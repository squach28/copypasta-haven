import express from 'express'
import copypastaRouter from './routes/copypastaRoutes.js'
import authRouter from './routes/authRoutes.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
dotenv.config()
const app = express()
const PORT = 8080 || process.env.PORT

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to mongo')
    } catch(err) {
        throw err
    }
}

// middleware
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/copypasta', copypastaRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}`)
    connect()
})