const { Command } = require('bot-framework')
const fetch = require('node-fetch')

module.exports = class extends Command {
  constructor() {
    super('tps')
  }

  async run(msg) {
    const data = await fetch('https://status.2b2t.jp/api/data.json').then(res => res.json())
    msg.channel.send(`tps (as of ${new Date(data.tps[data.tps.length - 1][0]).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })} JST): \`` + data.tps[data.tps.length - 1][1] + ' ticks per second`')
  }
}
