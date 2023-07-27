import express from 'express'
import { addCopypasta, decrementCopypastaLikes, getAllCopypastas, getCopypastaById, getNumberOfLikes, getRandomCopypasta, incrementCopypastaLikes } from '../controllers/copypastaController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// GET - Copypasta by ID
router.get('/getById/:id', getCopypastaById)
// GET - ALL
router.get('/all', getAllCopypastas)
// POST - Add Copypasta
router.post('/', verifyUser, addCopypasta)
// GET - Random Copypasta
router.get('/randomCopypasta', getRandomCopypasta)
// POST - Increment Likes
router.put('/incrementCopypastaLikes/:id', verifyUser, incrementCopypastaLikes)
// POST - Decrement Likes
router.put('/decrementCopypastaLikes/:id', verifyUser, decrementCopypastaLikes)
// GET - Number of Likes for Post with ID
router.get('/likes/:id', getNumberOfLikes)

export default router 