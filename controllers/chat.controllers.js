// * IMPORTS * //
const { OpenAI } = require('openai')
const Bot = require('../models/bot.model')

  const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY
  })

// * CONTROLLERS * //
chatWithBot = async (req, res) => {
    // get the user id from the users request
    const userId = req.user.userId;

    console.log('userId:', userId);
    

    // find the bots that are tied to the user 
    const bots = await Bot.find({ user: userId });

//      // ! NEED A BETTER PROMT 
//   prompt = `Give me workout motivation from a personality of ${personality}`

//   const response = await openai.chat.completions.create({
//       model: 'GPT-3.5 Turbo', 
//       messages: [ {"role": "user", "content": `${prompt}`}],
//       max_tokens: 2048, 
//       temperature: 1, 
//   })
  
//   console.log(':',response.choices[0].message.content);
//   return response.choices[0].message.content

res.status(200).json(bots);
}

// * EXPORTS * //

module.exports = {
  chatWithBot,
};