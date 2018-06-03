const fetch = require('node-fetch')
const { genesisBlock } = require('./services/blockchain')
// const Block = require('./models/block')
const transactionController = require('./controllers/transactionController')
const miningController = require('./controllers/miningController')

let blockchain = [genesisBlock()]
// const transactions = []
// const miner = 'abc'

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
// const nodes = [`localhost:${PORT}`]
const app = express()

app.use(bodyParser.json())
app.post('/transaction', transactionController)

app.get('/mine', miningController)
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

// const findNewChains = async () => {
//   const otherChains = []
//   for (const node of nodes) {
//     const chainBuffer = await fetch(`${node}/blocks`)
//     const chain = chainBuffer.json()
//     otherChains.push(chain)
//   }
//   return otherChains
// }

// const consensum = async () => {
//   const otherChains = await findNewChains()
//   let longest = blockchain
//   for (const chain of otherChains) {
//     if (chain.length > longest.length) {
//       longest = chain
//     }
//   }
//   blockchain = longest
// }

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port!`)
})
