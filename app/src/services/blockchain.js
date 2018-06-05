const fetch = require('node-fetch')
const Blocks = require('../db/models/blocks')
const Transactions = require('../db/models/transactions')
const Block = require('../models/block')

const nodes = []
const genesisBlock = () => {
  return new Block(0, new Date(), 1, [], '0')
}

const findBlockCounts = async () => {
  const otherChains = []
  for (const node of nodes) {
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
  await Transactions.destroy({
    where: {},
    truncate: true
  })
}

const replaceNodeBlocks = async node => {
  const blocksBuffer = await fetch(`${node}/blocks`)
  const blocks = await blocksBuffer.json()

  await clearBlockchain()

  await Blocks.bulkCreate(blocks)
  for (const block of blocks) {
    await Transactions.bulkCreate(block.transaction.map(transaction => ({
      from: transaction.from,
      to: transaction.to,
      amount: transaction.amount,
      block_hash: block.hash
    })))
  }
}

const createGenesisBlock = async () => {
  const block = genesisBlock()
  await Blocks.create(block)
}

module.exports = {
  genesisBlock,
  consensum
}
