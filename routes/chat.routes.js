// * IMPORTS * //
const router = require('express').Router()
const { chatWithBot } = require('../controllers/chat.controllers')
const authMiddleware = require('../middleware/auth.middleware')

// * ROUTES * //
router.post('/', authMiddleware, chatWithBot)

// * EXPORTS * //
module.exports = router;