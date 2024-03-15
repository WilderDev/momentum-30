// * IMPORTS * //
const { OpenAI } = require('openai')
const Bot = require('../models/Bot.model')
const { successfulRes } = require('../lib/utils/response');
const Message = require('../models/Message.model')

// OpenAI Config
const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY
  })

// * CONTROLLERS * //
chatWithBot = async (req, res) => {
    // get the user id from the users request
    const {userId, name} = req.user;
    
    // find the bots that are tied to the user 
    const bots = await Bot.find({ user: userId });

    // seperate the bots
    const randomBot = bots[Math.floor(Math.random() * bots.length)]

    // get the message from the request body
   const userMessage = req.body.message; 

    // save the users message to the database
     const user = await Message.create({
      user: userId,
      content: userMessage,
      author: {
        role: 'user',
        name: name,
        // pic: randomBot.personality
      }
     })

    const prevMessages = await Message.find({ user: userId });

    const sortedMessages = prevMessages.sort((a, b) => a.createdAt - b.createdAt);
    

    const lastFourMessages = sortedMessages.slice(-4).map(obj => obj.content).join(', ');
    
    console.log('lastFourMessages:', lastFourMessages);
    

  prompt = `For context here are the last four messages in the conversation "${lastFourMessages}". Respond to the following message with a personality of ${randomBot.personality} : ${userMessage}, 
            this message will be about working out`;


  const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [ {"role": "user", "content": `${prompt}`}],
      max_tokens: 2048, 
      temperature: 1, 
  })
  
 // save the bots message to the database
 const bot = await Message.create({
  user: userId,
  content: response.choices[0].message.content,
  author: {
    role: 'bot',
    name: randomBot.name,
    pic: randomBot.pic
  }
 })


 return successfulRes({ res, data: { 
  userMessage: {
    user
  },
  botMessage: {
    bot
  }
 } });

}
getMessageHistory = async (req, res) => {
  // get the user id from the users request
  const userId = req.user.userId;
  
  // find all the messages that are tied to the user
  const messages = await Message.find({ user: userId });

  const sortedMessages = messages.sort((a, b) => a.createdAt - b.createdAt).slice(-4);

  return successfulRes({ res, data: sortedMessages });
}

// * EXPORTS * //
module.exports = {
  chatWithBot,
  getMessageHistory
};