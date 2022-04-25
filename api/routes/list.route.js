const router = require('express').Router()
const ListModel = require('../models/list.model')
const verify = require('../verifyToken')

//create
router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin){
        const newList = new ListModel(req.body)
        try {
            const savedList = await newList.save();
            res.status(201).json(savedList)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(401).json("permission denied")
    }
})

//delete
router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin){
        try {
            await ListModel.findByIdAndDelete(req.params.id)
            res.status(201).json('deleted')
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(401).json("permission denied")
    }
})

//get
router.get('/', verify, async (req, res) => {
    const typeQuery = req.body.type;
    const genreQuery = req.body.genre;

    let list = []
    try {
        if(typeQuery){
            if(genreQuery){
                list = await ListModel.aggregate([{$sample: {$size: 10}}, {$match: {type: typeQuery, genre: genreQuery}}])
            }
            else {
                list = await ListModel.aggregate([{$sample: {$size: 10}}, {$match: {type: typeQuery}}])
            }
        } else {
            list = await ListModel.aggregate([{$sample: {$size: 10}}])
        }
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router