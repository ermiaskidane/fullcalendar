require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log('Connected to mongoDb')
)

app.use('/api/calendar', require('./Controllers/CalenderController'))

app.listen(5000, () => console.log('Server started'))
