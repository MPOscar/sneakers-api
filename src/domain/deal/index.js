const { makeEntity } = require('../helper')

const transform = (data) => {
  return data
}

const Deal = makeEntity(require('./deal'), transform)

module.exports = { Deal }
