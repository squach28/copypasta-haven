import express from 'express'
import { addCopypasta, getAllCopypastas, getCopypastaById } from '../controllers/copypastaController.js'

const router = express.Router()

// GET - Copypasta by ID
router.get('/:id', getCopypastaById)
// GET - ALL
router.get('/all', getAllCopypastas)
// POST - Add Copypasta
router.post('/', addCopypasta)


export default router 