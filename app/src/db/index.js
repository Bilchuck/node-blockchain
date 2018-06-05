const Sequelize = require('sequelize')

const dbName = 'blockchain'
const user = 'root'
const password = 'secret'
const host = process.env.DATABASE_HOST || '127.0.0.1'
const port = '3306'
const dialect = 'mysql'

module.exports = new Sequelize(dbName, user, password, {
  host,
  port,
  dialect
})
