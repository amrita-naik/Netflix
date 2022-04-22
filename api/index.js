const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(console.log('db'))

app.listen('3001', () => {
    console.log('server')
})