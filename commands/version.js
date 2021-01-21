const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    super('version')
  }

  async run() {}
}
