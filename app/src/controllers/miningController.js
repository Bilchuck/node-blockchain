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
    const lastBlock = (await Blocks.findAll({
      limit: 1,
      order: [ [ 'timestamp', 'DESC' ] ]
    }))[0]
    const proof = proofOfWork(lastBlock.proof)

    await Transactions.create({
      from: 'network',
      to: miner,
      amount: 1
    })
    const minedBlock = new Block(
      lastBlock.index + 1,
      new Date(),
      proof,
      [],
      lastBlock.hash
    )
    await Transactions.update({
      block_hash: minedBlock.hash
    }, {
      where: { block_hash: null }
    })
    await Blocks.create(minedBlock)
    res.send({ successful: true })
  } catch (error) {
    console.log(error)
    res.send({ error })
  }
}

module.exports = miningController
