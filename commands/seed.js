const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    super('seed')
  }

  async run(msg) {
    msg.channel.send('`-201386215780397777`')
  }
}
