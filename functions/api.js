const querystring = require('querystring');
const { processInputs, sendMessage } = require('./utils')

exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter(e => e)

  const response = querystring.parse(event.body);
  const { type, user, text } = processInputs(response.text);
  let result = {
    statusCode: 500,
    body: 'Unknown Error'
  };
  let messageText = '';

  switch (type) {
    case 'assign':
      messageText = `Hi! @${response.user_name} assigned you a task: ${text}. Tell me when you finished it by saying \`/heyreba tell @${response.user_name} i'm done!\``;

      result.body = `We told ${user} to ${text}. They will tell you when it's done`;
      break;

    case 'complete':
      messageText = `@${response.user_name} wanted me to tell you they're done with the task you assigned them!`;
      console.log(`${response.user_name}'s task ${text} is done. telling ${user}`)

      result.body = `We told ${user} that you're done with your task, ${text}.`
      break;

    default:
      console.log(`incorrect type: ${type} sent by ${response.user_name}`)
      result.statusCode = 200
      result.body = 'I don\'t know what to do. Are you giving someone a task (`assign`) or telling someone you did a task (`complete`)?'
  }

  try {
    const messageResponse = await sendMessage(messageText, user);
    if (!messageResponse.data.ok) {
      throw new Error(messageResponse.data.error)
    }


    console.log(`${type}: ${response.user_name} to ${user} (${text})`)
    result.statusCode = 200
  } catch(err) {
    console.error(`Error: ${err.message}`)
    result.body = 'Something unexpected happened!'
  }

  return result;
}