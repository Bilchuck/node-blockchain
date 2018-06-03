const Sequelize = require('sequelize')
const sequelize = require('../')

module.exports = sequelize.define('transactions', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },

  from: Sequelize.STRING,
  to: Sequelize.STRING,
  amount: Sequelize.INTEGER,

  createdAt: {type: Sequelize.DATE, field: 'created_at'},
  updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
  deleteAt: {type: Sequelize.DATE, field: 'deleted_at'}
})
