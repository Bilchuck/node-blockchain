const startServer = require('./server')
const { consensum } = require('./services/blockchain')
const sequelize = require('./db')

const sleep = time => new Promise((resolve, reject) => {
  setTimeout(resolve, time)
})
const mysqlDetected = async () => {
  while (1) {
    try {
      await sequelize.authenticate()
      break
    } catch (e) {
      console.log('SQL is not started yet. Wait 1 second..')
      await sleep(1000)
    }
  }
}
mysqlDetected()
  .then(() => {
    return consensum()
  })
  .then(() => startServer())
