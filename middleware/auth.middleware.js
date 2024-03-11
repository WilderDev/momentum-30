// * IMPORTS
const jwt = require('jsonwebtoken');
const { unsuccessfulRes } = require('../lib/utils/response');
const Token = require('./../models/token.model');
const { attachCookiesToResponse } = require('../lib/utils/cookie');

// * MIDDLEWARE
// Middleware to Grab & Check JWT from Auth Headers
async function authMiddleware(req, res, next) {
  const { accessToken, refreshToken } = req.signedCookies; // Extracting access token and refresh token from signed cookies

  try {
    if (accessToken) {
      // If access token exists, verify it using the JWT secret
      const { payload } = jwt.verify(accessToken, process.env.JWT_SECRET);

      req.user = payload.user; // Storing the user information from the token in the request object

      return next(); // Proceed to the next middleware or route handler
    }

    // If no refresh token, mark as unauthorized
    if (!refreshToken) {
      return unsuccessfulRes({
        res,
        status: 401,
        message: 'Unauthorized',
      });
    }

    // If access token doesn't exist, verify the refresh token
    const { payload } = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // Find the existing token in the database based on the user ID and refresh token
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    // If the token doesn't exist or is not valid, return an authentication error
    if (!existingToken || !existingToken.isValid) {
      return unsuccessfulRes({
        res,
        status: 401,
        message: 'Unauthorized',
      });
    }

    // Attach cookies to the response with the user information and the existing refresh token
    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors that occur during the authentication process
    return unsuccessfulRes({
      res,
      status: 500,
      message: 'Something went wrong! Try again please.',
    });
  }
}

// * EXPORTS
module.exports = authMiddleware;
