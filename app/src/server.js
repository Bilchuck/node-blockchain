const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const transactionController = require('./controllers/transactionController')
const getTransactionController = require('./controllers/getTransactionController')
const miningController = require('./controllers/miningController')
const blocksController = require('./controllers/blocksController')
const blocksCountController = require('./controllers/blocksCountController')
const amountController = require('./controllers/amountController')

const PORT = process.env.PORT || 4444
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/transaction', transactionController)
app.get('/transaction', getTransactionController)
app.get('/amount', amountController)
app.get('/mine', miningController)
app.get('/blocks', blocksController)
app.get('/blocks_count', blocksCountController)

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port!`)
  })
}

module.exports = startServer
