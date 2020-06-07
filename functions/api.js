const sendMessage = () => {

}

const testInputs = (textString) => {
  const text = textString[0].split('+');

  if (text.length !== 3) {
    throw new Error(textString[0]);
  }

  return [
    text[0].split('=')[1],
    text[1],
    text[2]
  ]
}

exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter(e => e)

  try {
    const text = event.body.split('&').filter(string => string.match(/^text=/))
    const [ command, assignee, task ] = testInputs(text)

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