const Block = require('./models/block')

const createGenesisBlock = () => {
  return new Block(0, new Date(), 'Genesis block', '0')
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
  createGenesisBlock
}
