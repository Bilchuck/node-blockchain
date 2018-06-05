const Sequelize = require('sequelize')
const { sequelize } = require('../')
const BlockData = require('./block_data')

const Blocks = sequelize.define('blocks', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },

  hash: Sequelize.STRING,
  prev_hash: Sequelize.STRING,
  index: Sequelize.INTEGER,
  timestamp: Sequelize.DATE,

  createdAt: {type: Sequelize.DATE, field: 'created_at'},
  updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
  deleteAt: {type: Sequelize.DATE, field: 'deleted_at'}
})

Blocks.hasOne(BlockData, { foreignKey: 'block_id' })

module.exports = Blocks
