const querystring = require('querystring');

const sendMessage = () => {

}

const processInputs = (textString) => {
  const text = textString.split(' ');
  console.log(text.toString())

  if (text.length !== 3) {
    throw new Error(text.toString());
  }

  return [
    text[0],
    text[1],
    text[2]
  ]
}

exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter(e => e)

  try {
    const response = querystring.parse(event.body);
    console.log(response)
    const [ type, assignee, task ] = processInputs(response.text)

    return {
      statusCode: 200,
      body: `We're telling ${assignee} to ${task}. They will tell you when it's done`
    }
  } catch(err) {
    return {
      statusCode: 400,
      body: err.message
    }
  }
}