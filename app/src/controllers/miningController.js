const Blocks = require('../db/models/blocks')
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
    const lastBlock = await Blocks.findAll({
      limit: 1,
      order: [ [ 'timestamp', 'DESC' ] ]
    })
    const lastBlockData = lastBlock[0].dataValues
    const lastProof = lastBlockData.proof
    const newProof = proofOfWork(lastProof)

    await Transactions.create({
      from: 'network',
      to: miner,
      amount: 1
    })
    const transactions = await Transactions.findAll({
      where: { block_hash: null }
    })
    const minedBlock = new Block(
      lastBlock.index + 1,
      new Date(),
      newProof,
      transactions,
      lastBlock.hash
    )
    await Blocks.create(minedBlock)
    await transactions.update({
      block_hash: minedBlock.hash
    })
    res.send({ successful: true })
  } catch (error) {
    console.log(error)
    res.send({ error })
  }
}

module.exports = miningController
