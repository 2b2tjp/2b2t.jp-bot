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
`)
  }
}
