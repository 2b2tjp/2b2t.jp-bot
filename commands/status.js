const { Command } = require('bot-framework')
const fetch = require('node-fetch')

module.exports = class extends Command {
  constructor() {
    super('status')
  }

  async run(msg) {
    const data = await fetch('https://status.2b2t.jp/api/data.json').then(res => res.json())
    msg.channel.send(`
current server status as of ${new Date(data.tps[data.tps.length - 1][0]).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })} JST (UTC: ${new Date(data.tps[data.tps.length - 1][0]).toLocaleString('ja-JP', { timeZone: 'UTC' })})
tps: \`${data.tps[data.tps.length - 1][1]}\` ticks per second
online players: \`${data.players[data.players.length - 1][1]}\` players
chat messages per minute (cpm): \`${data.cpm[data.cpm.length - 1][1]}\` chat messages
`)
  }
}
