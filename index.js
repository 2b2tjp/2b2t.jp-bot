const env = require('dotenv-safe').config().parsed
const Discord = require('discord.js')
const client = new Discord.Client()
const { LoggerFactory } = require('logger.js')
const logger = LoggerFactory.getLogger('main', 'blue')
const dispatcher = require('bot-framework/dispatcher')

client.on('ready', () => {
  logger.info(`Logged into Discord with user ${client.user.tag}! (${client.user.id})`)
})

logger.config(true)

client.on('message', async msg => {
  if (msg.author.bot || msg.system) return
  if (false && (msg.content.includes('anarchycraft.mydns.vc') || msg.content.includes('由于有广告配额'))) {
    return msg.delete()
  }
  if (msg.content.startsWith(env.prefix)) {
    logger.info(`${msg.author.tag} (${msg.author.id}) sent command: '${msg.content}'`)
    dispatcher(msg, require('./lang/en.json'), env.prefix, [], env.prefix).catch(e => { logger.error(e.stack || e) })
  }
})

client.login(env.token)
