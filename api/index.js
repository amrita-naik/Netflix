const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const movieRoute = require('./routes/movie.route')
const listRoute = require('./routes/list.route')

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(console.log('db'))

app.use(express.json()); 
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/movies', movieRoute)
app.use('/api/lists', listRoute)

app.listen('3001', () => {
    console.log('server')
})