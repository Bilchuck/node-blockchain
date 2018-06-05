const Blocks = require('../db/models/blocks')

const blocksCountController = async (req, res) => {
  try {
    const count = await Blocks.count()
    res.send({ count })
  } catch (error) {
    console.log(error)
    res.send({ error })
  }
}

module.exports = blocksCountController
