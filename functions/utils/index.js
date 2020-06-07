const axios = require('axios')

module.exports = {
  processInputs: (textString) => {
    const text = textString.split(/(\@\w+)/i);

    if (text.length !== 3 || text[2].length === 0) {
      throw new Error('Something is wrong with your message. Please try again');
    }

    return {
      type: text[0].trim(),
      user: text[1],
      text: text[2].trim()
    }
  },
  sendMessage: async (message, user) => {
    return axios({
      url: 'https://slack.com/api/chat.postMessage',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${process.env.BOT_TOKEN}`
      },
      data: {
        channel: user,
        text: message,
        as_user: true
      }
    })
  }
}