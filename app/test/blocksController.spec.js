/* eslint-env mocha */
const sinon = require('sinon')
const {
  mockBlocks,
  mockTransactions,
  mockResult
} = require('./mocks')
const { blocksController } = require('../src/controllers')

const mockBlocksResult = []

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
