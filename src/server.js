const fetch = require('node-fetch')
const { genesisBlock } = require('./services/blockchain')
const Block = require('./models/block')

const nodes = [`localhost:${PORT}`]
let blockchain = [genesisBlock()]
const transactions = []
const miner = 'abc'

const proofOfWork = lastProof => {
  let increment = lastProof + 1

  while (increment % 9 !== 0 || increment % lastProof !== 0) {
    increment++
  }

  return increment
}

// api
const express = require('express')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())
app.post('/transaction', (req, res) => {
  const transaction = req.body
  transactions.push(transaction)

  console.log(`New transaction: ${JSON.stringify(transaction)}`)
  res.send({
    successful: true
  })
})

app.get('/mine', (req, res) => {
  const lastBlock = blockchain[blockchain.length - 1]
  const lastProof = lastBlock.data.proof
  const proof = proofOfWork(lastProof)
  transactions.push({
    from: 'network',
    to: miner,
    amount: 1
  })
  const newBlockData = {
    proof,
    transactions: [...transactions] // copy
  }

  const minedBlock = new Block(
    lastBlock.index + 1,
    new Date(),
    newBlockData,
    lastBlock.hash
  )
  blockchain.push(minedBlock)
  res.send({
    data: minedBlock.data,
    hash: minedBlock.hash,
    index: minedBlock.index,
    timestamp: minedBlock.timestamp
  })
})
// consensum algorithm
app.get('/blocks', (req, res) => {
  const chain = blockchain.map(({hash, data, timestamp, index}) => ({
    hash,
    data,
    timestamp,
    index
  }))
  res.send(chain)
})

const findNewChains = async () => {
  const otherChains = []
  for (const node of nodes) {
    const chainBuffer = await fetch(`${node}/blocks`)
    const chain = chainBuffer.json()
    otherChains.push(chain)
  }
  return otherChains
}

const consensum = async () => {
  const otherChains = await findNewChains()
  let longest = blockchain
  for (const chain of otherChains) {
    if (chain.length > longest.length) {
      longest = chain
    }
  }
  blockchain = longest
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port!`)
})
