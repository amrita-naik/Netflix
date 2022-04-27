const router = require('express').Router()
const MovieModel = require('../models/movie.model')
const verify = require('../verifyToken')

//create
router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin){
        const newMovie = new MovieModel(req.body)
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(401).json("permission denied")
    }
})

//update
router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin){
        try {
            const updatedMovie = await MovieModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(updatedMovie)
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
            await MovieModel.findByIdAndDelete(req.params.id);
            res.status(200).json('movie deleted')
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(401).json("permission denied")
    }
})

//get
router.get('/find/:id', verify, async (req, res) => {
    try {
        const movie = await MovieModel.findById(req.params.id);
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get random movie
router.get('/random', verify, async (req, res) => {
    const type = req.query.type
    let movie;
    try {
        if(type === "series"){
            movie = await MovieModel.aggregate([
                {$match: {isSeries: true}},
                {$sample: {size: 1}}
            ])
        } else {
            movie = await MovieModel.aggregate([
                {$match: {isSeries: false}},
                {$sample: {size: 1}}
            ])
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

//get all movies
router.get('/', verify, async (req, res) => {
    if (req.user.isAdmin){
        try {
            const movies = await MovieModel.find();
            res.status(200).json(movies.reverse())
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(401).json("permission denied")
    }
})

module.exports = router