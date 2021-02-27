const { Command } = require('bot-framework')
const fetch = require('node-fetch')

module.exports = class extends Command {
  constructor() {
    super('cpm')
  }

  async run(msg) {
    const data = await fetch(process.env.endPoint).then(res => res.json())
    msg.channel.send(`chat messages per minute (as of ${new Date(data.cpm[data.cpm.length - 1][0]).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })} JST): \`` + data.cpm[data.cpm.length - 1][1] + ' messages`')
  }
}
