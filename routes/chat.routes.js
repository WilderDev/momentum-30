// * IMPORTS * //
const router = require('express').Router()
const { chatWithBot, getMessageHistory} = require('../controllers/chat.controllers')
const authMiddleware = require('../middleware/auth.middleware')

// * ROUTES * //
router.post('/', authMiddleware, chatWithBot)

router.get('/', authMiddleware, getMessageHistory)

// * EXPORTS * //
module.exports = router;