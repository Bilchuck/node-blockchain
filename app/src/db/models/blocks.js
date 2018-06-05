const Sequelize = require('sequelize')
const sequelize = require('../')
const Transactions = require('./transactions')

const Blocks = sequelize.define('blocks', {
  hash: {
    primaryKey: true,
    type: Sequelize.STRING
  },

  prev_hash: Sequelize.STRING,
  index: Sequelize.INTEGER,
  timestamp: Sequelize.DATE,
  proof: Sequelize.INTEGER,

  createdAt: {type: Sequelize.DATE, field: 'created_at'},
  updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
  deleteAt: {type: Sequelize.DATE, field: 'deleted_at'}
})

Blocks.hasMany(Transactions, { foreignKey: 'block_hash' })

module.exports = Blocks
