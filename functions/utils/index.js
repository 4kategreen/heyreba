const axios = require('axios')

module.exports = {
  processInputs: (textString) => {
    const text = textString.split(/(\@\w+)/i);

    if (text.length !== 3 || text[2].length === 0) {
      throw new Error('something is wrong with your message. please try again');
    }

    return {
      type: text[0].trim(),
      user: text[1],
      text: text[2].trim()
    }
  },
  sendMessage: (url, message, user) => {
    axios.post(url, {
      headers: {
        'contentType': 'json'
      },
      data: {
        channel: user,
        text: message,
        as_user: true
      }
    })
  }
}