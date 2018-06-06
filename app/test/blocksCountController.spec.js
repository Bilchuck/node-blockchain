/* eslint-env mocha */
const sinon = require('sinon')
const {
  mockBlocks,
  mockResult
} = require('./mocks')
const { blocksCountController } = require('../src/controllers')

const countResult = 17

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
