// * IMPORTS
require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectToMongo = require('./lib/db/mongoose-connect')

// SECURITY
const helment = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// ! DEV
const randomPersonGen = require('./lib/utils/randomPerson')
const Bot = require('./models/bot.model')

// * MIDDLEWARES
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100, // limit each IP to 100 requests per window (15 mins)
  })
) // Rate Limited (Prevents Brute Force Attacks)
app.use(express.json()) // Body Parser
app.use(helment()) // Header Security
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
) // CORS
app.use(xss()) // XSS

// * ROUTES
app.use('/api/v1/auth', require('./routes/auth.routes')) // TODO

// // ! DEV
// app.get('/api/v1/bots', async (req, res) => {
//   const foundBots = await Bot.find()
//   return res.status(200).json(foundBots)
// })
// // ! DEV
// app.post('/api/v1/bots', async (req, res) => {
//   const person = randomPersonGen()

//   const newBot = await Bot.create(person)
//   return res.status(201).json(newBot)
// })
// // ! DEV
// app.delete('/api/v1/bots', async (req, res) => {
//   const deletedBot = await Bot.deleteMany({})
//   return res.status(200).json(deletedBot)
// })

// * START SERVER & DB
;(async () => {
  try {
    await connectToMongo(process.env.MONGODB_URI) // 1. Start Database

    app.listen(process.env.PORT, () =>
      console.log(`Backend Listening @ ${process.env.SERVER_URL}`)
    ) // 2. Start Backend Server
  } catch (err) {
    console.log('ERROR:', err)
  }
})()
