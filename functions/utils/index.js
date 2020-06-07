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
  sendMessage: async (message, user) => {
    return axios({
      url: 'https://slack.com/api/chat.postMessage',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.BOT_TOKEN}`
      },
      data: {
        channel: user,
        text: 'from the api',
        as_user: true
      }
    })
  }
}