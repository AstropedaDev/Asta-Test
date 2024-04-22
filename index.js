const bot = require(__dirname + '/lib/client')
const { VERSION } = require(__dirname + '/config')

const start = async () => {
    Debug.info(`Asta-Md ${VERSION}`)
  try {
    await bot.init()
    bot.logger.info('Starting Application...')
    await bot.DATABASE.sync()
    await bot.connect()
  } catch (error) {
    Debug.error(error);
    start();
  }
}
start();
