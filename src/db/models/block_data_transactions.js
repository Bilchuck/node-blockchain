const Sequelize = require('sequelize')
const sequelize = require('../')

const BlockDataTransactions = sequelize.define('block_data_transactions', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },

  block_data_id: Sequelize.UUID,
  transaction_id: Sequelize.UUID,

  createdAt: {type: Sequelize.DATE, field: 'created_at'},
  updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
  deleteAt: {type: Sequelize.DATE, field: 'deleted_at'}
})

module.exports = BlockDataTransactions
