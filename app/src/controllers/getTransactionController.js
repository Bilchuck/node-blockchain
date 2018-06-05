const Transactions = require('../db/models/transactions')

const getTransactionController = async (req, res) => {
  const user = req.query.user
  const transactions = await Transactions.findAll({
    where: {
      $or: [
        { from: user },
        { to: user }
      ]
    }
  })
  res.send(transactions)
}

module.exports = getTransactionController
