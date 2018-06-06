/* eslint-env mocha */
const sinon = require('sinon')
const {
  mockTransactions,
  mockResult
} = require('./mocks')
const { transactionController } = require('../src/controllers')

const request = { body: { from: 1, to: 2, amount: 3 } }
const successfulResult = { successful: true }

describe('transactionController', () => {
  beforeEach(() => {
    mockTransactions.create.reset()
    mockTransactions.create.resolves()
    mockResult.send.reset()
  })
  it('should call create new transaction', async () => {
    await transactionController(request, mockResult)
    sinon.assert.calledWithMatch(mockTransactions.create, request.body)
  })
  it('should call send response with blocks', async () => {
    await transactionController(request, mockResult)
    sinon.assert.calledWithMatch(mockResult.send, successfulResult)
  })
})
