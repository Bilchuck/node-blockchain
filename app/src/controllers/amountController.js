const Transactions = require('../db/models/transactions')

const amountController = async (req, res) => {
  const accountId = req.query.id
  const transactions = await Transactions.findAll({
    where: {
      $or: [
        { from: accountId },
        { to: accountId }
      ]
    }
  })
  let amount = 0
  for (const transaction of transactions) {
    if (transaction.from === accountId) {
      amount -= transaction.amount
    } else {
      amount += transaction.amount
    }
  }
  res.send({ amount })
}

module.exports = amountController
