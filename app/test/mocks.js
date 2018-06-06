const sinon = require('sinon')
const mock = require('mock-require')
const { genesisBlock } = require('../src/services/blockchain')

const mockBlocks = sinon.stub()
mockBlocks.findAll = sinon.stub()
mockBlocks.count = sinon.stub()
mockBlocks.create = sinon.stub()

const mockTransactions = sinon.stub()
mockTransactions.findAll = sinon.stub()
mockTransactions.create = sinon.stub()
mockTransactions.update = sinon.stub()

const mockConsensum = sinon.stub()

const mockResult = sinon.stub()
mockResult.send = sinon.stub()

mock('../src/services/blockchain', { consensum: mockConsensum, genesisBlock })
mock('../src/db/models/blocks', mockBlocks)
mock('../src/db/models/transactions', mockTransactions)

module.exports = {
  mockBlocks,
  mockTransactions,
  mockConsensum,
  mockResult
}
