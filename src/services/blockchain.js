const fetch = require('node-fetch')
const Blocks = require('../db/models/blocks')
const BlockData = require('../db/models/block_data')
const BlockDataTransactions = require('../db/models/block_data_transactions')
const Transactions = require('../db/models/transactions')
const Block = require('../models/block')

const nodes = []
const genesisBlock = () => {
  return new Block(0, new Date(), { proof: 1 }, '0')
}

const findBlockCounts = async () => {
  const otherChains = []
  for (const node of nodes) {
    console.log('1')
    const chainBuffer = await fetch(`${node}/blocks_count`)
    const chain = await chainBuffer.json()
    otherChains.push({ node, count: chain.count })
  }
  return otherChains
}

const consensum = async () => {
  const otherChains = await findBlockCounts()
  const currentBlockchain = { count: await Blocks.count() }
  let longest = currentBlockchain
  for (const chain of otherChains) {
    if (chain.count > longest.count) {
      longest = chain
    }
  }
  if (longest !== currentBlockchain) {
    await replaceNodeBlocks(longest.node)
  } else if (currentBlockchain.count === 0) {
    // no other nodes and this node has no blocks
    await createGenesisBlock()
  }
}

const clearBlockchain = async () => {
  await Blocks.destroy({
    where: {},
    truncate: true
  })
  await BlockData.destroy({
    where: {},
    truncate: true
  })
  await BlockDataTransactions.destroy({
    where: {},
    truncate: true
  })
  await Transactions.destroy({
    where: {},
    truncate: true
  })
}

const replaceNodeBlocks = async node => {
  console.log('2')
  const blocksBuffer = await fetch(`${node}/blocks`)
  const blocks = await blocksBuffer.json()
  await clearBlockchain()
  const createdBlocks = await Blocks.bulkCreate(blocks)
  const createdBlockData = await BlockData.bulkCreate(blocks.map((block, i) => ({
    proof: block.data.proof,
    block_id: createdBlocks[i].id
  })))
  blocks.forEach(async (block, blockIndex) => {
    const createdTransactions = await Transactions.bulkCreate(
      block.data.transactions.map(transaction => ({
        from: transaction.from,
        to: transaction.from,
        amount: transaction.amount
      })))
    await BlockDataTransactions.bulkCreate(
      block.data.transactions.map((transaction, i) => ({
        block_data_id: createdBlockData[blockIndex].id,
        transaction_id: createdTransactions[i]
      }))
    )
  })
}

const createGenesisBlock = async () => {
  const block = genesisBlock()
  const createdBlock = await Blocks.create(block)
  await BlockData.create({
    proof: block.data.proof,
    block_id: createdBlock.id
  })
}

module.exports = {
  genesisBlock,
  consensum
}
