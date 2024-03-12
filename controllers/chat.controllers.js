// * IMPORTS * //
const { OpenAI } = require('openai')
const Bot = require('../models/bot.model')
const { successfulRes } = require('../lib/utils/response');

// OpenAI Config
const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY
  })

// * CONTROLLERS * //
chatWithBot = async (req, res) => {
    // get the user id from the users request
    const userId = req.user.userId;
    
    // find the bots that are tied to the user 
    const bots = await Bot.find({ user: userId });

    // seperate the bots
    const randomBot = bots[Math.floor(Math.random() * bots.length)]

    // get the message from the request body
    message = req.body.message;
    
  prompt = `Respond to the following message with a personality of ${randomBot.personality} : ${message}`


  const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [ {"role": "user", "content": `${prompt}`}],
      max_tokens: 2048, 
      temperature: 1, 
  })
  
 return successfulRes({ res, data: { message: {
    respondie: randomBot,
    content: response.choices[0].message.content,
 }} });

}

// * EXPORTS * //

module.exports = {
  chatWithBot,
};