import express from 'express'
import copypastaRouter from './routes/copypastaRoutes.js'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
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
app.use(cors())
app.use(express.json())
app.use('/api/copypasta', copypastaRouter)

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}`)
    connect()
})