/* eslint-env mocha */
const sinon = require('sinon')
const {
  mockTransactions,
  mockResult
} = require('./mocks')
const { getTransactionController } = require('../src/controllers')

const transactions = []
const userId = '48'
const request = { query: { user: userId } }

describe('getTransactionController', () => {
  beforeEach(() => {
    mockTransactions.findAll.reset()
    mockTransactions.findAll.resolves(transactions)
    mockResult.send.reset()
  })
  it('should call Transactions.findAll method', async () => {
    await getTransactionController(request, mockResult)
    sinon.assert.calledOnce(mockTransactions.findAll)
  })
  it('should call Transactions.findAll method with right params', async () => {
    await getTransactionController(request, mockResult)
    sinon.assert.calledWithMatch(mockTransactions.findAll, {
      where: {
        $or: [
          { from: userId },
          { to: userId }
        ]
      }
    })
  })
  it('should call send response with transactions', async () => {
    await getTransactionController(request, mockResult)
    sinon.assert.calledWithMatch(mockResult.send, transactions)
  })
})
