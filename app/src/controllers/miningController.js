const Blocks = require('../db/models/blocks')
const BlockDataTransactions = require('../db/models/block_data_transactions')
const BlockData = require('../db/models/block_data')
const Transactions = require('../db/models/transactions')
const Block = require('../models/block')
const { consensum } = require('../services/blockchain')

const miner = 'miner-1'

const proofOfWork = lastProof => {
  let increment = lastProof + 1

  while (increment % 9 !== 0 || increment % lastProof !== 0) {
    increment++
  }

  return increment
}

const miningController = async (req, res) => {
  try {
    await consensum()
    const lastBlocks = await Blocks.findAll({
      limit: 1,
      include: { model: BlockData, include: BlockDataTransactions },
      order: [ [ 'timestamp', 'DESC' ] ]
    })
    const lastBlock = lastBlocks[0].dataValues
    const lastProof = lastBlock.block_datum.dataValues.proof
    const proof = proofOfWork(lastProof)

    await Transactions.create({
      from: 'network',
      to: miner,
      amount: 1
    })
    const transactionIds = await Transactions.findAll({
      attributes: ['id']
    }).map(transaction => transaction.dataValues.id)
    const newBlockData = {
      proof,
      transactions: transactionIds // copy
    }
    const minedBlock = new Block(
      lastBlock.index + 1,
      new Date(),
      newBlockData,
      lastBlock.hash
    )
    const createdBlock = await Blocks.create({
      hash: minedBlock.hash,
      index: minedBlock.index,
      prevHash: minedBlock.prevHash,
      timestamp: minedBlock.timestamp
    })
    const createdData = await BlockData.create({
      block_id: createdBlock.dataValues.id,
      proof: minedBlock.data.proof
    })
    await BlockDataTransactions.bulkCreate(minedBlock.data.transactions.map(id => ({
      block_data_id: createdData.dataValues.id,
      transaction_id: id
    })))
    res.send({ successful: true })
  } catch (error) {
    console.log(error)
    res.send({ error })
  }
}

module.exports = miningController
