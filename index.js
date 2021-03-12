const env = require('dotenv-safe').config().parsed
const Discord = require('discord.js')
const client = new Discord.Client()
const {LoggerFactory} = require('logger.js')
const logger = LoggerFactory.getLogger('main', 'blue')
const dispatcher = require('bot-framework/dispatcher')

client.on('ready', () => {
  client.user.setActivity({type: 'PLAYING', name: 'Suffering from lag machines'})
  logger.info(`Logged into Discord with user ${client.user.tag}! (${client.user.id})`)
})

logger.config(true)

client.on('message', async msg => {
  if (msg.author.bot || msg.system) return
  if (!checkMessage(msg)) {
    msg.delete()
  }
  if (msg.content.startsWith(env.prefix)) {
    logger.info(`${msg.author.tag} (${msg.author.id}) sent command: '${msg.content}'`)
    dispatcher(msg, require('./lang/en.json'), env.prefix, [], env.prefix).catch(e => {
      logger.error(e.stack || e)
    })
  }
})

client.on('messageUpdate', (oldMessage, newMessage) => {
  if (checkMessage(newMessage)) return
  newMessage.delete();
})

client.login(env.token)

function checkMessage(message) {
  if (message.author.bot || message.system) return true
  if (message.guild && message.guild.id != '797157625195659264') return true
  if (message.guild.me.hasPermission('MANAGE_ROLES') && message.member.hasPermission('MANAGE_MESSAGES')) return true
  const content = message.content.toLowerCase();
  if (content.includes('http://') || content.includes('https://')) return false
  return true
}