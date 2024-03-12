// * IMPORTS
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const Bot = require('./models/bot.model');

const connectToMongo = require("./lib/db/mongoose-connect");

// SECURITY
const helment = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const cookieParser = require('cookie-parser');

// * MIDDLEWARES
app.set("trust proxy", 1);
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 Minutes
		max: 100, // limit each IP to 100 requests per window (15 mins)
	})
); // Rate Limited (Prevents Brute Force Attacks)
app.use(express.json()); // Body Parser
app.use(cookieParser(process.env.JWT_SECRET));
app.use(helment()); // Header Security
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
); // CORS
app.use(xss()); // XSS

// * ROUTES
app.use("/api/v1/auth", require("./routes/auth.routes")); // TODO
app.use("/api/v1/workout", require("./routes/workout.routes")); // TODO
app.use("/api/v1/user", require("./routes/workout.routes")); // TODO

// Chat Routes
app.use('/api/v1/chat', require('./routes/chat.routes'));

// * START SERVER & DB
(async () => {
  try {
    await connectToMongo(process.env.MONGODB_URI); // 1. Start Database

    app.listen(5000, () =>
      console.log(`Backend Listening @ ${process.env.SERVER_URL}`),
    ); // 2. Start Backend Server
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
