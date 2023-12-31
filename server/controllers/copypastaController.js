import Copypasta from "../model/Copypasta.js";


export const getCopypastaById = async (req, res) => {
    try {
        const copypasta = await Copypasta.findById(req.params.id)
        res.status(200).json(copypasta)
    } catch(err) {
        res.status(404).json({"error": "Copypasta not found"})
    }
}

export const getAllCopypastas = async (req, res) => {
    try {
        const copypastas = await Copypasta.find()
        res.status(200).json(copypastas)
    } catch(err) {
        console.log(err)
    }
}

export const addCopypasta = async (req, res) => {
    const newCopypasta = new Copypasta(req.body)
    try {
        const savedCopypasta = await newCopypasta.save()
        res.status(201).json(savedCopypasta)
    } catch(err) {
        console.log(err)
    }
}

export const getRandomCopypasta = async (req, res) => {
    try {
        const randomCopypasta = await Copypasta.aggregate([{ $sample: { size: 1}}])
        res.status(200).json(randomCopypasta)
    } catch(err) {
        console.log(err)
    }
}

export const incrementCopypastaLikes = async (req, res) => {
    try {
        const copypasta = await Copypasta.findOneAndUpdate({
            _id: req.params.id
        },
        { $inc: { 'likes': 1}},
        { new: true})
        res.status(200).json(copypasta)
    } catch(err) {
        console.log(err)
    }
}

export const decrementCopypastaLikes = async (req, res) => {
    try {
        const copypasta = await Copypasta.findOneAndUpdate({
            _id: req.params.id
        },
        { $inc: { 'likes': -1}},
        { new: true})
        res.status(200).json(copypasta)
    } catch(err) {
        console.log(err)
    }
}

export const getNumberOfLikes = async (req, res) => {
    try {
        const copypasta = await Copypasta.findOne({
            _id: req.params.id
        })

        if(!copypasta) {
            res.status(404).json( { success: false, message: `Copypasta with ID ${req.params.id} wasn't found`})
        } else {
            const { likes } = copypasta 
            res.status(200).json({ success: true, likes: likes })
        }
    } catch(err) {
        console.log(err)
    }
}