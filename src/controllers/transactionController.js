const Transactions = require('../db/models/transactions')

const transactionController = async (req, res) => {
  const transaction = req.body
  await Transactions.create(transaction)
  res.send({ successful: true })
}

module.exports = transactionController
