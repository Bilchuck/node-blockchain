const Sequelize = require('sequelize')
const { sequelize } = require('../')
const BlockDataTransactions = require('./block_data_transactions')

const BlockData = sequelize.define('block_data', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },

  proof: Sequelize.INTEGER,
  block_id: Sequelize.UUID,

  createdAt: {type: Sequelize.DATE, field: 'created_at'},
  updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
  deleteAt: {type: Sequelize.DATE, field: 'deleted_at'}
})

BlockData.hasMany(BlockDataTransactions, { foreignKey: 'block_data_id' })

module.exports = BlockData
