// * IMPORTS
const jwt = require('jsonwebtoken');
const { unsuccessfulRes } = require('../lib/response');

// * MIDDLEWARE
// Middleware to Grab & Check JWT from Auth Headers
async function authMiddleware(req, res, next) {
  // TODO

  // Next Middleware
  next();
}

// * EXPORTS
module.exports = authMiddleware;
