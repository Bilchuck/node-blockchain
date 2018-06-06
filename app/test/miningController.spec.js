/* eslint-env mocha */
const sinon = require('sinon')
const mock = require('mock-require')
const {
  mockBlocks,
  mockTransactions,
  mockConsensum,
  mockResult
} = require('./mocks')
const { genesisBlock } = require('../src/services/blockchain')
const { miningController } = require('../src/controllers')

const successfulResult = { successful: true }
const minerId = 'miner-1' // should be imported
const lastBlock = genesisBlock()
const blocks = [lastBlock]
const minedTransaction = { from: 'network', to: minerId, amount: 1 }

describe('miningController', () => {
  beforeEach(() => {
    mockBlocks.findAll.reset()
    mockBlocks.findAll.resolves(blocks)
    mockBlocks.create.reset()
    mockBlocks.create.resolves()

    mockTransactions.create.reset()
    mockTransactions.create.resolves()
    mockTransactions.update.reset()
    mockTransactions.update.resolves()

    mockConsensum.reset()
    mockConsensum.resolves()

    mockResult.send.reset()
  })
  it('should call call consesnum function', async () => {
    await miningController(null, mockResult)
    sinon.assert.calledOnce(mockConsensum)
  })
  it('should get last block', async () => {
    await miningController(null, mockResult)
    sinon.assert.calledWithMatch(mockBlocks.findAll, {
      limit: 1,
      order: [ [ 'timestamp', 'DESC' ] ]
    })
  })
  it('should create new Transaction for miner', async () => {
    await miningController(null, mockResult)
    sinon.assert.calledWithMatch(mockTransactions.create, minedTransaction)
  })
  it('should update all transactions that are not attached to blocks (new)', async () => {
    await miningController(null, mockResult)
    sinon.assert.calledWithMatch(mockTransactions.update, {
      block_hash: sinon.match.string
    }, {
      where: { block_hash: null }
    })
  })
  it('should create new block', async () => {
    await miningController(null, mockResult)
    sinon.assert.calledWith(mockBlocks.create, {
      index: lastBlock.index + 1,
      prev_hash: lastBlock.hash,
      timestamp: sinon.match.date,
      proof: sinon.match.number,
      hash: sinon.match.string,
      transactions: []
    })
  })
  it('should call send response with blocks', async () => {
    await miningController(null, mockResult)
    sinon.assert.calledWith(mockResult.send, successfulResult)
  })
})
