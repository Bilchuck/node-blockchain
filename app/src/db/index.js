const Sequelize = require('sequelize')

const dbName = 'blockchain'
const user = 'root'
const password = 'secret'
const host = process.env.DATABASE_HOST || '127.0.0.1'
const port = '3306'
const dialect = 'mysql'

const sequelize = new Sequelize(dbName, user, password, {
  host,
  port,
  dialect
})

const initDB = async () => {
  const sequelize = new Sequelize('', user, password, {
    dialect,
    host
  })
  await sequelize.query(`CREATE DATABASE ${dbName}`)
  await sequelize.query(`CREATE TABLE ${dbName}.blocks (
    \`id\` char(36) NOT NULL,
    \`index\` int(11) NOT NULL,
    \`hash\` char(64) NOT NULL,
    \`prev_hash\` char(64) NOT NULL,
    \`timestamp\` datetime NOT NULL,
    \`created_at\` datetime NOT NULL,
    \`deleted_at\` datetime DEFAULT NULL,
    \`updated_at\` datetime NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`)
  await sequelize.query(`CREATE TABLE ${dbName}.block_data_transactions (
    \`id\` char(36) NOT NULL,

    \`block_data_id\` char(64) NOT NULL,
    \`transaction_id\` char(64) NOT NULL,

    \`created_at\` datetime NOT NULL,
    \`deleted_at\` datetime DEFAULT NULL,
    \`updated_at\` datetime NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`)
  await sequelize.query(`CREATE TABLE ${dbName}.block_data (
    \`id\` char(36) NOT NULL,

    \`block_id\` char(64) NOT NULL,
    \`proof\` int(11) NOT NULL,

    \`created_at\` datetime NOT NULL,
    \`deleted_at\` datetime DEFAULT NULL,
    \`updated_at\` datetime NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`)
  await sequelize.query(`CREATE TABLE ${dbName}.transactions (
    \`id\` char(36) NOT NULL,

    \`from\` char(64) NOT NULL,
    \`to\` char(64) NOT NULL,
    \`amount\` int(11) NOT NULL,

    \`created_at\` datetime NOT NULL,
    \`deleted_at\` datetime DEFAULT NULL,
    \`updated_at\` datetime NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`)
}

module.exports = {
  sequelize,
  initDB
}
