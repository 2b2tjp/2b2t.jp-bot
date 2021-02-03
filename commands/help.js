const Discord = require('discord.js')
const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    super('help', { args: ['[Command]'] })
  }

  async run(msg) {
    msg.channel.send(`commands:
\`!tps\` - ticks per second
\`!players\` - online players
\`!cpm\` - chats per minute
\`!queue\` - players in queue
\`!status\` - server status (all of above)

this bot is made by osu__player#1443
source code: <https://github.com/acrylic-style/2b2t.jp-bot>
invite: <https://discord.com/oauth2/authorize?client_id=801795241161916466&permissions=0&scope=bot>
`)
  }
}
