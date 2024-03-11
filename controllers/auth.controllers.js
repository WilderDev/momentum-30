// * IMPORTS
const crypto = require('crypto');

const User = require('../models/user.model');
const Token = require('./../models/token.model');

const { attachCookiesToResponse } = require('../lib/utils/cookie');
const { successfulRes, unsuccessfulRes } = require('../lib/utils/response');
const {
  sendVerificationEmail,
  sendResetPassswordEmail,
} = require('../lib/emails/sendEmail');

// * CONTROLLERS
// Register User
const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    return unsuccessfulRes({
      res,
      message: 'Please Try Another Email Address',
    });
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;

  const role = isFirstAccount ? 'admin' : 'user';

  const verificationToken = crypto.randomBytes(40).toString('hex');

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  // Front end origin
  const origin = process.env.FRONTEND_ORIGIN_URL ?? 'http://localhost:3000';

  // Utilize sendVerificationEmail help function created
  await sendVerificationEmail({
    name: user.name, // User's name
    email: user.email, // User's email
    verificationToken: user.verificationToken, // User's token
    origin,
  });

  // Send verification token back only while testing in postman!!
  return successfulRes({
    res,
    data: {
      message: 'Success! Please check your email to veryify your account',
    },
  });
};

// Verify Email
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body; // Get token and email from the request

  const user = await User.findOne({ email }); // Get user by email

  // If no user found or incorrect verification token send 401 error
  if (!user) {
    return unsuccessfulRes({
      res,
      status: 401,
      message: 'Verification Failed',
    });
  }

  if (user.verificationToken !== verificationToken) {
    return unsuccessfulRes({
      res,
      status: 401,
      message: 'Verification Failed',
    });
  }

  // Update user object to verified
  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = '';

  // Save user
  await user.save();

  // Return success response
  return successfulRes({
    res,
    data: { message: 'Success! Email is now verified!' },
  });
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body; // Get email and password from request

  if (!email || !password) {
    // Check for email and password existance
    return unsuccessfulRes({
      res,
      message: 'Please provide email and password',
    });
  }

  // Find User
  const user = await User.findOne({ email });

  if (!user) {
    return unsuccessfulRes({
      res,
      status: 401,
      message: 'Invalid Credentials',
    });
  }

  // Use Schema method to compare incoming password to hashed password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return unsuccessfulRes({
      res,
      status: 401,
      message: 'Invalid Credentials',
    });
  }

  if (!user.isVerified) {
    return unsuccessfulRes({
      res,
      status: 401,
      message: 'Please Verify Your Email',
    });
  }

  // Create a token user to send to the front end
  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  // Create refresh token
  let refreshToken = '';

  // Check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    // Extract isValid from existing token
    const { isValid } = existingToken;

    if (!isValid) {
      return unsuccessfulRes({
        res,
        status: 401,
        message: 'Invalid Credentials',
      });
    }
    refreshToken = existingToken.refreshToken;

    // Attach cookies to response
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });

    // Send response
    return successfulRes({
      res,
      data: {
        message: 'Success! Email is now verified!',
        user: tokenUser,
        refreshToken,
      },
    });
  }

  // Collecting information for Token Object
  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;

  // Constructing token object
  const userToken = {
    refreshToken,
    userAgent,
    ip,
    user: user._id,
  };

  // Creating token
  await Token.create(userToken);

  // Attach cookies to response
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  // Send response
  res.status(200).json({ user: tokenUser });
};

// Current User
const me = async (req, res) => {
  // Exacting user from request
  const { user } = req;

  return successfulRes({
    res,
    data: { user },
  });
};

// Logout User
const logout = async (req, res) => {
  // Extracting user from request and deleting token
  await Token.findOneAndDelete({ user: req.user.userId });

  // Clearing cookies
  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  // Clearing cookies
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  return successfulRes({
    res,
    data: { message: 'User logged out successfully!' },
  });
};

// Forgot Password
const forgotPassword = async (req, res) => {
  // Extract email from request
  const { email } = req.body;

  // Check for email
  if (!email) {
    return unsuccessfulRes({
      res,
      message: 'Please provide an email address.',
    });
  }

  // Find User
  const user = await User.findOne({ email });

  if (user) {
    // Create password token
    const passwordToken = crypto.randomBytes(70).toString('hex');

    // Send email
    await sendResetPassswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin: 'http://localhost:4200',
    });

    // Ten Minutes
    const tenMinutes = 1000 * 60 * 10;
    // Password Token Expire Date
    const passwordTokenExpireDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = passwordToken;
    user.passwordTokenExpireDate = passwordTokenExpireDate;
    await user.save();
  }

  return successfulRes({
    res,
    data: { message: 'Please check your email!' },
  });
};

// Reset Password
const resetPassword = async (req, res) => {
  // Extract email, token, and password from request
  const { email, token, password } = req.body;

  // Check for email, token, and password
  if (!token || !email || !password) {
    return unsuccessfulRes({
      res,
      message: 'Invalid Input',
    });
  }

  // Find User
  const user = await User.findOne({ email });

  if (user) {
    // Current Date
    const currentDate = Date.now();
    if (
      user.passwordToken === token &&
      user.passwordTokenExpireDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpireDate = null;

      await user.save();
    }
  }

  return successfulRes({
    res,
    data: { message: 'Password reset successfully!' },
  });
};

// * EXPORTS
module.exports = {
  register,
  login,
  verifyEmail,
  me,
  logout,
  forgotPassword,
  resetPassword,
};
