/* eslint-env mocha */
const sinon = require('sinon')
const mock = require('mock-require')
const {
  mockBlocks,
  mockTransactions,
  mockResult
} = require('./mocks')

const countResult = 17

mock('../src/db/models/blocks', mockBlocks)
mock('../src/db/models/transactions', mockTransactions)
const { blocksCountController } = require('../src/controllers')

describe('blocksCountController', () => {
  beforeEach(() => {
    mockBlocks.count.reset()
    mockBlocks.count.resolves(countResult)
    mockResult.send.reset()
  })
  it('should call Blocks.count method', async () => {
    await blocksCountController(null, mockResult)
    sinon.assert.calledOnce(mockBlocks.count)
  })
  it('should call send response with blocks', async () => {
    await blocksCountController(null, mockResult)
    sinon.assert.calledWithMatch(mockResult.send, { count: countResult })
  })
})
