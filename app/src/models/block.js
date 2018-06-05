const sha256 = require('sha256')

module.exports = class Block {
  constructor (index, timestamp, data, prevHash) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.prev_hash = prevHash
    this.hash = this.getHash()
  }

  getHash () {
    return sha256(
      this.index + this.timestamp + this.data + this.prev_hash
    )
  }
}
