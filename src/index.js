const { nextBlock, genesisBlock } = require('./services/blockchain')

const blockchain = [genesisBlock()]
let prevBlock = blockchain[0]

for (let i = 0; i < 20; i++) {
  const newBlock = nextBlock(prevBlock)
  blockchain.push(newBlock)
  prevBlock = newBlock

  console.log(`New block added! index = ${newBlock.index} & hash = ${newBlock.hash}`)
}
