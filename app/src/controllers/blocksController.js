const Blocks = require('../db/models/blocks')
const Transactions = require('../db/models/transactions')

const blocksController = async (req, res) => {
  try {
    const blocks = await Blocks.findAll({
      include: { model: Transactions }
    })
    res.send(blocks)
  } catch (error) {
    console.log(error)
    res.send({ error })
  }
}

module.exports = blocksController
