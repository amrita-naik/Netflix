const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const authRoute = require('./routes/auth.route')

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(console.log('db'))

app.use(express.json)
app.use('/api/auth', authRoute)

app.listen('3001', () => {
    console.log('server')
})