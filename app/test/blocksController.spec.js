/* eslint-env mocha */
const sinon = require('sinon')
const mock = require('mock-require')
const {
  mockBlocks,
  mockTransactions,
  mockResult
} = require('./mocks')

const mockBlocksResult = []

mock('../src/db/models/blocks', mockBlocks)
mock('../src/db/models/transactions', mockTransactions)
const { blocksController } = require('../src/controllers')

describe('blocksController', () => {
  beforeEach(() => {
    mockBlocks.findAll.reset()
    mockBlocks.findAll.resolves(mockBlocksResult)
    mockResult.send.reset()
  })
  it('should call blocks.findAll method', async () => {
    await blocksController(null, mockResult)
    sinon.assert.calledOnce(mockBlocks.findAll)
  })
  it('should call blocks.findAll with right params', async () => {
    await blocksController(null, mockResult)
    sinon.assert.calledWithMatch(mockBlocks.findAll, {
      include: { model: mockTransactions }
    })
  })
  it('should call send response with blocks', async () => {
    await blocksController(null, mockResult)
    sinon.assert.calledWith(mockResult.send, mockBlocksResult)
  })
})
