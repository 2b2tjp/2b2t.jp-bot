const {Command} = require('bot-framework')
const fetch = require('node-fetch')

module.exports = class extends Command {
    constructor() {
        super('status')
    }

    async run(msg) {
        const data = await fetch(process.env.endPoint).then(res => res.json())
        const dateDifference = data.players.length - data.playersInQueue.length
        const playersDate = data.tps[data.players.length - 1][0]
        const playersInQueueDate = data.tps[data.playersInQueue.length - 1][0]
        let downMsg = '';
        let players = data.players[data.players.length - 1][1]
        let playersInQueue = data.playersInQueue[data.playersInQueue.length - 1][1]
        if (Math.abs(dateDifference) > 1000 * 180) {
            if (dateDifference < 0) players = 0
            if (dateDifference >= 0) playersInQueue = 0
        }
        if (Date.now() - playersDate > 1000 * 180) downMsg = '\n(__**Notice**: the data is almost old!__)';
        msg.channel.send(`
current server status as of ${new Date(data.tps[data.tps.length - 1][0]).toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'})} JST (UTC: ${new Date(data.tps[data.tps.length - 1][0]).toLocaleString('ja-JP', {timeZone: 'UTC'})})
tps: \`${data.tps[data.tps.length - 1][1]} ticks per second\`
players in queue: \`${playersInQueue} players\`
online players: \`${players} players\`
total players (online + queue): \`${players + playersInQueue} players\`
chat messages per minute (cpm): \`${data.cpm[data.cpm.length - 1][1]} messages\` ${downMsg}
`)
    }
}
