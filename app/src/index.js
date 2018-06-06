const startServer = require('./server')
const { consensum } = require('./services/blockchain')
const mysqlDetected = require('./db/dbDetected')

mysqlDetected()
  .then(() => consensum())
  .then(() => startServer())
