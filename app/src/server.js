const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')
const {
  amountController,
  blocksController,
  blocksCountController,
  getTransactionController,
  miningController,
  transactionController
} = require('./controllers')

const PORT = process.env.PORT || 4444
const app = express()

app.use(bodyParser.json())
app.use(cors())
// swagger api doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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
