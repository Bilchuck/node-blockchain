const sequelize = require('./')

const sleep = time => new Promise((resolve, reject) => {
  setTimeout(resolve, time)
})
const mysqlDetected = async () => {
  while (1) {
    try {
      await sequelize.authenticate()
      break
    } catch (e) {
      console.log('SQL is not started yet. Wait 5 second..')
      await sleep(5 * 1000)
    }
  }
}

module.exports = mysqlDetected
