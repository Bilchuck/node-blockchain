/* eslint-env mocha */
const sinon = require('sinon')
const {
  mockTransactions,
  mockResult
} = require('./mocks')
const { amountController } = require('../src/controllers')

const transactions = []
const id = 17
const request = { query: { id } }

describe('amountController', () => {
  beforeEach(() => {
    mockTransactions.findAll.reset()
    mockTransactions.findAll.resolves(transactions)
    mockResult.send.reset()
  })
  it('should call Transactions.findAll method', async () => {
    await amountController(request, mockResult)
    sinon.assert.calledOnce(mockTransactions.findAll)
  })
  it('should call Transactions.findAll with right params', async () => {
    await amountController(request, mockResult)
    sinon.assert.calledWithMatch(mockTransactions.findAll, {
      where: {
        $or: [
          { from: id },
          { to: id }
        ]
      }
    })
  })
  it('should call send response with amount', async () => {
    await amountController(request, mockResult)
    sinon.assert.calledWith(mockResult.send, { amount: 0 })
  })
  it('should calculate amount due to transactions', async () => {
    const transactionsWithData = [
      { from: 32, to: id, amount: 100 }, // + 100
      { from: id, to: 2, amount: 26 } // - 26
    ]
    mockTransactions.findAll.resolves(transactionsWithData)
    await amountController(request, mockResult)
    sinon.assert.calledWith(mockResult.send, { amount: 74 })
  })
})
