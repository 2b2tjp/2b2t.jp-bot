const { Command } = require('bot-framework')
const fetch = require('node-fetch')

module.exports = class extends Command {
  constructor() {
    super('queue', { alias: ['q'] })
  }

  async run(msg) {
    const data = await fetch(process.env.endPoint).then(res => res.json())
    msg.channel.send(`players in queue (as of ${new Date(data.playersInQueue[data.playersInQueue.length - 1][0]).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })} JST): \`` + data.playersInQueue[data.playersInQueue.length - 1][1] + ' players`')
  }
}
