const Blocks = require('../db/models/blocks')
const BlockDataTransactions = require('../db/models/block_data_transactions')
const BlockData = require('../db/models/block_data')
const Transactions = require('../db/models/transactions')
const Block = require('../models/block')

const blocksController = async (req, res) => {
  try {
    const blocksBuffer = await Blocks.findAll({
      include: {
        model: BlockData,
        include: {
          model: BlockDataTransactions,
          include: Transactions
        }
      }
    })
    const blocks = blocksBuffer.map(block => {
      const blockData = block.block_datum
      return new Block(
        block.index,
        block.timestamp,
        {
          proof: blockData.proof,
          transactions: blockData.block_data_transactions.map(dataTransaction => ({
            from: dataTransaction.transaction.from,
            to: dataTransaction.transaction.to,
            amount: dataTransaction.transaction.amount
          }))
        },
        block.prev_hash
      )
    })
    res.send({ blocks })
  } catch (error) {
    console.log(error)
    res.send({ error })
  }
}

module.exports = blocksController
