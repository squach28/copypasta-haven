import express from 'express'
import copypastaRouter from './routes/copypastaRoutes.js'
const app = express()
const PORT = 8080 || process.env.PORT


app.use('/api/copypasta', copypastaRouter)

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}`)
})