import express from 'express'
import { addCopypasta, getAllCopypastas, getCopypastaById } from '../controllers/copypastaController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// GET - Copypasta by ID
router.get('/getById/:id', getCopypastaById)
// GET - ALL
router.get('/all', getAllCopypastas)
// POST - Add Copypasta
router.post('/', verifyUser, addCopypasta)


export default router 