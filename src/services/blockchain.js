const Block = require('../models/block')

const genesisBlock = () => {
  return new Block(0, new Date(), { proof: 1 }, '0')
}

const nextBlock = lastBlock => {
  const newIndex = lastBlock.index + 1

  return new Block(
    lastBlock.index + 1,
    new Date(),
    `Here is block with index ${newIndex}`,
    lastBlock.hash
  )
}

module.exports = {
  genesisBlock,
  nextBlock
}
