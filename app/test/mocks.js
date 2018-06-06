const sinon = require('sinon')

const mockBlocks = sinon.stub()
mockBlocks.findAll = sinon.stub()
mockBlocks.count = sinon.stub()

const mockTransactions = sinon.stub()

const mockResult = sinon.stub()
mockResult.send = sinon.stub()

module.exports = {
  mockBlocks,
  mockTransactions,
  mockResult
}
