const router = require('express').Router();
const UserModel = require('../models/user.model')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//register
router.post('/register', async (req, res) => {
    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    })
    try{
        const user = await newUser.save()
    } catch(err){
        console.log(err)
    }
})

//login
router.post('/login', async (req, res) => {
    try{
        const user = await UserModel.findOne({email: req.body.email})
        !user && res.status(401).json("Wrong email or password");

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        originalPassword !== req.body.password && res.status(401).json("Wrong email or password");

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY, {expiresIn: '5d'})

        res.status(200).json(accessToken)

    }catch(err){
        console.log(err)
    }
})

module.exports = router