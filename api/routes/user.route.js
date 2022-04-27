const router = require('express').Router()
const UserModel = require('../models/user.model')
const CryptoJS = require('crypto-js')
const verify = require('../verifyToken')

//update
router.put('/:id', verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        }
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
})

//delete
router.delete('/:id', verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        try {
            await UserModel.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(401)
    }
})

//get user
router.get('/find/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        const { password, ...info} = user._doc 
        res.status(200).json(info)
    } catch(err){
        res.status(500).json(err)
    }
})

//get all users
router.get('/', verify, async (req, res) => {
    const query = req.query.new
    if(req.user.isAdmin){
        try {
            const users = query ? await UserModel.find().limit(10) : await UserModel.find();
            res.status(200).json(users)
        } catch (error) {
            res.status(403).json(error)
        }
    } else {
        res.status(500).json("Permission denied")
    }
})

//get users stats
router.get('/stats', async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    try {
        const data = await UserModel.aggregate([
            {
                $project: {
                    month: {$month: "createdAt"}
                },
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router