// * IMPORTS
const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');

const {
  register,
  login,
  verifyEmail,
  me,
  logout,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth.controllers');

// * ROUTES
router.get('/me', authMiddleware, me);
router.post('/register', register);
router.post('/login', login);
router.post('/verify', verifyEmail);
router.delete('/logout', authMiddleware, logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// * EXPORTS
module.exports = router;
