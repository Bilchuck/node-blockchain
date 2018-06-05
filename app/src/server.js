const express = require('express')
const bodyParser = require('body-parser')
const transactionController = require('./controllers/transactionController')
const miningController = require('./controllers/miningController')
const blocksController = require('./controllers/blocksController')
const blocksCountController = require('./controllers/blocksCountController')

const PORT = process.env.PORT || 4444
const app = express()

app.use(bodyParser.json())

app.post('/transaction', transactionController)
app.get('/mine', miningController)
app.get('/blocks', blocksController)
app.get('/blocks_count', blocksCountController)

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port!`)
  })
}

module.exports = startServer
