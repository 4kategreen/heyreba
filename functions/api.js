const querystring = require('querystring');
const { processInputs, sendMessage } = require('./utils')

exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter(e => e)

  try {
    const response = querystring.parse(event.body);
    const { type, user, text } = processInputs(response.text);
    let result = {
      statusCode: 500,
      body: 'Unknown Error'
    };

    console.log(type)

    switch (type) {
      case 'assign':
        console.log(`${event.user_name} assigned ${text} to ${user}`)
        result.statusCode = 200
        result.body = `We told ${user} to ${text}. They will tell you when it's done`;
        break;
      case 'tell':
        console.log(`${event.user_name}'s task ${text} is done. telling ${user}`)
        result.statusCode = 200
        result.body = `We told ${user} that you're done with your task, ${text}.`
        break;
      default:
        console.log(`incorrect type: ${type} sent by ${event.user_name}`)
        result.body = 'I don\'t know what to do. Are you giving someone a task or telling someone you did a task?'
    }

    return result;

  } catch(err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }
}